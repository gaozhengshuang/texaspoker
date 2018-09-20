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
 * 礼物商店面板
 */
var GiftShopPanel = (function (_super) {
    __extends(GiftShopPanel, _super);
    function GiftShopPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.GiftShopPanel);
        return _this;
    }
    GiftShopPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        // this.shopTypeTab.build(TabComponent.CreatData(["礼物", "道具", "VIP"], [this.giftGroup, this.itemGroup, this.vipGroup], TabButtonType.SmallOf3));
        this.giftGroup.visible = false;
        this.shopTypeTab.build(TabComponent.CreatData(["道具", "VIP"], [this.itemGroup, this.vipGroup], TabButtonType.SmallOf2));
        this.giftTab.build(TabComponent.CreatData(["装饰品", "吉祥物", "奢侈品"], [this.giftGroup, this.giftGroup, this.giftGroup], TabButtonType.SubOf3));
        this.itemTab.build(TabComponent.CreatData(["美酒", "小喇叭"], [this.itemGroup, this.itemGroup], TabButtonType.SubOf2));
        this.vipTab.build(TabComponent.CreatData(["购买VIP", "我的VIP", "VIP介绍"], [this.buyVipGroup, this.myVipGroup, this.vipIntroduceGroup], TabButtonType.SubOf3));
        this.shopTypeTab.isTween = false;
        this.giftTab.isTween = false;
        this.itemTab.isTween = false;
        this.vipTab.isTween = false;
        this.vipIntroduceScroller.viewport = this.imgGroup;
        UIUtil.listRenderer(this.giftList, this.giftScroller, UserGiftItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.itemList, this.itemScroller, GiftShopItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.vipList, this.vipScroller, GiftShopItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    GiftShopPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData) {
            this._userInfo = appendData.userInfo;
            ShopManager.giftShopIsSelf = this._userInfo.roleId == UserManager.userInfo.roleId;
            if (appendData.tab == null) {
                appendData.tab = 0;
            }
            if (appendData.subTab == null) {
                appendData.subTab = 0;
            }
            this.shopTypeTab.init(appendData.tab);
            switch (appendData.tab) {
                // case GiftShopTabIndex.Gift:
                // 	this.giftTab.setSelectIndex(appendData.subTab);
                // 	this.onGiftTab(appendData.subTab);
                // 	break;
                case GiftShopTabIndex.Item:
                    this.itemTab.setSelectIndex(appendData.subTab);
                    this.onItemTab(appendData.subTab);
                    break;
                case GiftShopTabIndex.Vip:
                    this.vipTab.setSelectIndex(appendData.subTab);
                    this.onVipTab(appendData.subTab);
                    break;
            }
        }
        else {
            this.shopTypeTab.init(0);
            this.giftTab.init(0);
        }
        this.refreshUI();
    };
    GiftShopPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.clearSelect();
        this.shopTypeTab.tabChangeEvent.addListener(this.onTypeTab, this);
        this.giftTab.tabChangeEvent.addListener(this.onGiftTab, this);
        this.itemTab.tabChangeEvent.addListener(this.onItemTab, this);
        this.vipTab.tabChangeEvent.addListener(this.onVipTab, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        ShopManager.giftShopItemSelectEvent.addListener(this.onSelect, this);
        UserManager.propertyChangeEvent.addListener(this.refreshGold, this);
        AwardManager.OnExchanged.addListener(ShopManager.onExchangeVipHandler, this);
        ShopManager.sendGiftEvent.addListener(this.onSend, this);
    };
    GiftShopPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.giftTab.tabChangeEvent.removeListener(this.onGiftTab, this);
        this.itemTab.tabChangeEvent.removeListener(this.onItemTab, this);
        this.vipTab.tabChangeEvent.removeListener(this.onVipTab, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        ShopManager.giftShopItemSelectEvent.removeListener(this.onSelect, this);
        UserManager.propertyChangeEvent.removeListener(this.refreshGold, this);
        AwardManager.OnExchanged.removeListener(ShopManager.onExchangeVipHandler, this);
        ShopManager.sendGiftEvent.removeListener(this.onSend, this);
    };
    GiftShopPanel.prototype.refreshUI = function () {
        this.buyBtn.label = this._userInfo.roleId == UserManager.userInfo.roleId ? "购买" : "赠送";
        this.buyBtn.enabled = ShopManager.giftShopSelect ? true : false;
        this.goldNumLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.gold);
        this.diamondNumLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.diamond);
    };
    GiftShopPanel.prototype.onSelect = function () {
        this.buyBtn.enabled = ShopManager.giftShopSelect ? true : false;
    };
    GiftShopPanel.prototype.clearSelect = function () {
        ShopManager.giftShopSelect = null;
        this.buyBtn.enabled = false;
    };
    GiftShopPanel.prototype.onTypeTab = function (index) {
        switch (index) {
            // case GiftShopTabIndex.Gift:
            // 	this.giftTab.setSelectIndex(0);
            // 	this.buyGroup.visible = true;
            // 	break;
            case GiftShopTabIndex.Item:
                this.itemTab.setSelectIndex(0);
                this.buyGroup.visible = true;
                break;
            case GiftShopTabIndex.Vip:
                this.vipTab.setSelectIndex(0);
                var btn = this.vipTab.getBtnByIndex(ShopVipTabIndex.MyVip);
                if (btn) {
                    btn.label = ShopManager.giftShopIsSelf ? "我的VIP" : "TA的VIP";
                }
                break;
        }
    };
    GiftShopPanel.prototype.onGiftTab = function (index) {
        this.clearSelect();
        switch (index) {
            case ShopGiftTabIndex.Decorations:
                UIUtil.writeListInfo(this.giftList, GiftShopDefined.GetInstance().getListByType(GiftShopType.Decorations), "id", true);
                break;
            case ShopGiftTabIndex.Mascot:
                UIUtil.writeListInfo(this.giftList, GiftShopDefined.GetInstance().getListByType(GiftShopType.Mascot), "id", true);
                break;
            case ShopGiftTabIndex.Luxury:
                UIUtil.writeListInfo(this.giftList, GiftShopDefined.GetInstance().getListByType(GiftShopType.Luxury), "id", true);
                break;
        }
    };
    GiftShopPanel.prototype.onItemTab = function (index) {
        this.clearSelect();
        if (index == ShopItemTabIndex.Wine) {
            UIUtil.writeListInfo(this.itemList, GiftShopDefined.GetInstance().getListByType(GiftShopType.Wine), "id", true);
        }
        else if (index == ShopItemTabIndex.Trumpet) {
            UIUtil.writeListInfo(this.itemList, GiftShopDefined.GetInstance().getListByType(GiftShopType.Trumpet), "id", true);
        }
    };
    GiftShopPanel.prototype.onVipTab = function (index) {
        this.clearSelect();
        switch (index) {
            case ShopVipTabIndex.BuyVip:
                this.buyGroup.visible = true;
                UIUtil.writeListInfo(this.vipList, GiftShopDefined.GetInstance().getListByType(GiftShopType.Vip), "id", true);
                break;
            case ShopVipTabIndex.MyVip:
                this.setVipInfo(this._userInfo);
                this.buyGroup.visible = false;
                break;
            case ShopVipTabIndex.VipIntroduce:
                this.buyGroup.visible = false;
                if (!this.vipBg.texture) {
                    UIUtil.loadBg(ResFixedFileName.vipBg, this.vipBg);
                }
                this.vipIntroduceScroller.stopAnimation();
                this.vipIntroduceScroller.viewport.scrollV = 0;
                break;
        }
    };
    GiftShopPanel.prototype.setVipInfo = function (userInfo) {
        this.userHeadComp.init(userInfo);
        this.userNameLabel.text = userInfo.name;
        this.vipLevelLabel.text = "VIP" + userInfo.vipLevel.toString();
        switch (userInfo.vipType) {
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
                break;
            case VipType.YearVip:
                this.yearVipImg.visible = true;
                this.buyYearVip.visible = false;
                this.buyVipButton.label = "续费会员";
                this.vipTimeLabel.visible = true;
                break;
        }
        this.vipTimeLabel.text = qin.DateTimeUtil.formatDate(new Date(VipManager.GetVipTime(userInfo) * 1000), qin.DateTimeUtil.Format_Standard_Date);
        this.buyVipButton.visible = userInfo.roleId == UserManager.userInfo.roleId;
        this.vipProgressImg.width = 560;
        this.vipProgressImg.width *= qin.MathUtil.clamp(parseFloat((userInfo.vipExp / 6000).toFixed(2)), 0, 1);
        this.vipProgressLabel.text = userInfo.vipExp.toString();
        this.vipProgressLabel.x = this.vipProgressImg.width;
        this.processBg.x = this.vipProgressImg.width;
        this.vipExpLabel.text = userInfo.vipExp.toString() + "点";
        this.currentVipLevel.text = userInfo.vipLevel.toString();
        this.vipSpeedLabel.text = userInfo.vipSpeed + "点";
    };
    /**
    * 刷新财产信息
    */
    GiftShopPanel.prototype.refreshGold = function (num) {
        this.goldNumLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.gold);
        this.diamondNumLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.diamond);
    };
    GiftShopPanel.prototype.onSend = function (data) {
        AlertManager.showAlert("赠送成功！");
    };
    /**
     * 点击面板按钮事件处理
    */
    GiftShopPanel.prototype.clickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (event.target == this.buyVipButton || event.target == this.buyYearVip) {
            JumpUtil.JumpToShopping(ShopGroupIndex.Vip, UIModuleName.GiftShopPanel);
        }
        else if (event.target == this.buyBtn) {
            if (ShopManager.giftShopSelect) {
                ShopManager.giftShopSelect.buy();
            }
            else {
                qin.Console.logError("未选中商品！");
            }
        }
    };
    return GiftShopPanel;
}(BasePanel));
__reflect(GiftShopPanel.prototype, "GiftShopPanel");
//# sourceMappingURL=GiftShopPanel.js.map