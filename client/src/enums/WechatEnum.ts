/**
 * 微信交易类型
 */
class WxTradeType
{
	public static readonly JSAPI: string = 'JSAPI';
	public static readonly NATIVE: string = 'NATIVE';
	public static readonly MWEB: string = 'MWEB';
}
/**
 * 微信授权类型
 */
class WxAuthorizeType
{
	/**
	 * 应用
	 */
	public static readonly App: string = 'app';
	/**
	 * 公众号
	 */
	public static readonly Public: string = 'public';
	/**
	 * 网站
	 */
	public static readonly Web: string = 'web';
}