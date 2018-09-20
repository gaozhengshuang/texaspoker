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
 * 游戏场里的任务项
 */
var AchieveInGameItemRenderer = (function (_super) {
    __extends(AchieveInGameItemRenderer, _super);
    function AchieveInGameItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.AchieveInGameItemRenderer;
        return _this;
    }
    AchieveInGameItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (InfoUtil.checkAvailable(this.bindData)) {
            this.commonItem.init(this.bindData.definition.icon + ResSuffixName.PNG, 77);
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
    AchieveInGameItemRenderer.prototype.refreshiUI = function () {
        var groupInfo = AchieveProcessManager.getAchieveProcessInfoByGroup(this.bindData.definition.group);
        if (!this.bindData.isComplete) {
            this.takeBtn.enabled = false;
            this.takeBtn.label = groupInfo.process + "/" + this.bindData.definition.para1;
        }
        else {
            this.takeBtn.enabled = true;
            this.takeBtn.label = "领取";
        }
    };
    AchieveInGameItemRenderer.prototype.onClick = function (event) {
        if (event.target == this.takeBtn) {
            SoundManager.playButtonEffect(event.target);
            AchievementManager.reqTakeAchievePrize([this.bindData.id]);
        }
    };
    AchieveInGameItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    return AchieveInGameItemRenderer;
}(BaseItemRenderer)); // TypeScript file
__reflect(AchieveInGameItemRenderer.prototype, "AchieveInGameItemRenderer");
//# sourceMappingURL=AchieveInGameItemRenderer.js.map