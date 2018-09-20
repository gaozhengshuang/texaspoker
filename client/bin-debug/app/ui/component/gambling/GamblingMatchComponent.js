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
 * 牌局比赛组件
 */
var GamblingMatchComponent = (function (_super) {
    __extends(GamblingMatchComponent, _super);
    function GamblingMatchComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingMatchComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.touchEnabled = false;
        this.championshipGroup.touchEnabled = false;
        this.left = this.right = this.top = this.bottom = 0;
        this.sngCountDownGroup.visible = this.mttGroup.visible = this.sngGroup.visible = false; //
    };
    GamblingMatchComponent.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        GamblingManager.SngReadyCountDownEvent.addListener(this.showSngCdInfo, this);
    };
    GamblingMatchComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        GamblingManager.SngReadyCountDownEvent.removeListener(this.showSngCdInfo, this);
    };
    GamblingMatchComponent.prototype.refresh = function () {
        this.mttGroup.visible = this.sngGroup.visible = false;
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo)) {
            switch (GamblingManager.matchRoomInfo.definition.type) {
                case MatchType.MTT:
                    this.mttGroup.visible = true;
                    break;
                case MatchType.SNG:
                    this.sngGroup.visible = true;
                    break;
            }
        }
    };
    /**
     * 显示坐满即玩信息
     */
    GamblingMatchComponent.prototype.showSngCdInfo = function () {
        var str = qin.StringConstants.Empty;
        if (GamblingManager.sngReadyCountDownTime <= 0) {
            this.sngCountDownGroup.visible = false;
            str = "0";
        }
        else {
            this.sngCountDownGroup.visible = true;
            str = qin.DateTimeUtil.formatCountdown(GamblingManager.sngReadyCountDownTime);
        }
        this.sngCountDownLabel.text = qin.StringUtil.format("（{0}）", str);
    };
    return GamblingMatchComponent;
}(BaseGamblingSlotComponent));
__reflect(GamblingMatchComponent.prototype, "GamblingMatchComponent");
//# sourceMappingURL=GamblingMatchComponent.js.map