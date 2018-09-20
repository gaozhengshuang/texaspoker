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
 * 聊天管理
 */
var ChatManager = (function () {
    function ChatManager() {
    }
    Object.defineProperty(ChatManager, "emojiList", {
        /**
         * 表情列表
         */
        get: function () {
            return ChatManager._emojiList;
        },
        enumerable: true,
        configurable: true
    });
    ChatManager.initialzie = function () {
        if (!ChatManager.emojiList) {
            ChatManager._emojiList = new Array();
            for (var i = 1; i <= ChatManager.EmojiMax; i++) {
                ChatManager._emojiList[i - 1] = new Emoji();
                ChatManager._emojiList[i - 1].id = i;
                ChatManager._emojiList[i - 1].source = i + ResSuffixName.PNG;
            }
        }
        qin.ArrayUtil.Clear(ChatManager._marqueeList);
        qin.ArrayUtil.Clear(ChatManager.chatList);
        ChatManager.isHaveNewChatMsg = false;
        RecordAudioManager.OnPlayRecordComplete.addListener(ChatManager.CheckAndPlayAudioAutoList, this);
        SocketManager.AddCommandListener(Command.Chat_PushMessage_2014, ChatManager.pushChatMessage, this);
        HundredWarManager.onLeaveEvent.addListener(ChatManager.clear, this);
        HundredWarManager.OnGetRoomInfoEvent.addListener(ChatManager.clearNewMsg, this);
        GamblingManager.LeaveRoomEvent.addListener(ChatManager.clear, this);
        GamblingManager.OnPushLeaveRoomEvent.addListener(ChatManager.clear, this);
        GamblingManager.OnGetRoomInfoEvent.addListener(ChatManager.clearNewMsg, this);
    };
    ChatManager.clear = function () {
        qin.ArrayUtil.Clear(ChatManager.chatList);
    };
    ChatManager.clearNewMsg = function () {
        ChatManager.isHaveNewChatMsg = false;
        ChatManager.onRefreshChatRedPointEvent.dispatch();
    };
    ChatManager.pushChatMessage = function (result) {
        if (result.data) {
            var chatInfo = qin.PoolUtil.GetObject(ChatInfo);
            var inRoomChatInfo = new ChatInfo();
            chatInfo.roleId = result.data["roleId"];
            chatInfo.type = result.data["type"];
            if (chatInfo.type == ChatMessageType.Maquee) {
                chatInfo.message = ChatManager.marqueeHandler.getMsgByType(result.data["message"], result.data["name"]);
                ChatManager.marqueeHandler.setMsgSendUserName(chatInfo, result.data["message"], result.data["name"]);
                inRoomChatInfo.copyValueFrom(chatInfo);
                if (ChatManager.marqueeHandler.isShowMarqueeMsg(result.data["message"])) {
                    ChatManager._marqueeList.push(chatInfo);
                }
                ChatManager.chatList.push(inRoomChatInfo);
                ChatManager.marqueeMessageOper();
            }
            else if (chatInfo.type == ChatMessageType.InRoom) {
                chatInfo.message = result.data["message"];
                chatInfo.name = result.data["name"];
                ChatManager.AddChatInfo(chatInfo);
            }
            if (!UIManager.isShowPanel(UIModuleName.ChatPanel) && chatInfo.type == ChatMessageType.InRoom
                && chatInfo.roleId != UserManager.userInfo.roleId && chatInfo.subType && chatInfo.subType != ChatSubType.Emoji) {
                ChatManager.isHaveNewChatMsg = true;
                ChatManager.onRefreshChatRedPointEvent.dispatch();
            }
            ChatManager.onNewMessageCome.dispatch(chatInfo);
        }
    };
    /**
     * 发送语音消息
     */
    ChatManager.SendAudioRecordMessage = function (type, time, guid, sign, path) {
        ChatManager.SendChatMessage(ChatSpecialStrings.AudioRecordMessage + time + qin.StringConstants.Comma + guid + qin.StringConstants.Comma + sign + qin.StringConstants.Comma + path, type);
    };
    /**
     * 发送聊天消息
     */
    ChatManager.SendChatMessage = function (message, type) {
        var callback = function (result) {
            ChatManager.OnMessageSend.dispatch();
            SoundManager.playEffect(MusicAction.sentMessage);
        };
        SocketManager.call(Command.Chat_SendMessage_3019, { "message": message, "type": type }, callback, null, this);
    };
    ChatManager.AddChatInfo = function (info) {
        if (info.subType != ChatSubType.Emoji) {
            ChatManager.chatList.push(info);
        }
        if (ChatManager.chatList.length > ChatManager.MessageMax) {
            var firstInfo = ChatManager.chatList[0];
            ChatManager.CheckToClearAudioData(firstInfo);
            qin.ArrayUtil.RemoveItem(firstInfo, ChatManager.chatList);
        }
        ChatManager.HandleChatInfo(info);
    };
    ChatManager.HandleChatInfo = function (info) {
        if (info.subType == ChatSubType.AudioRecordMessage && GameSetting.autoVoiceEnabled) {
            ChatManager._audioAutoPlayList.push(info);
            ChatManager.CheckAndPlayAudioAutoList();
        }
    };
    ChatManager.CheckAndPlayAudioAutoList = function () {
        if (qin.StringUtil.isNullOrEmpty(RecordAudioManager.playingGuid) && !RecordAudioManager.isDownloading && GameSetting.autoVoiceEnabled) {
            if (ChatManager._audioAutoPlayList.length > 0) {
                ChatManager.CheckAndPlay(ChatManager._audioAutoPlayList.shift());
            }
        }
    };
    /**
    * 检测播放列表
    */
    ChatManager.CheckAndPlay = function (info) {
        if (info.subType == ChatSubType.AudioRecordMessage) {
            var guid = info.param[1];
            ChannelManager.hasRecordData(guid);
        }
    };
    /**
     * 原生检测完毕调回来
     */
    ChatManager.checkComplete = function (message) {
        var data = JSON.parse(message);
        if (data) {
            var guid = data["guid"];
            var result = qin.StringUtil.toBoolean(data["has"]);
            var info = void 0;
            for (var _i = 0, _a = ChatManager.chatList; _i < _a.length; _i++) {
                info = _a[_i];
                if (info.subType == ChatSubType.AudioRecordMessage && info.param[1] == guid) {
                    break;
                }
            }
            if (info) {
                var path = info.param[3];
                var time = parseFloat(info.param[0]);
                if (result) {
                    if (RecordAudioManager.playingGuid == guid) {
                        ChannelManager.stopRecord(guid);
                    }
                    else {
                        if (RecordAudioManager.isRecording == false) {
                            ChannelManager.playRecord(guid);
                            RecordAudioManager.PlayPauseAndResume(guid, time);
                        }
                    }
                }
                else {
                    RecordAudioManager.DownloadAmrData(path, guid, time);
                }
            }
        }
    };
    /**
    * 清空自动播放的音频列表
    */
    ChatManager.ClearAudioAutoPlayList = function () {
        ChatManager._audioAutoPlayList.length = 0;
    };
    ChatManager.CreateChatInfoByMyInfo = function (type, message) {
        var info = new ChatInfo();
        info.roleId = UserManager.userInfo.roleId;
        info.type = type;
        info.message = message;
        info.name = UserManager.userInfo.name;
        return info;
    };
    ChatManager.marqueeMessageOper = function () {
        if (!ChatManager.isOnMessage) {
            if (ChatManager._marqueeList.length > 0) {
                var chatInfo = ChatManager._marqueeList.shift();
                if (chatInfo.type == ChatMessageType.Maquee) {
                    UIManager.showPanel(UIModuleName.MarqueePanel, chatInfo.message);
                }
                qin.PoolUtil.PutObject(chatInfo);
            }
        }
    };
    ChatManager.nextMarqueeMessage = function () {
        ChatManager.isOnMessage = false;
        ChatManager.marqueeMessageOper();
    };
    ChatManager.CheckToClearAudioData = function (info) {
        if (info.message.indexOf(ChatSpecialStrings.AudioRecordMessage) == 0) {
            var content = info.message.substring(ChatSpecialStrings.AudioRecordMessage.length);
            var splits = content.split(qin.StringConstants.Comma);
            if (splits.length == 4) {
                RecordAudioManager.removeAuidoData(info);
            }
        }
    };
    ChatManager.MessageMax = 50;
    ChatManager.EmojiMax = 24;
    //
    ChatManager.chatList = new Array();
    ChatManager.marqueeHandler = new MarqueeHandler();
    //
    ChatManager._marqueeList = new Array();
    ChatManager._audioAutoPlayList = new Array(); //自动播放音频列表
    //-------------------------------------------------------
    // 聊天消息推送
    //-------------------------------------------------------
    ChatManager.onNewMessageCome = new qin.DelegateDispatcher();
    ChatManager.OnMessageSend = new qin.DelegateDispatcher();
    /**
     * 聊天红点显示更新广播
    */
    ChatManager.onRefreshChatRedPointEvent = new qin.DelegateDispatcher();
    return ChatManager;
}());
__reflect(ChatManager.prototype, "ChatManager");
/**
 * 聊天信息
 */
var ChatInfo = (function (_super) {
    __extends(ChatInfo, _super);
    function ChatInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ChatInfo.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (value) {
            this._message = value;
            this.ParseMessageParams();
        },
        enumerable: true,
        configurable: true
    });
    ChatInfo.prototype.reset = function () {
        this.roleId = undefined;
        this.message = undefined;
        this.type = undefined;
        this.subType = undefined;
        this.isPlay = false;
    };
    /**
     * 解析聊天参数
     */
    ChatInfo.prototype.ParseMessageParams = function () {
        if (this.subType == ChatSubType.Horn) {
            return;
        }
        this.subType = ChatSubType.Normal;
        if (this.message && this.message.indexOf(ChatSpecialStrings.AudioRecordMessage) == 0) {
            var content = this.message.substring(ChatSpecialStrings.AudioRecordMessage.length);
            var splits = content.split(qin.StringConstants.Comma);
            if (splits.length == 4) {
                this.param = splits;
                this.subType = ChatSubType.AudioRecordMessage;
            }
        }
        else if (this.message && this.message.indexOf(ChatSpecialStrings.Emoji) == 0) {
            var content = this.message.substring(ChatSpecialStrings.Emoji.length);
            var splits = content.split(qin.StringConstants.Comma);
            if (splits.length == 1) {
                this.param = splits;
                this.subType = ChatSubType.Emoji;
            }
        }
    };
    return ChatInfo;
}(BaseServerValueInfo));
__reflect(ChatInfo.prototype, "ChatInfo", ["qin.IPoolObject", "Object"]);
//# sourceMappingURL=ChatManager.js.map