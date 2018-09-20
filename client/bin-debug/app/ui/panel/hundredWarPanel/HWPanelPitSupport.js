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
 * 坐下
 */
var HWPanelPitSupport = (function (_super) {
    __extends(HWPanelPitSupport, _super);
    function HWPanelPitSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HWPanelPitSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.setPitInfo();
    };
    HWPanelPitSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        HundredWarManager.onCardPushEvent.addListener(this.getUserInfo, this);
        UserManager.OnGetSimpleUserInfoEvent.addListener(this.refreshPitInfoByRoleId, this);
        HundredWarManager.onPosChangeEvent.addListener(this.playerLeave, this);
        HundredWarManager.OnGetPlayerInfoEvent.addListener(this.setPitInfo, this);
        HundredWarManager.onBetEvent.addListener(this.refreshSelfPitInfo, this);
        HundredWarManager.onShowCardsAnimOverEvent.addListener(this.refreshPitInfo, this);
    };
    HWPanelPitSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        HundredWarManager.onCardPushEvent.removeListener(this.getUserInfo, this);
        UserManager.OnGetSimpleUserInfoEvent.removeListener(this.refreshPitInfoByRoleId, this);
        HundredWarManager.onPosChangeEvent.removeListener(this.playerLeave, this);
        HundredWarManager.OnGetPlayerInfoEvent.removeListener(this.setPitInfo, this);
        HundredWarManager.onBetEvent.removeListener(this.refreshSelfPitInfo, this);
        HundredWarManager.onShowCardsAnimOverEvent.removeListener(this.refreshPitInfo, this);
    };
    /**
     * 牌推送后更新坐下玩家的信息
    */
    HWPanelPitSupport.prototype.getUserInfo = function () {
        if (HundredWarManager.roomInfo.playerList && HundredWarManager.roomInfo.playerList.length > 0) {
            this._isRefreshPlayerInfo = true;
            HundredWarManager.startReqPlayerInfo(HundredWarManager.roomInfo.playerList);
        }
    };
    /**
     * 下注成功更新自己座位的信息
    */
    HWPanelPitSupport.prototype.refreshSelfPitInfo = function () {
        if (HundredWarManager.self && HundredWarManager.self.pos != 0) {
            HundredWarManager.self.gold = UserManager.userInfo.gold;
            var pitInfo = this.target.getPitInfoByIndex(HundredWarManager.self.pos);
            pitInfo.headComponent.init(HundredWarManager.self);
        }
    };
    /**
     * 刷新坑位数据
    */
    HWPanelPitSupport.prototype.refreshPitInfo = function () {
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.playerList) {
            var pitInfo = void 0;
            for (var _i = 0, _a = HundredWarManager.roomInfo.playerList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.roleId == HundredWarManager.sysBanker.roleId && !info.gold) {
                    info.copyValueFrom(HundredWarManager.sysBanker);
                }
                pitInfo = this.target.getPitInfoByIndex(info.pos);
                pitInfo.headComponent.init(info);
            }
        }
        this._isRefreshPlayerInfo = false;
    };
    /**
     * 设置坑位数据
    */
    HWPanelPitSupport.prototype.setPitInfo = function () {
        var pInfo;
        var pitInfo;
        for (var i = HWPanelSetting.MinPitIndex; i < HWPanelSetting.MaxPitNum; i++) {
            pInfo = HundredWarManager.getPlayerInfoByPos(i);
            pitInfo = this.target.getPitInfoByIndex(i);
            if (pInfo && pInfo.pos == 0) {
                if (HundredWarManager.isSysBanker(pInfo.roleId)) {
                    pInfo.name = HundredWarManager.sysBanker.name;
                    pInfo.sex = HundredWarManager.sysBanker.sex;
                    pInfo.gold = HundredWarManager.sysBanker.gold;
                    pInfo.head = HundredWarManager.sysBanker.head;
                }
                this.target.bankerNameLabel.text = pInfo.name;
            }
            pitInfo.headComponent.init(pInfo);
            pitInfo.headComponent.visible = true;
        }
    };
    /**
     * 根据玩家roleId更新对应的坑位信息
    */
    HWPanelPitSupport.prototype.refreshPitInfoByRoleId = function (data) {
        if (data) {
            HundredWarManager.getPlayerInfoSuccess(data);
            if (!this._isRefreshPlayerInfo) {
                if (HundredWarManager.isBanker(data.roleId) && !HundredWarManager.isSysBanker(data.roleId)) {
                    var banker = HundredWarManager.getPlayerInfoByPos(0);
                    banker.gold = HundredWarManager.roomInfo.bankerGold;
                }
                if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.playerList) {
                    var pitInfo = void 0;
                    for (var _i = 0, _a = HundredWarManager.roomInfo.playerList; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.roleId == data["roleId"]) {
                            pitInfo = this.target.getPitInfoByIndex(info.pos);
                            pitInfo.headComponent.init(info);
                            if (info && info.pos == 0) {
                                this.target.bankerNameLabel.text = info.name;
                            }
                        }
                    }
                }
            }
            else {
                if (HundredWarManager.reqPlayerInfoListClone && HundredWarManager.reqPlayerInfoListClone.length == 0) {
                    this._isRefreshPlayerInfo = false;
                }
                HundredWarManager.nextReq();
            }
        }
    };
    /**
     * 玩家离开
    */
    HWPanelPitSupport.prototype.playerLeave = function (data) {
        if (data.pos != 0) {
            if (!data.roleId) {
                //非庄家玩家离开座位  立即刷新位置信息
                var pitInfo = void 0;
                pitInfo = this.target.getPitInfoByIndex(data.pos);
                pitInfo.headComponent.init(null);
            }
        }
        if (data.pos == 0 && HundredWarManager.isSysBanker(data.roleId)) {
            var pitInfo = void 0;
            pitInfo = this.target.getPitInfoByIndex(data.pos);
            pitInfo.headComponent.init(HundredWarManager.sysBanker);
            this.target.bankerNameLabel.text = HundredWarManager.sysBanker.name;
        }
    };
    return HWPanelPitSupport;
}(BaseHWPanelSupport));
__reflect(HWPanelPitSupport.prototype, "HWPanelPitSupport");
//# sourceMappingURL=HWPanelPitSupport.js.map