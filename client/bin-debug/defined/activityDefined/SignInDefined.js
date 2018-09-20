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
 * 签到选项的定义
 * */
var SignInDefined = (function (_super) {
    __extends(SignInDefined, _super);
    function SignInDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignInDefined.GetInstance = function () {
        if (!SignInDefined._instance) {
            SignInDefined._instance = new SignInDefined();
        }
        if (DefinedManager.IsParsed(SignInDefined.config) == false) {
            SignInDefined._instance.initialize();
        }
        return SignInDefined._instance;
    };
    SignInDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(SignInDefined.config);
    };
    SignInDefined.prototype.getDefinitionbyAwardId = function (awardId) {
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.awardId == awardId) {
                return def;
            }
        }
        return null;
    };
    SignInDefined.prototype.getDefinitionbySubId = function (subId) {
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.subId == subId) {
                return def;
            }
        }
        return null;
    };
    SignInDefined.config = "activity_signin";
    return SignInDefined;
}(BaseActivitySubDefined));
__reflect(SignInDefined.prototype, "SignInDefined");
/**
 * 签到选项的定义
 * */
var SignInDefinition = (function (_super) {
    __extends(SignInDefinition, _super);
    function SignInDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SignInDefinition;
}(BaseActivitySubDefnition));
__reflect(SignInDefinition.prototype, "SignInDefinition");
//# sourceMappingURL=SignInDefined.js.map