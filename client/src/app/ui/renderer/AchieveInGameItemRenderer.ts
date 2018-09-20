/**
 * 游戏场里的任务项
 */
class AchieveInGameItemRenderer extends BaseItemRenderer<AchievementInfo>
{
    public commonItem: CommonIcon;
    public desLabel: eui.Label;
    public rewardLabel: eui.Label;
    public rewardImg: eui.Image;
    public takeBtn: eui.Button;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.AchieveInGameItemRenderer;
    }

    protected dataChanged()
    {
        super.dataChanged();
        if (InfoUtil.checkAvailable(this.bindData))
        {
            this.commonItem.init(this.bindData.definition.icon + ResSuffixName.PNG, 77);
            this.desLabel.text = this.bindData.definition.name;
            this.rewardLabel.text = this.bindData.definition.rewardNum.toString();
            let def: ItemDefinition = ItemDefined.GetInstance().getDefinition(this.bindData.definition.rewardId);
            if (def)
            {
                this.rewardImg.source = def.icon + ResSuffixName.PNG;
            }

            this.refreshiUI();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
    }

    private refreshiUI()
    {
        let groupInfo: BaseAchieveProcessInfo = AchieveProcessManager.getAchieveProcessInfoByGroup(this.bindData.definition.group);
        if (!this.bindData.isComplete)
        {
            this.takeBtn.enabled = false;
            this.takeBtn.label = groupInfo.process + "/" + this.bindData.definition.para1;
        }
        else
        {
            this.takeBtn.enabled = true;
            this.takeBtn.label = "领取";
        }
    }

    private onClick(event: egret.TouchEvent)
    {
        if (event.target == this.takeBtn)
        {
            SoundManager.playButtonEffect(event.target);
            AchievementManager.reqTakeAchievePrize([this.bindData.id]);
        }
    }

    public onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
}// TypeScript file