var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DefinedManager = (function () {
    function DefinedManager() {
    }
    /**
     * 重置
     */
    DefinedManager.Reset = function () {
        DefinedManager._parseSet = []; //关联数组不能用length=0清空
    };
    /**
     * 设置配置表数据
     */
    DefinedManager.SetConfigData = function (zipList) {
        DefinedManager._parseSet = [];
        DefinedManager._textMap = [];
        if (zipList) {
            for (var _i = 0, zipList_1 = zipList; _i < zipList_1.length; _i++) {
                var item = zipList_1[_i];
                if (DefinedManager._textMap[item.name] == null) {
                    try {
                        DefinedManager._textMap[item.name] = JSON.parse(item.asText());
                    }
                    catch (e) {
                        qin.Console.log("配置表格式有问题！" + item.name);
                    }
                }
                else {
                    qin.Console.log("Config有重复的:", item.name);
                }
            }
        }
    };
    /**
     * 配置表是否已经解析过
     */
    DefinedManager.IsParsed = function (name, suffix) {
        if (suffix === void 0) { suffix = AssetsSuffixName.JSON; }
        return DefinedManager._parseSet[name + suffix] == true;
    };
    /**
     * 设置配置数据,仅在开发模式使用
     */
    DefinedManager.setData = function (name, data) {
        if (DefinedManager._textMap == null) {
            DefinedManager._textMap = [];
        }
        if (DefinedManager._parseSet == null) {
            DefinedManager._parseSet = [];
        }
        if (DefinedManager._textMap[name] == null) {
            DefinedManager._textMap[name] = data;
        }
        else {
            qin.Console.log("Config有重复的:", name);
        }
    };
    /**
     * 获取配置表数据
     */
    DefinedManager.GetData = function (name, suffix) {
        if (suffix === void 0) { suffix = AssetsSuffixName.JSON; }
        name += suffix;
        DefinedManager._parseSet[name] = true;
        return DefinedManager._textMap[name];
    };
    return DefinedManager;
}());
__reflect(DefinedManager.prototype, "DefinedManager");
//# sourceMappingURL=DefinedManager.js.map