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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (false) {
            egret.Logger.logLevel = egret.Logger.ERROR;
        }
        qin.Console.enabled = true || URLOption.getBoolean(URLOption.Log) || qin.System.isLocalhost;
        // qin.Console.enabled = false;
        //
        this.stage.setContentSize(GameSetting.StageWidth, GameSetting.StageHeight);
        if (egret.Capabilities.isMobile == false && qin.System.isWeb && qin.System.isEditor == false) {
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            this.stage.orientation = egret.OrientationMode.AUTO;
        }
        if (qin.RuntimeTypeName.getCurrentName() == qin.RuntimeTypeName.WindowsPhone || qin.RuntimeTypeName.getCurrentName() == qin.RuntimeTypeName.WindowsPC) {
            egret.TextField.default_fontFamily = 'Microsoft YaHei';
        }
        RES.setMaxLoadingThread(qin.System.isMicro ? 8 : 4);
        qin.I18n.initSystem(PrefsManager.getValue(PrefsManager.Language), OperatePlatform.getLangs());
        //注入自定义的素材解析器
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //初始化Resource资源加载库
        this.startLoadConfig();
    };
    Main.prototype.startLoadConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("test1111");
                        if (!(qin.System.isWeb || qin.System.isMicro)) return [3 /*break*/, 2];
                        return [4 /*yield*/, RES.loadConfig(WebConfig.resUrl + WebConfig.defaultResJson, WebConfig.resUrl + 'resource/')];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, RES.loadConfig(PathName.Default_res_json, 'resource/')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.onConfigComplete();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     */
    Main.prototype.onConfigComplete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!qin.I18n.isDefault) return [3 /*break*/, 1];
                        this.loadAssetText();
                        return [3 /*break*/, 5];
                    case 1:
                        if (!true) return [3 /*break*/, 3];
                        return [4 /*yield*/, RES.getResByUrl(PathName.LangDirectory + qin.I18n.lang + AssetsSuffixName.JSON, this.onLangComplete, this)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, RES.getResAsync(ResPrefixPathName.Lang + qin.I18n.lang + ResSuffixName.ZIP)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.onLangComplete = function (data) {
        if (data) {
            qin.I18n.initMap(data);
        }
        this.loadAssetText();
    };
    Main.prototype.loadAssetText = function () {
        return __awaiter(this, void 0, void 0, function () {
            var name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = qin.I18n.isDefault ? ResGroupName.Text : ResGroupName.Text + qin.StringConstants.UnderLine + qin.I18n.lang;
                        return [4 /*yield*/, RES.loadGroup(name)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup(ResGroupName.Login)];
                    case 3:
                        _a.sent();
                        egret.ImageLoader.crossOrigin = "anonymous"; //本机跨域访问问题
                        this.createScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var thmUrl;
            return __generator(this, function (_a) {
                thmUrl = '';
                if (qin.System.isWeb || qin.System.isMicro) {
                    thmUrl = WebConfig.resUrl + WebConfig.defaultThmJson;
                }
                else {
                    thmUrl = PathName.Default_thm_json;
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
                        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
                        var theme = new eui.Theme(thmUrl, _this.stage);
                        theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                            resolve();
                        }, _this);
                    })];
            });
        });
    };
    Main.prototype.createScene = function () {
        this.setLoadingText(qin.I18n.getText('正在进入游戏...'));
        GameManager.initialize(this.stage, this);
        UIManager.initialize(this.stage);
        qin.Tick.initialize(this.stage);
        ChannelManager.OnInitComplete.addListener(this.OnChannelInitComplete, this);
        ChannelManager.initialize();
    };
    Main.prototype.OnChannelInitComplete = function () {
        this.closeLoading();
        ChannelManager.OnInitComplete.removeListener(this.OnChannelInitComplete, this);
        SceneManager.switcScene(SceneType.Login);
    };
    Main.prototype.setLoadingText = function (text) {
        if (qin.System.isWeb) {
            WebLoading.setText(text);
        }
    };
    Main.prototype.closeLoading = function () {
        if (qin.System.isWeb) {
            WebLoading.hide();
        }
        else if (qin.System.isMicro) {
            //关闭启动页,egret微端提供的方法
            if (window['closeLoadingView']) {
                window['closeLoadingView']();
            }
        }
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map