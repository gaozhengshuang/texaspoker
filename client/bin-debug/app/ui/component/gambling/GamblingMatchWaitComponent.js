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
 * 比赛等待组
 */
var GamblingMatchWaitComponent = (function (_super) {
    __extends(GamblingMatchWaitComponent, _super);
    function GamblingMatchWaitComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingMatchWaitComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.touchEnabled = false;
        this.left = this.right = this.top = this.bottom = 0;
        this.mttGroup.visible = this.sngGroup.visible = false;
    };
    /**
     * 刷新组显示
     */
    GamblingMatchWaitComponent.prototype.refreshGroup = function () {
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
    GamblingMatchWaitComponent.prototype.showSngInfo = function () {
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo)) {
            var join = GamblingManager.matchRoomInfo.join;
            var leftJoin = GamblingManager.matchRoomInfo.definition.bNum - join;
            var text = qin.StringUtil.format("<font size=30 color=0xffffff>已报名{0}人，还需</font><font color=0xf9cb55 size=42>{1}</font><font size=30 color=0xffffff>人即可开赛</font>", join, leftJoin);
            this.sngInfoLabel.textFlow = qin.TextUtil.htmlParser.parser(text);
        }
    };
    return GamblingMatchWaitComponent;
}(BaseGamblingSlotComponent));
__reflect(GamblingMatchWaitComponent.prototype, "GamblingMatchWaitComponent");
//# sourceMappingURL=GamblingMatchWaitComponent.js.map