/**
 * 牌局玩家头像组件
 */
class GamblingHeadComponent extends BaseComponent<PlayerInfo>{

	/**
	 * 空组
	 */
	public emptyGroup: eui.Group;
	public canSitDownLabel: eui.Label;
	public inviteImg: eui.Image;
	/**
	 * 玩家组
	 */
	public playerGroup: eui.Group;
	public headIcon: CircleHeadComponent;
	public borderImg: eui.Image;
	public holdCardScroller: eui.Scroller;

	/**
	 * 手里有牌状态显示 左边卡牌
	 */
	public haveCard1: eui.Image;
	public haveCard2: eui.Image;
	public haveCard3: eui.Image;
	public haveCard4: eui.Image;

	public vipGroup: eui.Group;
	public vipLabel: eui.Label;
	public infoLabel: eui.Label;
	public chipsLabel: eui.Label;
	public cardTypeBg: eui.Image;
	public chipsAnimLabel: eui.Label;
	/**
	 * 赢了的效果
	 */
	// public winEffectImg: eui.Image;
	/**
	 * 状态组
	 */
	public stateGroup: eui.Group;
	public stateImg: eui.Image;
	public stateLabel: eui.Label;

	private _cardFace1: CardFaceComponent;
	public parentPanel: GamblingPanel;
	/**
	 * 聊天group 
	*/
	public chatGroup: eui.Group;
	/**
	 * 聊天信息
	*/
	public chatLabel: eui.Label;
	/**
	 * 聊天遮罩
	*/
	public chatScroller: eui.Scroller;
	/**
	 * 表情
	*/
	public emojiImg: eui.Image;
	/**
	 * 语音group
	 */
	public voiceGroup: eui.Group;
	/**
	 * 语音长度
	 */
	public voiceTimeLabel: eui.Label;
	/**
	 * 语音显示
	 */
	public voiceShow: eui.Group;

	/**
	 * 卡牌1
	 */
	public get cardFace1(): CardFaceComponent
	{
		return this._cardFace1;
	}
	public _cardFace2: CardFaceComponent;
	/**
	 * 卡牌2
	 */
	public get cardFace2(): CardFaceComponent
	{
		return this._cardFace2;
	}
	private _cardFace3: CardFaceComponent;
	/**
	 * 卡牌3
	 */
	public get cardFace3(): CardFaceComponent
	{
		return this._cardFace3;
	}
	private _cardFace4: CardFaceComponent;
	/**
	 * 卡牌4
	 */
	public get cardFace4(): CardFaceComponent
	{
		return this._cardFace4;
	}
	/**
	 * 灰色遮罩图片
	 */
	public maskImg: eui.Image;
	/**
	 * 弃牌动画图片
	 */
	public foldBackCard: eui.Image;
	private _cdComponent: GamblingCdComponent;

	/**
	 * CD效果组件
	 */
	public get cdComponent(): GamblingCdComponent
	{
		if (!this._cdComponent)
		{
			this._cdComponent = new GamblingCdComponent(UIComponentSkinName.GamblingCdComponent);
			this._cdComponent.touchEnabled = this._cdComponent.touchChildren = false;
		}
		return this._cdComponent;
	}

	//转圈动画
	public turnAnim: CommonMoveToRelativelyPos;
	/**
	 * 弃牌动画
	 */
	private _foldCardAnim: FoldCardAnimation;

	private _nowState: BaseGamblingHeadState;
	/**
	 * 当前状态
	 */
	public get nowState(): BaseGamblingHeadState
	{
		return this._nowState;
	}
	/**
	 * 筹码组件控制
	 */
	public chipsSingleShowComponent: ChipsSingleShowComponent;
	/**
	 * 赢取筹码动画
	 */
	private _winChipsAnim: WinChipsAnim;
	/**
	 * 卡牌动画
	 */
	private _cardAnimationSpt: GamblingHeadCardAnimationSupport;
	public get cardAnimationSpt(): GamblingHeadCardAnimationSupport
	{
		return this._cardAnimationSpt;
	}
	/**
	 * 聊天
	*/
	private _headChatSpt: GamblingHeadChatSupport;

	//--------------------------状态控制------------------------------
	/**
	 * 空状态
	 */
	private _emptyState: GamblingHeadEmptyState;
	/**
	 * 等待下一局状态
	 */
	private _waitNextState: GamblingHeadWiatNextState;
	/**
	 * 弃牌状态
	 */
	private _foldState: GamblingHeadFoldState;
	/**
	 * 已说话状态
	 */
	private _actionedState: GamblingHeadActionedState;
	/**
	 * 等待说话状态
	 */
	private _waitActionState: GamblingHeadWaitActionState;
	/**
	 * 说话中状态
	 */
	private _onActionState: GamblingHeadOnActionState;
	/**
	 * 坐下状态
	 */
	private _sitDownState: GamblingHeadSitDownState;
	/**
	 * 一局开始
	 */
	private _roundStartState: GamblingHeadRoundStartState;
	/**
	 * 比牌状态
	 */
	private _thanTheCard: GamblingHeadThanTheCardState;


	//--------------------------状态控制 end------------------------------

	private _pitIndex: number;
	public get pitIndex(): number
	{
		return this._pitIndex;
	}

	private _flopIndex: number;
	/**
	 * 发牌索引
	 */
	public get flopIndex(): number
	{
		return this._flopIndex;
	}

	public set flopIndex(value: number)
	{
		this.showHaveCardImg(false);
		if (GamblingUtil.isOmaha)
		{
			if (value == 1)
			{
				this.haveCard1.visible = true;
			}
			else if (value == 2)
			{
				this.haveCard1.visible = this.haveCard2.visible = true;
			} else if (value == 3)
			{
				this.haveCard1.visible = this.haveCard2.visible = this.haveCard3.visible = true;
			} else if (value == 4)
			{
				this.haveCard1.visible = this.haveCard2.visible = this.haveCard3.visible = this.haveCard4.visible = true;
			}
		} else
		{
			if (value == 1)
			{
				this.haveCard2.visible = true;
			}
			else if (value == 2)
			{
				this.haveCard2.visible = this.haveCard3.visible = true;
			}
		}
		this._flopIndex = value;
	}

	/**
	 * 位置索引用于记录位置指向
	 */
	public posIndex: number;
	/**
	 * 最后赋值的角色ID，处理结算时候，玩家站起找不到结算的目标头像的问题
	 */
	public lastRoleId: number;
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maxWidth = 96;
		this.maxHeight = 150;
		this.stateGroup.visible = false;
		/**
		 * 坐下转动动画
		 */
		this.turnAnim = <CommonMoveToRelativelyPos>AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.CommonMoveToRelativelyPos);
		this.turnAnim.setTarget(this);

		this._emptyState = new GamblingHeadEmptyState(this);
		this._waitNextState = new GamblingHeadWiatNextState(this);
		this._foldState = new GamblingHeadFoldState(this);
		this._actionedState = new GamblingHeadActionedState(this);
		this._waitActionState = new GamblingHeadWaitActionState(this);
		this._onActionState = new GamblingHeadOnActionState(this);
		this._sitDownState = new GamblingHeadSitDownState(this);
		this._roundStartState = new GamblingHeadRoundStartState(this);
		this._thanTheCard = new GamblingHeadThanTheCardState(this);

		this._cardAnimationSpt = new GamblingHeadCardAnimationSupport(this);
		this._headChatSpt = new GamblingHeadChatSupport(this);

		// this._cdComponent.scaleX = 1.14;
		// this._cdComponent.scaleY = 1.14;

		// this.haveCard2.matrix = new egret.Matrix(0.498, 0.042, -0.042, 0.498, this.haveCard2.x, this.haveCard2.y);
		// this.haveCard3.matrix = new egret.Matrix(0.497, -0.05, 0.05, 0.497, this.haveCard3.x, this.haveCard3.y);
		this.maskImg.touchEnabled = false;

		this._cardFace1 = new CardFaceComponent(UIComponentSkinName.CardFaceComponent);
		this._cardFace2 = new CardFaceComponent(UIComponentSkinName.CardFaceComponent);
		this._cardFace3 = new CardFaceComponent(UIComponentSkinName.CardFaceComponent);
		this._cardFace4 = new CardFaceComponent(UIComponentSkinName.CardFaceComponent);
		let index: number = this.getChildIndex(this.maskImg);
		if (index < 0)
		{
			index = 0;
		}
		let showIndex: number = index - 2;
		this.addChildAt(this._cardFace1, showIndex);
		this.addChildAt(this._cardFace2, this.getChildIndex(this._cardFace1) + 1);
		this.addChildAt(this._cardFace3, this.getChildIndex(this._cardFace2) + 1);
		this.addChildAt(this._cardFace4, this.getChildIndex(this._cardFace3) + 1);
		this.dispatchEvent(new UIModuleEvent(UIModuleEvent.COMPLETE, game.StringConstants.Empty));
	}
	/**
	 * 默认初始化
	 */
	public init(data: PlayerInfo)
	{
		this.realInit(data, true)
	}
	/**
	 * 坐下初始化
	 */
	public sitDownInit(data: PlayerInfo)
	{
		this.realInit(data, false);
	}
	/**
	 * 执行初始化
	 */
	private realInit(data: PlayerInfo, isChangeState: boolean)
	{
		super.init(data);
		this.chatGroup.visible = false;
		this.emojiImg.visible = false;
		this.voiceGroup.visible = false;
		if (data)
		{
			this.playerGroup.visible = true;
			this.emptyGroup.visible = false;
			this.lastRoleId = data.roleId;
		}
		else
		{
			this.setEmpty();
			this.playerGroup.visible = false;
			this._cardAnimationSpt.clear();
			this.headIcon.clear();
		}
		//断线重连的问题 是自己且有手牌
		if (data)
		{
			if (data.roleId == UserManager.userInfo.id)
			{
				if (data.state == PlayerState.WaitNext) //断线重连如果是自己，则请求下一局 延长2S
				{
					//刚坐下来算自己，如果有刚好两个玩家则请求下一局
					if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList)
					{
						if (GamblingManager.roomInfo.playerList.length == 2)
						{
							if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && GamblingManager.matchRoomInfo.definition.type == MatchType.SNG)
							{
								this.sngReqNextRound();
							}
							else
							{
								game.Tick.AddTimeoutInvoke(this.tryReqNextRound, 2000, this);
							}
						}
						else
						{
							let isAllWaitNext: boolean = true;
							for (let sitPlayer of GamblingManager.roomInfo.playerList) //所有玩家都在等待下一局状态，则请求下一局
							{
								if (sitPlayer.state != PlayerState.WaitNext)
								{
									isAllWaitNext = false;
								}
							}
							if (isAllWaitNext)
							{
								if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && GamblingManager.matchRoomInfo.definition.type == MatchType.SNG)
								{
									this.sngReqNextRound();
								}
								else
								{
									game.Tick.AddTimeoutInvoke(this.tryReqNextRound, 2000, this);
								}
							}
						}
					}

				}
				// this.scaleX = this.scaleY = 1;
				if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.handCard)
				{
					this.showSelfHandlerCard();
				}
				else
				{
					game.Console.log("自己无手牌");
					this.showCardFace(false);
				}
			}
			else
			{
				this.showCardFace(false);
			}
		}
		else
		{
			// this.scaleX = this.scaleY = 0.885;
			this.showCardFace(false);
		}
		//显示有牌的逻辑处理
		if (data && data.roleId != UserManager.userInfo.id && GamblingUtil.isOnProcess(data))
		{
			//断线重连的问题 在牌桌上肯定手里有2张牌(奥马哈4张)
			if (GamblingUtil.isOmaha)
			{
				this.flopIndex = 4;
			} else
			{
				this.flopIndex = 2;
			}
			this.showHaveCardImg(true);
		}
		else
		{
			this.showHaveCardImg(false);
		}
		if (isChangeState)
		{
			let tmpState: GamblingHeadStateType;
			if (GamblingUtil.getIsOnAction(this.bindData))
			{
				tmpState = GamblingHeadStateType.OnAction;
				this.changeState(tmpState, false);
			}
			else
			{
				tmpState = this.getHeadStateByPlayerState();
				this.changeState(tmpState);
			}
		}
		this.showHead();
		this.showChipsComponent();
		this.showCardTypeBgFilter(0);
		this.chipsAnimLabel.visible = false;
		this._headChatSpt.initialize();
		this.refreshVip();
	}
	public setEmpty()
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.gamblingType == GamblingType.Match)
		{
			this.emptyGroup.visible = false;
		}
		else
		{
			if (this.bindData)
			{
				this.emptyGroup.visible = false;
			}
			else
			{
				this.emptyGroup.visible = true;
			}
		}
	}
	private tryReqNextRound()
	{
		GamblingManager.reqNextRoundStart();
	}
	private sngReqNextRound()
	{
		if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo))
		{
			let time: number = TimeManager.GetServerUtcTimestamp() - GamblingManager.matchRoomInfo.startTime;
			if (GamblingManager.matchRoomInfo.definition.type == MatchType.SNG && time <= GamblingManager.matchRoomInfo.definition.waitingTime)
			{ //坐满即玩比赛，比赛刚开始
				GamblingManager.sngNextRoundStart(GamblingManager.matchRoomInfo.definition.waitingTime - time);
			}
			else
			{
				GamblingManager.reqNextRoundStart();
			}
		}
	}
	//头像信息
	public showHead()
	{
		if (this.bindData)
		{
			this.headIcon.init(this.bindData, 90);
			this.headIcon.visible = true;
			this.borderImg.visible = true;
			if (this.bindData.userInfo)
			{
				if (this.bindData.userInfo.name)
				{
					if (this.bindData.userInfo.name.length > 3)
					{
						let size: number = game.CodeUtil.getStringByteLength(this.bindData.userInfo.name);
						if (size <= 9) //按一个汉字占3个字节算 3 * 3
						{
							this.infoLabel.text = this.bindData.userInfo.name;
						}
						else
						{
							this.infoLabel.text = this.bindData.userInfo.name.substr(0, 3) + "...";
						}
					}
					else
					{
						this.infoLabel.text = this.bindData.userInfo.name;
					}
				}
				else
				{
					this.infoLabel.text = game.StringConstants.Empty;
				}
				this.refreshVip();
			}
			else
			{
				this.infoLabel.text = game.StringConstants.Empty;
			}
		}
		else
		{
			this.headIcon.visible = false;
			this.borderImg.visible = false;
			this.infoLabel.text = game.StringConstants.Empty;
		}
	}

	private _chipsShowState: ChipsShowState = ChipsShowState.LeftDown;
	public refreshChipsShow(pitIndex: number, seatMode: SeatMode)
	{
		switch (seatMode)
		{
			case SeatMode.Three:
				if (pitIndex <= 2)
				{
					this._chipsShowState = ChipsShowState.RightDown;
				}
				else 
				{
					this._chipsShowState = ChipsShowState.LeftDown;
				}
				break;
			case SeatMode.Five:
				if (pitIndex <= 3)
				{
					this._chipsShowState = ChipsShowState.RightDown;
				}
				else 
				{
					this._chipsShowState = ChipsShowState.LeftDown;
				}
				break;
			case SeatMode.Nine:
				if (pitIndex <= 5)
				{
					this._chipsShowState = ChipsShowState.RightDown;
				}
				else 
				{
					this._chipsShowState = ChipsShowState.LeftDown;
				}
				break;
			case SeatMode.Six:
				if (pitIndex <= 3)
				{
					this._chipsShowState = ChipsShowState.RightDown;
				}
				else if (pitIndex == 4)
				{
					this._chipsShowState = ChipsShowState.LeftDown;
				}
				else if (pitIndex > 4)
				{
					this._chipsShowState = ChipsShowState.LeftDown;
				}
				break;
		}
		this.chipsSingleShowComponent.top = undefined;
		this.chipsSingleShowComponent.horizontalCenter = undefined;
		this.chipsSingleShowComponent.left = undefined;
		this.chipsSingleShowComponent.right = undefined;
		this.chipsSingleShowComponent.bottom = undefined;
		switch (this._chipsShowState)
		{
			case ChipsShowState.Top:
				this.chipsSingleShowComponent.horizontalCenter = 0;
				this.chipsSingleShowComponent.top = -94;
				break;
			case ChipsShowState.Left:
				this.chipsSingleShowComponent.right = this.width - 1;
				this.chipsSingleShowComponent.bottom = 7;
				break;
			case ChipsShowState.Right:
				this.chipsSingleShowComponent.left = this.width - 1;
				this.chipsSingleShowComponent.bottom = 7;
				break;
			case ChipsShowState.LeftDown:
				this.chipsSingleShowComponent.left = -55;
				this.chipsSingleShowComponent.bottom = 0;
				break;
			case ChipsShowState.RightDown:
				this.chipsSingleShowComponent.right = -55;
				this.chipsSingleShowComponent.bottom = 5;
				break;
		}
		this.showChipsComponent();
	}
	/**
	 * 设置坑位
	 */
	public setPit(pit: number)
	{
		this._pitIndex = pit;
	}
	/**
	 * 外部控制状态改变
	 */
	public changeState(headState?: GamblingHeadStateType, params?: any)
	{
		if (headState == undefined)
		{
			headState = this.getHeadStateByPlayerState();
		}
		let state: BaseGamblingHeadState = this.getHeadState(headState);
		this._nowState = state;
		this._nowState.run(params);
	}
	protected rendererStart(event: egret.Event)
	{
		super.rendererStart(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this._headChatSpt.onEnable();
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.headIcon.clear();
		this._headChatSpt.onDisable();
		game.Tick.RemoveTimeoutInvoke(this.hideWinEffect, this);
		game.Tick.RemoveTimeoutInvoke(this.tryReqNextRound, this);
		this._cardAnimationSpt.clear();
	}
	/**
 	* 隐藏全部
 	*/
	public hideAll()
	{
		// this.infoLabel.visible = false;
		// this.chipsLabel.visible = false;
		// this.winEffectImg.visible = false;
		this.showMask(false);
		this.foldBackCard.visible = false;
		this.hideCdComponent();
	}
	public hideCdComponent()
	{
		if (this.cdComponent.parent)
		{
			this.cdComponent.parent.removeChild(this.cdComponent);
		}
	}
	/**
	 * 显示卡牌牌面
	 */
	public showCardFace(flag: boolean)
	{
		this.cardFace1.visible = flag;
		this.cardFace2.visible = flag;
		this.cardFace3.visible = false;
		this.cardFace4.visible = false;
		if (GamblingUtil.isOmaha)
		{
			this.cardFace3.visible = flag;
			this.cardFace4.visible = flag;
		}
		if (this.bindData && this.bindData.roleId == UserManager.userInfo.id)
		{
			game.Console.log("显示隐藏自己的手牌：" + flag);
		}
	}
	/**
	 * 显示有牌状态
	 */
	public showHaveCardImg(flag: boolean)
	{
		if (flag) //显示的状态
		{
			this.showHaveCardImg(false);
			if (GamblingUtil.isOmaha)
			{
				if (this.flopIndex == 1)
				{
					this.haveCard1.visible = true;
				}
				else if (this.flopIndex == 2)
				{
					this.haveCard1.visible = this.haveCard2.visible = true;
				} else if (this.flopIndex == 3)
				{
					this.haveCard1.visible = this.haveCard2.visible = this.haveCard3.visible = true;
				} else if (this.flopIndex == 4)
				{
					this.haveCard1.visible = this.haveCard2.visible = this.haveCard3.visible = this.haveCard4.visible = true;
				}
			} else
			{
				if (this.flopIndex == 1)
				{
					this.haveCard2.visible = true;
				}
				else if (this.flopIndex == 2)
				{
					this.haveCard2.visible = this.haveCard3.visible = true;
				}
			}
		}
		else
		{
			this.haveCard1.visible = this.haveCard2.visible = this.haveCard3.visible = this.haveCard4.visible = flag;
		}
	}
	/**
	 * 显示基本的元素
	 */
	public showBase()
	{
		this.setEmpty();
		// this.infoLabel.visible = true;
		// this.chipsLabel.visible = true;
	}
	/**
	 * 赢取筹码动画
	 */
	public runWinChipsAnim(num: number)
	{
		if (!this._winChipsAnim)
		{
			this._winChipsAnim = <WinChipsAnim>AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.WinChips);
			this._winChipsAnim.setTarget(this.chipsAnimLabel);
		}
		this.chipsAnimLabel.text = "+" + game.MathUtil.formatNum(num);
		this.chipsAnimLabel.visible = true;
		this._winChipsAnim.run();
		SoundManager.playEffect(MusicAction.chipfly);
	}
	/**
	 * 弃牌动画
	 */
	public runFoldAnim(point: egret.Point)
	{
		if (!this._foldCardAnim)
		{
			this._foldCardAnim = <FoldCardAnimation>AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.FoldCard);
			this._foldCardAnim.setTarget(this.foldBackCard);
		}
		this._foldCardAnim.run(point);
	}
	/**
 	* 获取头像状态 根据人物状态
 	*/
	private getHeadStateByPlayerState(): GamblingHeadStateType
	{
		if (!this.bindData)
		{
			return GamblingHeadStateType.Empty;
		}
		switch (this.bindData.state)
		{
			case PlayerState.WaitNext: //等待下一局
				return GamblingHeadStateType.WaitNext;
			case PlayerState.Fold: //弃牌
				return GamblingHeadStateType.FoldCard;
			case PlayerState.Check:
			case PlayerState.Raise:
			case PlayerState.Call:
			case PlayerState.AllIn: //已说话
				return GamblingHeadStateType.Actioned;
			case PlayerState.Blind:
			case PlayerState.WaitAction: //等待说话
				return GamblingHeadStateType.WaitAction;
			default: //都没有则为等待下一局状态
				return GamblingHeadStateType.WaitNext;
		}
	}
	/**
	 * 获取头像的状态
	 */
	private getHeadState(state: GamblingHeadStateType): BaseGamblingHeadState
	{
		switch (state)
		{
			case GamblingHeadStateType.Empty:
				return this._emptyState;
			case GamblingHeadStateType.SitDown:
				return this._sitDownState;
			case GamblingHeadStateType.WaitNext:
				return this._waitNextState;
			case GamblingHeadStateType.RoundStart:
				return this._roundStartState;
			case GamblingHeadStateType.WaitAction:
				return this._waitActionState;
			case GamblingHeadStateType.OnAction:
				return this._onActionState;
			case GamblingHeadStateType.Actioned:
				return this._actionedState;
			case GamblingHeadStateType.FoldCard:
				return this._foldState;
			case GamblingHeadStateType.ThanTheCard:
				return this._thanTheCard;
		}
	}
	/**
 	* 显示自己的手牌
 	*/
	private showSelfHandlerCard()
	{
		this.showCardFace(true);
		this.cardFace1.init(GamblingManager.roomInfo.handCard[0]);
		this.cardFace2.init(GamblingManager.roomInfo.handCard[1]);
		this.cardFace1.initElementsShow2();
		this.cardFace2.initElementsShow2();

		if (GamblingManager.self.state == PlayerState.Fold)
		{
			this.cardFace1.maskImg.visible = true;
			this.cardFace2.maskImg.visible = true;
		}
		else
		{
			this.cardFace1.maskImg.visible = false;
			this.cardFace2.maskImg.visible = false;
		}

		if (GamblingUtil.isOmaha)
		{
			this.cardFace3.init(GamblingManager.roomInfo.handCard[2]);
			this.cardFace4.init(GamblingManager.roomInfo.handCard[3]);
			this.cardFace3.initElementsShow2();
			this.cardFace4.initElementsShow2();
			this.cardFace1.matrix = GamblingPanelSetting.handCardMatrix3;
			this.cardFace2.matrix = GamblingPanelSetting.handCardMatrix4;
			this.cardFace3.matrix = GamblingPanelSetting.handCardMatrix5;
			this.cardFace4.matrix = GamblingPanelSetting.handCardMatrix6;

			if (GamblingManager.self.state == PlayerState.Fold)
			{
				this.cardFace3.maskImg.visible = true;
				this.cardFace4.maskImg.visible = true;
			} else
			{
				this.cardFace3.maskImg.visible = false;
				this.cardFace4.maskImg.visible = false;
			}
		} else
		{
			this.cardFace1.matrix = GamblingPanelSetting.handCardMatrix1;
			this.cardFace2.matrix = GamblingPanelSetting.handCardMatrix2;
		}
	}
	public showChipsComponent(reNum?: number, isShowTween?: boolean)
	{
		if (!reNum && this.bindData)
		{
			reNum = this.bindData.num;
		}
		if (reNum > 0 && reNum != this.chipsSingleShowComponent.bindData)
		{
			this.chipsSingleShowComponent.init({ num: reNum, state: this._chipsShowState, isShowTween: isShowTween });
		}
		if (this.bindData && this.bindData.num > 0)
		{
			this.chipsSingleShowComponent.visible = true;
		}
		else
		{
			this.chipsSingleShowComponent.visible = false;
		}
	}
	/**
 	* 一局结束看看是否比牌或者亮牌
    */
	public roundOverHandler()
	{
		this.showHaveCardImg(false);
		if (this.bindData && GamblingManager.roundOverInfo && GamblingManager.roundOverInfo.handCardList && GamblingManager.roundOverInfo.potList) //看看是否切换到亮牌状态
		{
			let len: number = GamblingManager.roundOverInfo.handCardList.length;
			let handCardInfo: HandCardInfo;
			for (let i: number = 0; i < len; i++)
			{
				handCardInfo = GamblingManager.roundOverInfo.handCardList[i];
				if (this.bindData.roleId == handCardInfo.roleId && handCardInfo.cardList && handCardInfo.cardList.length > 1)
				{
					if (this.bindData.state != PlayerState.Fold)
					{
						if (this.bindData.roleId != UserManager.userInfo.id)
						{
							//比牌
							this.cardFace1.init(handCardInfo.cardList[0]);
							this.cardFace2.init(handCardInfo.cardList[1]);
							this.cardFace1.showMask(true);
							this.cardFace2.showMask(true);
							if (GamblingUtil.isOmaha)
							{
								this.cardFace3.init(handCardInfo.cardList[2]);
								this.cardFace4.init(handCardInfo.cardList[3]);
								this.cardFace3.showMask(true);
								this.cardFace4.showMask(true);
							}
							this.changeState(GamblingHeadStateType.ThanTheCard);
						}
					}
					else
					{
						this.runBrightCard(handCardInfo.cardList); //弃牌状态收到了手牌信息
					}
					break;
				}
			}
		}
	}
	/**
	 * 切换到亮牌
	 */
	public runBrightCard(list: Array<CardInfo>)
	{
		this.showMask(false);
		this.chipsLabel.text = PlayerInfo.getStateDes(PlayerState.ShowCard);
		this.showCardTypeBgFilter(3);
		this.showBase();
		this.chipsSingleShowComponent.visible = false;
		if (this.parent) //亮牌到最上显示
		{
			this.parent.addChildAt(this, GamblingManager.maxSeats);
		}
		//let cardInfo: CardInfo = new CardInfo();
		//cardInfo.card = new Array<number>();
		//cardInfo.card.push(1, 4);

		//this.cardFace1.init(cardInfo);
		//cardInfo = new CardInfo();
		//cardInfo.card = new Array<number>();
		//cardInfo.card.push(1, 7);
		//this.cardFace2.init(cardInfo);

		// this.cardAnimationSpt.runBrightCard(this.waitNext, this);
		this.cardFace1.init(list[0]);
		this.cardFace2.init(list[1]);
		if (GamblingUtil.isOmaha)
		{
			this.cardFace3.init(list[2]);
			this.cardFace4.init(list[3]);
		}
		this.cardAnimationSpt.runBrightCard(this.waitNext, this, this.bindData.roleId);
	}
	private waitNext()
	{

	}
	/**
	 * 部分状态不需要立即更新的显示筹码
	 */
	public showBankRoll()
	{
		if (this.bindData)
		{
			if (this.bindData.lastBankRoll != undefined)
			{
				if (this.bindData.bankRoll <= this.bindData.lastBankRoll)
				{
					this.chipsLabel.text = game.MathUtil.formatNum(this.bindData.bankRoll);
					//	game.QinLog.log("showBankRoll小于显示筹码：" + this.bindData.bankRoll + this.bindData.userInfo.name);
				}
			}
			else
			{
				this.chipsLabel.text = game.MathUtil.formatNum(this.bindData.bankRoll);
				//game.QinLog.log("showBankRoll显示筹码：" + this.bindData.bankRoll + this.bindData.userInfo.name);
			}
		}
	}
	/**
	 * 显示半透明黑色遮罩
	 */
	public showMask(flag: boolean)
	{
		if (this.maskImg)
		{
			this.maskImg.visible = flag;
		}
		else
		{
			game.Console.log("遮罩图片是空");
		}
	}
	/**
	 * 坐下转动完毕之后显示
	 */
	public showGroupAuto(isOffline: boolean)
	{
		this.showStateGroupAuto(isOffline);
		this.refreshChatGroup(); //刷新聊天位置
	}
	public showStateGroupAuto(isOffline?: boolean)
	{
		if (this.bindData)
		{
			switch (this.bindData.state)
			{
				case PlayerState.Call:
				case PlayerState.Raise:
				case PlayerState.Check:
				case PlayerState.AllIn:
				case PlayerState.Fold:
					this.refreshState(); //刷新状态组
					break;
				case PlayerState.WaitAction:
				case PlayerState.Blind:
					if (isOffline)
					{
						this.showStateGroup(false); //在一局结束和一圈结束延迟隐藏
					}
					break;
			}
		}
	}
	/**
	 * 显示状态组
	 */
	public showStateGroup(flag: boolean)
	{
		this.stateGroup.visible = flag;
		if (flag)
		{
			this.refreshStateGroupPos();
		}
		game.Console.log("状态组的visible:" + flag);
	}
	private refreshStateGroupPos()
	{
		if (this.posIndex <= GamblingPanelSetting.centerNum)
		{
			this.stateGroup.scaleX = this.stateLabel.scaleX = 1;
			this.stateGroup.x = 60;
			// this.stateLabel.x = 40.25;
		}
		else
		{
			this.stateGroup.scaleX = this.stateLabel.scaleX = -1;
			this.stateGroup.x = 32;
			// this.stateLabel.x = 91;
		}
	}
	/**
	 * 刷新状态显示
	 */
	public refreshState()
	{
		this.stateLabel.text = PlayerInfo.getStateDes(this.bindData.state);
		this.stateImg.source = PlayerInfo.getStateImgRes(this.bindData.state);
		this.showStateGroup(true);
	}
	/**
	 * 旋转完毕重新设置聊天气泡的位置
	 */
	private refreshChatGroup()
	{
		this._headChatSpt.setChatGroupPos();
	}
	public showCardTypeBgFilter(type: number)
	{
		switch (type)
		{
			case 1: //显示牌型 未赢牌
				this.cardTypeBg.alpha = 1;
				this.chipsLabel.textColor = 0x000000;
				this.cardTypeBg.source = SheetSubName.Gambling_Head_BgType_Normal;
				break;
			case 2: //显示牌型 赢牌
				this.cardTypeBg.alpha = 1;
				this.chipsLabel.textColor = 0x000000;
				this.cardTypeBg.source = SheetSubName.Gambline_Head_BgType_Win;
				break;
			case 3: //显示亮牌
				this.cardTypeBg.alpha = 1;
				this.chipsLabel.textColor = 0x000000;
				this.cardTypeBg.source = SheetSubName.Gambling_Head_BgType_Normal;
				break;
			default: //显示筹码
				this.cardTypeBg.alpha = 0.4;
				this.chipsLabel.textColor = 0xffffff;
				this.cardTypeBg.source = SheetSubName.Gambline_Head_BgType_Chips;
				this.hideWinEffect();
				break;
		}
	}
	/**
	 * 赢牌特效
	 */
	private _winEffect: particle.GravityParticleSystem;
	/**
	 * 显示赢牌特效
	 */
	public showWinEffect()
	{
		AnimationFactory.getParticleEffect(AnimationType.WinCard, this, (ptc) =>
		{
			this._winEffect = ptc;
		});
	}
	/**
	 * 隐藏赢牌特效
	 */
	private hideWinEffect()
	{
		if (this._winEffect && this._winEffect.parent)
		{
			this._winEffect.stop();
			this._winEffect.parent.removeChild(this._winEffect);
		}
	}
	/**
	 * 刷新vip
	 */
	private refreshVip()
	{
		this.vipGroup.visible = false;
		if (this.bindData && this.bindData.userInfo && this.bindData.userInfo.vipLevel > 0)
		{
			this.vipGroup.visible = true;
			this.vipLabel.text = "VIP" + this.bindData.userInfo.vipLevel.toString();
		}
	}
}