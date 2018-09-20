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
 * 添加好友项面板
*/
var AddFriendItemRenderer = (function (_super) {
    __extends(AddFriendItemRenderer, _super);
    function AddFriendItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.AddFriendItemRenderer;
        return _this;
    }
    AddFriendItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.addBtn.enabled = true;
            this.userHeadCom.init(this.bindData, 110);
            this.nameLabel.text = this.bindData.name;
            this.idLabel.text = this.bindData.roleId.toString();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtnClick, this);
            this.addBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            FriendManager.onAddPlayerEvent.addListener(this.setGrayBtn, this);
        }
    };
    AddFriendItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtnClick, this);
        this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        FriendManager.onAddPlayerEvent.removeListener(this.setGrayBtn, this);
    };
    /**
     *添加按钮点击事件
    */
    AddFriendItemRenderer.prototype.onAddBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqAddPlayer(this.bindData.roleId);
    };
    /**
     * 请求成功后
    */
    AddFriendItemRenderer.prototype.setGrayBtn = function (roleId) {
        if (this.bindData.roleId == roleId) {
            this.addBtn.enabled = false;
        }
    };
    AddFriendItemRenderer.prototype.cancelBubble = function (event) {
        event.stopImmediatePropagation();
    };
    return AddFriendItemRenderer;
}(BaseItemRenderer));
__reflect(AddFriendItemRenderer.prototype, "AddFriendItemRenderer");
//# sourceMappingURL=AddFriendItemRenderer.js.map