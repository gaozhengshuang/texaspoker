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
 * 德州转转转定义
 * */
var LaBaDefined = (function (_super) {
    __extends(LaBaDefined, _super);
    function LaBaDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LaBaDefined.GetInstance = function () {
        if (!LaBaDefined._instance) {
            LaBaDefined._instance = new LaBaDefined();
        }
        if (DefinedManager.IsParsed(LaBaDefined.config) == false) {
            LaBaDefined._instance.initialize();
        }
        return LaBaDefined._instance;
    };
    LaBaDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(LaBaDefined.config);
    };
    /**
     * 根据底注额度获取活动信息
    */
    LaBaDefined.prototype.getDefByBottom = function (id, bottom) {
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.id == id && def.bottom == bottom) {
                return def;
            }
        }
    };
    /**
     * 获得底注信息数组
    */
    LaBaDefined.prototype.getBottomList = function (id) {
        var arr = new Array();
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.id == id) {
                if (arr.length > 0) {
                    var flag = true;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] == def.bottom) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        arr.push(def.bottom);
                    }
                }
                else {
                    arr.push(def.bottom);
                }
            }
        }
        return arr;
    };
    /**
     * 根据底注获得倍率数组
    */
    LaBaDefined.prototype.getCoefficientListByBottom = function (id, bottom) {
        var arr = new Array();
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.id == id && def.bottom == bottom) {
                arr.push(def.coefficient);
            }
        }
        return arr;
    };
    LaBaDefined.config = "activity_laBa";
    return LaBaDefined;
}(BaseActivitySubDefined));
__reflect(LaBaDefined.prototype, "LaBaDefined");
/**
 * 德州转转转定义
 * */
var LaBaDefinition = (function (_super) {
    __extends(LaBaDefinition, _super);
    function LaBaDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LaBaDefinition;
}(BaseActivitySubDefnition));
__reflect(LaBaDefinition.prototype, "LaBaDefinition");
//# sourceMappingURL=LaBaDefined.js.map