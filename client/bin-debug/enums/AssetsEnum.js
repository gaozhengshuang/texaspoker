var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * assets资源后缀，无版本管理
 */
var AssetsSuffixName = (function () {
    function AssetsSuffixName() {
    }
    AssetsSuffixName.JSON = ".json";
    AssetsSuffixName.MP3 = ".mp3";
    AssetsSuffixName.JPG = ".jpg";
    AssetsSuffixName.PNG = ".png";
    AssetsSuffixName.ZIP = ".zip";
    return AssetsSuffixName;
}());
__reflect(AssetsSuffixName.prototype, "AssetsSuffixName");
//# sourceMappingURL=AssetsEnum.js.map