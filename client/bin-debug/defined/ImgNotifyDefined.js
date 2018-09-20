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
 * 公告定义
 */
var ImgNotifyDefined = (function (_super) {
    __extends(ImgNotifyDefined, _super);
    function ImgNotifyDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImgNotifyDefined.GetInstance = function () {
        if (!ImgNotifyDefined._instance) {
            ImgNotifyDefined._instance = new ImgNotifyDefined();
        }
        if (DefinedManager.IsParsed(ImgNotifyDefined.imgNotifyConfig) == false) {
            ImgNotifyDefined._instance.initialize();
        }
        return ImgNotifyDefined._instance;
    };
    ImgNotifyDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(ImgNotifyDefined.imgNotifyConfig);
    };
    ImgNotifyDefined.imgNotifyConfig = "imgNotify";
    return ImgNotifyDefined;
}(BaseDefined));
__reflect(ImgNotifyDefined.prototype, "ImgNotifyDefined");
/**
 * 公告定义
 */
var ImgNotifyDefinition = (function () {
    function ImgNotifyDefinition() {
    }
    return ImgNotifyDefinition;
}());
__reflect(ImgNotifyDefinition.prototype, "ImgNotifyDefinition");
//# sourceMappingURL=ImgNotifyDefined.js.map