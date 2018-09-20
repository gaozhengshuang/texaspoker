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
 * VIP的定义
 * */
var VipDefined = (function (_super) {
    __extends(VipDefined, _super);
    function VipDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VipDefined.GetInstance = function () {
        if (!VipDefined._instance) {
            VipDefined._instance = new VipDefined();
        }
        if (DefinedManager.IsParsed(VipDefined.vipConfig) == false) {
            VipDefined._instance.initialize();
        }
        return VipDefined._instance;
    };
    VipDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(VipDefined.vipConfig);
    };
    /**
     * 通过等级查找配置
     */
    VipDefined.prototype.getVipDefinitionByLevel = function (level) {
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.level == level) {
                return def;
            }
        }
        qin.Console.log("获取失败！level:" + level.toString());
        return null;
    };
    /**
    * 获取vip等级
    */
    VipDefined.prototype.getVipLevel = function (vipExp) {
        if (!this.dataList || this.dataList.length == 0) {
            qin.Console.log("vip表为空");
        }
        for (var i = this.dataList.length - 1; i >= 0; i--) {
            if (vipExp < this.dataList[i].totalExp) {
                continue;
            }
            return this.dataList[i].level;
        }
        return this.dataList[0].level;
    };
    VipDefined.vipConfig = "vip";
    return VipDefined;
}(BaseDefined));
__reflect(VipDefined.prototype, "VipDefined");
/**
 * vip的定义
 * */
var VipDefinition = (function () {
    function VipDefinition() {
    }
    return VipDefinition;
}());
__reflect(VipDefinition.prototype, "VipDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=VipDefined.js.map