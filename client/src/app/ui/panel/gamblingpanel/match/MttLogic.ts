/**
 * 锦标赛逻辑
 */
class MttLogic
{
	private _context: GamblingPanel;
	private _endTime: number;
	private _roundOverData: any;
	private _newsLogic: MatchNewsLogic

	constructor(panel: GamblingPanel, news: MatchNewsLogic)
	{
		this._context = panel;
		this._newsLogic = news;
	}
	public initialize()
	{
		this._endTime = undefined;
		this._roundOverData = undefined;

		let state: GamblingPanelMatchState = this._context.panelState;
		let component: GamblingMatchComponent = state.getCompoent<GamblingMatchComponent>(GamblingMatchComponent);
		component.addonButton.visible = false;
		component.rebuyButton.visible = false;

		let leftTime: number = GamblingManager.matchRoomInfo.startTime + GamblingManager.matchRoomInfo.definition.delaySign - TimeManager.GetServerUtcTimestamp();
		if (leftTime > 0)
		{
			qin.Tick.AddTimeoutInvoke(this.delaySignOver, leftTime * 1000, this)
		}

		this.onRebuyORAddonEvent();
	}
	public onEnable()
	{
		GamblingManager.ChipsChangeEvent.addListener(this.onChipsChangeEvent, this);
		GamblingManager.RebuyORAddonEvent.addListener(this.onRebuyORAddonEvent, this);
		GamblingManager.RoundOverEvent.addListener(this.onRoundOverEvent, this);

		let state: GamblingPanelMatchState = this._context.panelState;
		let component: GamblingMatchComponent = state.getCompoent<GamblingMatchComponent>(GamblingMatchComponent);
		component.rebuyButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRebuyChips, this);
		component.addonButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddonChips, this);
	}
	public onDisable()
	{
		GamblingManager.ChipsChangeEvent.removeListener(this.onChipsChangeEvent, this);
		GamblingManager.RebuyORAddonEvent.removeListener(this.onRebuyORAddonEvent, this);
		GamblingManager.RoundOverEvent.removeListener(this.onRoundOverEvent, this);
		qin.Tick.RemoveTimeoutInvoke(this.delaySignOver, this)


		let state: GamblingPanelMatchState = this._context.panelState;
		let component: GamblingMatchComponent = state.getCompoent<GamblingMatchComponent>(GamblingMatchComponent);
		component.rebuyButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRebuyChips, this);
		component.addonButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddonChips, this);
	}
	/**
 	* 延迟报名结束
 	*/
	private delaySignOver()
	{
		if (GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.definition)
		{
			let leftTime: number = GamblingManager.matchRoomInfo.startTime + GamblingManager.matchRoomInfo.definition.delaySign - TimeManager.GetServerUtcTimestamp();
			if (leftTime <= 0)
			{
				if (GamblingManager.matchRoomInfo.leftJoin <= GamblingManager.matchRoomInfo.maxAwardRank)
				{
					//显示进入奖励圈面板
					this._newsLogic.showAlert(ChampionshipRoomUIAlertType.InAward);
				}
				if (InfoUtil.checkAvailable(GamblingManager.roomInfo))
				{
					if (GamblingManager.matchRoomInfo.leftJoin <= GamblingManager.roomInfo.definition.seat)
					{
						this._newsLogic.showAlert(ChampionshipRoomUIAlertType.InFinals);
					}
				}
			}
			else
			{
				if (leftTime < 0.1)
				{
					leftTime = 0.1;
				}
				qin.Tick.AddTimeoutInvoke(this.delaySignOver, leftTime * 1000, this)
			}
		}
	}
	private onChipsChangeEvent(info: PlayerInfo)
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.gamblingType == GamblingType.Match)
		{
			if (info && info.roleId == UserManager.userInfo.roleId)
			{
				this.onRebuyORAddonEvent();
			}
		}
	}
	public onRebuyORAddonEvent()
	{
		let state: GamblingPanelMatchState = this._context.panelState;
		let component: GamblingMatchComponent = state.getCompoent<GamblingMatchComponent>(GamblingMatchComponent);
		component.addonButton.visible = false;
		component.rebuyButton.visible = false;
		if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Rebuy, false))
		{
			component.rebuyButton.visible = true;
		}
		else if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Addon, false))
		{
			component.addonButton.visible = true;
		}
	}
	private onRebuyChips(event: egret.TouchEvent)
	{
		SoundManager.playEffect(MusicAction.buttonClick);
		if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Rebuy, true))
		{
			UIManager.showPanel(UIModuleName.ChampionshipBuyChipsPanel, { isRebuy: true });
		}
	}
	private onAddonChips(event: egret.TouchEvent)
	{
		SoundManager.playEffect(MusicAction.buttonClick);
		if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Addon, true))
		{
			UIManager.showPanel(UIModuleName.ChampionshipBuyChipsPanel, { isRebuy: false });
		}
	}
	private onRoundOverEvent(data: any)
	{
		this._roundOverData = data;
		if (GamblingUtil.isMtt) 
		{
			this._endTime = GamblingManager.roomInfo.endTime;
		}
	}
	/**
	 * 检测rebuy和addon
	 */
	public checkRebuyAddon()
	{
		if (GamblingUtil.isMtt) 
		{
			let pInfo: PlayerInfo = GamblingManager.getPlayerInfo(UserManager.userInfo.roleId);
			if (pInfo && this._roundOverData && this._roundOverData.initbankRoll)
			{
				//这里需要判断本局是否有重购/增购 未增加的筹码
				if ((pInfo.bankRoll <= 0 || !pInfo.bankRoll) && (!GamblingManager.roomInfo.addbuy || GamblingManager.roomInfo.addbuy <= 0))
				{
					this.checkRoundOver();
				}
			}
		}
	}
	private checkRoundOver()
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.gamblingType == GamblingType.Match)
		{
			let pInfo: PlayerInfo = GamblingManager.getPlayerInfo(UserManager.userInfo.roleId);
			//这里需要判断本局是否有重购/增购 未增加的筹码
			if (pInfo && (pInfo.bankRoll <= 0 || !pInfo.bankRoll) && (!GamblingManager.roomInfo.addbuy || GamblingManager.roomInfo.addbuy <= 0))
			{
				if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Rebuy, false))
				{
					UIManager.showPanel(UIModuleName.ChampionshipBuyChipsPanel, { isRebuy: true, isOver: true, endTime: this._endTime });
				}
				else if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Addon, false))
				{
					UIManager.showPanel(UIModuleName.ChampionshipBuyChipsPanel, { isRebuy: false, isOver: true, endTime: this._endTime });
				}
			}
		}
	}
}