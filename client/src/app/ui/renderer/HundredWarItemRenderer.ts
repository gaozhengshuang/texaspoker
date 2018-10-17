/**
 * 百人大战列表项面板
*/
class HundredWarItemRenderer extends BaseItemRenderer<HundredWarListInfo>
{
    /**
     * bg
     */
    public bgImage: eui.Image;
    /**
     * 名字
    */
    public titleImg: eui.Image;
    /**
     * 奖池图片
     */
    public poolImg: eui.Image;
    /**
     * 在玩人数以及人数上限
    */
    public numLabel: eui.Label;
    /**
     * 进入下限
    */
    public priceLabel: eui.Label;
    /**
     * 奖池金币数量
    */
    public numComp: HundredWarNumComponent;

    public labelGroup: eui.Group;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.HundredWarItemRenderer;
    }
    public updateData()
    {
        this.dataChanged();
    }
    protected dataChanged()
    {
        super.dataChanged();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterRoom, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refreshUI();
    }

    private refreshUI()
    {
        if (InfoUtil.checkAvailable(this.bindData))
        {
            this.bgImage.source = ResPrefixPathName.Bg + this.bindData.definition.Icon + ResSuffixName.PNG;
            this.titleImg.source = this.bindData.definition.TitleImg + ResSuffixName.PNG;
            this.poolImg.source = this.bindData.definition.PoolImg + ResSuffixName.PNG;
            this.numLabel.text = this.bindData.join + "/" + this.bindData.definition.MaxRole;
            this.priceLabel.text = game.MathUtil.formatNum(this.bindData.definition.MinBuyin);
            this.numComp.init("$" + game.MathUtil.numAddSpace(this.bindData.pool), NumResType.HundredWar2, 2);
            for (let i: number = 0; i < this.labelGroup.numChildren; i++)
            {
                let label: eui.Label = this.labelGroup.getChildAt(i) as eui.Label;
                if (label)
                {
                    label.textColor = parseInt(this.bindData.definition.FontColor, 16);
                }
            }
        }
    }

    private enterRoom()
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (InfoUtil.checkAvailable(this.bindData))
        {
            //判断金币是否足够
            if (UserManager.userInfo.gold >= this.bindData.definition.MinBuyin)
            {
                HundredWarManager.reqEnterRoom(this.bindData.id);
            } else
            {
                AlertManager.showConfirm("您的金币不足，快去商城补充点金币吧！", JumpUtil.JumpToShopping, null, null, null, null, "前往商城");
            }
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterRoom, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    }
}