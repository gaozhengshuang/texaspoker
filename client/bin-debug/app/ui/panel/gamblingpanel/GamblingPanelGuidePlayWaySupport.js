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
 * 引导玩法
 */
var GamblingPanelGuidePlayWaySupport = (function (_super) {
    __extends(GamblingPanelGuidePlayWaySupport, _super);
    function GamblingPanelGuidePlayWaySupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelGuidePlayWaySupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        var state = this.target.panelState;
        var component = state.getCompoent(GamblingGuidePlayWayComponent);
        component.guidePlayWayGroup.visible = false;
    };
    GamblingPanelGuidePlayWaySupport.prototype.run = function () {
        var _this = this;
        var state = this.target.panelState;
        var component = state.getCompoent(GamblingGuidePlayWayComponent);
        component.guidePlayWayGroup.visible = true;
        this._boardCardParent = this.target.cardList[0].parent;
        this._childIndexList = new Array();
        for (var i = 0; i < this.target.cardList.length; i++) {
            var child = this.target.cardList[i];
            this._childIndexList.push(this._boardCardParent.getChildIndex(child));
            component.guidePlayWayGroup.addChild(child);
        }
        var anmation1 = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.Alpha);
        anmation1.target = component.guidePlayWayBg; //灰色背景
        anmation1.run(0, 0.5, 0, 500);
        var anmation2 = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.Alpha);
        anmation2.target = component.guidePlayWayFlopGroup; //翻牌
        anmation2.run(0, 1, 500);
        var anmation3 = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.Alpha);
        anmation3.target = component.guidePlayTurnLabel; //转牌
        anmation3.run(0, 1, 2000);
        var anmation4 = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.Alpha);
        anmation4.target = component.guidePlayRiverLabel; //河牌
        anmation4.run(0, 1, 3500, 1000, function () {
            anmation1.run(0.5, 0, 2000);
            anmation2.run(1, 0, 2000);
            anmation3.run(1, 0, 2000);
            anmation4.run(1, 0, 2000, 1000, _this.onDisable, _this);
        }, this);
        // anmation = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.Alpha);
        // anmation.target = state.component.guidePlayWayGroup;  //引导隐藏
        // anmation.run(1, 0, 7500, 1000, this.onDisable, this);
    };
    GamblingPanelGuidePlayWaySupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
    };
    GamblingPanelGuidePlayWaySupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        var state = this.target.panelState;
        var component = state.getCompoent(GamblingGuidePlayWayComponent);
        component.guidePlayWayGroup.visible = false;
        if (this._childIndexList && this._boardCardParent) {
            for (var i = 0; i < this.target.cardList.length; i++) {
                var child = this.target.cardList[i];
                this._boardCardParent.addChildAt(child, this._childIndexList[i]);
            }
        }
        else {
            qin.Console.logError("引导玩法执行异常！");
        }
    };
    return GamblingPanelGuidePlayWaySupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelGuidePlayWaySupport.prototype, "GamblingPanelGuidePlayWaySupport");
//# sourceMappingURL=GamblingPanelGuidePlayWaySupport.js.map