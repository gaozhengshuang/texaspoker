/**
 * 登录场景逻辑处理
 */
class LoginScene extends BaseScene
{
    /**
     * 是否跳过版本检查，只有 debug和本机开发 生效
     */
    private static readonly SkipVersion: boolean = true;
    //
    private _versionDateTime: number;
    private _channelLoginList: Array<string>;
    private _isLoginingAcount: boolean = false;

    public constructor()
    {
        super();
        this.resGroupName = [ResGroupName.Login];
    }

    public clear()
    {
        UIManager.closePanel(UIModuleName.LoginSceneBgPanel);
        ChannelManager.OnLogout.removeListener(this.OnChannelLogout, this);
        this.RemoveChannelEvents();
        this.RemoveGameLoginEvents();
        this.RemoveLoginBarEvents();
        // LoginManager.Dispose();
    }
    protected onResourceLoadComplete(event: RES.ResourceEvent)
    {
        super.onResourceLoadComplete(event);
        if (this._isResLoaded)
        {
            SceneManager.switchClosePanels();
            this.LoadCompleteEvent.dispatch(this);
        }
    }
    public async initialize()
    {
        super.initialize();
        UIManager.showPanel(UIModuleName.LoginSceneBgPanel);
        VersionManager.Initialize(this.onVersionInitComplete, this);
    }

    private onVersionInitComplete(): void
    {
        //显示版本号
        let panel: LoginSceneBgPanel = <LoginSceneBgPanel>UIManager.getPanel(UIModuleName.LoginSceneBgPanel);
        if (panel)
        {
            panel.showVersion();
        }
        this.InitNetworkVersion();
    }
    private InitNetworkVersion(again?: boolean): void
    {
        if (again && (game.System.isWeb || game.System.isMicro))//包括网页和微端
        {
            GameManager.reload();
            return;
        }
        if (LoginScene.SkipVersion && (DEBUG || game.System.isLocalhost))
        {
            this.onEnterLogin();
        }
        else
        {
            VersionManager.onServerComplete.addListener(this.onEnterLogin, this);
            VersionManager.loadServerVersion();
        }
    }
    private onEnterLogin()
    {
        TalkingDataManager.enabled = (VersionManager.isServerTest == false);
        VersionManager.onServerComplete.removeListener(this.onEnterLogin, this);
        this._versionDateTime = Date.now();
        if (game.System.isWeb)
        {
            let debugLoginType: string = URLOption.getString(URLOption.DebugLoginType);
            if (game.StringUtil.isNullOrEmpty(debugLoginType))
            {
                this.EnterLoginStart(true);
            }
            else
            {
                this.GameTokenDebug(debugLoginType);
            }
        }
        else
        {
            this.EnterLoginStart(true);
        }
    }
    private EnterLoginStart(isAutoLogin: boolean)
    {
        this._channelLoginList = ChannelLoginType.GetChannelLoginList(OperatePlatform.getCurrent(), ChannelManager.channelType, VersionManager.isServerTest, VersionManager.isSafe);
        if (isAutoLogin && this._channelLoginList.indexOf(ChannelLoginType.Weixin) >= 0 && WebConfig.isWxWebAuthorize)
        {
            this.ChannelLoginStart(ChannelLoginType.Weixin, isAutoLogin);
            return;
        }
        let channelLoginType: string = PrefsManager.getValue(PrefsManager.Login_LoginType);
        if (this._channelLoginList.length > 1)
        {
            if (isAutoLogin && channelLoginType)
            {
                this.ChannelLoginStart(channelLoginType, isAutoLogin);
            }
            else
            {
                this.ShowEnterLoginPanel();
            }
        }
        else
        {
            if (isAutoLogin && (!this._channelLoginList[0] || channelLoginType))
            {
                this.ChannelLoginStart(this._channelLoginList[0], isAutoLogin);
            }
            else
            {
                this.ShowEnterLoginPanel();
            }
        }
    }
    private ChannelLoginStart(loginType: string, isAutoLogin: boolean)
    {
        ChannelManager.OnLogout.addListener(this.OnChannelLogout, this);
        //
        ChannelManager.loginType = loginType;
        if (loginType == ChannelLoginType.Guest || loginType == ChannelLoginType.IntranetGuest)
        {
            //游客登录
            this.GameGuestLogin();
        }
        else
        {
            //渠道登录
            this.AddChannelEvents();
            ChannelManager.login(loginType, isAutoLogin);
        }
    }
    private ShowEnterLoginPanel()
    {
        UIManager.addEventListener(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, this.OnEnterLoginSelect, this);
        UIManager.showPanel(UIModuleName.LoginPanel, this._channelLoginList);
    }
    private HideEnterLoginPanel()
    {
        UIManager.removeEventListener(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, this.OnEnterLoginSelect, this);
        UIManager.closePanel(UIModuleName.LoginPanel);
    }
    private OnEnterLoginSelect(data: string)
    {
        this.HideEnterLoginPanel();
        this.ChannelLoginStart(data, false);
    }
    private GameGuestLogin()
    {
        this.AddGameLoginEvents();
        // LoginManager.GuestLogin(ChannelType.guest);//游客渠道标识是固定的
    }
    private AddGameLoginEvents()
    {
        // this.RemoveGameLoginEvents();
        // LoginManager.OnComplete.addListener(this.OnGameLoginComplete, this);
        game.NotificationCenter.addObserver(this, this.OnGameLoginComplete, game.LoginManager.LOGIN_STATE);
        // LoginManager.OnError.addListener(this.OnGameLoginError, this);
        // LoginManager.OnVersionError.addListener(this.OnGameLoginVersionError, this);
    }
    private RemoveGameLoginEvents()
    {
        game.NotificationCenter.removeObserver(this, game.LoginManager.LOGIN_STATE);
        // LoginManager.OnComplete.removeListener(this.OnGameLoginComplete, this);
        // LoginManager.OnError.removeListener(this.OnGameLoginError, this);
        // LoginManager.OnVersionError.removeListener(this.OnGameLoginVersionError, this);
    }
    private AddChannelEvents()
    {
        this.RemoveChannelEvents();
        ChannelManager.OnAccountLoginSucceed.addListener(this.OnAccountLoginSucceed, this);
        ChannelManager.OnTokenLoginSucceed.addListener(this.OnTokenLoginSucceed, this);
        ChannelManager.OnLoginFailed.addListener(this.OnChannelLoginFailure, this);
        ChannelManager.OnBackToApplication.addListener(this.OnBackToApplication, this);
        this._isLoginingAcount = true;
    }
    private RemoveChannelEvents()
    {
        ChannelManager.OnAccountLoginSucceed.removeListener(this.OnAccountLoginSucceed, this);
        ChannelManager.OnTokenLoginSucceed.removeListener(this.OnTokenLoginSucceed, this);
        ChannelManager.OnLoginFailed.removeListener(this.OnChannelLoginFailure, this);
        ChannelManager.OnBackToApplication.removeListener(this.OnBackToApplication, this);
        this._isLoginingAcount = false;
        game.Tick.RemoveTimeoutInvoke(this.CallBackToLoginLaterCoroutine, this);
    }
    private GameTokenDebug(loginType: string)
    {
        ChannelManager.OnLogout.addListener(this.OnChannelLogout, this);
        ChannelManager.loginType = loginType;
        let debugToken: string = URLOption.getString(URLOption.DebugToken);
        if (game.StringUtil.isNullOrEmpty(debugToken))
        {
            AlertManager.showAlertByString('登录token不能为空');
        }
        else
        {
            this.AddGameLoginEvents();
            // LoginManager.TokenDebug(ChannelManager.getLoginChannel(), debugToken);
        }
    }
    private OnChannelLoginFailure()
    {
        this.RemoveChannelEvents();
        PrefsManager.clearLoginInfo();
        this.ShowEnterLoginPanel();
    }
    private OnBackToApplication()
    {
        game.Tick.RemoveTimeoutInvoke(this.CallBackToLoginLaterCoroutine, this);
        game.Tick.AddTimeoutInvoke(this.CallBackToLoginLaterCoroutine, 5000, this);
    }
    private CallBackToLoginLaterCoroutine()
    {
        if (this._isLoginingAcount)
        {
            UIManager.showFloatTips("登录失败");
            this.OnChannelLoginFailure();
        }
    }
    private OnAccountLoginSucceed(args: Array<any>)
    {
        this.RemoveChannelEvents();
        if (args[2])
        {
            this.GameAccountRegister(args[0], args[1]);
        }
        else
        {
            this.GameAccountLogin(args[0], args[1]);
        }
    }
    private OnTokenLoginSucceed(token: string)
    {
        this.RemoveChannelEvents();
        this.GameTokenLogin(token);
    }
    private OnChannelLogout()
    {
        this.RemoveChannelEvents();
        ChannelManager.OnLogout.removeListener(this.OnChannelLogout, this);
        this.EnterLoginStart(false);
    }
    private GameAccountRegister(account: string, password: string)
    {
        this.AddGameLoginEvents();
        // LoginManager.AccountRegister(ChannelManager.channelType, account, password);
    }
    private GameAccountLogin(account: string, password: string)
    {
        this.AddGameLoginEvents();
        game.LoginManager.AccountLogin(account, password);
    }
    private GameTokenLogin(token: string)
    {
        this.AddGameLoginEvents();
        // LoginManager.TokenLogin(ChannelManager.getLoginChannel(), token);
    }
    private OnGameLoginComplete(isSuccess: boolean)
    {
        if (isSuccess)
        {
            this.RemoveGameLoginEvents();
            //
            UIManager.closePanel(UIModuleName.LoginPanel);
            UIManager.closePanel(UIModuleName.RegisterPanel);
            this.OnLoginBarComplete();
        }
        else
        {
            //todo 处理登录失败的原因
        }
        //
        // let tdgaUid: string = game.StringUtil.format("{0}_{1}_{2}", OperatePlatform.getCurrent(), ChannelManager.channelType, game.LoginManager.loginInfo.userid.toString());
        // TalkingDataManager.setAccount(tdgaUid);
        // TalkingDataManager.setAccountName(LoginManager.account);
        //
        // if (DEBUG || game.System.isLocalhost)
        // {
        //     this.ShowLoginBar();
        // }
        // else
        // {
        // }
    }
    private OnGameLoginError()
    {
        this.RemoveGameLoginEvents();
        this.ShowEnterLoginPanel();
    }
    private OnGameLoginVersionError()
    {
        this.RemoveGameLoginEvents();
        let info: AlertInfo = new AlertInfo();
        info.thisObject = this;
        info.title = "版本错误";
        info.message = "客户端版本与服务器版本不匹配，请更新再进游戏。";
        info.confirmLabel = "刷新";
        info.OnConfirm = function ()
        {
            GameManager.reload();
        };
        AlertManager.showAlertInfo(info);
    }
    private ShowLoginBar()
    {
        // this.RemoveLoginBarEvents();
        // UIManager.addEventListener(UIModuleName.LoginBar, UIModuleEvent.COMPLETE, this.OnLoginBarComplete, this);
        // UIManager.addEventListener(UIModuleName.LoginBar, UIModuleEvent.CHANGE, this.OnLoginBarChanged, this);
        // UIManager.showPanel(UIModuleName.LoginBar, LoginManager.loginInfo);
    }
    private RemoveLoginBarEvents()
    {
        // UIManager.removeEventListener(UIModuleName.LoginBar, UIModuleEvent.COMPLETE, this.OnLoginBarComplete, this);
        // UIManager.removeEventListener(UIModuleName.LoginBar, UIModuleEvent.CHANGE, this.OnLoginBarChanged, this);
    }
    private OnLoginBarComplete()
    {
        this.RemoveLoginBarEvents();
        let offsetTime: number = (Date.now() - this._versionDateTime) / 1000;
        if (offsetTime >= 300)
        {
            //超时重新检查更新
            AlertManager.showAlert("登录验证已失效，请重新登录游戏！", this.OnLoginBarBack.bind(this), null, null, null, null, "重新登录");
        }
        else
        {
            //进入游戏
            // let serverInfo: ServerInfo = LoginManager.loginInfo.getServerInfo();
            // if (!serverInfo)
            // {
            //     UIManager.showFloatTips("服务器信息为空！");
            //     return;
            // }
            // else if (serverInfo.status == 1 && LoginManager.loginInfo.isWhitelist == false)
            // {
            //     AlertManager.showAlert("服务器正在维护中...", this.OnLoginBarBack.bind(this));
            //     return;
            // }
            this.InitServer();
        }
    }
    private OnLoginBarBack(event: UIModuleEvent)
    {
        UIManager.closePanel(UIModuleName.LoginBar);
        this.RemoveLoginBarEvents();
        this.InitNetworkVersion(true);
    }
    private OnLoginBarChanged()
    {
        UIManager.closePanel(UIModuleName.LoginBar);
        this.RemoveLoginBarEvents();
        ChannelManager.logout();
    }
    private InitServer()
    {
        this.RemoveInitEvents();
        GameManager.OnInitComplete.addListener(this.OnInitComplete, this);
        GameManager.OnInitError.addListener(this.OnInitError, this);
        GameManager.InitServer();
    }
    private RemoveInitEvents()
    {
        GameManager.OnInitComplete.removeListener(this.OnInitComplete, this);
        GameManager.OnInitError.removeListener(this.OnInitError, this);
    }
    private OnInitComplete()
    {
        this.RemoveInitEvents();
        this.EnterGame();
    }
    private OnInitError()
    {
        UIManager.closePanel(UIModuleName.LoginBar);
        this.RemoveInitEvents();
        this.InitNetworkVersion(true);
    }
    /**
     * 正式切场景进入游戏
     */
    private EnterGame()
    {
        ChannelManager.SetExtData();//选择服务器后设置下sdk扩展数据
        ChatManager.initialzie();

        // UIManager.closePanel(UIModuleName.LoginSceneBgPanel); //这里从逻辑上将，需要关闭，但是由于，这个将要切换到大厅场景还会显示loadingpanel，为了体验则不关闭了
        let type: InsideRoomType = InsideRoomManager.lastInsideRoomType;
        switch (type)
        {
            case InsideRoomType.Game:
            case InsideRoomType.Omaha:
            case InsideRoomType.Match:
            case InsideRoomType.GamePerson:
            case InsideRoomType.OmahaPerson:
                this.enterGambling();
                break;
            case InsideRoomType.HundredWar:
                this.enterHundredWar();
                break;
            case InsideRoomType.None:
                SceneManager.switcScene(SceneType.Hall);
                break;
        }
    }
    /**
    * 进入牌局
    */
    private enterGambling()
    {
        GamblingManager.OnGetRoomInfoEvent.addListener(this.onGetRoomInfoResult, this);
        game.Console.log("游戏初始化进入房间：reqGetRoomInfo");
        GamblingManager.reqEnterRoom();
    }
    private onGetRoomInfoResult()
    {
        GamblingManager.OnGetRoomInfoEvent.removeListener(this.onGetRoomInfoResult, this);
        SceneManager.switcScene(SceneType.Game);
    }
    /**
     * 进入百人大战
    */
    private enterHundredWar()
    {
        game.Console.log("游戏初始化进入百人大战：reqGetHundredWarRoomInfo");
        HundredWarManager.reqEnterRoom();

    }
}