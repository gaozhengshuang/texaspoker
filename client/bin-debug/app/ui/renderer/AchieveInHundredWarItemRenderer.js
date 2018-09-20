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
 * 百人大战里的任务项
 */
var AchieveInHundredWarItemRenderer = (function (_super) {
    __extends(AchieveInHundredWarItemRenderer, _super);
    function AchieveInHundredWarItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.AchieveInHundredWarItemRenderer;
        return _this;
    }
    AchieveInHundredWarItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (InfoUtil.checkAvailable(this.bindData)) {
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
    AchieveInHundredWarItemRenderer.prototype.refreshiUI = function () {
        var groupInfo = AchieveProcessManager.getAchieveProcessInfoByGroup(this.bindData.definition.group);
        if (!this.bindData.isComplete) {
            this.takeBtn.visible = false;
            this.progresGroup.visible = true;
            this.achieveProgresLabel.text = groupInfo.process + " / " + this.bindData.definition.para1;
            this.achieveProgressImg.width = 150;
            this.achieveProgressImg.width *= groupInfo.process / this.bindData.definition.para1;
        }
        else {
            this.takeBtn.visible = true;
            this.progresGroup.visible = false;
        }
    };
    AchieveInHundredWarItemRenderer.prototype.onClick = function (event) {
        if (event.target == this.takeBtn) {
            SoundManager.playEffect(MusicAction.buttonClick);
            AchievementManager.reqTakeAchievePrize([this.bindData.id]);
        }
    };
    AchieveInHundredWarItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    return AchieveInHundredWarItemRenderer;
}(BaseItemRenderer));
__reflect(AchieveInHundredWarItemRenderer.prototype, "AchieveInHundredWarItemRenderer");
//# sourceMappingURL=AchieveInHundredWarItemRenderer.js.map