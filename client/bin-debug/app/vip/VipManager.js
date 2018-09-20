var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 会员管理
 */
var VipManager = (function () {
    function VipManager() {
    }
    /**
     * 计算vip类型
     */
    VipManager.getVipType = function (vipTime, yearVipTime) {
        var serverTimeNow = TimeManager.GetServerUtcTimestamp();
        if (yearVipTime && yearVipTime > serverTimeNow) {
            return VipType.YearVip;
        }
        else if (vipTime && vipTime > serverTimeNow) {
            return VipType.Vip;
        }
        else {
            return VipType.NoVip;
        }
    };
    VipManager.initialize = function () {
        SocketManager.AddCommandListener(Command.Vip_GetVipTime_2001, this.onGetVipTime, this);
        this.refreshVipInfo();
    };
    /**
     * 是否开启过vip(无论是否过期,开通过就算)
     */
    VipManager.isOpenEverVip = function () {
        if (!UserManager.userInfo.vipTime && !UserManager.userInfo.yearVipTime) {
            return false;
        }
        return true;
    };
    VipManager.onGetVipTime = function (result) {
        var flag = VipManager.isOpenEverVip();
        if (result.data["vipTime"]) {
            UserManager.userInfo.vipTime = result.data["vipTime"];
        }
        if (result.data["yearVipTime"]) {
            UserManager.userInfo.yearVipTime = result.data["yearVipTime"];
        }
        //UserManager.userInfo.vipLevel = VipManager.getVipLevel(UserManager.userInfo.vipExp);
        UserManager.userInfo.vipType = VipManager.getVipType(UserManager.userInfo.vipTime, UserManager.userInfo.yearVipTime);
        UserManager.userInfo.vipSpeed = ProjectDefined.GetInstance().getVipSpeedDefinition(UserManager.userInfo.vipType).speed;
        if (flag == false && VipManager.isVip() && !UserManager.userInfo.isSafePwd) {
            var goSavePanel = function () {
                UIManager.showPanel(UIModuleName.BindPhonePanel, { isShowCreatePwd: true });
            };
            AlertManager.showConfirm("您开通了VIP，保险箱已为您免费开放，请尽快设定您的保险箱密码!", goSavePanel, null, null, null, null, "前往设定");
        }
        VipManager.vipUpgradeEvent.dispatch();
    };
    VipManager.refreshVipInfo = function () {
        UserManager.userInfo.vipType = VipManager.getVipType(UserManager.userInfo.vipTime, UserManager.userInfo.yearVipTime);
        UserManager.userInfo.vipSpeed = ProjectDefined.GetInstance().getVipSpeedDefinition(UserManager.userInfo.vipType).speed;
    };
    VipManager.isVip = function (info) {
        var tempInfo;
        if (info) {
            tempInfo = info;
        }
        else {
            tempInfo = UserManager.userInfo;
        }
        if (tempInfo.vipType == null || tempInfo.vipType == VipType.NoVip) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * 获取vip到期时间
     */
    VipManager.GetVipTime = function (info) {
        if (info === void 0) { info = UserManager.userInfo; }
        var serverTimeNow = TimeManager.GetServerUtcTimestamp();
        switch (info.vipType) {
            case VipType.NoVip:
                return 0;
            case VipType.YearVip:
                if (info.vipTime > serverTimeNow) {
                    return info.vipTime;
                }
                else {
                    return info.yearVipTime;
                }
            case VipType.Vip:
                return info.vipTime;
            default:
                return 0;
        }
    };
    /**
     * 获得激活了的月卡信息
    */
    VipManager.getActiveMonthCard = function () {
        var monthCardsList = new Array();
        var activiteMonthCardList = new Array();
        var info;
        for (var i = 0; i < ShopDefined.GetInstance().dataList.length; i++) {
            info = new ShopInfo();
            info.id = ShopDefined.GetInstance().dataList[i].id;
            if (info.definition && info.definition.type == ShopType.MonthCard) {
                monthCardsList.push(info);
            }
        }
        for (var _i = 0, monthCardsList_1 = monthCardsList; _i < monthCardsList_1.length; _i++) {
            var monthCard = monthCardsList_1[_i];
            if (monthCard.definition) {
                var info_1 = AwardManager.GetExchangeInfo(monthCard.definition.awardId);
                if (info_1) {
                    var left = info_1.lastTime - TimeManager.GetServerUtcTimestamp();
                    if (left > 0) {
                        activiteMonthCardList.push(monthCard);
                    }
                }
            }
            else {
                qin.Console.log("月卡配置异常！");
            }
        }
        return activiteMonthCardList;
    };
    /**
     * 判断是否激活了月卡
    */
    VipManager.isActiveMonthCard = function () {
        var infoList = VipManager.getActiveMonthCard();
        if (infoList && infoList.length > 0) {
            return true;
        }
        return false;
    };
    /**
     * 是否领取了月卡奖励
    */
    VipManager.isBringMonthCardAward = function () {
        var bringAwardDef;
        var activiteMonthCardList = VipManager.getActiveMonthCard();
        if (activiteMonthCardList) {
            for (var _i = 0, activiteMonthCardList_1 = activiteMonthCardList; _i < activiteMonthCardList_1.length; _i++) {
                var monthCard = activiteMonthCardList_1[_i];
                if (monthCard.definition) {
                    var info = AwardManager.GetExchangeInfo(monthCard.definition.awardId);
                    if (info) {
                        bringAwardDef = AwardDefined.GetInstance().getAwardInfoByPreId(info.id);
                        if (bringAwardDef) {
                            var info1 = AwardManager.GetExchangeInfo(bringAwardDef.id);
                            if (!info1) {
                                return false;
                            }
                            else {
                                if (info1.times < bringAwardDef.limit) {
                                    return false;
                                }
                            }
                        }
                    }
                }
                else {
                    qin.Console.log("月卡配置异常！");
                }
            }
        }
        return true;
    };
    /**
    * vip时间变更事件
    */
    VipManager.vipUpgradeEvent = new qin.DelegateDispatcher();
    return VipManager;
}());
__reflect(VipManager.prototype, "VipManager");
//# sourceMappingURL=VipManager.js.map