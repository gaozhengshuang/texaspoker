/**
 * 我的奖品面板
*/
class PrizePanel extends BasePanel
{
    private nameLabel: eui.Label;
    private telLabel: eui.Label;
    private qqLabel: eui.Label;
    private emailLabel: eui.Label;
    private addressLabel: eui.Label;
    private notReceiveGroup: eui.Group;
    private hasReceiveGroup: eui.Group;
    private receiveAwardInfoGroup: eui.Group;
    private enAwardGroup: eui.Group;
    private enHasReceiveGroup: eui.Group;
    private disAwardGroup: eui.Group;
    private disHasReceiveGroup: eui.Group;
    private notReceiveList: eui.List;
    private hasReceiveList: eui.List;
    private notReceiveScroller: eui.Scroller;
    private hasReceiveScroller: eui.Scroller;
    private tabComponent: TabComponent;
    /**
     * 参加锦标赛按钮
    */
    private joinChampionshipsBtn: eui.Button;
    /**
     * 保存按钮
    */
    private saveBtn: eui.Button;

    public reqscroller: ReqScroller;
    /**
     * 未领取的奖品列表
    */
    public notReceiveInfoList: Array<PrizeInfo>;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.PrizePanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        UIUtil.listRenderer(this.notReceiveList, this.notReceiveScroller, MyAwardPanelItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.hasReceiveList, this.hasReceiveScroller, MyAwardPanelItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.reqscroller = new ReqScroller(this.hasReceiveScroller, this.hasReceiveList, 10, this.getPrizeList.bind(this));
        this.notReceiveScroller.scrollPolicyH = this.hasReceiveScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.disAwardGroup.visible = this.enAwardGroup.visible = this.disHasReceiveGroup.visible = false;
        this.nameLabel.type = this.telLabel.type = this.qqLabel.type = this.emailLabel.type = this.addressLabel.type = egret.TextFieldType.INPUT;
        this.telLabel.inputType = egret.TextFieldInputType.TEL;
        let array: Array<eui.Group> = new Array<eui.Group>();
        array.push(this.notReceiveGroup);
        array.push(this.hasReceiveGroup);
        array.push(this.receiveAwardInfoGroup);
        this.tabComponent.build(TabComponent.CreatData(["未领取", "已领取", "领奖信息"], array, TabButtonType.SmallOf3));
        this.tabComponent.isTween = false;
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.tabComponent.init(0);
        this.setAwardListInfo();
        PrizeManager.getAddressInfo();
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.tabComponent.setSelectIndex(0);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        PrizeManager.onGetAwardListEvent.addListener(this.setHasReceiveListInfo, this);
        this.tabComponent.tabChangeEvent.addListener(this.onTabClickHandler, this);
        this.saveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSaveBtnClick, this);
        this.joinChampionshipsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goToMTT, this);
        PrizeManager.onSkipEvent.addListener(this.setInfoSelected, this);
        PrizeManager.onGetAwardEvent.addListener(this.refreshUI, this);
        PrizeManager.onGetAddressInfoEvent.addListener(this.setAddressInfo, this);
        this.notReceiveList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.showPrizeDetailInfo, this);
        this.hasReceiveList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.showOrderDetailInfo, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        PrizeManager.onGetAwardListEvent.removeListener(this.setHasReceiveListInfo, this);
        this.tabComponent.tabChangeEvent.removeListener(this.onTabClickHandler, this);
        this.saveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSaveBtnClick, this);
        this.joinChampionshipsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goToMTT, this);
        PrizeManager.onSkipEvent.removeListener(this.setInfoSelected, this);
        PrizeManager.onGetAwardEvent.removeListener(this.refreshUI, this);
        PrizeManager.onGetAddressInfoEvent.removeListener(this.setAddressInfo, this);
        this.notReceiveList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.showPrizeDetailInfo, this);
        this.hasReceiveList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.showOrderDetailInfo, this);
    }

    /**
     * 刷新UI
    */
    private refreshUI(id: number)
    {
        let nowReceive: PrizeInfo = new PrizeInfo();
        if (this.notReceiveInfoList.length > 0)
        {
            for (let i: number = 0; i < this.notReceiveInfoList.length; i++)
            {
                if (this.notReceiveInfoList[i].itemId == id)
                {
                    nowReceive = this.notReceiveInfoList[i];
                    this.notReceiveInfoList.splice(i, 1);
                    break;
                }
            }
        }
        UIManager.closePanel(UIModuleName.PrizeOrderSurePanel);
        AlertManager.showAlertByString('您的奖品正在发货中，预计时间为1-5个工作日，发货详情请在"已领取"页签内查看！');
        this.setAwardListInfo();
    }
    /**
     * 跳转到领奖信息
    */
    private setInfoSelected()
    {
        this.tabComponent.setSelectIndex(2);
    }
    /**
     * 参加锦标赛按钮点击事件
    */
    private goToMTT(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        UIManager.showPanel(UIModuleName.ChampionshipPanel, { prevPanelName: UIModuleName.ChampionshipPanel });
    }
    /**
     * 显示奖品详情
    */
    private showPrizeDetailInfo(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.notReceiveList.selectedItem)
        {
            UIManager.showPanel(UIModuleName.OrderDetailPanel, this.notReceiveList.selectedItem);
        }
    }
    /**
     * 显示订单详情
    */
    private showOrderDetailInfo(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.hasReceiveList.selectedItem)
        {
            UIManager.showPanel(UIModuleName.OrderDetailPanel, this.hasReceiveList.selectedItem);
        }
    }
    /**
     * 设置收货地址数据
    */
    private setAddressInfo()
    {
        this.nameLabel.text = UserManager.userInfo.addressName;
        this.telLabel.text = UserManager.userInfo.phoneNum;
        this.qqLabel.text = UserManager.userInfo.qqNum;
        this.emailLabel.text = UserManager.userInfo.eMail;
        this.addressLabel.text = UserManager.userInfo.address;
    }
    /**
     * 发送获取赛事排名
    */
    private getPrizeList()
    {
        PrizeManager.reqGetAwardList(this.reqscroller.index, this.reqscroller.reqNum);
    }
    /**
     * 选项卡按钮点击事件
    */
    private onTabClickHandler(index: number): void
    {
        if (index == 0)
        {
            this.setAwardListInfo();
        } else if (index == 1)
        {
            this.reqscroller.Clear();
            PrizeManager.reqGetAwardList(this.reqscroller.index, 10);
        } else if (index == 2)
        {
            PrizeManager.getAddressInfo();
        }
    }
    /**
     * 领奖信息保存
    */
    private onSaveBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        let name: string = this.nameLabel.text.trim();
        let tel: string = this.telLabel.text.trim();
        let qq: string = this.qqLabel.text.trim();
        let email: string = this.emailLabel.text.trim();
        let address: string = this.addressLabel.text.trim();
        if (name && tel && qq && email && address)
        {
            if (name == UserManager.userInfo.addressName && tel == UserManager.userInfo.phoneNum && qq == UserManager.userInfo.qqNum && email == UserManager.userInfo.eMail && address == UserManager.userInfo.address)
            {
                return;
            } else if (this.validity())
            {
                //发送保存请求  
                PrizeManager.reqSaveInfo(name, tel, qq, email, address);
            }
        } else
        {
            UIManager.showFloatTips("领奖信息必须填写完整！");
        }
    }
    /**
     * 信息合法性验证
    */
    private validity(): boolean
    {
        if (this.nameLabel.text.length > 6) 
        {
            UIManager.showFloatTips("收件人输入长度不得大于6个字符");
            return false;
        }
        if (!this.telLabel.text.match(/^1\d{10}$/))
        {
            UIManager.showFloatTips("请输入有效的手机号码");
            return false;
        }
        if (!this.qqLabel.text.match(/^\d{5,11}$/))
        {
            UIManager.showFloatTips("请输入有效的qq号码");
            return false;
        }
        if (!this.emailLabel.text.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/))
        {
            UIManager.showFloatTips("请输入正确格式的邮箱");
            return false;
        }
        if (this.addressLabel.text.length > 35)
        {
            UIManager.showFloatTips("详细地址的输入长度不得大于35个字符");
            return false;
        }
        return true;
    }
    /**
     * 设置未领取奖品列表信息
    */
    private setAwardListInfo()
    {
        let prizeList: Array<ItemInfo>;
        prizeList = ItemManager.getItemListByType(ItemType.Raffle);
        game.ArrayUtil.Clear(this.notReceiveInfoList);
        if (!this.notReceiveInfoList)
        {
            this.notReceiveInfoList = new Array<PrizeInfo>();
        }
        if (prizeList && prizeList.length > 0)
        {
            for (let prizeInfo of prizeList)
            {
                if (prizeInfo.count && prizeInfo.count > 1)
                {
                    for (let i: number = 0; i < prizeInfo.count; i++)
                    {
                        this.setNotRecInfo(prizeInfo);
                    }
                } else
                {
                    this.setNotRecInfo(prizeInfo);
                }
            }
            this.enAwardGroup.visible = true;
            this.disAwardGroup.visible = false;
            UIUtil.writeListInfo(this.notReceiveList, this.notReceiveInfoList, "itemId");
        } else
        {
            this.disAwardGroup.visible = true;
            this.enAwardGroup.visible = false;
        }
    }
    /**
     * 写入未领取奖品的数据
    */
    private setNotRecInfo(prizeInfo: ItemInfo)
    {
        let notRecInfo: PrizeInfo = new PrizeInfo();
        notRecInfo.itemId = prizeInfo.id;
        notRecInfo.isGet = 1;
        this.notReceiveInfoList.push(notRecInfo);
    }
    /**
     * 设置已领取奖品列表信息
    */
    private setHasReceiveListInfo(data: any)
    {
        if (data.hasReceiveList && !(data.isBottom && data.hasReceiveList.length <= 0 && this.reqscroller.index == 0))
        {
            this.enHasReceiveGroup.visible = true;
            this.disHasReceiveGroup.visible = false;
            this.reqscroller.init(new eui.ArrayCollection(data.hasReceiveList), data.isBottom);
        } else
        {
            this.enHasReceiveGroup.visible = false;
            this.disHasReceiveGroup.visible = true;
        }
    }
}