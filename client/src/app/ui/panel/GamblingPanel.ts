/**
 * 牌局面板
 */
class GamblingPanel extends BasePanel
{

	//-----------功能信息----------------
	public funcGroup: eui.Group;
	public chargeBtn: eui.Button;
	public standUpBtn: eui.Button;
	public safeBtn: eui.Button;
	public mailBtn: eui.Button;
	public luckyBoxBtn: eui.Button;
	public activityBtn: eui.Button;
	public helpBtn: eui.Button;
	public backToHallBtn: eui.Button;
	public leftGroup: eui.Group;
	//----------------------------------

	//-----------牌局桌面信息------------
	public dragGroup: eui.Group;
	public gameGroup: eui.Group;
	public currencyGroup: eui.Group;
	public buttonPosFlagImg: eui.Image;
	/**
	 * 做位置辅助用
	 */
	public buttonPosFlagImgSpt: eui.Image;

	public logoBg: eui.Image;

	public optionsBtn: eui.Button;
	public buyBtn: eui.Button;
	public onlineAwardBtn: eui.Button;
	public guessCardBtn: eui.Button;
	public achieveBtn: eui.Button;
	public chatBtn: eui.Button;
	public reviewBtn: eui.Button;
	public audioRecordBtn: eui.Button;
	public guessCorrectlyGroup: eui.Group;
	public recordBtn: AudioRecordButton;

	public cardTypeComp: OmahaCardTypeBtnComponent;
	/**
	 * 房间信息
	 */
	public roomIdLabel: eui.Label;
	public usualblindLabel: eui.Label;
	public potLabel: eui.Label;
	public anteLabel: eui.Label;

	public roomIdGroup: eui.Group;
	public usualBlindGroup: eui.Group;
	public potGroup: eui.Group;
	public anteGroup: eui.Group;
	/**
	 * 发牌图片
	 */
	public flopCardImg1: eui.Image;
	public flopCardImg2: eui.Image;
	public foldPointImg: eui.Image;

	/**
	 * 底池边池列表
	 */
	public potChipsGroup: eui.Group;
	public chipsBgGroup: eui.Group;
	public chipsNumGroup: eui.Group;

	/**
	 * 牌型组件
	 */
	public cardTypeGroup: eui.Group;
	public cardDeslabel: eui.Label;
	/**
	 * 头像组件
	 */
	public pit1: GamblingHeadComponent;
	public pit2: GamblingHeadComponent;
	public pit3: GamblingHeadComponent;
	public pit4: GamblingHeadComponent;
	public pit5: GamblingHeadComponent;
	public pit6: GamblingHeadComponent;
	public pit7: GamblingHeadComponent;
	public pit8: GamblingHeadComponent;
	public pit9: GamblingHeadComponent;

	private _card1: CardFaceComponent;
	public get card1(): CardFaceComponent
	{
		if (!this._card1)
		{
			this.createCard(1);
		}
		return this._card1;
	}
	private _card2: CardFaceComponent;
	public get card2(): CardFaceComponent
	{
		if (!this._card2)
		{
			this.createCard(2);
		}
		return this._card2;
	}
	private _card3: CardFaceComponent;
	public get card3(): CardFaceComponent
	{
		if (!this._card3)
		{
			this.createCard(3);
		}
		return this._card3;
	}
	private _card4: CardFaceComponent;
	public get card4(): CardFaceComponent
	{
		if (!this._card4)
		{
			this.createCard(4);
		}
		return this._card4;
	}
	private _card5: CardFaceComponent;
	public get card5(): CardFaceComponent
	{
		if (!this._card5)
		{
			this.createCard(5);
		}
		return this._card5;
	}
	private createCard(index: number)
	{
		this["_card" + index.toString()] = new CardFaceComponent(UIComponentSkinName.CardFaceComponent);
		this["_card" + index.toString()].scaleX = this["_card" + index.toString()].scaleY = 0.1;
		this["_card" + index.toString()].horizontalCenter = 0;
		this["_card" + index.toString()].verticalCenter = -183.5;
		this["_card" + index.toString()].visible = false;
		let showIndex: number = this.currencyGroup.getChildIndex(this.anteGroup);
		this.currencyGroup.addChildAt(this["_card" + index.toString()], showIndex);
	}
	private _cardList: Array<CardFaceComponent>;
	public get cardList(): Array<CardFaceComponent>
	{
		if (!this._cardList)
		{
			this._cardList = new Array<CardFaceComponent>();
			for (let i: number = 1; i <= GamblingManager.MaxBoardNum; i++)
			{
				this._cardList.push(this["card" + i.toString()]);
			}
		}
		return this._cardList;
	}
	public hideCard()
	{
		if (this._cardList)
		{
			let len: number = this.cardList.length;
			for (let i: number = 0; i < len; i++)
			{
				this.cardList[i].visible = false;
			}
		}
	}
	public cancelTrusteeshipButton: eui.Button;
	public cancelTrusteeshipButton0: eui.Button;

	private _actionGroup: GamblingActionComponent;
	public get actionGroup(): GamblingActionComponent
	{
		if (!this._actionGroup)
		{
			this._actionGroup = new GamblingActionComponent(UIComponentSkinName.GamblingActionComponent);
			this.addChildActionGroup();
		}
		return this._actionGroup;
	}
	public actionGroupHideAll(isTween: boolean)
	{
		if (this._actionGroup)
		{
			this._actionGroup.hideAll(isTween);
		}
	}
	private addChildActionGroup()
	{
		let index: number = this.currencyGroup.getChildIndex(this.buttonPosFlagImg);
		this._actionGroup.horizontalCenter = 0;
		this._actionGroup.bottom = 171;
		this.currencyGroup.addChildAt(this._actionGroup, index);
	}

	private _downEffect: DownEfffectComponent;
	private _waitNextRoundComponent: WaitNextRoundComponent;
	public get waitNextRoundComponent(): WaitNextRoundComponent
	{
		if (!this._waitNextRoundComponent)
		{
			this._waitNextRoundComponent = new WaitNextRoundComponent(UIComponentSkinName.WaitNextRoundComponent);
			this._waitNextRoundComponent.horizontalCenter = 0;
			this._waitNextRoundComponent.verticalCenter = -152;
			this._waitNextRoundComponent.init(null);
			this.currencyGroup.addChild(this._waitNextRoundComponent);
		}
		return this._waitNextRoundComponent;
	}
	public ordinaryRoomGroup: eui.Group;
	public waitNextImg: eui.Image;

	public pitList: Array<GamblingPitInfo>;

	private _isNextRoundStart: boolean = false;

	private _matchState: GamblingPanelMatchState;
	private _matchWaitState: GamblingPanelMatchWaitState;
	private _normalState: GamblingPanelNormalState;
	private _omahaState: GamblingPanelOmahaState;
	private _guidState: GamblingPanelGuideState;
	private _guidePlayWayState: GamblingPanelGuidePlayWayState;

	private _panelState: BaseGamblingPanelState;
	public get panelState(): BaseGamblingPanelState
	{
		return this._panelState;
	}

	private _stateIndex: GamblingPanelStateIndex;
	public get stateIndex(): GamblingPanelStateIndex
	{
		return this._stateIndex;
	}

	/**
	 * allin动画
	 */
	public allInAnimeGroup: eui.Group;
	public img0: eui.Image;
	public img1: eui.Image;
	public img2: eui.Image;
	public img3: eui.Image;
	public img4: eui.Image;
	public allinAnime: GamblingPanelAllinAnime;
	/**
	 * 赢牌动画
	 */
	public winAnimeGroup: eui.Group;
	public winImg1: eui.Image;
	public winImg2: eui.Image;
	public winImg3: eui.Image;

	/**
	 * 插槽容器 在正常容器下
	 */
	public slotContainerDown: eui.Group;
	/**
	 * 插槽容器 在正常容器上
	 */
	public slotContainerUp: eui.Group;

	//spt创建器
	private _sptCreater: GamblingSupportCreater;
	public get sptCreater(): GamblingSupportCreater
	{
		return this._sptCreater;
	}

	private _isOnAwaked: boolean = false;

	public constructor()
	{
		super();
		this.isTween = false;
		this.setSkinName(UIModuleName.GamblingPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
		this.tweenGroup.visible = false;
		let createIndex: number = 1;
		let func: Function = () =>
		{
			if (createIndex > GamblingPanelSetting.MaxPitIndex)
			{
				this.delayAwake();
			}
			else
			{
				this["pit" + createIndex.toString()] = new GamblingHeadComponent(UIComponentSkinName.GamblingHeadComponent);
				game.Tick.AddTimeoutInvoke(func, 100, this);
			}
			createIndex++;
		};
		this.ordinaryRoomGroup.removeChild(this.allInAnimeGroup);
		game.Tick.AddTimeoutInvoke(func, 100, this);

		VersionManager.setComponentVisibleBySafe(this.safeBtn, this.activityBtn);
		if (game.System.isMicro)
		{
			this.recordBtn = new AudioRecordButton(this.audioRecordBtn, this);
		}
	}
	private delayAwake()
	{
		this.tweenGroup.visible = true;
		this.pitList = new Array<GamblingPitInfo>();
		let pitInfo: GamblingPitInfo;
		for (let i: number = GamblingPanelSetting.MinPitIndex; i <= GamblingPanelSetting.MaxPitIndex; i++)
		{
			pitInfo = new GamblingPitInfo();
			pitInfo.index = i;
			pitInfo.headComponent = this["pit" + i.toString()];
			pitInfo.headComponent.parentPanel = this;
			pitInfo.headComponent.posIndex = i;
			this.pitList.push(pitInfo);
		}
		this.setPit();
		this.allinAnime = new GamblingPanelAllinAnime(this);

		let showIndex: number = this.currencyGroup.getChildIndex(this.buttonPosFlagImg);
		//显示头像
		for (let i: number = GamblingPanelSetting.MinPitIndex; i <= GamblingPanelSetting.MaxPitIndex; i++)
		{
			this.currencyGroup.addChildAt(this["pit" + i.toString()], showIndex - 1);
		}
		this.initShow();
		this.addRedPoint();

		this.currencyGroup.touchEnabled = false;
		this.ordinaryRoomGroup.touchEnabled = false;
		this._sptCreater = new GamblingSupportCreater(this);

		this._isOnAwaked = true;
		this.onEnable(null);
		this.init(this.panelData);
	}
	/**
	 * 加入红点提示
	*/
	private addRedPoint()
	{
		UIUtil.addSingleNotify(this.onlineAwardBtn, NotifyType.Gambling_TimeAward, -7, -5);
		UIUtil.addSingleNotify(this.chatBtn, NotifyType.HundredWar_Chat, -7, -5);
		UIUtil.addMultiNotify(this.activityBtn, NotifyType.ActivityRedPoint, UIModuleName.GamblingPanel, 0, 0);
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo))
		{
			switch (GamblingManager.roomInfo.definition.type)
			{
				case PlayingFieldType.Primary:
					UIUtil.addSingleNotify(this.achieveBtn, NotifyType.Achieve_PrimaryPattern, -7, -5);
					break;
				case PlayingFieldType.Middle:
					UIUtil.addSingleNotify(this.achieveBtn, NotifyType.Achieve_MiddlePattern, -7, -5);
					break;
				case PlayingFieldType.High:
					UIUtil.addSingleNotify(this.achieveBtn, NotifyType.Achieve_HighPattern, -7, -5);
					break;
			}
		}
	}
	public init(appendData: any)
	{
		super.init(appendData);
		if (this._isOnAwaked)
		{
			this.initPanel();
		}
	}
	private initPanel()
	{
		this._stateIndex = GamblingUtil.gamblingPanelStateIndex;
		if (!this._stateIndex)
		{
			this._stateIndex = GamblingPanelStateIndex.Normal;
		}

		this.initShow();
		if (!this._actionGroup && GamblingManager.self)
		{
			this.initActionGroup();
		}
		if (this._actionGroup && !GamblingManager.self)
		{
			this.initActionGroup();
		}
		if (GamblingManager.isQuicklyEnter)
		{
			GamblingManager.reqQuicklyBuyInGame();
		}

		this.switchState();

		ChannelManager.checkUnFinishedPayList();
		this._isNextRoundStart = false;
		//牌局面板初始化完毕
		UIManager.dispatchEvent(UIModuleName.GamblingPanel, UIModuleEvent.COMPLETE);
	}
	/**
	 * 初始化行动组件 坐下来执行
	 */
	public initActionGroup()
	{
		this.actionGroup.init(null);
		this.actionGroup.brightCardBtn.visible = false;
		this.actionGroup.immediatelyBrightCardBtn.visible = false;
		this.actionGroup.hideAll(false);
		this.actionGroup.hidePreActionGroup(false);
		this.actionGroup.visible = true;
	}
	/**
	 * 显示操作组
	 */
	public tryAddChildActionGroup()
	{
		if (this._actionGroup)
		{
			this.addChildActionGroup();
			this._actionGroup.addChild(this._actionGroup.preActionGroup);
		}
	}
	private switchState()
	{
		if (this._panelState)
		{
			this._panelState.clear();
		}

		this._panelState = this.getState();

		this._panelState.onEnable();
		this._panelState.initialize();
		this._panelState.run();
	}
	private getState(): BaseGamblingPanelState
	{
		switch (this._stateIndex)
		{
			case GamblingPanelStateIndex.Normal:
				if (!this._normalState)
				{
					this._sptCreater.createNormal();
					this._normalState = new GamblingPanelNormalState(this, this._sptCreater.supportNormalList);
					this._normalState.onAwake();
				}
				return this._normalState;
			case GamblingPanelStateIndex.MatchWait:
				if (!this._matchWaitState)
				{
					this._sptCreater.createMttWait();
					this._matchWaitState = new GamblingPanelMatchWaitState(this, this._sptCreater.supportMatchWaitList);
					this._matchWaitState.onAwake();
				}
				return this._matchWaitState;
			case GamblingPanelStateIndex.Match:
				if (!this._matchState)
				{
					this._sptCreater.createMtt();
					this._matchState = new GamblingPanelMatchState(this, this._sptCreater.supportMatchList);
					this._matchState.onAwake();
				}
				return this._matchState;
			case GamblingPanelStateIndex.Omaha:
				if (!this._omahaState)
				{
					this._sptCreater.createOmaha();
					this._omahaState = new GamblingPanelOmahaState(this, this._sptCreater.supportOmahaList);
					this._omahaState.onAwake();
				}
				return this._omahaState;
			case GamblingPanelStateIndex.Guide:
				if (!this._guidState)
				{
					this._sptCreater.createGuide();
					this._guidState = new GamblingPanelGuideState(this, this._sptCreater.supportGuideList);
					this._guidState.onAwake();
				}
				return this._guidState;
			case GamblingPanelStateIndex.GuidePlayWay:
				if (!this._guidePlayWayState)
				{
					this._sptCreater.createGuidePlayWay();
					this._guidePlayWayState = new GamblingPanelGuidePlayWayState(this, this._sptCreater.supportGuidePlayWayList);
					this._guidePlayWayState.onAwake();
				}
				return this._guidePlayWayState;
			default:
				game.Console.logError("牌局面板状态异常！" + this._stateIndex);
				return null;
		}
	}
	/**
	 * 锦标赛 换房间调用
	 */
	public switchToGameSceneInRoom()
	{
		if (this._isOnAwaked)
		{
			this.onDisable(null);
			this.onEnable(null);
			this.initPanel();
		}
	}
	private initShow()
	{
		if (this._waitNextRoundComponent)
		{
			this._waitNextRoundComponent.show(false);
		}
		for (let i: number = GamblingPanelSetting.MinPitIndex; i <= GamblingPanelSetting.MaxPitIndex; i++)
		{
			this["pit" + i.toString()].visible = false;
		}
		this.buttonPosFlagImg.visible = false;
		this.winAnimeGroup.visible = false;
	}

	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		if (this._isOnAwaked)
		{
			GamblingManager.NextRoundStartEvent.addListener(this.nextRoundStartHandler, this);
		}
		GamblingManager.OnGetRoomInfoEvent.addListener(this.onReconnectHandler, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		if (this._isOnAwaked)
		{
			if (this._panelState)
			{
				this._panelState.onDisable();
			}

			this.resetPitIndex();
			game.Tick.RemoveTimeoutInvoke(this.delayHideGroup, this);
			GamblingManager.NextRoundStartEvent.removeListener(this.nextRoundStartHandler, this);
			if (this._actionGroup && this.sptCreater.funcSupport)
			{
				this.sptCreater.funcSupport.removeActionGroupClickEvent();
			}
		}
		GamblingManager.OnGetRoomInfoEvent.removeListener(this.onReconnectHandler, this);
	}
	private onReconnectHandler(isReconnect: boolean)
	{
		if (isReconnect && this._isOnAwaked)
		{
			this.initPanel();
		}
	}
	/**
 	* 隐藏头像的状态组
 	*/
	public hideSateGroup(isOneLoopOver: boolean = false)
	{
		this._isNextRoundStart = false;
		game.Tick.RemoveTimeoutInvoke(this.delayHideGroup, this);
		game.Tick.AddTimeoutInvoke(this.delayHideGroup, 500, this, isOneLoopOver);
	}
	private nextRoundStartHandler()
	{
		this._isNextRoundStart = true;
	}
	private delayHideGroup(isOneLoopOver: boolean = false)
	{
		if (this._isNextRoundStart == false)
		{
			for (let pitInfo of this.pitList)
			{
				//弃牌状态在一轮圈注之后不隐藏
				if (isOneLoopOver)
				{
					if (pitInfo.headComponent.bindData && pitInfo.headComponent.bindData.state == PlayerState.WaitAction) //只隐藏等待说话的人的状态
					{
						pitInfo.headComponent.showStateGroup(false);
					}
				}
				else
				{
					pitInfo.headComponent.showStateGroup(false);
				}
			}
		}
	}
	private resetPitIndex()
	{
		let pitInfo: GamblingPitInfo;
		for (let i: number = GamblingPanelSetting.MinPitIndex; i <= GamblingPanelSetting.MaxPitIndex; i++)
		{
			pitInfo = this.pitList[i - 1];
			pitInfo.index = i;
			pitInfo.headComponent.posIndex = i;
		}
	}
	/**
	 * 清理底池显示
	 */
	public clearPotChips()
	{
		this.potChipsGroup.visible = false;
		if (this.potChipsGroup["dataList"])
		{
			this.potChipsGroup["dataList"].length = 0;
		}

		for (let i: number = 0; i < this.chipsBgGroup.numChildren; i++)
		{
			let chipsShowComponent1: ChipsShowComponent = this.chipsBgGroup.getChildAt(i) as ChipsShowComponent;
			let chipsShowComponent2: ChipsShowComponent = this.chipsNumGroup.getChildAt(i) as ChipsShowComponent;
			chipsShowComponent1.clear();
			chipsShowComponent2.clear();
		}
		this.chipsBgGroup.removeChildren();
		this.chipsNumGroup.removeChildren();
	}
	public onClose()
	{
		super.onCloseBtnClickHandler(null);
	}
	/**
	 * 设置头像的坑位信息
	 */
	public setPit()
	{
		if (this.pitList)
		{
			let len: number = this.pitList.length;
			let pitInfo: GamblingPitInfo;
			for (let i: number = 0; i < len; i++)
			{
				pitInfo = this.pitList[i];
				if (pitInfo)
				{
					pitInfo.headComponent.setPit(pitInfo.index);
				}
			}
		}
	}
	/**
	 * 获取当前坑位的playerpos
	 */
	public getPlayerPos(pit: GamblingPitInfo): number
	{
		return this._sptCreater.pitDataSupport.getPlayerPos(pit);
	}
	/**
	 * 根据玩家位置获取坑位信息
	 */
	public getPitInfo(playerPos: number): GamblingPitInfo
	{
		return this._sptCreater.pitDataSupport.getPitInfo(playerPos);
	}
	/**
	 * 根据索引获取坑位信息
	 */
	public getPitInfoByIndex(index: number): GamblingPitInfo
	{
		return this._sptCreater.pitDataSupport.getPitInfoByIndex(index);
	}
	/**
	 * 获取头像组件，根据玩家位置
	 */
	public getHeadComponent(playerPos: number): GamblingHeadComponent
	{
		return this._sptCreater.pitDataSupport.getHeadComponent(playerPos);
	}
	/**
	 * 根据角色信息获取角色所在的头像组件
	 */
	public getHeadComponentByRole(role: number | PlayerInfo): GamblingHeadComponent
	{
		if (role instanceof PlayerInfo)
		{
			return this._sptCreater.pitDataSupport.getHeadComponent(role.pos);
		}
		else
		{
			let pInfo: PlayerInfo = GamblingManager.getPlayerInfo(role);
			if (pInfo)
			{
				return this._sptCreater.pitDataSupport.getHeadComponent(pInfo.pos);
			}
		}
		return null;
	}
	/**
	 * 根据上一次的roleID获取头像组件 由于玩家在结算之前离开，但是又赢牌了的情况（只有两家同时allin）
	 */
	public getHeadComponentByLastRoleId(roleId: number): GamblingHeadComponent
	{
		for (let pitInfo of this.pitList)
		{
			if (pitInfo.headComponent.lastRoleId == roleId)
			{
				return pitInfo.headComponent;
			}
		}
		return null;
	}
	/**
	 * 获取下一个有玩家的坑位信息 如果都没有则返回null
	 */
	public getNextPlayerPitInfo(pit: GamblingPitInfo): GamblingPitInfo
	{
		return this._sptCreater.pitDataSupport.getNextPlayerPitInfo(pit);
	}
	/**
	 * 获取下一个位置的玩家信息
	 */
	public getNextPlayerInfo(playerPos: number): PlayerInfo
	{
		return this._sptCreater.pitDataSupport.getNextPlayerInfo(playerPos);
	}
	/**
	 * 根据玩家信息获取坑位信息
	 */
	public getPitInfoByPlayerInfo(playerInfo: PlayerInfo): GamblingPitInfo
	{
		return this._sptCreater.pitDataSupport.getPitInfoByPlayerInfo(playerInfo);
	}
	private get downEffect(): DownEfffectComponent
	{
		if (!this._downEffect)
		{
			this._downEffect = new DownEfffectComponent(UIComponentSkinName.DownEfffectComponent);
			this._downEffect.init();
		}
		return this._downEffect;
	}
	public showDownEffect(parent: eui.Group)
	{
		this.downEffect.run(parent);
	}
	public hideDownEffect()
	{
		this.downEffect.init();
	}
	/**
	 * 刷新按钮位置
	 */
	public refreshButtonPos()
	{
		this._sptCreater.buttonPosSpt.initialize();
	}
	/**
	 * 移动牌局
	 */
	public gameGroupMove()
	{
		this._sptCreater.moveSpt.move();
	}
	public moveTouchEnd(event: egret.TouchEvent)
	{
		if (this.gameGroup.x > 0)
		{
			this._sptCreater.moveSpt.onTouchBegin(event);
			this._sptCreater.moveSpt.onTouchEnd(event, true);
			return true;
		}
		return false;
	}
	/**
	 * 锦标赛结束处理
	 */
	public checkRebuyAddon()
	{
		this._sptCreater.championshipSupport.checkRebuyAddon();
	}
}