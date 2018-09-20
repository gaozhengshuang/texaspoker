/**
 * 德州转转转结果面板
 */
class ShimTaeYoonResultPanel extends BasePanel
{
    public charLabel: eui.Label;
    public numLabel: eui.Label;
    public bgImage: eui.Image;
    public desImg: eui.Image;
    public numGroup: eui.Group;
    private _count: number;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.ShimTaeYoonResultPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.setGrayMask(false);
        this.tweenGroup.verticalCenter = -300;
        this._count = 0;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        if (appendData.gold > 0)
        {
            this._count++;
            if (this._count >= 3)
            {
                this._count = 0;
                this.desImg.source = SheetSubName.LaBa_WinningStreak;
                this.numGroup.bottom = 35;
                this.desImg.top = 30;
                this.bgImage.width = 416;
                this.bgImage.height = 280;
                this.specialPanel();
            } else
            {
                this.numLabel.textColor = this.charLabel.textColor = ColorEnum.LaBa_Win_Com;
                this.desImg.source = SheetSubName.LaBa_Win;
                this.numGroup.bottom = 50;
                this.desImg.top = 36;
                this.bgImage.width = 338;
                this.bgImage.height = 208;
            }
            if (appendData.type == ShimTaeYoonResultType.ThreeSev || appendData.type == ShimTaeYoonResultType.ThreeBAR || appendData.type == ShimTaeYoonResultType.ThreeApple)
            {
                this.desImg.source = SheetSubName.LaBa_TopPrize;
                this.numGroup.bottom = 40;
                this.desImg.top = 40;
                this.bgImage.width = 500;
                this.bgImage.height = 234;
                this.specialPanel();
            }
            this.numLabel.text = appendData.gold.toString();
            this.charLabel.visible = true;
        } else
        {
            this._count = 0;
            this.desImg.source = SheetSubName.LaBa_Lost;
            this.desImg.top = 45;
            this.bgImage.width = 327;
            this.bgImage.height = 161;
            this.numLabel.text = "";
            this.charLabel.visible = false;
        }
        this.removeTweenEvents();
        this.createTween();
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
    }

    /**
     * 加大加特效
    */
    private specialPanel()
    {
        this.numLabel.textColor = this.charLabel.textColor = ColorEnum.LaBa_Win_Golden;
        this.showPoolDes();
    }
    /**
	 * 特效
	 */
    private _poolDesEffect: particle.GravityParticleSystem;
    /**
     * 显示特效
    */
    private showPoolDes()
    {
        egret.Tween.get(this.tweenGroup)
            .set({ scaleX: 0, scaleY: 0 })
            .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.backOut);
        AnimationFactory.getParticleEffect(AnimationType.HundredWarPoolDes, this.tweenGroup, (ptc) =>
        {
            this._poolDesEffect = ptc;
        });
    }
    private createTween()
    {
         this.removeTweenEvents();
         this.alpha = 1;
         egret.Tween.get(this).wait(2000).to({ alpha: 0 }, 500, egret.Ease.quadOut).call(this.onPlayOver, this);
    }
    private onPlayOver(thisObject: any)
    {
        this.onCloseBtnClickHandler(null);
    }
    private removeTweenEvents()
    {
        egret.Tween.removeTweens(this);
    }
}