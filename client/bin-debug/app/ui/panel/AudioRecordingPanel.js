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
 * 正在录音面板
 */
var AudioRecordingPanel = (function (_super) {
    __extends(AudioRecordingPanel, _super);
    function AudioRecordingPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.AudioRecordingPanel);
        return _this;
    }
    AudioRecordingPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    AudioRecordingPanel.prototype.ShowValue = function () {
        this.play.play();
    };
    AudioRecordingPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.setCancel(false);
    };
    AudioRecordingPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.ShowValue();
        UIManager.addEventListener(UIModuleName.AudioRecordingPanel, UIModuleEvent.CHANGE, this.onCancel, this);
    };
    AudioRecordingPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.play.pause();
        RecordAudioManager.ClearData();
        UIManager.removeEventListener(UIModuleName.AudioRecordingPanel, UIModuleEvent.CHANGE, this.onCancel, this);
    };
    AudioRecordingPanel.prototype.onCancel = function () {
        this.setCancel(true);
    };
    AudioRecordingPanel.prototype.setCancel = function (isCancel) {
        this.cancelGroup.visible = isCancel;
        this.recordGroup.visible = !isCancel;
    };
    return AudioRecordingPanel;
}(BasePanel));
__reflect(AudioRecordingPanel.prototype, "AudioRecordingPanel");
//# sourceMappingURL=AudioRecordingPanel.js.map