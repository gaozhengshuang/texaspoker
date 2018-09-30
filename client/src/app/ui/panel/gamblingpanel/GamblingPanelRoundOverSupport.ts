/**
 * 牌局结算支持
 */
class GamblingPanelRoundOverSupport extends BaseGamblingPanelSupport
{
	private _runIndex: number = 0;
	private _isNextRoundStart: boolean = false;
	private _isClientOver: boolean = false;
	private _rebuyAddonTimeGap: number = 4000;
	private _isChecedkRebuyAddon: boolean = false;

	public initialize()
	{
		super.initialize();
		this._isNextRoundStart = false;
		this._isClientOver = false;
		this._isChecedkRebuyAddon = false;
	}
	public onEnable()
	{
		super.onEnable();
		GamblingManager.NextRoundStartEvent.addListener(this.nextRoundStartHandler, this);
		GamblingManager.RoundOverEvent.addListener(this.roundOverHandler, this);
		GamblingManager.SomeBodyBrightCardEvent.addListener(this.brightCardHandler, this);
	}
	public onDisable()
	{
		super.onDisable();
		game.Tick.RemoveTimeoutInvoke(this.reqNextRoundStart, this);
		game.Tick.RemoveTimeoutInvoke(this.delayRunNext, this);
		game.Tick.RemoveTimeoutInvoke(this.delayRoundOver, this);
		game.Tick.RemoveTimeoutInvoke(this.checkRebuyAddon, this);
		GamblingManager.NextRoundStartEvent.removeListener(this.nextRoundStartHandler, this);
		GamblingManager.RoundOverEvent.removeListener(this.roundOverHandler, this);
		GamblingManager.SomeBodyBrightCardEvent.removeListener(this.brightCardHandler, this);
	}
	private roundOverHandler()
	{
		game.Tick.AddTimeoutInvoke(this.checkRebuyAddon, this._rebuyAddonTimeGap, this);
		this._isClientOver = false;
		this._isNextRoundStart = false;
	}
	private brightCardHandler(data: any)
	{
		let info: HandCardInfo = data.info;

		let headCom: GamblingHeadComponent = this.target.getHeadComponentByRole(info.roleId);
		if (data.allin)
		{
			if (headCom)
			{
				headCom.allinShowHand(info.cardList)
			}
		}
		else
		{
			if (this._isNextRoundStart == false && headCom && info.cardList && info.cardList.length > 1)
			{
				headCom.runBrightCard(info.cardList);
			}
			else
			{
				game.Console.log("推送玩家主动亮牌异常！未找到玩家所在的位子的头像组件，roleId:" + info.roleId + "---card:" + info.cardList);
			}
		}
	}
	private checkRebuyAddon()
	{
		if (GamblingUtil.isMtt && this._isChecedkRebuyAddon == false)
		{
			game.Console.log("超时检查重构增购");
			this._isChecedkRebuyAddon = true;
			this.target.checkRebuyAddon();
		}
	}
	private nextRoundStartHandler(cardList: Array<CardInfo>)
	{
		this._isNextRoundStart = true;

		if (GamblingManager.self && GamblingManager.self.state != PlayerState.WaitNext) //兼容异常处理
		{
			this.target.actionGroup.showImmediatelyBrightCardBtn(false);
		}
		if (this._isClientOver == false) //如果客户端结算完成已经清理过了则不清理
		{
			game.Console.log("服务器推送下一局开始，执行清理!");
			this.readyStart();
			this._isClientOver = true;
		}
		this._isChecedkRebuyAddon = false;
		this.target.waitNextRoundComponent.show(false);
	}
	public startRunRoundOverOper()
	{
		if (this.isDisabled) //处理动画异步访问数据的问题
		{
			return;
		}
		game.Console.log("开始跑结算筹码动画");
		// this.target.actionGroup.hideAll(true);
		if (GamblingManager.roundOverInfo && GamblingManager.roundOverInfo.potList)
		{
			this.showAllCardType();
			this._runIndex = 0;
			this.runNext();
		}
	}
	private runNext()
	{
		if (this.isDisabled) //处理动画异步访问数据的问题
		{
			return;
		}
		if (!GamblingManager.roundOverInfo || !GamblingManager.roundOverInfo.potList)
		{
			if (!GamblingManager.roundOverInfo)
			{
				game.Console.log("结算异常：结算信息空");
			}
			if (GamblingManager.roundOverInfo && !GamblingManager.roundOverInfo.potList)
			{
				game.Console.log("结算异常：结算底池空");
			}
			return;
		}
		if (GamblingUtil.isOmaha)
		{
			for (let player of GamblingManager.roomInfo.playerList)
			{
				let headCom: GamblingHeadComponent = this.target.getHeadComponent(player.pos);
				if (headCom)
				{
					for (let j: number = 1; j <= GamblingManager.OmahaHandCardNum; j++)
					{
						let cardCom: CardFaceComponent = headCom['cardFace' + j];
						if (cardCom)
						{
							cardCom.showMaxFlag(false);
						}
					}
				}
			}
		}
		let headComponent: GamblingHeadComponent;
		let pInfo: PlayerInfo;
		let pointList: Array<egret.Point> = new Array<egret.Point>();
		let potAwardInfo: PotAwardInfo = GamblingManager.roundOverInfo.potList[this._runIndex];

		if (potAwardInfo && potAwardInfo.roleId)
		{
			for (let roleId of potAwardInfo.roleId)
			{
				pInfo = GamblingManager.getPlayerInfo(roleId);
				if (pInfo)
				{
					headComponent = this.target.getHeadComponent(pInfo.pos); //先通过用户信息找
				}
				if (!headComponent)
				{
					headComponent = this.target.getHeadComponentByLastRoleId(roleId); //找不到则找最后一个roleid缓存容错
				}
				if (headComponent)
				{
					if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.publicCard && GamblingManager.roomInfo.publicCard.length >= GamblingManager.MaxBoardNum)
					{
						this.showCardMaskImg(roleId, headComponent); //公共牌有最后一张尝试显示牌型
					}
					else
					{
						if (GamblingUtil.isWin(roleId))
						{
							if (roleId == UserManager.userInfo.roleId)
							{
								SoundManager.playEffect(MusicAction.win);
							}
							headComponent.chipsLabel.text = "赢";
							headComponent.showCardTypeBgFilter(2);
							headComponent.showWinEffect();
							if (roleId == UserManager.userInfo.roleId)
							{
								this.target.winAnimeGroup.visible = true;
								this.showWinAnime();
								this.showWinEffect();
							}
						}
					}
					// if (roleId == UserManager.userInfo.roleId)
					// {
					// 	pointList.push(new egret.Point(headComponent.x + headComponent.maxWidth / 2, headComponent.y + headComponent.maxHeight / 2));
					// }
					// else
					// {
					//30为一个筹码的宽度 15为30/2
					pointList.push(new egret.Point(headComponent.x + headComponent.headIcon.maxWidth / 2 - 15, headComponent.y + headComponent.playerGroup.y + headComponent.headIcon.maxHeight / 2 - 15));
					// }
				}
			}
		}
		let dataList: Array<any> = this.target.potChipsGroup["dataList"];
		if (dataList && dataList.length > 0 && pointList.length > 0)
		{
			let chipsShowComponent1: ChipsShowComponent;
			let chipsShowComponent2: ChipsShowComponent;
			// for (let i: number = this.target.chipsBgGroup.numChildren - 1 - this._runIndex; i >= 0; i--)
			// {
			let index: number = this.target.chipsBgGroup.numChildren - 1 - this._runIndex;
			if (index < 0)
			{
				index = 0;
			}
			chipsShowComponent1 = this.target.chipsBgGroup.getChildAt(index) as ChipsShowComponent;
			chipsShowComponent2 = this.target.chipsNumGroup.getChildAt(index) as ChipsShowComponent;
			// if (chipsShowComponent2.bindData.num == potAwardInfo.num)
			// {
			for (let targetPoint of pointList)
			{
				targetPoint.x -= this.target.potChipsGroup.x + chipsShowComponent1.x;
				targetPoint.y -= this.target.potChipsGroup.y + chipsShowComponent1.y;
			}
			chipsShowComponent1.winChipsTween(pointList, this.runOver, this);
			chipsShowComponent2.winChipsTween(pointList, undefined, undefined);
			// game.QinLog.log("唯一编码：", chipsShowComponent1.hashCode, "chipsShowComponent2", chipsShowComponent2.hashCode);
			// }
			// }
		}
		else
		{
			this.runOver();
		}
	}
	private runOver()
	{
		if (this.isDisabled) //处理动画异步访问数据的问题
		{
			return;
		}
		if (GamblingManager.roundOverInfo)
		{
			let potAwardInfo: PotAwardInfo = GamblingManager.roundOverInfo.potList[this._runIndex];
			if (potAwardInfo)
			{
				let roleId: number[] = potAwardInfo.roleId;
				if (!roleId)
				{
					roleId = [-1];
				}
				let wiNum: number = Math.floor(potAwardInfo.num / roleId.length);
				let headComponent: GamblingHeadComponent;
				let roleIdNum: number;
				for (let i: number = 0; i < roleId.length; i++)
				{
					roleIdNum = roleId[i];
					if (roleIdNum == -1)
					{
						headComponent = this.target.getHeadComponent(1);
					}
					else
					{
						headComponent = this.target.getHeadComponentByRole(roleId[i]);
					}
					if (!headComponent)
					{
						headComponent = this.target.getHeadComponentByLastRoleId(roleId[i]);
					}
					if (headComponent)
					{
						headComponent.runWinChipsAnim(wiNum);
						// headComponent.winEffectImg.visible = true;
						if (headComponent.bindData && headComponent.bindData.bankRoll > 0)
						{
							// headComponent.chipsLabel.text = game.MathUtil.formatNum(headComponent.bindData.bankRoll);
							if (headComponent.bindData.userInfo)
							{
								game.Console.log("结算结束显示筹码" + headComponent.bindData.bankRoll + headComponent.bindData.userInfo.name);
							}
						}
					}
				}
			}
		}
		game.Tick.AddTimeoutInvoke(this.delayRunNext, 1500, this);
	}
	private delayRunNext()
	{
		if (GamblingManager.roundOverInfo)
		{
			this._runIndex++;
			if (this._runIndex < GamblingManager.roundOverInfo.potList.length)
			{
				this.runNext();
			}
			else
			{
				this.target.waitNextRoundComponent.show(true);
				game.Tick.AddTimeoutInvoke(this.delayRoundOver, 1200, this);
			}
		}
	}
	private delayRoundOver(data: any)
	{
		if (this._isNextRoundStart == false) //此时服务器已经推送了下一局开始，客户端的结算由于延迟才执行到这里，做个标记忽略以下代码块执行
		{
			game.Console.log("客户端请求下一局!执行清理");
			this._isClientOver = true;
			this.readyStart();
			game.Tick.AddTimeoutInvoke(this.reqNextRoundStart, 1000, this);
		}
	}
	/**
	 * 准备开始
	 */
	private readyStart()
	{
		this.nextStartClear();
		if (GamblingManager.self && GamblingManager.self.state != PlayerState.WaitNext)
		{
			this.target.actionGroup.showImmediatelyBrightCardBtn(false);
		}
		for (let pitInfo of this.target.pitList)
		{
			pitInfo.headComponent.showCardFace(false);
			pitInfo.headComponent.showBankRoll(); //显示筹码
			pitInfo.headComponent.showHaveCardImg(false);
			//pitInfo.headComponent.showCardTypeBgFilter(0);
			if (pitInfo.headComponent.bindData && pitInfo.headComponent.bindData.state == PlayerState.WaitNext && GamblingUtil.isMtt)
			{
				pitInfo.headComponent.changeState(GamblingHeadStateType.WaitNext); //锦标赛中重构等待下一局的玩家状态是等待下一局
			}
			else
			{
				pitInfo.headComponent.changeState(GamblingHeadStateType.RoundStart);
			}
		}
		if (GamblingUtil.isMtt) 
		{
			if (this._isChecedkRebuyAddon == false)
			{
				this._isChecedkRebuyAddon = true;
				this.target.checkRebuyAddon();
			}
		}
		else
		{
			GamblingManager.checkBust();
		}
	}
	private reqNextRoundStart()
	{
		if (this.isDisabled) //处理动画异步访问数据的问题
		{
			return;
		}
		// for (let i: number = 0; i < this.target.chipsBgGroup.numChildren; i++)
		// {
		// 	let chipsShowComponent1: ChipsShowComponent = this.target.chipsBgGroup.getChildAt(i) as ChipsShowComponent;
		// 	let chipsShowComponent2: ChipsShowComponent = this.target.chipsNumGroup.getChildAt(i) as ChipsShowComponent;
		// 	chipsShowComponent1.clear();
		// 	chipsShowComponent2.clear();
		// }
		GamblingManager.reqNextRoundStart(); //请求3601
	}
	private nextStartClear()
	{
		this.target.clearPotChips();
		let len: number = this.target.cardList.length;
		for (let i: number = 0; i < len; i++)
		{
			this.target.cardList[i].visible = false;
		}
		this.target.cardTypeGroup.visible = false;
		if (GamblingUtil.isOmaha)
		{
			this.target.cardTypeComp.init(CardType.None);
		}
		this.target.potLabel.text = game.MathUtil.formatNum(0); //清理底池显示
		this.hideWinEffect();
	}
	/**
	 * 显示灰暗
	 */
	private showCardMaskImg(roleId: number, headComponent: GamblingHeadComponent)
	{
		let matchResult: boolean;
		// matchResult = CardTypeMatchUtil.matchCardInRoom(GamblingManager.roomInfo.handCardList);
		// headComponent.infoLabel.text = CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
		if (GamblingManager.roundOverInfo.handCardList)
		{
			for (let cardInfo of GamblingManager.roundOverInfo.handCardList)
			{
				if (cardInfo.roleId == roleId)
				{
					game.Console.log("显示牌型!");
					if (GamblingUtil.isOmaha)
					{
						matchResult = CardTypeMatchUtil.OmahaMatchCardInRoom(cardInfo.cardList);
					} else
					{
						matchResult = CardTypeMatchUtil.matchCardInRoom(cardInfo.cardList);
					}
					if (GamblingUtil.isWin(cardInfo.roleId))
					{
						headComponent.showWinEffect();
						if (cardInfo.roleId == UserManager.userInfo.roleId)
						{
							this.target.winAnimeGroup.visible = true;
							this.showWinAnime();
							this.showWinEffect();
						}
					}
					//headComponent.infoLabel.text = CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
					// headComponent.chipsLabel.text = CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
					// if (GamblingUtil.isWin(cardInfo.roleId))
					// {
					// 	headComponent.showCardTypeBgFilter(2);
					// }
					// else
					// {
					// 	headComponent.showCardTypeBgFilter(1);
					// }
					// headComponent.chipsBgImg.filters //变更滤镜颜色 做个非自己判断
					break;
				}
			}
		}
		if (!matchResult)
		{
			if (GamblingUtil.isWin(UserManager.userInfo.roleId))
			{
				SoundManager.playEffect(MusicAction.win);
				headComponent.showWinEffect();
				this.target.winAnimeGroup.visible = true;
				this.showWinAnime();
				this.showWinEffect();
			}
			return;
		}
		if (GamblingUtil.isWin(UserManager.userInfo.roleId))
		{
			SoundManager.playWinSoundEffect(CardTypeMatchUtil.cardType);
		}
		let len: number = this.target.cardList.length;
		let card: CardFaceComponent;

		headComponent.cardFace1.showMask(true);
		headComponent.cardFace2.showMask(true);
		if (GamblingUtil.isOmaha)
		{
			headComponent.cardFace3.showMask(true);
			headComponent.cardFace4.showMask(true);
		}
		for (let i: number = 0; i < len; i++)
		{
			card = this.target.cardList[i];
			if (card.visible)
			{
				card.showMask(true);
				card.showMaxFlag(false);
			}
		}

		for (let resultInfo of CardTypeMatchUtil.resultList)
		{
			for (let i: number = 0; i < len; i++)
			{
				card = this.target.cardList[i];
				if (card.visible && card.bindData)
				{
					if (resultInfo.card[2] == 1 && resultInfo.card[0] == card.bindData.card[0] && resultInfo.card[1] == card.bindData.card[1])
					{
						card.showMask(false);
						if (GamblingUtil.isOmaha)
						{
							card.showMaxFlag(true);
						}
						break;
					}
				}
			}
			if (resultInfo.card[2] == 1 && headComponent.cardFace1.bindData &&
				resultInfo.card[0] == headComponent.cardFace1.bindData.card[0] && resultInfo.card[1] == headComponent.cardFace1.bindData.card[1])
			{
				headComponent.cardFace1.showMask(false);
				if (GamblingUtil.isOmaha)
				{
					headComponent.cardFace1.showMaxFlag(true);
				}
			}
			if (resultInfo.card[2] == 1 && headComponent.cardFace2.bindData &&
				resultInfo.card[0] == headComponent.cardFace2.bindData.card[0] && resultInfo.card[1] == headComponent.cardFace2.bindData.card[1])
			{
				headComponent.cardFace2.showMask(false);
				if (GamblingUtil.isOmaha)
				{
					headComponent.cardFace2.showMaxFlag(true);
				}
			}
			if (GamblingUtil.isOmaha)
			{
				if (resultInfo.card[2] == 1 && headComponent.cardFace3.bindData &&
					resultInfo.card[0] == headComponent.cardFace3.bindData.card[0] && resultInfo.card[1] == headComponent.cardFace3.bindData.card[1])
				{
					headComponent.cardFace3.showMask(false);
					headComponent.cardFace3.showMaxFlag(true);
				}
				if (resultInfo.card[2] == 1 && headComponent.cardFace4.bindData &&
					resultInfo.card[0] == headComponent.cardFace4.bindData.card[0] && resultInfo.card[1] == headComponent.cardFace4.bindData.card[1])
				{
					headComponent.cardFace4.showMask(false);
					headComponent.cardFace4.showMaxFlag(true);
				}
			}
		}
	}
	/**
	 * 结算立即显示所有人的牌型
	 */
	private showAllCardType()
	{
		if (GamblingManager.roundOverInfo.handCardList)
		{
			let headComponent: GamblingHeadComponent;
			for (let cardInfo of GamblingManager.roundOverInfo.handCardList)
			{
				if (GamblingUtil.isOmaha)
				{
					CardTypeMatchUtil.OmahaMatchCardInRoom(cardInfo.cardList);
				} else
				{
					CardTypeMatchUtil.matchCardInRoom(cardInfo.cardList);
				}
				headComponent = this.target.getHeadComponentByRole(cardInfo.roleId);
				if (headComponent)
				{
					if (GamblingUtil.isWin(cardInfo.roleId))
					{
						headComponent.showCardTypeBgFilter(2);
						headComponent.chipsLabel.text = CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
					}
					else
					{
						if (headComponent.bindData && headComponent.bindData.state != PlayerState.Fold)
						{
							headComponent.showCardTypeBgFilter(1);
							headComponent.chipsLabel.text = CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
						}
					}
				}
				else
				{
					game.Console.log("显示牌型失败！未找到roleid：", cardInfo.roleId, "的头像组件！");
				}
			}
		}
	}
	/**
	 * 赢牌特效
	 */
	private _winEffect1: particle.GravityParticleSystem;
	private _winEffect2: particle.GravityParticleSystem;
	private _winEffect3: particle.GravityParticleSystem;
	/**
	 * 显示赢牌特效
	 */
	private showWinEffect()
	{
		AnimationFactory.getParticleEffect(AnimationType.WinCard2, this.target.winAnimeGroup, (ptc) =>
		{
			this._winEffect1 = ptc;
		});
		game.Tick.AddTimeoutInvoke(this.showWinEffect2, 150, this);
		game.Tick.AddTimeoutInvoke(this.showWinEffect3, 300, this);
	}
	private showWinEffect2()
	{
		AnimationFactory.getParticleEffect(AnimationType.WinCard3, this.target.winAnimeGroup, (ptc) =>
		{
			this._winEffect2 = ptc;
		});
	}
	private showWinEffect3()
	{
		AnimationFactory.getParticleEffect(AnimationType.WinCard4, this.target.winAnimeGroup, (ptc) =>
		{
			this._winEffect3 = ptc;
		});
	}
	/**
	 * 隐藏赢牌特效
	 */
	private hideWinEffect()
	{
		if (this._winEffect1 && this._winEffect1.parent)
		{
			this._winEffect1.stop();
			this._winEffect1.parent.removeChild(this._winEffect1);
		}
		if (this._winEffect2 && this._winEffect2.parent)
		{
			this._winEffect2.stop();
			this._winEffect2.parent.removeChild(this._winEffect2);
		}
		if (this._winEffect3 && this._winEffect3.parent)
		{
			this._winEffect3.stop();
			this._winEffect3.parent.removeChild(this._winEffect3);
		}
	}
	/**
	 * 显示赢牌动画
	 */
	private showWinAnime()
	{
		egret.Tween.removeTweens(this.target.winImg1);
		egret.Tween.removeTweens(this.target.winImg2);
		egret.Tween.removeTweens(this.target.winImg3);
		egret.Tween.get(this.target.winImg1).set({ scaleX: 0, scaleY: 0 }).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
		egret.Tween.get(this.target.winImg2).set({ scaleX: 0, scaleY: 0 }).wait(150).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
		egret.Tween.get(this.target.winImg3).set({ scaleX: 0, scaleY: 0 }).wait(300).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
		game.Tick.AddTimeoutInvoke(this.hideWinAnime, 2000, this);
	}
	/**
	 * 赢牌隐藏动画
	 */
	private hideWinAnime()
	{
		egret.Tween.removeTweens(this.target.winAnimeGroup);
		let callback: Function = function ()
		{
			this.target.winAnimeGroup.y = 770;
			this.target.winAnimeGroup.alpha = 1;
			this.target.winAnimeGroup.visible = false;
		}
		egret.Tween.get(this.target.winAnimeGroup).set({ y: 770, alpha: 1 }).to({ y: 750, alpha: 0 }, 300).call(callback, this);
	}
}