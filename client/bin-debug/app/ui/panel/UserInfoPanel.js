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
 * 用户信息面板
 */
var UserInfoPanel = (function (_super) {
    __extends(UserInfoPanel, _super);
    function UserInfoPanel() {
        var _this = _super.call(this) || this;
        _this._maxchar = 35;
        _this.situationIndex = 1;
        _this.achieveIndex = 2;
        _this.setSkinName(UIModuleName.UserInfoPanel);
        return _this;
    }
    UserInfoPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        var array = new Array();
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
    };
    UserInfoPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.userInfoTab.init(0);
    };
    UserInfoPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        var otherUserInfo = UserManager.otherUserInfo;
        if (otherUserInfo == null || otherUserInfo.roleId == UserManager.userInfo.roleId) {
            if (otherUserInfo == null) {
                this.userinfo = UserManager.userInfo;
            }
            else {
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
        else {
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
    };
    UserInfoPanel.prototype.setInfo = function (info) {
        this.diamondNumLabel.text = qin.MathUtil.numAddSpace(info.diamond);
        this.goldNumLabel.text = qin.MathUtil.numAddSpace(info.gold);
        this.refreshUserInfo(info);
        this.refreshOtherVipInfo(info);
        this.userIdLabel.text = info.roleId.toString();
        this.levelLabel.text = info.level.toString();
        this.titleLabel.text = UserUtil.getTitle(info.level);
        this.levelProgressImg.width = 340;
        this.levelProgressImg.width *= qin.MathUtil.clamp(UserUtil.getPercentage(info.level, info.exp), 0, 1);
        this.expLabel.text = UserUtil.getExpStringPercent(info.level, info.exp);
        this.setStateLabel(info);
    };
    /**
     * 显示状态
     */
    UserInfoPanel.prototype.setStateLabel = function (info) {
        switch (info.userState) {
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
                var roomDef = RoomDefined.GetInstance().getDefinition(info.stateConfId);
                if (roomDef) {
                    var patternName = PlayingFieldManager.getPatternName(roomDef.type);
                    this.stateLabel.text = qin.StringUtil.format("在{0}：{1}，{2}买入", patternName, PlayingFieldManager.roomIdAddZero(info.stateId), qin.MathUtil.formatNum(roomDef.sBuyin));
                }
                break;
            case UserState.InMatch:
                var matchDef = ChampionshipDefined.GetInstance().getDefinition(info.stateConfId);
                if (matchDef) {
                    this.stateLabel.text = qin.StringUtil.format("{0}中", matchDef.name);
                }
                break;
            case UserState.InHundredWar:
                var hundredWarDef = HundredWarDefined.GetInstance().getDefinition(info.stateConfId);
                if (hundredWarDef) {
                    this.stateLabel.text = qin.StringUtil.format("百人大战：{0}中", hundredWarDef.name);
                }
                break;
        }
    };
    UserInfoPanel.prototype.setSituation = function (info) {
        this.joinTimeLabel.text = qin.DateTimeUtil.formatDate(new Date(info.createdTime * 1000), qin.DateTimeUtil.Format_Standard_Date);
        this.maxGoldLabel.text = qin.MathUtil.numAddSpace(info.maxGold);
        this.maxGoldOnetimeLabel.text = qin.MathUtil.numAddSpace(info.maxGoldOnetimes);
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
        if (!this.maxHandList) {
            this.maxHandList = new Array();
            for (var i = 0; i < this.maxHandGroup.numChildren; i++) {
                var card = this.maxHandGroup.getChildAt(i);
                this.maxHandList.push(card);
            }
            this.maxHandList.reverse();
        }
        for (var _i = 0, _a = this.maxHandList; _i < _a.length; _i++) {
            var item = _a[_i];
            item.visible = false;
        }
        var list = info.maxHandList;
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (i < this.maxHandList.length) {
                    var card = this.maxHandList[i];
                    card.visible = true;
                    card.init(list[i]);
                    card.initElementsShow2();
                }
            }
        }
    };
    UserInfoPanel.prototype.refreshUserInfo = function (info) {
        this.userNameLabel.text = info.name;
        this.userHeadComp.init(info, 120);
        switch (info.sex) {
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
    };
    UserInfoPanel.prototype.refreshMyInfo = function () {
        this.refreshUserInfo(UserManager.userInfo);
    };
    UserInfoPanel.prototype.refreshVipInfo = function () {
        this.refreshOtherVipInfo(UserManager.userInfo);
    };
    UserInfoPanel.prototype.refreshOtherVipInfo = function (info) {
        if (!VipManager.isVip(info)) {
            this.vipGroup.visible = false;
        }
        else {
            this.vipGroup.visible = true;
            this.vipLevelLabel.text = "VIP " + info.vipLevel;
        }
    };
    UserInfoPanel.prototype.refreshAchieveInfo = function (userInfo) {
        UIUtil.writeListInfo(this.achieveList, AchievementManager.getAchieveListByTag(this.userinfo, AchieveTag.Achievement), "id");
    };
    UserInfoPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        VipManager.vipUpgradeEvent.addListener(this.refreshVipInfo, this);
        UserManager.onSetUserInfoComplete.addListener(this.refreshMyInfo, this);
        UserManager.onCreateRoleEvent.addListener(this.refreshMyInfo, this);
        UserManager.headImageUpdateEvent.addListener(this.refreshMyInfo, this);
        this.userInfoTab.tabChangeEvent.addListener(this.onBarItemTap, this);
        this.userDesLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onChangeSign, this);
        this.requestBtn.enabled = true;
    };
    UserInfoPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        VipManager.vipUpgradeEvent.removeListener(this.refreshVipInfo, this);
        UserManager.onSetUserInfoComplete.removeListener(this.refreshMyInfo, this);
        UserManager.onCreateRoleEvent.removeListener(this.refreshMyInfo, this);
        UserManager.headImageUpdateEvent.removeListener(this.refreshMyInfo, this);
        this.userInfoTab.tabChangeEvent.removeListener(this.onBarItemTap, this);
        this.userDesLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onChangeSign, this);
        UserManager.otherUserInfo = null;
    };
    /**
     * 点击面板按钮事件处理
    */
    UserInfoPanel.prototype.clickHandler = function (event) {
        switch (event.target) {
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
                if (UserManager.otherUserInfo) {
                    FriendManager.reqAddPlayer(UserManager.otherUserInfo.roleId);
                }
                this.requestBtn.enabled = false;
                break;
            case this.closeButton:
                SoundManager.playButtonEffect(event.target);
                if (this.userinfo.roleId == UserManager.userInfo.roleId) {
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
    };
    /**
     * 发送删除好友请求
    */
    UserInfoPanel.prototype.sendDelFriendRequest = function () {
        if (UserManager.otherUserInfo) {
            FriendManager.reqRemovePlayer(UserManager.otherUserInfo.roleId);
        }
    };
    UserInfoPanel.prototype.onChangeSign = function (e) {
        if (this.userDesLabel.text) {
            this.userDesLabel.text = ForbiddenDefined.GetInstance().replaceView(this.userDesLabel.text);
        }
    };
    UserInfoPanel.prototype.reqSaveSign = function () {
        var userDes;
        if (this.userDesLabel.text != UserManager.userInfo.sign) {
            userDes = this.userDesLabel.text;
        }
        UserManager.reqSetUserInfo(userDes, null, null);
    };
    UserInfoPanel.prototype.showFriendUI = function (isSelf) {
        if (isSelf) {
            this.myPrizeBtn.visible = true;
            this.deleteFriendBtn.visible = false;
            this.requestBtn.visible = false;
            this.buyUserGiftBtn.label = this.buyGiftBtn.label = "购买礼物";
            this.buyUserItemBtn.label = "购买道具";
            this.buyVipBtn.label = "购买VIP";
        }
        else {
            this.buyUserGiftBtn.label = this.buyGiftBtn.label = "赠送礼物";
            this.buyUserItemBtn.label = "赠送道具";
            this.buyVipBtn.label = "赠送VIP";
            if (FriendManager.isFriend(UserManager.otherUserInfo.roleId)) {
                this.myPrizeBtn.visible = false;
                this.deleteFriendBtn.visible = true;
                this.requestBtn.visible = false;
            }
            else {
                this.myPrizeBtn.visible = false;
                this.deleteFriendBtn.visible = false;
                this.requestBtn.visible = true;
            }
        }
    };
    UserInfoPanel.prototype.onBarItemTap = function (index) {
        if (index == this.achieveIndex) {
            this.refreshAchieveInfo(this.userinfo);
        }
        else if (index == this.situationIndex) {
            this.setSituation(this.userinfo);
            this.situationTab.setSelectIndex(0);
        }
    };
    return UserInfoPanel;
}(BasePanel));
__reflect(UserInfoPanel.prototype, "UserInfoPanel");
//# sourceMappingURL=UserInfoPanel.js.map