var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 百人大战面板管理
*/
var HundredWarPanelHandler = (function () {
    function HundredWarPanelHandler() {
        /**
         * 上/下庄完成事件(true为上庄,false为下庄)
         */
        this.onUpDownBankerEvent = new qin.DelegateDispatcher();
        /**
        * 获取百人大战广播事件
        */
        this.OnGetHundredWarInfoEvent = new qin.DelegateDispatcher();
        /**
         * 拉取无座玩家事件
         */
        this.OnGetHundredWarNoSeatInfoEvent = new qin.DelegateDispatcher();
        /**
         * 拉取胜负走势事件
         */
        this.OnGetHundredWarTrendListEvent = new qin.DelegateDispatcher();
        /**
         * 拉取庄家列表事件
         */
        this.OnGetHundredWarBankerListEvent = new qin.DelegateDispatcher();
        /**
         * 拉取奖池信息事件
         */
        this.OnGetHundredWarPoolInfoEvent = new qin.DelegateDispatcher();
    }
    /**
     * 请求百人大战列表
    */
    HundredWarPanelHandler.prototype.reqGetHundredWarInfo = function () {
        if (!HundredWarManager.panelHandler.hundredWarList) {
            HundredWarManager.panelHandler.hundredWarList = new Array();
        }
        var callback = function (result) {
            if (result.data.Array) {
                qin.ArrayUtil.Clear(HundredWarManager.panelHandler.hundredWarList);
                for (var _i = 0, _a = result.data.Array; _i < _a.length; _i++) {
                    var requestInfo = _a[_i];
                    var info = new HundredWarListInfo();
                    info.copyValueFrom(requestInfo);
                    HundredWarManager.panelHandler.hundredWarList.push(info);
                }
            }
            HundredWarManager.panelHandler.OnGetHundredWarInfoEvent.dispatch();
        };
        SocketManager.call(Command.HWRoomInfo_Req_3692, null, callback, null, this);
    };
    /**
     * 请求无座玩家列表
     */
    HundredWarPanelHandler.prototype.reqHundredWarNoSeatInfo = function (start, count) {
        if (!HundredWarManager.panelHandler.hundredWarNoSeatList) {
            HundredWarManager.panelHandler.hundredWarNoSeatList = new Array();
        }
        var callback = function (result) {
            var isBottom = false;
            var playerNum;
            if (result.data && result.data["playerList"]) {
                if (result.data["playerList"].length < count) {
                    isBottom = true;
                }
                qin.ArrayUtil.Clear(HundredWarManager.panelHandler.hundredWarNoSeatList);
                for (var _i = 0, _a = result.data["playerList"]; _i < _a.length; _i++) {
                    var playerInfo = _a[_i];
                    if (!HundredWarManager.isSysBanker(playerInfo.roleId)) {
                        var info = new SimpleUserInfo();
                        info.copyValueFrom(playerInfo);
                        HundredWarManager.panelHandler.hundredWarNoSeatList.push(info);
                    }
                }
                if (result.data["total"]) {
                    playerNum = result.data["total"];
                }
            }
            HundredWarManager.panelHandler.OnGetHundredWarNoSeatInfoEvent.dispatch({ isBottom: isBottom, userList: HundredWarManager.panelHandler.hundredWarNoSeatList, playerNum: playerNum });
        };
        SocketManager.call(Command.HWNoSeatInfo_Req_3696, { start: start, count: count }, callback, null, this);
    };
    /**
     * 请求胜负走势列表
     */
    HundredWarPanelHandler.prototype.reqHundredWarTrendList = function () {
        if (!HundredWarManager.panelHandler.HundredWarTrendList) {
            HundredWarManager.panelHandler.HundredWarTrendList = new Array();
        }
        var callback = function (result) {
            if (result.data["trendList"]) {
                qin.ArrayUtil.Clear(HundredWarManager.panelHandler.HundredWarTrendList);
                for (var _i = 0, _a = result.data["trendList"]; _i < _a.length; _i++) {
                    var trendInfo = _a[_i];
                    var info = Array();
                    info.push(trendInfo["p1"]);
                    info.push(trendInfo["p2"]);
                    info.push(trendInfo["p3"]);
                    info.push(trendInfo["p4"]);
                    HundredWarManager.panelHandler.HundredWarTrendList.push(info);
                }
            }
            HundredWarManager.panelHandler.OnGetHundredWarTrendListEvent.dispatch();
        };
        SocketManager.call(Command.HWTrend_Req_3697, null, callback, null, this);
    };
    /**
    * 请求庄家列表
    */
    HundredWarPanelHandler.prototype.reqHundredWarBankerList = function () {
        if (!HundredWarManager.panelHandler.HundredWarBankerList) {
            HundredWarManager.panelHandler.HundredWarBankerList = new Array();
        }
        var callback = function (result) {
            if (result.data["bankerList"]) {
                qin.ArrayUtil.Clear(HundredWarManager.panelHandler.HundredWarBankerList);
                for (var _i = 0, _a = result.data["bankerList"]; _i < _a.length; _i++) {
                    var bankerInfo = _a[_i];
                    var info = void 0;
                    if (HundredWarManager.isSysBanker(bankerInfo.roleId)) {
                        info = new SimpleUserInfo(HundredWarManager.sysBanker);
                    }
                    else {
                        info = new SimpleUserInfo();
                        info.copyValueFrom(bankerInfo);
                    }
                    HundredWarManager.panelHandler.HundredWarBankerList.push(info);
                }
            }
            HundredWarManager.panelHandler.OnGetHundredWarBankerListEvent.dispatch();
        };
        SocketManager.call(Command.HWbanker_Req_3698, null, callback, null, this);
    };
    /**
     * 请求上庄
     */
    HundredWarPanelHandler.prototype.reqUpBanker = function (gold) {
        var callback = function (result) {
            var info = new SimpleUserInfo();
            info.copyValueFromThis(UserManager.userInfo);
            info.gold = gold;
            HundredWarManager.panelHandler.HundredWarBankerList.push(info);
            HundredWarManager.panelHandler.onUpDownBankerEvent.dispatch(true);
        };
        SocketManager.call(Command.HWKamisho_Req_3699, { gold: gold }, callback, null, this);
    };
    /**
     * 请求下庄
     */
    HundredWarPanelHandler.prototype.reqDownBanker = function () {
        var callback = function (result) {
            if (HundredWarManager.panelHandler.isBanker() && HundredWarManager.roomInfo.state != HWState.WaitNext) {
                AlertManager.showAlert("牌局正在进行中，本局结束后自动下庄！");
            }
            else {
                HundredWarManager.panelHandler.reqHundredWarBankerList();
                HundredWarManager.panelHandler.onUpDownBankerEvent.dispatch(false);
            }
        };
        SocketManager.call(Command.HWShimosho_Req_3700, null, callback, null, this);
    };
    /**
     * 是否在庄家列表
     */
    HundredWarPanelHandler.prototype.isBankerList = function () {
        for (var _i = 0, _a = HundredWarManager.panelHandler.HundredWarBankerList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.roleId == UserManager.userInfo.roleId) {
                return true;
            }
        }
        return false;
    };
    /**
     * 是否为当前庄家
     */
    HundredWarPanelHandler.prototype.isBanker = function () {
        for (var _i = 0, _a = HundredWarManager.roomInfo.playerList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.roleId == UserManager.userInfo.roleId) {
                if (info.pos == 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        return false;
    };
    /**
     *请求奖池信息
     */
    HundredWarPanelHandler.prototype.reqPoolInfo = function () {
        if (!HundredWarManager.panelHandler.lastPoolInfo) {
            HundredWarManager.panelHandler.lastPoolInfo = new HundredWarlastPoolInfo();
        }
        var callback = function (result) {
            if (result.data) {
                HundredWarManager.panelHandler.lastPoolInfo.copyValueFrom(result.data);
            }
            HundredWarManager.panelHandler.OnGetHundredWarPoolInfoEvent.dispatch();
        };
        SocketManager.call(Command.HWPoolInfo_Req_3695, null, callback, null, this);
    };
    return HundredWarPanelHandler;
}());
__reflect(HundredWarPanelHandler.prototype, "HundredWarPanelHandler");
//# sourceMappingURL=HundredWarPanelHandler.js.map