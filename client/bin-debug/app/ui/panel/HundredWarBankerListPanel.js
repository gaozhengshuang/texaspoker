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
 * 百人大战庄家列表面板
*/
var HundredWarBankerListPanel = (function (_super) {
    __extends(HundredWarBankerListPanel, _super);
    function HundredWarBankerListPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.HundredWarBankerListPanel);
        return _this;
    }
    HundredWarBankerListPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        UIUtil.listRenderer(this.bankerList, this.bankerScroller, HundredWarBankerItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.bankerScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        UIManager.pushResizeScroller(this.bankerScroller, 500);
    };
    HundredWarBankerListPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        HundredWarManager.panelHandler.reqHundredWarBankerList();
        this.refreshGold();
        if (InfoUtil.checkAvailable(HundredWarManager.roomInfo) && HundredWarManager.roomInfo.definition.bankerRound) {
            this.tipsLabel1.visible = true;
            this.tipsLabel1.text = "每次最多坐庄" + HundredWarManager.roomInfo.definition.bankerRound + "轮比赛！";
        }
        else {
            this.tipsLabel1.visible = false;
        }
    };
    HundredWarBankerListPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    HundredWarBankerListPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        HundredWarManager.panelHandler.OnGetHundredWarBankerListEvent.addListener(this.refreshUI, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        HundredWarManager.panelHandler.onUpDownBankerEvent.addListener(this.refreshBankerBtn, this);
        this.bankerGoldHs.addEventListener(egret.Event.CHANGE, this.onHsSlide, this);
        UserManager.propertyChangeEvent.addListener(this.refreshGold, this);
    };
    HundredWarBankerListPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        HundredWarManager.panelHandler.OnGetHundredWarBankerListEvent.removeListener(this.refreshUI, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        HundredWarManager.panelHandler.onUpDownBankerEvent.removeListener(this.refreshBankerBtn, this);
        this.bankerGoldHs.removeEventListener(egret.Event.CHANGE, this.onHsSlide, this);
        UserManager.propertyChangeEvent.removeListener(this.refreshGold, this);
    };
    HundredWarBankerListPanel.prototype.refreshGold = function () {
        this.goldLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.gold);
    };
    HundredWarBankerListPanel.prototype.refreshBankerBtn = function (flag) {
        if (flag == false && HundredWarManager.roomInfo && HundredWarManager.roomInfo.state == HWState.Bet) {
            this.bankBtn.enabled = false;
        }
        this.refreshUI();
    };
    HundredWarBankerListPanel.prototype.refreshUI = function () {
        if (HundredWarManager.panelHandler.isBankerList()) {
            this.tipsLabel.visible = false;
            this.bankerGoldHs.visible = false;
            this.bankBtn.label = "下庄";
        }
        else {
            this.tipsLabel.visible = true;
            this.bankerGoldHs.visible = true;
            this.bankBtn.label = "我要上庄";
            this.bankBtn.enabled = true;
            if (InfoUtil.checkAvailable(HundredWarManager.roomInfo)) {
                if (UserManager.userInfo.gold > HundredWarManager.roomInfo.definition.bankerGold) {
                    this.bankerGoldHs.maximum = UserManager.userInfo.gold;
                    this.bankerGoldHs.touchChildren = true;
                    this.bankerGoldHs.minimum = this.bankerGoldHs.value = HundredWarManager.roomInfo.definition.bankerGold;
                    this.tipsLabel.text = qin.MathUtil.formatNum(this.bankerGoldHs.value);
                }
                else {
                    this.bankerGoldHs.maximum = this.bankerGoldHs.value = HundredWarManager.roomInfo.definition.bankerGold;
                    this.bankerGoldHs.touchChildren = false;
                    this.tipsLabel.text = "上庄至少需要" + qin.MathUtil.formatNum(HundredWarManager.roomInfo.definition.bankerGold);
                }
            }
        }
        UIUtil.writeListInfo(this.bankerList, HundredWarManager.panelHandler.HundredWarBankerList, "roleId", false);
    };
    HundredWarBankerListPanel.prototype.onHsSlide = function (event) {
        if (InfoUtil.checkAvailable(HundredWarManager.roomInfo)) {
            if (UserManager.userInfo.gold > HundredWarManager.roomInfo.definition.bankerGold) {
                this.tipsLabel.text = qin.MathUtil.formatNum(this.bankerGoldHs.value);
            }
            else {
                this.bankerGoldHs.value = HundredWarManager.roomInfo.definition.bankerGold;
            }
        }
    };
    HundredWarBankerListPanel.prototype.onClick = function (event) {
        if (event.target == this.bankBtn) {
            SoundManager.playEffect(MusicAction.buttonClick);
            if (HundredWarManager.panelHandler.isBankerList()) {
                HundredWarManager.panelHandler.reqDownBanker();
            }
            else {
                if (InfoUtil.checkAvailable(HundredWarManager.roomInfo)) {
                    if (UserManager.userInfo.gold > HundredWarManager.roomInfo.definition.bankerGold) {
                        HundredWarManager.panelHandler.reqUpBanker(this.bankerGoldHs.value);
                    }
                    else {
                        AlertManager.showConfirm("您的金币不足" + qin.MathUtil.formatNum(HundredWarManager.roomInfo.definition.bankerGold) + "，无法上庄！", null, function () {
                            JumpUtil.JumpToShopping(ShopGroupIndex.Gold, UIModuleName.HundredWarBankerListPanel);
                        }, null, "系统提示", null, "确定", "充值", null);
                    }
                }
            }
        }
    };
    return HundredWarBankerListPanel;
}(BasePanel));
__reflect(HundredWarBankerListPanel.prototype, "HundredWarBankerListPanel");
//# sourceMappingURL=HundredWarBankerListPanel.js.map