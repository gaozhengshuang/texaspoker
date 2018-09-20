var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 操作组件
 */
var GamblingActionComponent = (function (_super) {
    __extends(GamblingActionComponent, _super);
    function GamblingActionComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingActionComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._initPosMap = new qin.Dictionary();
        this._appearMap = new qin.Dictionary();
        this._disappearMap = new qin.Dictionary();
        var btnSize = 102;
        this.moveAnchorOffset(this.brightCardBtn, btnSize, btnSize);
        this.moveAnchorOffset(this.immediatelyBrightCardBtn, btnSize, btnSize);
        this._initPosMap.add(this.brightCardBtn, new egret.Point(this.brightCardBtn.x, this.brightCardBtn.y));
        this._initPosMap.add(this.immediatelyBrightCardBtn, new egret.Point(this.immediatelyBrightCardBtn.x, this.immediatelyBrightCardBtn.y));
        this.moveAnchorOffset(this.centerPointComponent, btnSize, btnSize);
        this.addGroupChilrenPos(this.preActionGroup, btnSize, btnSize);
        this.addGroupChilrenPos(this.raiseGroup, 88, 90);
        this.addGroupChilrenPos(this.actionGroup, btnSize, btnSize);
        this._centerPoint = new egret.Point();
        this._centerPoint.x = this.centerPointComponent.x;
        this._centerPoint.y = this.centerPointComponent.y;
    };
    GamblingActionComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
        this._disappearMap.foreach(this.resetDisapperaRunOver, this);
        this._appearMap.foreach(this.resetApperaRunOver, this);
    };
    GamblingActionComponent.prototype.resetDisapperaRunOver = function (target, value) {
        if (value instanceof ActionButtonDisappear) {
            value.isRunOver = true;
        }
        else if (value instanceof OneKeyButtonDisappear) {
            value.isRunOver = true;
        }
    };
    GamblingActionComponent.prototype.resetApperaRunOver = function (target, value) {
        if (value instanceof ActionButtonAppear) {
            value.isRunOver = true;
        }
    };
    GamblingActionComponent.prototype.rendererStart = function (event) {
        _super.prototype.rendererStart.call(this, event);
        var child;
        var initPoint;
        for (var i = 0; i < this.raiseGroup.numChildren; i++) {
            child = this.raiseGroup.getChildAt(i);
            initPoint = this._initPosMap.getValue(child);
            child.x = initPoint.x;
            child.y = initPoint.y;
        }
    };
    GamblingActionComponent.prototype.addGroupChilrenPos = function (group, width, height) {
        var child;
        var tmpHeight;
        for (var i = 0; i < group.numChildren; i++) {
            child = group.getChildAt(i);
            tmpHeight = height;
            if (child === this.raiseBtn) {
                tmpHeight = 111;
            }
            this.moveAnchorOffset(child, width, tmpHeight);
            this._initPosMap.add(child, new egret.Point(child.x, child.y));
        }
    };
    GamblingActionComponent.prototype.moveAnchorOffset = function (target, width, height) {
        target.anchorOffsetX = width / 2;
        target.anchorOffsetY = height / 2;
        target.x += width / 2;
        target.y += height / 2;
    };
    GamblingActionComponent.prototype.hideAll = function (isTween) {
        if (isTween) {
            this.showRaiseGroup(false);
            this.showActionGroup(false);
        }
        else {
            this.raiseGroup.visible = false;
            this.actionGroup.visible = false;
        }
    };
    GamblingActionComponent.prototype.hidePreActionGroup = function (isTween) {
        if (isTween) {
            this.showPreActionGroup(false);
        }
        else {
            this.preActionGroup.visible = false;
        }
    };
    /**
     * 显示快捷加注
     */
    GamblingActionComponent.prototype.showRaiseGroup = function (flag) {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isTrusteeship && flag) {
            return;
        }
        if (flag && this.raiseGroup.visible) {
            return;
        }
        if (!flag && !this.raiseGroup.visible) {
            return;
        }
        if (flag) {
            this.raiseGroup.visible = flag;
        }
        var child;
        var delay = 50;
        for (var i = 0; i < this.raiseGroup.numChildren; i++) {
            child = this.raiseGroup.getChildAt(i);
            if (flag) {
                var appearAnimation = this.getAnimation(child, flag, OneKeyButtonAppear);
                appearAnimation.run(i * delay);
            }
            else {
                var disAnimation = this.getAnimation(child, flag, OneKeyButtonDisappear);
                if (i == this.raiseGroup.numChildren - 1) {
                    disAnimation.run(i * delay, this.raiseGroup);
                }
                else {
                    disAnimation.run(i * delay, null);
                }
            }
        }
    };
    /**
     * 显示亮牌
     */
    GamblingActionComponent.prototype.showBrightButton = function (flag) {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isTrusteeship && flag) {
            return;
        }
        this.runActionChild(this.brightCardBtn, flag);
    };
    /**
     * 显示立即亮牌
     */
    GamblingActionComponent.prototype.showImmediatelyBrightCardBtn = function (flag) {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isTrusteeship && flag) {
            return;
        }
        this.runActionChild(this.immediatelyBrightCardBtn, flag);
    };
    /**
     * 显示预操作按钮
     */
    GamblingActionComponent.prototype.showPreActionGroup = function (flag) {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isTrusteeship && flag) {
            return;
        }
        this.runActionGroup(this.preActionGroup, flag);
        if (flag) {
            this.preCallBtn.visible = false;
            this.autoCheckBtn.visible = false;
            if (GamblingUtil.isCanCheck) {
                this.autoCheckBtn.visible = true;
            }
            else if (GamblingUtil.isNeedAllIn) {
                this.preCallBtn.visible = true;
                this.preCallBtn.label = qin.MathUtil.formatNum(GamblingManager.self.bankRoll);
            }
            else if (GamblingUtil.callNum > 0) {
                this.preCallBtn.visible = true;
                this.preCallBtn.label = qin.MathUtil.formatNum(GamblingUtil.callNum);
            }
        }
    };
    /**
     * 显示操作按钮
     */
    GamblingActionComponent.prototype.showActionGroup = function (flag) {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isTrusteeship && flag) {
            return;
        }
        this.runActionGroup(this.actionGroup, flag);
    };
    /**
     * 跑一组动画
     */
    GamblingActionComponent.prototype.runActionGroup = function (group, flag) {
        if (flag && group.visible) {
            return;
        }
        if (!flag && !group.visible) {
            return;
        }
        if (flag) {
            group.visible = flag;
        }
        var targetPoint;
        var child;
        for (var i = 0; i < group.numChildren; i++) {
            child = group.getChildAt(i);
            this.runActionChild(child, flag, group);
        }
    };
    /**
     * 跑动画
     */
    GamblingActionComponent.prototype.runActionChild = function (child, flag, parent) {
        var disAnimation;
        var appearAnimation;
        if (flag) {
            appearAnimation = this.getAnimation(child, flag, ActionButtonAppear);
            appearAnimation.run(this._centerPoint, this._initPosMap.getValue(child));
            disAnimation = this.getAnimation(child, false, ActionButtonDisappear);
            disAnimation.isRunOver = true;
        }
        else {
            disAnimation = this.getAnimation(child, flag, ActionButtonDisappear);
            disAnimation.run(this._initPosMap.getValue(child), this._centerPoint, parent);
            appearAnimation = this.getAnimation(child, true, ActionButtonAppear);
            appearAnimation.isRunOver = true;
        }
    };
    GamblingActionComponent.prototype.getAnimation = function (target, flag, cls) {
        var animation;
        if (flag) {
            animation = this._appearMap.getValue(target);
            if (!animation) {
                animation = new cls();
                animation.target = target;
                this._appearMap.add(target, animation);
            }
        }
        else {
            animation = this._disappearMap.getValue(target);
            if (!animation) {
                animation = new cls();
                animation.target = target;
                this._disappearMap.add(target, animation);
            }
        }
        return animation;
    };
    return GamblingActionComponent;
}(BaseComponent));
__reflect(GamblingActionComponent.prototype, "GamblingActionComponent");
//# sourceMappingURL=GamblingActionComponent.js.map