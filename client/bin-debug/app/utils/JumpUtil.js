var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 跳转工具
 */
var JumpUtil = (function () {
    function JumpUtil() {
    }
    /**
     * 跳转到商城界面
     */
    JumpUtil.JumpToShopping = function (index, prePanel) {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: index, prevPanelName: prePanel });
    };
    /**
     * 跳转到礼物商城界面
     */
    JumpUtil.JumpToGiftShop = function (userInfo, index, subTab) {
        UIManager.showPanel(UIModuleName.GiftShopPanel, { tab: index, subTab: subTab, userInfo: userInfo });
    };
    /**
     * 跳转到好友界面
     */
    JumpUtil.JumpTofriend = function () {
        UIManager.showPanel(UIModuleName.FriendPanel);
    };
    /**
     * 跳转到游戏场
     */
    JumpUtil.JumpToPlayingField = function (index) {
        UIManager.showPanel(UIModuleName.PlayingFieldPanel);
    };
    /**
     * 跳转到锦标赛
     */
    JumpUtil.JumpToChampionship = function () {
        UIManager.showPanel(UIModuleName.ChampionshipPanel);
    };
    /**
     * 跳转到活动中心
     */
    JumpUtil.JumpToActivity = function (prePanel) {
        UIManager.showPanel(UIModuleName.ActivityPanel, { prevPanelName: prePanel });
    };
    /**
     * 跳转到邮箱
     */
    JumpUtil.JumpToMail = function () {
        UIManager.showPanel(UIModuleName.MailPanel);
    };
    /**
     * 跳转到兑奖
     */
    JumpUtil.JumpToGoldenBeanAward = function () {
        UIManager.showPanel(UIModuleName.AwardsPanel);
    };
    /**
     * 跳转到任务界面
     */
    JumpUtil.JumpToAssignment = function () {
        UIManager.showPanel(UIModuleName.AssignmentPanel);
    };
    /**
     * 跳转到保险箱
     */
    JumpUtil.JumpToSafeBox = function (prevPanel) {
        if (VipManager.isVip()) {
            if (!UserManager.userInfo.mno) {
                UIManager.showPanel(UIModuleName.BindPhonePanel, { isShowCreatePwd: true, prevPanelName: prevPanel });
            }
            else {
                if (!UserManager.userInfo.isSafePwd) {
                    UIManager.showPanel(UIModuleName.SafeCreatePanel);
                }
                else {
                    UIManager.showPanel(UIModuleName.SafeBoxPanel);
                }
            }
        }
        else {
            AlertManager.showConfirm("保险箱功能仅对VIP用户开放", function () { JumpUtil.JumpToShopping(ShopGroupIndex.Vip, prevPanel); }, null, null, null, null, "成为VIP");
        }
    };
    /**
     * 跳转到玩法
     */
    JumpUtil.JumpToGameRule = function (prePanel) {
        UIManager.showPanel(UIModuleName.GameRulePanel, { prevPanelName: prePanel });
    };
    /**
     * 跳转到设置
     */
    JumpUtil.JumpToSetting = function () {
        UIManager.showPanel(UIModuleName.SetPanel);
    };
    /**
     * 跳转到排行榜
     */
    JumpUtil.JumpTorank = function () {
        UIManager.showPanel(UIModuleName.RankPanel);
    };
    /**
     * 战局中跳转任务
     */
    JumpUtil.JumpToAchievementInGame = function (type) {
        UIManager.showPanel(UIModuleName.AchievementInGamePanel, type);
    };
    /**
     * 百人大战跳转任务
     */
    JumpUtil.JumpToAchievementInHundredWar = function (type) {
        UIManager.showPanel(UIModuleName.AchievementInHundredWarPanel, type);
    };
    /**
     * 账号登录跳转到找回密码
     */
    JumpUtil.JumpToRetrievePwd = function (prevPanelName) {
        UIManager.showPanel(UIModuleName.AccountRetrievePwdPanel, { prevPanelName: prevPanelName });
    };
    /**
     * 跳转到找回保险箱密码
     */
    JumpUtil.JumpToSafeRetrievePwd = function () {
        UIManager.showPanel(UIModuleName.SafeBoxRetrievePwdPanel);
    };
    /**
     * 跳转到百人大战
     */
    JumpUtil.JumpToHundredWar = function () {
        UIManager.showPanel(UIModuleName.HundredWarPanel);
    };
    /**
     * 跳转百人大战帮助
     */
    JumpUtil.JumpToHundredWarHelp = function () {
        UIManager.showPanel(UIModuleName.HundredWarHelpPanel);
    };
    /**
     * 跳转百人大战奖池信息
     */
    JumpUtil.JumpToHundredWarPoolInfo = function () {
        UIManager.showPanel(UIModuleName.HundredWarPoolInfoPanel);
    };
    /**
     * 跳转百人大战庄家信息
     */
    JumpUtil.JumpToHundredWarBanker = function () {
        UIManager.showPanel(UIModuleName.HundredWarBankerListPanel);
    };
    /**
     * 跳转到胜负走势
     */
    JumpUtil.JumpToHundredWarTrend = function () {
        UIManager.showPanel(UIModuleName.HundredWarTrendPanel);
    };
    /**
     * 跳转百人大战无座玩家
     */
    JumpUtil.JumpToHundredWarNoSeatPlayer = function () {
        UIManager.showPanel(UIModuleName.HundredWarNoSeatPlayerPanel);
    };
    /**
     * 跳转百人大战结算界面
     */
    JumpUtil.JumpToHundredWarOver = function () {
        UIManager.showPanel(UIModuleName.HundredWarOverPanel);
    };
    /**
     * 跳转百人大战任务
     */
    JumpUtil.JumpToHundredWarAchieve = function (type) {
        UIManager.showPanel(UIModuleName.AchievementInHundredWarPanel, type);
    };
    /**
     * 根据玩法模式跳转
     */
    JumpUtil.JumpByPlayField = function (playMode, prePanel) {
        switch (playMode) {
            case AchieveShowPattern.PrimaryPattern:
            case AchieveShowPattern.MiddlePattern:
            case AchieveShowPattern.HighPattern:
                UIManager.showPanel(UIModuleName.PlayingFieldPanel, { enterIndex: playMode - 1, prevPanelName: prePanel });
                break;
            case AchieveShowPattern.Match:
                UIManager.showPanel(UIModuleName.ChampionshipPanel, { enterIndex: 0, prevPanelName: prePanel });
                break;
            case AchieveShowPattern.HundredWarAll:
            case AchieveShowPattern.HundredWarFun:
            case AchieveShowPattern.HundredWarRich:
                UIManager.showPanel(UIModuleName.HundredWarPanel, { prevPanelName: prePanel });
                break;
        }
    };
    /**
     * 跳转到聊天界面
     */
    JumpUtil.JumpToChatPanel = function () {
        UIManager.showPanel(UIModuleName.ChatPanel);
    };
    /**
     * 跳转到签到
     */
    JumpUtil.JumpToSignIn = function () {
        var info = ActivityManager.getOpenAchivityByType(ActivityType.Signin);
        if (info) {
            UIManager.showPanel(UIModuleName.SignInPanel, { info: info });
        }
        else {
            qin.Console.log("打开签到面板失败，签到活动数据异常！");
        }
    };
    /**
     * 跳转到公告
     */
    JumpUtil.JumpToNoticePanel = function (urlList) {
        UIManager.showPanel(UIModuleName.ImgNotifyPanel, urlList);
    };
    /**
     * 跳转到首充面板
     */
    JumpUtil.JumpToFirstPayPanel = function () {
        var info = ActivityManager.getOpenAchivityByType(ActivityType.PayPrize);
        if (info) {
            ActivityPanelJumpManager.JumpToPanel(info);
        }
        else {
            qin.Console.log("打开首充面板失败，首充数据异常！");
        }
    };
    /**
     * 跳转到充值混合界面
     */
    JumpUtil.JumpToPayModePanel = function (info) {
        UIManager.showPanel(UIModuleName.PayModePanel, info);
    };
    JumpUtil.JumpToOmahaCardTypePanel = function (cardType) {
        UIManager.showPanel(UIModuleName.OmahaCardTypePanel, cardType);
    };
    /**
     * 跳转到邀请
    */
    JumpUtil.JumpToInvite = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                        UIManager.showPanel(UIModuleName.LoadingSwitchPanel);
                        return [4 /*yield*/, RES.loadGroup(ResGroupName.ActivityCommon, 1)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup(ResGroupName.Invite, 0)];
                    case 2:
                        _a.sent();
                        UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
                        UIManager.showPanel(UIModuleName.InvitePanel);
                        return [2 /*return*/];
                }
            });
        });
    };
    JumpUtil.onResourceLoadError = function (event) {
        UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
        console.warn("Group:" + event.groupName + " has failed to load");
    };
    /**
     * 跳转到月卡
    */
    JumpUtil.JumpToMonthCard = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                        UIManager.showPanel(UIModuleName.LoadingSwitchPanel);
                        return [4 /*yield*/, RES.loadGroup(ResGroupName.ActivityCommon)];
                    case 1:
                        _a.sent();
                        UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
                        UIManager.showPanel(UIModuleName.MonthCardPanel);
                        return [2 /*return*/];
                }
            });
        });
    };
    return JumpUtil;
}());
__reflect(JumpUtil.prototype, "JumpUtil");
//# sourceMappingURL=JumpUtil.js.map