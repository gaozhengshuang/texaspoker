/**
 * 游戏管理
 */
class GameManager
{
    private static _stage: egret.Stage;
    /**
     * 场景容器
     */
    public static get stage(): egret.Stage
    {
        return GameManager._stage;
    }
    private static _root: egret.DisplayObjectContainer;
    /**
     * 根容器
     */
    public static get root(): egret.DisplayObjectContainer
    {
        return GameManager._root;
    }
    /**
     * 初始化服务器数据
     */
    public static readonly initServerHandler: InitServerHandler = new InitServerHandler();
    /**
     * 初始化app
     */
    public static readonly initAppHandler: InitAppHandler = new InitAppHandler();
    /**
     * 跳转到登录场景前
     */
    private static readonly _reLogining: ReLoginingHandler = new ReLoginingHandler();


    private static _isInitComplete: boolean = false;
    /**
     * 
     */
    public static initialize(stage: egret.Stage, root: egret.DisplayObjectContainer)
    {
        GameManager._stage = stage;
        GameManager._root = root;
    }
    /**
     * 所有数据管理静态类初始化前都要清空
     */
    public static InitServer()
    {
        GameManager._isInitComplete = false;
        GameManager.initServerHandler.Invoke(GameManager.ParseInitComplete, GameManager.onInitServerError);
    }
    private static ParseInitComplete()
    {
        if (GameManager._isInitComplete == false && GameManager.initServerHandler.isComplete)
        {
            GameManager._isInitComplete = true;
            GameManager.initAppHandler.Invoke();
            GameManager.OnInitComplete.dispatch();
        }
    }
    private static onInitServerError()
    {
        GameManager.OnInitError.dispatch();
    }
    /**
     * 初始化完成
     */
    public static OnInitComplete: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 初始化错误
     */
    public static OnInitError: game.DelegateDispatcher = new game.DelegateDispatcher();

    private static _isWaitReload: boolean = false;
    /**
     * 重载
     */
    public static reload()
    {
        if (!GameManager._isWaitReload)            
        {
            GameManager._isWaitReload = true;
            SoundManager.clear(game.Delegate.getOut(function ()
            {
                GameManager._isWaitReload = false;
                if(game.System.isWeb)
                {
                    window.location.href = game.UrlUtil.getCurrentPublicUrl([URLOption.DebugLoginType,URLOption.DebugToken,URLOption.State]);
                }
                else
                {
                    window.location.reload();
                }
            }, this)); //需要等按钮音效播放完毕才能刷新,如果没有音效播放，则超时刷新，同时临时禁用声音播放功能
        }
    }
}
