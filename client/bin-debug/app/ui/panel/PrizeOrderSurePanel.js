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
 * 我的奖品订单确定面板
 */
var PrizeOrderSurePanel = (function (_super) {
    __extends(PrizeOrderSurePanel, _super);
    function PrizeOrderSurePanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.PrizeOrderSurePanel);
        return _this;
    }
    PrizeOrderSurePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    PrizeOrderSurePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    PrizeOrderSurePanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.nameGroup.visible = this.addressGroup.visible = false;
        if (this.panelData.type == PrizeEffectType.Kind) {
            this.nameGroup.visible = this.addressGroup.visible = true;
            this.nameLabel.text = UserManager.userInfo.addressName;
            this.awardNameLabel.text = this.panelData.awardName;
            this.telLabel.text = UserManager.userInfo.phoneNum;
            this.addressLabel.text = UserManager.userInfo.address;
        }
        else {
            this.awardNameLabel.text = this.panelData.awardName;
            this.telLabel.text = UserManager.userInfo.phoneNum;
            this.qqLabel.text = UserManager.userInfo.qqNum;
        }
    };
    PrizeOrderSurePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmBtnClick, this);
    };
    PrizeOrderSurePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmBtnClick, this);
    };
    /**
     * 确定兑换
    */
    PrizeOrderSurePanel.prototype.confirmBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        PrizeManager.reqGetAward(this.panelData.id);
    };
    return PrizeOrderSurePanel;
}(BasePanel));
__reflect(PrizeOrderSurePanel.prototype, "PrizeOrderSurePanel");
//# sourceMappingURL=PrizeOrderSurePanel.js.map