/**
 * 百人大战里的任务项
 */
class AchieveInHundredWarItemRenderer extends BaseItemRenderer<AchievementInfo>
{
    public desLabel: eui.Label;
    public rewardLabel: eui.Label;
    public rewardImg: eui.Image;
    public takeBtn: ShadowButton;

    public achieveProgresLabel: eui.Label;
    public achieveProgressImg: eui.Image;
    public progresGroup: eui.Group;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.AchieveInHundredWarItemRenderer;
    }

    protected dataChanged()
    {
        super.dataChanged();
        if (InfoUtil.checkAvailable(this.bindData))
        {
            this.desLabel.text = this.bindData.definition.Name;
            this.rewardLabel.text = this.bindData.definition.RewardNum.toString();
            if (this.bindData.definition.RewardId.length > 0)
            {
                let def: table.IItemBaseDataDefine = table.ItemBaseDataById[this.bindData.definition.RewardId[0]];
                if (def)
                {
                    this.rewardImg.source = def.Icon + ResSuffixName.PNG;
                }
            }

            this.refreshiUI();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
    }

    private refreshiUI()
    {
        let groupInfo: BaseAchieveProcessInfo = AchieveProcessManager.getAchieveProcessInfoByGroup(this.bindData.definition.Group);
        if (!this.bindData.isComplete)
        {
            this.takeBtn.visible = false;
            this.progresGroup.visible = true;
            this.achieveProgresLabel.text = groupInfo.process + " / " + this.bindData.definition.Para1;
            this.achieveProgressImg.width = 150;
            this.achieveProgressImg.width *= groupInfo.process / this.bindData.definition.Para1;
        }
        else
        {
            this.takeBtn.visible = true;
            this.progresGroup.visible = false;
        }
    }

    private onClick(event: egret.TouchEvent)
    {
        if (event.target == this.takeBtn)
        {
            SoundManager.playEffect(MusicAction.buttonClick);
            AchievementManager.reqTakeAchievePrize([this.bindData.id]);
        }
    }

    public onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
}