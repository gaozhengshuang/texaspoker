var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 邀请管理
 */
var InviteManager = (function () {
    function InviteManager() {
    }
    InviteManager.initialize = function (result) {
        //设置奖励数据
        InviteManager.setAwardInfo(result);
        qin.Tick.AddSecondsInvoke(InviteManager.refreshAwardInfo, InviteManager);
    };
    /**
     * 发送绑定邀请码请求
    */
    InviteManager.reqBindInviteCode = function (shareId) {
        var callback = function (result) {
            if (result.data) {
                UserManager.userInfo.bindRoleId = result.data.bindRoleId;
                InviteManager.OnBindInviteCodeEvent.dispatch();
            }
        };
        var errorCallback = function (result) {
            if (result.data) {
                AlertManager.showAlert("此邀请码不正确，请检查后重新输入");
            }
        };
        SocketManager.call(Command.BindInviteCode_Req_3708, { shareId: shareId }, callback, errorCallback, this);
    };
    /**
     * 拉取邀请奖励数据
    */
    InviteManager.reqInviteAward = function () {
        SocketManager.call(Command.InviteAward_Req_3714, null, InviteManager.setAwardInfo, null, this);
    };
    /**
     * 设置奖励数据
    */
    InviteManager.setAwardInfo = function (result) {
        if (result.data) {
            if (!InviteManager.inviteAwardInfo) {
                InviteManager.inviteAwardInfo = new InviteAwardInfo();
            }
            InviteManager.inviteAwardInfo.reset();
            if (result.data.getBean) {
                result.data.getBean = result.data.getBean * ProjectDefined.GetInstance().finishSelf;
            }
            if (result.data.gotBean) {
                result.data.gotBean = result.data.gotBean * ProjectDefined.GetInstance().finishSelf;
            }
            InviteManager.inviteAwardInfo.copyValueFrom(result.data);
            InviteManager.OnInviteAwardEvent.dispatch();
        }
        InviteManager._time = 0;
    };
    /**
     * 发送获取绑定数据请求
    */
    InviteManager.reqBindListInfo = function (startId, count) {
        if (startId === void 0) { startId = 0; }
        if (count === void 0) { count = 10; }
        var callback = function (result) {
            var isBottom = true;
            var bindList = new Array();
            if (result.data && result.data.logList) {
                if (result.data.logList.length < count) {
                    isBottom = true;
                }
                else {
                    isBottom = false;
                }
                for (var _i = 0, _a = result.data.logList; _i < _a.length; _i++) {
                    var info = _a[_i];
                    var bindInfo = new InviteBindInfo();
                    bindInfo.copyValueFrom(info);
                    bindList.push(bindInfo);
                }
            }
            InviteManager.OnBindListInfoEvent.dispatch({ isBottom: isBottom, bindList: bindList });
        };
        SocketManager.call(Command.NewGiftFinish_Req_3709, { startId: startId, count: count }, callback, null, this);
    };
    /**
     * 发送获取充值信息请求
    */
    InviteManager.reqPayListInfo = function (startId, count) {
        if (startId === void 0) { startId = 0; }
        if (count === void 0) { count = 10; }
        var callback = function (result) {
            var isBottom = true;
            var payList = new Array();
            if (result.data && result.data.logList) {
                if (result.data.logList.length < count) {
                    isBottom = true;
                }
                else {
                    isBottom = false;
                }
                for (var _i = 0, _a = result.data.logList; _i < _a.length; _i++) {
                    var info = _a[_i];
                    var payInfo = new InviteBindInfo();
                    payInfo.copyValueFrom(info);
                    payList.push(payInfo);
                }
            }
            InviteManager.OnPayListInfoEvent.dispatch({ isBottom: isBottom, payList: payList });
        };
        SocketManager.call(Command.BindPay_Req_3710, { startId: startId, count: count }, callback, null, this);
    };
    /**
     * 发送领取金豆请求
    */
    InviteManager.reqBringBean = function () {
        var callback = function (result) {
            PropertyManager.ShowItemList();
            InviteManager.OnBringBeanEvent.dispatch();
        };
        PropertyManager.OpenGet();
        SocketManager.call(Command.BringNewGiftGoldBean_Req_3711, null, callback, null, this);
    };
    /**
     * 发送领取金币请求
    */
    InviteManager.reqBringGold = function () {
        var callback = function (result) {
            PropertyManager.ShowItemList();
            InviteManager.OnBringGoldEvent.dispatch();
        };
        PropertyManager.OpenGet();
        SocketManager.call(Command.BringBindGold_Req_3712, null, callback, null, this);
    };
    Object.defineProperty(InviteManager, "isCanBring", {
        /**
         * 判断是否有可领取的奖励
        */
        get: function () {
            if (InviteManager.inviteAwardInfo) {
                if (InviteManager.inviteAwardInfo.getBean > 0 || InviteManager.inviteAwardInfo.getGold > 0) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InviteManager, "isInviteOpen", {
        /**
         * 判断邀请功能是否在开启时间内
        */
        get: function () {
            var inviteDef = ProjectDefined.GetInstance().invite;
            if (inviteDef) {
                var dt = TimeManager.GetServerLocalDateTime();
                var startDt = void 0;
                var endDt = void 0;
                if (inviteDef.startTime) {
                    startDt = ActivityDefined.GetInstance().getDate(inviteDef, inviteDef.startTime);
                }
                else {
                    inviteDef.startDt = TimeManager.Utc1970;
                }
                if (inviteDef.endTime) {
                    endDt = ActivityDefined.GetInstance().getDate(inviteDef, inviteDef.endTime);
                }
                else {
                    endDt = new Date(2099, 0, 1, 0, 0, 0);
                }
                if (dt >= startDt && dt < endDt) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 定时刷新奖励数据
    */
    InviteManager.refreshAwardInfo = function () {
        InviteManager._time++;
        if (InviteManager._time >= 300) {
            InviteManager._time = 0;
            InviteManager.reqInviteAward();
        }
    };
    /**
     *绑定好友邀请码成功
    */
    InviteManager.OnBindInviteCodeEvent = new qin.DelegateDispatcher();
    /**
     * 领取新人礼金豆奖励成功
    */
    InviteManager.OnBringBeanEvent = new qin.DelegateDispatcher();
    /**
     * 领取绑定充值金币奖励成功
    */
    InviteManager.OnBringGoldEvent = new qin.DelegateDispatcher();
    /**
     * 获取绑定数据成功
    */
    InviteManager.OnBindListInfoEvent = new qin.DelegateDispatcher();
    /**
     * 获取充值数据成功
    */
    InviteManager.OnPayListInfoEvent = new qin.DelegateDispatcher();
    /**
     * 获取奖励数据成功
    */
    InviteManager.OnInviteAwardEvent = new qin.DelegateDispatcher();
    return InviteManager;
}());
__reflect(InviteManager.prototype, "InviteManager");
//# sourceMappingURL=InviteManager.js.map