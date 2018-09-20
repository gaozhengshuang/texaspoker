var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 游戏大厅界面
 */
var GameHallPanel = (function (_super) {
    __extends(GameHallPanel, _super);
    function GameHallPanel() {
        var _this = _super.call(this) || this;
        _this.listNum = 4;
        _this.setSkinName(UIModuleName.GameHallPanel);
        return _this;
    }
    GameHallPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.addRedPoint();
        this.moreGroup.visible = false;
        this.dealerImg.source = BundleManager.getResNameByBundle(ResFixedFileName.Dealer_Png);
        UIManager.pushResizeGroup(this.panelBottom);
        this._buttonAnime = new GameHallButtonAnime(this);
        this._panelAnime = new GameHallPanelAnime(this);
        this._btnSupport = new GameHallBtnSupport(this);
        this._rankListInfo = RankManager.getRankListInfo(RankType.FriendGold);
        VersionManager.setComponentVisibleBySafe(this.firstpayBtn, this.activityBtn, this.matchBtn, this.ranking, this.safeBoxBtn, this.bindBtn, this.vipGroup, this.awardsBtn);
    };
    GameHallPanel.prototype.addRedPoint = function () {
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
    };
    GameHallPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.updateRankList();
        this.refreshUserInfoUI();
        this.resetFreeGoldTime();
        ChannelManager.checkUnFinishedPayList();
        this._btnSupport.init();
        BindAccountManager.reqGetList();
        this.inviteBtn.visible = InviteManager.isInviteOpen;
    };
    GameHallPanel.prototype.updateRankList = function () {
        if (UserManager.userInfo.name && RankManager.isRefreshRank(this._rankListInfo)) {
            this.rank0Group.visible = false;
            this.rank1Group.visible = false;
            this.rank2Group.visible = false;
            this.rank3Group.visible = false;
            RankManager.reqRankList(RankManager.getListType(RankTabType.Gold, RankListType.Friend));
        }
    };
    GameHallPanel.prototype.creatItem = function () {
        var achieveList = new Array();
        var achinfo = new AchievementInfo();
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
        achieveList.push(achinfo);
        return achieveList;
    };
    GameHallPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        if (UIManager.isShowPanel(UIModuleName.FriendMsgPanel)) {
            UIManager.takeToTopLayer(UIModuleName.FriendMsgPanel);
        }
    };
    GameHallPanel.prototype.refreshUserInfoUI = function () {
        this.userNameLabel.text = UserManager.userInfo.name.toString();
        this.userHeadComp.init(UserManager.userInfo, 120);
        if (VipManager.isVip()) {
            this.vipLevelLabel.text = "VIP" + UserManager.userInfo.vipLevel;
            this.vipGroup.visible = true;
        }
        else {
            this.vipGroup.visible = false;
        }
        this.updateRankList();
        this.refreshGold();
    };
    /**
     * 刷新财产信息
     */
    GameHallPanel.prototype.refreshGold = function (num) {
        this.goldNumLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.gold);
        this.diamondNumLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.diamond);
    };
    GameHallPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._buttonAnime.onEnable();
        this._panelAnime.onEnable();
        this._btnSupport.onEnable();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        VipManager.vipUpgradeEvent.addListener(this.refreshUserInfoUI, this);
        UserManager.propertyChangeEvent.addListener(this.refreshGold, this);
        RankManager.getRankListEvent.addListener(this.getRankList, this);
        UserManager.onCreateRoleEvent.addListener(this.refreshUserInfoUI, this);
        UserManager.onSetUserInfoComplete.addListener(this.refreshUserInfoUI, this);
        UserManager.headImageUpdateEvent.addListener(this.refreshUserInfoUI, this);
        qin.Tick.AddSecondsInvoke(this.refreshFreeGoldTime, this);
        UserManager.getFreeGoldEvent.addListener(this.resetFreeGoldTime, this);
        UIManager.onPanelCloseEvent.addListener(this._panelAnime.setRankEnterAnime.bind(this._panelAnime), this);
    };
    GameHallPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._buttonAnime.onDisable();
        this._panelAnime.onDisable();
        this._btnSupport.onDisable();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        VipManager.vipUpgradeEvent.removeListener(this.refreshUserInfoUI, this);
        UserManager.propertyChangeEvent.removeListener(this.refreshGold, this);
        RankManager.getRankListEvent.removeListener(this.getRankList, this);
        UserManager.onCreateRoleEvent.removeListener(this.refreshUserInfoUI, this);
        UserManager.onSetUserInfoComplete.removeListener(this.refreshUserInfoUI, this);
        UserManager.headImageUpdateEvent.removeListener(this.refreshUserInfoUI, this);
        qin.Tick.RemoveSecondsInvoke(this.refreshFreeGoldTime, this);
        UserManager.getFreeGoldEvent.removeListener(this.resetFreeGoldTime, this);
        UIManager.onPanelCloseEvent.removeListener(this._panelAnime.setRankEnterAnime.bind(this._panelAnime), this);
    };
    GameHallPanel.prototype.getRankList = function () {
        if (!this._rankList) {
            this._rankList = new Array();
        }
        else {
            qin.ArrayUtil.Clear(this._rankList);
        }
        if (this._rankListInfo && this._rankListInfo.list) {
            for (var i = 0; i < this.listNum; i++) {
                if (i < this._rankListInfo.list.length) {
                    this._rankList.push(this._rankListInfo.list[i]);
                }
                else {
                    this._rankList.push(null);
                }
            }
            this.setRankInfo(this.rankingImg0, this.rank0Group, this._rankList[0]);
            this.setRankInfo(this.rankingImg1, this.rank1Group, this._rankList[1]);
            this.setRankInfo(this.rankingImg2, this.rank2Group, this._rankList[2]);
            this.setRankInfo(this.rankingImg3, this.rank3Group, this._rankList[3]);
        }
    };
    GameHallPanel.prototype.setRankInfo = function (head, group, info) {
        if (info) {
            group.visible = true;
            head.init(info, 60);
        }
    };
    GameHallPanel.prototype.onClickHandler = function (event) {
        if (this.moreGroup.visible && event.target != this.moreBtn) {
            this._panelAnime.setMoreOutAnime();
        }
        switch (event.target) {
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
                this._panelAnime.setOutAnime();
                JumpUtil.JumpToHundredWar();
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
                if (this.moreGroup.visible) {
                    this._panelAnime.setMoreOutAnime();
                }
                else {
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
                this.gotoBinding();
                break;
            case this.rankingImg0:
                SoundManager.playEffect(MusicAction.buttonClick);
                if (this._rankList[0]) {
                    UserManager.reqShowOtherUserInfoPanel(this._rankList[0].roleId);
                }
                break;
            case this.rankingImg1:
                SoundManager.playEffect(MusicAction.buttonClick);
                if (this._rankList[1]) {
                    UserManager.reqShowOtherUserInfoPanel(this._rankList[1].roleId);
                }
                break;
            case this.rankingImg2:
                SoundManager.playEffect(MusicAction.buttonClick);
                if (this._rankList[2]) {
                    UserManager.reqShowOtherUserInfoPanel(this._rankList[2].roleId);
                }
                break;
            case this.rankingImg3:
                SoundManager.playEffect(MusicAction.buttonClick);
                if (this._rankList[3]) {
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
                JumpUtil.JumpToInvite();
                break;
        }
    };
    GameHallPanel.prototype.gotoBinding = function () {
        UIManager.showPanel(UIModuleName.BindAccountPanel);
    };
    /**
     * 免费金币倒计时
     */
    GameHallPanel.prototype.refreshFreeGoldTime = function () {
        if (TimeManager.GetServerUtcTimestamp() - UserManager.userInfo.lastGoldTime >= ProjectDefined.GetInstance().getValue(ProjectDefined.freeGoldTime)) {
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
            qin.Tick.RemoveSecondsInvoke(this.refreshFreeGoldTime, this);
        }
        else {
            var left = Math.floor(UserManager.userInfo.lastGoldTime + ProjectDefined.GetInstance().getValue(ProjectDefined.freeGoldTime) - TimeManager.GetServerUtcTimestamp());
            this.freeGoldTimeLabel.text = qin.DateTimeUtil.countDownFormat(left, false);
        }
    };
    /**
     * 重置免费金币倒计时
     */
    GameHallPanel.prototype.resetFreeGoldTime = function () {
        this.refreshFreeGoldTime();
        if (TimeManager.GetServerUtcTimestamp() - UserManager.userInfo.lastGoldTime < ProjectDefined.GetInstance().getValue(ProjectDefined.freeGoldTime)) {
            this.freeGoldTimeLabel.visible = true;
            this.freeGoldBtn["getFreeGoldImg"].visible = false;
            this.freeGoldBtn["lightBg"].visible = false;
            egret.Tween.removeTweens(this.freeGoldBtn["lightBg"]);
            egret.Tween.removeTweens(this.freeGoldBtn);
            this.freeGoldBtn.y = 90;
            this.freeGoldGroup.touchEnabled = false;
            qin.Tick.AddSecondsInvoke(this.refreshFreeGoldTime, this);
        }
    };
    return GameHallPanel;
}(BasePanel));
__reflect(GameHallPanel.prototype, "GameHallPanel");
//# sourceMappingURL=GameHallPanel.js.map