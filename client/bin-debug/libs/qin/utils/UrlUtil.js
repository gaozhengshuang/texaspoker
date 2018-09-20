var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * url功能，部分api只有web版才可使用
     */
    var UrlUtil = (function () {
        function UrlUtil() {
        }
        UrlUtil.getCurrentPublicUrl = function (removeQuerys) {
            var query = qin.UrlUtil.getCurrentQueryMap();
            if (removeQuerys && removeQuerys.length > 0) {
                for (var _i = 0, removeQuerys_1 = removeQuerys; _i < removeQuerys_1.length; _i++) {
                    var name_1 = removeQuerys_1[_i];
                    delete query[name_1];
                }
            }
            return qin.UrlUtil.getCurrentHostPath() + "?" + qin.UrlUtil.toHttpQuery(query);
        };
        /**
         * 获取当前url的主机路径
         */
        UrlUtil.getCurrentHostPath = function () {
            var url = window.location.href;
            var index = url.indexOf('?');
            if (index >= 0) {
                url = url.substr(0, index);
            }
            return url;
        };
        /**
         * 获取当前url目录
         */
        UrlUtil.getCurrentHostDirectory = function () {
            var url = qin.UrlUtil.getCurrentHostPath();
            var index = url.lastIndexOf("/");
            if (index >= 0) {
                url = url.substr(0, index + 1);
            }
            return url;
        };
        /**
         * 获取当前url的参数表
         */
        UrlUtil.getCurrentQueryMap = function () {
            return new egret.URLVariables(window.location.search).variables;
        };
        /**
         * http参数转对象
         */
        UrlUtil.toQueryMap = function (search) {
            return new egret.URLVariables(search).variables;
        };
        /**
         * 对象转http参数
         */
        UrlUtil.toHttpQuery = function (obj) {
            var urlv = new egret.URLVariables();
            urlv.variables = obj;
            return urlv.toString();
        };
        return UrlUtil;
    }());
    qin.UrlUtil = UrlUtil;
    __reflect(UrlUtil.prototype, "qin.UrlUtil");
})(qin || (qin = {}));
//# sourceMappingURL=UrlUtil.js.map