namespace qin
{
	/**
	 * 消息类型
	 */
	export enum SocketMessageType
	{
		None = 0,
		/**
		 * 连接
		 */
		Connect = 1,
		/**
		 * 网络错误，网络不可用,连接断开
		 */
		NetworkError = 2,
		/**
		 * 失败，需要重新登录的
		 */
		Failing = 3,
		/**
		 * 握手错误
		 */
		HandshakeError = 4,
		/**
 		* 协议发送出错
 		*/
		SendError = 5,
		/**
		 * 初始化异常
		 */
		NotInitialized = 6
	}
	/**
	 * 通信消息
	 */
	export class SocketMessage
	{
		private _type: SocketMessageType;
		/**
		 * 消息类型
		 */
		public get type(): SocketMessageType
		{
			return this._type;
		}
		/**
		 * 错误码
		 */
		private _errorCode: string;
		public get errorCode()
		{
			return this._errorCode;
		}
		private _message: string;
		/**
		 * 消息
		 */
		public get message(): string
		{
			return this._message;
		}
		public constructor(msgType: SocketMessageType, errorCode: string, msg: string)
		{
			this._type = msgType;
			this._errorCode = errorCode;
			this._message = msg;
		}
	}
}