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
 * 更多玩法的定义
 * */
var MorePlayDefined = (function (_super) {
    __extends(MorePlayDefined, _super);
    function MorePlayDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MorePlayDefined.GetInstance = function () {
        if (!MorePlayDefined._instance) {
            MorePlayDefined._instance = new MorePlayDefined();
        }
        if (DefinedManager.IsParsed(MorePlayDefined.morePlayConfig) == false) {
            MorePlayDefined._instance.initialize();
        }
        return MorePlayDefined._instance;
    };
    MorePlayDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(MorePlayDefined.morePlayConfig);
        if (this.dataList) {
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.startTime) {
                    def.startDate = this.getDate(def, def.startTime);
                }
                else {
                    def.startDate = TimeManager.Utc1970;
                }
                if (def.endTime) {
                    def.endDate = this.getDate(def, def.endTime);
                }
                else {
                    def.endDate = new Date(2099, 0, 1, 0, 0, 0);
                }
            }
        }
    };
    MorePlayDefined.prototype.getDate = function (def, timeStr) {
        var dataArr;
        dataArr = qin.StringUtil.toIntArray(timeStr);
        if (dataArr) {
            if (dataArr.length == 6) {
                return new Date(dataArr[0], dataArr[1] - 1, dataArr[2], dataArr[3], dataArr[4], dataArr[5]);
            }
            else {
                qin.Console.log("时间格式不对！活动ID：" + def.id);
            }
        }
        return null;
    };
    /**
     * 获取显示的玩法定义列表
     */
    MorePlayDefined.prototype.getShowDefList = function () {
        if (this.dataList) {
            var result = new Array();
            var dt = TimeManager.GetServerLocalDateTime();
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (dt >= def.startDate && dt < def.endDate) {
                    result.push(def);
                }
            }
            return result;
        }
        return null;
    };
    /**
     * 获取在大厅显示的定义
     */
    MorePlayDefined.prototype.getDefInHall = function () {
        var list = this.getShowDefList();
        if (list) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var def = list_1[_i];
                if (def.isInHall) {
                    return def;
                }
            }
        }
        return null;
    };
    /**
     * 获取在更多玩法面板显示的玩法定义列表
     */
    MorePlayDefined.prototype.getDefListInMorePlay = function () {
        var list = this.getShowDefList();
        if (list) {
            var result = new Array();
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var def = list_2[_i];
                if (!def.isInHall) {
                    result.push(def);
                }
            }
            return result;
        }
        return null;
    };
    MorePlayDefined.morePlayConfig = "morePlay";
    return MorePlayDefined;
}(BaseDefined));
__reflect(MorePlayDefined.prototype, "MorePlayDefined");
/**
* 更多玩法的定义
* */
var MorePlayDefinition = (function () {
    function MorePlayDefinition() {
    }
    return MorePlayDefinition;
}());
__reflect(MorePlayDefinition.prototype, "MorePlayDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=MorePlayDefined.js.map