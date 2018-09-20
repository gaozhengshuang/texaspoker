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
 * 锦标赛报名成功面板
 */
var JoinChampionshipSuccessPanel = (function (_super) {
    __extends(JoinChampionshipSuccessPanel, _super);
    function JoinChampionshipSuccessPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.JoinChampionshipSuccessPanel);
        return _this;
    }
    JoinChampionshipSuccessPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
    };
    JoinChampionshipSuccessPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    JoinChampionshipSuccessPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.nameLabel.text = this.panelData.name;
        var date = new Date(this.panelData.time * 1000);
        if (this.panelData.time - TimeManager.GetServerUtcTimestamp() > 3600 * 24) {
            this.timeLabel.text = (date.getMonth() + 1) + "-" + date.getDate() + +qin.DateTimeUtil.formatDate(date, qin.DateTimeUtil.Format_Standard_NoSecond).split(" ")[1];
        }
        else {
            this.timeLabel.text = "今日" + qin.DateTimeUtil.formatDate(date, qin.DateTimeUtil.Format_Standard_NoSecond).split(" ")[1];
        }
        this.numLabel.text = this.panelData.applyNum + "/" + this.panelData.bNum;
        this.chipLabel.text = this.panelData.chip;
    };
    JoinChampionshipSuccessPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
    };
    JoinChampionshipSuccessPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
    };
    /**
     * 关闭面板
    */
    JoinChampionshipSuccessPanel.prototype.closePanel = function (event) {
        SoundManager.playButtonEffect(event.target);
        UIManager.closePanel(UIModuleName.JoinChampionshipSuccessPanel);
    };
    return JoinChampionshipSuccessPanel;
}(BasePanel));
__reflect(JoinChampionshipSuccessPanel.prototype, "JoinChampionshipSuccessPanel");
//# sourceMappingURL=JoinChampionshipSuccessPanel.js.map