/**
 * 行为操作支持 仅自己
 */
class GamblingPanelActionSupport extends BaseGamblingPanelSupport
{
	// private _panelShowStateList: game.Dictionary<string, boolean> = new game.Dictionary<string, boolean>();
	private _excludePanel: Array<string> = [UIModuleName.GamblingPanel, UIModuleName.MarqueePanel, UIModuleName.AlertInfoPanel, UIModuleName.ChatPanel, UIModuleName.GuideChoosePanel, UIModuleName.GuideAnswerErrorPanel, UIModuleName.GuideQuestionPanel];

	private _numContentInfo: NumContentInfo;

	private _toNum: number;
	/**
	 * 公共牌发牌完毕
	 */
	private _isBoardCardOver: boolean;

	private _isTimeOut: boolean;

	public initialize()
	{
		super.initialize();
		this._isBoardCardOver = true;
		this._isTimeOut = false;
		this.target.cancelTrusteeshipButton0.visible = this.target.cancelTrusteeshipButton.visible = false;
		this.clearPanelState();
		this.target.waitNextImg.visible = false;
		if (GamblingManager.self)
		{
			this.target.actionGroup.brightCardBtn.visible = false;
			this.target.actionGroup.immediatelyBrightCardBtn.visible = false;
			if (GamblingManager.self.state == PlayerState.WaitNext)
			{
				this.target.waitNextImg.visible = true;
			}
			this.changeState(GamblingManager.self.state, false);
			this.tryShowPreActionGroup(false);
		}
		this.refreshStiDownState();
		this.actionPosChangeHandler(true); //顺序不能倒过来
		if (!this._numContentInfo)
		{
			this._numContentInfo = new NumContentInfo();
		}
		this._numContentInfo.gap = 0;
		this._numContentInfo.limtiWidth = 80;
		this._numContentInfo.setImgWidHei(10, 15, 5, 13);
		this._numContentInfo.preFix = ResPrefixName.CountDown_Num;
		let time: number = GamblingManager.timeAwardHandler.time;
		if (time == undefined)
		{
			time = 0;
		}
		this._numContentInfo.content = game.DateTimeUtil.countDownFormat(time, false)
		this.target.onlineAwardBtn["numComponent"].init(this._numContentInfo);
	}
	public onEnable()
	{
		super.onEnable();
		GamblingManager.SitOrStandEvent.addListener(this.sitOrStandHandler, this);
		GamblingManager.PlayerStateChangeEvent.addListener(this.playerStateChangeHandler, this);
		GamblingManager.ActionPosChangeEvent.addListener(this.actionPosChangeHandler, this);
		GamblingManager.OneLoopOverEvent.addListener(this.boardCardChangeHandler, this);
		GamblingManager.RoundOverEvent.addListener(this.roundOverHandler, this);
		GamblingManager.timeAwardHandler.TimeAwardCountDownEvent.addListener(this.refreshTimeAwardTime, this);
		GamblingManager.timeAwardHandler.GetTimeAwardInfoEvent.addListener(this.setNextTimeAwardInfo, this);
		GamblingManager.InTrusteeshipEvent.addListener(this.onInTrusteeshipEvent, this);
		GamblingManager.ActionOverEvent.addListener(this.onActionOverEvent, this);
		GamblingManager.TimeOutEvent.addListener(this.actionTimeOut, this);
		GamblingManager.FlopCardOverEvent.addListener(this.flopCardOverHandler, this);

		UIManager.onPanelCloseEvent.addListener(this.onPanelCloseHandler, this);
		UIManager.onPanelOpenEvent.addListener(this.onPanelOpenHandler, this);
		this.target.cancelTrusteeshipButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelTrusteeship, this);
		GamblingManager.timeAwardHandler.TimeAwardInfoEvent.addListener(this.setTimeAwardTime, this);
	}
	public onDisable()
	{
		super.onDisable();
		GamblingManager.SitOrStandEvent.removeListener(this.sitOrStandHandler, this);
		GamblingManager.PlayerStateChangeEvent.removeListener(this.playerStateChangeHandler, this);
		GamblingManager.ActionPosChangeEvent.removeListener(this.actionPosChangeHandler, this);
		GamblingManager.OneLoopOverEvent.removeListener(this.boardCardChangeHandler, this);
		GamblingManager.RoundOverEvent.removeListener(this.roundOverHandler, this);
		GamblingManager.timeAwardHandler.TimeAwardCountDownEvent.removeListener(this.refreshTimeAwardTime, this);
		GamblingManager.timeAwardHandler.GetTimeAwardInfoEvent.removeListener(this.setNextTimeAwardInfo, this);
		GamblingManager.InTrusteeshipEvent.removeListener(this.onInTrusteeshipEvent, this);
		GamblingManager.ActionOverEvent.removeListener(this.onActionOverEvent, this);
		GamblingManager.TimeOutEvent.removeListener(this.actionTimeOut, this);
		GamblingManager.FlopCardOverEvent.addListener(this.flopCardOverHandler, this);

		UIManager.onPanelCloseEvent.removeListener(this.onPanelCloseHandler, this);
		UIManager.onPanelOpenEvent.removeListener(this.onPanelOpenHandler, this);

		this.target.cancelTrusteeshipButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelTrusteeship, this);
		GamblingManager.timeAwardHandler.TimeAwardInfoEvent.removeListener(this.setTimeAwardTime, this);

		// let panels: Array<string> = UIManager.panelDict.getKeys();
		// for (let panel of panels)
		// {
		// 	UIManager.showPanelByVisible(panel, true);
		// }
	}
	private setTimeAwardTime()
	{
		this._numContentInfo.content = game.DateTimeUtil.countDownFormat(GamblingManager.timeAwardHandler.time, false)
		this.target.onlineAwardBtn["numComponent"].init(this._numContentInfo);
	}
	private onCancelTrusteeship(event: egret.TouchEvent)
	{
		GamblingManager.cancelTrusteeship();
	}
	private onActionOverEvent(state: PlayerState)
	{
		// this.target.actionGroup.visible = true;
		// this.target.actionGroup.showActionGroup(false);

		this.target.cancelTrusteeshipButton0.visible = this.target.cancelTrusteeshipButton.visible = false;
		if (state == PlayerState.Trusteeship)
		{
			if (GamblingManager.isOnRoundOverIng)
			{
				this.tryShowImmediatelyBrightBtn();
			}
			else
			{
				this.tryShowAction();
				this.tryShowFoldGroup();
			}
		}
	}
	private onInTrusteeshipEvent()
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isTrusteeship)
		{
			// this.target.actionGroup.visible = false;
			this.target.actionGroup.showActionGroup(false);

			this.target.cancelTrusteeshipButton0.visible = this.target.cancelTrusteeshipButton.visible = true;
		}
	}
	private playerStateChangeHandler(obj: any)
	{
		let pInfo: PlayerInfo = GamblingManager.getPlayerInfo(obj.roleId);
		if (pInfo)
		{
			//game.QinLog.log("状态变更：" + pInfo.userInfo.name + PlayerInfo.getStateDes(pInfo.state) + pInfo.state);
			let headComponent: GamblingHeadComponent = this.target.getHeadComponent(pInfo.pos);
			if (headComponent)
			{
				if (pInfo.state == PlayerState.Blind || pInfo.state == PlayerState.Call
					|| pInfo.state == PlayerState.Raise || pInfo.state == PlayerState.AllIn)
				{
					if (pInfo.state == PlayerState.AllIn)
					{
						SoundManager.playEffect(MusicAction.bet_allin);
					}
					else if (pInfo.state == PlayerState.Blind)
					{
						SoundManager.playEffect(MusicAction.blind);
					}
					else
					{
						SoundManager.playEffect(MusicAction.bet_no_allin);
					}
				}
				if (pInfo.state != PlayerState.Fold && pInfo.state != PlayerState.WaitNext && pInfo.state != PlayerState.Check)
				{//&& pInfo.state != PlayerState.WaitAction 等待状态显示前注
					if (pInfo.state == PlayerState.WaitAction)
					{
						if (GamblingManager.roomInfo.ante > 0)
						{
							headComponent.showChipsComponent(pInfo.num, true);
						}
					}
					else
					{
						headComponent.showChipsComponent(pInfo.num, true);
					}
				}
				headComponent.changeState();
				let sex: number = Sex.Unknown;
				if (pInfo.userInfo)
				{
					sex = pInfo.userInfo.sex;
				}
				if (pInfo.state == PlayerState.Fold) //执行弃牌动画
				{
					GamblingPanelSetting.FoldPosPoint.x = this.target.foldPointImg.x;
					GamblingPanelSetting.FoldPosPoint.y = this.target.foldPointImg.y;

					headComponent.runFoldAnim(GamblingPanelSetting.FoldPosPoint);
					SoundManager.playEffect(MusicAction.fold, sex);
					SoundManager.playEffect(MusicAction.foldpai);
				}
				else if (pInfo.state == PlayerState.AllIn)
				{
					SoundManager.playEffect(MusicAction.allin, sex);;
				}
				else if (pInfo.state == PlayerState.Call) //跟注
				{
					SoundManager.playEffect(MusicAction.call, sex);
				}
				else if (pInfo.state == PlayerState.Check) //过牌
				{
					SoundManager.playEffect(MusicAction.check, sex);
				}
				else if (pInfo.state == PlayerState.Raise) //加注
				{
					SoundManager.playEffect(MusicAction.raise, sex);
				}
			}
		}
		if (obj.roleId == UserManager.userInfo.roleId)
		{
			if (obj.state == PlayerState.WaitNext)
			{
				this.target.waitNextImg.visible = true;
			}
			else
			{
				this.target.waitNextImg.visible = false;
			}
			if (obj.state == PlayerState.AllIn)
			{
				this.target.allinAnime.playAllinAnime();
			}
			this.changeState(GamblingManager.getPlayerStateByRoleId(obj.roleId));
		} else
		{
			if ((obj.state == PlayerState.Raise || obj.state == PlayerState.AllIn) && GamblingUtil.isOnProcess(GamblingManager.self)) //move todo 暂时还有问题在allin的时候
			{
				if (this.target.actionGroup.preActionGroup.visible)
				{
					if (this.target.actionGroup.preCallBtn.selected)
					{
						GamblingManager.isCallAny = !GamblingManager.isCallAny;
						this.target.actionGroup.preCallBtn.selected = GamblingManager.isCallAny;
					} else if (this.target.actionGroup.autoCheckBtn.selected)
					{
						GamblingManager.isCallAny = !GamblingManager.isCallAny;
						this.target.actionGroup.autoCheckBtn.selected = GamblingManager.isCallAny;
					}
				}
				else
				{
					this.target.actionGroup.checkOrDropBtn.selected = false;
					this.target.actionGroup.callAnyBtn.selected = false;
					this.target.actionGroup.preCallBtn.selected = false;
					this.target.actionGroup.autoCheckBtn.selected = false;
					this.tryShowPreActionGroup(true);
				}
			}
		}
	}

	/**
	 * 公共牌翻牌动画结束
	 */
	public setBoardCardOverFlag(obj: any)
	{
		this._isBoardCardOver = obj.isBoardOver;
		if (this._isBoardCardOver && !obj.isRoundOver)
		{
			this.actionPosChangeHandler();
			//公共牌翻牌结束 显示预处理按钮 自己在行牌中，且非自己说话
			if (GamblingManager.self && GamblingUtil.isOnProcess(GamblingManager.self) && GamblingManager.roomInfo && GamblingManager.roomInfo.pos != GamblingManager.self.pos)
			{
				if (GamblingManager.self.state != PlayerState.AllIn)
				{
					this.tryShowPreActionGroup(true, true);
				}
			}
		}
	}
	/**
	 * 位置变更
	 */
	private actionPosChangeHandler(isInit?: boolean)
	{
		if (GamblingManager.roomInfo)
		{
			//初始化||发牌完毕||非枪口位说话||有公共牌发出----->都说明可以操作
			let isCanOpera: boolean;
			isCanOpera = isInit === true || GamblingManager.roomInfo.isFlopCardOver || GamblingManager.roomInfo.pos != GamblingUtil.utgPos || (GamblingManager.roomInfo.publicCard && GamblingManager.roomInfo.publicCard.length > 0)
			if (this._isBoardCardOver && isCanOpera)
			{
				this.showPanelState();
				let headComponent: GamblingHeadComponent = this.target.getHeadComponent(GamblingManager.roomInfo.pos);
				if (headComponent)
				{
					headComponent.changeState(GamblingHeadStateType.OnAction, true);
				}
				if (GamblingManager.self && GamblingManager.roomInfo.pos == GamblingManager.self.pos)
				{
					this._isTimeOut = false;
					SoundManager.playEffect(MusicAction.on_turn);
					this.target.actionGroup.showPreActionGroup(false);

					if (GamblingManager.isCheckOrFold) //过或弃
					{
						if (GamblingUtil.isCanCheck) 
						{
							GamblingManager.reqAction(PlayerState.Check);
						}
						else
						{
							GamblingManager.reqAction(PlayerState.Fold);
						}
					}
					else if (GamblingManager.isCallAny) //跟任何
					{
						GamblingManager.doDefaultAction();
					}
					else
					{
						if (GamblingManager.roomInfo.definition.Pattern != GamblingPattern.AllIn)
						{
							// this.target.actionGroup.raiseGroup.visible = true;
							// this.target.actionGroup.actionGroup.visible = true;

							this.target.actionGroup.showActionGroup(true);
							this.target.actionGroup.showRaiseGroup(true);


							// this.target.actionGroup.raiseBtn.visible = true;
						}
						else
						{
							this.target.actionGroup.showActionGroup(true);
							this.target.actionGroup.raiseBtn.visible = false;
							// this.target.actionGroup.actionGroup.visible = true;
						}
						this.showCallCheckBtn();
					}
				}
				else
				{
					this.timeOutCloseAddchipsPanel();
					this.tryShowPreActionGroup(true); //位置变更
				}
			}
		}
	}
	private showCallCheckBtn()
	{
		this.target.actionGroup.checkBtn.visible = false;
		this.target.actionGroup.callBtn.visible = false;
		if (GamblingUtil.isCanCheck) //是否过牌
		{
			this.target.actionGroup.checkBtn.visible = true;
			// this.target.actionGroup.runActionChild(this.target.actionGroup.checkBtn, true);
		}
		else if (GamblingUtil.isNeedAllIn) //是否需要allin
		{
			this.target.actionGroup.callBtn.visible = true;
			// this.target.actionGroup.runActionChild(this.target.actionGroup.callBtn, true);
			this.target.actionGroup.raiseGroup.visible = false;

			this.target.actionGroup.raiseBtn.visible = false;
			this.target.actionGroup.callBtn.label = game.MathUtil.formatNum(GamblingManager.self.bankRoll);
			//this.target.actionGroup.callBtn["callLabel"].text = "全下";
		}
		else if (GamblingUtil.callNum > 0) //需要跟注
		{
			this.target.actionGroup.callBtn.visible = true;
			this.target.actionGroup.callBtn.label = game.MathUtil.formatNum(GamblingUtil.callNum);
			//this.target.actionGroup.callBtn["callLabel"].text = "跟注";
		}
	}
	/**
	 * 坐下站起处理
	 */
	private sitOrStandHandler(obj: any)
	{
		this.target.hideDownEffect();
		let pInfo: PlayerInfo = obj.pInfo;
		if (pInfo.roleId == UserManager.userInfo.roleId)
		{
			if (obj.state == BuyInGameState.Stand)
			{
				this.target.actionGroup.showBrightButton(false);
				this.target.actionGroup.showImmediatelyBrightCardBtn(false);
				this.target.actionGroup.hideAll(true);
				this.target.actionGroup.hidePreActionGroup(true);
				this.target.cardTypeGroup.visible = false;
				if (GamblingUtil.isOmaha)
				{
					this.target.cardTypeComp.init(CardType.None);
				}
				for (let pitInfo of this.target.pitList)
				{
					pitInfo.index = pitInfo.headComponent.posIndex;
				}
				this.target.setPit();
				this.target.waitNextRoundComponent.show(false);
				this.target.waitNextImg.visible = false;
			}
			else
			{
				this.target.initActionGroup();
				if (pInfo.state == PlayerState.WaitNext)
				{
					this.target.waitNextImg.visible = true;
				}
			}
		}
		let headComponent: GamblingHeadComponent = this.target.getHeadComponent(pInfo.pos);
		if (headComponent)
		{
			if (obj.state == BuyInGameState.Sit)
			{
				headComponent.sitDownInit(pInfo); //因为等待下一局的状态切换问题
				headComponent.changeState(GamblingHeadStateType.SitDown);
				SoundManager.playEffect(MusicAction.sit);
			}
			else if (obj.state == BuyInGameState.Stand)
			{
				headComponent.init(null);
				headComponent.changeState(GamblingHeadStateType.Empty);
				SoundManager.playEffect(MusicAction.sit_out);
			}
		}
		this.refreshStiDownState();
	}
	/**
	 * 刷新坐下邀请状态
	 */
	private refreshStiDownState()
	{
		for (let pitInfo of this.target.pitList)
		{
			pitInfo.headComponent.canSitDownLabel.visible = false;
			pitInfo.headComponent.inviteImg.visible = false;
			if (GamblingManager.self)
			{
				pitInfo.headComponent.inviteImg.visible = true;
			}
			else
			{
				pitInfo.headComponent.canSitDownLabel.visible = true;
			}
		}
	}

	/**
	 * 结算信息 切换到比牌状态
 	 */
	private roundOverHandler()
	{
		// this.target.actionGroup.brightCardBtn.visible = false;
		let card: CardFaceComponent;
		for (card of this.target.cardList)
		{
			card.showMaxFlag(false);
		}
		if (GamblingUtil.isOmaha && GamblingManager.self)  //奥马哈 
		{
			let headComponent: GamblingHeadComponent = this.target.getHeadComponent(GamblingManager.self.pos)
			if (headComponent)
			{
				for (let j: number = 1; j <= GamblingManager.OmahaHandCardNum; j++)
				{
					let cardCom: CardFaceComponent = headComponent['cardFace' + j];
					if (cardCom)
					{
						cardCom.showMaxFlag(false);
					}
				}
			}
		}
		for (let pitInfo of this.target.pitList)
		{
			pitInfo.headComponent.hideCdComponent(); //结算隐藏CD
			// pitInfo.headComponent.showChipsComponent();
			// pitInfo.headComponent.roundOverHandler();
		}
		this.timeOutCloseAddchipsPanel();
		if (GamblingManager.self)
		{
			this.target.actionGroup.showBrightButton(false);
			this.tryShowImmediatelyBrightBtn();
			this.target.actionGroup.hideAll(true);
			this.target.actionGroup.hidePreActionGroup(true);
			this.clearPanelState();
		}
	}
	/**
	 * 显示立即亮牌
	 */
	private tryShowImmediatelyBrightBtn()
	{
		if (!GamblingManager.roomInfo.isShowCard)
		{
			let isThanCard: boolean = false;
			if (GamblingManager.roundOverInfo && GamblingManager.roundOverInfo.handCardList && GamblingManager.roundOverInfo.potList) //看看是否切换到亮牌状态
			{
				let len: number = GamblingManager.roundOverInfo.handCardList.length;
				let handCardInfo: HandCardInfo;
				for (let i: number = 0; i < len; i++)
				{
					handCardInfo = GamblingManager.roundOverInfo.handCardList[i];
					if (GamblingManager.self.roleId == handCardInfo.roleId && handCardInfo.cardList && handCardInfo.cardList.length > 1)
					{
						if (GamblingManager.self.state != PlayerState.Fold)
						{
							if (GamblingManager.self.roleId == UserManager.userInfo.roleId)
							{
								isThanCard = true;
								break; //参与了比牌，不显示点击亮牌
							}
						}
					}
				}
			}
			let isWaitNext: boolean = GamblingManager.self && GamblingManager.self.state == PlayerState.WaitNext;
			if (!isThanCard && !isWaitNext)
			{
				this.target.actionGroup.showImmediatelyBrightCardBtn(true);
			}
		}
	}
	/**
  	* 公共牌推送 下一轮开始
 	 */
	private boardCardChangeHandler()
	{
		// for (let pitInfo of this.target.pitList)
		// {
		// 	pitInfo.headComponent.showChipsComponent();
		// 	pitInfo.headComponent.changeState();
		// }
		this.timeOutCloseAddchipsPanel();
	}
	/**
	 * 状态变更
	 */
	private changeState(state: PlayerState, isTween: boolean = true)
	{
		switch (state)
		{
			case PlayerState.Blind:
				break;
			case PlayerState.Empty:
			case PlayerState.WaitNext:
			case PlayerState.Check:
			case PlayerState.Raise:
			case PlayerState.AllIn:
			case PlayerState.Call:
			case PlayerState.WaitAction:
				this.target.actionGroupHideAll(isTween);
				break;
			case PlayerState.Fold: //弃牌
				this.tryShowFoldGroup();
				break;
		}
	}
	/**
	 * 显示面板状态
	 */
	private showPanelState()
	{
		let isTrusteeship: boolean = false;
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isTrusteeship)
		{
			isTrusteeship = true;
		}
		if (GamblingUtil.getIsOnAction(GamblingManager.self) && !isTrusteeship)
		{
			let panels: Array<string> = UIManager.panelDict.getKeys();
			let state: boolean;
			for (let panel of panels)
			{
				state = UIManager.isShowPanel(panel);
				if (this._excludePanel.indexOf(panel) == -1 && state)
				{
					// this._panelShowStateList.add(panel, state);
					UIManager.closePanel(panel);
					// UIManager.showPanelByVisible(panel, false);
				}
			}
			this._toNum = this.target.gameGroup.x;
			if (this._toNum > 0)
			{
				this.target.gameGroupMove();
			}
		}
		else
		{
			this.clearPanelState();
		}
	}
	/**
	 * 清除面板显示状态
	 */
	private clearPanelState()
	{
		// if (this._panelShowStateList.count > 0)
		// {
		// let panels: Array<string> = this._panelShowStateList.getKeys();
		// for (let panel of panels) //切换状态则显示之前关闭的面板
		// {
		// 	UIManager.showPanelByVisible(panel, true);
		// }
		// this._panelShowStateList.clear();
		if (this._toNum > 0)
		{
			// this.target.gameGroupMove();
		}
	}

	/**
	 * 显示预处理
	 */
	private tryShowPreActionGroup(isTween: boolean, isLoopOver?:boolean)
	{
		if (GamblingManager.self && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.pos > 0)
		{
			if (GamblingManager.self.pos != GamblingManager.roomInfo.pos)
			{
				let bool: boolean = false;
				switch (GamblingManager.self.state)
				{
					case PlayerState.WaitAction: //等待状态，第一圈注直接显示,非第一圈注第一个说完话显示
						bool = !GamblingManager.roomInfo.publicCard || GamblingManager.roomInfo.pos != GamblingUtil.earliestActionPos;
						break;
					case PlayerState.Blind: //盲注状态直接显示
						bool = true;
						break;
					case PlayerState.Call:
					case PlayerState.Check:
					case PlayerState.Raise: //已说话状态 下注额有差异
						bool = GamblingManager.self.num < GamblingManager.roomInfo.maxAnte;
						break;
				}
				if (bool || isLoopOver)
				{
					this.target.actionGroup.showPreActionGroup(true);
				}
			}
		}
	}
	/**
	 * 尝试显示弃牌状态处理
	 */
	private tryShowFoldGroup()
	{
		if (GamblingManager.self && GamblingManager.self.state == PlayerState.Fold && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.pos > 0)
		{
			this.target.actionGroup.hideAll(true);
			this.target.cardTypeGroup.visible = false;
			if (GamblingUtil.isOmaha)
			{
				this.target.cardTypeComp.init(CardType.None);
			}
			// this.target.actionGroup.brightCardBtn.visible = true;
			this.target.actionGroup.showBrightButton(true);
		}
	}
	/**
	 * 设置下一个计时奖励数据
	*/
	private setNextTimeAwardInfo()
	{
		if (GamblingManager.timeAwardHandler.round < table.TimeAward.length)
		{
			this._numContentInfo.content = game.DateTimeUtil.countDownFormat(GamblingManager.timeAwardHandler.time, false)
			this.target.onlineAwardBtn["numComponent"].init(this._numContentInfo);
			GamblingManager.timeAwardHandler.startTimeFlag = true;
			GamblingManager.timeAwardHandler.isGetTimeAward = false;
			if (GamblingManager.self && GamblingManager.timeAwardHandler.isEffectTime)
			{
				GamblingManager.timeAwardHandler.startCountDown();
			}
		}
	}
	/**
	 * 倒计时时刷新计时数据
	*/
	private refreshTimeAwardTime()
	{
		this._numContentInfo.content = game.DateTimeUtil.countDownFormat(GamblingManager.timeAwardHandler.time, false)
		this.target.onlineAwardBtn["numComponent"].init(this._numContentInfo);
	}
	/**
	 * 面板关闭
	 * @param panelName 面板名
	 */
	private onPanelCloseHandler(panelName: string)
	{
		if (panelName == UIModuleName.AddChipsPanel)
		{
			this.tryShowAction();
		}
	}
	private tryShowAction()
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.self && this._isTimeOut == false)
		{
			// this.target.actionGroup.actionGroup.visible = true;
			// this.target.actionGroup.raiseGroup.visible = true;
			if (GamblingManager.roomInfo.pos == GamblingManager.self.pos)
			{
				this.target.actionGroup.showRaiseGroup(true);
				this.target.actionGroup.showActionGroup(true);
				this.showCallCheckBtn();
			}
			else
			{
				this.tryShowPreActionGroup(true);
			}
		}
	}
	private onPanelOpenHandler(panelName: string)
	{
		if (panelName == UIModuleName.AddChipsPanel && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.self)
		{
			if (GamblingManager.roomInfo.pos == GamblingManager.self.pos)
			{
				this.target.actionGroup.showActionGroup(false);
				this.target.actionGroup.showRaiseGroup(false);
			}
		}
	}
	private timeOutCloseAddchipsPanel()
	{
		if (UIManager.isShowPanel(UIModuleName.AddChipsPanel))
		{
			this._isTimeOut = true;
			UIManager.closePanel(UIModuleName.AddChipsPanel);
		}
	}
	private actionTimeOut()
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.self && GamblingManager.roomInfo.pos == GamblingManager.self.pos)
		{
			// GamblingManager.reqTimeOut();
			/**
			 * 关闭加注面板
			 */
			// UIManager.closePanel(UIModuleName.AddChipsPanel);

			// this.target.actionGroup.actionGroup.visible = false;
			// this.target.actionGroup.raiseGroup.visible = false;
		}
	}
	/**
	 * 发牌结束
	 */
	private flopCardOverHandler()
	{
		this.actionPosChangeHandler();
	}
}