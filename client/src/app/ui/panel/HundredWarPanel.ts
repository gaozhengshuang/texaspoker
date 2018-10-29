/**
 * 百人大战面板
*/
class HundredWarPanel extends BasePanel
{
	/**
	 * 商城按钮
	*/
    public shoppingBtn: eui.Button;
	/**
	 * 百人大战列表信息
	*/
    public matchGroup: eui.Group;
    public hasMatchGroup: eui.Group;
    public noMatchGroup: eui.Group;
    public matchList: eui.List;
    public matchScroller: eui.Scroller;

    private _enterRoomId: number;

    private _anime: PanelAnime;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.HundredWarPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this._anime = new PanelAnime(this);
        UIUtil.listRenderer(this.matchList, this.matchScroller, HundredWarItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.matchScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.showGroup();
        UIManager.pushResizeScroller(this.matchScroller, 1145);
        UIManager.pushResizeScroller(this.noMatchGroup, 1145);
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.getHundredWarInfo();
        game.ArrayUtil.Clear(HundredWarManager.panelHandler.hundredWarList);
        if (!HundredWarManager.panelHandler.hundredWarList)
        {
            HundredWarManager.panelHandler.hundredWarList = new Array<HundredWarListInfo>();
        }
        this.getHundredWarInfoSuccess();
    }

    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this._anime.onEnable();
        HundredWarManager.panelHandler.OnGetHundredWarInfoEvent.addListener(this.getHundredWarInfoSuccess, this);
        HundredWarManager.OnGetRoomInfoEvent.addListener(this.closePanel, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.matchList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.setRoomId, this);
        game.Tick.AddSecondsInvoke(this.refreshPerTenSeconds, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this._anime.onDisable();
        HundredWarManager.panelHandler.OnGetHundredWarInfoEvent.removeListener(this.getHundredWarInfoSuccess, this);
        HundredWarManager.OnGetRoomInfoEvent.removeListener(this.closePanel, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.matchList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.setRoomId, this);
        game.Tick.RemoveSecondsInvoke(this.refreshPerTenSeconds, this);

    }
    private _secondNum = 0;
    /**
     * 每十秒调用
     */
    private refreshPerTenSeconds()
    {
        if (this._secondNum == 10)
        {
            this._secondNum = 0;
            HundredWarManager.panelHandler.reqGetHundredWarInfo();
        }
        else
        {
            this._secondNum++;
        }
    }
    /**
     * 发送请求获取百人大战信息
    */
    private getHundredWarInfo()
    {
        HundredWarManager.panelHandler.reqGetHundredWarInfo();
    }
    /**
     * 设置进入的房间的配置表id
    */
    private setRoomId(event: egret.TouchEvent)
    {
        if (this.matchList.selectedItem)
        {
            this._enterRoomId = this.matchList.selectedItem.hwId;
        }
    }
    /**
     * 获取百人大战信息成功执行操作
    */
    private getHundredWarInfoSuccess()
    {
        if (HundredWarManager.panelHandler.hundredWarList && HundredWarManager.panelHandler.hundredWarList.length > 0)
        {
            this.showGroup(this.hasMatchGroup);
            UIUtil.writeListInfo(this.matchList, HundredWarManager.panelHandler.hundredWarList, "hwId", false, SortUtil.hundredWarRoomIdUpSort);
        } else
        {
            this.showGroup(this.noMatchGroup);
        }
    }

    private onClick(event: egret.TouchEvent)
    {
        if (event.target == this.shoppingBtn)
        {
            JumpUtil.JumpToShopping(ShopGroupIndex.Gold, UIModuleName.HundredWarPanel);
        }
    }
    /**
     * 请求进入百人大战成功后关闭面板
    */
    private closePanel()
    {
        SceneManager.switcScene(SceneType.HundredWar);
        // UIManager.closePanel(UIModuleName.HundredWarPanel);
    }
    private showGroup(group?: eui.Group)
    {
        this.hasMatchGroup.visible = false;
        this.noMatchGroup.visible = false;
        if (group)
        {
            group.visible = true;
        }
    }
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        this._anime.onCloseBtnClickHandler(event);
    }
}