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
 * 百人大战下注项
 */
var HWBetItemRenderer = (function (_super) {
    __extends(HWBetItemRenderer, _super);
    function HWBetItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.HWBetItemRenderer;
        return _this;
    }
    HWBetItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.bet["lightImg"].visible = false;
            if (HundredWarManager.roomInfo.state == HWState.Bet) {
                if (((UserManager.userInfo.gold + HundredWarManager.getThisBetGold()) / 5) >= this.bindData.bet + HundredWarManager.getThisBetGold()) {
                    this.bet["maskImg"].visible = false;
                    this.bindData.isBet = true;
                }
                else {
                    this.bet["maskImg"].visible = true;
                    this.bindData.isBet = false;
                }
            }
            else {
                this.bet["maskImg"].visible = true;
                this.bindData.isBet = false;
            }
            this.setBg(this.bindData.id);
            if (this.bindData.id == 0) {
                this.setActive();
                HundredWarManager.oneBetGold = this.bindData.bet;
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        }
    };
    HWBetItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    /**
     * 设置选中状态
    */
    HWBetItemRenderer.prototype.setActive = function () {
        this.bet["lightImg"].visible = true;
    };
    /**
     * 设置非选中状态
    */
    HWBetItemRenderer.prototype.setNotActive = function () {
        this.bet["lightImg"].visible = false;
    };
    /**
     * 设置背景图片
    */
    HWBetItemRenderer.prototype.setBg = function (id) {
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.definition && HundredWarManager.roomInfo.definition.type == HundredWarType.FunPattern) {
            switch (id) {
                case 0:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_100;
                    break;
                case 1:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_1000;
                    break;
                case 2:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_1w;
                    break;
                case 3:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_10w;
                    break;
                case 4:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_100w;
                    break;
            }
        }
        else {
            switch (id) {
                case 0:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_1000;
                    break;
                case 1:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_1w;
                    break;
                case 2:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_10w;
                    break;
                case 3:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_100w;
                    break;
                case 4:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_1000w;
                    break;
            }
        }
    };
    return HWBetItemRenderer;
}(BaseItemRenderer));
__reflect(HWBetItemRenderer.prototype, "HWBetItemRenderer");
//# sourceMappingURL=HWBetItemRenderer.js.map