/**
 * 百人大战庄家列表面板
*/
class HundredWarBankerListPanel extends BasePanel
{

    public bankerGroup: eui.Group;
    public bankerList: eui.List;
    public bankerScroller: eui.Scroller;
    public bankerGoldHs: eui.HSlider;

    public tipsLabel: eui.Label;
    public tipsLabel1: eui.Label;
    public bankBtn: ShadowButton;
    public goldLabel: eui.Label;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.HundredWarBankerListPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        UIUtil.listRenderer(this.bankerList, this.bankerScroller, HundredWarBankerItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.bankerScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        UIManager.pushResizeScroller(this.bankerScroller, 500);
    }
    public init(appendData: any)
    {
        super.init(appendData);
        HundredWarManager.panelHandler.reqHundredWarBankerList();
        this.refreshGold();
        if (InfoUtil.checkAvailable(HundredWarManager.roomInfo) && HundredWarManager.roomInfo.definition.BankerRound)
        {
            this.tipsLabel1.visible = true;
            this.tipsLabel1.text = "每次最多坐庄" + HundredWarManager.roomInfo.definition.BankerRound + "轮比赛！";
        }
        else
        {
            this.tipsLabel1.visible = false;
        }
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        HundredWarManager.panelHandler.OnGetHundredWarBankerListEvent.addListener(this.refreshUI, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        HundredWarManager.panelHandler.onUpDownBankerEvent.addListener(this.refreshBankerBtn, this);
        this.bankerGoldHs.addEventListener(egret.Event.CHANGE, this.onHsSlide, this);
        UserManager.propertyChangeEvent.addListener(this.refreshGold, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        HundredWarManager.panelHandler.OnGetHundredWarBankerListEvent.removeListener(this.refreshUI, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        HundredWarManager.panelHandler.onUpDownBankerEvent.removeListener(this.refreshBankerBtn, this);
        this.bankerGoldHs.removeEventListener(egret.Event.CHANGE, this.onHsSlide, this);
        UserManager.propertyChangeEvent.removeListener(this.refreshGold, this);
    }
    private refreshGold()
    {
        this.goldLabel.text = game.MathUtil.formatNum(UserManager.userInfo.gold);
    }
    private refreshBankerBtn(flag: boolean)
    {
        if (flag == false && HundredWarManager.roomInfo && HundredWarManager.roomInfo.state == HWState.Bet)
        {
            this.bankBtn.enabled = false;
        }
        this.refreshUI();
    }
    private refreshUI()
    {
        if (HundredWarManager.panelHandler.isBankerList())
        {
            this.tipsLabel.visible = false;
            this.bankerGoldHs.visible = false;
            this.bankBtn.label = "下庄";
        }
        else
        {
            this.tipsLabel.visible = true;
            this.bankerGoldHs.visible = true;
            this.bankBtn.label = "我要上庄";
            this.bankBtn.enabled = true;
            if (InfoUtil.checkAvailable(HundredWarManager.roomInfo))
            {
                if (UserManager.userInfo.gold > HundredWarManager.roomInfo.definition.BankerGold)
                {
                    this.bankerGoldHs.maximum = UserManager.userInfo.gold;
                    this.bankerGoldHs.touchChildren = true;
                    this.bankerGoldHs.minimum = this.bankerGoldHs.value = HundredWarManager.roomInfo.definition.BankerGold;
                    this.tipsLabel.text = game.MathUtil.formatNum(this.bankerGoldHs.value);
                }
                else
                {
                    this.bankerGoldHs.maximum = this.bankerGoldHs.value = HundredWarManager.roomInfo.definition.BankerGold;
                    this.bankerGoldHs.touchChildren = false;
                    this.tipsLabel.text = "上庄至少需要" + game.MathUtil.formatNum(HundredWarManager.roomInfo.definition.BankerGold);
                }
            }
        }
        UIUtil.writeListInfo(this.bankerList, HundredWarManager.panelHandler.HundredWarBankerList, "roleId", false);
    }

    private onHsSlide(event: egret.Event)
    {
        if (InfoUtil.checkAvailable(HundredWarManager.roomInfo))
        {
            if (UserManager.userInfo.gold > HundredWarManager.roomInfo.definition.BankerGold)
            {
                this.tipsLabel.text = game.MathUtil.formatNum(this.bankerGoldHs.value);
            }
            else
            {
                this.bankerGoldHs.value = HundredWarManager.roomInfo.definition.BankerGold;
            }
        }
    }

    private onClick(event: egret.TouchEvent)
    {
        if (event.target == this.bankBtn)
        {
            SoundManager.playEffect(MusicAction.buttonClick);
            if (HundredWarManager.panelHandler.isBankerList())
            {
                HundredWarManager.panelHandler.reqDownBanker();
            }
            else
            {
                if (InfoUtil.checkAvailable(HundredWarManager.roomInfo))
                {
                    if (UserManager.userInfo.gold > HundredWarManager.roomInfo.definition.BankerGold)
                    {
                        HundredWarManager.panelHandler.reqUpBanker(this.bankerGoldHs.value);
                    }
                    else
                    {
                        AlertManager.showConfirm("您的金币不足" + game.MathUtil.formatNum(HundredWarManager.roomInfo.definition.BankerGold) + "，无法上庄！", null, () => 
                        {
                            JumpUtil.JumpToShopping(ShopGroupIndex.Gold, UIModuleName.HundredWarBankerListPanel)
                        }, null, "系统提示", null, "确定", "充值", null);
                    }
                }
            }
        }
    }
}