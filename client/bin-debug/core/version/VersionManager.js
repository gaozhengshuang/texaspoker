var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
 * 版本管理
 */
var VersionManager = (function () {
    function VersionManager() {
    }
    Object.defineProperty(VersionManager, "isServerTest", {
        /**
         * 是否是连接测试服
         */
        get: function () {
            return VersionManager._isServerTest;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VersionManager, "isSafe", {
        /**
         * 是否开启安全开关（提审的时候需要开启，用来屏蔽部分东西）
         */
        get: function () {
            return VersionManager._isServerTest && VersionManager._isSafe;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化
     */
    VersionManager.Initialize = function (callback, thisObject) {
        if (qin.System.isMicro) {
            //微端
            VersionManager._isSafe = true ? false : WebConfig.isSafe;
            VersionManager._clientVersion = WebConfig.clientVersion;
            VersionManager._clientVersionArray = qin.StringUtil.toIntArray(VersionManager._clientVersion, qin.StringConstants.Dot);
            if (VersionManager._clientVersionArray && VersionManager._clientVersionArray.length > 2) {
                var serverVersion = WebConfig.serverVersion;
                var serverVersionArray = qin.StringUtil.toIntArray(serverVersion, qin.StringConstants.Dot);
                var isNewClient = VersionUtil.CompareAllForce(VersionManager._clientVersionArray, serverVersionArray);
                VersionManager._isServerTest = true ? true : isNewClient;
                VersionManager.parsePackageVersion(serverVersion, serverVersionArray, VersionManager._clientVersionArray, function () {
                    qin.FuncUtil.invoke(callback, thisObject);
                }, function () {
                    GameManager.reload();
                });
            }
            else {
                AlertManager.showAlertByString('版本号获取错误，请检查初始文件是否正确');
            }
        }
        else {
            //web版
            VersionManager._isSafe = false;
            VersionManager._isServerTest = true ? true : URLOption.getBoolean(URLOption.ServerTest);
            qin.FuncUtil.invoke(callback, thisObject);
        }
    };
    VersionManager.onLoadVersionComplete = function (data, url) {
        qin.Console.log("version.json的数据：" + JSON.stringify(data));
        if (data) {
            VersionManager._isMaintain = qin.StringUtil.toBoolean(data.mt);
            //web版、微端
            if (false && VersionManager._isServerTest == false && VersionManager._isMaintain) {
                VersionManager.LoadMaintainTxt();
            }
            else {
                VersionManager.onServerComplete.dispatch();
            }
        }
        else {
            AlertManager.showAlert2("加载版本文件失败！点击确定重新加载！", VersionManager, VersionManager.loadServerVersion);
        }
    };
    VersionManager.loadServerVersion = function () {
        var url = ProjectDefined.GetInstance().getVersionUrl(GameSetting.AppId);
        RES.getResByUrl(url, VersionManager.onLoadVersionComplete, this, RES.ResourceItem.TYPE_JSON);
    };
    VersionManager.parsePackageVersion = function (serverVersion, serverVersionArray, clientVersionArray, callback, errorCallback, data) {
        if (serverVersionArray && clientVersionArray && serverVersionArray.length > 2 && clientVersionArray.length > 2) {
            if (VersionUtil.CompareForce(serverVersionArray, clientVersionArray)) {
                AlertManager.showAlert2("有新版本(" + serverVersion + ")更新，需要更新才能进入游戏，点击确定前往更新!", VersionManager, VersionManager.gotoLoadNewVersion);
            }
            else {
                if (VersionUtil.CompareOptimize(serverVersionArray, clientVersionArray)) {
                    AlertManager.showConfirm2("有新版本(" + serverVersion + ")更新，是否前往更新？", VersionManager, VersionManager.gotoLoadNewVersion, callback, null, data);
                }
                else {
                    qin.FuncUtil.invoke(callback, VersionManager, data);
                }
            }
        }
        else {
            AlertManager.showAlert2("版本文件解析错误！点击确定重新加载！", VersionManager, errorCallback);
        }
    };
    /**
     * 跳转下载新的版本
     */
    VersionManager.gotoLoadNewVersion = function () {
        var url = BundleManager.getUrl();
        if (url) {
            ChannelManager.openURL(url);
        }
        else {
            AlertManager.showAlert("下载地址空，请到应用商店下载或联系客服处理");
        }
    };
    /**
     * 验证服务器版本(游戏内容版本)
     */
    VersionManager.VerifyGameServer = function (gameServerVersion) {
        var gsv = qin.StringUtil.toIntArray(gameServerVersion, qin.StringConstants.Dot);
        var codeVersionArray = qin.StringUtil.toIntArray(ProjectDefined.GetInstance().codeVersion, qin.StringConstants.Dot);
        if (codeVersionArray.length > 1) {
            if ((codeVersionArray[0] != gsv[0]) || (codeVersionArray[1] < gsv[1])) {
                return false;
            }
            return true;
        }
        return false;
    };
    /**
     * 加载维护文件
     */
    VersionManager.LoadMaintainTxt = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = ProjectDefined.GetInstance().getMaintainUrl(GameSetting.AppId);
                RES.getResByUrl(url, VersionManager.OnMaintainComplete, this, RES.ResourceItem.TYPE_TEXT);
                return [2 /*return*/];
            });
        });
    };
    VersionManager.OnMaintainComplete = function (text) {
        if (text) {
            AlertManager.showAlert2(text, VersionManager, VersionManager.loadServerVersion);
        }
        else {
            AlertManager.showAlert2("游戏停机维护中，届时将无法登录游戏，请各位相互转告。具体开服时间可能会根据实际情况通告，敬请谅解。", VersionManager, VersionManager.loadServerVersion);
        }
    };
    /**
     * 根据安全开关来控制组件的显示
     */
    VersionManager.setComponentVisibleBySafe = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args != null) {
            if (VersionManager.isSafe) {
                for (var i = 0; i < args.length; i++) {
                    if (args[i] && args[i].parent) {
                        args[i].parent.removeChild(args[i]);
                    }
                }
            }
        }
    };
    /**
     * 获取版本字符串显示
     */
    VersionManager.getVersionStr = function () {
        var vstr = "v" + ProjectDefined.GetInstance().codeVersion;
        if (qin.System.isMicro) {
            vstr = vstr + "(" + VersionManager._clientVersion + ")";
        }
        return vstr;
    };
    /**
     * 检测完成
     */
    VersionManager.onServerComplete = new qin.DelegateDispatcher();
    VersionManager._isMaintain = false; //是否维护
    VersionManager._isServerTest = true;
    VersionManager._isSafe = false;
    return VersionManager;
}());
__reflect(VersionManager.prototype, "VersionManager");
//# sourceMappingURL=VersionManager.js.map