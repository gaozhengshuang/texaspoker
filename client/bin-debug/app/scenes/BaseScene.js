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
 * 基础场景
 */
var BaseScene = (function () {
    function BaseScene() {
        this.LoadCompleteEvent = new qin.DelegateDispatcher();
        this.resGroupName = [];
    }
    Object.defineProperty(BaseScene.prototype, "isResLoaded", {
        get: function () {
            return this._isResLoaded;
        },
        enumerable: true,
        configurable: true
    });
    BaseScene.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, resName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.clear();
                        if (!(this.resGroupName != undefined && !this._isResLoaded)) return [3 /*break*/, 5];
                        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                        _i = 0, _a = this.resGroupName;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        resName = _a[_i];
                        return [4 /*yield*/, RES.loadGroup(resName)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                        _b.label = 5;
                    case 5:
                        this._isResLoaded = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseScene.prototype.onResourceLoadComplete = function (event) {
        qin.Console.log("场景资源组加载成功：" + event.groupName);
    };
    BaseScene.prototype.onResourceLoadError = function (event) {
        qin.Console.log("资源组:" + event.groupName + "加载出错");
    };
    BaseScene.prototype.onItemLoadError = function (event) {
        qin.Console.log("资源项:" + event.resItem.url + "加载出错");
    };
    BaseScene.prototype.onResourceProgress = function (event) {
        qin.Console.log("场景资源加载地址：" + event.resItem.url);
        SceneManager.updateSwitchProgress(event.itemsLoaded / event.itemsTotal);
    };
    return BaseScene;
}());
__reflect(BaseScene.prototype, "BaseScene");
//# sourceMappingURL=BaseScene.js.map