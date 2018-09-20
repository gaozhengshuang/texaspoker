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
 * 德州转转转结果面板
 */
var ShimTaeYoonResultPanel = (function (_super) {
    __extends(ShimTaeYoonResultPanel, _super);
    function ShimTaeYoonResultPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.ShimTaeYoonResultPanel);
        return _this;
    }
    ShimTaeYoonResultPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.setGrayMask(false);
        this.tweenGroup.verticalCenter = -300;
        this._count = 0;
    };
    ShimTaeYoonResultPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData.gold > 0) {
            this._count++;
            if (this._count >= 3) {
                this._count = 0;
                this.desImg.source = SheetSubName.LaBa_WinningStreak;
                this.numGroup.bottom = 35;
                this.desImg.top = 30;
                this.bgImage.width = 416;
                this.bgImage.height = 280;
                this.specialPanel();
            }
            else {
                this.numLabel.textColor = this.charLabel.textColor = ColorEnum.LaBa_Win_Com;
                this.desImg.source = SheetSubName.LaBa_Win;
                this.numGroup.bottom = 50;
                this.desImg.top = 36;
                this.bgImage.width = 338;
                this.bgImage.height = 208;
            }
            if (appendData.type == ShimTaeYoonResultType.ThreeSev || appendData.type == ShimTaeYoonResultType.ThreeBAR || appendData.type == ShimTaeYoonResultType.ThreeApple) {
                this.desImg.source = SheetSubName.LaBa_TopPrize;
                this.numGroup.bottom = 40;
                this.desImg.top = 40;
                this.bgImage.width = 500;
                this.bgImage.height = 234;
                this.specialPanel();
            }
            this.numLabel.text = appendData.gold.toString();
            this.charLabel.visible = true;
        }
        else {
            this._count = 0;
            this.desImg.source = SheetSubName.LaBa_Lost;
            this.desImg.top = 45;
            this.bgImage.width = 327;
            this.bgImage.height = 161;
            this.numLabel.text = "";
            this.charLabel.visible = false;
        }
        this.removeTweenEvents();
        this.createTween();
    };
    ShimTaeYoonResultPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    ShimTaeYoonResultPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    ShimTaeYoonResultPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    /**
     * 加大加特效
    */
    ShimTaeYoonResultPanel.prototype.specialPanel = function () {
        this.numLabel.textColor = this.charLabel.textColor = ColorEnum.LaBa_Win_Golden;
        this.showPoolDes();
    };
    /**
     * 显示特效
    */
    ShimTaeYoonResultPanel.prototype.showPoolDes = function () {
        var _this = this;
        egret.Tween.get(this.tweenGroup)
            .set({ scaleX: 0, scaleY: 0 })
            .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.backOut);
        AnimationFactory.getParticleEffect(AnimationType.HundredWarPoolDes, this.tweenGroup, function (ptc) {
            _this._poolDesEffect = ptc;
        });
    };
    ShimTaeYoonResultPanel.prototype.createTween = function () {
        this.removeTweenEvents();
        this.alpha = 1;
        egret.Tween.get(this).wait(2000).to({ alpha: 0 }, 500, egret.Ease.quadOut).call(this.onPlayOver, this);
    };
    ShimTaeYoonResultPanel.prototype.onPlayOver = function (thisObject) {
        this.onCloseBtnClickHandler(null);
    };
    ShimTaeYoonResultPanel.prototype.removeTweenEvents = function () {
        egret.Tween.removeTweens(this);
    };
    return ShimTaeYoonResultPanel;
}(BasePanel));
__reflect(ShimTaeYoonResultPanel.prototype, "ShimTaeYoonResultPanel");
//# sourceMappingURL=ShimTaeYoonResultPanel.js.map