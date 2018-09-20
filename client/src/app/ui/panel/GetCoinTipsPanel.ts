/**
 * 获得金币面板
 */
class GetCoinTipsPanel extends BasePanel
{
	public coinGroup: eui.Group;
	public textLabel: eui.Label;
	/**
	 * 粒子系统
	 */
	private ptc: particle.GravityParticleSystem;
	public constructor()
	{
		super();
		this.layer = UILayerType.Tips;
		this.setTouchChildren(false);
		this.setTouchEnable(false);
		this.setSkinName(UIModuleName.GetCoinTipsPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		if (this.panelData)
		{
			this.textLabel.text = this.panelData;
			this.removeTweenEvents();
			this.creatCoinTween();
			if (this.ptc)
			{
				this.createTween();
			}
			SoundManager.playEffect(MusicAction.gold_fall);
		}
	}
	private creatCoinTween()
	{
		AnimationFactory.getParticleEffect(AnimationType.GetCoin, this, (ptc) =>
		{
			this.ptc = ptc;
			this.createTween();
		});
	}
	private createTween()
	{
		this.removeTweenEvents();
		this.alpha = 1;
		egret.Tween.get(this).wait(2100).to({ alpha: 1 }, 50, egret.Ease.quadOut).call(this.onPlayOver, this);
	}
	private onPlayOver(thisObject: any)
	{
		if (this.ptc)
		{
			this.ptc.stop();
			if (this.ptc.parent != null)
			{
				this.ptc.parent.removeChild(this.ptc);
			}
		}
		this.onCloseBtnClickHandler(null);
	}
	private removeTweenEvents()
	{
		egret.Tween.removeTweens(this);
	}
}