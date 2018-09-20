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
 * 百人大战庄家项
*/
var HundredWarBankerItemRenderer = (function (_super) {
    __extends(HundredWarBankerItemRenderer, _super);
    function HundredWarBankerItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.HundredWarBankerItemRenderer;
        return _this;
    }
    HundredWarBankerItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refreshUI();
    };
    HundredWarBankerItemRenderer.prototype.refreshUI = function () {
        if (this.bindData) {
            this.userHeadCom.init(this.bindData, 70);
            this.nameLabel.text = this.bindData.name;
            this.goldNumLabel.text = "$" + qin.MathUtil.formatNum(this.bindData.gold);
            this.setBankerImg();
        }
    };
    /**
    * 设置庄家标识
    */
    HundredWarBankerItemRenderer.prototype.setBankerImg = function () {
        if (HundredWarManager.panelHandler.HundredWarBankerList.indexOf(this.bindData) == 0) {
            this.bankImg.visible = true;
        }
        else {
            this.bankImg.visible = false;
        }
    };
    HundredWarBankerItemRenderer.prototype.gotoUserInfo = function () {
        if (!HundredWarManager.isSysBanker(this.bindData.roleId)) {
            SoundManager.playEffect(MusicAction.buttonClick);
            UserManager.reqShowOtherUserInfoPanel(this.bindData.roleId);
        }
    };
    HundredWarBankerItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
    };
    return HundredWarBankerItemRenderer;
}(BaseItemRenderer));
__reflect(HundredWarBankerItemRenderer.prototype, "HundredWarBankerItemRenderer");
//# sourceMappingURL=HundredWarBankerItemRenderer.js.map