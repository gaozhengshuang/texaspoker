/**
 * 礼物信息面板
 */
class GiftItemPanel extends BasePanel
{
    public giftComp: CommonIcon;
    public giftNameLabel: eui.Label;
    public wearingLabel: eui.Label;
    public friendName: eui.Label;
    public friendGiveGroup: eui.Group;
    public leftTimeLabel: eui.Label;

    public wearGiftBtn: eui.Button;

    private info;

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
            this.info = appendData;
        }
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.wearGiftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.wearGift, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.wearGiftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.wearGift, this);
    }
    private wearGift(event: egret.TouchEvent)
    {
        
    }
}