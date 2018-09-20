module qin
{
	export class RegexUtil
	{
		private static readonly _cnRegex: RegExp = new RegExp("^[\u4e00-\u9fa5]+$");//中文（简、繁）
		private static readonly _enRegex: RegExp = new RegExp("^[A-Za-z]+$");//英文
		//
		private static readonly _uintRegex = new RegExp("^[0-9]+$");//无符号整数
		private static readonly _enNumRegex = new RegExp("^[A-Za-z0-9]+$");//英文和数字
		private static readonly _numericRegex = new RegExp("^[+-]?\d*[.]?\d*$"); //是否是数字（包含整数、浮点数）
		//
		private static readonly _legalTextRegex = new RegExp("[~!@#$%^&*()=+[\\]{}''\";:/?.,><`|！·￥…—（）\\-、；：。，》《]");
		/**
		 * 是否是合法的文本（不包含特殊字符的）
		 */
		public static IsLegalText(text: string): boolean
		{
			if (RegexUtil._legalTextRegex.test(text))
			{
				return true;
			}
			return false;
		}
		/**
		 * 只能包含中文
		 */
		public static IsChinese(text: string): boolean
		{
			if (RegexUtil._cnRegex.test(text))
			{
				return true;
			}
			return false;
		}
		/**
		 * 只能包含英文
		 */
		public static IsEnglish(text: string): boolean
		{
			if (RegexUtil._enRegex.test(text))
			{
				return true;
			}
			return false;
		}
		/**
		 * 是否是无符号整数
		 */
		public static IsUInt(text: string): boolean
		{
			if (RegexUtil._uintRegex.test(text))
			{
				return true;
			}
			return false;
		}
		/**
		 * 只能包含英文和数字
		 */
		public static IsEnglishAndNumber(text: string): boolean
		{
			if (RegexUtil._enNumRegex.test(text))
			{
				return true;
			}
			return false;
		}
		/**
		 * 是否是数字（包含整数、浮点数）
		 */
		public static IsNumeric(value: string): boolean
		{
			return RegexUtil._numericRegex.test(value);
		}
		/**
		 * 是否是手机号码
		 */
		public static isPhoneNumber(value:string):boolean
		{
			if(!value || value.length < 6 || value.length > 12)
			{
				return false;
			}
			return value.match(/^1\d{10}$/) != null;
		}
	}
}