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
 * 德州转转转管理器
*/
var ShimTaeYoonHandler = (function (_super) {
    __extends(ShimTaeYoonHandler, _super);
    function ShimTaeYoonHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShimTaeYoonHandler.prototype.initialize = function (info) {
        _super.prototype.initialize.call(this, info);
        var def;
        for (var i = 0; i < LaBaDefined.GetInstance().dataList.length; i++) {
            def = LaBaDefined.GetInstance().dataList[i];
            this.addSubInfo(info, ShimTaeYoonInfo, def);
        }
        ;
    };
    return ShimTaeYoonHandler;
}(BaseActivitySubHandler));
__reflect(ShimTaeYoonHandler.prototype, "ShimTaeYoonHandler");
//# sourceMappingURL=ShimTaeYoonHandler.js.map