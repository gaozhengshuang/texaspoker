var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏管理
 */
var GameManager = (function () {
    function GameManager() {
    }
    Object.defineProperty(GameManager, "stage", {
        /**
         * 场景容器
         */
        get: function () {
            return GameManager._stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager, "root", {
        /**
         * 根容器
         */
        get: function () {
            return GameManager._root;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    GameManager.initialize = function (stage, root) {
        GameManager._stage = stage;
        GameManager._root = root;
    };
    /**
     * 所有数据管理静态类初始化前都要清空
     */
    GameManager.InitServer = function (loginInfo, serverInfo) {
        GameManager._isInitComplete = false;
        GameManager.initServerHandler.Invoke(loginInfo, serverInfo, GameManager.ParseInitComplete, GameManager.onInitServerError);
    };
    GameManager.ParseInitComplete = function () {
        if (GameManager._isInitComplete == false && GameManager.initServerHandler.isComplete) {
            GameManager._isInitComplete = true;
            GameManager.initAppHandler.Invoke();
            GameManager.OnInitComplete.dispatch();
        }
    };
    GameManager.onInitServerError = function () {
        GameManager.OnInitError.dispatch();
    };
    /**
     * 重载
     */
    GameManager.reload = function () {
        if (!GameManager._isWaitReload) {
            GameManager._isWaitReload = true;
            SoundManager.clear(qin.Delegate.getOut(function () {
                GameManager._isWaitReload = false;
                if (qin.System.isWeb) {
                    window.location.href = qin.UrlUtil.getCurrentPublicUrl([URLOption.DebugLoginType, URLOption.DebugToken, URLOption.State]);
                }
                else {
                    window.location.reload();
                }
            }, this)); //需要等按钮音效播放完毕才能刷新,如果没有音效播放，则超时刷新，同时临时禁用声音播放功能
        }
    };
    /**
     * 初始化服务器数据
     */
    GameManager.initServerHandler = new InitServerHandler();
    /**
     * 初始化app
     */
    GameManager.initAppHandler = new InitAppHandler();
    /**
     * 跳转到登录场景前
     */
    GameManager._reLogining = new ReLoginingHandler();
    GameManager._isInitComplete = false;
    /**
     * 初始化完成
     */
    GameManager.OnInitComplete = new qin.DelegateDispatcher();
    /**
     * 初始化错误
     */
    GameManager.OnInitError = new qin.DelegateDispatcher();
    GameManager._isWaitReload = false;
    return GameManager;
}());
__reflect(GameManager.prototype, "GameManager");
//# sourceMappingURL=GameManager.js.map