/**
 * 成就信息面板
 */
class AchievementItemPanel extends BasePanel
{
    public item: AchievementItemRenderer;
    public achieveName: eui.Label;
    public progress: eui.Label;
    public des: eui.Label;
    public complete: eui.Image;

    private info: AchievementInfo;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.AchievementItemPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        if (appendData)
        {
            this.info = appendData as AchievementInfo;
        }
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.item.init(this.info, 150);
        let itemDef = this.info.definition;
        if (itemDef)
        {
            this.achieveName.text = itemDef.Name;
            if (this.info.isComplete)
            {
                this.progress.text = itemDef.Para1.toString() + "/" + itemDef.Para1.toString();
            }
            else if (!this.info.isOther)
            {
                this.progress.text = AchieveProcessManager.getAchieveProcessInfoByGroup(itemDef.Group).process + "/" + itemDef.Para1.toString();
            }
            else
            {
                let process: number = AchievementManager.otherProcessList.getValue(itemDef.Group);
                this.progress.text = (process == undefined ? 0 : process) + "/" + itemDef.Para1.toString();
            }
            this.des.text = itemDef.Description;
        }

        this.complete.visible = this.info.isComplete;
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
    }
}