/**
 * 新手引导支持
 */
class GamblingPanelGuideSupport extends BaseGamblingPanelSupport
{
	private _animation: AlphaChangeAnimation;
	public initialize()
	{
		super.initialize();
		this._animation = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.Alpha);
		let state: GamblingPanelGuideState = this.target.panelState;

		let component:GamblingGuideComponent = state.getCompoent<GamblingGuideComponent>(GamblingGuideComponent);
		this._animation.target = component.guideTipsBar;
		this._animation.run(0, 1, 500, 1000, this.disapear, this);
	}
	private disapear()
	{
		this._animation.run(1, 0, 2000, 1000, this.disapearOver, this)
	}
	private disapearOver()
	{
		this.clear();
	}
	public onEnable()
	{
		super.onEnable();
	}
	public onDisable()
	{
		super.onDisable();
		this.clear();
	}
	public clear()
	{
		super.clear();
		this._animation.clear();
		this._animation.target = null;
		this._animation = null;
	}
}