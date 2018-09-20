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
 * 坐满即玩结束面板
 */
var SitAndPlayOverPanel = (function (_super) {
    __extends(SitAndPlayOverPanel, _super);
    function SitAndPlayOverPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.SitAndPlayOverPanel);
        return _this;
    }
    SitAndPlayOverPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    SitAndPlayOverPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.setInfo();
    };
    SitAndPlayOverPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.backHallBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backHallBtnClick, this);
        this.backHallBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backHallBtnClick, this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.againBtnClick, this);
        this.againBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.againBtnClick, this);
        this.stayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stayBtnClick, this);
        GamblingManager.LeaveRoomEvent.addListener(this.switchScene, this);
        GamblingManager.LeaveRoomErrorEvent.addListener(this.switchScene, this);
    };
    SitAndPlayOverPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.backHallBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backHallBtnClick, this);
        this.backHallBtn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backHallBtnClick, this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.againBtnClick, this);
        this.againBtn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.againBtnClick, this);
        this.stayBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stayBtnClick, this);
        GamblingManager.LeaveRoomEvent.removeListener(this.switchScene, this);
        GamblingManager.LeaveRoomErrorEvent.removeListener(this.switchScene, this);
    };
    /**
     * 设置数据
    */
    SitAndPlayOverPanel.prototype.setInfo = function () {
        if (this.panelData.rank == 1 || this.panelData.rank == 2) {
            this.winBtnGroup.visible = true;
            this.lostBtnGroup.visible = false;
            if (this.panelData.rank == 1) {
                this.winRankShow();
            }
            else {
                this.lostRankShow();
                this.setRankImg();
            }
        }
        else {
            this.lostRankShow();
            this.winBtnGroup.visible = false;
            this.lostBtnGroup.visible = true;
            this.setRankImg();
        }
        var championshipPrizeList = ChampionshipManager.getAwardList(this.panelData.id);
        if (championshipPrizeList) {
            for (var _i = 0, championshipPrizeList_1 = championshipPrizeList; _i < championshipPrizeList_1.length; _i++) {
                var championshipPrize = championshipPrizeList_1[_i];
                if (this.panelData.rank <= championshipPrizeList.length && this.panelData.rank == championshipPrize.start) {
                    this.hasAwardShow();
                    var num = AwardDefined.GetInstance().getAwardNumByAwardId(championshipPrize.awardId);
                    if (num) {
                        this.goldNumLabel.text = qin.MathUtil.formatNum(num);
                    }
                    break;
                }
                else {
                    this.noAwardShow();
                }
            }
        }
    };
    /**
     * 冠军时排行显示
    */
    SitAndPlayOverPanel.prototype.winRankShow = function () {
        this.winRankGroup.visible = true;
        this.lostRankGroup.visible = false;
    };
    /**
     * 非冠军时排行显示
    */
    SitAndPlayOverPanel.prototype.lostRankShow = function () {
        this.winRankGroup.visible = false;
        this.lostRankGroup.visible = true;
    };
    /**
     * 有奖励时显示
    */
    SitAndPlayOverPanel.prototype.hasAwardShow = function () {
        this.hasAwardGroup.visible = true;
        this.noAwardDesLabel.visible = false;
    };
    /**
     * 无奖励时显示
    */
    SitAndPlayOverPanel.prototype.noAwardShow = function () {
        this.hasAwardGroup.visible = false;
        this.noAwardDesLabel.visible = true;
    };
    /**
     * 初始化排名图片
    */
    SitAndPlayOverPanel.prototype.initRankImg = function () {
        for (var i = 0; i < 4; i++) {
            this["rankImg" + i].source = "";
        }
    };
    /**
     * 写入排名图片
    */
    SitAndPlayOverPanel.prototype.setRankImg = function () {
        this.initRankImg();
        var str = this.panelData.rank.toString();
        if (str.length <= 4) {
            for (var i = 0; i < str.length; i++) {
                this["rankImg" + i].source = ResPrefixName.SNGRankImage + str[i] + ResSuffixName.PNG;
            }
        }
    };
    /**
     * 返回大厅按钮触发事件
    */
    SitAndPlayOverPanel.prototype.backHallBtnClick = function (event) {
        GamblingManager.reqLeaveRoom(true);
        this._isToHall = true;
    };
    /**
     * 再来一局按钮触发事件
    */
    SitAndPlayOverPanel.prototype.againBtnClick = function (event) {
        GamblingManager.reqLeaveRoom(true);
        this._isToHall = false;
    };
    /**
     * 留下观看按钮点击事件
    */
    SitAndPlayOverPanel.prototype.stayBtnClick = function (event) {
        GamblingManager.championshipHandler.startRoomDisbandListener();
        _super.prototype.onCloseBtnClickHandler.call(this, event);
    };
    /**
     * 发送离开请求后切换场景
    */
    SitAndPlayOverPanel.prototype.switchScene = function () {
        if (this._isToHall) {
            SceneManager.switcScene(SceneType.Hall, { action: SceneSwitchAction.RepleacePanel, panel: UIModuleName.GameHallPanel });
        }
        else {
            SceneManager.switcScene(SceneType.Hall, { action: SceneSwitchAction.RepleacePanel, panel: UIModuleName.ChampionshipPanel, params: { isToSNG: true } });
        }
        _super.prototype.onCloseBtnClickHandler.call(this, null);
    };
    return SitAndPlayOverPanel;
}(BasePanel));
__reflect(SitAndPlayOverPanel.prototype, "SitAndPlayOverPanel");
//# sourceMappingURL=SitAndPlayOverPanel.js.map