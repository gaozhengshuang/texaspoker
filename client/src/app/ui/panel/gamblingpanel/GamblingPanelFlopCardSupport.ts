/**
 * 发牌支持
 */
class GamblingPanelFlopCardSupport extends BaseGamblingPanelSupport
{
	private _flopRound: number;
	/**
	 * 发牌动画
	 */
	private _animation1: FlopCardAnimation;
	private _animation2: FlopCardAnimation;
	private _runPos: number;
	private _runIndex: number;
	private _animationIndex: number;

	private _flopPosList: Array<number>;
	private _isNextRoundStart: boolean;

	private _isOnOver: boolean;
	private _isOnFlop: boolean;

	public initialize()
	{
		super.initialize();
		this.target.flopCardImg1.visible = false;
		this.target.flopCardImg2.visible = false;
		if (!this._animation1)
		{
			this._animation1 = <FlopCardAnimation>AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.FlopCard);
			this._animation1.setTarget(this.target.flopCardImg1);
			this._animation2 = <FlopCardAnimation>AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.FlopCard);
			this._animation2.setTarget(this.target.flopCardImg2);
			this.target.flopCardImg1.scaleX = this.target.flopCardImg1.scaleY = 0.2;
			this.target.flopCardImg2.scaleX = this.target.flopCardImg2.scaleY = 0.2;
		}
		if (!this._flopPosList)
		{
			this._flopPosList = new Array<number>();
		}
		this._flopPosList.length = 0;
		this._isNextRoundStart = false;
	}
	public onEnable()
	{
		super.onEnable();
		GamblingManager.NextRoundStartEvent.addListener(this.nextRoundStartHandler, this);
		GamblingManager.ActionPosChangeEvent.addListener(this.actionPosChangeHandler, this);
		GamblingManager.RoundOverEvent.addListener(this.roundOverHandler, this);
	}
	public onDisable()
	{
		super.onDisable();
		GamblingManager.NextRoundStartEvent.removeListener(this.nextRoundStartHandler, this);
		GamblingManager.ActionPosChangeEvent.removeListener(this.actionPosChangeHandler, this);
		GamblingManager.RoundOverEvent.removeListener(this.roundOverHandler, this);
		this._cardList = undefined;
	}
	private nextRoundStartHandler()
	{
		this._isNextRoundStart = true;
		this._isOnOver = false;
	}
	/**
	 * 一局结束 处理小盲位置不足小盲allin，两家不发牌的问题。此时直接结算不会推送位置变更协议
	 */
	private roundOverHandler(data: any)
	{
		if (GamblingManager.roomInfo)
		{
			this.actionPosChangeHandler(data.handCard);
		}
		if(this._isOnFlop)
		{
			this.showSelfCard();
		}
		this._isOnOver = true;
	}
	private _cardList: Array<CardInfo>;
	private actionPosChangeHandler(cardList: Array<CardInfo>)
	{
		if (!this._isNextRoundStart)
		{
			return;
		}
		this._isNextRoundStart = false;
		if (!cardList)
		{
			qin.Console.log("手牌推送过来是空！");
		}
		if (this.isDisabled) //处理动画异步访问数据的问题
		{
			return;
		}
		this._cardList = cardList;
		this.target.flopCardImg1.visible = false;
		this.target.flopCardImg2.visible = false;
		this._flopRound = 0;
		this._runPos = 0;
		this._runIndex = 0;
		this._animationIndex = 0;

		for (let pitInfo of this.target.pitList)
		{
			pitInfo.headComponent.flopIndex = 0; //发牌计数清零
		}
		this._flopPosList.length = 0;
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList)
		{
			let tmpPos: number = GamblingUtil.sBlindPos;
			let pInfo: PlayerInfo;
			for (let i: number = 0; i < GamblingManager.roomInfo.playerList.length; i++)
			{
				pInfo = GamblingManager.getPlayerInfoByPos(tmpPos);
				if (pInfo && pInfo.state != PlayerState.WaitNext) //重构增购等待下一局的玩家不发牌
				{
					this._flopPosList.push(tmpPos);
				}
				pInfo = this.target.getNextPlayerInfo(tmpPos);
				if (pInfo) 
				{
					tmpPos = pInfo.pos;
				}
			}
			this._isOnFlop = true;
			qin.Console.log("开始发牌,玩家总数: " + this._flopPosList.length);
			this.runNext();
		}
		else
		{
			qin.Console.log("发牌时房间信息是空");
		}
	}
	private runNext()
	{
		if (this._isOnOver) //还没发完牌，收到了服务器的结算消息 ,两家小盲位不足一个小盲，直接allin
		{
			return;
		}
		if (this.isDisabled) //处理动画异步访问数据的问题
		{
			qin.Console.log("发牌runNext：isDisabled" + this._flopRound);
			return;
		}
		if (GamblingManager.roomInfo)
		{
			let headComponent: GamblingHeadComponent;
			let animation: FlopCardAnimation;
			if (this._runIndex == this._flopPosList.length)
			{
				qin.Console.log("发了一圈牌_flopRound: " + this._flopRound);
				this._flopRound++;
				this._runIndex = 0;
			}

			let totalHandCard: number;
			if (GamblingUtil.isOmaha)
			{
				totalHandCard = 4;
			} else
			{
				totalHandCard = 2
			}

			if (this._flopRound < totalHandCard)
			{
				this._runPos = this._flopPosList[this._runIndex];
				headComponent = this.target.getHeadComponent(this._runPos);
				this._runIndex++;
				this._animationIndex++;
				if (headComponent)
				{
					SoundManager.playEffect(MusicAction.fapai);
					animation = this.getAnimation();
					animation.run(new egret.Point(headComponent.x + headComponent.width / 2, headComponent.y + headComponent.height / 2), this.runOver, this, headComponent);
				}
				else
				{
					AlertManager.showAlert("发牌出现异常!");
					qin.Console.log("发牌异常！未找到发牌的头像组件 _runIndex： " + this._runIndex + " _animationIndex: " + this._animationIndex + " _runPos: " + this._runPos + " _flopPosList " + this._flopPosList);
					this.flopOver();
				}
				qin.Console.log(" 给玩家发牌玩家位置: " + this._runPos);
			}
			else
			{
				this.flopOver();
			}
		}
	}
	private flopOver()
	{
		this._isOnFlop = false;
		qin.Console.log("发牌结束");
		if (GamblingManager.roomInfo)
		{
			GamblingManager.roomInfo.isFlopCardOver = true;
		}
		// this.target.flopCardImg1.visible = false;
		// this.target.flopCardImg2.visible = false;
		this.showSelfCard();
		GamblingManager.FlopCardOverEvent.dispatch();
		//执行action
	}
	private showSelfCard()
	{
		if (GamblingManager.self)
		{
			let headComponent: GamblingHeadComponent = this.target.getHeadComponent(GamblingManager.self.pos);
			if (headComponent && headComponent.bindData.roleId == UserManager.userInfo.roleId && this._cardList && this._cardList.length > 1)
			{
				headComponent.showHaveCardImg(false); //显示自己的手牌
				headComponent.cardFace1.init(this._cardList[0]);
				headComponent.cardFace2.init(this._cardList[1]);
				headComponent.cardFace1.initElementsShow2();
				headComponent.cardFace2.initElementsShow2();

				if (GamblingUtil.isOmaha)
				{
					headComponent.cardFace3.init(this._cardList[2]);
					headComponent.cardFace4.init(this._cardList[3]);
					headComponent.cardFace3.initElementsShow2();
					headComponent.cardFace4.initElementsShow2();
				}

				headComponent.cardAnimationSpt.runSelfCard(this.showCardType, this);
			}
		}
	}
	private runOver(params: GamblingHeadComponent)
	{
		if (this.isDisabled) //处理动画异步访问数据的问题
		{
			qin.Console.log("发牌Disabled");
			return;
		}
		let name: string = qin.StringConstants.Empty;
		let pos: number = -1;
		if (params.bindData && params.bindData.userInfo)
		{
			name = params.bindData.userInfo.name;
			pos = params.bindData.pos;
		}
		qin.Console.log("发了一张牌玩家：" + name + " posIndex: " + params.posIndex + " pos: " + pos);
		params.flopIndex++;
		//是自己
		this.runNext();
	}
	private showCardType()
	{
		//this.target.cardTypeGroup.visible = true;
	}
	/**
	 * 获取动画
	 */
	private getAnimation(): FlopCardAnimation
	{
		if (this._animationIndex % 2 == 1)
		{
			this.target.flopCardImg1.visible = true;
			return this._animation1;
		}
		else
		{
			this.target.flopCardImg2.visible = true;
			return this._animation2;
		}
	}
}