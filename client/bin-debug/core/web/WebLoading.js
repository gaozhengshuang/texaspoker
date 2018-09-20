var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * web版专有loading
 */
var WebLoading = (function () {
    function WebLoading() {
    }
    WebLoading.getElement = function () {
        if (qin.System.isWeb) {
            if (WebLoading._element == null) {
                WebLoading._element = document.getElementsByClassName('web-loading')[0];
            }
            return WebLoading._element;
        }
        return null;
    };
    WebLoading.show = function () {
        if (WebLoading.getElement()) {
            WebLoading.getElement().style.display = 'block';
        }
    };
    WebLoading.hide = function () {
        if (WebLoading.getElement()) {
            WebLoading.getElement().style.display = 'none';
        }
    };
    WebLoading.setText = function (text) {
        if (WebLoading.getElement()) {
            WebLoading.getElement().innerHTML = text;
        }
    };
    return WebLoading;
}());
__reflect(WebLoading.prototype, "WebLoading");
//# sourceMappingURL=WebLoading.js.map