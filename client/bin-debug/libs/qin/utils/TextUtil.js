var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    var TextUtil = (function () {
        function TextUtil() {
        }
        Object.defineProperty(TextUtil, "htmlParser", {
            get: function () {
                return TextUtil._htmlParser;
            },
            enumerable: true,
            configurable: true
        });
        TextUtil.parse = function (htmltext) {
            return TextUtil.htmlParser.parse(htmltext);
        };
        TextUtil._htmlParser = new egret.HtmlTextParser();
        return TextUtil;
    }());
    qin.TextUtil = TextUtil;
    __reflect(TextUtil.prototype, "qin.TextUtil");
})(qin || (qin = {}));
//# sourceMappingURL=TextUtil.js.map