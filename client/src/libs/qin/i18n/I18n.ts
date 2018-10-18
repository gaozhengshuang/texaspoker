
/**
 * 国际化
 */
class I18n
{
	/**
	 * 默认语言
	 */
	public static readonly DefaultLang: string = 'zh-cn';
	private static _langs: string[];
	/**
	 * 当前支持的语言列表(第一位为默认语言，当使用未支持的语言时候，使用此语言)
	 */
	public static langs(): string[]
	{
		return I18n._langs;
	}
	private static _lang: string;
	/**
	 * 当前语言
	 */
	public static get lang(): string
	{
		return I18n._lang;
	}
	/**
	 * 当前是否是默认语言
	 */
	public static get isDefault()
	{
		return I18n._lang == null || I18n._lang == I18n.DefaultLang;
	}
	private static _map: Object;
	/**
	 * 初始化系统
	 */
	public static initSystem(uslang: string, langs: string[]): void
	{
		if (langs == null || langs.length <= 0)
		{
			langs = [I18n.DefaultLang];
		}
		else
		{
			for (let i: number = 0; i < langs.length; i++)
			{
				langs[i] = langs[i].toLowerCase();
			}
		}
		I18n._langs = langs;
		if (game.StringUtil.isNullOrEmpty(uslang) == false)
		{
			uslang = uslang.toLowerCase();
			I18n._lang = (I18n._langs.indexOf(uslang) >= 0) ? uslang : langs[0];
			return;
		}
		I18n._lang = egret.Capabilities.language.toLowerCase();
		if (I18n._langs.indexOf(I18n._lang) < 0)
		{
			I18n._lang = langs[0];
		}
	}
	/**
	 * 初始化映射表
	 */
	public static initMap(data: string): void
	{
		I18n._map = null;
		if (game.StringUtil.isNullOrEmpty(data) == false)
		{
			I18n._map = JSON.parse(data);
		}
	}
	/**
	 * 清空映射
	 */
	public static clear(): void
	{
		I18n._map = null;
	}
	/**
	 * 获取语言文本
	 */
	public static getText(key: string): string
	{
		if (I18n._map == null || game.StringUtil.isNullOrEmpty(key))
		{
			return key;
		}
		let text: string = I18n._map[key];
		if (game.StringUtil.isNullOrEmpty(text))
		{
			return key;
		}
		return text;
	}
}