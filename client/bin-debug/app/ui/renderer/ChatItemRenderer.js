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
/**
 * 聊天信息项面板
*/
var ChatItemRenderer = (function (_super) {
    __extends(ChatItemRenderer, _super);
    function ChatItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.ChatItemRenderer;
        return _this;
    }
    ChatItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.voiceImgGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playVoice, this);
        RecordAudioManager.OnPlayRecordComplete.addListener(this.onVoicePlayOver, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        if (this.bindData) {
            switch (this.bindData.subType) {
                case ChatSubType.AudioRecordMessage:
                    if (qin.System.isMicro) {
                        this.setShow(this.voiceGroup);
                        this.nameLabel.text = this.bindData.name + "：";
                        this.voiceTimeLabel.text = Math.ceil(parseFloat(this.bindData.param[0])) + "\"";
                        this.redPointImg.visible = !this.bindData.isPlay;
                    }
                    else {
                        this.setShow(this.textGroup);
                        this.textLabel.text = this.bindData.name + "：发了一条语音，当前打开方式不支持语音功能";
                        this.textLabel.textColor = ColorEnum.White;
                    }
                    break;
                case ChatSubType.Horn:
                    this.setShow(this.textGroup);
                    this.textLabel.text = this.bindData.message;
                    this.textLabel.textColor = ColorEnum.Golden;
                    break;
                default:
                    this.setShow(this.textGroup);
                    this.textLabel.text = this.bindData.name + "：" + this.bindData.message;
                    this.textLabel.textColor = ColorEnum.White;
                    break;
            }
            if (this.bindData.type == ChatMessageType.Maquee) {
                this.textLabel.textColor = ColorEnum.Golden;
            }
        }
    };
    ChatItemRenderer.prototype.setShow = function (group) {
        this.voiceGroup.visible = false;
        this.textGroup.visible = false;
        group.visible = true;
    };
    ChatItemRenderer.prototype.playVoice = function (event) {
        event.stopImmediatePropagation();
        if (this.bindData.subType == ChatSubType.AudioRecordMessage) {
            ChatManager.ClearAudioAutoPlayList();
            ChatManager.CheckAndPlay(this.bindData);
            this.playVoiceAnime.play();
            this.bindData.isPlay = true;
        }
    };
    ChatItemRenderer.prototype.onVoicePlayOver = function (guid) {
        if (guid == this.bindData.param[1]) {
            this.playVoiceAnime.stop();
        }
    };
    ChatItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        if (this.voiceImgGroup) {
            this.voiceImgGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.playVoice, this);
        }
        this.playVoiceAnime.stop();
        RecordAudioManager.OnPlayRecordComplete.removeListener(this.onVoicePlayOver, this);
    };
    return ChatItemRenderer;
}(BaseItemRenderer));
__reflect(ChatItemRenderer.prototype, "ChatItemRenderer");
//# sourceMappingURL=ChatItemRenderer.js.map