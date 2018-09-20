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
 * 百人大战牌局注池组件
 */
var HWBetPotComponent = (function (_super) {
    __extends(HWBetPotComponent, _super);
    function HWBetPotComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HWBetPotComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.betGroup.touchChildren = this.betGroup.touchEnabled = false;
    };
    /**
     * 默认初始化
     */
    HWBetPotComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
        if (data) {
            if (data.bet) {
                this.allChipsLabel.text = qin.MathUtil.formatNum(data.bet);
            }
            else {
                this.allChipsLabel.text = "";
            }
            if (data.myBet) {
                this.myChipsLabel.text = qin.MathUtil.formatNum(data.myBet);
            }
            else {
                this.myChipsLabel.text = "";
                this.myChipsImg.visible = false;
            }
        }
        else {
            this.reset();
        }
    };
    /**
     * 重置
    */
    HWBetPotComponent.prototype.reset = function () {
        this.allChipsLabel.text = "";
        this.myChipsLabel.text = "";
        this.myChipsImg.visible = false;
    };
    /**
     * 设置背景图片
    */
    HWBetPotComponent.prototype.setBg = function (pos) {
        this.bgImg.source = HWPanelSetting["BetPot" + pos];
    };
    return HWBetPotComponent;
}(BaseComponent));
__reflect(HWBetPotComponent.prototype, "HWBetPotComponent");
//# sourceMappingURL=HWBetPotComponent.js.map