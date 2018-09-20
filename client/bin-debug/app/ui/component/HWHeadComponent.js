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
 * 百人大战牌局玩家头像组件
 */
var HWHeadComponent = (function (_super) {
    __extends(HWHeadComponent, _super);
    function HWHeadComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HWHeadComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maxWidth = 96;
        this.maxHeight = 150;
        this.maskImg.touchEnabled = false;
        this.maskImg.visible = false;
        qin.FilterUtil.setColorFilters(this.cardTypeBg, 0x000000);
    };
    /**
     * 默认初始化
     */
    HWHeadComponent.prototype.init = function (data) {
        this.realInit(data);
    };
    HWHeadComponent.prototype.rendererStart = function (event) {
        _super.prototype.rendererStart.call(this, event);
    };
    HWHeadComponent.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        ChatManager.onNewMessageCome.addListener(this.showOtherMsg, this);
    };
    HWHeadComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        ChatManager.onNewMessageCome.removeListener(this.showOtherMsg, this);
        egret.Tween.removeTweens(this.emojiImg);
        qin.Tick.RemoveTimeoutInvoke(this.hideWinEffect, this);
    };
    /**
     * 坐下初始化
     */
    HWHeadComponent.prototype.sitDownInit = function (data) {
        this.realInit(data);
    };
    /**
     * 执行初始化
     */
    HWHeadComponent.prototype.realInit = function (data) {
        _super.prototype.init.call(this, data);
        this.emojiImg.visible = false;
        if (data) {
            this.playerGroup.visible = true;
            this.emptyGroup.visible = false;
            this.lastRoleId = data.roleId;
        }
        else {
            this.setEmpty();
        }
        this.showHead();
        this.showBankRoll();
        this.refreshVip();
    };
    /**
     * 显示他人信息
    */
    HWHeadComponent.prototype.showOtherMsg = function (msg) {
        if (this.bindData && this.bindData.roleId == msg.roleId && msg.type == ChatMessageType.InRoom) {
            //根据message里的内容格式判断是文本还是表情             
            this.emojiOrContext(msg);
        }
    };
    /**
     * 表情 文字分支
    */
    HWHeadComponent.prototype.emojiOrContext = function (msg) {
        if (msg.subType == ChatSubType.Emoji) {
            //表情
            this.showEmoji(msg);
        }
    };
    /**
     * 设置表情显示
    */
    HWHeadComponent.prototype.showEmoji = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var info, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        info = msg;
                        if (!(info.param && info.param.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, RES.getResAsync(ResPrefixPathName.Emoji + info.param[0] + ResSuffixName.PNG)];
                    case 1:
                        data = _a.sent();
                        this.emojiImg.visible = true;
                        this.emojiImg.texture = data;
                        egret.Tween.removeTweens(this.emojiImg);
                        this.emojiAnimate();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 表情显示动画
    */
    HWHeadComponent.prototype.emojiAnimate = function () {
        this.emojiImg.scaleX = 0.5;
        this.emojiImg.scaleY = 0.5;
        egret.Tween.get(this.emojiImg).to({ scaleX: 1.3, scaleY: 1.3 }, 500, egret.Ease.bounceOut).wait(1500).call(this.closeEmojiAnimate, this);
    };
    /**
     * 关闭表情显示动画
    */
    HWHeadComponent.prototype.closeEmojiAnimate = function () {
        egret.Tween.removeTweens(this.emojiImg);
        this.emojiImg.visible = false;
    };
    /**
     * 空座位
    */
    HWHeadComponent.prototype.setEmpty = function () {
        this.emptyGroup.visible = true;
        this.playerGroup.visible = false;
    };
    //头像信息
    HWHeadComponent.prototype.showHead = function () {
        if (this.bindData) {
            this.headIcon.init(this.bindData, 90);
            this.headIcon.visible = true;
            this.borderImg.visible = true;
            this.refreshVip();
        }
        else {
            this.headIcon.visible = false;
            this.borderImg.visible = false;
        }
    };
    /**
     * 显示基本的元素
     */
    HWHeadComponent.prototype.showBase = function () {
        this.setEmpty();
    };
    /**
     * 显示筹码
     */
    HWHeadComponent.prototype.showBankRoll = function () {
        if (this.bindData) {
            this.chipsLabel.text = qin.MathUtil.formatNum(this.bindData.gold);
        }
    };
    /**
     * 显示赢牌特效
     */
    HWHeadComponent.prototype.showWinEffect = function () {
        var _this = this;
        AnimationFactory.getParticleEffect(AnimationType.WinCard, this, function (ptc) {
            _this._winEffect = ptc;
        });
    };
    /**
     * 隐藏赢牌特效
     */
    HWHeadComponent.prototype.hideWinEffect = function () {
        if (this._winEffect && this._winEffect.parent) {
            this._winEffect.stop();
            this._winEffect.parent.removeChild(this._winEffect);
        }
    };
    /**
     * 刷新vip
     */
    HWHeadComponent.prototype.refreshVip = function () {
        this.vipGroup.visible = false;
        if (this.bindData && this.bindData.vipLevel > 0) {
            this.vipGroup.visible = true;
            this.vipLabel.text = "VIP" + this.bindData.vipLevel.toString();
        }
    };
    return HWHeadComponent;
}(BaseComponent));
__reflect(HWHeadComponent.prototype, "HWHeadComponent");
//# sourceMappingURL=HWHeadComponent.js.map