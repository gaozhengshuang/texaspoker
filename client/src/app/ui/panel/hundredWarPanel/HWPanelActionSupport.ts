/**
 * 行为操作支持 
 */
class HWPanelActionSupport extends BaseHWPanelSupport
{
    public initialize()
    {
        super.initialize();
        this.initBankerBtn();
        HundredWarManager.panelHandler.reqHundredWarBankerList();
    }
    public onEnable()
    {
        super.onEnable();
        this.target.goBankerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoBankerClick, this);
        this.target.outBankerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOutBankerClick, this);
        HundredWarManager.onPosChangeEvent.addListener(this.setBankerBth, this);
    }
    public onDisable()
    {
        super.onDisable();
        this.target.goBankerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoBankerClick, this);
        this.target.outBankerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOutBankerClick, this);
        HundredWarManager.onPosChangeEvent.removeListener(this.setBankerBth, this);
    }

    /**
     * 设置上庄和下庄按钮
    */
    private setBankerBth(data: any)
    {
        if (data.roleId && data.pos == 0)
        {
            if (data.roleId == UserManager.userInfo.roleId)
            {
                this.target.outBankerBtn.visible = true;
                this.target.goBankerBtn.visible = false;
            }
            else
            {
                this.target.goBankerBtn.visible = true;
                this.target.outBankerBtn.visible = false;
            }
        }
    }
    /**
     * 初始化上下庄按钮
    */
    private initBankerBtn()
    {
        if (HundredWarManager.isBanker(UserManager.userInfo.roleId))
        {
            this.target.outBankerBtn.visible = true;
            this.target.goBankerBtn.visible = false;
        } else
        {
            this.target.goBankerBtn.visible = true;
            this.target.outBankerBtn.visible = false;
        }
    }
    /**
     * 我要上庄按钮点击执行事件
    */
    private onGoBankerClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        JumpUtil.JumpToHundredWarBanker();
    }
    /**
     * 下庄按钮点击执行事件
    */
    private onOutBankerClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        JumpUtil.JumpToHundredWarBanker();
    }
    /**
     * 点击充值跳转到商城
    */
    private showShopping()
    {
        JumpUtil.JumpToShopping(ShopGroupIndex.Gold, UIModuleName.HundredWarRoomPanel);
    }
}