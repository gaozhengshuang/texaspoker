
/// <summary>
/// 录音功能
/// </summary>
class RecordAudioManager
{
	/**
	 * 录音结束
	 */
	public static OnRecordVoiceComplete: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 上传录音完毕
	 */
	public static OnUploadRecordVoiceComplete: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 播放录音完成事件
	 */
	public static OnPlayRecordComplete: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 准备播放事件
	 */
	public static OnPrepearPlay: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 用于上传的签名
	 */
	private static _updateSign: string;
	/**
	 * 用于语音的保存地址
	 */
	private static _updatePath: string;
	/**
	 * 用于记录的数据
	 */
	private static _armData: string;

	private static _armGuid: string;

	private static _armTime: number;

	private static _tempSoundMusic: boolean = false;
	private static _tempSoundEffect: boolean = false;
	private static _isChangeSoundSetting: boolean = false;


	/**
	 * 正在播放的录音id
	 */
	public static playingGuid: string = game.StringConstants.Empty;
	/**
	 * 正在下载数据
	 */
	public static isDownloading: boolean = false;
	/**
	 * 是否正在录音
	 */
	public static isRecording: boolean = false;

	/**
	 * 是否已经请求的权限
	 */
	public static hasRequestedAuth: boolean;

	/**
	 * 恢复时间限制
	 */
	private static _resumeTimer: number;

	/**
	 * 录音结束
	 */
	public static RecordComplete(message: string)
	{
		let data: any = JSON.parse(message);
		if (data)
		{
			let dataStr: string = data["data"];
			RecordAudioManager._armData = dataStr;
			RecordAudioManager._armTime = parseFloat(data["time"]);//放到显示的时候进行精确
			RecordAudioManager._armGuid = data["guid"];

			if (RecordAudioManager._armTime < 0.5)
			{
				RecordAudioManager.ClearData();
				AlertManager.showAlert("录音时间太短，请重试");
				return;
			}
			RecordAudioManager.OnRecordVoiceComplete.dispatch([RecordAudioManager._armTime, RecordAudioManager._armGuid]);
			if (game.StringUtil.isNullOrEmpty(RecordAudioManager._updateSign))
			{
				//重新请求sign
				RecordAudioManager.RequestUpdateSign();
			}
			else
			{
				RecordAudioManager.UploadAmrRecordData();
			}
		}
	}

	/**
	 * 上传amr数据
	 */
	private static UploadAmrRecordData()
	{
		let url: string = ProjectDefined.GetInstance().getVoiceUpLoadUrl();
		let guid: string = RecordAudioManager._armGuid;
		let path: string = RecordAudioManager._updatePath;
		let armTime: number = RecordAudioManager._armTime;

		let callBack: Function = function (data: UpLoadData)
		{
			ChatManager.SendAudioRecordMessage(ChatMessageType.InRoom, armTime, guid, data.sign, path);
			RecordAudioManager.OnUploadRecordVoiceComplete.dispatch([armTime, guid, data.sign, path]);
		};
		UpLoader.UpLoad(url, RecordAudioManager._updateSign, RecordAudioManager._armData, true, callBack, RecordAudioManager.OnUpdateError);
		//清理数据
		RecordAudioManager.ClearData();
	}
	/**
	 * 是否仍然在继续处理上一条消息
	 */
	public static IsStillHandling(): boolean
	{
		return !game.StringUtil.isNullOrEmpty(RecordAudioManager._armGuid);
	}
	/**
	 * 上传失败也清理
	 */
	private static OnUpdateError(obj: UpLoadData)
	{
		RecordAudioManager.ClearData();
	}

	public static ClearData()
	{
		RecordAudioManager._armGuid = null;
		RecordAudioManager._updatePath = null;
		RecordAudioManager._armTime = 0;
		RecordAudioManager._updateSign = null;
		RecordAudioManager._armData = null;
	}
	/**
	 * 下载amr数据
	 */
	public static DownloadAmrData(path: string, guid: string, time: number)
	{
		let url: string = ProjectDefined.GetInstance().getStorageHost();
		url += path;
		RecordAudioManager.isDownloading = true;
		let tmpGuid: string = guid;
		RES.getResByUrl(url, (data: string) =>
		{
			RecordAudioManager.isDownloading = false;
			if (data)
			{
				let isPlayNow: boolean = !RecordAudioManager.isRecording;
				ChannelManager.setRecordData(tmpGuid, data, isPlayNow);
				if (isPlayNow)
				{
					RecordAudioManager.PlayPauseAndResume(tmpGuid, time);
				}
			}
			else
			{
				RecordAudioManager.OnDownLoadError(tmpGuid);
			}
		}, this, RES.ResourceItem.TYPE_TEXT);
	}

	private static OnDownLoadError(guid: string)
	{
		game.Console.log("加载录音文件失败！:" + guid);
	}

	private static DispatchPlayRecordComplete(guid: string)
	{
		RecordAudioManager.OnPlayRecordComplete.dispatch(guid);
	}

	private static DispatchPreparePlay(guid: string)
	{
		RecordAudioManager.OnPrepearPlay.dispatch(guid);
	}
	/**
	 * 开始录音或者暂停  0开始录音，1结束录音，2取消录音 AudioRecordActions类
	 */
	public static RecordVoice(code: number) //ChatChannelInfo
	{
		if (code == AudioRecordActions.StartRecord)
		{
			if (!game.StringUtil.isNullOrEmpty(RecordAudioManager.playingGuid))
			{
				ChannelManager.stopRecord(RecordAudioManager.playingGuid); //开始录音的时候停止播放正在播放的录音 
			}
			RecordAudioManager.RequestUpdateSign();//开始录音的时候就请求签名
			RecordAudioManager.PauseMusicSetting();
			RecordAudioManager.isRecording = true;
		}
		else 
		{
			RecordAudioManager.isRecording = false;
			RecordAudioManager.RestoreMusicSetting();
		}
	}

	/**
	 * 取消当前的音乐播放
	 */
	public static PauseMusicSetting()
	{
		RecordAudioManager._tempSoundMusic = SoundManager.bgEnabled;
		RecordAudioManager._tempSoundEffect = SoundManager.effectEnabled;
		RecordAudioManager._isChangeSoundSetting = true;
		if (RecordAudioManager._tempSoundMusic) //暂停音乐
		{
			SoundManager.bgEnabled = false;
		}
		if (RecordAudioManager._tempSoundEffect)
		{
			SoundManager.effectEnabled = false;
		}
	}

	/**
	 * 恢复为默认设置
	 */
	public static RestoreMusicSetting()
	{
		if (RecordAudioManager._isChangeSoundSetting)
		{
			if (RecordAudioManager._tempSoundMusic)
			{
				SoundManager.bgEnabled = true;
			}
			if (RecordAudioManager._tempSoundEffect)
			{
				SoundManager.effectEnabled = true;
			}
			RecordAudioManager._isChangeSoundSetting = false;
		}
		egret.clearTimeout(RecordAudioManager._resumeTimer);
	}

	/**
	 * 请求上传签名
	 */
	private static RequestUpdateSign()
	{
		SocketManager.ImplCall(Command.Chat_Record_Sgin_3018, null, RecordAudioManager.OnUpdateSignCallBack, null, this);
	}
	/**
	 * 请求上传签名数据返回
	 */
	private static OnUpdateSignCallBack(obj: game.SpRpcResult)
	{
		if (obj.data != null)
		{
			RecordAudioManager._updateSign = obj.data["sign"];
			RecordAudioManager._updatePath = obj.data["path"];
			RecordAudioManager.CheckToUploadData();
		}
	}
	/**
	 * 检测是否发送数据
	 */
	private static CheckToUploadData()
	{
		if (game.StringUtil.isNullOrEmpty(RecordAudioManager._updateSign) == false && RecordAudioManager._armData != null)
		{
			RecordAudioManager.UploadAmrRecordData();
		}
	}
	/**
	 * 播放录音
	 */
	public static PlayPauseAndResume(guid: string, time: number)
	{
		if (time != 0)
		{
			RecordAudioManager.PauseMusicSetting();
			RecordAudioManager.playingGuid = guid;
			RecordAudioManager.ResumeLater(time);
		}
		RecordAudioManager.DispatchPreparePlay(guid);
	}
	private static ResumeLater(time: number)
	{
		egret.clearTimeout(RecordAudioManager._resumeTimer);
		RecordAudioManager._resumeTimer = egret.setTimeout(RecordAudioManager.playComplete, this, time * 1000 + 1000);
	}
	/**
	 * 播放录音完毕
	 */
	private static playComplete()
	{
		egret.clearTimeout(RecordAudioManager._resumeTimer);
		let tempGuid: string = RecordAudioManager.playingGuid;
		RecordAudioManager.playingGuid = game.StringConstants.Empty;
		RecordAudioManager.DispatchPlayRecordComplete(tempGuid);
		RecordAudioManager.RestoreMusicSetting();
	}
	/**
	 * 移除缓存
	 */
	public static removeAuidoData(info: ChatInfo)
	{
		let url: string = ProjectDefined.GetInstance().getStorageHost();
		url += info.param[3];
		RES.destroyRes(url);
	}
}
/**
 * 录音操作
 */
enum AudioRecordActions
{
	/**
	 * 开始录音
	 */
	StartRecord = 0,
	/**
	 * 停止录音
	 */
	StopRecord = 1,
	/**
	 * 取消录音
	 */
	CancelRecord = 2
} 
