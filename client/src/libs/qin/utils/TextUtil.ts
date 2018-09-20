module qin
{
	export class TextUtil
	{
		private static _htmlParser: egret.HtmlTextParser = new egret.HtmlTextParser();
		public static get htmlParser(): egret.HtmlTextParser
		{
			return TextUtil._htmlParser;
		}
		public static parse(htmltext: string):egret.ITextElement[]
		{
			return TextUtil.htmlParser.parse(htmltext);
		}
	}
}