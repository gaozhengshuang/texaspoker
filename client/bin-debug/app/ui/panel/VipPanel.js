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
 * 会员面板
 */
var VipPanel = (function (_super) {
    __extends(VipPanel, _super);
    function VipPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.VipPanel);
        return _this;
    }
    VipPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        var array = new Array(this.myVipGroup, this.vipIntroduceGroup);
        this.tab.build(TabComponent.CreatData(["我的VIP", "VIP介绍"], array, TabButtonType.SmallOf2));
        this.tab.isTween = false;
        this.vipIntroduceScroller.viewport = this.imgGroup;
    };
    VipPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.tab.init(0);
    };
    VipPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.userHeadComp.init(UserManager.userInfo);
        this.userNameLabel.text = UserManager.userInfo.name;
        this.refreshVipInfo();
    };
    VipPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.tab.tabChangeEvent.addListener(this.onBarItemTap, this);
        VipManager.vipUpgradeEvent.addListener(this.refreshVipInfo, this);
    };
    VipPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.tab.tabChangeEvent.removeListener(this.onBarItemTap, this);
        VipManager.vipUpgradeEvent.removeListener(this.refreshVipInfo, this);
    };
    VipPanel.prototype.refreshVipInfo = function () {
        this.vipLevelLabel.text = "VIP" + UserManager.userInfo.vipLevel.toString();
        switch (UserManager.userInfo.vipType) {
            case VipType.NoVip:
                this.yearVipImg.visible = false;
                this.buyYearVip.visible = true;
                this.buyVipButton.label = "开通会员";
                this.vipTimeLabel.visible = false;
                break;
            case VipType.Vip:
                this.yearVipImg.visible = false;
                this.buyYearVip.visible = true;
                this.buyVipButton.label = "续费会员";
                this.vipTimeLabel.visible = true;
                this.vipTimeLabel.text = qin.DateTimeUtil.formatDate(new Date(VipManager.GetVipTime() * 1000), qin.DateTimeUtil.Format_Standard_Date);
                break;
            case VipType.YearVip:
                this.yearVipImg.visible = true;
                this.buyYearVip.visible = false;
                this.buyVipButton.label = "续费会员";
                this.vipTimeLabel.visible = true;
                this.vipTimeLabel.text = qin.DateTimeUtil.formatDate(new Date(VipManager.GetVipTime() * 1000), qin.DateTimeUtil.Format_Standard_Date);
                break;
        }
        this.vipProgressImg.width = 560;
        this.vipProgressImg.width *= qin.MathUtil.clamp(parseFloat((UserManager.userInfo.vipExp / 6000).toFixed(2)), 0, 1);
        this.vipProgressLabel.text = UserManager.userInfo.vipExp.toString();
        this.vipProgressLabel.x = this.vipProgressImg.width;
        this.processBg.x = this.vipProgressImg.width;
        this.vipExpLabel.text = UserManager.userInfo.vipExp.toString() + "点";
        this.currentVipLevel.text = UserManager.userInfo.vipLevel.toString();
        this.vipSpeedLabel.text = UserManager.userInfo.vipSpeed + "点";
    };
    /**
     * 点击面板按钮事件处理
    */
    VipPanel.prototype.clickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (event.target == this.buyVipButton || event.target == this.buyYearVip) {
            JumpUtil.JumpToShopping(ShopGroupIndex.Vip, UIModuleName.VipPanel);
        }
    };
    VipPanel.prototype.onBarItemTap = function (index) {
        if (index == 1) {
            if (!this.vipBg.texture) {
                UIUtil.loadBg(ResFixedFileName.vipBg, this.vipBg);
            }
            this.vipIntroduceScroller.stopAnimation();
            this.vipIntroduceScroller.viewport.scrollV = 0;
        }
    };
    return VipPanel;
}(BasePanel));
__reflect(VipPanel.prototype, "VipPanel");
//# sourceMappingURL=VipPanel.js.map