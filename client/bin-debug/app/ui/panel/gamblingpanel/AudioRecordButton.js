var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 录音按钮
 */
var AudioRecordButton = (function () {
    function AudioRecordButton(btn, moveArea) {
        this._recordButton = btn;
        this._moveArea = moveArea;
    }
    AudioRecordButton.prototype.OnEnable = function () {
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
    };
    AudioRecordButton.prototype.OnDisable = function () {
        this._recordButton.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRecordBtnBegin, this);
        this._recordButton.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndRecording, this);
        this._recordButton.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndRecording, this);
        this._recordButton.removeEventListener(egret.TouchEvent.LEAVE_STAGE, this.onCancelRecording, this);
        GameManager.stage.removeEventListener(egret.Event.DEACTIVATE, this.onCancelRecording, this);
        this._moveArea.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        ChannelManager.OnApplicationFocus.removeListener(this.OnApplicationFocus, this);
        RecordAudioManager.RestoreMusicSetting();
    };
    AudioRecordButton.prototype.OnApplicationFocus = function (focusStatus) {
        if (focusStatus == false) {
            this.cancelOrStopRecording(true); //取消录音
        }
    };
    /**
     * 设置录音按钮显隐
     */
    AudioRecordButton.prototype.setRecordBtnShow = function (isShow) {
        this._recordButton.visible = isShow;
    };
    /**
     * 滑动
     */
    AudioRecordButton.prototype.onMove = function (event) {
        if (this._isRecordAudio) {
            if (event.stageY < this._recordButton.localToGlobal().y && !this._isCancel) {
                this._isCancel = true;
                UIManager.dispatchEvent(UIModuleName.AudioRecordingPanel, UIModuleEvent.CHANGE);
            }
        }
    };
    /**
     * 开始录音
     */
    AudioRecordButton.prototype.onRecordBtnBegin = function (event) {
        if (!ChannelManager.hasMicrophone) {
            UIManager.showFloatTips("未检测到麦克风设备或没有使用麦克风权限！");
            return;
        }
        if (RecordAudioManager.IsStillHandling()) {
            UIManager.showFloatTips("上一条音频数据上传中");
            return;
        }
        if (this._moveArea.moveTouchEnd(event)) {
            return;
        }
        if (GamblingManager.isInSeat) {
            SoundManager.playEffect(MusicAction.buttonClick);
            this._isCancel = false;
            this._isRecordAudio = true;
            ChannelManager.recordAudio(AudioRecordActions.StartRecord);
            this.StopRecordLater();
            UIManager.showPanel(UIModuleName.AudioRecordingPanel);
        }
        else {
            AlertManager.showAlert("只有入座后才可发送语音!");
            this._isCancel = false;
            this._isRecordAudio = false;
        }
    };
    AudioRecordButton.prototype.StopRecordLater = function () {
        egret.clearTimeout(this._recordTimer);
        this._recordTimer = egret.setTimeout(this.cancelOrStopRecording, this, ProjectDefined.GetInstance().getValue(ProjectDefined.chatMaxRecordTime), false);
    };
    /**
     * 录音结束的操作
     */
    AudioRecordButton.prototype.onEndRecording = function (event) {
        this.cancelOrStopRecording(this._isCancel);
    };
    /**
     * 取消录音
     */
    AudioRecordButton.prototype.onCancelRecording = function (event) {
        this.cancelOrStopRecording(true);
    };
    /**
    * 取消/停止录音
    */
    AudioRecordButton.prototype.cancelOrStopRecording = function (isCanel) {
        egret.clearTimeout(this._recordTimer);
        if (this._isRecordAudio) {
            this._isRecordAudio = false;
            UIManager.closePanel(UIModuleName.AudioRecordingPanel);
            if (isCanel) {
                ChannelManager.recordAudio(AudioRecordActions.CancelRecord);
                qin.Console.log("取消录音");
            }
            else {
                SoundManager.playEffect(MusicAction.buttonClick);
                ChannelManager.recordAudio(AudioRecordActions.StopRecord);
                qin.Console.log("停止录音");
            }
        }
    };
    AudioRecordButton.prototype.SetGray = function (value) {
        if (value) {
            // qin.FilterUtil.setGray(this._recordButton);
        }
        else {
            // qin.FilterUtil.setDefault(this._recordButton);
        }
        this._recordButton.touchEnabled = !value;
    };
    return AudioRecordButton;
}());
__reflect(AudioRecordButton.prototype, "AudioRecordButton");
//# sourceMappingURL=AudioRecordButton.js.map