/**
 * 商城面板
*/
class ShoppingPanel extends BasePanel
{
    public shoppingTab: TabComponent;
    public goldGroup: eui.Group;
    public goldList: eui.List;

    public diamondGroup: eui.Group;
    public diamondList: eui.List;

    public vipGroup: eui.Group;
    public vipList: eui.List;

    public propGroup: eui.Group;
    public propList: eui.List;

    public gold_scroller: eui.Scroller;
    public diamond_scroller: eui.Scroller;
    public vip_scroller: eui.Scroller;
    public prop_scroller: eui.Scroller;

    private diamondNumLabel: eui.Label;
    private goldNumLabel: eui.Label;

    public resizeGroup: eui.Group;

    private _anime: PanelAnime;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.ShoppingPanel);
    }
    // 只执行一次
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
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
        this.diamondNumLabel.text = game.MathUtil.formatNum(UserManager.userInfo.diamond);
        this.goldNumLabel.text = game.MathUtil.formatNum(UserManager.userInfo.gold);
        if (VersionManager.isSafe)
        {
            this.shoppingTab.build(TabComponent.CreatData(["饮料", "钻石"], [this.goldGroup, this.diamondGroup], TabButtonType.BigOf2));
        }
        else
        {
            this.shoppingTab.build(TabComponent.CreatData(["饮料", "钻石", "道具", "VIP"], [this.goldGroup, this.diamondGroup, this.propGroup, this.vipGroup], TabButtonType.BigOf4));
        }
        VersionManager.setComponentVisibleBySafe(this.vipGroup);
        VersionManager.setComponentVisibleBySafe(this.propGroup);
        UIManager.pushResizeGroup(this.resizeGroup);
        UIManager.pushResizeScroller(this.gold_scroller, 900);
        UIManager.pushResizeScroller(this.diamond_scroller, 900);
        UIManager.pushResizeScroller(this.vip_scroller, 950);
        UIManager.pushResizeScroller(this.prop_scroller, 950);
    }
    // 每次打开都会执行
    public init(appendData: any)
    {
        super.init(appendData);
        this.onTabTap(0);
        if (appendData && appendData.tab != null)
        {
            this.shoppingTab.init(appendData.tab);
        }
        else
        {
            this.shoppingTab.init(0);
        }
        ChannelManager.checkUnFinishedPayList();
        this.refreshUI();
    }

    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this._anime.onEnable();
        this.vipList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.payClickHandler, this);
        this.propList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.payClickHandler, this);
        this.goldList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.payClickHandler, this, false, 100);
        this.diamondList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.payClickHandler, this, false, 100);
        this.shoppingTab.tabChangeEvent.addListener(this.onTabTap, this);
        AwardManager.OnExchanged.addListener(ShopManager.onExchangeVipHandler, this);
        AwardManager.OnAwardValueChanged.addListener(this.onRefreshProperty, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this._anime.onDisable();
        this.vipList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.payClickHandler, this);
        this.propList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.payClickHandler, this);
        this.goldList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.payClickHandler, this);
        this.diamondList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.payClickHandler, this);
        this.shoppingTab.tabChangeEvent.removeListener(this.onTabTap, this);
        AwardManager.OnExchanged.removeListener(ShopManager.onExchangeVipHandler, this);
        AwardManager.OnAwardValueChanged.removeListener(this.onRefreshProperty, this);
        PropertyManager.Clear();
    }
    /**
     * 渲染信息
    */
    private refreshUI()
    {
        this.diamondNumLabel.text = game.MathUtil.formatNum(UserManager.userInfo.diamond);
        this.goldNumLabel.text = game.MathUtil.formatNum(UserManager.userInfo.gold);
    }
    private onRefreshProperty(awardId: number)
    {
        let shopDef: ShopDefinition = ShopDefined.GetInstance().getDefinitionByAwardId(awardId);
        if (shopDef)
        {
            this.diamondNumLabel.text = game.MathUtil.formatNum(UserManager.userInfo.diamond);
            this.goldNumLabel.text = game.MathUtil.formatNum(UserManager.userInfo.gold);
            PropertyManager.ShowItemList();
        }
    }
    /**
     * 购买金币/钻石选择
    */
    private payClickHandler(event: eui.ItemTapEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        switch (event.currentTarget)
        {
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
    }
    /**
     * 使用钻石购买
     */
    private payByDiamond(selectedItem: any)
    {
        let awardDef: AwardDefinition = AwardDefined.GetInstance().getDefinition(selectedItem.definition.awardId);
        if (awardDef && awardDef.costList)
        {
            let costInfo: AwardInfoDefinition;
            for (let i: number = 0; i < awardDef.costList.length; i++)
            {
                if (awardDef.costList[i].type == CostType.Diamond)
                {
                    costInfo = awardDef.costList[i];
                    break;
                }
            }
            if (costInfo)
            {
                if (UserManager.userInfo.diamond >= costInfo.count)
                {
                    AlertManager.showConfirm(game.StringUtil.format("是否花费{0}钻石，购买{1}？", costInfo.count, awardDef.name), this.tryPay, null, selectedItem);
                }
                else
                {
                    CostManager.showBuyDiamond(this.goDiamondGp.bind(this));
                }
            }
        }
    }

    protected showPrePanelName()
    {
        if (this.prevPanelName == UIModuleName.GamblingPanel)
        {
            UIManager.showPanel(this.prevPanelName, this.panelData.toRight);
        }
        else
        {
            UIManager.showPanel(this.prevPanelName);
        }
    }
    private goDiamondGp()
    {
        this.shoppingTab.setSelectIndex(ShopGroupIndex.Diamond);
    }
    private tryPay(obj: any)
    {
        if (obj)
        {
            let payDef: ShopDefinition = ShopDefined.GetInstance().getDefinition(obj.id);
            if (payDef)
            {
                AwardManager.Exchange(payDef.awardId, 1, true);//直接兑换
            }
        }
    }
    private onTabTap(index: number)
    {
        switch (index)
        {
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
    }
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        this._anime.onCloseBtnClickHandler(event);
    }
}
