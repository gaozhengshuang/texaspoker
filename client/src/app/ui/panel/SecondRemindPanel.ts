/**
 * 比赛20秒开始提醒面板
 */
class SecondRemindPanel extends BasePanel
{
	/**
	 * 描述信息
	*/
	public desLabel: eui.Label;
	/**
	 * 立即进入按钮
	*/
	public enterBtn: eui.Label;

	private recordId: number;
	private countDownNum: number;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.SecondRemindPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		if (appendData)
		{
			this.countDownNum = appendData.countDownNum;
			this.recordId = appendData.recordId;
			this.desLabel.text = "您报名的比赛将于" + game.DateTimeUtil.countDownFormat(this.countDownNum, false) + "秒后开始，是否立即进入比赛？";
			game.Tick.AddSecondsInvoke(this.countDown, this);
		}
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMatch, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMatch, this);
		game.Tick.RemoveSecondsInvoke(this.countDown, this);
	}

	protected onCloseBtnClickHandler(event: egret.TouchEvent): void
	{
		ChampionshipManager.mttRemindStartHandler.remindWaitMTT();
		super.onCloseBtnClickHandler(event);
	}
	/**
	 * 立即进入
	*/
	private enterMatch(event: egret.TouchEvent)
	{
		SoundManager.playButtonEffect(event.target);
		let info: MatchRoomInfo = ChampionshipManager.getMathInfoByRecordId(this.recordId);
		if (info)
		{
			ChampionshipManager.enterMttHandler.enterMatch(info, UIModuleName.SecondRemindPanel);
		}
	}
	/**
	 * 倒计时
	*/
	private countDown()
	{
		this.countDownNum--;
		this.desLabel.text = "您报名的比赛将于" + game.DateTimeUtil.countDownFormat(this.countDownNum, false) + "秒后开始，是否立即进入比赛？";
		if (this.countDownNum <= 0)
		{
			this.desLabel.text = "比赛即将开始";
			game.Tick.RemoveSecondsInvoke(this.countDown, this);
			this.onCloseBtnClickHandler(null);
		}
	}
}