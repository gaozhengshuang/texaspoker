var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 头像组件动画
 */
var GamblingHeadCardAnimationSupport = (function () {
    function GamblingHeadCardAnimationSupport(target) {
        this.context = target;
    }
    GamblingHeadCardAnimationSupport.prototype.clear = function () {
        if (this._actionList) {
            this._actionList.foreach(this.clearAnimation, this);
        }
    };
    GamblingHeadCardAnimationSupport.prototype.clearAnimation = function (key, item) {
        item.clear();
    };
    /**
    * 发牌跑自己的手牌动画
    */
    GamblingHeadCardAnimationSupport.prototype.runSelfCard = function (callback, thisObject) {
        if (GamblingUtil.isOmaha) {
            var run = this.getAnimation(AnimationType.OmahaSelfCard1Appear, this.context.cardFace1, 1);
            var run2 = this.getAnimation(AnimationType.OmahaSelfCard2Appear, this.context.cardFace2, 2);
            var run3 = this.getAnimation(AnimationType.OmahaSelfCard3Appear, this.context.cardFace3, 3);
            var run4 = this.getAnimation(AnimationType.OmahaSelfCard4Appear, this.context.cardFace4, 4);
            run4.callBack = new qin.Delegate(callback, thisObject);
            run.run(true);
            run2.run(true);
            run3.run(true);
            run4.run(true);
        }
        else {
            var run = this.getAnimation(AnimationType.SelfCard1Appear, this.context.cardFace1, 1);
            var run2 = this.getAnimation(AnimationType.SelfCard2Appear, this.context.cardFace2, 2);
            run2.callBack = new qin.Delegate(callback, thisObject);
            run.run(true);
            run2.run(true);
        }
    };
    /**
    * 一局完了亮牌
    */
    GamblingHeadCardAnimationSupport.prototype.runBrightCard = function (callBack, thisObj, roleId) {
        if (GamblingUtil.isOmaha) {
            if (roleId == UserManager.userInfo.roleId) {
                this.startRunBrightCard(this.context.cardFace1, 0, 0, 38, 98, null, null, 1);
                this.startRunBrightCard(this.context.cardFace2, 0, 0, 58, 98, null, null, 2);
                this.startRunBrightCard(this.context.cardFace3, 0, 0, 78, 98, null, null, 3);
                this.startRunBrightCard(this.context.cardFace4, 0, 0, 98, 98, callBack, this, 4);
            }
            else {
                this.startRunBrightCard(this.context.cardFace1, 0, 0, 55, 98, null, null, 1);
                this.startRunBrightCard(this.context.cardFace2, 0, 0, 80, 98, null, null, 2);
                this.startRunBrightCard(this.context.cardFace3, 0, 0, 105, 98, null, null, 3);
                this.startRunBrightCard(this.context.cardFace4, 0, 0, 130, 98, callBack, this, 4);
            }
        }
        else {
            this.startRunBrightCard(this.context.cardFace1, -10, -40, 60, 80, null, null, 1);
            this.startRunBrightCard(this.context.cardFace2, 13, -70, 83, 90, callBack, this, 2);
        }
    };
    GamblingHeadCardAnimationSupport.prototype.startRunBrightCard = function (target, rotation, initOffsetX, x, y, callBack, thisObj, index) {
        var run = this.getAnimation(AnimationType.CardFaceBright, target, index);
        run.run(rotation, initOffsetX, x, y, callBack, thisObj);
    };
    /**
     * 比牌动画
     */
    GamblingHeadCardAnimationSupport.prototype.runThanTheCardAnim = function (point1, point2, point3, point4) {
        if (GamblingUtil.isOmaha) {
            this.startRunThanTheCardAnim(point1, this.context.cardFace1, 1);
            this.startRunThanTheCardAnim(point2, this.context.cardFace2, 2);
            this.startRunThanTheCardAnim(point3, this.context.cardFace3, 3);
            this.startRunThanTheCardAnim(point4, this.context.cardFace4, 4);
        }
        else {
            this.startRunThanTheCardAnim(point1, this.context.cardFace1, 1);
            this.startRunThanTheCardAnim(point2, this.context.cardFace2, 2);
        }
    };
    GamblingHeadCardAnimationSupport.prototype.startRunThanTheCardAnim = function (point, target, index) {
        var run = this.getAnimation(AnimationType.CardFaceMoveToPoint, target, index);
        run.nextAnimation = this.getAnimation(AnimationType.CardFaceTurnToFace, target, index);
        run.nextAnimation.scale = 1;
        var initX = 0;
        if (index == 1) {
            initX = point.x + 15;
        }
        else {
            initX = point.x - 15;
        }
        run.run(point, initX);
    };
    GamblingHeadCardAnimationSupport.prototype.getAnimation = function (type, target, index) {
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
    return GamblingHeadCardAnimationSupport;
}());
__reflect(GamblingHeadCardAnimationSupport.prototype, "GamblingHeadCardAnimationSupport");
//# sourceMappingURL=GamblingHeadCardAnimationSupport.js.map