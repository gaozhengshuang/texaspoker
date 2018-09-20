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
 * 锦标赛已报名有赛事列表通知
 */
var MttHaveJoinedListHandler = (function (_super) {
    __extends(MttHaveJoinedListHandler, _super);
    function MttHaveJoinedListHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MttHaveJoinedListHandler.prototype.init = function () {
        _super.prototype.init.call(this);
        ChampionshipManager.onRefreshMTTListEvent.addListener(this.refresh, this);
        ChampionshipManager.onGetJoinedMatchListEvent.addListener(this.refresh, this);
    };
    Object.defineProperty(MttHaveJoinedListHandler.prototype, "count", {
        get: function () {
            if (ChampionshipManager.joinMTTList) {
                for (var _i = 0, _a = ChampionshipManager.joinMTTList; _i < _a.length; _i++) {
                    var info = _a[_i];
                    if (!info.outTime && !info.endTime) {
                        return 1;
                    }
                }
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    MttHaveJoinedListHandler.prototype.refresh = function (data) {
        this.dispatchNotify();
    };
    MttHaveJoinedListHandler.prototype.destroy = function () {
        ChampionshipManager.onRefreshMTTListEvent.removeListener(this.refresh, this);
        ChampionshipManager.onGetJoinedMatchListEvent.removeListener(this.refresh, this);
    };
    return MttHaveJoinedListHandler;
}(BaseNotifyHandle));
__reflect(MttHaveJoinedListHandler.prototype, "MttHaveJoinedListHandler");
//# sourceMappingURL=MttHaveJoinedListHandler.js.map