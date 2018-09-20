namespace qin
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
		public initialize(userId: number, roleId: number, serverId: number, secret: string, session: number, c2s: ArrayBuffer, s2c: ArrayBuffer, msgType: string = egret.WebSocket.TYPE_BINARY)
		{
			this._userId = userId;
			this._roleId = roleId;
			this._serverId = serverId;
			this._secret = secret;
			this._session1 = session;
			this._msgType = msgType;
			if (c2s && s2c)
			{
				let s2cSchema: Array<any> = this.getSchema(s2c);
				let s2cSpRpc: Sproto.CreateNewRet;
				if (s2cSchema.length > 0)
				{
					s2cSpRpc = Sproto.createNew({ buf: s2cSchema, sz: s2cSchema.length });
				}

				// let obj1 = JSON.parse(JSON.stringify(s2cSpRpc.proto));
				// let idxoper = function addIdx(target)
				// {
				// 	for (let i = 0; i < target.length; i++)
				// 	{
				// 		target[i].index = i;
				// 	}
				// 	console.log(JSON.stringify(target));
				// }
				// idxoper(obj1);
				// let obj2 = JSON.parse(JSON.stringify(s2cSpRpc.type));
				// idxoper(obj2);

				let c2sSchema: Array<any> = this.getSchema(c2s);
				if (c2sSchema.length > 0)
				{
					this._spRpc = Sproto.createNew({ buf: c2sSchema, sz: c2sSchema.length });

					// let obj3 = JSON.parse(JSON.stringify(this._spRpc.proto));
					// idxoper(obj3);

					// let obj4 = JSON.parse(JSON.stringify(this._spRpc.type));
					// idxoper(obj4);

					if (s2cSpRpc)
					{
						this._spRpc.s2cProtocol_n = s2cSpRpc.protocol_n;
						this._spRpc.s2cProto = s2cSpRpc.proto;
						this._spRpc.protocol_n += s2cSpRpc.protocol_n;
						this._spRpc.proto = this._spRpc.proto.concat(s2cSpRpc.proto);


						//移动子类型索引
						for (let tp of s2cSpRpc.type)
						{
							for (let obj of tp.f)
							{
								if (obj.st)
								{
									obj.st = obj.st + this._spRpc.type_n;
								}
							}
						}
						this._spRpc.type_n += s2cSpRpc.type_n;
						this._spRpc.type = this._spRpc.type.concat(s2cSpRpc.type);

						s2cSchema = null;
						s2cSpRpc = null;
					}
				}
				if (!this._spRpc)
				{
					Console.log("创建Sproto对象失败!");
				}
			}
		}
		private getSchema(buf: ArrayBuffer): Array<any>
		{
			let dataView: DataView = new DataView(buf);
			let schema: Array<any> = new Array<any>();
			for (var i = 0; i < dataView.byteLength; i++)
			{
				schema[i] = dataView.getUint8(i);
			}
			return schema;
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
			this.SimpleSend(BaseSocket.HandshakeName, { "session": this._session1, "userid": this._userId, "roleid": 0, "serverid": this._serverId, "token": Crypt.HmacSha1(this._secret, StringUtil.format("{0},{1}", this._userId, this._handshakeMsgId)) });
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