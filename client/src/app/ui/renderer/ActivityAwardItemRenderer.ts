/**
 * 活动奖励渲染项
 */
class ActivityAwardItemRenderer extends BaseItemRenderer<ActivityInfo>
{
    public desLabel: eui.Label;
    public takeBtn: eui.Button;
    public statusLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.ActivityAwardItemRenderer;
    }

    protected dataChanged(): void
    {
        super.dataChanged();
      this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
          this.refresh();
    }

    private refresh()
    {
        if (this.bindData)
        {

        }
    }

    private onClick()
    {
        ActivityManager.showPanelInActivityCenter(this.bindData);
    }

    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
}

