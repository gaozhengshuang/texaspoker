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
 * 奥马哈本家手牌3动画
 */
var OmahaSelfCard3Appear = (function (_super) {
    __extends(OmahaSelfCard3Appear, _super);
    function OmahaSelfCard3Appear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OmahaSelfCard3Appear.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.tsfMatrix = new egret.Matrix(0.27, -0.36, 0.037, 0.177, GamblingPanelSetting.handCardMatrix5.tx, GamblingPanelSetting.handCardMatrix5.ty);
        this.target.matrix = this.tsfMatrix;
    };
    OmahaSelfCard3Appear.prototype.run = function (isSound) {
        if (isSound === void 0) { isSound = false; }
        _super.prototype.run.call(this);
        this._isSound = isSound;
        qin.Tick.AddTimeoutInvoke(this.delayRun, 400, this);
    };
    OmahaSelfCard3Appear.prototype.delayRun = function () {
        this.target.visible = true; //设置本家手牌3显示
        qin.Console.log("显示本家手牌3");
        var tween = egret.Tween.get(this.tsfMatrix, { onChange: this.change.bind(this) });
        tween.to({ a: GamblingPanelSetting.handCardMatrix5.a, b: GamblingPanelSetting.handCardMatrix5.b, c: GamblingPanelSetting.handCardMatrix5.c, d: GamblingPanelSetting.handCardMatrix5.d }, 300).call(this.runOver, this);
        tween.play();
        if (this._isSound) {
            SoundManager.playEffect(MusicAction.light_card);
        }
    };
    OmahaSelfCard3Appear.prototype.change = function () {
        this.target.matrix = this.tsfMatrix;
    };
    OmahaSelfCard3Appear.prototype.clear = function () {
        qin.Tick.RemoveTimeoutInvoke(this.delayRun, this);
        _super.prototype.clear.call(this);
    };
    return OmahaSelfCard3Appear;
}(BaseAnimation));
__reflect(OmahaSelfCard3Appear.prototype, "OmahaSelfCard3Appear");
//# sourceMappingURL=OmahaSelfCard3Appear.js.map