/**
 * 录音按钮
 */
class AudioRecordButton
{
	/**
	 * 记录按钮
	 */
	private _recordButton: eui.Button;
	/**
	 * 滑动区域
	 */
	private _moveArea: any;

	// /**
	//  * 是否正在录音
	//  */
	// private _isRecording: boolean = false;

	// private _isOnRecord: boolean = false;
	// private _isPress: boolean = false;
	private _recordTimer: number;
	/**
	 * 是否取消录音
	 */
	private _isCancel: boolean;
	/**
	 * 是否开始录音
	 */
	private _isRecordAudio: boolean;

	constructor(btn: eui.Button, moveArea: any)
	{
		this._recordButton = btn;
		this._moveArea = moveArea;
	}

	public OnEnable()
	{
		//开始录音
		this._recordButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRecordBtnBegin, this);
		//结束录音
		this._recordButton.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndRecording, this);
		this._recordButton.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndRecording, this);
		/**
		 * 刷新状态
		 */
		this._moveArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);

		this._recordButton.addEventListener(egret.TouchEvent.LEAVE_STAGE, this.onCancelRecording, this);
		GameManager.stage.addEventListener(egret.Event.DEACTIVATE, this.onCancelRecording, this);
		ChannelManager.OnApplicationFocus.addListener(this.OnApplicationFocus, this);

	}
	public OnDisable()
	{
		this._recordButton.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRecordBtnBegin, this);
		this._recordButton.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndRecording, this);
		this._recordButton.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndRecording, this);
		this._recordButton.removeEventListener(egret.TouchEvent.LEAVE_STAGE, this.onCancelRecording, this);
		GameManager.stage.removeEventListener(egret.Event.DEACTIVATE, this.onCancelRecording, this);
		this._moveArea.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
		ChannelManager.OnApplicationFocus.removeListener(this.OnApplicationFocus, this);
		RecordAudioManager.RestoreMusicSetting();
	}
	private OnApplicationFocus(focusStatus: boolean)
	{
		if (focusStatus == false)//失去焦点比如授权界面弹出需要停止录音
		{
			this.cancelOrStopRecording(true); //取消录音
		}
	}
	/**
	 * 设置录音按钮显隐
	 */
	public setRecordBtnShow(isShow: boolean)
	{
		this._recordButton.visible = isShow;
	}

	/**
	 * 滑动
	 */
	private onMove(event: egret.TouchEvent)
	{
		if (this._isRecordAudio)
		{
			if (event.stageY < this._recordButton.localToGlobal().y && !this._isCancel)
			{
				this._isCancel = true;
				UIManager.dispatchEvent(UIModuleName.AudioRecordingPanel, UIModuleEvent.CHANGE);
			}
		}
	}
	/**
	 * 开始录音
	 */
	private onRecordBtnBegin(event: egret.TouchEvent)
	{
		if (!ChannelManager.hasMicrophone)
		{
			UIManager.showFloatTips("未检测到麦克风设备或没有使用麦克风权限！");
			return;
		}
		if (RecordAudioManager.IsStillHandling())
		{
			UIManager.showFloatTips("上一条音频数据上传中");
			return;
		}
		if (this._moveArea.moveTouchEnd(event))
		{
			return;
		}
		if (GamblingManager.isInSeat)
		{
			SoundManager.playEffect(MusicAction.buttonClick);
			this._isCancel = false;
			this._isRecordAudio = true;
			ChannelManager.recordAudio(AudioRecordActions.StartRecord);
			this.StopRecordLater();
			UIManager.showPanel(UIModuleName.AudioRecordingPanel);
		}
		else
		{
			AlertManager.showAlert("只有入座后才可发送语音!");
			this._isCancel = false;
			this._isRecordAudio = false;
		}
	}
	private StopRecordLater()
	{
		egret.clearTimeout(this._recordTimer);
		this._recordTimer = egret.setTimeout(this.cancelOrStopRecording, this, ProjectDefined.GetInstance().getValue(ProjectDefined.chatMaxRecordTime), false);
	}
	/**
	 * 录音结束的操作
	 */
	private onEndRecording(event: egret.TouchEvent)
	{
		this.cancelOrStopRecording(this._isCancel);
	}
	/**
	 * 取消录音
	 */
	private onCancelRecording(event: egret.TouchEvent)
	{
		this.cancelOrStopRecording(true);
	}
	/**
 	* 取消/停止录音
 	*/
	private cancelOrStopRecording(isCanel: boolean)
	{
		egret.clearTimeout(this._recordTimer);
		if (this._isRecordAudio)
		{
			this._isRecordAudio = false;
			UIManager.closePanel(UIModuleName.AudioRecordingPanel);
			if (isCanel)
			{
				ChannelManager.recordAudio(AudioRecordActions.CancelRecord);
				qin.Console.log("取消录音")
			}
			else
			{
				SoundManager.playEffect(MusicAction.buttonClick);
				ChannelManager.recordAudio(AudioRecordActions.StopRecord);
				qin.Console.log("停止录音");
			}

		}
	}
	public SetGray(value: boolean)
	{
		if (value)
		{
			// qin.FilterUtil.setGray(this._recordButton);
		}
		else
		{
			// qin.FilterUtil.setDefault(this._recordButton);
		}
		this._recordButton.touchEnabled = !value;
	}
}
