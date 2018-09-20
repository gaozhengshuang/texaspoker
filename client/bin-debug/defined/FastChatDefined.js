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
 *快速聊天
*/
var FastChatDefined = (function (_super) {
    __extends(FastChatDefined, _super);
    function FastChatDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FastChatDefined.GetInstance = function () {
        if (!FastChatDefined._instance) {
            FastChatDefined._instance = new FastChatDefined();
        }
        if (DefinedManager.IsParsed(FastChatDefined.fastChatConfig) == false) {
            FastChatDefined._instance.initialize();
        }
        return FastChatDefined._instance;
    };
    FastChatDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(FastChatDefined.fastChatConfig);
    };
    FastChatDefined.fastChatConfig = "fastChat";
    return FastChatDefined;
}(BaseDefined));
__reflect(FastChatDefined.prototype, "FastChatDefined");
/**
* 随机昵称的定义
*/
var FastChatDefinition = (function () {
    function FastChatDefinition() {
    }
    return FastChatDefinition;
}());
__reflect(FastChatDefinition.prototype, "FastChatDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=FastChatDefined.js.map