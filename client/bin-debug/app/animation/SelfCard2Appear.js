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
 * 本家手牌2动画
 */
var SelfCard2Appear = (function (_super) {
    __extends(SelfCard2Appear, _super);
    function SelfCard2Appear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelfCard2Appear.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.tsfMatrix = new egret.Matrix(0.27, -0.36, 0.037, 0.177, GamblingPanelSetting.handCardMatrix2.tx, GamblingPanelSetting.handCardMatrix2.ty);
        this.target.matrix = this.tsfMatrix;
    };
    SelfCard2Appear.prototype.run = function (isSound) {
        if (isSound === void 0) { isSound = false; }
        // this.runOver();
        // return;
        _super.prototype.run.call(this);
        this._isSound = isSound;
        qin.Tick.AddTimeoutInvoke(this.delayRun, 200, this);
    };
    SelfCard2Appear.prototype.delayRun = function () {
        this.target.visible = true; //设置本家手牌2显示
        qin.Console.log("显示本家手牌2");
        var tween = egret.Tween.get(this.tsfMatrix, { onChange: this.change.bind(this) });
        tween.to({ a: GamblingPanelSetting.handCardMatrix2.a, b: GamblingPanelSetting.handCardMatrix2.b, c: GamblingPanelSetting.handCardMatrix2.c, d: GamblingPanelSetting.handCardMatrix2.d }, 300).call(this.runOver, this);
        tween.play();
        if (this._isSound) {
            SoundManager.playEffect(MusicAction.light_card);
        }
    };
    SelfCard2Appear.prototype.runOver = function () {
        if (this.callBack) {
            this.callBack.invoke();
        }
        _super.prototype.runOver.call(this);
    };
    SelfCard2Appear.prototype.change = function () {
        this.target.matrix = this.tsfMatrix;
    };
    SelfCard2Appear.prototype.clear = function () {
        qin.Tick.RemoveTimeoutInvoke(this.delayRun, this);
        _super.prototype.clear.call(this);
    };
    return SelfCard2Appear;
}(BaseAnimation));
__reflect(SelfCard2Appear.prototype, "SelfCard2Appear");
//# sourceMappingURL=SelfCard2Appear.js.map