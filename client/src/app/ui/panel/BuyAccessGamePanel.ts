/**
 * 买入游戏面板
 */
class BuyAccessGamePanel extends BasePanel
{
	public unEnoughGoldGp: eui.Group;
	public buyAccessGp: eui.Group;
	public currentProperty: eui.Label;
	public countLable: eui.Label;
	public smallestLabel: eui.Label;
	public biggestLabel: eui.Label;
	public buyAccessHs: eui.HSlider;
	public autoBuyCheck: eui.CheckBox;
	public shoppingBtn: eui.Button;
	public buyAccessBtn: eui.Button;
	public priceLabel: eui.Label;
	public goldLabel: eui.Label;
	public buyNowBtn: eui.Button;
	public addCoinTitle: eui.Image;
	public buyTitle: eui.Image;
	public bankruptcyImage: eui.Image;
	public insufficientImage: eui.Image;
	public backButton: eui.Button;
	private _shopInfo: ShopInfo;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.BuyAccessGamePanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		this.isCloseButtonTween = false;
		this.isMaskClickClose = true;
		this.maskAlpha = 0.5;
		super.onAwake(event);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		if (appendData.isGoldInsufficient) //UserManager.userInfo.gold < appendData.minNum || 
		{
			this.buyAccessGp.visible = false;
			this.unEnoughGoldHandle(appendData.minNum);
			this.unEnoughGoldGp.visible = true;
			if (appendData.isBankruptcy)
			{
				this.bankruptcyImage.visible = true;
				this.insufficientImage.visible = false;
			}
			else
			{
				this.bankruptcyImage.visible = false;
				this.insufficientImage.visible = true;
			}
		}
		else
		{
			this.unEnoughGoldGp.visible = false;
			this.buyAccessGp.visible = true;
			this.smallestLabel.text = game.MathUtil.formatNum(appendData.minNum);
			this.biggestLabel.text = game.MathUtil.formatNum(appendData.maxNum);
			this.currentProperty.text = game.MathUtil.formatNum(UserManager.userInfo.gold);
			this.buyAccessHs.minimum = appendData.minNum;
			this.buyAccessHs.maximum = appendData.maxNum;
			this.buyAccessHs.value = Math.min(UserManager.userInfo.gold, Math.max(appendData.minNum, Math.round(appendData.bbBuyIn / 2)));
			this.buyAccessHs.snapInterval = appendData.bBlind;

			if (this.buyAccessHs.minimum == this.buyAccessHs.maximum) //处理滚动条到最右边的问题，这个slider真的鸡肋
			{
				this.buyAccessHs.minimum = this.buyAccessHs.maximum - 1;
				this.buyAccessHs.value = this.buyAccessHs.maximum;
				this.buyAccessHs.thumb.touchEnabled = false;
			}
			else
			{
				this.buyAccessHs.thumb.touchEnabled = true;
			}


			this.countLable.text = "$" + game.MathUtil.formatNum(this.buyAccessHs.value);

			if (GamblingManager.roomInfo)
			{
				if (GamblingManager.roomInfo.isAutoBuy != undefined)
				{
					this.autoBuyCheck.selected = GamblingManager.roomInfo.isAutoBuy;
				}
				else
				{
					this.autoBuyCheck.selected = true; //默认选中
				}
			}
			this.autoBuyCheck.visible = !this.panelData.isAddCoin;
			this.addCoinTitle.visible = this.buyTitle.visible = false;
			if (this.panelData.isAddCoin)
			{
				this.addCoinTitle.visible = true;
			}
			else
			{
				this.buyTitle.visible = true;
			}
		}

	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.buyAccessHs.addEventListener(egret.Event.CHANGE, this.countBuyGold, this);
		this.buyNowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buNow, this);
		this.shoppingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goShopping, this);
		this.buyAccessBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyAccessHandle, this);
		this.backButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);

		GamblingManager.SitOrStandEvent.addListener(this.sitOrStandHandler, this);
		GamblingManager.AddCoinEvent.addListener(this.buyInGameHandler, this);
		GamblingManager.BuyInGameEvent.addListener(this.buyInGameHandler, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.buyAccessHs.removeEventListener(egret.Event.CHANGE, this.countBuyGold, this);
		this.buyNowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buNow, this);
		this.shoppingBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goShopping, this);
		this.buyAccessBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buyAccessHandle, this);
		this.backButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);

		GamblingManager.SitOrStandEvent.removeListener(this.sitOrStandHandler, this);
		GamblingManager.AddCoinEvent.removeListener(this.buyInGameHandler, this);
		GamblingManager.BuyInGameEvent.removeListener(this.buyInGameHandler, this);
		AwardManager.OnExchanged.removeListener(this.onExchanged, this);
	}
	private buNow(event: egret.TouchEvent)
	{
		if (this._shopInfo && this._shopInfo.definition)
		{
			let awardDef: table.IAwardDefine = table.AwardById[this._shopInfo.definition.AwardId];
			if (awardDef)
			{
				
				AwardManager.OnExchanged.removeListener(this.onExchanged, this);
				AwardManager.OnExchanged.addListener(this.onExchanged, this);
				ChannelManager.PaySend(this._shopInfo.id);
			}
		}
	}
	private onExchanged(id: number)
	{
		if (this._shopInfo && this._shopInfo.definition && this._shopInfo.definition.AwardId == id)
		{
			AwardManager.OnExchanged.removeListener(this.onExchanged, this);
			this.onCloseBtnClickHandler(null);
		}
	}
	private onBack(event: egret.TouchEvent)
	{
		this.onCloseBtnClickHandler(event);
	}
	/**
	 * 进入商城充值
	 */
	private goShopping(event: egret.TouchEvent)
	{
		this.onCloseBtnClickHandler(null);
		UIManager.showPanel(UIModuleName.ShoppingPanel, { prevPanelName: UIModuleName.GamblingPanel, toRight: false });
	}
	/**
	 * 买入游戏处理
	*/
	private buyAccessHandle(event: egret.TouchEvent)
	{
		if (this.panelData.isAddCoin)
		{
			if (GamblingManager.self)
			{
				if (this.buyAccessHs.value > GamblingManager.self.bankRoll)
				{
					GamblingManager.reqAddCoin(this.buyAccessHs.value - GamblingManager.self.bankRoll);
				}
				else
				{
					UIManager.showFloatTips("已达最大买入！");
				}
			}
		}
		else
		{
			GamblingManager.reqBuyInGame(this.buyAccessHs.value, this.autoBuyCheck.selected, this.panelData.pos);
		}
	}
	private sitOrStandHandler(obj: any)
	{
		if (obj.pInfo.roleId == UserManager.userInfo.roleId && (!this.panelData || !this.panelData.isGoldInsufficient))
		{
			this.onCloseBtnClickHandler(null);
		}
	}
	private buyInGameHandler()
	{
		this.onCloseBtnClickHandler(null);
	}
	/**
	 * 金币不足处理
	*/
	private unEnoughGoldHandle(smallestGold: number)
	{
		//当前资产与最小买入的差值
		let goldOffset: number = smallestGold - UserManager.userInfo.gold;
		// let awardDef = AwardDefined.GetInstance().(ShoppingManager.awardGoldList.id,ShoppingManager.awardGoldList)
		// let goldIndex=awardDef.costType.indexOf(CostType.RMB);
		this._shopInfo = null;
		let awardDef: table.IAwardDefine;
		let rewardList:AwardInfoDefinition[];
		let costList:AwardInfoDefinition[];
		if (ShopManager.goldList.length > 0)
		{
			for (let i: number = 0; i < ShopManager.goldList.length; i++)
			{
				let info: ShopInfo = ShopManager.goldList[i];
				if (info && info.definition)
				{
					awardDef = table.AwardById[info.definition.AwardId];
					costList = AwardManager.getCostInfoDefinitionList(info.definition.AwardId);
					rewardList = AwardManager.getAwardInfoDefinitionList(info.definition.AwardId);
					if (awardDef && rewardList && goldOffset <= rewardList[0].count || i == ShopManager.goldList.length - 1)
					{
						this._shopInfo = info;
						break;
					}
				}
			}
			if (this._shopInfo && awardDef)
			{
				if (costList && costList.length > 0)
				{
					this.priceLabel.text = "仅需" + costList[0].count / 100 + "元";
				}
				this.goldLabel.text = awardDef.Name;
			}
		}
	}
	/**
	 * 计算买入金币
	*/
	private countBuyGold(event: egret.TouchEvent)
	{
		this.countLable.text = "$" + game.MathUtil.formatNum(this.buyAccessHs.value);
	}
}