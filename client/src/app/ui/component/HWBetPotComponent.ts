/**
 * 百人大战牌局注池组件
 */
class HWBetPotComponent extends BaseComponent<HWBetPotInfo>
{
    public betGroup: eui.Group;
    /**
     * 背景图片
    */
    public bgImg: eui.Image;
    /**
     * 全部下注筹码
    */
    public allChipsLabel: eui.Label;
    /**
     * 自己下注筹码
    */
    public myChipsLabel: eui.Label;
    public myChipsImg: eui.Image;

    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.betGroup.touchChildren = this.betGroup.touchEnabled = false;
    }
	/**
	 * 默认初始化
	 */
    public init(data: HWBetPotInfo)
    {
        super.init(data);
        if (data)
        {
            if (data.bet)
            {
                this.allChipsLabel.text = qin.MathUtil.formatNum(data.bet);
            } else
            {
                this.allChipsLabel.text = "";
            }
            if (data.myBet)
            {
                this.myChipsLabel.text = qin.MathUtil.formatNum(data.myBet);
            } else
            {
                this.myChipsLabel.text = "";
                this.myChipsImg.visible = false;
            }
        } else
        {
            this.reset();
        }
    }

    /**
     * 重置
    */
    public reset()
    {
        this.allChipsLabel.text = "";
        this.myChipsLabel.text = "";
        this.myChipsImg.visible = false;
    }
    /**
     * 设置背景图片
    */
    public setBg(pos: number)
    {
        this.bgImg.source = HWPanelSetting["BetPot" + pos];
    }
}
