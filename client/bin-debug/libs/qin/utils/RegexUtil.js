var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    var RegexUtil = (function () {
        function RegexUtil() {
        }
        /**
         * 是否是合法的文本（不包含特殊字符的）
         */
        RegexUtil.IsLegalText = function (text) {
            if (RegexUtil._legalTextRegex.test(text)) {
                return true;
            }
            return false;
        };
        /**
         * 只能包含中文
         */
        RegexUtil.IsChinese = function (text) {
            if (RegexUtil._cnRegex.test(text)) {
                return true;
            }
            return false;
        };
        /**
         * 只能包含英文
         */
        RegexUtil.IsEnglish = function (text) {
            if (RegexUtil._enRegex.test(text)) {
                return true;
            }
            return false;
        };
        /**
         * 是否是无符号整数
         */
        RegexUtil.IsUInt = function (text) {
            if (RegexUtil._uintRegex.test(text)) {
                return true;
            }
            return false;
        };
        /**
         * 只能包含英文和数字
         */
        RegexUtil.IsEnglishAndNumber = function (text) {
            if (RegexUtil._enNumRegex.test(text)) {
                return true;
            }
            return false;
        };
        /**
         * 是否是数字（包含整数、浮点数）
         */
        RegexUtil.IsNumeric = function (value) {
            return RegexUtil._numericRegex.test(value);
        };
        /**
         * 是否是手机号码
         */
        RegexUtil.isPhoneNumber = function (value) {
            if (!value || value.length < 6 || value.length > 12) {
                return false;
            }
            return value.match(/^1\d{10}$/) != null;
        };
        RegexUtil._cnRegex = new RegExp("^[\u4e00-\u9fa5]+$"); //中文（简、繁）
        RegexUtil._enRegex = new RegExp("^[A-Za-z]+$"); //英文
        //
        RegexUtil._uintRegex = new RegExp("^[0-9]+$"); //无符号整数
        RegexUtil._enNumRegex = new RegExp("^[A-Za-z0-9]+$"); //英文和数字
        RegexUtil._numericRegex = new RegExp("^[+-]?\d*[.]?\d*$"); //是否是数字（包含整数、浮点数）
        //
        RegexUtil._legalTextRegex = new RegExp("[~!@#$%^&*()=+[\\]{}''\";:/?.,><`|！·￥…—（）\\-、；：。，》《]");
        return RegexUtil;
    }());
    qin.RegexUtil = RegexUtil;
    __reflect(RegexUtil.prototype, "qin.RegexUtil");
})(qin || (qin = {}));
//# sourceMappingURL=RegexUtil.js.map