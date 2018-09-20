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
 * 奥马哈本家手牌2动画
 */
var OmahaSelfCard2Appear = (function (_super) {
    __extends(OmahaSelfCard2Appear, _super);
    function OmahaSelfCard2Appear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OmahaSelfCard2Appear.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.tsfMatrix = new egret.Matrix(0.27, -0.36, 0.037, 0.177, GamblingPanelSetting.handCardMatrix4.tx, GamblingPanelSetting.handCardMatrix4.ty);
        this.target.matrix = this.tsfMatrix;
    };
    OmahaSelfCard2Appear.prototype.run = function (isSound) {
        if (isSound === void 0) { isSound = false; }
        _super.prototype.run.call(this);
        this._isSound = isSound;
        qin.Tick.AddTimeoutInvoke(this.delayRun, 200, this);
    };
    OmahaSelfCard2Appear.prototype.delayRun = function () {
        this.target.visible = true; //设置本家手牌2显示
        qin.Console.log("显示本家手牌2");
        var tween = egret.Tween.get(this.tsfMatrix, { onChange: this.change.bind(this) });
        tween.to({ a: GamblingPanelSetting.handCardMatrix4.a, b: GamblingPanelSetting.handCardMatrix4.b, c: GamblingPanelSetting.handCardMatrix4.c, d: GamblingPanelSetting.handCardMatrix4.d }, 300).call(this.runOver, this);
        tween.play();
        if (this._isSound) {
            SoundManager.playEffect(MusicAction.light_card);
        }
    };
    OmahaSelfCard2Appear.prototype.change = function () {
        this.target.matrix = this.tsfMatrix;
    };
    OmahaSelfCard2Appear.prototype.clear = function () {
        qin.Tick.RemoveTimeoutInvoke(this.delayRun, this);
        _super.prototype.clear.call(this);
    };
    return OmahaSelfCard2Appear;
}(BaseAnimation));
__reflect(OmahaSelfCard2Appear.prototype, "OmahaSelfCard2Appear");
//# sourceMappingURL=OmahaSelfCard2Appear.js.map