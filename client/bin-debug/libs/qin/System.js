var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    var System = (function () {
        function System() {
        }
        Object.defineProperty(System, "isMicro", {
            //------------------------------------------------------------------
            // 安装包
            //------------------------------------------------------------------
            /**
             * 是否是微端(包括Runtime和WebView)
             */
            get: function () {
                return System.isMicroRuntime || System.isMicroWebView;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(System, "isMicroRuntime", {
            /**
             * 是否是微端Runtime
             */
            get: function () {
                if (System._isMicroRuntime === undefined) {
                    System._isMicroRuntime = egret.Capabilities.runtimeType == egret.RuntimeType.WEB && window.navigator.userAgent.toLowerCase().indexOf('egretnative') >= 0;
                }
                return System._isMicroRuntime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(System, "isMicroWebView", {
            /**
             * 是否是微端WebView
             */
            get: function () {
                if (System._isMicroWebView === undefined) {
                    System._isMicroWebView = egret.Capabilities.runtimeType == egret.RuntimeType.WEB && window.navigator.userAgent.toLowerCase().indexOf('egretwebview') >= 0;
                }
                return System._isMicroWebView;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(System, "isWeb", {
            //------------------------------------------------------------------
            // 网页
            //------------------------------------------------------------------
            /**
             * 是否是Web(包括微信、浏览器、编辑器、本机开发)
             */
            get: function () {
                return egret.Capabilities.runtimeType == egret.RuntimeType.WEB && System.isMicro == false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(System, "isWeChat", {
            /**
             * 是否是微信
             */
            get: function () {
                if (System._isWeChat === undefined) {
                    System._isWeChat = egret.Capabilities.runtimeType == egret.RuntimeType.WEB && window.navigator.userAgent.toLowerCase().indexOf('micromessenger') >= 0;
                }
                return System._isWeChat;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(System, "isLocalhost", {
            /**
             * 是否是本机开发(包括编辑器)
             */
            get: function () {
                if (System._isLocalhost === undefined) {
                    var url = window.location.href;
                    var index = url.indexOf('?');
                    if (index >= 0) {
                        url = url.substr(0, index);
                    }
                    index = url.indexOf('://');
                    if (index >= 0) {
                        url = url.substr(index + 3);
                    }
                    var b = url.indexOf('127.0.0.1') === 0 || url.indexOf('localhost') === 0 || url.indexOf('10.0.') === 0 || url.indexOf('192.168.') === 0;
                    System._isLocalhost = egret.Capabilities.runtimeType == egret.RuntimeType.WEB && b;
                }
                return System._isLocalhost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(System, "isEditor", {
            /**
             * 是否是编辑器
             */
            get: function () {
                if (System._isEditor === undefined) {
                    System._isEditor = egret.Capabilities.runtimeType == egret.RuntimeType.WEB && window.navigator.userAgent.toLowerCase().indexOf('egretwing') >= 0;
                }
                return System._isEditor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(System, "isWebVibrate", {
            /**
             * 是否支持网页震动
             */
            get: function () {
                if (System._isWebVibrate === undefined) {
                    System._isWebVibrate = egret.Capabilities.runtimeType == egret.RuntimeType.WEB && (window.navigator['vibrate'] || window.navigator['webkitVibrate']);
                }
                return System._isWebVibrate;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 网页版震动
         */
        System.webVibrate = function (d) {
            if (d === void 0) { d = 200; }
            if (System.isWebVibrate) {
                if (window.navigator['vibrate']) {
                    window.navigator['vibrate'](d);
                }
                else if (window.navigator['webkitVibrate']) {
                    window.navigator['webkitVibrate'](d);
                }
            }
        };
        return System;
    }());
    qin.System = System;
    __reflect(System.prototype, "qin.System");
})(qin || (qin = {}));
//# sourceMappingURL=System.js.map