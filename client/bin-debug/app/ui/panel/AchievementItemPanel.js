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
 * 成就信息面板
 */
var AchievementItemPanel = (function (_super) {
    __extends(AchievementItemPanel, _super);
    function AchievementItemPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.AchievementItemPanel);
        return _this;
    }
    AchievementItemPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
    };
    AchievementItemPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData) {
            this.info = appendData;
        }
    };
    AchievementItemPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.item.init(this.info, 150);
        var itemDef = this.info.definition;
        if (itemDef) {
            this.achieveName.text = itemDef.name;
            if (this.info.isComplete) {
                this.progress.text = itemDef.para1.toString() + "/" + itemDef.para1.toString();
            }
            else if (!this.info.isOther) {
                this.progress.text = AchieveProcessManager.getAchieveProcessInfoByGroup(itemDef.group).process + "/" + itemDef.para1.toString();
            }
            else {
                var process = AchievementManager.otherProcessList.getValue(itemDef.group);
                this.progress.text = (process == undefined ? 0 : process) + "/" + itemDef.para1.toString();
            }
            this.des.text = itemDef.description;
        }
        this.complete.visible = this.info.isComplete;
    };
    AchievementItemPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    AchievementItemPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    return AchievementItemPanel;
}(BasePanel));
__reflect(AchievementItemPanel.prototype, "AchievementItemPanel");
//# sourceMappingURL=AchievementItemPanel.js.map