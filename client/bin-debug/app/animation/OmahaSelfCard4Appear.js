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
 * 奥马哈本家手牌4动画
 */
var OmahaSelfCard4Appear = (function (_super) {
    __extends(OmahaSelfCard4Appear, _super);
    function OmahaSelfCard4Appear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OmahaSelfCard4Appear.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.tsfMatrix = new egret.Matrix(0.27, -0.36, 0.037, 0.177, GamblingPanelSetting.handCardMatrix6.tx, GamblingPanelSetting.handCardMatrix6.ty);
        this.target.matrix = this.tsfMatrix;
    };
    OmahaSelfCard4Appear.prototype.run = function (isSound) {
        if (isSound === void 0) { isSound = false; }
        _super.prototype.run.call(this);
        this._isSound = isSound;
        qin.Tick.AddTimeoutInvoke(this.delayRun, 600, this);
    };
    OmahaSelfCard4Appear.prototype.delayRun = function () {
        this.target.visible = true; //设置本家手牌4显示
        qin.Console.log("显示本家手牌4");
        var tween = egret.Tween.get(this.tsfMatrix, { onChange: this.change.bind(this) });
        tween.to({ a: GamblingPanelSetting.handCardMatrix6.a, b: GamblingPanelSetting.handCardMatrix6.b, c: GamblingPanelSetting.handCardMatrix6.c, d: GamblingPanelSetting.handCardMatrix6.d }, 300).call(this.runOver, this);
        tween.play();
        if (this._isSound) {
            SoundManager.playEffect(MusicAction.light_card);
        }
    };
    OmahaSelfCard4Appear.prototype.runOver = function () {
        if (this.callBack) {
            this.callBack.invoke();
        }
        _super.prototype.runOver.call(this);
    };
    OmahaSelfCard4Appear.prototype.change = function () {
        this.target.matrix = this.tsfMatrix;
    };
    OmahaSelfCard4Appear.prototype.clear = function () {
        qin.Tick.RemoveTimeoutInvoke(this.delayRun, this);
        _super.prototype.clear.call(this);
    };
    return OmahaSelfCard4Appear;
}(BaseAnimation));
__reflect(OmahaSelfCard4Appear.prototype, "OmahaSelfCard4Appear");
//# sourceMappingURL=OmahaSelfCard4Appear.js.map