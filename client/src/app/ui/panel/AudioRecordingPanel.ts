/**
 * 正在录音面板
 */
class AudioRecordingPanel extends BasePanel
{
    public play: egret.tween.TweenGroup;

    public recordGroup: eui.Group;
    public cancelGroup: eui.Group;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.AudioRecordingPanel);
    }

    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
    }
    private ShowValue()
    {
        this.play.play();
    }

    public init(appendData: any)
    {
        super.init(appendData);
        this.setCancel(false);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.ShowValue();
        UIManager.addEventListener(UIModuleName.AudioRecordingPanel, UIModuleEvent.CHANGE, this.onCancel, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.play.pause();
        RecordAudioManager.ClearData();
        UIManager.removeEventListener(UIModuleName.AudioRecordingPanel, UIModuleEvent.CHANGE, this.onCancel, this);
    }
    private onCancel()
    {
        this.setCancel(true);
    }

    private setCancel(isCancel: boolean)
    {
        this.cancelGroup.visible = isCancel;
        this.recordGroup.visible = !isCancel;
    }
}