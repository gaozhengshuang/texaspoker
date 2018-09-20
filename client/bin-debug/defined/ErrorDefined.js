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
 * 错误的定义
 * */
var ErrorDefined = (function (_super) {
    __extends(ErrorDefined, _super);
    function ErrorDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorDefined.GetInstance = function () {
        if (ErrorDefined._instance == null) {
            ErrorDefined._instance = new ErrorDefined();
        }
        if (DefinedManager.IsParsed(ErrorDefined.errorConfig) == false) {
            ErrorDefined._instance.initialize();
        }
        return ErrorDefined._instance;
    };
    ErrorDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(ErrorDefined.errorConfig);
    };
    ErrorDefined.prototype.getDetails = function (id) {
        var def = this.getDefinition(id);
        if (def) {
            return def.des;
        }
        return qin.StringConstants.Empty;
    };
    ErrorDefined.errorConfig = "error";
    return ErrorDefined;
}(BaseDefined));
__reflect(ErrorDefined.prototype, "ErrorDefined");
/**
 * 错误码定义
 */
var ErrorDefinition = (function () {
    function ErrorDefinition() {
    }
    return ErrorDefinition;
}());
__reflect(ErrorDefinition.prototype, "ErrorDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ErrorDefined.js.map