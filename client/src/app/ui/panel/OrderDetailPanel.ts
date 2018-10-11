/**
 * 订单详情面板
*/
class OrderDetailPanel extends BasePanel
{
    /**
     * icon
    */
    public comItemIcon: CommonIcon;
    /**
     * 道具名称
    */
    public nameLabel: eui.Label;
    /**
     * 道具说明
    */
    public desLabel: eui.Label;
    /**
     * 获得方式
    */
    public getTypeLabel: eui.Label;
    /**
     * 当前状态
    */
    public stateLabel: eui.Label;
    /**
     * 收件人
    */
    public pNameLabel: eui.Label;
    /**
     * 手机号
    */
    public telLabel: eui.Label;
    /**
     * 地址
    */
    public addressLabel: eui.Label;
    /**
     * 快递单号
    */
    public trackInfoLabel: eui.Label;

    /**
     * 已领取信息group
    */
    public receivedGroup: eui.Group;
    /**
     * 快递单号group
    */
    public trackGroup: eui.Group;
    /**
     * 收货地址group
    */
    public addressGroup: eui.Group;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.OrderDetailPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.trackGroup.visible = this.addressGroup.visible = false;
        if (appendData.isGet == 1)
        {
            this.receivedGroup.visible = false;
            egret.callLater(this.setBaseInfo, this);
        } else if (appendData.isGet == 2)
        {
            this.receivedGroup.visible = true;
            PrizeManager.getOrderDetailInfo(appendData.id);
        }
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        PrizeManager.onGetOrderDetailInfoEvent.addListener(this.setPanelInfo, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        PrizeManager.onGetOrderDetailInfoEvent.removeListener(this.setPanelInfo, this);
    }

    /**
     * 设置面板数据
    */
    private setPanelInfo(data: any)
    {
        this.setBaseInfo();
        if (this.panelData.state == OrderStateType.WaitSend)
        {
            if (this.panelData.effectType == PrizeEffectType.Kind)
            {
                this.stateLabel.text = "等待发货";
            } else if (this.panelData.effectType == PrizeEffectType.Cost)
            {
                this.stateLabel.text = "充值中";
            }
        } else if (this.panelData.state == OrderStateType.Sent)
        {
            if (this.panelData.effectType == PrizeEffectType.Kind)
            {
                this.stateLabel.text = "已发货";
            } else if (this.panelData.effectType == PrizeEffectType.Cost)
            {
                this.stateLabel.text = "已充值";
            }
        } else if (this.panelData.state == OrderStateType.InfoError)
        {
            this.stateLabel.text = "信息错误，已返回";
        }
        this.pNameLabel.text = data.name;
        this.telLabel.text = data.phone;
        if (this.panelData.effectType == PrizeEffectType.Kind)
        {
            this.addressGroup.visible = true;
            this.addressLabel.text = data.address;
            if (data.trackNo)
            {
                this.trackGroup.visible = true;
                this.trackInfoLabel.text = data.trackName + data.trackNo;
            }
        }
    }
    /**
     * 设置一定显示的信息
    */
    private setBaseInfo()
    {
        let itemDef: table.IItemBaseDataDefine = table.ItemBaseDataById[this.panelData.itemId];
        if (itemDef)
        {
            this.comItemIcon.init(this.panelData.itemId, 118, SheetSubName.GetItemBg);
            this.nameLabel.text = itemDef.Name;
            this.desLabel.text = itemDef.Des;
            this.getTypeLabel.text = itemDef.Extern;
        }
    }
}