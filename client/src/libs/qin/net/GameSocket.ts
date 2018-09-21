module game
{
	/// <summary>
	/// 客户端socket，异步的
	/// </summary>
	export class GameSocket extends BaseSocket
	{
		constructor()
		{
			super(false);
		}
		//------------------------------------------------------------------
		// 
		//------------------------------------------------------------------
		public initialize(msgType: string = egret.WebSocket.TYPE_BINARY)
		{
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
	}
}