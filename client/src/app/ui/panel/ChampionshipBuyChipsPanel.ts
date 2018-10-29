/**
 * 重购/增购面板
 */
class ChampionshipBuyChipsPanel extends BasePanel
{
	public buyBtn: eui.Button;
	public outButton: eui.Button;
	public desLabel: eui.Label;
	public timesLabel: eui.Label;
	public rebuyGroup: eui.Group;
	public addonGroup: eui.Group;
	private _text: string;
	private _blindLevel: number;
	private _starTime: number;
	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.ChampionshipBuyChipsPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		this.isCloseButtonTween = false;
		super.onAwake(event);
		this.maskAlpha = 0;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		if (GamblingManager.roomInfo)
		{
			if (appendData && appendData.endTime)
			{
				this._starTime = ProjectDefined.MTTBuyTimeoutClient + appendData.endTime;
			}
			else
			{
				this._starTime = ProjectDefined.MTTBuyTimeoutClient + GamblingManager.roomInfo.endTime;
			}
		}
		this.setInfoUI();
	}
	private setInfoUI()
	{
		if (GamblingManager.roomInfo)
		{
			this._blindLevel = GamblingManager.roomInfo.nowBlindLevel;
		}
		if (GamblingManager.matchRoomInfo && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.matchRoomInfo.definition)
		{
			if (this.panelData && this.panelData.isRebuy)
			{
				this.timesLabel.text = game.StringUtil.format("剩余买入比赛次数:{0}", GamblingManager.matchRoomInfo.definition.Rebuy - GamblingManager.roomInfo.rebuyTimes);
				this.rebuyGroup.visible = true;
				this.addonGroup.visible = false;
				if (this.panelData.isOver)
				{
					this.desLabel.text = game.StringUtil.format("比赛筹码输光了,是否花费{0}金币重新购买{1}比赛筹码?",
						GamblingManager.matchRoomInfo.definition.RebuyCost, GamblingManager.matchRoomInfo.definition.InitialChips)
					this._text = this.desLabel.text;
					this.showDownCount();
					return;
				}
				this.desLabel.text = game.StringUtil.format("是否花费{0}金币重新购买{1}比赛筹码?",
					GamblingManager.matchRoomInfo.definition.RebuyCost, GamblingManager.matchRoomInfo.definition.InitialChips)
			}
			else
			{
				this.timesLabel.text = game.StringUtil.format("剩余买入比赛次数:{0}", GamblingManager.matchRoomInfo.definition.Addon - GamblingManager.roomInfo.addonTimes);
				this.rebuyGroup.visible = false;
				this.addonGroup.visible = true;
				if (this.panelData && this.panelData.isOver)
				{
					this.desLabel.text = game.StringUtil.format("比赛筹码输光了,是否花费{0}金币重新购买{1}比赛筹码?",
						GamblingManager.matchRoomInfo.definition.AddonCost, GamblingManager.matchRoomInfo.definition.AddonChips)
					this._text = this.desLabel.text;
					this.showDownCount();
					return;
				}
				this.desLabel.text = game.StringUtil.format("是否花费{0}金币增购{1}比赛筹码?",
					GamblingManager.matchRoomInfo.definition.AddonCost, GamblingManager.matchRoomInfo.definition.AddonChips)
			}
		}
	}
	private showDownCount()
	{
		if (GamblingManager.roomInfo)
		{
			let time: number = Math.floor(this._starTime - TimeManager.GetServerUtcSecondstamp());
			game.Tick.AddSecondsInvoke(this.refreshTime, this);
			if (time <= 0)
			{
				time = 0;
			}
			this.desLabel.text = this._text + game.StringUtil.format("({0})", time);
		}
	}
	private refreshTime()
	{
		let time: number = Math.floor(this._starTime - TimeManager.GetServerUtcSecondstamp());
		if (time <= 0)
		{
			this.onCloseBtnClickHandler(null);
			this.outChampionship();
			return;
		}
		this.desLabel.text = this._text + game.StringUtil.format("({0})", time);
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isMatchOut)
		{
			AlertManager.showAlert("比赛已结束");
			this.onCloseBtnClickHandler(null);
		}
	}
	private buyBtnClick(event: egret.TouchEvent)
	{
		SoundManager.playEffect(MusicAction.buttonClick);
		if (this.panelData && this.panelData.isRebuy)
		{
			if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Rebuy, true))
			{
				if (CostManager.verifyGold(game.longToNumber(GamblingManager.matchRoomInfo.definition.RebuyCost), true))
				{
					GamblingManager.championshipHandler.reqAddShip(ChampionshipBuyType.Rebuy)
				}
			}
			else
			{
				this.outChampionship();
				this.onCloseBtnClickHandler(null);
			}
		}
		else
		{
			if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Addon, true))
			{
				if (CostManager.verifyGold(game.longToNumber(GamblingManager.matchRoomInfo.definition.AddonCost), true))
				{
					GamblingManager.championshipHandler.reqAddShip(ChampionshipBuyType.Addon)
				}
			}
			else
			{
				this.outChampionship();
				this.onCloseBtnClickHandler(null);
			}
		}
	}
	private onRebuyORAddonEvent(data: any)
	{
		if (data && data.isSuccess)
		{
			this.onCloseBtnClickHandler(null);
		}
		else 
		{
			if (this.panelData && this.panelData.isOver)
			{
				this.showDownCount();
			}
			else
			{
				this.onCloseBtnClickHandler(null);
			}

		}
	}
	private outChampionship()
	{
		if (this.panelData && this.panelData.isOver)
		{
			GamblingManager.championshipHandler.reqAddShip(ChampionshipBuyType.Out)
		}
	}
	private onNextRoundStartEvent()
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && this._blindLevel != GamblingManager.roomInfo.nowBlindLevel)
		{
			this._blindLevel = GamblingManager.roomInfo.nowBlindLevel;
			let canRebuy: boolean = GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Rebuy, false);
			let canAddon: boolean = GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Addon, false)
			if (this.panelData && this.panelData.isRebuy && !canRebuy && canAddon)
			{
				this.panelData.isRebuy = false;
				this.setInfoUI();
			}
			else if (canRebuy && !canAddon)
			{
				if (this.panelData)
				{
					this.panelData.isRebuy = true;
				}
				else
				{
					this.panelData = { isRebuy: true };
				}
				this.setInfoUI();
			}
			else if (this.panelData && this.panelData.isOver && !canRebuy && !canAddon)
			{
				AlertManager.showAlert("重购/增加购阶段已结束");
				this.outChampionship();
				this.onCloseBtnClickHandler(null);
			}
		}
	}
	private outBtnClick(event: egret.TouchEvent)
	{
		this.outChampionship();
		this.onCloseBtnClickHandler(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyBtnClick, this);
		this.outButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.outBtnClick, this);
		GamblingManager.RebuyORAddonEvent.addListener(this.onRebuyORAddonEvent, this);
		GamblingManager.NextRoundStartEvent.addListener(this.onNextRoundStartEvent, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buyBtnClick, this);
		this.outButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.outBtnClick, this);
		GamblingManager.RebuyORAddonEvent.removeListener(this.onRebuyORAddonEvent, this);
		GamblingManager.NextRoundStartEvent.removeListener(this.onNextRoundStartEvent, this);
		game.Tick.RemoveSecondsInvoke(this.refreshTime, this);
	}
}