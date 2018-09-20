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
 * 活动面板跳转管理
 */
var ActivityPanelJumpManager = (function () {
    function ActivityPanelJumpManager() {
    }
    /**
     * 显示切换面板
     */
    ActivityPanelJumpManager.showSwitchPanel = function () {
        if (!ActivityPanelJumpManager._switchPanel) {
            ActivityPanelJumpManager._switchPanel = UIManager.getPanel(UIModuleName.LoadingSwitchPanel);
        }
        if (!UIManager.isShowPanelObj(ActivityPanelJumpManager._switchPanel)) {
            UIManager.showPanel(UIModuleName.LoadingSwitchPanel);
        }
    };
    /**
     * 关闭切换面板
     */
    ActivityPanelJumpManager.closeSwitchPanel = function () {
        UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
    };
    /**
     * 跳转面板
     */
    ActivityPanelJumpManager.JumpToPanel = function (activityInfo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (ActivityPanelJumpManager._isLoading) {
                            return [2 /*return*/];
                        }
                        ActivityPanelJumpManager._currentActivityInfo = activityInfo;
                        if (!(InfoUtil.checkAvailable(activityInfo) && activityInfo.definition.resGroup && ActivityPanelJumpManager._loadedList.indexOf(activityInfo.definition.resGroup) == -1)) return [3 /*break*/, 4];
                        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                        ActivityPanelJumpManager._loadingName = activityInfo.definition.resGroup;
                        ActivityPanelJumpManager._isLoading = true;
                        ActivityPanelJumpManager.showSwitchPanel();
                        if (!!ActivityPanelJumpManager._isLoadCommon) return [3 /*break*/, 2];
                        return [4 /*yield*/, RES.loadGroup(ResGroupName.ActivityCommon, 1)];
                    case 1:
                        _a.sent();
                        ActivityPanelJumpManager._isLoadCommon = true;
                        ActivityPanelJumpManager._loadedList.push(ResGroupName.ActivityCommon);
                        _a.label = 2;
                    case 2: return [4 /*yield*/, RES.loadGroup(activityInfo.definition.resGroup, 0)];
                    case 3:
                        _a.sent();
                        ActivityPanelJumpManager._loadedList = ActivityPanelJumpManager._loadedList.concat(activityInfo.definition.resGroup);
                        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                        ActivityPanelJumpManager._isLoading = false;
                        ActivityPanelJumpManager.closeSwitchPanel();
                        ActivityPanelJumpManager.jumpToActivity(ActivityPanelJumpManager._currentActivityInfo);
                        return [3 /*break*/, 5];
                    case 4:
                        if (InfoUtil.checkAvailable(activityInfo)) {
                            ActivityPanelJumpManager.jumpToActivity(activityInfo);
                        }
                        else {
                            qin.Console.logError("跳转活动页面信息异常！   活动info:" + JSON.stringify(activityInfo));
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ActivityPanelJumpManager.onResourceLoadError = function (event) {
        ActivityPanelJumpManager._isLoading = false;
        console.warn("Group:" + event.groupName + " has failed to load");
    };
    ActivityPanelJumpManager.onResourceProgress = function (event) {
        qin.Console.log("资源加载地址：" + event.resItem.url);
    };
    ActivityPanelJumpManager.jumpToActivity = function (info) {
        if (ActivityManager.showList.indexOf(info) != -1) {
            ActivityManager.showPanelInActivityCenter(info);
        }
        else {
            UIManager.showPanel(info.definition.panelName, { info: info });
        }
    };
    /**
     * 加载列表
     */
    ActivityPanelJumpManager._loadedList = [];
    /**
     * 是否加载公共了资源
     */
    ActivityPanelJumpManager._isLoadCommon = false;
    return ActivityPanelJumpManager;
}());
__reflect(ActivityPanelJumpManager.prototype, "ActivityPanelJumpManager");
//# sourceMappingURL=ActivityPanelJumpManager.js.map