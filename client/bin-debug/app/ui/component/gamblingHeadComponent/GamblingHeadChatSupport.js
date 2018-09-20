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
 * 头像组件聊天
*/
var GamblingHeadChatSupport = (function () {
    function GamblingHeadChatSupport(target) {
        this.context = target;
    }
    GamblingHeadChatSupport.prototype.initialize = function () {
        this.setChatGroupPos();
    };
    GamblingHeadChatSupport.prototype.onEnable = function () {
        UIUtil.hideScrollerBar(this.context.chatScroller, true, true);
        ChatManager.onNewMessageCome.addListener(this.showOtherMsg, this);
    };
    GamblingHeadChatSupport.prototype.onDisable = function () {
        ChatManager.onNewMessageCome.removeListener(this.showOtherMsg, this);
        qin.Tick.RemoveTimeoutInvoke(this.countDownToCloseChat, this);
        egret.Tween.removeTweens(this.context.chatScroller.viewport);
        egret.Tween.removeTweens(this.context.emojiImg);
    };
    /**
     * 显示他人信息
    */
    GamblingHeadChatSupport.prototype.showOtherMsg = function (msg) {
        if (this.context.bindData && this.context.bindData.roleId == msg.roleId && msg.type == ChatMessageType.InRoom) {
            //根据message里的内容格式判断是文本还是表情             
            this.emojiOrContext(msg);
        }
    };
    /**
     * 表情 文字分支
    */
    GamblingHeadChatSupport.prototype.emojiOrContext = function (msg) {
        if (msg.subType == ChatSubType.Normal) {
            //文字
            this.setChatContext(msg);
        }
        else if (msg.subType == ChatSubType.Emoji) {
            //表情
            this.showEmoji(msg);
        }
        else if (msg.subType == ChatSubType.AudioRecordMessage) {
            //语音
            this.setVoiceInfo(msg);
        }
    };
    GamblingHeadChatSupport.prototype.setVoiceInfo = function (msg) {
        if (qin.System.isMicro) {
            this.context.voiceGroup.visible = true;
            this.context.voiceTimeLabel.text = Math.ceil(parseFloat(msg.param[0])) + "\"";
            qin.Tick.RemoveTimeoutInvoke(this.countDownToCloseChat, this);
            qin.Tick.AddTimeoutInvoke(this.countDownToCloseChat, 4000, this);
        }
        else {
            this.setChatContext("发了一条语音，当前打开方式不支持语音功能");
        }
    };
    /**
     * 设置表情显示
    */
    GamblingHeadChatSupport.prototype.showEmoji = function (msg) {
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
                        this.context.emojiImg.visible = true;
                        this.context.emojiImg.texture = data;
                        egret.Tween.removeTweens(this.context.emojiImg);
                        this.emojiAnimate();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 设置聊天内容
    */
    GamblingHeadChatSupport.prototype.setChatContext = function (msg) {
        this.context.chatGroup.visible = true;
        this.context.chatLabel.text = msg.message;
        egret.Tween.removeTweens(this.context.chatScroller.viewport);
        qin.Tick.RemoveTimeoutInvoke(this.countDownToCloseChat, this);
        if (this.context.chatLabel.width < 6 * this.context.chatLabel.size) {
            this.context.chatScroller.viewport.scrollH = 0;
            qin.Tick.AddTimeoutInvoke(this.countDownToCloseChat, 4000, this);
        }
        else {
            this.context.chatScroller.viewport.scrollH = (this.context.chatScroller.viewport.width - this.context.chatLabel.width) / 2 - 2;
            this.scrollerAnimate();
        }
    };
    /**
     * 倒计时关闭聊天显示框
    */
    GamblingHeadChatSupport.prototype.countDownToCloseChat = function () {
        qin.Tick.RemoveTimeoutInvoke(this.countDownToCloseChat, this);
        this.clear();
    };
    /**
     * 聊天内容过长滚动动画
    */
    GamblingHeadChatSupport.prototype.scrollerAnimate = function () {
        var targetPos = (this.context.chatLabel.width - this.context.chatScroller.viewport.width) / 2 + 2;
        var duration = this.context.chatLabel.width * 15;
        egret.Tween.get(this.context.chatScroller.viewport).wait(500).to({ scrollH: targetPos }, duration).wait(1000).call(this.closeAnimate, this);
    };
    /**
     * 表情显示动画
    */
    GamblingHeadChatSupport.prototype.emojiAnimate = function () {
        this.context.emojiImg.scaleX = 0.5;
        this.context.emojiImg.scaleY = 0.5;
        egret.Tween.get(this.context.emojiImg).to({ scaleX: 1.3, scaleY: 1.3 }, 500, egret.Ease.bounceOut).wait(1500).call(this.closeEmojiAnimate, this);
    };
    /**
     * 关闭动画
    */
    GamblingHeadChatSupport.prototype.closeAnimate = function () {
        egret.Tween.removeTweens(this.context.chatScroller.viewport);
        this.clear();
    };
    GamblingHeadChatSupport.prototype.clear = function () {
        this.context.chatGroup.visible = false;
        this.context.chatLabel.text = "";
        this.context.voiceGroup.visible = false;
        this.context.voiceTimeLabel.text = "";
    };
    /**
     * 关闭表情显示动画
    */
    GamblingHeadChatSupport.prototype.closeEmojiAnimate = function () {
        egret.Tween.removeTweens(this.context.emojiImg);
        this.context.emojiImg.visible = false;
    };
    /**
     * 设置聊天框的位置
    */
    GamblingHeadChatSupport.prototype.setChatGroupPos = function () {
        if (this.context.posIndex == 1) {
            this.turnChatGroup(false);
        }
        else {
            if (GamblingManager.maxSeats == SeatMode.Three) {
                if (this.context.posIndex <= 2) {
                    this.turnChatGroup(false);
                }
                else {
                    this.turnChatGroup(true);
                }
            }
            else if (GamblingManager.maxSeats == SeatMode.Five) {
                if (this.context.posIndex <= 3) {
                    this.turnChatGroup(false);
                }
                else {
                    this.turnChatGroup(true);
                }
            }
            else if (GamblingManager.maxSeats == SeatMode.Six) {
                if (this.context.posIndex <= 4) {
                    this.turnChatGroup(false);
                }
                else {
                    this.turnChatGroup(true);
                }
            }
            else if (GamblingManager.maxSeats == SeatMode.Nine) {
                if (this.context.posIndex <= 5) {
                    this.turnChatGroup(false);
                }
                else {
                    this.turnChatGroup(true);
                }
            }
        }
    };
    /**
     * 显示聊天组
     */
    GamblingHeadChatSupport.prototype.turnChatGroup = function (flag) {
        if (flag) {
            this.context.chatScroller.viewport.scaleX = this.context.chatGroup.scaleX = this.context.voiceGroup.scaleX = this.context.voiceShow.scaleX = -1;
            this.context.chatGroup.x = this.context.voiceGroup.x = -2.5;
            this.context.voiceShow.x = 80;
        }
        else {
            this.context.chatScroller.viewport.scaleX = this.context.chatGroup.scaleX = this.context.voiceGroup.scaleX = this.context.voiceShow.scaleX = 1;
            this.context.chatGroup.x = this.context.voiceGroup.x = 94.5;
            this.context.voiceShow.x = 22;
        }
    };
    return GamblingHeadChatSupport;
}());
__reflect(GamblingHeadChatSupport.prototype, "GamblingHeadChatSupport");
//# sourceMappingURL=GamblingHeadChatSupport.js.map