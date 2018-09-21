/**
 * 礼物商店面板
 */
class GiftShopPanel extends BasePanel
{
	public shopTypeTab: TabComponent;
	public giftTab: TabComponent;
	public itemTab: TabComponent;
	public vipTab: TabComponent;

	public giftGroup: eui.Group;
	public itemGroup: eui.Group;
	public vipGroup: eui.Group;
	public buyGroup: eui.Group;
	public buyVipGroup: eui.Group;
	public myVipGroup: eui.Group;
	public vipIntroduceGroup: eui.Group;

	public buyBtn: eui.Button;
	public goldNumLabel: eui.Label;
	public diamondNumLabel: eui.Label;

	public userHeadComp: CircleHeadComponent;
	public yearVipImg: eui.Image;
	public userNameLabel: eui.Label;
	public vipLevelLabel: eui.Label;
	public buyVipButton: eui.Button;
	public vipProgressImg: eui.Image;
	public processBg: eui.Image;
	public vipProgressLabel: eui.Label;
	public vipExpLabel: eui.Label;
	public currentVipLevel: eui.Label;
	public vipSpeedLabel: eui.Label;
	public vipTimeLabel: eui.Label;
	public buyYearVip: eui.Label;

	public imgGroup: eui.Group;
	public vipBg: eui.Image;
	public vipIntroduceScroller: eui.Scroller;

	public giftList: eui.List;
	public giftScroller: eui.Scroller;
	public itemList: eui.List;
	public itemScroller: eui.Scroller;
	public vipList: eui.List;
	public vipScroller: eui.Scroller;

	private _userInfo: UserInfo;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.GiftShopPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
		// this.shopTypeTab.build(TabComponent.CreatData(["礼物", "道具", "VIP"], [this.giftGroup, this.itemGroup, this.vipGroup], TabButtonType.SmallOf3));
		this.giftGroup.visible = false;
		this.shopTypeTab.build(TabComponent.CreatData(["道具", "VIP"], [this.itemGroup, this.vipGroup], TabButtonType.SmallOf2));
		this.giftTab.build(TabComponent.CreatData(["装饰品", "吉祥物", "奢侈品"], [this.giftGroup, this.giftGroup, this.giftGroup], TabButtonType.SubOf3));
		this.itemTab.build(TabComponent.CreatData(["美酒", "小喇叭"], [this.itemGroup, this.itemGroup], TabButtonType.SubOf2));
		this.vipTab.build(TabComponent.CreatData(["购买VIP", "我的VIP", "VIP介绍"], [this.buyVipGroup, this.myVipGroup, this.vipIntroduceGroup], TabButtonType.SubOf3));
		this.shopTypeTab.isTween = false;
		this.giftTab.isTween = false;
		this.itemTab.isTween = false;
		this.vipTab.isTween = false;
		this.vipIntroduceScroller.viewport = this.imgGroup;
		UIUtil.listRenderer(this.giftList, this.giftScroller, UserGiftItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
		UIUtil.listRenderer(this.itemList, this.itemScroller, GiftShopItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
		UIUtil.listRenderer(this.vipList, this.vipScroller, GiftShopItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		if (appendData)
		{
			this._userInfo = appendData.userInfo;
			ShopManager.giftShopIsSelf = this._userInfo.id == UserManager.userInfo.id;
			if (appendData.tab == null)
			{
				appendData.tab = 0;
			}
			if (appendData.subTab == null)
			{
				appendData.subTab = 0;
			}

			this.shopTypeTab.init(appendData.tab);
			switch (appendData.tab)
			{
				// case GiftShopTabIndex.Gift:
				// 	this.giftTab.setSelectIndex(appendData.subTab);
				// 	this.onGiftTab(appendData.subTab);
				// 	break;
				case GiftShopTabIndex.Item:
					this.itemTab.setSelectIndex(appendData.subTab);
					this.onItemTab(appendData.subTab);
					break;
				case GiftShopTabIndex.Vip:
					this.vipTab.setSelectIndex(appendData.subTab);
					this.onVipTab(appendData.subTab);
					break;
			}
		}
		else
		{
			this.shopTypeTab.init(0);
			this.giftTab.init(0);
		}
		this.refreshUI();
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.clearSelect();
		this.shopTypeTab.tabChangeEvent.addListener(this.onTypeTab, this);
		this.giftTab.tabChangeEvent.addListener(this.onGiftTab, this);
		this.itemTab.tabChangeEvent.addListener(this.onItemTab, this);
		this.vipTab.tabChangeEvent.addListener(this.onVipTab, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
		ShopManager.giftShopItemSelectEvent.addListener(this.onSelect, this);
		UserManager.propertyChangeEvent.addListener(this.refreshGold, this);
		AwardManager.OnExchanged.addListener(ShopManager.onExchangeVipHandler, this);
		ShopManager.sendGiftEvent.addListener(this.onSend, this);

	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.giftTab.tabChangeEvent.removeListener(this.onGiftTab, this);
		this.itemTab.tabChangeEvent.removeListener(this.onItemTab, this);
		this.vipTab.tabChangeEvent.removeListener(this.onVipTab, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
		ShopManager.giftShopItemSelectEvent.removeListener(this.onSelect, this);
		UserManager.propertyChangeEvent.removeListener(this.refreshGold, this);
		AwardManager.OnExchanged.removeListener(ShopManager.onExchangeVipHandler, this);
		ShopManager.sendGiftEvent.removeListener(this.onSend, this);
	}

	private refreshUI()
	{
		this.buyBtn.label = this._userInfo.id == UserManager.userInfo.id ? "购买" : "赠送";
		this.buyBtn.enabled = ShopManager.giftShopSelect ? true : false;
		this.goldNumLabel.text = game.MathUtil.formatNum(UserManager.userInfo.gold);
		this.diamondNumLabel.text = game.MathUtil.formatNum(UserManager.userInfo.diamond);
	}

	private onSelect()
	{
		this.buyBtn.enabled = ShopManager.giftShopSelect ? true : false;
	}

	private clearSelect()
	{
		ShopManager.giftShopSelect = null;
		this.buyBtn.enabled = false;
	}

	private onTypeTab(index: number)
	{
		switch (index)
		{
			// case GiftShopTabIndex.Gift:
			// 	this.giftTab.setSelectIndex(0);
			// 	this.buyGroup.visible = true;
			// 	break;
			case GiftShopTabIndex.Item:
				this.itemTab.setSelectIndex(0);
				this.buyGroup.visible = true;
				break;
			case GiftShopTabIndex.Vip:
				this.vipTab.setSelectIndex(0);
				let btn = this.vipTab.getBtnByIndex(ShopVipTabIndex.MyVip);
				if (btn)
				{
					btn.label = ShopManager.giftShopIsSelf ? "我的VIP" : "TA的VIP";
				}
				break;
		}
	}

	private onGiftTab(index: number)
	{
		this.clearSelect();
		switch (index)
		{
			case ShopGiftTabIndex.Decorations:
				UIUtil.writeListInfo(this.giftList, GiftShopDefined.GetInstance().getListByType(GiftShopType.Decorations), "id", true);
				break;
			case ShopGiftTabIndex.Mascot:
				UIUtil.writeListInfo(this.giftList, GiftShopDefined.GetInstance().getListByType(GiftShopType.Mascot), "id", true);
				break;
			case ShopGiftTabIndex.Luxury:
				UIUtil.writeListInfo(this.giftList, GiftShopDefined.GetInstance().getListByType(GiftShopType.Luxury), "id", true);
				break;
		}
	}

	private onItemTab(index: number)
	{
		this.clearSelect();
		if (index == ShopItemTabIndex.Wine)
		{
			UIUtil.writeListInfo(this.itemList, GiftShopDefined.GetInstance().getListByType(GiftShopType.Wine), "id", true);
		}
		else if (index == ShopItemTabIndex.Trumpet)
		{
			UIUtil.writeListInfo(this.itemList, GiftShopDefined.GetInstance().getListByType(GiftShopType.Trumpet), "id", true);
		}
	}

	private onVipTab(index: number)
	{
		this.clearSelect();
		switch (index)
		{
			case ShopVipTabIndex.BuyVip:
				this.buyGroup.visible = true;
				UIUtil.writeListInfo(this.vipList, GiftShopDefined.GetInstance().getListByType(GiftShopType.Vip), "id", true);
				break;
			case ShopVipTabIndex.MyVip:
				this.setVipInfo(this._userInfo);
				this.buyGroup.visible = false;
				break;
			case ShopVipTabIndex.VipIntroduce:
				this.buyGroup.visible = false;
				if (!this.vipBg.texture)
				{
					UIUtil.loadBg(ResFixedFileName.vipBg, this.vipBg);
				}
				this.vipIntroduceScroller.stopAnimation();
				this.vipIntroduceScroller.viewport.scrollV = 0;
				break;
		}
	}

	private setVipInfo(userInfo: UserInfo)
	{
		this.userHeadComp.init(userInfo);
		this.userNameLabel.text = userInfo.name;
		this.vipLevelLabel.text = "VIP" + userInfo.vipLevel.toString();
		switch (userInfo.vipType)
		{
			case VipType.NoVip:
				this.yearVipImg.visible = false;
				this.buyYearVip.visible = true;
				this.buyVipButton.label = "开通会员";
				this.vipTimeLabel.visible = false;
				break;
			case VipType.Vip:
				this.yearVipImg.visible = false;
				this.buyYearVip.visible = true;
				this.buyVipButton.label = "续费会员";
				this.vipTimeLabel.visible = true;
				break;
			case VipType.YearVip:
				this.yearVipImg.visible = true;
				this.buyYearVip.visible = false;
				this.buyVipButton.label = "续费会员";
				this.vipTimeLabel.visible = true;
				break;
		}
		this.vipTimeLabel.text = game.DateTimeUtil.formatDate(new Date(VipManager.GetVipTime(userInfo) * 1000), game.DateTimeUtil.Format_Standard_Date);
		this.buyVipButton.visible = userInfo.id == UserManager.userInfo.id;
		this.vipProgressImg.width = 560;
		this.vipProgressImg.width *= game.MathUtil.clamp(parseFloat((userInfo.vipExp / 6000).toFixed(2)), 0, 1);
		this.vipProgressLabel.text = userInfo.vipExp.toString();
		this.vipProgressLabel.x = this.vipProgressImg.width;
		this.processBg.x = this.vipProgressImg.width;
		this.vipExpLabel.text = userInfo.vipExp.toString() + "点";
		this.currentVipLevel.text = userInfo.vipLevel.toString();
		this.vipSpeedLabel.text = userInfo.vipSpeed + "点";
	}

	/**
	* 刷新财产信息
 	*/
	private refreshGold(num?: number)
	{
		this.goldNumLabel.text = game.MathUtil.formatNum(UserManager.userInfo.gold);
		this.diamondNumLabel.text = game.MathUtil.formatNum(UserManager.userInfo.diamond);
	}

	private onSend(data: any)
	{
		AlertManager.showAlert("赠送成功！");
	}

	/**
	 * 点击面板按钮事件处理
	*/
	private clickHandler(event: egret.TouchEvent)
	{
		SoundManager.playButtonEffect(event.target);
		if (event.target == this.buyVipButton || event.target == this.buyYearVip)
		{
			JumpUtil.JumpToShopping(ShopGroupIndex.Vip, UIModuleName.GiftShopPanel);
		}
		else if (event.target == this.buyBtn)
		{
			if (ShopManager.giftShopSelect)
			{
				ShopManager.giftShopSelect.buy();
			}
			else
			{
				game.Console.logError("未选中商品！");
			}

		}
	}
}