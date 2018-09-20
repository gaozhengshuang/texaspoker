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
 *跑马灯
*/
var MarqueeDefined = (function (_super) {
    __extends(MarqueeDefined, _super);
    function MarqueeDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarqueeDefined.GetInstance = function () {
        if (!MarqueeDefined._instance) {
            MarqueeDefined._instance = new MarqueeDefined();
        }
        if (DefinedManager.IsParsed(MarqueeDefined.marqueeConfig) == false) {
            MarqueeDefined._instance.initialize();
        }
        return MarqueeDefined._instance;
    };
    MarqueeDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(MarqueeDefined.marqueeConfig);
    };
    /**
     * 通过type获得数据
    */
    MarqueeDefined.prototype.getInfoByType = function (type) {
        if (this.dataList != null) {
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.type == type) {
                    return def;
                }
            }
        }
        return null;
    };
    MarqueeDefined.marqueeConfig = "marquee";
    return MarqueeDefined;
}(BaseDefined));
__reflect(MarqueeDefined.prototype, "MarqueeDefined");
/**
* 跑马灯定义
*/
var MarqueeDefinition = (function () {
    function MarqueeDefinition() {
    }
    return MarqueeDefinition;
}());
__reflect(MarqueeDefinition.prototype, "MarqueeDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=MarqueeDefined.js.map