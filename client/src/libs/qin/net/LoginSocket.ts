module game
{
	export class LoginSocket extends BaseSocket
	{
		constructor()
		{
			super(false);
		}
		public initialize(msgType: string = egret.WebSocket.TYPE_BINARY)
		{
			this._msgType = msgType;
		}
	}
}