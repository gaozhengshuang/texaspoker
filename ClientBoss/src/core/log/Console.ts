module game
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
					str = ' | roleId:' + Console.roleId + str;
				}
				return game.formatTime(new Date()) + str;
			}
			else
			{
				if (Console.roleId !== undefined && Console.roleId !== null)
				{
					return game.formatTime(new Date()) + ' | roleId:' + Console.roleId + ' | ' + args;
				}
				else
				{
					return game.formatTime(new Date()) + ' | ' + args;
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
	}
}