/**
 * 聊天管理
 */
class ChatManager
{
	private static readonly MessageMax: number = 50;
	private static readonly EmojiMax: number = 24;
	//
	public static chatList: Array<ChatInfo> = new Array<ChatInfo>();
	private static _emojiList: Array<Emoji>;
	/**
	 * 表情列表
	 */
	public static get emojiList(): Array<Emoji>
	{
		return ChatManager._emojiList;
	}
	public static isOnMessage: boolean;
	public static marqueeHandler: MarqueeHandler = new MarqueeHandler();
	public static isHaveNewChatMsg: boolean;
	//
	private static _marqueeList: Array<ChatInfo> = new Array<ChatInfo>();
	private static _audioAutoPlayList: Array<ChatInfo> = new Array<ChatInfo>();//自动播放音频列表

	public static initialzie()
	{
		if (!ChatManager.emojiList)
        {
            ChatManager._emojiList = new Array<Emoji>();
			for (let i = 1; i <= ChatManager.EmojiMax; i++)
            {
                ChatManager._emojiList[i - 1] = new Emoji();
                ChatManager._emojiList[i - 1].id = i;
                ChatManager._emojiList[i - 1].source = i + ResSuffixName.PNG;
            }
        }
		game.ArrayUtil.Clear(ChatManager._marqueeList);
		game.ArrayUtil.Clear(ChatManager.chatList);
		ChatManager.isHaveNewChatMsg = false;
		RecordAudioManager.OnPlayRecordComplete.addListener(ChatManager.CheckAndPlayAudioAutoList, this);
		SocketManager.AddCommandListener(Command.Chat_PushMessage_2014, ChatManager.pushChatMessage, this);
		HundredWarManager.onLeaveEvent.addListener(ChatManager.clear, this);
		HundredWarManager.OnGetRoomInfoEvent.addListener(ChatManager.clearNewMsg, this);
		GamblingManager.LeaveRoomEvent.addListener(ChatManager.clear, this);
		GamblingManager.OnPushLeaveRoomEvent.addListener(ChatManager.clear, this);
		GamblingManager.OnGetRoomInfoEvent.addListener(ChatManager.clearNewMsg, this);
	}
	private static clear()
	{
		game.ArrayUtil.Clear(ChatManager.chatList);
	}
	public static clearNewMsg()
	{
		ChatManager.isHaveNewChatMsg = false;
		ChatManager.onRefreshChatRedPointEvent.dispatch();
	}
	private static pushChatMessage(result: game.SpRpcResult)
	{
		if (result.data)
		{
			let chatInfo: ChatInfo = game.PoolUtil.GetObject<ChatInfo>(ChatInfo);
			let inRoomChatInfo: ChatInfo = new ChatInfo();
			chatInfo.roleId = result.data["roleId"];
			chatInfo.type = result.data["type"];
			if (chatInfo.type == ChatMessageType.Maquee)
			{
				chatInfo.message = ChatManager.marqueeHandler.getMsgByType(result.data["message"], result.data["name"]);
				ChatManager.marqueeHandler.setMsgSendUserName(chatInfo, result.data["message"], result.data["name"]);
				inRoomChatInfo.copyValueFrom(chatInfo);
				if (ChatManager.marqueeHandler.isShowMarqueeMsg(result.data["message"]))
				{
					ChatManager._marqueeList.push(chatInfo);
				}
				ChatManager.chatList.push(inRoomChatInfo);
				ChatManager.marqueeMessageOper();
			}
			else if (chatInfo.type == ChatMessageType.InRoom)
			{
				chatInfo.message = result.data["message"];
				chatInfo.name = result.data["name"];
				ChatManager.AddChatInfo(chatInfo);
			}
			if (!UIManager.isShowPanel(UIModuleName.ChatPanel) && chatInfo.type == ChatMessageType.InRoom
				&& chatInfo.roleId != UserManager.userInfo.roleId && chatInfo.subType && chatInfo.subType != ChatSubType.Emoji)
			{
				ChatManager.isHaveNewChatMsg = true;
				ChatManager.onRefreshChatRedPointEvent.dispatch();
			}
			ChatManager.onNewMessageCome.dispatch(chatInfo);
		}
	}
	/**
	 * 发送语音消息
	 */
	public static SendAudioRecordMessage(type: ChatMessageType, time: number, guid: string, sign: string, path: string)
	{
		ChatManager.SendChatMessage(ChatSpecialStrings.AudioRecordMessage + time + game.StringConstants.Comma + guid + game.StringConstants.Comma + sign + game.StringConstants.Comma + path, type);
	}
	/**
	 * 发送聊天消息
	 */
	public static SendChatMessage(message: string, type: ChatMessageType)
	{
		let callback: Function = function (result: game.SpRpcResult)
		{
			ChatManager.OnMessageSend.dispatch();
			SoundManager.playEffect(MusicAction.sentMessage);
		};
		SocketManager.call(Command.Chat_SendMessage_3019, { "message": message, "type": type }, callback, null, this);
	}

	public static AddChatInfo(info: ChatInfo)
	{
		if (info.subType != ChatSubType.Emoji) //表情不添加到聊天面板中显示
		{
			ChatManager.chatList.push(info);
		}
		if (ChatManager.chatList.length > ChatManager.MessageMax)
		{
			let firstInfo: ChatInfo = ChatManager.chatList[0];
			ChatManager.CheckToClearAudioData(firstInfo);
			game.ArrayUtil.RemoveItem(firstInfo, ChatManager.chatList);
		}
		ChatManager.HandleChatInfo(info);
	}
	private static HandleChatInfo(info: ChatInfo)
	{
		if (info.subType == ChatSubType.AudioRecordMessage && GameSetting.autoVoiceEnabled)
		{
			ChatManager._audioAutoPlayList.push(info);
			ChatManager.CheckAndPlayAudioAutoList();
		}
	}
	private static CheckAndPlayAudioAutoList()
	{
		if (game.StringUtil.isNullOrEmpty(RecordAudioManager.playingGuid) && !RecordAudioManager.isDownloading && GameSetting.autoVoiceEnabled)
		{
			if (ChatManager._audioAutoPlayList.length > 0)
			{
				ChatManager.CheckAndPlay(ChatManager._audioAutoPlayList.shift());
			}
		}
	}
	/**
 	* 检测播放列表
 	*/
	public static CheckAndPlay(info: ChatInfo)
	{
		if (info.subType == ChatSubType.AudioRecordMessage)
		{
			let guid: string = info.param[1];
			ChannelManager.hasRecordData(guid);
		}
	}
	/**
	 * 原生检测完毕调回来
	 */
	public static checkComplete(message: string)
	{
		let data: any = JSON.parse(message);
		if (data)
		{
			let guid: string = data["guid"];
			let result: boolean = game.StringUtil.toBoolean(data["has"]);
			let info: ChatInfo;
			for (info of ChatManager.chatList)
			{
				if (info.subType == ChatSubType.AudioRecordMessage && info.param[1] == guid)
				{
					break;
				}
			}
			if (info)
			{
				let path: string = info.param[3];
				let time: number = parseFloat(info.param[0]);
				if (result)
				{
					if (RecordAudioManager.playingGuid == guid)//正在播放
					{
						ChannelManager.stopRecord(guid);
					}
					else
					{
						if (RecordAudioManager.isRecording == false)
						{
							ChannelManager.playRecord(guid);
							RecordAudioManager.PlayPauseAndResume(guid, time);
						}
					}
				}
				else
				{
					RecordAudioManager.DownloadAmrData(path, guid, time);
				}
			}
		}
	}
	/**
 	* 清空自动播放的音频列表
 	*/
	public static ClearAudioAutoPlayList()
	{
		ChatManager._audioAutoPlayList.length = 0;
	}
	private static CreateChatInfoByMyInfo(type: ChatMessageType, message: string): ChatInfo
	{
		let info: ChatInfo = new ChatInfo();
		info.roleId = UserManager.userInfo.roleId;
		info.type = type;
		info.message = message;
		info.name = UserManager.userInfo.name;
		return info;
	}
	private static marqueeMessageOper()
	{
		if (!ChatManager.isOnMessage)
		{
			if (ChatManager._marqueeList.length > 0)
			{
				let chatInfo: ChatInfo = ChatManager._marqueeList.shift();
				if (chatInfo.type == ChatMessageType.Maquee)
				{
					UIManager.showPanel(UIModuleName.MarqueePanel, chatInfo.message);
				}
				game.PoolUtil.PutObject<ChatInfo>(chatInfo);
			}
		}
	}
	public static nextMarqueeMessage()
	{
		ChatManager.isOnMessage = false;
		ChatManager.marqueeMessageOper();
	}
	private static CheckToClearAudioData(info: ChatInfo)
	{
		if (info.message.indexOf(ChatSpecialStrings.AudioRecordMessage) == 0)
		{
			let content: string = info.message.substring(ChatSpecialStrings.AudioRecordMessage.length);
			let splits: Array<string> = content.split(game.StringConstants.Comma);
			if (splits.length == 4)
			{
				RecordAudioManager.removeAuidoData(info);
			}
		}
	}
	//-------------------------------------------------------
	// 聊天消息推送
	//-------------------------------------------------------
	public static onNewMessageCome: game.DelegateDispatcher = new game.DelegateDispatcher();
	public static OnMessageSend: game.DelegateDispatcher = new game.DelegateDispatcher();

    /**
     * 聊天红点显示更新广播
    */
	public static onRefreshChatRedPointEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}
/**
 * 聊天信息
 */
class ChatInfo extends BaseServerValueInfo implements game.IPoolObject 
{
	/**
	 * 角色Id
	 */
	public roleId: number;
	/**
	 * 角色昵称
	*/
	public name: string;
	/**
	 * 消息
	 */
	private _message: string;
	public get message(): string
	{
		return this._message;
	}
	public set message(value: string)
	{
		this._message = value;
		this.ParseMessageParams();
	}
	/**
	 * 类型1.房间聊天2.跑马灯消息
	 */
	public type: ChatMessageType;
	public param: Array<string>;
	public reset()
	{
		this.roleId = undefined;
		this.message = undefined;
		this.type = undefined;
		this.subType = undefined;
		this.isPlay = false;
	}
	/**
	 * 解析聊天参数
	 */
	private ParseMessageParams()
	{
		if (this.subType == ChatSubType.Horn)
		{
			return;
		}
		this.subType = ChatSubType.Normal;
		if (this.message && this.message.indexOf(ChatSpecialStrings.AudioRecordMessage) == 0)
		{
			let content: string = this.message.substring(ChatSpecialStrings.AudioRecordMessage.length);
			let splits: Array<string> = content.split(game.StringConstants.Comma);
			if (splits.length == 4)//分别是time，guid,sign,path
			{
				this.param = splits;
				this.subType = ChatSubType.AudioRecordMessage;
			}
		}
		else if (this.message && this.message.indexOf(ChatSpecialStrings.Emoji) == 0)
		{
			let content: string = this.message.substring(ChatSpecialStrings.Emoji.length);
			let splits: Array<string> = content.split(game.StringConstants.Comma);
			if (splits.length == 1)
			{
				this.param = splits;
				this.subType = ChatSubType.Emoji;
			}
		}
	}
	public subType: ChatSubType;
	/**
	 * 是否播放
	 */
	public isPlay: boolean;
}
