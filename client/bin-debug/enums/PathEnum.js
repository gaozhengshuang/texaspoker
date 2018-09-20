var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 路径名
 * */
var PathName = (function () {
    function PathName() {
    }
    /**
     * 资源根目录
     */
    PathName.ResourceDirectory = "resource/";
    /**
     * 面板皮肤目录
     */
    PathName.SkinsPanelDirectory = PathName.ResourceDirectory + 'skins/panel/';
    /**
     * 资源路径
     */
    PathName.AssetsDirectory = PathName.ResourceDirectory + "assets/";
    /**
     * 配置表路径
     */
    PathName.ConfigDirectory = PathName.ResourceDirectory + "config/";
    /**
     * 音效
     */
    PathName.SoundDirectory = PathName.AssetsDirectory + "sound/";
    /**
     * 背景图根目录
     */
    PathName.BgDirectory = PathName.AssetsDirectory + "bg/";
    /**
     * 表情目录
    */
    PathName.EmojiDirectory = PathName.AssetsDirectory + "emoji/";
    /**
     * 语言目录
     */
    PathName.LangDirectory = PathName.AssetsDirectory + "lang/";
    /**
     * 包差异化资源目录
     */
    PathName.BundleDirectory = PathName.AssetsDirectory + "bundle/";
    /**
     * 配置表文件列表文件路径
     */
    PathName.Config_files_txt = PathName.ConfigDirectory + "files.txt";
    PathName.Config_loginall_bin = PathName.ConfigDirectory + "loginall.bin";
    PathName.Config_c2s_bin = PathName.ConfigDirectory + "c2s.bin";
    PathName.Config_s2c_bin = PathName.ConfigDirectory + "s2c.bin";
    PathName.Default_thm_json = PathName.ResourceDirectory + "default.thm.json";
    PathName.Default_res_json = PathName.ResourceDirectory + "default.res.json";
    return PathName;
}());
__reflect(PathName.prototype, "PathName");
//# sourceMappingURL=PathEnum.js.map