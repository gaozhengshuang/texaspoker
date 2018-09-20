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
var HundredWarlastPoolInfo = (function (_super) {
    __extends(HundredWarlastPoolInfo, _super);
    function HundredWarlastPoolInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HundredWarlastPoolInfo.prototype.copyValueFrom = function (data) {
        _super.prototype.copyValueFrom.call(this, data);
        if (data["prizeList"]) {
            this.prizeList = new Array();
            for (var _i = 0, _a = data["prizeList"]; _i < _a.length; _i++) {
                var info = _a[_i];
                var userinfo = void 0;
                if (HundredWarManager.isSysBanker(info.roleId)) {
                    userinfo = new SimpleUserInfo(HundredWarManager.sysBanker);
                }
                else {
                    userinfo = new SimpleUserInfo();
                    userinfo.copyValueFrom(info);
                }
                this.prizeList.push(userinfo);
            }
        }
        if (data["cards"]) {
            this.cards = new Array();
            GamblingUtil.cardArr2CardInfoList(data["cards"], this.cards);
        }
    };
    return HundredWarlastPoolInfo;
}(BaseServerValueInfo));
__reflect(HundredWarlastPoolInfo.prototype, "HundredWarlastPoolInfo");
//# sourceMappingURL=HundredWarlastPoolInfo.js.map