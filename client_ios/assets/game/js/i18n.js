var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 国际化
 */
var I18n = (function () {
    function I18n() {
    }
    /**
     * 当前支持的语言列表(第一位为默认语言，当使用未支持的语言时候，使用此语言)
     */
    I18n.langs = function () {
        return I18n._langs;
    };
    Object.defineProperty(I18n, "lang", {
        /**
         * 当前语言
         */
        get: function () {
            return I18n._lang;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(I18n, "isDefault", {
        /**
         * 当前是否是默认语言
         */
        get: function () {
            return I18n._lang == null || I18n._lang == I18n.DefaultLang;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化系统
     */
    I18n.initSystem = function (uslang, langs) {
        if (langs == null || langs.length <= 0) {
            langs = [I18n.DefaultLang];
        }
        else {
            for (var i = 0; i < langs.length; i++) {
                langs[i] = langs[i].toLowerCase();
            }
        }
        I18n._langs = langs;
        if (uslang) {
            uslang = uslang.toLowerCase();
            I18n._lang = (I18n._langs.indexOf(uslang) >= 0) ? uslang : langs[0];
            return;
        }
        // I18n._lang = egret.Capabilities.language.toLowerCase();
        if (I18n._langs.indexOf(I18n._lang) < 0) {
            I18n._lang = langs[0];
        }
    };
    /**
     * 初始化映射表
     */
    I18n.initMap = function (data) {
        I18n._map = null;
        if (data) {
            I18n._map = JSON.parse(data);
        }
    };
    /**
     * 清空映射
     */
    I18n.clear = function () {
        I18n._map = null;
    };
    /**
     * 获取语言文本
     */
    I18n.getText = function (key) {
        if (I18n._map == null || !key) {
            return key;
        }
        var text = I18n._map[key];
        if (!text) {
            return key;
        }
        return text;
    };
    /**
     * 默认语言
     */
    I18n.DefaultLang = 'zh-cn';
    return I18n;
}());
__reflect(I18n.prototype, "I18n");
