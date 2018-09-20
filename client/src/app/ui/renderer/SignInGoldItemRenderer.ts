/**
 * 签到渲染项
*/
class SignInGoldItemRenderer extends BaseItemRenderer<SignInInfo>{
    public signInDayLabel: eui.Label;//签到天数
    public signInGoldLabel: eui.Label;
    public prizeImg: eui.Image;
    public signInCheck: eui.Image;
    public signInBg: eui.Image;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.SignInGoldItemRenderer;
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        if (InfoUtil.checkAvailable(this.bindData))
        {
            let info: ActivityInfo = ActivityManager.getActivityInfo(this.bindData.id);
            if (info && info.step < this.bindData.definition.day)
            {
                this.signInCheck.visible = false;
                this.signInBg.visible = false;
            }
            else
            {
                this.signInCheck.visible = true;
                this.signInBg.visible = true;
            }

            let awardDef: AwardDefinition = AwardDefined.GetInstance().getDefinition(this.bindData.definition.awardId);
            if (awardDef && awardDef.rewardList)
            {
                this.signInGoldLabel.text = ActivityManager.signInHandler.getAwardDes(awardDef);
                let itemDef: ItemDefinition = ItemDefined.GetInstance().getDefinition(awardDef.rewardList[0].id);
                if (itemDef)
                {
                    this.prizeImg.source = itemDef.icon + ResSuffixName.PNG;
                }
            }
            this.signInDayLabel.text = "第" + this.bindData.definition.day.toString() + "天";
        }
    }
}