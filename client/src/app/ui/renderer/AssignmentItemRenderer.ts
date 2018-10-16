/**
 * 任务项
 */
class AssignmentItemRenderer extends BaseItemRenderer<AchievementInfo>
{
    public desLabel: eui.Label;
    public rewardLabel: eui.Label;
    public rewardImg: eui.Image;
    public takePrizeBtn: eui.Button;
    public gotoBtn: eui.Button;
    public processImg: eui.Image;
    public processLabel: eui.Label;

    public itemComp: CommonIcon;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.AssignmentItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (InfoUtil.checkAvailable(this.bindData))
        {
            this.itemComp.init(this.bindData.definition.Icon + ResSuffixName.PNG, 100);
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
            this.processImg.width = 246;
            this.processImg.width *= groupInfo.process / this.bindData.definition.Para1;
            this.processLabel.text = groupInfo.process + "/" + this.bindData.definition.Para1;
            this.gotoBtn.visible = true;
            this.takePrizeBtn.visible = false;
        }
        else
        {
            this.processImg.width = 246;
            this.processLabel.text = this.bindData.definition.Para1 + "/" + this.bindData.definition.Para1;
            this.gotoBtn.visible = false;
            this.takePrizeBtn.visible = true;
        }
    }

    private onClick(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (event.target == this.takePrizeBtn)
        {
            AchievementManager.reqTakeAchievePrize([this.bindData.id]);
        }
        else if (event.target == this.gotoBtn)
        {
            JumpUtil.JumpByPlayField(this.bindData.definition.Tran, UIModuleName.AssignmentPanel);
        }
    }

    public onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
}