/**
 * 百人大战下注项
 */
class HWBetItemRenderer extends BaseItemRenderer<HWBetInfo>
{
    public bet: eui.ToggleButton;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.HWBetItemRenderer;
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.bet["lightImg"].visible = false;
            if (HundredWarManager.roomInfo.state == HWState.Bet)
            {
                if (((UserManager.userInfo.gold + HundredWarManager.getThisBetGold()) / 5) >= this.bindData.bet + HundredWarManager.getThisBetGold())
                {
                    this.bet["maskImg"].visible = false;
                    this.bindData.isBet = true;
                } else
                {
                    this.bet["maskImg"].visible = true;
                    this.bindData.isBet = false;
                }
            } else
            {
                this.bet["maskImg"].visible = true;
                this.bindData.isBet = false;
            }
            this.setBg(this.bindData.id);
            if (this.bindData.id == 0)
            {
                this.setActive();
                HundredWarManager.oneBetGold = this.bindData.bet;
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    }

    /**
     * 设置选中状态
    */
    public setActive()
    {
        this.bet["lightImg"].visible = true;
    }
    /**
     * 设置非选中状态
    */
    public setNotActive()
    {
        this.bet["lightImg"].visible = false;
    }
    /**
     * 设置背景图片
    */
    public setBg(id: number)
    {
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.definition && HundredWarManager.roomInfo.definition.type == HundredWarType.FunPattern)
        {
            switch (id)
            {
                case 0:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_100;
                    break;
                case 1:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_1000;
                    break;
                case 2:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_1w;
                    break;
                case 3:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_10w;
                    break;
                case 4:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_100w;
                    break;
            }
        } else
        {
            switch (id)
            {
                case 0:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_1000;
                    break;
                case 1:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_1w;
                    break;
                case 2:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_10w;
                    break;
                case 3:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_100w;
                    break;
                case 4:
                    this.bet["bgImg"].source = HWPanelSetting.Chip_1000w;
                    break;
            }
        }

    }
}