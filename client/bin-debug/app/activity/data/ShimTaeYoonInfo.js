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
var ShimTaeYoonInfo = (function (_super) {
    __extends(ShimTaeYoonInfo, _super);
    function ShimTaeYoonInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShimTaeYoonInfo.prototype.trySetDefinition = function () {
        _super.prototype.trySetDefinition.call(this);
        this._definition = LaBaDefined.GetInstance().getSubDefinition(this._id, this._subId);
    };
    return ShimTaeYoonInfo;
}(BaseActivitySubInfo));
__reflect(ShimTaeYoonInfo.prototype, "ShimTaeYoonInfo");
//# sourceMappingURL=ShimTaeYoonInfo.js.map