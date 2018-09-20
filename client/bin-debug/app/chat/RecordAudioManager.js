var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/// <summary>
/// 录音功能
/// </summary>
var RecordAudioManager = (function () {
    function RecordAudioManager() {
    }
    /**
     * 录音结束
     */
    RecordAudioManager.RecordComplete = function (message) {
        var data = JSON.parse(message);
        if (data) {
            var dataStr = data["data"];
            RecordAudioManager._armData = dataStr;
            RecordAudioManager._armTime = parseFloat(data["time"]); //放到显示的时候进行精确
            RecordAudioManager._armGuid = data["guid"];
            if (RecordAudioManager._armTime < 0.5) {
                RecordAudioManager.ClearData();
                AlertManager.showAlert("录音时间太短，请重试");
                return;
            }
            RecordAudioManager.OnRecordVoiceComplete.dispatch([RecordAudioManager._armTime, RecordAudioManager._armGuid]);
            if (qin.StringUtil.isNullOrEmpty(RecordAudioManager._updateSign)) {
                //重新请求sign
                RecordAudioManager.RequestUpdateSign();
            }
            else {
                RecordAudioManager.UploadAmrRecordData();
            }
        }
    };
    /**
     * 上传amr数据
     */
    RecordAudioManager.UploadAmrRecordData = function () {
        var url = ProjectDefined.GetInstance().getVoiceUpLoadUrl();
        var guid = RecordAudioManager._armGuid;
        var path = RecordAudioManager._updatePath;
        var armTime = RecordAudioManager._armTime;
        var callBack = function (data) {
            ChatManager.SendAudioRecordMessage(ChatMessageType.InRoom, armTime, guid, data.sign, path);
            RecordAudioManager.OnUploadRecordVoiceComplete.dispatch([armTime, guid, data.sign, path]);
        };
        UpLoader.UpLoad(url, RecordAudioManager._updateSign, RecordAudioManager._armData, true, callBack, RecordAudioManager.OnUpdateError);
        //清理数据
        RecordAudioManager.ClearData();
    };
    /**
     * 是否仍然在继续处理上一条消息
     */
    RecordAudioManager.IsStillHandling = function () {
        return !qin.StringUtil.isNullOrEmpty(RecordAudioManager._armGuid);
    };
    /**
     * 上传失败也清理
     */
    RecordAudioManager.OnUpdateError = function (obj) {
        RecordAudioManager.ClearData();
    };
    RecordAudioManager.ClearData = function () {
        RecordAudioManager._armGuid = null;
        RecordAudioManager._updatePath = null;
        RecordAudioManager._armTime = 0;
        RecordAudioManager._updateSign = null;
        RecordAudioManager._armData = null;
    };
    /**
     * 下载amr数据
     */
    RecordAudioManager.DownloadAmrData = function (path, guid, time) {
        var url = ProjectDefined.GetInstance().getStorageHost();
        url += path;
        RecordAudioManager.isDownloading = true;
        var tmpGuid = guid;
        RES.getResByUrl(url, function (data) {
            RecordAudioManager.isDownloading = false;
            if (data) {
                var isPlayNow = !RecordAudioManager.isRecording;
                ChannelManager.setRecordData(tmpGuid, data, isPlayNow);
                if (isPlayNow) {
                    RecordAudioManager.PlayPauseAndResume(tmpGuid, time);
                }
            }
            else {
                RecordAudioManager.OnDownLoadError(tmpGuid);
            }
        }, this, RES.ResourceItem.TYPE_TEXT);
    };
    RecordAudioManager.OnDownLoadError = function (guid) {
        qin.Console.log("加载录音文件失败！:" + guid);
    };
    RecordAudioManager.DispatchPlayRecordComplete = function (guid) {
        RecordAudioManager.OnPlayRecordComplete.dispatch(guid);
    };
    RecordAudioManager.DispatchPreparePlay = function (guid) {
        RecordAudioManager.OnPrepearPlay.dispatch(guid);
    };
    /**
     * 开始录音或者暂停  0开始录音，1结束录音，2取消录音 AudioRecordActions类
     */
    RecordAudioManager.RecordVoice = function (code) {
        if (code == AudioRecordActions.StartRecord) {
            if (!qin.StringUtil.isNullOrEmpty(RecordAudioManager.playingGuid)) {
                ChannelManager.stopRecord(RecordAudioManager.playingGuid); //开始录音的时候停止播放正在播放的录音 
            }
            RecordAudioManager.RequestUpdateSign(); //开始录音的时候就请求签名
            RecordAudioManager.PauseMusicSetting();
            RecordAudioManager.isRecording = true;
        }
        else {
            RecordAudioManager.isRecording = false;
            RecordAudioManager.RestoreMusicSetting();
        }
    };
    /**
     * 取消当前的音乐播放
     */
    RecordAudioManager.PauseMusicSetting = function () {
        RecordAudioManager._tempSoundMusic = SoundManager.bgEnabled;
        RecordAudioManager._tempSoundEffect = SoundManager.effectEnabled;
        RecordAudioManager._isChangeSoundSetting = true;
        if (RecordAudioManager._tempSoundMusic) {
            SoundManager.bgEnabled = false;
        }
        if (RecordAudioManager._tempSoundEffect) {
            SoundManager.effectEnabled = false;
        }
    };
    /**
     * 恢复为默认设置
     */
    RecordAudioManager.RestoreMusicSetting = function () {
        if (RecordAudioManager._isChangeSoundSetting) {
            if (RecordAudioManager._tempSoundMusic) {
                SoundManager.bgEnabled = true;
            }
            if (RecordAudioManager._tempSoundEffect) {
                SoundManager.effectEnabled = true;
            }
            RecordAudioManager._isChangeSoundSetting = false;
        }
        egret.clearTimeout(RecordAudioManager._resumeTimer);
    };
    /**
     * 请求上传签名
     */
    RecordAudioManager.RequestUpdateSign = function () {
        SocketManager.ImplCall(Command.Chat_Record_Sgin_3018, null, RecordAudioManager.OnUpdateSignCallBack, null, this);
    };
    /**
     * 请求上传签名数据返回
     */
    RecordAudioManager.OnUpdateSignCallBack = function (obj) {
        if (obj.data != null) {
            RecordAudioManager._updateSign = obj.data["sign"];
            RecordAudioManager._updatePath = obj.data["path"];
            RecordAudioManager.CheckToUploadData();
        }
    };
    /**
     * 检测是否发送数据
     */
    RecordAudioManager.CheckToUploadData = function () {
        if (qin.StringUtil.isNullOrEmpty(RecordAudioManager._updateSign) == false && RecordAudioManager._armData != null) {
            RecordAudioManager.UploadAmrRecordData();
        }
    };
    /**
     * 播放录音
     */
    RecordAudioManager.PlayPauseAndResume = function (guid, time) {
        if (time != 0) {
            RecordAudioManager.PauseMusicSetting();
            RecordAudioManager.playingGuid = guid;
            RecordAudioManager.ResumeLater(time);
        }
        RecordAudioManager.DispatchPreparePlay(guid);
    };
    RecordAudioManager.ResumeLater = function (time) {
        egret.clearTimeout(RecordAudioManager._resumeTimer);
        RecordAudioManager._resumeTimer = egret.setTimeout(RecordAudioManager.playComplete, this, time * 1000 + 1000);
    };
    /**
     * 播放录音完毕
     */
    RecordAudioManager.playComplete = function () {
        egret.clearTimeout(RecordAudioManager._resumeTimer);
        var tempGuid = RecordAudioManager.playingGuid;
        RecordAudioManager.playingGuid = qin.StringConstants.Empty;
        RecordAudioManager.DispatchPlayRecordComplete(tempGuid);
        RecordAudioManager.RestoreMusicSetting();
    };
    /**
     * 移除缓存
     */
    RecordAudioManager.removeAuidoData = function (info) {
        var url = ProjectDefined.GetInstance().getStorageHost();
        url += info.param[3];
        RES.destroyRes(url);
    };
    /**
     * 录音结束
     */
    RecordAudioManager.OnRecordVoiceComplete = new qin.DelegateDispatcher();
    /**
     * 上传录音完毕
     */
    RecordAudioManager.OnUploadRecordVoiceComplete = new qin.DelegateDispatcher();
    /**
     * 播放录音完成事件
     */
    RecordAudioManager.OnPlayRecordComplete = new qin.DelegateDispatcher();
    /**
     * 准备播放事件
     */
    RecordAudioManager.OnPrepearPlay = new qin.DelegateDispatcher();
    RecordAudioManager._tempSoundMusic = false;
    RecordAudioManager._tempSoundEffect = false;
    RecordAudioManager._isChangeSoundSetting = false;
    /**
     * 正在播放的录音id
     */
    RecordAudioManager.playingGuid = qin.StringConstants.Empty;
    /**
     * 正在下载数据
     */
    RecordAudioManager.isDownloading = false;
    /**
     * 是否正在录音
     */
    RecordAudioManager.isRecording = false;
    return RecordAudioManager;
}());
__reflect(RecordAudioManager.prototype, "RecordAudioManager");
/**
 * 录音操作
 */
var AudioRecordActions;
(function (AudioRecordActions) {
    /**
     * 开始录音
     */
    AudioRecordActions[AudioRecordActions["StartRecord"] = 0] = "StartRecord";
    /**
     * 停止录音
     */
    AudioRecordActions[AudioRecordActions["StopRecord"] = 1] = "StopRecord";
    /**
     * 取消录音
     */
    AudioRecordActions[AudioRecordActions["CancelRecord"] = 2] = "CancelRecord";
})(AudioRecordActions || (AudioRecordActions = {}));
//# sourceMappingURL=RecordAudioManager.js.map