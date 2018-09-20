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
 * 好友请求项面板
*/
var FriendRequestItemRenderer = (function (_super) {
    __extends(FriendRequestItemRenderer, _super);
    function FriendRequestItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.FriendRequestItemRenderer;
        return _this;
    }
    FriendRequestItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.userHeadCom.init(this.bindData, 110);
            this.nameLabel.text = this.bindData.name;
            this.idLabel.text = this.bindData.roleId.toString();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.receiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onreceiveBtnClick, this);
            this.receiveBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            this.refuseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onrefuseBtnClick, this);
            this.refuseBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        }
    };
    FriendRequestItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.receiveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onreceiveBtnClick, this);
        this.receiveBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        this.refuseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onrefuseBtnClick, this);
        this.refuseBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
    };
    /**
     *接受按钮点击事件
    */
    FriendRequestItemRenderer.prototype.onreceiveBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqReceiveFriendRequest(this.bindData.roleId, FriendReceiveType.Receive);
    };
    /**
     * 拒绝按钮点击事件
    */
    FriendRequestItemRenderer.prototype.onrefuseBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqReceiveFriendRequest(this.bindData.roleId, FriendReceiveType.Reject);
    };
    FriendRequestItemRenderer.prototype.cancelBubble = function (event) {
        event.stopImmediatePropagation();
    };
    return FriendRequestItemRenderer;
}(BaseItemRenderer));
__reflect(FriendRequestItemRenderer.prototype, "FriendRequestItemRenderer");
//# sourceMappingURL=FriendRequestItemRenderer.js.map