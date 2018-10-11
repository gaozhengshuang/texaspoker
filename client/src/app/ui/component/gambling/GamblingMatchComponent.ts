/**
 * 牌局比赛组件
 */
class GamblingMatchComponent extends BaseGamblingSlotComponent
{
	public championshipGroup: eui.Group;

	public championshipInfoBg: eui.Image;
	public rankLabel: eui.Label;
	public avgChipsLabel: eui.Label;
	public blindAddNameLabel: eui.Label;
	public blindAddTimeLabel: eui.Label;
	public rebuyButton: eui.Button;
	public addonButton: eui.Button;
	public mttNameLabel: eui.Label;
	public mttGroup: eui.Group;

	public sngGroup: eui.Group;
	public sngCountDownGroup: eui.Group;
	public sngCountDownLabel: eui.Label;

	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.touchEnabled = false;
		this.championshipGroup.touchEnabled = false;
		this.left = this.right = this.top = this.bottom = 0;
		this.sngCountDownGroup.visible = this.mttGroup.visible = this.sngGroup.visible = false; //
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		GamblingManager.SngReadyCountDownEvent.addListener(this.showSngCdInfo, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		GamblingManager.SngReadyCountDownEvent.removeListener(this.showSngCdInfo, this);
	}
	public refresh()
	{
		this.mttGroup.visible = this.sngGroup.visible = false;
		if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo))
		{
			switch (GamblingManager.matchRoomInfo.definition.Type)
			{
				case MatchType.MTT:
					this.mttGroup.visible = true;
					break;
				case MatchType.SNG:
					this.sngGroup.visible = true;
					break;
			}
		}
	}
	/**
	 * 显示坐满即玩信息
	 */
	public showSngCdInfo()
	{
		let str: string = game.StringConstants.Empty;
		if (GamblingManager.sngReadyCountDownTime <= 0)
		{
			this.sngCountDownGroup.visible = false;
			str = "0";
		}
		else
		{
			this.sngCountDownGroup.visible = true;
			str = game.DateTimeUtil.formatCountdown(GamblingManager.sngReadyCountDownTime);
		}
		this.sngCountDownLabel.text = game.StringUtil.format("（{0}）", str);
	}
}