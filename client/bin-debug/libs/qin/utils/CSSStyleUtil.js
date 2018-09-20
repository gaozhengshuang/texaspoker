var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    var CSSStyleUtil = (function () {
        function CSSStyleUtil() {
        }
        /**
         * 获取指定href的css样式规则列表
         * (html页面直接写的<style>的href为null)
         */
        CSSStyleUtil.getCSSStyleRules = function (href) {
            if (qin.System.isWeb || qin.System.isMicro) {
                for (var i = 0; i < document.styleSheets.length; i++) {
                    var sheet = document.styleSheets[i];
                    if (sheet && sheet.href == href) {
                        var rules = sheet.cssRules || sheet.rules;
                        return rules;
                    }
                }
            }
            return null;
        };
        /**
         * 获取指定href里的指定selectorText的CSSStyleDeclaration
         * (html页面直接写的<style>的href为null)
         */
        CSSStyleUtil.getCSSStyleDeclaration = function (href, selectorText) {
            var rules = CSSStyleUtil.getCSSStyleRules(href);
            if (rules) {
                for (var i = 0; i < rules.length; i++) {
                    var rule = rules[i];
                    if (CSSStyleUtil.ruleIndexOf(rule, selectorText)) {
                        return rule.style;
                    }
                }
            }
            return null;
        };
        CSSStyleUtil.ruleIndexOf = function (rule, selectorText) {
            var list = rule.selectorText.split(',');
            for (var i in list) {
                list[i] = list[i].trim();
            }
            return list.indexOf(selectorText) >= 0;
        };
        return CSSStyleUtil;
    }());
    qin.CSSStyleUtil = CSSStyleUtil;
    __reflect(CSSStyleUtil.prototype, "qin.CSSStyleUtil");
})(qin || (qin = {}));
//# sourceMappingURL=CSSStyleUtil.js.map