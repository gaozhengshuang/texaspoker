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
 * 好友消息面板
 */
var FriendMsgPanel = (function (_super) {
    __extends(FriendMsgPanel, _super);
    function FriendMsgPanel() {
        var _this = _super.call(this) || this;
        _this.isTween = false;
        _this.layer = UILayerType.Tips;
        _this.setSkinName(UIModuleName.FriendMsgPanel);
        return _this;
    }
    FriendMsgPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    FriendMsgPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        qin.Tick.RemoveSecondsInvoke(this.onTimeRefresf, this);
        qin.Tick.AddSecondsInvoke(this.onTimeRefresf, this);
        this.refreshUI(appendData);
        this.tweenGp.y = -100;
        egret.Tween.get(this.tweenGp).to({ y: 0 }, 600, egret.Ease.backOut);
        SoundManager.playEffect(MusicAction.notice);
    };
    FriendMsgPanel.prototype.refreshUI = function (appendData) {
        this._requestInfo = appendData;
        if (this._requestInfo) {
            if (this._requestInfo.type == FriendMsgType.InviteMsg) {
                this.inviteMsg_bg.visible = true;
                this.requireMsg_bg.visible = false;
            }
            else if (this._requestInfo.type == FriendMsgType.RequireMsg) {
                this.inviteMsg_bg.visible = false;
                this.requireMsg_bg.visible = true;
            }
        }
    };
    FriendMsgPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        //FriendManager.InviteFriendEvent.addListener(this.friendInviteHandler, this);
    };
    FriendMsgPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        qin.Tick.RemoveSecondsInvoke(this.onTimeRefresf, this);
        //FriendManager.InviteFriendEvent.removeListener(this.friendInviteHandler, this);
    };
    FriendMsgPanel.prototype.clickHandler = function (event) {
        if (this._requestInfo) {
            if (this._requestInfo.type == FriendMsgType.InviteMsg) {
                UIManager.showPanel(UIModuleName.InviteMsgPanel, this._requestInfo.info);
            }
            else if (this._requestInfo.type == FriendMsgType.RequireMsg) {
                if (!UIManager.isShowPanel(UIModuleName.FriendPanel)) {
                    UIManager.showPanel(UIModuleName.FriendPanel, { tabFlag: FriendUIType.RequestList, prevPanelName: UIModuleName.None });
                }
                else {
                    FriendManager.allowFriendJumpEvent.dispatch();
                }
            }
            this.removeFriendMsg();
        }
    };
    FriendMsgPanel.prototype.removeFriendMsg = function () {
        if (this._requestInfo) {
            FriendManager.removeFriendMsgInfo(this._requestInfo);
            var info = FriendManager.getFriendMsgInfo();
            if (info) {
                this.refreshUI(info);
            }
            else {
                this.onCloseBtnClickHandler(null);
            }
        }
    };
    FriendMsgPanel.prototype.onTimeRefresf = function () {
        if (this._requestInfo && this._requestInfo.time && TimeManager.GetServerUtcTimestamp() - this._requestInfo.time > FriendManager.msgTime) {
            var info = FriendManager.getFriendMsgInfo();
            if (info) {
                this.init({ type: info.type, data: info.info, time: info.time });
            }
            else {
                this.onCloseBtnClickHandler(null);
            }
        }
    };
    FriendMsgPanel.prototype.friendInviteHandler = function () {
        this.onCloseBtnClickHandler(null);
    };
    return FriendMsgPanel;
}(BasePanel));
__reflect(FriendMsgPanel.prototype, "FriendMsgPanel");
//# sourceMappingURL=FriendMsgPanel.js.map