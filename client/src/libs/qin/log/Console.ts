module qin
{
	/**
	 * 日志
	 */
	export class Console
	{
		public static enabled: boolean = false;
		public static roleId: number;

		private static formatArgs(args: any): string
		{
			if (args)
			{
				let str: string = '';
				for (let i: number = 0; i < args.length; i++)
				{
					str += ' | ' + args[i];
				}
				if (Console.roleId !== undefined && Console.roleId !== null)
				{
					str = ' | self-roleId:' + Console.roleId + str;
				}
				return DateTimeUtil.formatDate() + str;
			}
			else
			{
				if (Console.roleId !== undefined && Console.roleId !== null)
				{
					return DateTimeUtil.formatDate() + ' | self-roleId:' + Console.roleId + ' | ' + args;
				}
				else
				{
					return DateTimeUtil.formatDate() + ' | ' + args;
				}
			}
		}
		public static log(...args):void
		{
			if(Console.enabled)
			{
				let result: string = Console.formatArgs(args);
				console.log(result);
			}
		}
		public static logError(...args):void
		{
			if(Console.enabled)
			{
				let err: Error = new Error();
				let result: string = Console.formatArgs(args);
				console.log(result + ' | ' + err.stack);
			}
		}
		public static logSocket(msg: SocketMessage):void
		{
			if(Console.enabled)
			{
				Console.log('qin.SocketMessageType.'+msg.type+': code['+msg.errorCode+'] message['+msg.message+']');
			}
		}
	}
}