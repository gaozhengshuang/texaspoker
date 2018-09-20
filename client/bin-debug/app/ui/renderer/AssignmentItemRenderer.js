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
 * 任务项
 */
var AssignmentItemRenderer = (function (_super) {
    __extends(AssignmentItemRenderer, _super);
    function AssignmentItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.AssignmentItemRenderer;
        return _this;
    }
    AssignmentItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (InfoUtil.checkAvailable(this.bindData)) {
            this.itemComp.init(this.bindData.definition.icon + ResSuffixName.PNG, 100);
            this.desLabel.text = this.bindData.definition.name;
            this.rewardLabel.text = this.bindData.definition.rewardNum.toString();
            var def = ItemDefined.GetInstance().getDefinition(this.bindData.definition.rewardId);
            if (def) {
                this.rewardImg.source = def.icon + ResSuffixName.PNG;
            }
            this.refreshiUI();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
    };
    AssignmentItemRenderer.prototype.refreshiUI = function () {
        var groupInfo = AchieveProcessManager.getAchieveProcessInfoByGroup(this.bindData.definition.group);
        if (!this.bindData.isComplete) {
            this.processImg.width = 246;
            this.processImg.width *= groupInfo.process / this.bindData.definition.para1;
            this.processLabel.text = groupInfo.process + "/" + this.bindData.definition.para1;
            this.gotoBtn.visible = true;
            this.takePrizeBtn.visible = false;
        }
        else {
            this.processImg.width = 246;
            this.processLabel.text = this.bindData.definition.para1 + "/" + this.bindData.definition.para1;
            this.gotoBtn.visible = false;
            this.takePrizeBtn.visible = true;
        }
    };
    AssignmentItemRenderer.prototype.onClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (event.target == this.takePrizeBtn) {
            AchievementManager.reqTakeAchievePrize([this.bindData.id]);
        }
        else if (event.target == this.gotoBtn) {
            JumpUtil.JumpByPlayField(this.bindData.definition.tran, UIModuleName.AssignmentPanel);
        }
    };
    AssignmentItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    return AssignmentItemRenderer;
}(BaseItemRenderer));
__reflect(AssignmentItemRenderer.prototype, "AssignmentItemRenderer");
//# sourceMappingURL=AssignmentItemRenderer.js.map