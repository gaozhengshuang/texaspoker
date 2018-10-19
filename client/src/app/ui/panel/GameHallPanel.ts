/**
 * 游戏大厅界面
 */
class GameHallPanel extends BasePanel
{
	//
	public dealerImg: eui.Image;
	//用户信息
	public userHeadComp: CircleHeadComponent;//头像组件
	public userNameLabel: eui.Label;//用户名
	public vipLevelLabel: eui.Label;//用户vip等级
	public vipGroup: eui.Group;//vip组
	public diamondNumLabel: eui.Label;//钻石数
	public addDiamondBtn: eui.Button;//添加钻石
	public goldNumLabel: eui.Label;//金币数量
	public addGoldBtn: eui.Button;//添加金币

	public morePlayBtn: eui.Button;//更多玩法

	//排名
	public rankingImg0: HeadComponent;
	public rankingImg1: HeadComponent;
	public rankingImg2: HeadComponent;
	public rankingImg3: HeadComponent;
	public rankingImg4: HeadComponent;
	public rankingImg5: HeadComponent;
	public rank0Group: eui.Group;
	public rank1Group: eui.Group;
	public rank2Group: eui.Group;
	public rank3Group: eui.Group;

	//上方按钮
	public monthCardBtn: eui.Button;
	public newGiftBtn: eui.Button;
	public inviteBtn: eui.Button;
	public shareBtn: eui.Button;
	public firstpayBtn: eui.Button;
	public bindPhoneAwardBtn: eui.Button;

	//右侧按钮
	public signBtn: GameButton;//签到
	public activityBtn: GameButton;//活动
	public mailBtn: GameButton;//邮件
	public awardsBtn: GameButton;

	//游戏按钮
	public pokerBtn: GameButton;//德州扑克
	public matchBtn: GameButton;//赛事场
	public hundredBattle: GameButton;//百人大战

	//下方菜单
	public shopBtn: GameButton;//商城
	public friendBtn: GameButton;//好友
	public assignmentBtn: GameButton;//任务
	public moreBtn: GameButton;//更多
	//免费金币
	public freeGoldBtn: GameButton;//免费金币
	public freeGoldTimeLabel: eui.Label;//免费金币时间
	public freeGoldGroup: eui.Group;

	public moreGroup: eui.Group;//更多组
	public moreButtonGroup: eui.Group;//更多按钮组
	public safeBoxBtn: eui.Button;//保险箱
	public gameRuleBtn: eui.Button;//玩法
	public settingBtn: eui.Button;//设置
	public bindBtn: eui.Button;//绑定

	//组
	public ranking: eui.Group;
	public rightMenu: eui.Group;
	public bottomButton: eui.Group;
	public gameButton: eui.Group;
	public userinfoGroup: eui.Group;
	public panelBottom: eui.Group;
	public topBtnGroup: eui.Group;

	//排行榜数据
	private _rankListInfo: RankListInfo;
	private _rankList: Array<RankInfo>;
	private readonly listNum: number = 4;

	//动画
	private _buttonAnime: GameHallButtonAnime;
	private _panelAnime: GameHallPanelAnime;

	//按键逻辑支持
	private _btnSupport: GameHallBtnSupport;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.GameHallPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		// this.addRedPoint(); //move todo
		this.moreGroup.visible = false;
		this.dealerImg.source = BundleManager.getResNameByBundle(ResFixedFileName.Dealer_Png);
		UIManager.pushResizeGroup(this.panelBottom);
		this._buttonAnime = new GameHallButtonAnime(this);
		this._panelAnime = new GameHallPanelAnime(this);
		this._btnSupport = new GameHallBtnSupport(this);
		this._rankListInfo = RankManager.getRankListInfo(RankType.FriendGold);
		VersionManager.setComponentVisibleBySafe(this.firstpayBtn, this.activityBtn, this.matchBtn, this.ranking, this.safeBoxBtn, this.bindBtn, this.vipGroup, this.awardsBtn);
	}

	private addRedPoint()
	{
		UIUtil.addSingleNotify(this.matchBtn, NotifyType.Mtt_HaveJoinedList, 15, 55);
		UIUtil.addSingleNotify(this.mailBtn, NotifyType.Mail_HaveNew, 10, 10);
		UIUtil.addSingleNotify(this.assignmentBtn, NotifyType.Achieve_HaveNoTake, -5, 15);
		UIUtil.addSingleNotify(this.friendBtn, NotifyType.Friend_Hall, -5, 25);
		UIUtil.addSingleNotify(this.monthCardBtn, NotifyType.MonthCard);
		UIUtil.addSingleNotify(this.signBtn, NotifyType.Signin, 10, 10);
		UIUtil.addMultiNotify(this.activityBtn, NotifyType.ActivityRedPoint, UIModuleName.GameHallPanel, 10, 10);
		UIUtil.addSingleNotify(this.newGiftBtn, NotifyType.NewGift);
		UIUtil.addMultiNotify(this.inviteBtn, NotifyType.Invite, UIModuleName.GameHallPanel, 10, 0);
		UIUtil.addMultiNotify(this.shareBtn, NotifyType.Share, UIModuleName.GameHallPanel, 10, 5);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this.refreshUserInfoUI();
		this.resetFreeGoldTime();

		ChannelManager.checkUnFinishedPayList();
		this._btnSupport.init();
		// BindAccountManager.reqGetList();//move todo
		// this.inviteBtn.visible = InviteManager.isInviteOpen; //move todo
	}

	private updateRankList()
	{
		if (UserManager.userInfo.name && RankManager.isRefreshRank(this._rankListInfo))
		{
			this.rank0Group.visible = false;
			this.rank1Group.visible = false;
			this.rank2Group.visible = false;
			this.rank3Group.visible = false;
			RankManager.reqRankList(RankManager.getListType(RankTabType.Gold, RankListType.Friend));
		}
	}

	public creatItem(): Array<AchievementInfo>
	{
		let achieveList: Array<AchievementInfo> = new Array<AchievementInfo>();
		let achinfo: AchievementInfo = new AchievementInfo();
		achinfo.id = 101;
		achinfo.isComplete = true;
		achieveList.push(achinfo);
		achinfo = new AchievementInfo();
		achinfo.id = 102;
		achinfo.isComplete = true;
		achieveList.push(achinfo);
		achinfo = new AchievementInfo();
		achinfo.id = 103;
		achinfo.isComplete = true;
		achieveList.push(achinfo)
		return achieveList;
	}

	protected onRender(event: egret.Event)
	{
		super.onRender(event);
		if (UIManager.isShowPanel(UIModuleName.FriendMsgPanel))
		{
			UIManager.takeToTopLayer(UIModuleName.FriendMsgPanel);
		}
	}
	private refreshUserInfoUI()
	{
		this.userNameLabel.text = UserManager.userInfo.name.toString();
		this.userHeadComp.init(UserManager.userInfo, 120);
		if (false && VipManager.isVip())
		{
			this.vipLevelLabel.text = "VIP" + UserManager.userInfo.vipLevel; //move todo
			this.vipGroup.visible = true;
		}
		else
		{
			this.vipGroup.visible = false;
		}
		this.updateRankList();
		this.refreshGold();
	}

	/**
	 * 刷新财产信息
	 */
	private refreshGold(num?: number)
	{
		this.goldNumLabel.text = game.MathUtil.formatNum(UserManager.userInfo.gold);
		this.diamondNumLabel.text = game.MathUtil.formatNum(UserManager.userInfo.diamond);
	}

	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this._buttonAnime.onEnable();
		this._panelAnime.onEnable();
		this._btnSupport.onEnable();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		// VipManager.vipUpgradeEvent.addListener(this.refreshUserInfoUI, this); //move todo
		UserManager.propertyChangeEvent.addListener(this.refreshGold, this);
		UserManager.onCreateRoleEvent.addListener(this.refreshUserInfoUI, this);
		UserManager.onSetUserInfoComplete.addListener(this.refreshUserInfoUI, this);
		UserManager.headImageUpdateEvent.addListener(this.refreshUserInfoUI, this);
		game.Tick.AddSecondsInvoke(this.refreshFreeGoldTime, this);
		UserManager.getFreeGoldEvent.addListener(this.resetFreeGoldTime, this);
		UIManager.onPanelCloseEvent.addListener(this._panelAnime.setRankEnterAnime.bind(this._panelAnime), this);

		RankManager.getFriendRankList(RankType.FriendGold, this._rankListInfo, this.getRankList, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this._buttonAnime.onDisable();
		this._panelAnime.onDisable();
		this._btnSupport.onDisable();
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		// VipManager.vipUpgradeEvent.removeListener(this.refreshUserInfoUI, this);//move todo
		UserManager.propertyChangeEvent.removeListener(this.refreshGold, this);
		UserManager.onCreateRoleEvent.removeListener(this.refreshUserInfoUI, this);
		UserManager.onSetUserInfoComplete.removeListener(this.refreshUserInfoUI, this);
		UserManager.headImageUpdateEvent.removeListener(this.refreshUserInfoUI, this);
		game.Tick.RemoveSecondsInvoke(this.refreshFreeGoldTime, this);
		UserManager.getFreeGoldEvent.removeListener(this.resetFreeGoldTime, this);
		UIManager.onPanelCloseEvent.removeListener(this._panelAnime.setRankEnterAnime.bind(this._panelAnime), this);
	}

	private getRankList()
	{
		this._rankList = this._rankListInfo.list;
		if (!this._rankList)
		{
			this._rankList = new Array<RankInfo>();
		}
		if (this._rankListInfo && this._rankListInfo.list)
		{
			// for (let i = 0; i < this.listNum; i++)
			// {
			// 	if (i < this._rankListInfo.list.length)
			// 	{
			// 		this._rankList.push(this._rankListInfo.list[i]);
			// 	}
			// 	else
			// 	{
			// 		this._rankList.push(null);
			// 	}
			// }
			this.setRankInfo(this.rankingImg0, this.rank0Group, this._rankList[0]);
			this.setRankInfo(this.rankingImg1, this.rank1Group, this._rankList[1]);
			this.setRankInfo(this.rankingImg2, this.rank2Group, this._rankList[2]);
			this.setRankInfo(this.rankingImg3, this.rank3Group, this._rankList[3]);
		}
	}

	private setRankInfo(head: HeadComponent, group: eui.Group, info: RankInfo)
	{
		if (info)
		{
			group.visible = true;
			head.init(info, 60);
		}
	}

	private _txtDef: table.TextDefine;
	protected onClickHandler(event: egret.TouchEvent)
	{
		if (this.moreGroup.visible && event.target != this.moreBtn)
		{
			this._panelAnime.setMoreOutAnime();
		}
		switch (event.target)
		{
			case this.userHeadComp:
				SoundManager.playEffect(MusicAction.buttonClick);
				UserManager.reqShowOtherUserInfoPanel(UserManager.userInfo.roleId);
				break;
			case this.addDiamondBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				this._panelAnime.setOutAnime();
				JumpUtil.JumpToShopping(ShopGroupIndex.Diamond);
				break;
			case this.addGoldBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				this._panelAnime.setOutAnime();
				JumpUtil.JumpToShopping(ShopGroupIndex.Gold);
				break;
			case this.pokerBtn:
				SoundManager.playButtonEffect(event.target);
				this._panelAnime.setOutAnime();
				JumpUtil.JumpToPlayingField();
				break;
			case this.matchBtn:
				SoundManager.playButtonEffect(event.target);
				this._panelAnime.setOutAnime();
				JumpUtil.JumpToChampionship();
				break;
			case this.hundredBattle:
				SoundManager.playButtonEffect(event.target);
				AlertManager.showAlertByString("暂未开启"); //move todo
				// this._panelAnime.setOutAnime();
				// JumpUtil.JumpToHundredWar();
				break;
			case this.signBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				//JumpUtil.JumpToSignIn();
				break;
			case this.activityBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				this._panelAnime.setOutAnime();
				JumpUtil.JumpToActivity();
				break;
			case this.mailBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				JumpUtil.JumpToMail();
				break;
			case this.awardsBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				JumpUtil.JumpToGoldenBeanAward();
				break;
			case this.shopBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				this._panelAnime.setOutAnime();
				JumpUtil.JumpToShopping();
				break;
			case this.friendBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				this._panelAnime.setOutAnime();
				JumpUtil.JumpTofriend();
				break;
			case this.assignmentBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				this._panelAnime.setOutAnime();
				JumpUtil.JumpToAssignment();
				break;
			case this.moreBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				if (this.moreGroup.visible)
				{
					this._panelAnime.setMoreOutAnime();
				}
				else
				{
					this._panelAnime.setMoreEnterAnime();
				}
				break;
			case this.freeGoldGroup:
				SoundManager.playEffect(MusicAction.buttonClick);
				UserManager.reqGetFreeGold();
				break;
			case this.safeBoxBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				JumpUtil.JumpToSafeBox(UIModuleName.GameHallPanel);
				break;
			case this.gameRuleBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				this._panelAnime.setOutAnime();
				JumpUtil.JumpToGameRule();
				break;
			case this.settingBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				this._panelAnime.setOutAnime();
				JumpUtil.JumpToSetting();
				break;
			case this.bindBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				if (FuncOpenUtils.isOpened(FuncType.Bind))
				{
					this.gotoBinding();
				}
				break;
			case this.rankingImg0:
				SoundManager.playEffect(MusicAction.buttonClick);
				if (this._rankList[0])
				{
					UserManager.reqShowOtherUserInfoPanel(this._rankList[0].roleId);
				}
				break;
			case this.rankingImg1:
				SoundManager.playEffect(MusicAction.buttonClick);
				if (this._rankList[1])
				{
					UserManager.reqShowOtherUserInfoPanel(this._rankList[1].roleId);
				}
				break;
			case this.rankingImg2:
				SoundManager.playEffect(MusicAction.buttonClick);
				if (this._rankList[2])
				{
					UserManager.reqShowOtherUserInfoPanel(this._rankList[2].roleId);
				}
				break;
			case this.rankingImg3:
				SoundManager.playEffect(MusicAction.buttonClick);
				if (this._rankList[3])
				{
					UserManager.reqShowOtherUserInfoPanel(this._rankList[3].roleId);
				}
				break;
			case this.rankingImg4:
			case this.rankingImg5:
				SoundManager.playEffect(MusicAction.buttonClick);
				this._panelAnime.setRankOutAnime();
				JumpUtil.JumpTorank();
				break;
			case this.monthCardBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				JumpUtil.JumpToMonthCard();
				break;
			case this.morePlayBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				this._panelAnime.setOutAnime();
				UIManager.showPanel(UIModuleName.MorePlayPanel);
				break;
			case this.inviteBtn:
				SoundManager.playEffect(MusicAction.buttonClick);
				if (FuncOpenUtils.isOpened(FuncType.Invite))
				{
					JumpUtil.JumpToInvite();
				}
				break;
		}
	}
	private gotoBinding()
	{
		UIManager.showPanel(UIModuleName.BindAccountPanel);
	}
	/**
	 * 免费金币倒计时
	 */
	private refreshFreeGoldTime()
	{
		if (TimeManager.GetServerUtcTimestamp() - UserManager.userInfo.lastGoldTime >= ProjectDefined.freeGoldTime)
		{
			this.freeGoldTimeLabel.visible = false;
			this.freeGoldBtn["getFreeGoldImg"].visible = true;
			this.freeGoldBtn["lightBg"].visible = true;
			egret.Tween.get(this.freeGoldBtn["lightBg"], { loop: true })
				.set({ scaleX: 0.5, scaleY: 0.5, alpha: 0 })
				.to({ scaleX: 1, scaleY: 1, alpha: 0.8 }, 800)
				.to({ scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 800)
				.wait(2000);
			egret.Tween.get(this.freeGoldBtn, { loop: true })
				.set({ y: 90 })
				.to({ y: 80 }, 800)
				.to({ y: 90 }, 800, egret.Ease.bounceOut)
				.wait(2000);
			this.freeGoldGroup.touchEnabled = true;
			game.Tick.RemoveSecondsInvoke(this.refreshFreeGoldTime, this);
		}
		else
		{
			let left: number = Math.floor(UserManager.userInfo.lastGoldTime + ProjectDefined.freeGoldTime - TimeManager.GetServerUtcTimestamp());
			this.freeGoldTimeLabel.text = game.DateTimeUtil.countDownFormat(left, false);
		}
	}
	/**
	 * 重置免费金币倒计时
	 */
	private resetFreeGoldTime()
	{
		this.refreshFreeGoldTime();
		if (TimeManager.GetServerUtcTimestamp() - UserManager.userInfo.lastGoldTime < ProjectDefined.freeGoldTime)
		{
			this.freeGoldTimeLabel.visible = true;
			this.freeGoldBtn["getFreeGoldImg"].visible = false;
			this.freeGoldBtn["lightBg"].visible = false;
			egret.Tween.removeTweens(this.freeGoldBtn["lightBg"]);
			egret.Tween.removeTweens(this.freeGoldBtn);
			this.freeGoldBtn.y = 90;
			this.freeGoldGroup.touchEnabled = false;
			game.Tick.AddSecondsInvoke(this.refreshFreeGoldTime, this);
		}
	}
}