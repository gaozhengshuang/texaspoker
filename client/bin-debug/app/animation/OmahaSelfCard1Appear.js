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
 * 奥马哈本家手牌1动画
 */
var OmahaSelfCard1Appear = (function (_super) {
    __extends(OmahaSelfCard1Appear, _super);
    function OmahaSelfCard1Appear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OmahaSelfCard1Appear.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.tsfMatrix = new egret.Matrix(0.0465, -0.0617, 0.0156, 0.075, GamblingPanelSetting.handCardMatrix3.tx, GamblingPanelSetting.handCardMatrix3.ty);
        this.target.matrix = this.tsfMatrix;
    };
    OmahaSelfCard1Appear.prototype.run = function (isSound) {
        if (isSound === void 0) { isSound = false; }
        _super.prototype.run.call(this);
        if (isSound) {
            SoundManager.playEffect(MusicAction.light_card);
        }
        this.target.visible = true; //设置本家手牌1显示
        qin.Console.log("显示本家手牌1");
        var tween = egret.Tween.get(this.tsfMatrix, { onChange: this.change.bind(this) });
        tween.to({ a: GamblingPanelSetting.handCardMatrix3.a, b: GamblingPanelSetting.handCardMatrix3.b, c: GamblingPanelSetting.handCardMatrix3.c, d: GamblingPanelSetting.handCardMatrix3.d }, 300).call(this.runOver, this);
        tween.play();
    };
    OmahaSelfCard1Appear.prototype.change = function () {
        this.target.matrix = this.tsfMatrix;
    };
    return OmahaSelfCard1Appear;
}(BaseAnimation));
__reflect(OmahaSelfCard1Appear.prototype, "OmahaSelfCard1Appear");
//# sourceMappingURL=OmahaSelfCard1Appear.js.map