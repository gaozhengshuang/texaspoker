/**
 * 牌局交互功能
 */
class GamblingPanelFuncSupport extends BaseGamblingPanelSupport
{
	/**
    * 快捷加注比例
	*/
	private static _quicklyPhase1: number = 1 / 3;
	private static _quicklyPhase2: number = 1 / 2;
	private static _quicklyPhase3: number = 2 / 3;
	private static _quicklyPhase4: number = 1;
	private static _quicklyPhase5: number = 2;

	public initialize()
	{
		super.initialize();
		let type = GamblingType.Common;
		if (GamblingManager.roomInfo)
		{
			type = GamblingManager.roomInfo.gamblingType;
		}
		if (GamblingManager.self && type != GamblingType.Match)
		{
			this.target.funcGroup.addChildAt(this.target.standUpBtn, 1);
		}
		else
		{
			if (this.target.standUpBtn.parent)
			{
				this.target.funcGroup.removeChild(this.target.standUpBtn);
			}
		}
		if (GamblingManager.self)
		{
			this.target.actionGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionGroupClickHandler, this);
		}
		this.refreshSelectStateBtn();
		if (this.target.recordBtn)
		{
			this.target.recordBtn.setRecordBtnShow(GamblingManager.isInSeat);
		}
	}
	public onEnable()
	{
		super.onEnable();
		this.target.addEventListener(egret.TouchEvent.TOUCH_TAP, this.funcGroupClickHandler, this);
		GamblingManager.LeaveRoomEvent.addListener(this.backToHallFromServer, this);
		GamblingManager.LeaveRoomErrorEvent.addListener(this.backToHallFromServer, this);
		GamblingManager.SitOrStandEvent.addListener(this.sitOrStandHandler, this);
		GamblingManager.BrightCardFlagEvent.addListener(this.brightCardHandler, this);
		GamblingManager.NextRoundStartEvent.addListener(this.nextRoundStartHandler, this);
		GamblingManager.OneLoopOverEvent.addListener(this.boardCardChangeHandler, this);
		if (this.target.recordBtn)
		{
			this.target.recordBtn.OnEnable();
		}
	}
	public onDisable()
	{
		super.onDisable();
		this.target.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.funcGroupClickHandler, this);
		GamblingManager.LeaveRoomEvent.removeListener(this.backToHallFromServer, this);
		GamblingManager.LeaveRoomErrorEvent.removeListener(this.backToHallFromServer, this);
		GamblingManager.SitOrStandEvent.removeListener(this.sitOrStandHandler, this);
		GamblingManager.BrightCardFlagEvent.removeListener(this.brightCardHandler, this);
		GamblingManager.NextRoundStartEvent.removeListener(this.nextRoundStartHandler, this);
		GamblingManager.OneLoopOverEvent.removeListener(this.boardCardChangeHandler, this);
		if (this.target.recordBtn)
		{
			this.target.recordBtn.OnDisable();
		}
	}

	private funcGroupClickHandler(event: egret.TouchEvent)
	{
		switch (event.target)
		{
			case this.target.chargeBtn: //充值
				SoundManager.playEffect(MusicAction.buttonClick);
				UIManager.showPanel(UIModuleName.ShoppingPanel, { prevPanelName: UIModuleName.GamblingPanel, toRight: true });
				break;
			case this.target.standUpBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				GamblingManager.reqStandUp();
				break;
			case this.target.safeBtn: //保险箱
				SoundManager.playEffect(MusicAction.buttonClick);
				JumpUtil.JumpToSafeBox(UIModuleName.GamblingPanel);
				break;
			case this.target.mailBtn: //邮件
				SoundManager.playEffect(MusicAction.buttonClick);
				JumpUtil.JumpToMail();
				break;
			case this.target.luckyBoxBtn: //幸运盒
				break;
			case this.target.activityBtn: //活动
				SoundManager.playEffect(MusicAction.buttonClick);
				JumpUtil.JumpToActivity(UIModuleName.GamblingPanel);
				break;
			case this.target.helpBtn: //帮助
				SoundManager.playEffect(MusicAction.buttonClick);
				JumpUtil.JumpToGameRule(UIModuleName.GamblingPanel);
				break;
			case this.target.backToHallBtn: //返回大厅
				SoundManager.playEffect(MusicAction.buttonClick);
				this.backToHallBtnClickHandler(event);
				break;
			case this.target.achieveBtn: //任务
				SoundManager.playEffect(MusicAction.buttonClick);
				if (this.target.moveTouchEnd(event))
				{
					return;
				}
				JumpUtil.JumpToAchievementInGame(AchievementManager.playingFieldTypeToAchieveShowPattern(GamblingManager.roomInfo.definition.Type));
				break;
			case this.target.guessCardBtn://手牌竞猜
				SoundManager.playEffect(MusicAction.buttonClick);
				if (!FuncOpenUtils.isOpened(FuncType.GuessCard))
				{
					return;
				}
				if (this.target.moveTouchEnd(event))
				{
					return;
				}
				UIManager.showPanel(UIModuleName.GuessPanel);
				break;
			case this.target.chatBtn://聊天
				SoundManager.playEffect(MusicAction.buttonClick);
				if (!FuncOpenUtils.isOpened(FuncType.Chat))
				{
					return;
				}
				if (this.target.moveTouchEnd(event))
				{
					return;
				}
				JumpUtil.JumpToChatPanel();
				break;
			case this.target.onlineAwardBtn://在线奖励
				SoundManager.playEffect(MusicAction.buttonClick);
				if (this.target.moveTouchEnd(event))
				{
					return;
				}
				UIManager.showPanel(UIModuleName.TimeAwardPanel, GamblingManager.roomInfo.definition.Type);
				break;
			case this.target.reviewBtn://上局回顾
				SoundManager.playEffect(MusicAction.buttonClick);
				if (this.target.moveTouchEnd(event))
				{
					return;
				}
				UIManager.showPanel(UIModuleName.GamblingReviewPanel, GamblingManager.roomInfo.id);
				break;
		}
	}
	private backToHallFromServer(data: any)
	{
		if (data && data.isInMtt)
		{
			return;
		}
		// this.target.onClose();
		switch (data.type)
		{
			case GamblingType.Match:
				SceneManager.switcScene(SceneType.Hall, { action: SceneSwitchAction.RepleacePanel, panel: UIModuleName.ChampionshipPanel });
				break;
			case GamblingType.Common:
			case GamblingType.PlayFieldPersonal:
				SceneManager.switcScene(SceneType.Hall, { playFieldType: data.playFieldType, action: SceneSwitchAction.RepleacePanel, panel: UIModuleName.PlayingFieldPanel });
				break;
			case GamblingType.Omaha:
			case GamblingType.OmahaPersonal:
				SceneManager.switcScene(SceneType.Hall, { action: SceneSwitchAction.RepleacePanel, panel: UIModuleName.PlayingFieldPanel, params: { playWay: PlayWayType.Omaha } });
				break;
		}
	}
	private sitOrStandHandler(obj: any)
	{
		if (obj.pInfo.roleId == UserManager.userInfo.roleId)
		{
			if (obj.state == BuyInGameState.Sit)
			{
				this.target.funcGroup.addChildAt(this.target.standUpBtn, 1);
				this.target.actionGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionGroupClickHandler, this);
				if (this.target.recordBtn)
				{
					this.target.recordBtn.setRecordBtnShow(true);
				}
			}
			else if (obj.state == BuyInGameState.Stand)
			{
				if (this.target.standUpBtn.parent)
				{
					this.target.funcGroup.removeChild(this.target.standUpBtn);
				}
				if (this.target.recordBtn)
				{
					this.target.recordBtn.setRecordBtnShow(false);
				}
				this.target.actionGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.actionGroupClickHandler, this);
			}
		}
	}
	public removeActionGroupClickEvent()
	{
		this.target.actionGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.actionGroupClickHandler, this);
	}
	/**
	 * 返回大厅按钮点击
	 */
	private backToHallBtnClickHandler(event: egret.TouchEvent)
	{
		if (GamblingManager.roomInfo)
		{
			switch (GamblingManager.roomInfo.gamblingType)
			{
				case GamblingType.Common:
				case GamblingType.Omaha:
					this.leaveRoom();
					break;
				case GamblingType.Match:
					if (GamblingManager.self) //非观看状态
					{
						AlertManager.showConfirm("比赛中途离开，系统将会帮您托管，您可在“我的比赛”重新进入比赛,是否确认离开？", this.leaveRoom);
					}
					else
					{
						this.leaveRoom();
					}
					break;
				case GamblingType.PlayFieldPersonal:
				case GamblingType.OmahaPersonal:
					if (GamblingManager.isMaster) 
					{
						AlertManager.showConfirm("你是该房间的房主，你退出房间后该房间在所有玩家都离开后将被收回，您是否确定退出？", this.leaveRoom);
					}
					else
					{
						this.leaveRoom();
					}
					break;
			}
		}
		else
		{
			//锦标赛等待状态返回大厅	
			AlertManager.showConfirm("比赛中途离开，系统将会帮您托管，您可在“我的比赛”重新进入比赛,是否确认离开？", this.waitStateBackToHallConfirm, null, this);
		}
	}
	/**
	 * 等待房间返回大厅确认执行操作
	*/
	private waitStateBackToHallConfirm(thisObj: any)
	{
		GamblingManager.clearMatchRoomInfo();
		thisObj.backToHallFromServer({ type: GamblingType.Match });
	}
	private leaveRoom()
	{
		GamblingManager.reqLeaveRoom();
	}
	private actionGroupClickHandler(event: egret.TouchEvent)
	{
		switch (event.target)
		{
			case this.target.actionGroup.brightCardBtn: //结束时亮牌
				SoundManager.playEffect(MusicAction.buttonClick);
				GamblingManager.reqBrightCard();
				break;
			case this.target.actionGroup.immediatelyBrightCardBtn: //立即亮牌
				SoundManager.playEffect(MusicAction.buttonClick);
				GamblingManager.reqImmediatelyBrightCard();
				break;
			case this.target.actionGroup.checkOrDropBtn: //过或弃
				GamblingManager.isCheckOrFold = !GamblingManager.isCheckOrFold;
				this.refreshCheckOrDrop();
				GamblingManager.isCallAny = false;
				this.target.actionGroup.autoCheckBtn.selected = false;
				this.target.actionGroup.callAnyBtn.selected = false;
				this.target.actionGroup.preCallBtn.selected = false;
				SoundManager.playEffect(MusicAction.buttonClick);
				break;
			case this.target.actionGroup.callAnyBtn: //一律跟
				GamblingManager.isCallAny = this.target.actionGroup.callAnyBtn.selected;
				this.target.actionGroup.autoCheckBtn.selected = false;
				this.target.actionGroup.preCallBtn.selected = false;
				GamblingManager.isCheckOrFold = false;
				this.refreshCheckOrDrop();
				SoundManager.playEffect(MusicAction.buttonClick);
				break;
			case this.target.actionGroup.preCallBtn: //跟N
				GamblingManager.isCallAny = this.target.actionGroup.preCallBtn.selected;
				this.target.actionGroup.autoCheckBtn.selected = false;
				this.target.actionGroup.callAnyBtn.selected = false;
				GamblingManager.isCheckOrFold = false;
				this.refreshCheckOrDrop();
				SoundManager.playEffect(MusicAction.buttonClick);
				break;
			case this.target.actionGroup.autoCheckBtn: //自动过牌		
				GamblingManager.isCallAny = this.target.actionGroup.autoCheckBtn.selected;
				this.target.actionGroup.preCallBtn.selected = false;
				this.target.actionGroup.callAnyBtn.selected = false;
				GamblingManager.isCheckOrFold = false;
				this.refreshCheckOrDrop();
				SoundManager.playEffect(MusicAction.buttonClick);
				break;
			case this.target.actionGroup.oneOfThreeBtn: //加注1/3底池
				this.oneKeyRaise(GamblingPanelFuncSupport._quicklyPhase1);
				SoundManager.playEffect(MusicAction.buttonClick);
				break;
			case this.target.actionGroup.oneOfTwoBtn: //加注1/2底池
				this.oneKeyRaise(GamblingPanelFuncSupport._quicklyPhase2);
				SoundManager.playEffect(MusicAction.buttonClick);
				break;
			case this.target.actionGroup.twoOfThreeBtn: //加注2/3底池
				this.oneKeyRaise(GamblingPanelFuncSupport._quicklyPhase3);
				SoundManager.playEffect(MusicAction.buttonClick);
				break;
			case this.target.actionGroup.oneBtn: //加注 底池*1
				this.oneKeyRaise(GamblingPanelFuncSupport._quicklyPhase4);
				SoundManager.playEffect(MusicAction.buttonClick);
				break;
			case this.target.actionGroup.raiseBtn: //加注
				if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.self)
				{
					// this.target.actionGroup.actionGroup.visible = false;
					// this.target.actionGroup.raiseGroup.visible = false;
					let obj: Object = { value: GamblingManager.self.num, minChips: GamblingManager.roomInfo.minRaiseNum, maxChips: GamblingUtil.maxRaiseChips, bBlind: GamblingManager.roomInfo.bBlind };
					UIManager.showPanel(UIModuleName.AddChipsPanel, obj);
				}
				SoundManager.playEffect(MusicAction.buttonClick);
				break;
			case this.target.actionGroup.foldBtn: //弃牌
				GamblingManager.reqAction(PlayerState.Fold);
				SoundManager.playEffect(MusicAction.buttonClick);
				break;
			case this.target.actionGroup.callBtn: //跟注
			case this.target.actionGroup.checkBtn: //跟注
				GamblingManager.doDefaultAction();
				SoundManager.playEffect(MusicAction.buttonClick);
				break;
		}
	}
	/**
	 * 一键加注
	 */
	private oneKeyRaise(proportion: number)
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.self)
		{
			let raiseNum: number = Math.floor(GamblingManager.totalPotChips * proportion);
			// GamblingManager.roomInfo.bBlind
			// raiseNum *= GamblingManager.roomInfo.bBlind;
			raiseNum = Math.max(GamblingManager.roomInfo.minRaiseNum, raiseNum);
			if (raiseNum >= GamblingManager.self.bankRoll) //all in
			{
				GamblingManager.reqAction(PlayerState.AllIn, GamblingManager.self.bankRoll);
			}
			else
			{
				GamblingManager.reqAction(PlayerState.Raise, raiseNum); //加注
			}
		}
	}

	/**
	 * 下一局开始
 	*/
	private nextRoundStartHandler()
	{
		//刷新按钮状态显示
		this.refreshSelectStateBtn();
	}
	/**
	* 公共牌推送 下一轮开始
  	*/
	private boardCardChangeHandler()
	{
		this.refreshSelectStateBtn();
	}
	private refreshSelectStateBtn()
	{
		if (GamblingManager.self)
		{
			this.refreshCallAny();
			this.refreshCheckOrDrop();
			this.showBrightCardSelected();
		}
	}
	private refreshCallAny()
	{
		this.target.actionGroup.callAnyBtn.selected = false;
		this.target.actionGroup.preCallBtn.selected = false;
		this.target.actionGroup.autoCheckBtn.selected = false;
	}
	private refreshCheckOrDrop()
	{
		this.target.actionGroup.checkOrDropBtn.selected = GamblingManager.isCheckOrFold;
	}
	private brightCardHandler()
	{
		this.showBrightCardSelected();
		this.target.actionGroup.showImmediatelyBrightCardBtn(false);
	}
	private showBrightCardSelected()
	{
		if (GamblingManager.roomInfo)
		{
			this.target.actionGroup.brightCardBtn.selected = GamblingManager.roomInfo.isShowCard;
		}
	}
	public clear()
	{
		super.clear();
	}
}