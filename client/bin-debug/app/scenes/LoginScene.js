var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 登录场景逻辑处理
 */
var LoginScene = (function (_super) {
    __extends(LoginScene, _super);
    function LoginScene() {
        var _this = _super.call(this) || this;
        _this._isLoginingAcount = false;
        _this.resGroupName = [ResGroupName.Login];
        return _this;
    }
    LoginScene.prototype.clear = function () {
        UIManager.closePanel(UIModuleName.LoginSceneBgPanel);
        ChannelManager.OnLogout.removeListener(this.OnChannelLogout, this);
        this.RemoveChannelEvents();
        this.RemoveGameLoginEvents();
        this.RemoveLoginBarEvents();
        LoginManager.Dispose();
    };
    LoginScene.prototype.onResourceLoadComplete = function (event) {
        _super.prototype.onResourceLoadComplete.call(this, event);
        if (this._isResLoaded) {
            SceneManager.switchClosePanels();
            this.LoadCompleteEvent.dispatch(this);
        }
    };
    LoginScene.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.initialize.call(this);
                UIManager.showPanel(UIModuleName.LoginSceneBgPanel);
                VersionManager.Initialize(this.onVersionInitComplete, this);
                return [2 /*return*/];
            });
        });
    };
    LoginScene.prototype.onVersionInitComplete = function () {
        //显示版本号
        var panel = UIManager.getPanel(UIModuleName.LoginSceneBgPanel);
        if (panel) {
            panel.showVersion();
        }
        this.InitNetworkVersion();
    };
    LoginScene.prototype.InitNetworkVersion = function (again) {
        if (again && (qin.System.isWeb || qin.System.isMicro)) {
            GameManager.reload();
            return;
        }
        if (LoginScene.SkipVersion && (true || qin.System.isLocalhost)) {
            this.onEnterLogin();
        }
        else {
            VersionManager.onServerComplete.addListener(this.onEnterLogin, this);
            VersionManager.loadServerVersion();
        }
    };
    LoginScene.prototype.onEnterLogin = function () {
        TalkingDataManager.enabled = (VersionManager.isServerTest == false);
        VersionManager.onServerComplete.removeListener(this.onEnterLogin, this);
        this._versionDateTime = Date.now();
        if (qin.System.isWeb) {
            var debugLoginType = URLOption.getString(URLOption.DebugLoginType);
            if (qin.StringUtil.isNullOrEmpty(debugLoginType)) {
                this.EnterLoginStart(true);
            }
            else {
                this.GameTokenDebug(debugLoginType);
            }
        }
        else {
            this.EnterLoginStart(true);
        }
    };
    LoginScene.prototype.EnterLoginStart = function (isAutoLogin) {
        this._channelLoginList = ChannelLoginType.GetChannelLoginList(OperatePlatform.getCurrent(), ChannelManager.channelType, VersionManager.isServerTest, VersionManager.isSafe);
        if (isAutoLogin && this._channelLoginList.indexOf(ChannelLoginType.Weixin) >= 0 && WebConfig.isWxWebAuthorize) {
            this.ChannelLoginStart(ChannelLoginType.Weixin, isAutoLogin);
            return;
        }
        var channelLoginType = PrefsManager.getValue(PrefsManager.Login_LoginType);
        if (this._channelLoginList.length > 1) {
            if (isAutoLogin && channelLoginType) {
                this.ChannelLoginStart(channelLoginType, isAutoLogin);
            }
            else {
                this.ShowEnterLoginPanel();
            }
        }
        else {
            if (isAutoLogin && (!this._channelLoginList[0] || channelLoginType)) {
                this.ChannelLoginStart(this._channelLoginList[0], isAutoLogin);
            }
            else {
                this.ShowEnterLoginPanel();
            }
        }
    };
    LoginScene.prototype.ChannelLoginStart = function (loginType, isAutoLogin) {
        ChannelManager.OnLogout.addListener(this.OnChannelLogout, this);
        //
        ChannelManager.loginType = loginType;
        if (loginType == ChannelLoginType.Guest || loginType == ChannelLoginType.IntranetGuest) {
            //游客登录
            this.GameGuestLogin();
        }
        else {
            //渠道登录
            this.AddChannelEvents();
            ChannelManager.login(loginType, isAutoLogin);
        }
    };
    LoginScene.prototype.ShowEnterLoginPanel = function () {
        UIManager.addEventListener(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, this.OnEnterLoginSelect, this);
        UIManager.showPanel(UIModuleName.LoginPanel, this._channelLoginList);
    };
    LoginScene.prototype.HideEnterLoginPanel = function () {
        UIManager.removeEventListener(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, this.OnEnterLoginSelect, this);
        UIManager.closePanel(UIModuleName.LoginPanel);
    };
    LoginScene.prototype.OnEnterLoginSelect = function (data) {
        this.HideEnterLoginPanel();
        this.ChannelLoginStart(data, false);
    };
    LoginScene.prototype.GameGuestLogin = function () {
        this.AddGameLoginEvents();
        LoginManager.GuestLogin(ChannelType.guest); //游客渠道标识是固定的
    };
    LoginScene.prototype.AddGameLoginEvents = function () {
        this.RemoveGameLoginEvents();
        LoginManager.OnComplete.addListener(this.OnGameLoginComplete, this);
        LoginManager.OnError.addListener(this.OnGameLoginError, this);
        LoginManager.OnVersionError.addListener(this.OnGameLoginVersionError, this);
    };
    LoginScene.prototype.RemoveGameLoginEvents = function () {
        LoginManager.OnComplete.removeListener(this.OnGameLoginComplete, this);
        LoginManager.OnError.removeListener(this.OnGameLoginError, this);
        LoginManager.OnVersionError.removeListener(this.OnGameLoginVersionError, this);
    };
    LoginScene.prototype.AddChannelEvents = function () {
        this.RemoveChannelEvents();
        ChannelManager.OnAccountLoginSucceed.addListener(this.OnAccountLoginSucceed, this);
        ChannelManager.OnTokenLoginSucceed.addListener(this.OnTokenLoginSucceed, this);
        ChannelManager.OnLoginFailed.addListener(this.OnChannelLoginFailure, this);
        ChannelManager.OnBackToApplication.addListener(this.OnBackToApplication, this);
        this._isLoginingAcount = true;
    };
    LoginScene.prototype.RemoveChannelEvents = function () {
        ChannelManager.OnAccountLoginSucceed.removeListener(this.OnAccountLoginSucceed, this);
        ChannelManager.OnTokenLoginSucceed.removeListener(this.OnTokenLoginSucceed, this);
        ChannelManager.OnLoginFailed.removeListener(this.OnChannelLoginFailure, this);
        ChannelManager.OnBackToApplication.removeListener(this.OnBackToApplication, this);
        this._isLoginingAcount = false;
        qin.Tick.RemoveTimeoutInvoke(this.CallBackToLoginLaterCoroutine, this);
    };
    LoginScene.prototype.GameTokenDebug = function (loginType) {
        ChannelManager.OnLogout.addListener(this.OnChannelLogout, this);
        ChannelManager.loginType = loginType;
        var debugToken = URLOption.getString(URLOption.DebugToken);
        if (qin.StringUtil.isNullOrEmpty(debugToken)) {
            AlertManager.showAlertByString('登录token不能为空');
        }
        else {
            this.AddGameLoginEvents();
            LoginManager.TokenDebug(ChannelManager.getLoginChannel(), debugToken);
        }
    };
    LoginScene.prototype.OnChannelLoginFailure = function () {
        this.RemoveChannelEvents();
        PrefsManager.clearLoginInfo();
        this.ShowEnterLoginPanel();
    };
    LoginScene.prototype.OnBackToApplication = function () {
        qin.Tick.RemoveTimeoutInvoke(this.CallBackToLoginLaterCoroutine, this);
        qin.Tick.AddTimeoutInvoke(this.CallBackToLoginLaterCoroutine, 5000, this);
    };
    LoginScene.prototype.CallBackToLoginLaterCoroutine = function () {
        if (this._isLoginingAcount) {
            UIManager.showFloatTips("登录失败");
            this.OnChannelLoginFailure();
        }
    };
    LoginScene.prototype.OnAccountLoginSucceed = function (args) {
        this.RemoveChannelEvents();
        if (args[2]) {
            this.GameAccountRegister(args[0], args[1]);
        }
        else {
            this.GameAccountLogin(args[0], args[1]);
        }
    };
    LoginScene.prototype.OnTokenLoginSucceed = function (token) {
        this.RemoveChannelEvents();
        this.GameTokenLogin(token);
    };
    LoginScene.prototype.OnChannelLogout = function () {
        this.RemoveChannelEvents();
        ChannelManager.OnLogout.removeListener(this.OnChannelLogout, this);
        this.EnterLoginStart(false);
    };
    LoginScene.prototype.GameAccountRegister = function (account, password) {
        this.AddGameLoginEvents();
        LoginManager.AccountRegister(ChannelManager.channelType, account, password);
    };
    LoginScene.prototype.GameAccountLogin = function (account, password) {
        this.AddGameLoginEvents();
        LoginManager.AccountLogin(ChannelManager.channelType, account, password);
    };
    LoginScene.prototype.GameTokenLogin = function (token) {
        this.AddGameLoginEvents();
        LoginManager.TokenLogin(ChannelManager.getLoginChannel(), token);
    };
    LoginScene.prototype.OnGameLoginComplete = function () {
        this.RemoveGameLoginEvents();
        //
        UIManager.closePanel(UIModuleName.LoginPanel);
        UIManager.closePanel(UIModuleName.RegisterPanel);
        //
        var tdgaUid = qin.StringUtil.format("{0}_{1}_{2}", OperatePlatform.getCurrent(), ChannelManager.channelType, LoginManager.loginInfo.userid.toString());
        TalkingDataManager.setAccount(tdgaUid);
        TalkingDataManager.setAccountName(LoginManager.account);
        //
        if (true || qin.System.isLocalhost) {
            this.ShowLoginBar();
        }
        else {
            this.OnLoginBarComplete();
        }
    };
    LoginScene.prototype.OnGameLoginError = function () {
        this.RemoveGameLoginEvents();
        this.ShowEnterLoginPanel();
    };
    LoginScene.prototype.OnGameLoginVersionError = function () {
        this.RemoveGameLoginEvents();
        var info = new AlertInfo();
        info.thisObject = this;
        info.title = "版本错误";
        info.message = "客户端版本与服务器版本不匹配，请更新再进游戏。";
        info.confirmLabel = "刷新";
        info.OnConfirm = function () {
            GameManager.reload();
        };
        AlertManager.showAlertInfo(info);
    };
    LoginScene.prototype.ShowLoginBar = function () {
        this.RemoveLoginBarEvents();
        UIManager.addEventListener(UIModuleName.LoginBar, UIModuleEvent.COMPLETE, this.OnLoginBarComplete, this);
        UIManager.addEventListener(UIModuleName.LoginBar, UIModuleEvent.CHANGE, this.OnLoginBarChanged, this);
        UIManager.showPanel(UIModuleName.LoginBar, LoginManager.loginInfo);
    };
    LoginScene.prototype.RemoveLoginBarEvents = function () {
        UIManager.removeEventListener(UIModuleName.LoginBar, UIModuleEvent.COMPLETE, this.OnLoginBarComplete, this);
        UIManager.removeEventListener(UIModuleName.LoginBar, UIModuleEvent.CHANGE, this.OnLoginBarChanged, this);
    };
    LoginScene.prototype.OnLoginBarComplete = function () {
        this.RemoveLoginBarEvents();
        var offsetTime = (Date.now() - this._versionDateTime) / 1000;
        if (offsetTime >= 300) {
            //超时重新检查更新
            AlertManager.showAlert("登录验证已失效，请重新登录游戏！", this.OnLoginBarBack.bind(this), null, null, null, null, "重新登录");
        }
        else {
            //进入游戏
            var serverInfo = LoginManager.loginInfo.getServerInfo();
            if (!serverInfo) {
                UIManager.showFloatTips("服务器信息为空！");
                return;
            }
            else if (serverInfo.status == 1 && LoginManager.loginInfo.isWhitelist == false) {
                AlertManager.showAlert("服务器正在维护中...", this.OnLoginBarBack.bind(this));
                return;
            }
            this.InitServer(serverInfo);
        }
    };
    LoginScene.prototype.OnLoginBarBack = function (event) {
        UIManager.closePanel(UIModuleName.LoginBar);
        this.RemoveLoginBarEvents();
        this.InitNetworkVersion(true);
    };
    LoginScene.prototype.OnLoginBarChanged = function () {
        UIManager.closePanel(UIModuleName.LoginBar);
        this.RemoveLoginBarEvents();
        ChannelManager.logout();
    };
    LoginScene.prototype.InitServer = function (serverInfo) {
        this.RemoveInitEvents();
        GameManager.OnInitComplete.addListener(this.OnInitComplete, this);
        GameManager.OnInitError.addListener(this.OnInitError, this);
        GameManager.InitServer(LoginManager.loginInfo, serverInfo);
    };
    LoginScene.prototype.RemoveInitEvents = function () {
        GameManager.OnInitComplete.removeListener(this.OnInitComplete, this);
        GameManager.OnInitError.removeListener(this.OnInitError, this);
    };
    LoginScene.prototype.OnInitComplete = function () {
        this.RemoveInitEvents();
        this.EnterGame();
    };
    LoginScene.prototype.OnInitError = function () {
        UIManager.closePanel(UIModuleName.LoginBar);
        this.RemoveInitEvents();
        this.InitNetworkVersion(true);
    };
    /**
     * 正式切场景进入游戏
     */
    LoginScene.prototype.EnterGame = function () {
        ChannelManager.SetExtData(); //选择服务器后设置下sdk扩展数据
        ChatManager.initialzie();
        // UIManager.closePanel(UIModuleName.LoginSceneBgPanel); //这里从逻辑上将，需要关闭，但是由于，这个将要切换到大厅场景还会显示loadingpanel，为了体验则不关闭了
        var type = InsideRoomManager.lastInsideRoomType;
        switch (type) {
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
    };
    /**
    * 进入牌局
    */
    LoginScene.prototype.enterGambling = function () {
        GamblingManager.OnGetRoomInfoEvent.addListener(this.onGetRoomInfoResult, this);
        qin.Console.log("游戏初始化进入房间：reqGetRoomInfo");
        GamblingManager.reqEnterRoom();
    };
    LoginScene.prototype.onGetRoomInfoResult = function () {
        GamblingManager.OnGetRoomInfoEvent.removeListener(this.onGetRoomInfoResult, this);
        SceneManager.switcScene(SceneType.Game);
    };
    /**
     * 进入百人大战
    */
    LoginScene.prototype.enterHundredWar = function () {
        qin.Console.log("游戏初始化进入百人大战：reqGetHundredWarRoomInfo");
        HundredWarManager.reqEnterRoom();
    };
    /**
     * 是否跳过版本检查，只有 debug和本机开发 生效
     */
    LoginScene.SkipVersion = true;
    return LoginScene;
}(BaseScene));
__reflect(LoginScene.prototype, "LoginScene");
//# sourceMappingURL=LoginScene.js.map