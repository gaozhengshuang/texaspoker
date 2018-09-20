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
 * MTT结束面板
 */
var MTTOverPanel = (function (_super) {
    __extends(MTTOverPanel, _super);
    function MTTOverPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.MTTOverPanel);
        return _this;
    }
    MTTOverPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    MTTOverPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        if ((qin.System.isWeChat || qin.System.isMicro) && !VersionManager.isSafe) {
            this.shareBtn.visible = true;
            this.bottomGroup.addChildAt(this.shareBtn, 0);
        }
        else {
            this.shareBtn.visible = false;
            this.addChildAt(this.shareBtn, 0);
        }
        this.setInfo();
    };
    MTTOverPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmBtnClick, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareBtnClick, this);
        GamblingManager.LeaveRoomEvent.addListener(this.switchScene, this);
        GamblingManager.LeaveRoomErrorEvent.addListener(this.switchScene, this);
    };
    MTTOverPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmBtnClick, this);
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shareBtnClick, this);
        GamblingManager.LeaveRoomEvent.removeListener(this.switchScene, this);
        GamblingManager.LeaveRoomErrorEvent.removeListener(this.switchScene, this);
    };
    /**
     * 设置数据
    */
    MTTOverPanel.prototype.setInfo = function () {
        if (this.panelData.rank <= 3) {
            this.iconImg.source = SheetSubName.MTTOverGoldenCup;
        }
        else {
            this.iconImg.source = SheetSubName.MTTOverSilverCup;
        }
        if (this.panelData.rank == 1) {
            this.endRankLabel.text = "冠军";
        }
        else {
            this.endRankLabel.text = "第" + this.panelData.rank.toString() + "名";
        }
        var championshipPrizeList = ChampionshipManager.getAwardList(this.panelData.id);
        if (championshipPrizeList) {
            for (var _i = 0, championshipPrizeList_1 = championshipPrizeList; _i < championshipPrizeList_1.length; _i++) {
                var championshipPrize = championshipPrizeList_1[_i];
                if (this.panelData.rank <= championshipPrizeList.length && this.panelData.rank == championshipPrize.start) {
                    var str = "恭喜你获得了";
                    var des = AwardDefined.GetInstance().getAwardNameById(championshipPrize.awardId);
                    if (des) {
                        str = str + des + "奖励！";
                        this.awardDesLabel.text = str;
                    }
                    break;
                }
                else {
                    this.awardDesLabel.text = "您没有获得任何奖励";
                }
            }
        }
        this.allJoinNumLabel.text = this.panelData.join.toString();
        for (var _a = 0, _b = ChampionshipManager.processMTTList; _a < _b.length; _a++) {
            var matchInfo = _b[_a];
            if (matchInfo.recordId == this.panelData.recordId) {
                var num = Math.floor(TimeManager.GetServerUtcTimestamp()) - matchInfo.startTime;
                var min = Math.round(num / 60);
                this.processTimeLabel.text = min.toString();
                break;
            }
        }
        this.outNumLabel.text = (this.panelData.join - this.panelData.rank).toString();
        if (this.panelData.maxRank) {
            this.highestLabel.text = this.panelData.maxRank.toString();
        }
    };
    /**
 * 关闭按钮触发事件
    */
    MTTOverPanel.prototype.onCloseBtnClickHandler = function (event) {
        GamblingManager.reqLeaveRoom(true);
    };
    /**
     * 确定按钮触发事件
    */
    MTTOverPanel.prototype.confirmBtnClick = function (event) {
        GamblingManager.reqLeaveRoom(true);
    };
    /**
     * 发送离开请求后切换场景
    */
    MTTOverPanel.prototype.switchScene = function () {
        SceneManager.switcScene(SceneType.Hall, { action: SceneSwitchAction.RepleacePanel, panel: UIModuleName.GameHallPanel });
        _super.prototype.onCloseBtnClickHandler.call(this, null);
    };
    /**
     * 分享按钮触发事件
    */
    MTTOverPanel.prototype.shareBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (qin.System.isMicro && ChannelManager.hasWeixin == false) {
            AlertManager.showAlert("您未安装微信，分享失败。");
        }
        else {
            UIManager.showPanel(UIModuleName.ChooseShareWayPanel, { wxMsgTitle: ChannelManager.appName, wxTimeLineTitle: qin.StringUtil.format("我在{0}中获得了冠军。服吗？不服来战！", ChannelManager.appName), msg: qin.StringUtil.format("我在{0}中获得了冠军。服吗？不服来战！", ChannelManager.appName), isHasShareId: false });
        }
    };
    return MTTOverPanel;
}(BasePanel));
__reflect(MTTOverPanel.prototype, "MTTOverPanel");
//# sourceMappingURL=MTTOverPanel.js.map