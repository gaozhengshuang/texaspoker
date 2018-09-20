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
 * 充值信息
 */
var PayPrizeInfo = (function (_super) {
    __extends(PayPrizeInfo, _super);
    function PayPrizeInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PayPrizeInfo.prototype.trySetDefinition = function () {
        _super.prototype.trySetDefinition.call(this);
        this._definition = ActivityPayPrizeDefined.GetInstance().getSubDefinition(this._id, this._subId);
    };
    return PayPrizeInfo;
}(BaseActivitySubInfo));
__reflect(PayPrizeInfo.prototype, "PayPrizeInfo");
//# sourceMappingURL=PayPrizeInfo.js.map