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
 * 游戏引导领取金币面板
 */
var GuideBringGoldPanel = (function (_super) {
    __extends(GuideBringGoldPanel, _super);
    function GuideBringGoldPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.GuideBringGoldPanel);
        return _this;
    }
    GuideBringGoldPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    GuideBringGoldPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        var guideDef = GuideDefined.GetInstance().getDefinition(appendData.self);
        if (guideDef) {
            var awardDef = AwardDefined.GetInstance().getDefinition(guideDef.awardId);
            if (awardDef && awardDef.rewardList.length > 0) {
                this.iconImg.init(awardDef.rewardList[0].id, 48, qin.StringConstants.Empty);
                this.goldNumLabel.text = awardDef.rewardList[0].count.toString();
            }
        }
    };
    GuideBringGoldPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    GuideBringGoldPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.bringBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bringBtnClick, this);
        GuideManager.onSetGuideStepEvent.addListener(this.setGuideStepHandler, this);
    };
    GuideBringGoldPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.bringBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bringBtnClick, this);
        GuideManager.onSetGuideStepEvent.removeListener(this.setGuideStepHandler, this);
    };
    /**
     * 领取金币按钮点击执行事件
    */
    GuideBringGoldPanel.prototype.bringBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (this.panelData.self > 0) {
            GuideExecutor.guideProcessComplete(this.panelData.self);
        }
    };
    /**
     * 设置引导步骤完毕
     */
    GuideBringGoldPanel.prototype.setGuideStepHandler = function (data) {
        if (data && this.panelData && data.uid == this.panelData.self) {
            this.onCloseBtnClickHandler(null);
        }
    };
    return GuideBringGoldPanel;
}(BasePanel));
__reflect(GuideBringGoldPanel.prototype, "GuideBringGoldPanel");
//# sourceMappingURL=GuideBringGoldPanel.js.map