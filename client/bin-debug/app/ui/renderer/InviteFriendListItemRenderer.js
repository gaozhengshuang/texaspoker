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
 * 邀请好友项列表
*/
var InviteFriendListItemRenderer = (function (_super) {
    __extends(InviteFriendListItemRenderer, _super);
    function InviteFriendListItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.InviteFriendItemRenderer;
        return _this;
    }
    InviteFriendListItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData && this.bindData.friendInfo != null) {
            this.isCheckedBtn.selected = this.bindData.state;
            this.userHeadCom.init(this.bindData.friendInfo, 90);
            this.nameLabel.text = this.bindData.friendInfo.name;
            if (this.bindData.friendInfo.offlineTime) {
                this.isOnlineLabel.text = "离线";
                this.isOnlineLabel.textColor = ColorEnum.OutlineGray;
            }
            else {
                this.isOnlineLabel.text = "在线";
                this.isOnlineLabel.textColor = ColorEnum.InviteOnlineGreen;
            }
        }
    };
    InviteFriendListItemRenderer.prototype.setChecked = function (flag) {
        if (this.isCheckedBtn) {
            this.isCheckedBtn.selected = flag;
        }
    };
    return InviteFriendListItemRenderer;
}(BaseItemRenderer));
__reflect(InviteFriendListItemRenderer.prototype, "InviteFriendListItemRenderer");
//# sourceMappingURL=InviteFriendListItemRenderer.js.map