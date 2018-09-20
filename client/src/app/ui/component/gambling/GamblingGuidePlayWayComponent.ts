/**
 * 引导玩法组件
 */
class GamblingGuidePlayWayComponent extends BaseGamblingSlotComponent
{
	public guidePlayWayGroup: eui.Group;
	public guidePlayWayBg: eui.Image;
	public guidePlayWayFlopGroup: eui.Group;
	public guidePlayTurnLabel: eui.Label;
	public guidePlayRiverLabel: eui.Label;
	public guidePlayWayTipsPosGroup: eui.Group;
	public guidePlayWayTipsPosGroup0: eui.Group;
	public guidePlayWayTipsPosGroup1: eui.Group;
	
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.touchEnabled = false;
		this.left = this.right = this.top = this.bottom = 0;
	}
}