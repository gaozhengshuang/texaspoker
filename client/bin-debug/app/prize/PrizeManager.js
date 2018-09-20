var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 我的奖品管理
*/
var PrizeManager = (function () {
    function PrizeManager() {
    }
    /**
     * 拉取已领取列表
    */
    PrizeManager.reqGetAwardList = function (startId, count) {
        if (startId === void 0) { startId = 0; }
        if (count === void 0) { count = 10; }
        var callback = function (result) {
            var isBottom = true;
            var hasReceiveList = new Array();
            if (result.data && result.data.Array) {
                if (result.data.Array.length < count) {
                    isBottom = true;
                }
                else {
                    isBottom = false;
                }
                for (var _i = 0, _a = result.data.Array; _i < _a.length; _i++) {
                    var arrayInfo = _a[_i];
                    var info = void 0;
                    info = arrayInfo;
                    info.isGet = 2;
                    hasReceiveList.push(info);
                }
            }
            PrizeManager.onGetAwardListEvent.dispatch({ isBottom: isBottom, hasReceiveList: hasReceiveList });
        };
        SocketManager.call(Command.PrizeGetList_Req_3684, { startId: startId, count: count }, callback, null, this);
    };
    /**
     * 发送领取奖品请求
    */
    PrizeManager.reqGetAward = function (id) {
        var callback = function (result) {
            PrizeManager.onGetAwardEvent.dispatch(id);
        };
        SocketManager.call(Command.Req_UseItem_3021, { Id: id, Count: 1, msg: null }, callback, null, this);
    };
    /**
     * 拉取收货信息
    */
    PrizeManager.getAddressInfo = function () {
        var callback = function (result) {
            if (result.data) {
                UserManager.userInfo.addressName = result.data.name;
                UserManager.userInfo.address = result.data.address;
                UserManager.userInfo.phoneNum = result.data.phone;
                UserManager.userInfo.qqNum = result.data.qq;
                UserManager.userInfo.eMail = result.data.mail;
            }
            PrizeManager.onGetAddressInfoEvent.dispatch();
        };
        SocketManager.call(Command.PrizeGetTakeInfo_Req_3687, null, callback, null, this);
    };
    /**
     * 发送保存领奖信息请求
    */
    PrizeManager.reqSaveInfo = function (name, tel, qq, email, address) {
        var callback = function (result) {
            UserManager.userInfo.addressName = name;
            UserManager.userInfo.address = address;
            UserManager.userInfo.phoneNum = tel;
            UserManager.userInfo.qqNum = qq;
            UserManager.userInfo.eMail = email;
            AlertManager.showAlert("领奖信息保存成功");
        };
        SocketManager.call(Command.PrizeSave_Req_3686, { name: name, phone: tel, qq: qq, mail: email, address: address }, callback, null, this);
    };
    /**
     * 拉取订单详情
    */
    PrizeManager.getOrderDetailInfo = function (id) {
        var callback = function (result) {
            if (result.data) {
                PrizeManager.onGetOrderDetailInfoEvent.dispatch(result.data);
            }
        };
        SocketManager.call(Command.PrizeGetDetails_Req_3685, { id: id }, callback, null, this);
    };
    /**
     * 获取已领取奖品信息成功后发送的广播
    */
    PrizeManager.onGetAwardListEvent = new qin.DelegateDispatcher();
    /**
     * 领取奖品成功后发送的广播
    */
    PrizeManager.onGetAwardEvent = new qin.DelegateDispatcher();
    /**
     * 跳转到领奖信息的广播
    */
    PrizeManager.onSkipEvent = new qin.DelegateDispatcher();
    /**
     * 拉取收货信息成功回调
    */
    PrizeManager.onGetAddressInfoEvent = new qin.DelegateDispatcher();
    /**
     * 拉取订单详情成功回调
    */
    PrizeManager.onGetOrderDetailInfoEvent = new qin.DelegateDispatcher();
    return PrizeManager;
}());
__reflect(PrizeManager.prototype, "PrizeManager");
/**
 * 订单状态
*/
var OrderStateType;
(function (OrderStateType) {
    /**
     * 等待发货
    */
    OrderStateType[OrderStateType["WaitSend"] = 0] = "WaitSend";
    /**
     * 已发货
    */
    OrderStateType[OrderStateType["Sent"] = 1] = "Sent";
    /**
     * 信息有误
    */
    OrderStateType[OrderStateType["InfoError"] = 2] = "InfoError";
})(OrderStateType || (OrderStateType = {}));
//# sourceMappingURL=PrizeManager.js.map