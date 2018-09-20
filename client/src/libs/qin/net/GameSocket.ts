module qin
{
	/// <summary>
	/// 客户端socket，异步的
	/// </summary>
	export class GameSocket extends BaseSocket
	{
		private _userId: number;
		private _roleId: number;
		private _serverId: number;
		private _secret: string;
		private _session1: number;
		private _handshakeMsgId = 0;//握手id，自增

		constructor()
		{
			super(true);
		}
		/// <summary>
		/// 用户账号id
		/// </summary>
		public get userId(): number
		{
			return this._userId;
		}
		/// <summary>
		/// 角色id(是在握手包返回的，从这里取)
		/// </summary>
		public get roleId(): number
		{
			return this._roleId;
		}

		//------------------------------------------------------------------
		// 
		//------------------------------------------------------------------
		public initialize(userId: number, roleId: number, serverId: number, secret: string, session: number, msgType: string = egret.WebSocket.TYPE_BINARY)
		{
			this._userId = userId;
			this._roleId = roleId;
			this._serverId = serverId;
			this._secret = secret;
			this._session1 = session;
			this._msgType = msgType;
		}
		/// <summary>
		/// 调用断线重发
		/// </summary>
		public InvokeDiscRetry()
		{
			if (this._infoList != null && this._infoList.length > 0)
			{
				for (let i: number = 0; i < this._infoList.length; i++)
				{
					let info: SocketInfo = this._infoList[i];
					if (info.isDiscRetry)
					{
						this.SendObject(info);//不能使用InvokeSend，不然会被重复添加进_infoList，问题很严重
					}
				}
			}
		}
		protected Handshake()
		{
			this._handshakeMsgId++;
			this.SimpleSend(BaseSocket.HandshakeName, { "session": this._session1, "userid": this._userId, "roleid": 0, "serverid": this._serverId, "token": "" }); //move todo
		}
		protected ParseHandshake(result: SpRpcResult)
		{
			if (result.cmdId == BaseSocket.HandshakeName)
			{
				this._isHandshaking = false;
				if (result.error == 0)
				{
					this._roleId = result.data["roleid"];
					super.DispatchMessage(new SocketMessage(SocketMessageType.Connect, "0", "handshake succeed"));
				}
				else
				{
					super.DispatchMessage(new SocketMessage(SocketMessageType.HandshakeError, result.error.toString(), "handshake failed"));
				}
			}
		}
	}
}