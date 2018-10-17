/**
 * 用户信息面板
 */
class UserInfoPanel extends BasePanel
{
	//资料
	public userInfoTab: TabComponent;
	public userNameLabel: eui.Label;//用户名
	public changeNameBtn: eui.Button;//修改昵称
	public userHeadComp: CircleHeadComponent;//头像组件
	public changeInfoBg: eui.Image;
	public changeInfoLabel: eui.Label;
	public vipLevelLabel: eui.Label;//用户vip等级
	public vipGroup: eui.Group;//vip组
	public sexImg: eui.Image;//性别
	public ageLabel: eui.Label//年龄
	public userIdLabel: eui.Label;//ID
	public userDesLabel: eui.EditableText;//用户描述
	public diamondNumLabel: eui.Label;//钻石数
	public goldNumLabel: eui.Label;//金币数量
	public getGoldBtn: eui.Button;
	public getDiamondBtn: eui.Button;
	public levelLabel: eui.Label;//等级
	public titleLabel: eui.Label;//称号
	public levelProgressImg: eui.ProgressBar;//等级进度
	public expLabel: eui.Label;
	public stateLabel: eui.Label;//目前状态
	public myPrizeBtn: eui.Button;//我的奖品
	public buyVipBtn: eui.Button;//购买Vip
	public buyUserGiftBtn: eui.Button;//购买礼物
	public buyUserItemBtn: eui.Button;//购买道具
	public dataGroup: eui.Group;//资料组

	//概况
	public joinTimeLabel: eui.Label;//加入时间
	public maxGoldLabel: eui.Label;//最高拥有金币
	public maxGoldOnetimeLabel: eui.Label;//一把最高赢取金币
	public frindNumLabel: eui.Label;//好友数量
	public winTimeLabel: eui.Label;//胜利局数/游戏总局数
	public winProbabilityLabel: eui.Label;//胜率
	public maxHandLabel: eui.Label;//最大手牌
	public maxHandGroup: eui.Group;//最大手牌组
	private maxHandList: Array<CardFaceComponent>;//最大手牌列表
	public entryRateLabel: eui.Label;//入局率
	public showdownRateLabel: eui.Label;//摊牌率

	public matchTimeLabel: eui.Label;//参赛总局数
	public matchWinProbabilityLabel: eui.Label;//锦标赛胜率
	public matchEntryRateLabel: eui.Label;//锦标赛入局率
	public matchShowdownRateLabel: eui.Label;//锦标赛摊牌率
	public joinMatchTimes: eui.Label;//参赛次数
	public enterPrizeCircle: eui.Label;//进入奖励圈
	public championTimes: eui.Label;//夺冠次数

	public situationGroup: eui.Group;//概况组
	public playGroup: eui.Group;
	public matchGroup: eui.Group;
	public situationTab: TabComponent;

	//成就
	public achieveScroller: eui.Scroller;
	public achieveList: eui.List;
	public achievementGroup: eui.Group;//成就组
	public giftGroup: eui.Group;//礼物

	public buyGiftBtn: eui.Button;
	private readonly _maxchar: number = 35;

	public goldBg: eui.Image;
	public diamondBg: eui.Image;

	/**
	 * 删除好友
	 */
	public deleteFriendBtn: eui.Button;
	/**
	 * 申请好友
	 */
	public requestBtn: eui.Button;

	private userinfo: UserInfo;

	private readonly situationIndex: number = 1;
	private readonly achieveIndex: number = 2;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.UserInfoPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
		let array: Array<eui.Group> = new Array<eui.Group>();
		array.push(this.dataGroup);
		array.push(this.situationGroup);
		array.push(this.achievementGroup);
		array.push(this.giftGroup);
		// this.userInfoTab.build(TabComponent.CreatData(["资料", "概况", "成就", "礼物"], array, TabButtonType.SmallOf4));
		this.userInfoTab.build(TabComponent.CreatData(["资料", "概况", "成就"], array, TabButtonType.SmallOf3));
		this.situationTab.build(TabComponent.CreatData(["常规赛", "锦标赛"], [this.playGroup, this.matchGroup], TabButtonType.SubOf2));
		UIUtil.listRenderer(this.achieveList, this.achieveScroller, AchievementItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
		this.userInfoTab.isTween = false;
		this.situationTab.isTween = false;
		VersionManager.setComponentVisibleBySafe(this.buyVipBtn, this.vipGroup, this.myPrizeBtn);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this.userInfoTab.init(0);
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
		let otherUserInfo: UserInfo = UserManager.otherUserInfo;
		if (otherUserInfo == null || otherUserInfo.roleId == UserManager.userInfo.roleId)
		{
			if (otherUserInfo == null)
			{
				this.userinfo = UserManager.userInfo;
			}
			else
			{
				this.userinfo = UserManager.otherUserInfo;
			}
			this.showFriendUI(true);
			this.setInfo(this.userinfo);
			this.changeNameBtn.visible = true;
			this.userHeadComp.touchEnabled = true;
			this.userDesLabel.touchEnabled = true;
			this.changeInfoBg.visible = true;
			this.changeInfoLabel.visible = true;
			this.getDiamondBtn.visible = this.getGoldBtn.visible = true;
			this.goldBg.width = this.diamondBg.width = 430;
		}
		else
		{
			this.showFriendUI(false);
			this.userinfo = UserManager.otherUserInfo;
			this.setInfo(this.userinfo);
			this.changeNameBtn.visible = false;
			this.userHeadComp.touchEnabled = false;
			this.userDesLabel.touchEnabled = false;
			this.changeInfoBg.visible = false;
			this.changeInfoLabel.visible = false;
			this.getDiamondBtn.visible = this.getGoldBtn.visible = false;
			this.goldBg.width = this.diamondBg.width = 600;
		}
	}

	private setInfo(info: UserInfo)
	{
		this.diamondNumLabel.text = game.MathUtil.numAddSpace(info.diamond);
		this.goldNumLabel.text = game.MathUtil.numAddSpace(info.gold);
		this.refreshUserInfo(info);
		this.refreshOtherVipInfo(info);
		this.userIdLabel.text = info.roleId.toString();
		this.levelLabel.text = info.level.toString();
		this.titleLabel.text = UserUtil.getTitle(info.level);
		this.levelProgressImg.width = 340;
		this.levelProgressImg.width *= game.MathUtil.clamp(UserUtil.getPercentage(info.level, info.exp), 0, 1);
		this.expLabel.text = UserUtil.getExpStringPercent(info.level, info.exp);
		this.setStateLabel(info);
	}
	/**
	 * 显示状态
	 */
	private setStateLabel(info: UserInfo)
	{
		switch (info.userState)
		{
			case UserState.Offline:
				this.stateLabel.text = "当前玩家不在线";
				break;
			case UserState.InGamehall:
				this.stateLabel.text = "正在游戏大厅";
				break;
			case UserState.InGame:
			case UserState.InGamePerson:
			case UserState.InOmaha:
			case UserState.InOmahaPerson:
				let roomDef: table.ITexasRoomDefine = table.TexasRoomById[info.stateConfId];
				if (roomDef)
				{
					let patternName: string = PlayingFieldManager.getPatternName(roomDef.Type);
					this.stateLabel.text = game.StringUtil.format("在{0}：{1}，{2}买入", patternName, PlayingFieldManager.roomIdAddZero(info.stateId), game.MathUtil.formatNum(roomDef.SBuyin));
				}
				break;
			case UserState.InMatch:
				let matchDef: table.IChampionshipDefine = table.ChampionshipById[info.stateConfId];
				if (matchDef)
				{
					this.stateLabel.text = game.StringUtil.format("{0}中", matchDef.Name);
				}
				break;
			case UserState.InHundredWar:
				let hundredWarDef: table.IHundredWarDefine =  table.HundredWarById[info.stateConfId];
				if (hundredWarDef)
				{
					this.stateLabel.text = game.StringUtil.format("百人大战：{0}中", hundredWarDef.Name);
				}
				break;
		}
	}

	private setSituation(info: UserInfo)
	{

		this.joinTimeLabel.text = game.DateTimeUtil.formatDate(new Date(info.createdTime * 1000), game.DateTimeUtil.Format_Standard_Date);
		this.maxGoldLabel.text = game.MathUtil.numAddSpace(info.maxGold);
		this.maxGoldOnetimeLabel.text = game.MathUtil.numAddSpace(info.maxGoldOnetimes);
		this.frindNumLabel.text = info.friendNum.toString();
		this.winTimeLabel.text = info.winTimes.toString() + "/" + info.gameTimes.toString();
		this.winProbabilityLabel.text = Math.round(info.gameTimes == 0 ? 0 : (info.winTimes / info.gameTimes) * 100).toString() + "%";
		this.entryRateLabel.text = Math.round(info.entryTimes == 0 ? 0 : (info.entryTimes / info.gameTimes) * 100) + "%";
		this.showdownRateLabel.text = Math.round((info.showdownTimes == 0 || info.entryTimes == 0) ? 0 : (info.showdownTimes / info.entryTimes) * 100) + "%";
		this.maxHandLabel.text = info.maxHandName;

		this.matchTimeLabel.text = info.gameTimes2.toString();
		this.matchWinProbabilityLabel.text = Math.round(info.gameTimes2 == 0 ? 0 : (info.winTimes2 / info.gameTimes2) * 100).toString() + "%";
		this.matchEntryRateLabel.text = Math.round(info.entryTimes2 == 0 ? 0 : (info.entryTimes2 / info.gameTimes2) * 100) + "%";
		this.matchShowdownRateLabel.text = Math.round((info.showdownTimes2 == 0 || info.entryTimes == 0) ? 0 : (info.showdownTimes2 / info.entryTimes2) * 100) + "%";
		this.joinMatchTimes.text = info.mttJoinTimes.toString();
		this.enterPrizeCircle.text = info.mttPrizeTimes.toString();
		this.championTimes.text = info.championTimes.toString();
		if (!this.maxHandList)
		{
			this.maxHandList = new Array<CardFaceComponent>();
			for (let i: number = 0; i < this.maxHandGroup.numChildren; i++)
			{
				let card: CardFaceComponent = this.maxHandGroup.getChildAt(i) as CardFaceComponent;
				this.maxHandList.push(card);
			}
			this.maxHandList.reverse();
		}
		for (let item of this.maxHandList)
		{
			item.visible = false;
		}
		let list: Array<CardInfo> = info.maxHandList;
		if (list)
		{
			for (let i: number = 0; i < list.length; i++)
			{
				if (i < this.maxHandList.length)
				{
					let card: CardFaceComponent = this.maxHandList[i];
					card.visible = true;
					card.init(list[i]);
					card.initElementsShow2();
				}
			}
		}
	}

	private refreshUserInfo(info: UserInfo)
	{
		this.userNameLabel.text = info.name;
		this.userHeadComp.init(info, 120);
		switch (info.sex)
		{
			case Sex.Female:
				this.sexImg.source = SheetSubName.FemaleImg;
				break;
			case Sex.Male:
				this.sexImg.source = SheetSubName.MaleImg;
				break;
			case Sex.Unknown:
				this.sexImg.source = SheetSubName.SecretImg;
				break;
		}
		this.ageLabel.text = info.age.toString();
		this.userDesLabel.text = info.sign;
	}
	private refreshMyInfo()
	{
		this.refreshUserInfo(UserManager.userInfo);
	}
	private refreshVipInfo()
	{
		this.refreshOtherVipInfo(UserManager.userInfo);
	}
	private refreshOtherVipInfo(info: UserInfo)
	{
		if (!VipManager.isVip(info))
		{
			this.vipGroup.visible = false;
		}
		else
		{
			this.vipGroup.visible = true;
			this.vipLevelLabel.text = "VIP " + info.vipLevel;
		}
	}

	private refreshAchieveInfo(userInfo: UserInfo)
	{
		UIUtil.writeListInfo(this.achieveList, AchievementManager.getAchieveListByTag(this.userinfo, AchieveTag.Achievement), "id");
	}

	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
		VipManager.vipUpgradeEvent.addListener(this.refreshVipInfo, this);
		UserManager.onSetUserInfoComplete.addListener(this.refreshMyInfo, this);
		UserManager.onCreateRoleEvent.addListener(this.refreshMyInfo, this);
		UserManager.headImageUpdateEvent.addListener(this.refreshMyInfo, this);
		this.userInfoTab.tabChangeEvent.addListener(this.onBarItemTap, this);
		this.userDesLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onChangeSign, this);
		this.requestBtn.enabled = true;
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
		VipManager.vipUpgradeEvent.removeListener(this.refreshVipInfo, this);
		UserManager.onSetUserInfoComplete.removeListener(this.refreshMyInfo, this);
		UserManager.onCreateRoleEvent.removeListener(this.refreshMyInfo, this);
		UserManager.headImageUpdateEvent.removeListener(this.refreshMyInfo, this);
		this.userInfoTab.tabChangeEvent.removeListener(this.onBarItemTap, this);
		this.userDesLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onChangeSign, this);
		UserManager.otherUserInfo = null;
	}

	/**
	 * 点击面板按钮事件处理
	*/
	private clickHandler(event: egret.TouchEvent)
	{
		switch (event.target)
		{
			case this.changeNameBtn:
				SoundManager.playButtonEffect(event.target);
				UIManager.showPanel(UIModuleName.ChangeUserNamePanel);
				break;
			case this.myPrizeBtn:
				SoundManager.playButtonEffect(event.target);
				UIManager.showPanel(UIModuleName.PrizePanel);
				break;
			case this.buyVipBtn:
				SoundManager.playButtonEffect(event.target);
				JumpUtil.JumpToGiftShop(this.userinfo, GiftShopTabIndex.Vip);
				break;
			case this.buyGiftBtn:
			case this.buyUserGiftBtn:
				// SoundManager.playButtonEffect(event.target);
				// JumpUtil.JumpToGiftShop(this.userinfo, GiftShopTabIndex.Gift);
				break;
			case this.buyUserItemBtn:
				SoundManager.playButtonEffect(event.target);
				JumpUtil.JumpToGiftShop(this.userinfo, GiftShopTabIndex.Item);
				break;
			case this.userHeadComp:
				SoundManager.playButtonEffect(event.target);
				UIManager.showPanel(UIModuleName.EditUserInfoPanel);
				break;
			case this.deleteFriendBtn:
				SoundManager.playButtonEffect(event.target);
				AlertManager.showConfirm("确定删除此好友？", this.sendDelFriendRequest);
				break;
			case this.requestBtn:
				SoundManager.playButtonEffect(event.target);
				if (UserManager.otherUserInfo)
				{
					FriendManager.reqAddPlayer(UserManager.otherUserInfo.roleId);
				}
				this.requestBtn.enabled = false;
				break;
			case this.closeButton:
				SoundManager.playButtonEffect(event.target);
				if (this.userinfo.roleId == UserManager.userInfo.roleId)
				{
					this.reqSaveSign();
				}
				break;
			case this.getGoldBtn:
				SoundManager.playButtonEffect(event.target);
				JumpUtil.JumpToShopping(ShopGroupIndex.Gold, UIModuleName.UserInfoPanel);
				break;
			case this.getDiamondBtn:
				SoundManager.playButtonEffect(event.target);
				JumpUtil.JumpToShopping(ShopGroupIndex.Diamond, UIModuleName.UserInfoPanel);
				break;
		}
	}

	/**
	 * 发送删除好友请求
	*/
	private sendDelFriendRequest()
	{
		if (UserManager.otherUserInfo)
		{
			FriendManager.reqRemovePlayer(UserManager.otherUserInfo.roleId);
		}
	}

	private onChangeSign(e: egret.FocusEvent)
	{
		if (this.userDesLabel.text)
		{
			this.userDesLabel.text = ForbiddenDefined.GetInstance().replaceView(this.userDesLabel.text);
		}
	}

	private reqSaveSign()
	{
		let userDes: string;
		if (this.userDesLabel.text != UserManager.userInfo.sign)
		{
			userDes = this.userDesLabel.text;
		}
		UserManager.reqSetUserInfo(userDes, null, null);
	}

	private showFriendUI(isSelf: boolean)
	{
		if (isSelf)
		{
			this.myPrizeBtn.visible = true;
			this.deleteFriendBtn.visible = false;
			this.requestBtn.visible = false;
			this.buyUserGiftBtn.label = this.buyGiftBtn.label = "购买礼物";
			this.buyUserItemBtn.label = "购买道具";
			this.buyVipBtn.label = "购买VIP";
		}
		else 
		{
			this.buyUserGiftBtn.label = this.buyGiftBtn.label = "赠送礼物";
			this.buyUserItemBtn.label = "赠送道具";
			this.buyVipBtn.label = "赠送VIP";
			if (FriendManager.isFriend(UserManager.otherUserInfo.roleId))
			{
				this.myPrizeBtn.visible = false;
				this.deleteFriendBtn.visible = true;
				this.requestBtn.visible = false;
			}
			else
			{
				this.myPrizeBtn.visible = false;
				this.deleteFriendBtn.visible = false;
				this.requestBtn.visible = true;
			}
		}
	}

	private onBarItemTap(index: number)
	{
		if (index == this.achieveIndex)
		{
			this.refreshAchieveInfo(this.userinfo);
		}
		else if (index == this.situationIndex)
		{
			this.setSituation(this.userinfo);
			this.situationTab.setSelectIndex(0);
		}
	}
}
