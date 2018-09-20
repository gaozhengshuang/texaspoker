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
 * 获得金币面板
 */
var GetCoinTipsPanel = (function (_super) {
    __extends(GetCoinTipsPanel, _super);
    function GetCoinTipsPanel() {
        var _this = _super.call(this) || this;
        _this.layer = UILayerType.Tips;
        _this.setTouchChildren(false);
        _this.setTouchEnable(false);
        _this.setSkinName(UIModuleName.GetCoinTipsPanel);
        return _this;
    }
    GetCoinTipsPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    GetCoinTipsPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (this.panelData) {
            this.textLabel.text = this.panelData;
            this.removeTweenEvents();
            this.creatCoinTween();
            if (this.ptc) {
                this.createTween();
            }
            SoundManager.playEffect(MusicAction.gold_fall);
        }
    };
    GetCoinTipsPanel.prototype.creatCoinTween = function () {
        var _this = this;
        AnimationFactory.getParticleEffect(AnimationType.GetCoin, this, function (ptc) {
            _this.ptc = ptc;
            _this.createTween();
        });
    };
    GetCoinTipsPanel.prototype.createTween = function () {
        this.removeTweenEvents();
        this.alpha = 1;
        egret.Tween.get(this).wait(2100).to({ alpha: 1 }, 50, egret.Ease.quadOut).call(this.onPlayOver, this);
    };
    GetCoinTipsPanel.prototype.onPlayOver = function (thisObject) {
        if (this.ptc) {
            this.ptc.stop();
            if (this.ptc.parent != null) {
                this.ptc.parent.removeChild(this.ptc);
            }
        }
        this.onCloseBtnClickHandler(null);
    };
    GetCoinTipsPanel.prototype.removeTweenEvents = function () {
        egret.Tween.removeTweens(this);
    };
    return GetCoinTipsPanel;
}(BasePanel));
__reflect(GetCoinTipsPanel.prototype, "GetCoinTipsPanel");
//# sourceMappingURL=GetCoinTipsPanel.js.map