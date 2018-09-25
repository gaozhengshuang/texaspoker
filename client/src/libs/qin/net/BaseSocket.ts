module game
{
	/**
	 * 通信基础socket
	 */
	export class BaseSocket
	{
		public static readonly HandshakeName: string = "handshake";
		/**
		 * 是否处理服务器返回的错误码侦听
		 */
		public enabledErrorCode: boolean = true;
		//send	
		private _session: number = 0; //消息id，自增
		/**
		 * 发送消息列表
		 */
		protected _infoList: Array<SocketInfo> = new Array<SocketInfo>();
		//
		private _socket: egret.WebSocket;
		private _address: string = StringConstants.Empty; 	//地址
		private _port: number;
		private _connectUrl: string;
		protected _msgType: string = egret.WebSocket.TYPE_BINARY;
		//event callback
		private _commandDispatcher: CallDispatcher<SpRpcResult> = new CallDispatcher<SpRpcResult>();
		private _errorDispatcher: CallDispatcher<SpRpcResult> = new CallDispatcher<SpRpcResult>();
		//
		private _normalErrorSet: HashSet<number> = new HashSet<number>(); 	//有错误码的包也正常解析
		//
		private _enabledSend: boolean = false; //close的时候，是否还允许发送
		//
		public static SOCKET_CONNECT_SUCCESS = "ClientNet_SOCKET_CONNECT_SUCCESS";
		public static SOCKET_CONNECT_CLOSE = "ClientNet_SOCKET_CONNECT_CLOSE";
		private _useHandshake: boolean = false;//是否使用握手
		protected _isHandshaking: boolean = false;//是否正在处理握手中


		constructor(useHandshake: boolean = false)
		{
			this._useHandshake = useHandshake;
		}

		public get enabledSend(): boolean
		{
			return this._enabledSend;
		}

		private _requestSessionMax: number = 0;
		//记录服务器主动通知协议的session的最大值
		public get requestSessionMax(): number
		{
			return this._requestSessionMax;
		}
		/// <summary>
		/// 添加正常解析的错误码包（命令事件正常执行，而不是执行错误事件）
		/// </summary>
		/// <param name="error"></param>
		public addNormalError(error: number)
		{
			this._normalErrorSet.add(error);
		}
		/// <summary>
		/// 移除正常解析的错误码包
		/// </summary>
		/// <param name="error"></param>
		public removeNormalError(error: number)
		{
			this._normalErrorSet.remove(error);
		}
		public get address(): string
		{
			return this._address;
		}
		public get port(): number
		{
			return this._port;
		}
		public dispose()
		{
			this._infoList = null;
			this._enabledSend = false;
			this.resetSocket();
			if (this._commandDispatcher != null)
			{
				this._commandDispatcher.dispose();
				this._commandDispatcher = null;
			}
			if (this._errorDispatcher != null)
			{
				this._errorDispatcher.dispose();
				this._errorDispatcher = null;
			}
			this._onResult = null;
		}
		/// <summary>
		/// 关闭连接
		/// </summary>
		/// <param name="enabledSend">socket关闭后，是否允许执行发送方法</param>
		public close(enabledSend: boolean = false)
		{
			this._enabledSend = enabledSend;
			this.resetSocket();
			this.RemoveNoDiscRetry();
		}
		/// <summary>
		/// 是否有断线重连后需要重发的数据
		/// </summary>
		public get hasDiscRetry(): boolean
		{
			if (this._infoList != null && this._infoList.length > 0)
			{
				for (let i: number = 0; i < this._infoList.length; i++)
				{
					if (this._infoList[i].isDiscRetry)
					{
						return true;
					}
				}
			}
			return false;
		}
		/**
		 * 重启socket
		 */
		private resetSocket()
		{
			if (this._socket != null)
			{
				try
				{
					this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
					this._socket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this); //添加链接打开侦听，连接成功会调用此方法
					this._socket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this); 	//添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
					this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this); 	//添加异常侦听，出现异常会调用此方法
					this._socket.close();
					this._socket = null;
					NotificationCenter.postNotification(BaseSocket.SOCKET_CONNECT_CLOSE);
				}
				catch (Exception)
				{
					Console.log(Exception.message, Exception.stack);
				}
			}
			this._isHandshaking = false;
		}
		//------------------------------------------------------------------
		// 
		//------------------------------------------------------------------
		/// <summary>
		/// 连接服务器
		/// </summary>
		/// <param name="ip"></param>
		/// <param name="port"></param>
		/// <param name="address"></param>

		Connect(port: number, address: string);
		Connect(url: string);
		public Connect(param: any, address?: string)
		{
			if (this._socket != null)
			{
				this.resetSocket();
			}
			this._socket = new egret.WebSocket();
			//设置数据格式为二进制，默认为字符串
			this._socket.type = this._msgType;
			//添加收到数据侦听，收到数据会调用此方法
			this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
			//添加链接打开侦听，连接成功会调用此方法
			this._socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
			//添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
			this._socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
			//添加异常侦听，出现异常会调用此方法
			this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);

			let typeStr = typeof (param);
			if (typeStr == "number")
			{
				this._address = address;
				this._port = param;
				//连接服务器
				this._socket.connect(this._address, this._port);
			}
			else
			{
				this._connectUrl = param;
				this._socket.connectByUrl(this._connectUrl);
			}
			window.addEventListener('offline', () =>
			{
				// this.onConnectClose();
				// this.onSocketClose();
				// NetFailed.getInstance().show(); //move todo
			});
		}
		/**
		 * 移除发送回调(只对回调有效，不影响事件侦听)
		 */
		public RemoveCall(cmdId: string, onResult: Function, thisObject: any)
		{
			if (this._infoList != null && this._infoList.length > 0 && onResult != null)
			{
				//会有多个，不能用break
				for (let i: number = this._infoList.length - 1; i >= 0; i--)
				{
					let item: SocketInfo = this._infoList[i];
					if (item.cmdId == cmdId && item.onResult != null && item.onResult == onResult && item.thisObject == thisObject)
					{
						this._infoList.splice(i, 1);
					}
				}
			}
		}
		private onSocketOpen(): void
		{
			if (this._socket == null)
			{
				return;
			}
			this._enabledSend = true;
			if (this._useHandshake)
			{
				this._isHandshaking = true;
				this.Handshake();
			}
			else
			{
				this._isHandshaking = false;
				this.DispatchMessage(new SocketMessage(SocketMessageType.Connect, "0", "connect succeed"));
			}
			NotificationCenter.postNotification(BaseSocket.SOCKET_CONNECT_SUCCESS);
		}
		/**
		 * 简单正常发送，没有断线重发，不能重复连续发送相同的命令
		 */
		public SimpleSend(cmdId: string, args: any = null)
		{
			this.InvokeSend(true, false, cmdId, args, undefined, undefined, undefined);
		}
		/**
		 * 简单正常发送，没有断线重发，不能重复连续发送相同的命令
		 */
		public SimpleCall(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any)
		{
			this.InvokeSend(true, false, cmdId, args, onResult, onError, thisObject);
		}
		/**
		 * 调用发送，如果没有连接继续执行发送，抛出异常,兼容重连
		 * <param name="isSole">一样的命令和回调是否独占发送，(如果是，当还没接收到上一个包的时候，再次发包，会忽略掉)</param>
		 * <param name="isDiscRetry">断线重发</param>
		 */
		public InvokeSend(isSole: boolean, isDiscRetry: boolean, cmdId: string, msg: protobuf.Writer, onResult: Function, onError: Function, thisObject: any)
		{
			if (this._enabledSend)
			{
				let info: SocketInfo = this.AddSocketInfo(isSole, isDiscRetry, cmdId, msg, onResult, onError, thisObject);
				if (info != null)
				{
					this.SendObject(info);
				}
			}
			else
			{
				if (isDiscRetry)
				{
					this.AddSocketInfo(isSole, isDiscRetry, cmdId, msg, onResult, onError, thisObject);
				}
			}
		}
		protected SendObject(info: SocketInfo)
		{
			if (this._socket == null)
			{
				this.DispatchMessage(new SocketMessage(SocketMessageType.NotInitialized, "-1", "NotInitialized"));
				return;
			}
			try
			{
				Console.log("Socket.Send-----------> cmdId:" + info.cmdId + "------params:", JSON.stringify(info.msg), "- >session:" + info.session);

				let msgId = this.findMsgId(info.cmdId);
				if (msgId == 0)
				{
					egret.error("传入了错误的消息名或Proto文件没有初始化");
					return;
				}
				let buffer = info.msg.finish();
				let sendMsg: egret.ByteArray = new egret.ByteArray();
				let dataMsg: egret.ByteArray = new egret.ByteArray(buffer);
				sendMsg.endian = egret.Endian.LITTLE_ENDIAN;
				sendMsg.writeShort(dataMsg.length + 4); //消息组合(内容+包头4字节)
				sendMsg.writeShort(msgId); //消息ID
				sendMsg.writeBytes(dataMsg);
				this._socket.writeBytes(sendMsg);
				this._socket.flush();
			}
			catch (e)
			{
				let msg: SocketMessage = new SocketMessage(SocketMessageType.SendError, '-1', e.message + "\n" + e.stack);
				this.DispatchMessage(msg);
			}
		}
		private findMsgId(msgName: string): number
		{
			if (table.ProtoIdByName[msgName])
			{
				return table.ProtoIdByName[msgName].Id;
			}
			return 0;
		}
		private onSocketClose(event: egret.Event): void
		{
			Console.log("WebSocket Close");
			this.DispatchMessage(new SocketMessage(SocketMessageType.Failing, "close", "Server Close"));
		}

		private onSocketError(event: egret.IOErrorEvent): void
		{
			Console.log("WebSocket connect error");
			this.DispatchMessage(new SocketMessage(SocketMessageType.NetworkError, "close", "WebSocket connect error"));
		}
		private onReceiveMessage(e: egret.Event): void
		{
			if (!this._socket)
			{
				return;
			}
			var _arr: egret.ByteArray = new egret.ByteArray();
			_arr.endian = egret.Endian.LITTLE_ENDIAN;
			this._socket.readBytes(_arr);
			var msgLength = _arr.readShort();
			var mainId = _arr.readShort();
			var cmdDataBA: egret.ByteArray = new egret.ByteArray();
			_arr.readBytes(cmdDataBA);

			this.onNotifyMessage(mainId, cmdDataBA);
			Console.log("receive server message" + " size:" + _arr.length);

			// this.handleRequest.bind(this), this.handleResponse.bind(this)
		}

		//解析分发消息
		private onNotifyMessage(mainId: number, cmdDataBA: egret.ByteArray)
		{
			let protoData = table.ProtoIdById[mainId];
			let msgName = protoData.Name;
			let decoded = msg[msgName.slice(4)].decode(cmdDataBA.bytes);
			if (msgName.indexOf("Push") != -1) //推送协议
			{
				this.handleRequest(msgName, decoded, undefined, undefined);
			}
			else
			{
				let idx = msgName.indexOf("Ret");  //替换名字
				let retName = msgName.substr(idx + 3);
				for (let protoInfo of table.ProtoId)
				{
					if (msgName != protoInfo.Name && protoInfo.Name.indexOf(retName) != -1)
					{
						msgName = protoInfo.Name;
						break;
					}
				}
				this.handleResponse(msgName, decoded, undefined, undefined);
			}
			NotificationCenter.postNotification(msgName, decoded);
		}
		private handleRequest(name: string, data: any, session: number, error: number)
		{
			if (error == undefined)
			{
				error = 0;
			}
			Console.log("server-push-----> cmdId:" + name, "-> session:" + session, "-> error:" + error);
			let spRpcResult: SpRpcResult = new SpRpcResult();
			spRpcResult.cmdId = name;
			spRpcResult.data = data;
			spRpcResult.error = error;
			spRpcResult.op = SpRpcOp.Request;
			spRpcResult.session = session;
			if (this._requestSessionMax < session)
			{
				this._requestSessionMax = session;
			}
			if (this._useHandshake && this._isHandshaking) 
			{
				this.ParseHandshake(spRpcResult);
			}
			else
			{
				this.DispatchResult(spRpcResult);
				if (spRpcResult.error == 0 || this._normalErrorSet.contains(spRpcResult.error))
				{
					this.DispatchCommand(name, spRpcResult);
				}
				else
				{
					if (this.enabledErrorCode)
					{
						this.DispatchError(name, spRpcResult);
					}
				}
			}
		}
		private handleResponse(name: string, data: any, session: number, error: number)
		{
			if (error == undefined)
			{
				error = 0;
			}
			Console.log("client receive ------------> cmdId:" + name + "-> session:" + session, "-> error:" + error);
			let info: SocketInfo = this.RemoveSocketInfo(name);
			// let info: SocketInfo = this.RemoveSocketInfo(session);
			let spRpcResult: SpRpcResult = new SpRpcResult();
			spRpcResult.cmdId = name;
			spRpcResult.data = data;
			spRpcResult.error = error;
			spRpcResult.op = SpRpcOp.Response;
			spRpcResult.session = session;
			if (this._useHandshake && this._isHandshaking) 
			{
				this.ParseHandshake(spRpcResult);
			}
			else
			{
				this.DispatchResult(spRpcResult);
				if (spRpcResult.error == 0 || this._normalErrorSet.contains(spRpcResult.error))
				{
					if (info && info.onResult)
					{
						FuncUtil.invoke(info.onResult, info.thisObject, spRpcResult);
					}
					else
					{
						this.DispatchCommand(name, spRpcResult);
					}
				}
				else
				{
					if (this.enabledErrorCode)
					{
						if (info && info.onError)
						{
							FuncUtil.invoke(info.onError, info.thisObject, spRpcResult);
						}
						else
						{
							this.DispatchError(name, spRpcResult);
						}
					}
				}
			}
		}
		/// <summary>
		/// 移除不是断线重发的信息(目前有close的时候使用)
		/// </summary>
		private RemoveNoDiscRetry()
		{
			if (this._infoList != null && this._infoList.length > 0)
			{
				for (let i = this._infoList.length - 1; i >= 0; i--)
				{
					if (this._infoList[i].isDiscRetry == false)
					{
						this._infoList.splice(i, 1);
					}
				}
			}
		}
		private AddSocketInfo(isSole: boolean, isDiscRetry: boolean, cmdId: string, msg: protobuf.Writer, onResult: Function, onError: Function, thisObject: any): SocketInfo
		{
			if (this._infoList != null)
			{
				if (isSole && this._infoList.length > 0)
				{
					//过滤独占的发送
					for (let i: number = 0; i < this._infoList.length; i++)
					{
						let item: SocketInfo = this._infoList[i];
						if (item.isSole && item.cmdId == cmdId && item.onResult == onResult && item.thisObject == thisObject)
						{
							return null;
						}
					}
				}
				//
				this._session++;
				let info: SocketInfo = new SocketInfo();
				info.session = this._session;
				info.cmdId = cmdId;
				info.isDiscRetry = isDiscRetry;
				info.isSole = isSole;
				info.msg = msg;
				info.onResult = onResult;
				info.onError = onError;
				info.thisObject = thisObject;
				this._infoList.push(info);
				return info;
			}
			return null;
		}
		private RemoveSocketInfo(msgName: string): SocketInfo
		{
			if (this._infoList != null && this._infoList.length > 0)
			{
				for (let i: number = 0; i < this._infoList.length; i++)
				{
					let info: SocketInfo = this._infoList[i];
					if (info.cmdId == msgName)
					{
						this._infoList.splice(i, 1);
						return info;
					}
				}
			}
			return null;
		}
		protected Handshake()
		{
		}
		protected ParseHandshake(result: SpRpcResult)
		{

		}
		//------------------------------------------------------------------
		// Message
		//------------------------------------------------------------------

		private _onSocketMessage: DelegateDispatcher;
		public AddMessageListener(listener: Function, thisObject: any)
		{
			if (this._onSocketMessage == null)
			{
				this._onSocketMessage = new DelegateDispatcher();
			}
			this._onSocketMessage.addListener(listener, thisObject);
		}
		public RemoveMessageListener(listener: Function, thisObject: any)
		{
			if (this._onSocketMessage)
			{
				this._onSocketMessage.removeListener(listener, thisObject);
			}
		}
		protected DispatchMessage(msg: SocketMessage)
		{
			if (this._onSocketMessage)
			{
				this._onSocketMessage.dispatch(msg);
			}
		}

		//------------------------------------------------------------------
		// Result
		//------------------------------------------------------------------

		private _onResult: DelegateDispatcher;
		/**
		 * 广播服务器返回结果，全局的。只有客户端主动请求才会广播事件
		 */
		public AddResultListener(listener: Function, thisObject: any)
		{
			if (this._onResult == null)
			{
				this._onResult = new DelegateDispatcher();
			}
			this._onResult.addListener(listener, thisObject);
		}
		public RemoveResultListener(listener: Function, thisObject: any)
		{
			if (this._onResult)
			{
				this._onResult.removeListener(listener, thisObject);
			}
		}
		private DispatchResult(result: SpRpcResult)
		{
			if (this._onResult)
			{
				this._onResult.dispatch(result);
			}
		}

		//------------------------------------------------------------------
		// Command
		//------------------------------------------------------------------

		/// <summary>
		/// 添加命令侦听
		/// </summary>
		/// <param name="cmdId"></param>
		/// <param name="listener"></param>
		public AddCommandListener(cmdId: string, listener: Function, thisObject: any)
		{
			this._commandDispatcher.addListener(cmdId, listener, thisObject);
		}
		/// <summary>
		/// 移除命令侦听
		/// </summary>
		/// <param name="cmdId"></param>
		/// <param name="listener"></param>
		/// <param name="thisObject"></param>
		public RemoveCommandListener(cmdId: string, listener: Function, thisObject: any)
		{
			this._commandDispatcher.removeListener(cmdId, listener, thisObject);
		}
		/// <summary>
		/// 广播命令侦听
		/// </summary>
		/// <param name="cmdId"></param>
		/// <param name="result"></param>
		private DispatchCommand(cmdId: string, result: SpRpcResult)
		{
			this._commandDispatcher.dispatch(cmdId, result);
		}
		/// <summary>
		/// 添加错误侦听
		/// </summary>
		/// <param name="cmdId"></param>
		/// <param name="listener"></param>
		public AddErrorListener(cmdId: string, listener: Function, thisObject: any)
		{
			this._errorDispatcher.addListener(cmdId, listener, thisObject);
		}
		/// <summary>
		/// 移除错误侦听
		/// </summary>
		/// <param name="cmdId"></param>
		/// <param name="listener"></param>
		/// <param name="thisObject"></param>
		public RemoveErrorListener(cmdId: string, listener: Function, thisObject: any)
		{
			this._errorDispatcher.removeListener(cmdId, listener, thisObject);
		}
		/// <summary>
		/// 广播错误侦听
		/// </summary>
		/// <param name="cmdId"></param>
		/// <param name="result"></param>
		private DispatchError(cmdId: string, result: SpRpcResult)
		{
			this._errorDispatcher.dispatch(cmdId, result);
		}
	}
}