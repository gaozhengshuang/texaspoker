/**
 * 比赛等待组
 */
class GamblingMatchWaitComponent extends BaseGamblingSlotComponent
{
	public waitHeadIcon: CircleHeadComponent;
	public waitNameLabel: eui.Label;
	public waitChipsLabel: eui.Label;
	public championshipWaitLabel: eui.Label;
	public mttNameLabel: eui.Label;
	public mttGroup: eui.Group;
	public sngGroup: eui.Group;
	public sngInfoLabel: eui.Label;

	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.touchEnabled = false;
		this.left = this.right = this.top = this.bottom = 0;

		this.mttGroup.visible = this.sngGroup.visible = false;
	}
	/**
	 * 刷新组显示
	 */
	public refreshGroup()
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
	public showSngInfo()
	{
		if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo))
		{
			let join: number = GamblingManager.matchRoomInfo.join;
			let leftJoin: number = GamblingManager.matchRoomInfo.definition.BNum - join;
			let text: string = game.StringUtil.format("<font size=30 color=0xffffff>已报名{0}人，还需</font><font color=0xf9cb55 size=42>{1}</font><font size=30 color=0xffffff>人即可开赛</font>", join, leftJoin);
			this.sngInfoLabel.textFlow = game.TextUtil.htmlParser.parser(text);
		}
	}
}