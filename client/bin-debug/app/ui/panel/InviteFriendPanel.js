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
 * 邀请好友面板
 */
var InviteFriendPanel = (function (_super) {
    __extends(InviteFriendPanel, _super);
    function InviteFriendPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.InviteFriendPanel);
        return _this;
    }
    InviteFriendPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.isCloseButtonTween = false;
        UIUtil.listRenderer(this.inviteFriendList, this.inviteFriend_scroller, InviteFriendListItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    InviteFriendPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.checkAll.selected = false;
        if (FriendManager.friendList) {
            this._infoList = new Array();
            for (var i = 0; i < FriendManager.friendList.length; i++) {
                var iInfo = new InviteInfo();
                iInfo.friendInfo = FriendManager.friendList[i];
                this._infoList.push(iInfo);
            }
        }
    };
    InviteFriendPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.setFriendListInfo();
    };
    InviteFriendPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.checkAll.addEventListener(egret.Event.CHANGE, this.checkAllHandler, this);
        this.inviteFriendList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.checkBtnHandler, this);
        this.inviteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendInviteHandler, this);
        FriendManager.InviteFriendEvent.addListener(this.inviteFriendHandler, this);
    };
    InviteFriendPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.checkAll.removeEventListener(egret.Event.CHANGE, this.checkAllHandler, this);
        this.inviteFriendList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.checkBtnHandler, this);
        this.inviteBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendInviteHandler, this);
        FriendManager.InviteFriendEvent.removeListener(this.inviteFriendHandler, this);
        this._infoList = null;
    };
    InviteFriendPanel.prototype.setFriendListInfo = function () {
        if (this._infoList) {
            this._dp = new eui.ArrayCollection(this._infoList.sort(SortUtil.inviteFriendSort));
            this.inviteFriendList.dataProvider = this._dp;
        }
    };
    InviteFriendPanel.prototype.checkAllHandler = function () {
        if (this._infoList) {
            for (var i = 0; i < this._infoList.length; i++) {
                this._infoList[i].state = this.checkAll.selected;
                var item = this.getItemRender(this._infoList[i].friendInfo);
                if (item) {
                    item.setChecked(this.checkAll.selected);
                }
            }
        }
    };
    InviteFriendPanel.prototype.getItemRender = function (friendInfo) {
        for (var i = 0; i < this.inviteFriendList.numChildren; i++) {
            var inviteFriendListItem = this.inviteFriendList.getChildAt(i);
            if (inviteFriendListItem.bindData.friendInfo.roleId == friendInfo.roleId) {
                return inviteFriendListItem;
            }
        }
        return null;
    };
    InviteFriendPanel.prototype.checkBtnHandler = function (event) {
        var inviteFriendListItem = this.getItemRender(this.inviteFriendList.selectedItem.friendInfo);
        if (inviteFriendListItem) {
            var state = !inviteFriendListItem.isCheckedBtn.selected;
            inviteFriendListItem.bindData.state = state;
            inviteFriendListItem.setChecked(state);
            if (!state) {
                this.checkAll.selected = state;
            }
        }
    };
    InviteFriendPanel.prototype.sendInviteHandler = function () {
        if (!GamblingManager.roomInfo || GamblingManager.roomInfo.id == 0) {
            AlertManager.showAlert("您当前不在房间中,无法邀请好友");
            return;
        }
        var friendIdArray = new Array();
        if (this._infoList) {
            for (var i = 0; i < this._infoList.length; i++) {
                if (this._infoList[i].state && this._infoList[i].friendInfo) {
                    friendIdArray.push(this._infoList[i].friendInfo.roleId);
                }
            }
            if (friendIdArray.length > 0) {
                FriendManager.reqInviteFriend(GamblingManager.roomInfo.id, friendIdArray);
            }
            else {
                AlertManager.showAlert("您未选择要邀请的好友");
            }
        }
    };
    InviteFriendPanel.prototype.inviteFriendHandler = function () {
        UIManager.showFloatTips("好友邀请已发送");
        this.onCloseBtnClickHandler(null);
    };
    return InviteFriendPanel;
}(BasePanel));
__reflect(InviteFriendPanel.prototype, "InviteFriendPanel");
/**
 * 邀请好友信息封装
 */
var InviteInfo = (function () {
    function InviteInfo() {
    }
    return InviteInfo;
}());
__reflect(InviteInfo.prototype, "InviteInfo");
//# sourceMappingURL=InviteFriendPanel.js.map