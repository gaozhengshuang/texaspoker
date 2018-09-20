module game
{
	/**
	 * 加密
	 */
	export class Crypt
	{
		private static _md5: md5 = new md5();
		/**
		 * MD5加密
		 */
		public static hex_md5(target: string): string
		{
			return Crypt._md5.hex_md5(target);
		}
	}
}