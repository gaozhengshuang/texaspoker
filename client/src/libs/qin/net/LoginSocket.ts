namespace qin
{
	export class LoginSocket extends BaseSocket
	{
		constructor()
		{
			super(false);
		}
		public initialize(buff: ArrayBuffer, msgType: string = egret.WebSocket.TYPE_BINARY)
		{
			this._msgType = msgType;
			if (buff)
			{
				let dataView: DataView = new DataView(buff);
				let schema: Array<any> = new Array<any>();
				for (var i = 0; i < dataView.byteLength; i++)
				{
					schema[i] = dataView.getUint8(i);
				}
				if (schema.length > 0)
				{
					this._spRpc = Sproto.createNew({ buf: schema, sz: schema.length });
				}
				if (!this._spRpc)
				{
					Console.log("创建Sproto对象失败!");
				}
			}
		}
	}
}