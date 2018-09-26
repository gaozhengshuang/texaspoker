module game
{
	/**
	 * 消息发送
	 */
	export class SocketInfo
	{
		/**
		 * 内容
		 */
		public msg: protobuf.Writer;
		/**
		 * 会话
		 */
		public session: number;
		public cmdId: string;
		/**
		 * 是否断线重发
		 */
		public isDiscRetry: boolean;
		/**
		 * 是否独占
		 */
		public isSole: boolean;
		public onResult: Function;
		public onError: Function;
		public thisObject: any;
		/**
		 * 包裹一层的子协议 由于服务器有网关到特定的服务器的数据交互导致的.发送的是包裹协议号，返回的是子协议号. 子协议暂不支持AddCommandListener的形式回调，支持call
		 */
		public subId:string;
	}
}