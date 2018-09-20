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
 * 好友列表项面板
*/
var FriendItemRenderer = (function (_super) {
    __extends(FriendItemRenderer, _super);
    function FriendItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.FriendItemRenderer;
        return _this;
    }
    FriendItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.isOnlinetoggleBtn.touchEnabled = false;
            this.userHeadCom.init(this.bindData, 110);
            this.nameLabel.text = this.bindData.name;
            this.goldNumLabel.text = qin.MathUtil.formatNum(this.bindData.gold);
            if (this.bindData.offlineTime) {
                this.isOnlinetoggleBtn.selected = false;
                this.isOnlinetoggleBtn["desLabel"].text = "离线";
                this.isOnlinetoggleBtn["desLabel"].textColor = ColorEnum.OutlineGray;
            }
            else {
                this.isOnlinetoggleBtn.selected = true;
                this.isOnlinetoggleBtn["desLabel"].text = "在线";
                this.isOnlinetoggleBtn["desLabel"].textColor = ColorEnum.OnlineGreen;
            }
            if (this.bindData.giveGold == 1) {
                this.giveBtn.enabled = false;
            }
            else {
                this.giveBtn.enabled = true;
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.giveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ongiveBtnClick, this);
            this.giveBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            FriendManager.onGiveFriendGoldEvent.addListener(this.changeGiveButtonState, this);
        }
    };
    FriendItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.giveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ongiveBtnClick, this);
        this.giveBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        FriendManager.onGiveFriendGoldEvent.removeListener(this.changeGiveButtonState, this);
    };
    /**
     *赠送按钮点击事件
    */
    FriendItemRenderer.prototype.ongiveBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqGiveFriendGold(this.bindData.roleId);
    };
    /**
     * 赠送好友金币成功后续执行事件
    */
    FriendItemRenderer.prototype.changeGiveButtonState = function (id) {
        if (this.bindData.roleId == id) {
            this.giveBtn.enabled = false;
            UIManager.showFloatTips("您已成功赠送给此好友" + ProjectDefined.giveOnceGoldNum + "金币！");
        }
    };
    FriendItemRenderer.prototype.cancelBubble = function (event) {
        event.stopImmediatePropagation();
    };
    return FriendItemRenderer;
}(BaseItemRenderer));
__reflect(FriendItemRenderer.prototype, "FriendItemRenderer");
//# sourceMappingURL=FriendItemRenderer.js.map