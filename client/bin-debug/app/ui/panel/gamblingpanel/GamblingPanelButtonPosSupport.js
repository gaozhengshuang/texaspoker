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
 * 按钮位逻辑支持
 */
var GamblingPanelButtonPosSupport = (function (_super) {
    __extends(GamblingPanelButtonPosSupport, _super);
    function GamblingPanelButtonPosSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelButtonPosSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        if (!this._moveAnim) {
            this._moveAnim = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.CommonMoveToPointByNowPos);
            this._moveAnim.setTarget(this.target.buttonPosFlagImg);
        }
        var index;
        this.showPitInfo(false);
        this.target.buttonPosFlagImg.visible = true;
    };
    GamblingPanelButtonPosSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.NextRoundStartEvent.addListener(this.onNextRoundStart, this);
    };
    GamblingPanelButtonPosSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.NextRoundStartEvent.removeListener(this.onNextRoundStart, this);
        qin.Tick.RemoveTimeoutInvoke(this.delayMove, this);
    };
    /**
     * 是否需要延迟
     */
    GamblingPanelButtonPosSupport.prototype.onNextRoundStart = function () {
        this.showPitInfo(true);
    };
    /**
     * 清理相对位置
     */
    GamblingPanelButtonPosSupport.prototype.clearReleativePos = function (target) {
        target.top = undefined;
        target.bottom = undefined;
        target.horizontalCenter = undefined;
        target.verticalCenter = undefined;
    };
    GamblingPanelButtonPosSupport.prototype.showPitInfo = function (isRun) {
        if (!GamblingManager.roomInfo) {
            return;
        }
        var pos = GamblingManager.roomInfo.buttonPos > 0 ? GamblingManager.roomInfo.buttonPos : 1;
        var pitInfo = this.target.getPitInfo(pos);
        if (pitInfo) {
            var p = new egret.Point();
            var w = pitInfo.headComponent.maxWidth;
            var h = pitInfo.headComponent.maxHeight;
            this.clearReleativePos(this.target.buttonPosFlagImg);
            this.clearReleativePos(this.target.buttonPosFlagImgSpt);
            if (pitInfo.headComponent.horizontalCenter != undefined && isNaN(pitInfo.headComponent.horizontalCenter) == false) {
                if (pitInfo.index == 1) {
                    p.x = pitInfo.headComponent.horizontalCenter - pitInfo.headComponent.maxWidth / 2 - 30;
                }
                else {
                    p.x = pitInfo.headComponent.horizontalCenter;
                }
                this.target.buttonPosFlagImgSpt.horizontalCenter = p.x;
            }
            if (pitInfo.headComponent.top != undefined && isNaN(pitInfo.headComponent.top) == false) {
                p.y = pitInfo.headComponent.top + h + 10;
                this.target.buttonPosFlagImgSpt.top = p.y;
            }
            else if (pitInfo.headComponent.bottom != undefined && isNaN(pitInfo.headComponent.bottom) == false) {
                if (pitInfo.index == 1) {
                    p.y = pitInfo.headComponent.bottom + 20;
                }
                else {
                    p.y = pitInfo.headComponent.bottom - 40;
                }
                this.target.buttonPosFlagImgSpt.bottom = p.y;
            }
            else if (pitInfo.headComponent.verticalCenter != undefined && isNaN(pitInfo.headComponent.verticalCenter) == false) {
                if (pitInfo.headComponent.verticalCenter > 0) {
                    p.y = pitInfo.headComponent.verticalCenter + h + 10;
                }
                else {
                    p.y = pitInfo.headComponent.verticalCenter + h + 10;
                }
                this.target.buttonPosFlagImgSpt.verticalCenter = p.y;
            }
            else {
                if (pitInfo.index == 1) {
                    this.target.buttonPosFlagImgSpt.y = pitInfo.headComponent.y + pitInfo.headComponent.emptyGroup.height - 20;
                }
                else {
                    this.target.buttonPosFlagImgSpt.y = pitInfo.headComponent.y + pitInfo.headComponent.emptyGroup.height + 67;
                }
            }
            if (isRun) {
                qin.Tick.AddTimeoutInvoke(this.delayMove, GameManager.stage.frameRate, this);
            }
            else {
                this.moveFinish();
            }
        }
        else {
            qin.Console.logError("显示按钮位信息失败！按钮位：" + pos);
        }
    };
    GamblingPanelButtonPosSupport.prototype.delayMove = function () {
        this._moveAnim.run(this.target.buttonPosFlagImgSpt.x, this.target.buttonPosFlagImgSpt.y, this.moveFinish, this);
    };
    /**
     * 移动完毕
     */
    GamblingPanelButtonPosSupport.prototype.moveFinish = function () {
        this.target.buttonPosFlagImg.horizontalCenter = this.target.buttonPosFlagImgSpt.horizontalCenter;
        this.target.buttonPosFlagImg.verticalCenter = this.target.buttonPosFlagImgSpt.verticalCenter;
        this.target.buttonPosFlagImg.top = this.target.buttonPosFlagImgSpt.top;
        this.target.buttonPosFlagImg.bottom = this.target.buttonPosFlagImgSpt.bottom;
        this.target.buttonPosFlagImg.y = this.target.buttonPosFlagImgSpt.y;
    };
    return GamblingPanelButtonPosSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelButtonPosSupport.prototype, "GamblingPanelButtonPosSupport");
//# sourceMappingURL=GamblingPanelButtonPosSupport.js.map