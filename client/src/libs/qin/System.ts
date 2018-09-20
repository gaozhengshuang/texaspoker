module game
{
    export class System
    {
        private static _isMicroRuntime: boolean;
        private static _isMicroWebView: boolean;
        private static _isWeChat: boolean;
        private static _isLocalhost: boolean;
        private static _isEditor: boolean;

        //------------------------------------------------------------------
        // 安装包
        //------------------------------------------------------------------

        /**
         * 是否是微端(包括Runtime和WebView)
         */
        public static get isMicro(): boolean
        {
            return System.isMicroRuntime || System.isMicroWebView;
        }
        /**
         * 是否是微端Runtime
         */
        public static get isMicroRuntime(): boolean
        {
            if (System._isMicroRuntime === undefined)
            {
                System._isMicroRuntime = egret.Capabilities.runtimeType == egret.RuntimeType.WEB && window.navigator.userAgent.toLowerCase().indexOf('egretnative') >= 0;
            }
            return System._isMicroRuntime;
        }
        /**
         * 是否是微端WebView
         */
        public static get isMicroWebView(): boolean
        {
            if (System._isMicroWebView === undefined)
            {
                System._isMicroWebView = egret.Capabilities.runtimeType == egret.RuntimeType.WEB && window.navigator.userAgent.toLowerCase().indexOf('egretwebview') >= 0;
            }
            return System._isMicroWebView;
        }

        //------------------------------------------------------------------
        // 网页
        //------------------------------------------------------------------

        /**
         * 是否是Web(包括微信、浏览器、编辑器、本机开发)
         */
        public static get isWeb(): boolean
        {
            return egret.Capabilities.runtimeType == egret.RuntimeType.WEB && System.isMicro == false;
        }
        /**
         * 是否是微信
         */
        public static get isWeChat(): boolean
        {
            if (System._isWeChat === undefined)
            {
                System._isWeChat = egret.Capabilities.runtimeType == egret.RuntimeType.WEB && window.navigator.userAgent.toLowerCase().indexOf('micromessenger') >= 0;
            }
            return System._isWeChat;
        }
        /**
         * 是否是本机开发(包括编辑器)
         */
        public static get isLocalhost(): boolean
        {
            if (System._isLocalhost === undefined)
            {
                let url = window.location.href;
                let index = url.indexOf('?');
                if (index >= 0)
                {
                    url = url.substr(0, index);
                }
                index = url.indexOf('://');
                if (index >= 0)
                {
                    url = url.substr(index + 3);
                }
                let b: boolean = url.indexOf('127.0.0.1') === 0 || url.indexOf('localhost') === 0 || url.indexOf('10.0.') === 0 || url.indexOf('192.168.') === 0;
                System._isLocalhost = egret.Capabilities.runtimeType == egret.RuntimeType.WEB && b;
            }
            return System._isLocalhost;
        }
        /**
         * 是否是编辑器
         */
        public static get isEditor(): boolean
        {
            if (System._isEditor === undefined)
            {
                System._isEditor = egret.Capabilities.runtimeType == egret.RuntimeType.WEB && window.navigator.userAgent.toLowerCase().indexOf('egretwing') >= 0;
            }
            return System._isEditor;
        }

        //------------------------------------------------------------------
        // 其它系统功能
        //------------------------------------------------------------------

        private static _isWebVibrate: boolean;
        /**
         * 是否支持网页震动
         */
        public static get isWebVibrate(): boolean
        {
            if (System._isWebVibrate === undefined)
            {
                System._isWebVibrate = egret.Capabilities.runtimeType == egret.RuntimeType.WEB && (window.navigator['vibrate'] || window.navigator['webkitVibrate']);
            }
            return System._isWebVibrate;
        }
        /**
         * 网页版震动
         */
        public static webVibrate(d: number = 200)
        {
            if (System.isWebVibrate)
            {
                if (window.navigator['vibrate'])
                {
                    window.navigator['vibrate'](d);
                }
                else if (window.navigator['webkitVibrate'])
                {
                    window.navigator['webkitVibrate'](d);
                }
            }
        }
    }
}