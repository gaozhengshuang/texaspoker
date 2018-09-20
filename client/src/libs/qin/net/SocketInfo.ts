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
	}
}