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
 * loading文本的定义
 * */
var LoadingTextDefined = (function (_super) {
    __extends(LoadingTextDefined, _super);
    function LoadingTextDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadingTextDefined.GetInstance = function () {
        if (!LoadingTextDefined._instance) {
            LoadingTextDefined._instance = new LoadingTextDefined();
        }
        if (DefinedManager.IsParsed(LoadingTextDefined.loadingTextConfig) == false) {
            LoadingTextDefined._instance.initialize();
        }
        return LoadingTextDefined._instance;
    };
    LoadingTextDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(LoadingTextDefined.loadingTextConfig);
    };
    LoadingTextDefined.loadingTextConfig = "loadingText";
    return LoadingTextDefined;
}(BaseDefined));
__reflect(LoadingTextDefined.prototype, "LoadingTextDefined");
/**
 * loading文本的定义
 * */
var LoadingTextDefinition = (function () {
    function LoadingTextDefinition() {
    }
    return LoadingTextDefinition;
}());
__reflect(LoadingTextDefinition.prototype, "LoadingTextDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=LoadingTextDefined.js.map