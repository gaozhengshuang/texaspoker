/**
 * 绑定手机奖励面板
*/
class BindPhoneAwardPanel extends BaseActivityPanel
{
    public scroller: eui.Scroller;
    public list: eui.List;
    public goToBtn: eui.Button;  //前往绑定按钮
    public bringBtn: eui.Button;  //领取奖励按钮

    private _awardList: Array<AwardInfoDefinition>;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.BindPhoneAwardPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        UIUtil.listRenderer(this.list, this.scroller, BindPhoneAwardItemRenderer, ScrollViewDirection.Horizontal_L_R, eui.ScrollPolicy.AUTO, null, true);
        this.scroller.scrollPolicyV = eui.ScrollPolicy.OFF;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        BindAccountManager.reqGetList();
        this.setAwardInfo();
        this.rendererListInfo();
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.goToBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goToBind, this);
        this.bringBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bringAward, this);
        BindAccountManager.bindListEvent.addListener(this.refreshQinBindState, this);
        ActivityManager.bindPhoneAwardHandler.bringSuccessEvent.addListener(this.bringSuccess, this);
        BindAccountManager.bindSuccessEvent.addListener(this.bindSuccess, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.goToBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goToBind, this);
        this.bringBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bringAward, this);
        BindAccountManager.bindListEvent.removeListener(this.refreshQinBindState, this);
        ActivityManager.bindPhoneAwardHandler.bringSuccessEvent.removeListener(this.bringSuccess, this);
        BindAccountManager.bindSuccessEvent.removeListener(this.bindSuccess, this);
    }

    private refreshQinBindState()
    {
        //手机账号绑定
        if (BindAccountManager.getIsBinding(ChannelLoginType.GiantFun))  //判断用户是否绑定了手机
        {
            this.goToBtn.visible = false;
            this.bringBtn.visible = true;
        }
        else
        {
            this.goToBtn.visible = true;
            this.bringBtn.visible = false;
        }
    }
    /**
     * 跳到绑定界面
    */
    private goToBind()
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        BindAccountManager.startBindQin(UIModuleName.BindPhoneAwardPanel);
    }
    /**
     * 绑定成功
    */
    private bindSuccess(data: any)
    {
        if (data == ChannelLoginType.GiantFun)
        {
            this.goToBtn.visible = false;
            this.bringBtn.visible = true;
        }
    }
    /**
     * 领取奖励
    */
    private bringAward()
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        let subInfo: any = this.activityInfo.subList[0]; //move todo
        ActivityManager.ReqGetActivityAward(subInfo.Id, subInfo.SubId);
    }
    /**
     * 领取成功
    */
    private bringSuccess(id: number)
    {
        if (this.activityInfo.id == id)
        {
            super.onCloseBtnClickHandler(null);
        }
    }
    /**
     * 设置奖励数据
    */
    private setAwardInfo()
    {
        if (InfoUtil.checkAvailable(this.activityInfo))
        {
            let phoneDef: ActivityPhoneDefintion = this.activityInfo.subList[0].definition as ActivityPhoneDefintion;
            if (phoneDef)
            {
                this._awardList = AwardManager.getAwardInfoDefinitionList(phoneDef.awardId);
            }
        }
    }
    /**
     * 渲染列表项
    */
    private rendererListInfo()
    {
        UIUtil.writeListInfo(this.list, this._awardList, null);
    }
}