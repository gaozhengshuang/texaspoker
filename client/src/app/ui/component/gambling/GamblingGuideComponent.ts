/**
 * 牌局引导组件
 */
class GamblingGuideComponent extends BaseGamblingSlotComponent
{
	public guideTipsBar: eui.Group;
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.touchEnabled = false;
		this.left = this.right = this.top = this.bottom = 0;
	}
}