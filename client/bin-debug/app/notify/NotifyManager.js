var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 通知管理
 */
var NotifyManager = (function () {
    function NotifyManager() {
    }
    /**
     * 初始化
     */
    NotifyManager.initialize = function () {
        NotifyManager._notifyMap = new qin.Dictionary();
        NotifyManager._notifyMap.add(NotifyType.Mtt_HaveJoinedList, new MttHaveJoinedListHandler(NotifyType.Mtt_HaveJoinedList));
        NotifyManager._notifyMap.add(NotifyType.Mail_HaveNewSystem, new NewMailNotifyHandler(NotifyType.Mail_HaveNewSystem));
        NotifyManager._notifyMap.add(NotifyType.Mail_HaveNewPlayer, new NewMailNotifyHandler(NotifyType.Mail_HaveNewPlayer));
        NotifyManager._notifyMap.add(NotifyType.Achieve_HaveDaily, new AchieveNotifyHandler(NotifyType.Achieve_HaveDaily));
        NotifyManager._notifyMap.add(NotifyType.Achieve_HaveWeekly, new AchieveNotifyHandler(NotifyType.Achieve_HaveWeekly));
        NotifyManager._notifyMap.add(NotifyType.Achieve_HaveGrowUp, new AchieveNotifyHandler(NotifyType.Achieve_HaveGrowUp));
        NotifyManager._notifyMap.add(NotifyType.Achieve_PrimaryPattern, new AchieveNotifyHandler(NotifyType.Achieve_PrimaryPattern));
        NotifyManager._notifyMap.add(NotifyType.Achieve_MiddlePattern, new AchieveNotifyHandler(NotifyType.Achieve_MiddlePattern));
        NotifyManager._notifyMap.add(NotifyType.Achieve_HighPattern, new AchieveNotifyHandler(NotifyType.Achieve_HighPattern));
        NotifyManager._notifyMap.add(NotifyType.Friend_ReceivePrize, new FriendPrizeNotifyHandler(NotifyType.Friend_ReceivePrize));
        NotifyManager._notifyMap.add(NotifyType.Friend_HaveNew, new NewFriendNotifyHandler(NotifyType.Friend_HaveNew));
        NotifyManager._notifyMap.add(NotifyType.Gambling_TimeAward, new NewTimeAwardNotifyHandler(NotifyType.Gambling_TimeAward));
        NotifyManager._notifyMap.add(NotifyType.HundredWar_Chat, new HundredWarChatNotifyHandler(NotifyType.HundredWar_Chat));
        NotifyManager._notifyMap.add(NotifyType.MonthCard, new MonthCardNotifyHandler(NotifyType.MonthCard));
        NotifyManager._notifyMap.add(NotifyType.Signin, new SignInNotifyHandler(NotifyType.Signin));
        NotifyManager._notifyMap.add(NotifyType.BankruptSubsidy, new BankruptSubsidyNotifyHandler(NotifyType.BankruptSubsidy));
        NotifyManager._notifyMap.add(NotifyType.NewGift, new NewGiftNotifyHandler(NotifyType.NewGift));
        NotifyManager._notifyMap.add(NotifyType.Invite, new InviteNotifyHandler(NotifyType.Invite));
        NotifyManager._notifyMap.add(NotifyType.Share, new ShareNotifyHandler(NotifyType.Share));
        //
        // 组合类型(先传入本类型，再传入其他子类型)
        //
        NotifyManager._notifyMap.add(NotifyType.Achieve_HaveNoTake, new MultiMessageNotifyHandle([NotifyType.Achieve_HaveNoTake, NotifyType.Achieve_HaveDaily, NotifyType.Achieve_HaveWeekly, NotifyType.Achieve_HaveGrowUp]));
        NotifyManager._notifyMap.add(NotifyType.Friend_Hall, new MultiMessageNotifyHandle([NotifyType.Friend_Hall, NotifyType.Friend_ReceivePrize, NotifyType.Friend_HaveNew]));
        NotifyManager._notifyMap.add(NotifyType.Mail_HaveNew, new MultiMessageNotifyHandle([NotifyType.Mail_HaveNew, NotifyType.Mail_HaveNewSystem, NotifyType.Mail_HaveNewPlayer]));
        NotifyManager._notifyMap.add(NotifyType.ActivityRedPoint, new MultiMessageNotifyHandle([NotifyType.ActivityRedPoint, NotifyType.BankruptSubsidy]));
        // _notifyMap.Add(NotifyType.CarnivalAward, new CarnivalNotifyHandler());
        // _notifyMap.Add(NotifyType.SevenStar_2, new MultiMessageNotifyHandle(NotifyType.SevenStar_2, NotifyType.SevenStar));
        //==========================最后抛送初始化完成事件==========================//
        NotifyManager.OnInitCompleteEvent.dispatch();
    };
    /**
     * 重新登录初始化
     */
    NotifyManager.initByReLogin = function () {
        //把上个账号暂存的所有数据还原成默认值
        NotifyManager.reset();
        NotifyManager.OnNewInitEvent.dispatch();
    };
    /**
     * 抛出通知
     */
    NotifyManager.dispatchNotify = function (type, id) {
        var count = NotifyManager.getCount(type, id);
        NotifyManager.OnNotifyValueChanged.dispatch({ type: type, count: count, id: id });
    };
    NotifyManager.setParams = function (type, count, params) {
        if (NotifyManager._notifyMap == null) {
            return;
        }
        var handle = NotifyManager._notifyMap.getValue(type);
        if (handle && handle instanceof MultiNotifyHandle) {
            handle.setParams(params);
        }
    };
    /**
     * 获取某种类型的数量
     */
    NotifyManager.getCount = function (type, params) {
        var handle = NotifyManager._notifyMap.getValue(type);
        if (handle) {
            if (handle instanceof MultiNotifyHandle) {
                if (params != undefined) {
                    return handle.getCountByParams(params);
                }
                else {
                    return handle.totalCount;
                }
            }
            else {
                return handle.count;
            }
        }
        return 0;
    };
    /**
     * 清除带有附加参数的通知
     */
    NotifyManager.clearMultiParams = function () {
        if (NotifyManager._notifyMap == null) {
            return;
        }
        var values = NotifyManager._notifyMap.getValues();
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var kv = values_1[_i];
            if (kv instanceof MultiNotifyHandle) {
                kv.clearParams();
            }
        }
    };
    /**
     * 清除指定类型的通知
     */
    NotifyManager.clear = function (type) {
        var handle = NotifyManager._notifyMap.getValue(type);
        if (handle) {
            handle.reset();
        }
    };
    /**
     * 重置清除所有handle总保存的临时变量
     */
    NotifyManager.reset = function () {
        var values = NotifyManager._notifyMap.getValues();
        for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
            var kv = values_2[_i];
            kv.reset();
        }
    };
    /**
     * 第一个参数类型type，第二个数字count，第三个参数附加参数params
     */
    NotifyManager.OnNotifyValueChanged = new qin.DelegateDispatcher();
    /**
     * 通知系统初始化完成事件
     */
    NotifyManager.OnInitCompleteEvent = new qin.DelegateDispatcher();
    /**
     * 重新登录
     */
    NotifyManager.OnNewInitEvent = new qin.DelegateDispatcher();
    return NotifyManager;
}());
__reflect(NotifyManager.prototype, "NotifyManager");
//# sourceMappingURL=NotifyManager.js.map