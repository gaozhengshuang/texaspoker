/**
 * 路径名
 * */
class PathName
{
	/**
	 * 资源根目录
	 */
	public static readonly ResourceDirectory: string = "resource/";
	/**
	 * 面板皮肤目录
	 */
	public static readonly SkinsPanelDirectory = PathName.ResourceDirectory + 'skins/panel/';
	/**
	 * 资源路径
	 */
	public static readonly AssetsDirectory: string = PathName.ResourceDirectory + "assets/";
	/**
	 * 配置表路径
	 */
	public static readonly ConfigDirectory: string = PathName.ResourceDirectory + "config/";
	/**
	 * 音效
	 */
	public static readonly SoundDirectory: string = PathName.AssetsDirectory + "sound/";
	/**
	 * 背景图根目录
	 */
	public static readonly BgDirectory: string = PathName.AssetsDirectory + "bg/";
	/**
	 * 表情目录
	*/
	public static readonly EmojiDirectory: string = PathName.AssetsDirectory + "emoji/";
	/**
	 * 语言目录
	 */
	public static readonly LangDirectory: string = PathName.AssetsDirectory + "lang/";
	/**
	 * 包差异化资源目录
	 */
	public static readonly BundleDirectory: string = PathName.AssetsDirectory + "bundle/"
	/**
	 * 配置表文件列表文件路径
	 */
	public static readonly Config_files_txt: string = PathName.ConfigDirectory + "files.txt";
	public static readonly Config_loginall_bin: string = PathName.ConfigDirectory + "loginall.bin";
	public static readonly Config_c2s_bin: string = PathName.ConfigDirectory + "c2s.bin";
	public static readonly Config_s2c_bin: string = PathName.ConfigDirectory + "s2c.bin";
	public static readonly Default_thm_json: string = PathName.ResourceDirectory + "default.thm.json";
	public static readonly Default_res_json: string = PathName.ResourceDirectory + "default.res.json";
}