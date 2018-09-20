namespace qin
{
	/**
	 * url功能，部分api只有web版才可使用
	 */
	export class UrlUtil
	{
		public static getCurrentPublicUrl(removeQuerys?:string[]): string
		{
			let query: Object = qin.UrlUtil.getCurrentQueryMap();
			if(removeQuerys && removeQuerys.length > 0)
			{
				for(let name of removeQuerys)
				{
					delete query[name];
				}
			}
			return qin.UrlUtil.getCurrentHostPath() + "?" + qin.UrlUtil.toHttpQuery(query);
		}
		/**
		 * 获取当前url的主机路径
		 */
		public static getCurrentHostPath(): string
		{
			let url = window.location.href;
			let index = url.indexOf('?');
			if(index >= 0)
			{
				url = url.substr(0, index);
			}
			return url;
		}
		/**
		 * 获取当前url目录
		 */
		public static getCurrentHostDirectory(): string
		{
			let url: string = qin.UrlUtil.getCurrentHostPath();
			let index: number = url.lastIndexOf("/");
			if (index >= 0)
			{
				url = url.substr(0, index + 1);
			}
			return url;
		}
		/**
		 * 获取当前url的参数表
		 */
		public static getCurrentQueryMap(): Object
		{
			return new egret.URLVariables(window.location.search).variables;
		}
		/**
		 * http参数转对象
		 */
		public static toQueryMap(search): Object
		{
			return new egret.URLVariables(search).variables;
		}
		/**
		 * 对象转http参数
		 */
		public static toHttpQuery(obj: Object): string
		{
			let urlv: egret.URLVariables = new egret.URLVariables();
			urlv.variables = obj;
			return urlv.toString();
		}
	}
}