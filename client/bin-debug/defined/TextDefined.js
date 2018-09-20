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
 * 文本信息的定义
 * */
var TextDefined = (function (_super) {
    __extends(TextDefined, _super);
    function TextDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextDefined.GetInstance = function () {
        if (!TextDefined._instance) {
            TextDefined._instance = new TextDefined();
        }
        if (DefinedManager.IsParsed(TextDefined.textConfig) == false) {
            TextDefined._instance.initialize();
        }
        return TextDefined._instance;
    };
    TextDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(TextDefined.textConfig);
        var reg = /\\n/g;
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var val = _a[_i];
            val.text = val.text.replace(reg, "\n");
        }
    };
    TextDefined.textConfig = "text";
    return TextDefined;
}(BaseDefined));
__reflect(TextDefined.prototype, "TextDefined");
/**
 * 文本的定义
 * */
var TextDefinition = (function () {
    function TextDefinition() {
    }
    return TextDefinition;
}());
__reflect(TextDefinition.prototype, "TextDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=TextDefined.js.map