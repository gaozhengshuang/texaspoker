/**
 * 牌局信息刷新
 */
class GamblingPanelInfoRefreshSupport extends BaseGamblingPanelSupport
{
	public initialize()
	{
		super.initialize();
		if (GamblingManager.roomInfo)
		{
			this.refresh();
		}
	}
	public refresh()
	{
		this.target.roomIdLabel.text = PlayingFieldManager.roomIdAddZero(GamblingManager.roomInfo.id);

		// this.target.usualBlindGroup.visible = false;
		// this.target.anteGroup.visible = false;
		// this.target.championshipBlindGroup.visible = false;
		this.target.guessCorrectlyGroup.visible = false;

		switch (GamblingManager.roomInfo.gamblingType)
		{
			case GamblingType.Common:
				// this.target.usualBlindGroup.visible = true;
				break;
			case GamblingType.Match:
				// this.target.championshipBlindGroup.visible = true;
				// this.target.anteGroup.visible = true;
				break;
			case GamblingType.PlayFieldPersonal:
			case GamblingType.OmahaPersonal:
				break;
		}

		this.refreshBlindLabel();
		this.refreshPotLabel();
	}
	public onEnable()
	{
		super.onEnable();
		GamblingManager.PlayerStateChangeEvent.addListener(this.playerStateChangeHandler, this);
		GamblingManager.BlindChangeEvent.addListener(this.blindChangeHandler, this);
		GamblingManager.NextRoundStartEvent.addListener(this.onNextRoundStartEvent, this);
		GamblingManager.OnGetRoomUserInfoEvent.addListener(this.getRoomUserInfoHandler, this);
		GamblingManager.guessHandler.onGuessCorrectlyEvent.addListener(this.showGuessCorrectlyRemind, this);
	}
	public onDisable()
	{
		super.onDisable();
		GamblingManager.PlayerStateChangeEvent.removeListener(this.playerStateChangeHandler, this);
		GamblingManager.BlindChangeEvent.removeListener(this.blindChangeHandler, this);
		GamblingManager.NextRoundStartEvent.removeListener(this.onNextRoundStartEvent, this)
		GamblingManager.OnGetRoomUserInfoEvent.removeListener(this.getRoomUserInfoHandler, this);
		GamblingManager.guessHandler.onGuessCorrectlyEvent.removeListener(this.showGuessCorrectlyRemind, this);
		game.Tick.RemoveTimeoutInvoke(this.closeGuessCorrectlyRemind, this);
	}
	private playerStateChangeHandler()
	{
		this.refreshPotLabel();
	}
	private blindChangeHandler()
	{
		this.refreshBlindLabel();
	}
	private onNextRoundStartEvent()
	{
		this.refreshBlindLabel();
	}
	private getRoomUserInfoHandler(roleId: number)
	{
		let headComponent: GamblingHeadComponent = this.target.getHeadComponentByRole(roleId);
		if (headComponent)
		{
			headComponent.showHead();
		}
		else
		{
			game.Console.log("该玩家的头像组件未找到！" + roleId);
		}
	}
	private refreshPotLabel()
	{
		this.target.potLabel.text = game.MathUtil.formatNum(GamblingManager.showPotChips);
		// egret.callLater(this.refreshPotGroupPos, this);
	}
	private refreshPotGroupPos()
	{
		// this.target.potGroup.x = (this.target.potGroup.parent.width - this.target.potGroup.width) / 2;
	}
	private refreshBlindLabel()
	{
		this.target.usualblindLabel.text = game.MathUtil.formatNum(GamblingManager.roomInfo.sBlind) + "/" + game.MathUtil.formatNum(GamblingManager.roomInfo.bBlind);
		this.target.anteLabel.text = game.MathUtil.formatNum(GamblingManager.roomInfo.ante);
		// this.target.anteLabel.text = game.MathUtil.formatNum(100000);
		if (GamblingManager.roomInfo.ante > 0)
		// if (100000 > 0)
		{
			this.target.anteGroup.visible = true;

			egret.callLater(this.refreshPos, this, true);
		}
		else
		{

			egret.callLater(this.refreshPos, this, false);
			this.target.anteGroup.visible = false;
		}
	}
	/**
	 * 3个显示组的间距
	 */
	private readonly _gap1: number = 50;
	/**
	 * 2个显示组的间距
	 */
	private readonly _gap2: number = 80;
	private refreshPos(bool: boolean)
	{
		this.target.roomIdGroup.visible = true;
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.gamblingType == GamblingType.Match)
		{
			this.target.roomIdGroup.visible = false;
			if (bool)
			{
				let totalW: number = this.target.usualBlindGroup.width + this.target.anteGroup.width + this._gap2;
				let startPosX: number = (this.target.gameGroup.width - totalW) / 2;

				this.target.usualBlindGroup.x = startPosX;
				this.target.anteGroup.x = startPosX + this.target.usualBlindGroup.width + this._gap2;
			}
			else
			{
				let startPosX: number = (this.target.gameGroup.width - this.target.usualBlindGroup.width) / 2;
				this.target.usualBlindGroup.x = startPosX;
			}
		}
		else
		{

			if (bool)
			{
				let totalW: number = this.target.roomIdGroup.width + this.target.usualBlindGroup.width + this.target.anteGroup.width + this._gap1 * 2;
				let startPosX: number = (this.target.gameGroup.width - totalW) / 2;

				this.target.roomIdGroup.x = startPosX;
				this.target.usualBlindGroup.x = startPosX + this.target.roomIdGroup.width + this._gap1;
				this.target.anteGroup.x = this.target.usualBlindGroup.x + this.target.usualBlindGroup.width + this._gap1;
			}
			else
			{
				let totalW: number = this.target.roomIdGroup.width + this.target.usualBlindGroup.width + this._gap2;
				let startPosX: number = (this.target.gameGroup.width - totalW) / 2;

				this.target.roomIdGroup.x = startPosX;
				this.target.usualBlindGroup.x = startPosX + this.target.roomIdGroup.width + this._gap2;
			}
		}
	}
	/**
	 * 显示中奖提示
	*/
	private showGuessCorrectlyRemind()
	{
		this.target.guessCorrectlyGroup.visible = true;
		game.Tick.AddTimeoutInvoke(this.closeGuessCorrectlyRemind, 1500, this);
	}
	/**
	 * 关闭中奖提示
	*/
	private closeGuessCorrectlyRemind()
	{
		game.Tick.RemoveTimeoutInvoke(this.closeGuessCorrectlyRemind, this);
		this.target.guessCorrectlyGroup.visible = false;
	}
}