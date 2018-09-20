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
 *屏蔽词
*/
var ForbiddenDefined = (function (_super) {
    __extends(ForbiddenDefined, _super);
    function ForbiddenDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForbiddenDefined.GetInstance = function () {
        if (!ForbiddenDefined._instance) {
            ForbiddenDefined._instance = new ForbiddenDefined();
        }
        if (DefinedManager.IsParsed(ForbiddenDefined.forbiddenConfig) == false) {
            ForbiddenDefined._instance.initialize();
        }
        return ForbiddenDefined._instance;
    };
    ForbiddenDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(ForbiddenDefined.forbiddenConfig);
    };
    /**
     * 是否包含屏蔽字符
     */
    ForbiddenDefined.prototype.isContains = function (str) {
        for (var i = 0; i < this.dataList.length; i++) {
            if (str.indexOf(this.dataList[i].des) >= 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * 将所有屏蔽词替换为*
     */
    ForbiddenDefined.prototype.replaceView = function (str) {
        for (var i = 0; i < this.dataList.length; i++) {
            if (str.indexOf(this.dataList[i].des.toString()) >= 0) {
                var forbiddenStr = this.dataList[i].des;
                var replaceStr = qin.StringConstants.Empty;
                for (var j = 0; j < forbiddenStr.length; j++) {
                    replaceStr += qin.StringConstants.Asterisk;
                }
                str = str.replace(new RegExp(forbiddenStr, 'g'), replaceStr);
            }
        }
        return str;
    };
    ForbiddenDefined.forbiddenConfig = "forbidden";
    return ForbiddenDefined;
}(BaseDefined));
__reflect(ForbiddenDefined.prototype, "ForbiddenDefined");
/**
* 屏蔽词的定义
*/
var ForbiddenDefinition = (function () {
    function ForbiddenDefinition() {
    }
    return ForbiddenDefinition;
}());
__reflect(ForbiddenDefinition.prototype, "ForbiddenDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ForbiddenDefined.js.map