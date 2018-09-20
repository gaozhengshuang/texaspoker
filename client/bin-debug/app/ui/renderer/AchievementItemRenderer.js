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
 * 成就renderer
 */
var AchievementItemRenderer = (function (_super) {
    __extends(AchievementItemRenderer, _super);
    function AchievementItemRenderer() {
        var _this = _super.call(this) || this;
        _this._width = 90;
        _this._numContentInfo = new NumContentInfo();
        _this._numContentInfo.gap = -8;
        _this._numContentInfo.setImgWidHei(37, 47, 49, 47);
        _this._numContentInfo.limtiWidth = 150;
        _this._numContentInfo.preFix = ResPrefixName.Achieve_Num;
        _this.skinName = UIRendererSkinName.AchievementItemRenderer;
        return _this;
    }
    AchievementItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.scaleX = this.scaleY = this._width / this.width;
        if (InfoUtil.checkAvailable(this.bindData)) {
            this.itemImg.source = this.bindData.definition.icon + ResSuffixName.PNG;
            this._numContentInfo.content = qin.MathUtil.formatNum(this.bindData.definition.para1);
            this.numImg.init(this._numContentInfo);
            this.refreshiUI();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
    };
    AchievementItemRenderer.prototype.refreshiUI = function () {
        var userInfo;
        if (UserManager.otherUserInfo == null || UserManager.otherUserInfo.roleId == UserManager.userInfo.roleId) {
            userInfo = UserManager.userInfo;
        }
        else {
            userInfo = UserManager.otherUserInfo;
        }
        this.achieveGroup.visible = true;
        this.touchEnabled = true;
        this.touchChildren = true;
        if (this.bindData.isComplete) {
            this.achieveMask.visible = false;
        }
        else if (this.bindData.definition.preId == 0) {
            this.achieveMask.visible = true;
        }
        else if (AchievementManager.getAchieveInfoById(userInfo.allAchieveList, this.bindData.definition.preId).isComplete) {
            this.achieveMask.visible = true;
        }
        else {
            this.achieveGroup.visible = false;
            this.touchEnabled = false;
            this.touchChildren = false;
        }
    };
    AchievementItemRenderer.prototype.init = function (info, width) {
        this.info = info;
        this.itemImg.source = info.definition.icon + ResSuffixName.PNG;
        this._numContentInfo.content = qin.MathUtil.formatNum(info.definition.para1);
        this.numImg.init(this._numContentInfo);
        this.achieveGroup.visible = true;
        this.achieveMask.visible = false;
        this.bg.visible = false;
        this.scaleX = this.scaleY = width / this.width;
    };
    AchievementItemRenderer.prototype.onClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        UIManager.showPanel(UIModuleName.AchievementItemPanel, this.bindData);
    };
    AchievementItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    return AchievementItemRenderer;
}(BaseItemRenderer));
__reflect(AchievementItemRenderer.prototype, "AchievementItemRenderer");
//# sourceMappingURL=AchievementItemRenderer.js.map