var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * 字符串静态常量枚举
     * */
    var StringConstants = (function () {
        function StringConstants() {
        }
        /*空字符串*/
        StringConstants.Empty = '';
        /**
         * 点
         */
        StringConstants.Dot = '.';
        /**
         * 下划线
         */
        StringConstants.UnderLine = '_';
        /**
         * 逗号
         */
        StringConstants.Comma = ',';
        /**
         * 空格
        */
        StringConstants.Blank = ' ';
        /**
         * 分号
         */
        StringConstants.Semicolon = ';';
        /**
         * 星号
         */
        StringConstants.Asterisk = '*';
        /**
         * 冒号
         */
        StringConstants.Colon = ':';
        /**
         * 竖线
         */
        StringConstants.VerticalLine = '|';
        return StringConstants;
    }());
    qin.StringConstants = StringConstants;
    __reflect(StringConstants.prototype, "qin.StringConstants");
})(qin || (qin = {}));
//# sourceMappingURL=StringConstants.js.map