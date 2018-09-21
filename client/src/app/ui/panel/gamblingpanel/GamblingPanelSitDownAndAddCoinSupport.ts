/**
 * 坐下/增加金币 逻辑支持
 */
class GamblingPanelSitDownAndAddCoinSupport extends BaseGamblingPanelSupport
{
	public initialize()
	{
		super.initialize();
	}
	public onEnable()
	{
		super.onEnable();
		for (let pit of this.target.pitList) 
		{
			pit.headComponent.headIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
			pit.headComponent.emptyGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
		}
		this.target.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyTapHandler, this);
	}
	public onDisable()
	{
		super.onDisable();
		for (let pit of this.target.pitList) 
		{
			pit.headComponent.headIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
			pit.headComponent.emptyGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
		}
		this.target.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buyTapHandler, this);
	}
	private pitTouchHandler(event: egret.TouchEvent)
	{
		if (this.target.moveTouchEnd(event))
		{
			return;
		}
		SoundManager.playEffect(MusicAction.buttonClick);
		let headComponent: GamblingHeadComponent;
		if (event.currentTarget.parent instanceof GamblingHeadComponent) //空组
		{
			headComponent = event.currentTarget.parent as GamblingHeadComponent;
		}
		else if (event.currentTarget.parent.parent instanceof GamblingHeadComponent) //头像
		{
			headComponent = event.currentTarget.parent.parent as GamblingHeadComponent;
		}

		for (let pit of this.target.pitList) 
		{
			if (pit.headComponent == headComponent && GamblingManager.roomInfo)
			{
				if (headComponent.bindData == null)
				{
					if (GamblingManager.self)
					{
						if (GamblingManager.roomInfo.gamblingType != GamblingType.Match) //比赛不能邀请好友
						{
							UIManager.showPanel(UIModuleName.InviteFriendPanel);
						}
					}
					else
					{
						let pos: number = this.target.getPlayerPos(pit);
						let bBuy: number = 0;
						if (GamblingManager.roomInfo.definition.bBuyin == undefined) //无上限模式处理
						{
							bBuy = Number.MAX_VALUE;
						}
						else
						{
							bBuy = GamblingManager.roomInfo.definition.bBuyin;
						}
						let maxNum: number = Math.min(bBuy, UserManager.userInfo.gold);
						let minNum: number = GamblingManager.roomInfo.definition.sBuyin;
						let bBlind: number = GamblingManager.roomInfo.bBlind;
						maxNum = Math.max(maxNum, minNum);
						let isGoldInsufficient: boolean = UserManager.userInfo.gold < minNum;
						UIManager.showPanel(UIModuleName.BuyAccessGamePanel, { isGoldInsufficient: isGoldInsufficient, bbBuyIn: bBuy, isAddCoin: false, maxNum: maxNum, minNum: minNum, bBlind: bBlind, pos: pos });
					}
				}
				else
				{
					UserManager.reqShowOtherUserInfoPanel(headComponent.bindData.roleid);
				}
				break;
			}
		}
	}
	private buyTapHandler(event: egret.TouchEvent)
	{
		let type: GamblingType = GamblingType.Common;
		if (GamblingManager.roomInfo)
		{
			type = GamblingManager.roomInfo.gamblingType;
		}
		if (GamblingManager.self && type != GamblingType.Match) //已在座位上
		{
			let maxNum: number = GamblingManager.self.bankroll + UserManager.userInfo.gold;
			maxNum = Math.min(GamblingManager.roomInfo.definition.bBuyin, maxNum);
			let minNum: number = GamblingManager.self.bankroll;
			let bBlind: number = GamblingManager.roomInfo.bBlind;
			if (maxNum == 0)
			{
				maxNum = GamblingManager.roomInfo.definition.bBuyin;
			}
			if (minNum == 0)
			{
				minNum = GamblingManager.roomInfo.definition.sBuyin;
			}
			if (minNum >= maxNum)
			{
				//UIManager.showFloatTips("金币已达上限！");
				//return;
				minNum = maxNum;
			}
			UIManager.showPanel(UIModuleName.BuyAccessGamePanel, { isAddCoin: true, bbBuyIn: GamblingManager.roomInfo.definition.bBuyin, maxNum: maxNum, minNum: minNum, bBlind: bBlind });
		}
		else
		{
			UIManager.showPanel(UIModuleName.ShoppingPanel, { prevPanelName: UIModuleName.GamblingPanel });
		}
	}
	public clear()
	{
		super.clear();
	}
}