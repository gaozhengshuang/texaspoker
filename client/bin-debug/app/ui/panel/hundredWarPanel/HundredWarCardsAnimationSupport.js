var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 百人大战牌动画
 */
var HundredWarCardsAnimationSupport = (function () {
    function HundredWarCardsAnimationSupport(target) {
        this.context = target;
    }
    HundredWarCardsAnimationSupport.prototype.clear = function () {
        if (this._actionList) {
            this._actionList.foreach(this.clearAnimation, this);
        }
    };
    HundredWarCardsAnimationSupport.prototype.clearAnimation = function (key, item) {
        item.clear();
    };
    /**
     * 比牌动画
     */
    HundredWarCardsAnimationSupport.prototype.runThanTheCardAnim = function (pointList) {
        for (var i = 0; i < pointList.length; i++) {
            this.startRunThanTheCardAnim(pointList[i], this.context["card" + i], i + 1);
        }
    };
    HundredWarCardsAnimationSupport.prototype.startRunThanTheCardAnim = function (point, target, index) {
        var run = this.getAnimation(AnimationType.CardFaceMoveToPoint, target, index);
        run.nextAnimation = this.getAnimation(AnimationType.CardFaceTurnToFace, target, index);
        run.nextAnimation.scale = 0.7;
        var initX = 0;
        if (index == 1) {
            initX = point.x + 15;
        }
        else {
            initX = point.x - 15;
        }
        run.run(point, initX);
    };
    HundredWarCardsAnimationSupport.prototype.getAnimation = function (type, target, index) {
        if (!this._actionList) {
            this._actionList = new qin.Dictionary();
        }
        var key = type.toString() + "_" + index.toString();
        if (!this._actionList.containsKey(key)) {
            var run = AnimationFactory.getCardFaceAnimation(type);
            run.setTarget(target);
            this._actionList.add(key, run);
            return run;
        }
        return this._actionList.getValue(key);
    };
    return HundredWarCardsAnimationSupport;
}());
__reflect(HundredWarCardsAnimationSupport.prototype, "HundredWarCardsAnimationSupport");
//# sourceMappingURL=HundredWarCardsAnimationSupport.js.map