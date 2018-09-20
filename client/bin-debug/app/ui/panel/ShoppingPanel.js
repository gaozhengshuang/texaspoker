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
 * 商城面板
*/
var ShoppingPanel = (function (_super) {
    __extends(ShoppingPanel, _super);
    function ShoppingPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.ShoppingPanel);
        return _this;
    }
    // 只执行一次
    ShoppingPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        this.goldList.dataProvider = new eui.ArrayCollection(ShopManager.goldListRender);
        this.diamondList.dataProvider = new eui.ArrayCollection(ShopManager.diamondListRender);
        this.vipList.dataProvider = new eui.ArrayCollection(ShopManager.vipList);
        this.propList.dataProvider = new eui.ArrayCollection(ShopManager.propList);
        UIUtil.listRenderer(this.goldList, this.gold_scroller, ShopGoldItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.diamondList, this.diamond_scroller, ShopDiamondItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.vipList, this.vip_scroller, VipListItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.propList, this.prop_scroller, VipListItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.diamondNumLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.diamond);
        this.goldNumLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.gold);
        if (VersionManager.isSafe) {
            this.shoppingTab.build(TabComponent.CreatData(["饮料", "钻石"], [this.goldGroup, this.diamondGroup], TabButtonType.BigOf2));
        }
        else {
            this.shoppingTab.build(TabComponent.CreatData(["饮料", "钻石", "道具", "VIP"], [this.goldGroup, this.diamondGroup, this.propGroup, this.vipGroup], TabButtonType.BigOf4));
        }
        VersionManager.setComponentVisibleBySafe(this.vipGroup);
        VersionManager.setComponentVisibleBySafe(this.propGroup);
        UIManager.pushResizeGroup(this.resizeGroup);
        UIManager.pushResizeScroller(this.gold_scroller, 900);
        UIManager.pushResizeScroller(this.diamond_scroller, 900);
        UIManager.pushResizeScroller(this.vip_scroller, 950);
        UIManager.pushResizeScroller(this.prop_scroller, 950);
    };
    // 每次打开都会执行
    ShoppingPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.onTabTap(0);
        if (appendData && appendData.tab != null) {
            this.shoppingTab.init(appendData.tab);
        }
        else {
            this.shoppingTab.init(0);
        }
        ChannelManager.checkUnFinishedPayList();
        this.refreshUI();
    };
    ShoppingPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
        this.vipList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.payClickHandler, this);
        this.propList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.payClickHandler, this);
        this.goldList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.payClickHandler, this, false, 100);
        this.diamondList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.payClickHandler, this, false, 100);
        this.shoppingTab.tabChangeEvent.addListener(this.onTabTap, this);
        AwardManager.OnExchanged.addListener(ShopManager.onExchangeVipHandler, this);
        AwardManager.OnAwardValueChanged.addListener(this.onRefreshProperty, this);
    };
    ShoppingPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
        this.vipList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.payClickHandler, this);
        this.propList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.payClickHandler, this);
        this.goldList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.payClickHandler, this);
        this.diamondList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.payClickHandler, this);
        this.shoppingTab.tabChangeEvent.removeListener(this.onTabTap, this);
        AwardManager.OnExchanged.removeListener(ShopManager.onExchangeVipHandler, this);
        AwardManager.OnAwardValueChanged.removeListener(this.onRefreshProperty, this);
        PropertyManager.Clear();
    };
    /**
     * 渲染信息
    */
    ShoppingPanel.prototype.refreshUI = function () {
        this.diamondNumLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.diamond);
        this.goldNumLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.gold);
    };
    ShoppingPanel.prototype.onRefreshProperty = function (awardId) {
        var shopDef = ShopDefined.GetInstance().getDefinitionByAwardId(awardId);
        if (shopDef) {
            this.diamondNumLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.diamond);
            this.goldNumLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.gold);
            PropertyManager.ShowItemList();
        }
    };
    /**
     * 购买金币/钻石选择
    */
    ShoppingPanel.prototype.payClickHandler = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        switch (event.currentTarget) {
            case this.vipList:
                this.payByDiamond(this.vipList.selectedItem);
                break;
            case this.propList:
                this.payByDiamond(this.propList.selectedItem);
                break;
            case this.goldList:
            case this.diamondList:
                PropertyManager.OpenGet();
                break;
        }
    };
    /**
     * 使用钻石购买
     */
    ShoppingPanel.prototype.payByDiamond = function (selectedItem) {
        var awardDef = AwardDefined.GetInstance().getDefinition(selectedItem.definition.awardId);
        if (awardDef && awardDef.costList) {
            var costInfo = void 0;
            for (var i = 0; i < awardDef.costList.length; i++) {
                if (awardDef.costList[i].type == CostType.Diamond) {
                    costInfo = awardDef.costList[i];
                    break;
                }
            }
            if (costInfo) {
                if (UserManager.userInfo.diamond >= costInfo.count) {
                    AlertManager.showConfirm(qin.StringUtil.format("是否花费{0}钻石，购买{1}？", costInfo.count, awardDef.name), this.tryPay, null, selectedItem);
                }
                else {
                    CostManager.showBuyDiamond(this.goDiamondGp.bind(this));
                }
            }
        }
    };
    ShoppingPanel.prototype.showPrePanelName = function () {
        if (this.prevPanelName == UIModuleName.GamblingPanel) {
            UIManager.showPanel(this.prevPanelName, this.panelData.toRight);
        }
        else {
            UIManager.showPanel(this.prevPanelName);
        }
    };
    ShoppingPanel.prototype.goDiamondGp = function () {
        this.shoppingTab.setSelectIndex(ShopGroupIndex.Diamond);
    };
    ShoppingPanel.prototype.tryPay = function (obj) {
        if (obj) {
            var payDef = ShopDefined.GetInstance().getDefinition(obj.id);
            if (payDef) {
                AwardManager.Exchange(payDef.awardId, 1, true); //直接兑换
            }
        }
    };
    ShoppingPanel.prototype.onTabTap = function (index) {
        switch (index) {
            case ShopGroupIndex.Gold:
                this.goldList.scrollV = 0;
                break;
            case ShopGroupIndex.Diamond:
                this.diamondList.scrollV = 0;
                break;
            case ShopGroupIndex.Prop:
                this.propList.scrollV = 0;
                break;
            case ShopGroupIndex.Vip:
                this.vipList.scrollV = 0;
                break;
        }
    };
    ShoppingPanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    return ShoppingPanel;
}(BasePanel));
__reflect(ShoppingPanel.prototype, "ShoppingPanel");
//# sourceMappingURL=ShoppingPanel.js.map