var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 龙骨动画生成器
 */
var BoneAnimationCreater = (function () {
    function BoneAnimationCreater() {
    }
    /**
     * 创建龙骨动画
     */
    BoneAnimationCreater.CreateBoneAnimation = function (name, parent, times, timeScale, onComplete) {
        if (onComplete === void 0) { onComplete = function () { }; }
        if (!BoneAnimation._boneList) {
            BoneAnimation._boneList = new qin.Dictionary();
        }
        if (BoneAnimation._boneList.containsKey(name) && !BoneAnimation._boneList.getValue(name).isLoaded) {
            return;
        }
        var info = BoneAnimation._boneList.getValue(name);
        if (name == BoneAnimeName.HallLiuGuang) {
            BoneAnimation.resBoneAnime(info, ResFixedFileName.LiuGuang_Config, ResFixedFileName.LiuGuang_Img, name, parent, 90, 21, onComplete);
        }
    };
    return BoneAnimationCreater;
}());
__reflect(BoneAnimationCreater.prototype, "BoneAnimationCreater");
//# sourceMappingURL=BoneAnimationCreater.js.map