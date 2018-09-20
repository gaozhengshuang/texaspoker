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
 * 手牌信息
 */
var HandCardInfo = (function (_super) {
    __extends(HandCardInfo, _super);
    function HandCardInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HandCardInfo.prototype.reset = function () {
        this.roleId = 0;
        this.cardList = undefined;
    };
    HandCardInfo.prototype.copyValueFrom = function (data) {
        _super.prototype.copyValueFrom.call(this, data);
        if (data["card"]) {
            this.cardList = new Array();
            GamblingUtil.cardArr2CardInfoList(data["card"], this.cardList);
            if (this.cardList.length == 0) {
                this.cardList = undefined;
            }
        }
        // qin.CopyUtil.supCopyList(this, data, "cardList", CardInfo);
    };
    return HandCardInfo;
}(BaseServerValueInfo));
__reflect(HandCardInfo.prototype, "HandCardInfo");
//# sourceMappingURL=HandCardInfo.js.map