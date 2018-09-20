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
 * 本家手牌1动画
 */
var SelfCard1Appear = (function (_super) {
    __extends(SelfCard1Appear, _super);
    function SelfCard1Appear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelfCard1Appear.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.tsfMatrix = new egret.Matrix(0.0465, -0.0617, 0.0156, 0.075, GamblingPanelSetting.handCardMatrix1.tx, GamblingPanelSetting.handCardMatrix1.ty);
        this.target.matrix = this.tsfMatrix;
    };
    SelfCard1Appear.prototype.run = function (isSound) {
        if (isSound === void 0) { isSound = false; }
        // return;
        _super.prototype.run.call(this);
        if (isSound) {
            SoundManager.playEffect(MusicAction.light_card);
        }
        this.target.visible = true; //设置本家手牌1显示
        qin.Console.log("显示本家手牌1");
        var tween = egret.Tween.get(this.tsfMatrix, { onChange: this.change.bind(this) });
        tween.to({ a: GamblingPanelSetting.handCardMatrix1.a, b: GamblingPanelSetting.handCardMatrix1.b, c: GamblingPanelSetting.handCardMatrix1.c, d: GamblingPanelSetting.handCardMatrix1.d }, 300).call(this.runOver, this);
        tween.play();
    };
    SelfCard1Appear.prototype.change = function () {
        this.target.matrix = this.tsfMatrix;
    };
    return SelfCard1Appear;
}(BaseAnimation));
__reflect(SelfCard1Appear.prototype, "SelfCard1Appear");
//# sourceMappingURL=SelfCard1Appear.js.map