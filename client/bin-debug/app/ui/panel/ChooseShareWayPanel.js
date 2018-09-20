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
 * 微信分享选择面板
 */
var ChooseShareWayPanel = (function (_super) {
    __extends(ChooseShareWayPanel, _super);
    function ChooseShareWayPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.ChooseShareWayPanel);
        return _this;
    }
    ChooseShareWayPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
    };
    ChooseShareWayPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData) {
            if (appendData.wxMsgTitle) {
                this._wxMsgTitle = appendData.wxMsgTitle;
            }
            if (appendData.wxTimeLineTitle) {
                this._wxTimeLineTitle = appendData.wxTimeLineTitle;
            }
            if (appendData.msg) {
                this._msg = appendData.msg;
            }
            else {
                this._msg = null;
            }
            if (appendData.isHasShareId) {
                this._isHasShareId = true;
            }
            else {
                this._isHasShareId = false;
            }
        }
    };
    ChooseShareWayPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.timeLineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTimeLineBtnClick, this);
        this.friendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFriendBtnClick, this);
    };
    ChooseShareWayPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.timeLineBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTimeLineBtnClick, this);
        this.friendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFriendBtnClick, this);
    };
    /**
     * 朋友圈按钮点击事件
    */
    ChooseShareWayPanel.prototype.onTimeLineBtnClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this._isHasShareId) {
            this.share(ChannelShareType.WxTimeLine, this._wxTimeLineTitle, UserManager.userInfo.shareId);
        }
        else {
            this.share(ChannelShareType.WxTimeLine, this._wxTimeLineTitle);
        }
    };
    /**
     * 微信好友按钮点击事件
    */
    ChooseShareWayPanel.prototype.onFriendBtnClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this._isHasShareId) {
            this.share(ChannelShareType.WxMessage, this._wxMsgTitle, UserManager.userInfo.shareId);
        }
        else {
            this.share(ChannelShareType.WxMessage, this._wxMsgTitle);
        }
    };
    /**
     * 分享
    */
    ChooseShareWayPanel.prototype.share = function (type, title, inviteCode) {
        var data = {};
        data['type'] = type;
        data['title'] = title;
        data['message'] = this._msg;
        data['url'] = ProjectDefined.GetInstance().getShareWebUrl(GameSetting.AppId, inviteCode);
        if (qin.RuntimeTypeName.getCurrentName() == qin.RuntimeTypeName.Ios) {
            qin.ExternalInterface.call(ExtFuncName.Share, JSON.stringify(data));
        }
        else if (qin.RuntimeTypeName.getCurrentName() == qin.RuntimeTypeName.Android) {
            egret.ExternalInterface.call(ExtFuncName.Share, JSON.stringify(data));
        }
    };
    return ChooseShareWayPanel;
}(BasePanel));
__reflect(ChooseShareWayPanel.prototype, "ChooseShareWayPanel");
//# sourceMappingURL=ChooseShareWayPanel.js.map