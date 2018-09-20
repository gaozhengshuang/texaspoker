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
 * 加注面板
 */
var AddChipsPanel = (function (_super) {
    __extends(AddChipsPanel, _super);
    function AddChipsPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.AddChipsPanel);
        return _this;
    }
    AddChipsPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
        UIUtil.setCircleBorderButtonFilter(this.addChipsVs.thumb, 0xfce14c);
        this.addChipsVs.maximum = 100;
        this.addChipsVs.addChild(this.countGroup);
        this.countGroup.x = -125;
    };
    AddChipsPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        //设置存入滑动条进度
        // this.addChipsVs.value = appendData.minChips;
        var initV = appendData.minChips / appendData.maxChips * 100;
        if (initV > 100) {
            initV = 100;
        }
        //每次滚动最小刻度数
        this.addChipsVs.snapInterval = 100 / (appendData.maxChips / appendData.minChips);
        if (this.addChipsVs.snapInterval > 1) {
            this.addChipsVs.snapInterval = 1;
        }
        this.addChipsVs.minimum = this.addChipsVs.value = initV;
        this.addChipsHandle();
        if (appendData.guideValue != undefined) {
            this.isMaskClickClose = false;
            this.grayMask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClickHandler, this);
        }
        else {
            this.isMaskClickClose = true;
            this.grayMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClickHandler, this);
        }
    };
    AddChipsPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    AddChipsPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addChipsVs.addEventListener(egret.Event.CHANGE, this.addChipsHandle, this);
        this.addChipsVs.thumb.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.confirmAddChips, this);
        this.addChipsVs.thumb.addEventListener(egret.TouchEvent.TOUCH_END, this.confirmAddChips, this);
        GamblingManager.ActionOverEvent.addListener(this.actionOverHandler, this);
        qin.Tick.addFrameInvoke(this.update, this);
    };
    AddChipsPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.addChipsVs.removeEventListener(egret.Event.CHANGE, this.addChipsHandle, this);
        this.addChipsVs.thumb.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.confirmAddChips, this);
        this.addChipsVs.thumb.removeEventListener(egret.TouchEvent.TOUCH_END, this.confirmAddChips, this);
        GamblingManager.ActionOverEvent.removeListener(this.actionOverHandler, this);
        qin.Tick.removeFrameInvoke(this.update, this);
        this._isPosChanged = false;
    };
    /**
     * 加注变化
    */
    AddChipsPanel.prototype.addChipsHandle = function () {
        this._isPosChanged = true;
        var readChips = this.getRealChips();
        if (this.addChipsVs.maximum == this.addChipsVs.value && GamblingManager.self && readChips >= GamblingManager.self.bankRoll) {
            this.countLabel.text = "AllIn";
        }
        else {
            this.countLabel.text = qin.MathUtil.formatNum(readChips);
        }
        SoundManager.playEffect(MusicAction.bet_slider);
    };
    /**
     * 更新
     */
    AddChipsPanel.prototype.update = function () {
        if (this._isPosChanged) {
            this._isPosChanged = false;
            this.countGroup.y = this.addChipsVs.thumb.y;
        }
    };
    /**
     * 确定加注
    */
    AddChipsPanel.prototype.confirmAddChips = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._posX = event.stageX;
                this._posY = event.stageY;
                break;
            case egret.TouchEvent.TOUCH_END:
                if (event.stageX == this._posX && event.stageY == this._posY) {
                    var readChips = this.getRealChips();
                    if (this.panelData.guideValue == undefined && readChips > 0 && GamblingManager.self) {
                        if (GamblingManager.self.bankRoll + GamblingManager.self.num > readChips) {
                            GamblingManager.reqAction(PlayerState.Raise, readChips - this.panelData.value);
                        }
                        else {
                            GamblingManager.reqAction(PlayerState.AllIn, readChips - this.panelData.value);
                        }
                    }
                }
                break;
        }
    };
    AddChipsPanel.prototype.actionOverHandler = function () {
        this.onCloseBtnClickHandler(null);
    };
    AddChipsPanel.prototype.getRealChips = function () {
        var realChips = this.addChipsVs.value / 100 * this.panelData.maxChips;
        var bBlind = Math.floor(realChips / this.panelData.bBlind);
        var result = bBlind * this.panelData.bBlind;
        result = Math.max(result, this.panelData.minChips); //限制下限不超过最小
        result = Math.min(result, this.panelData.maxChips); //限制上限不超过最大
        if (this.addChipsVs.value == 100) {
            result = this.panelData.maxChips;
        }
        return result;
    };
    return AddChipsPanel;
}(BasePanel));
__reflect(AddChipsPanel.prototype, "AddChipsPanel");
//# sourceMappingURL=AddChipsPanel.js.map