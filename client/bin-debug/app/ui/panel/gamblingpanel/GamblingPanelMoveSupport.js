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
 * 牌局面板移动支持
 */
var GamblingPanelMoveSupport = (function (_super) {
    __extends(GamblingPanelMoveSupport, _super);
    function GamblingPanelMoveSupport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toNum = 265;
        _this._isMove = false;
        return _this;
    }
    GamblingPanelMoveSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this._isMove = false;
        if (!this._initMatrix) {
            this._initMatrix = this.target.gameGroup.matrix;
        }
        if (!this._moveHandler) {
            this._moveHandler = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.GamblingGameGroupMove);
            this._moveHandler.setTarget(this.target.gameGroup);
        }
        if (!this._marqueePanel) {
            this.getMarqueePanel();
        }
        this._lastStageX = -1;
        this._initMatrix.tx = 0;
        this.target.gameGroup.matrix = this._initMatrix;
    };
    GamblingPanelMoveSupport.prototype.move = function () {
        this._lastStageX = -1;
        if (this.target.gameGroup.x > 0) {
            this.toLeft();
        }
        else {
            this.toRight();
        }
    };
    GamblingPanelMoveSupport.prototype.onEnable = function () {
        this.target.optionsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.optionsTapHandler, this);
        this.target.dragGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.target.dragGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.target.dragGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.target.dragGroup.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.outSideRelease, this);
        if (!this._ignoreList) {
            this._ignoreList = new Array();
            this._ignoreList.push(this.target.audioRecordBtn);
        }
        for (var _i = 0, _a = this._ignoreList; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ignoreListBegin, this);
            obj.addEventListener(egret.TouchEvent.TOUCH_END, this.ignoreListEnd, this);
        }
        UIManager.onPanelOpenEvent.addListener(this.onMarqueePanelOpen, this);
    };
    GamblingPanelMoveSupport.prototype.onDisable = function () {
        this.target.optionsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.optionsTapHandler, this);
        this.target.dragGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.target.dragGroup.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.target.dragGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.target.dragGroup.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.outSideRelease, this);
        for (var _i = 0, _a = this._ignoreList; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ignoreListBegin, this);
            obj.removeEventListener(egret.TouchEvent.TOUCH_END, this.ignoreListEnd, this);
        }
        UIManager.onPanelOpenEvent.removeListener(this.onMarqueePanelOpen, this);
    };
    /**
     * 跑马灯面板打开
    */
    GamblingPanelMoveSupport.prototype.onMarqueePanelOpen = function (panelName) {
        if (panelName == UIModuleName.MarqueePanel && !this._marqueePanel) {
            this.getMarqueePanel();
        }
    };
    /**
     * 获得marquee面板
    */
    GamblingPanelMoveSupport.prototype.getMarqueePanel = function () {
        this._marqueePanel = UIManager.panelDict.getValue(UIModuleName.MarqueePanel);
    };
    GamblingPanelMoveSupport.prototype.onTouchEnd = function (e, outTouch) {
        this._stopMove = false;
        if (outTouch || e.target == this.target.dragGroup) {
            if (this._lastBeginStageX == e.stageX) {
                this.toLeft();
            }
            else {
                this.stop();
            }
        }
    };
    GamblingPanelMoveSupport.prototype.onTouchMove = function (e) {
        if (!this._stopMove && e.target == this.target.dragGroup) {
            // this.target.leftGroup.visible = true;
            var offsetX = 0;
            if (this._lastStageX != -1) {
                offsetX = e.stageX - this._lastStageX;
                this._lastStageX = e.stageX;
            }
            else {
                this._lastStageX = e.stageX;
            }
            this._initMatrix.tx += offsetX;
            if (this._initMatrix.tx > this.toNum) {
                this._initMatrix.tx = this.toNum;
            }
            if (this._initMatrix.tx < 0) {
                this._initMatrix.tx = 0;
                // this.target.leftGroup.visible = false;
            }
            this.target.gameGroup.matrix = this._initMatrix;
            this._isMove = true;
            if (this._marqueePanel) {
                this._marqueePanel.onMoveing(this._initMatrix.tx);
            }
        }
    };
    GamblingPanelMoveSupport.prototype.stop = function () {
        if (this._isMove) {
            this._isMove = false;
            if (this.target.gameGroup.x > this.toNum / 2) {
                this.toRight();
            }
            else {
                this.toLeft();
            }
        }
    };
    GamblingPanelMoveSupport.prototype.toRight = function (showAnimate) {
        if (showAnimate === void 0) { showAnimate = true; }
        this._initMatrix.tx = this.toNum;
        if (showAnimate) {
            this._moveHandler.run(this.toNum, null, null);
        }
        else {
            this.target.gameGroup.x = this.toNum;
        }
        if (this._marqueePanel) {
            this._marqueePanel.onMoveEnd({ num: this.toNum, showAnimate: showAnimate });
        }
        this.clearPosFlag();
    };
    GamblingPanelMoveSupport.prototype.toLeft = function () {
        this._initMatrix.tx = 0;
        if (this._marqueePanel) {
            this._marqueePanel.onMoveEnd({ num: 0, showAnimate: true });
        }
        // this.target.leftGroup.visible = true;
        this._moveHandler.run(0, this.moveFinish, this);
        this.clearPosFlag();
    };
    GamblingPanelMoveSupport.prototype.moveFinish = function () {
        // this.target.leftGroup.visible = false;
    };
    GamblingPanelMoveSupport.prototype.optionsTapHandler = function (event) {
        this.move();
    };
    GamblingPanelMoveSupport.prototype.onTouchBegin = function (event) {
        if (this.target.gameGroup.x > 0) {
            this._lastBeginStageX = event.stageX;
        }
    };
    GamblingPanelMoveSupport.prototype.outSideRelease = function (event) {
        this.stop();
    };
    GamblingPanelMoveSupport.prototype.clearPosFlag = function () {
        this._lastBeginStageX = -1;
        this._lastStageX = -1;
    };
    GamblingPanelMoveSupport.prototype.ignoreListBegin = function (event) {
        this._stopMove = true;
    };
    GamblingPanelMoveSupport.prototype.ignoreListEnd = function (event) {
        this._stopMove = false;
    };
    return GamblingPanelMoveSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelMoveSupport.prototype, "GamblingPanelMoveSupport");
//# sourceMappingURL=GamblingPanelMoveSupport.js.map