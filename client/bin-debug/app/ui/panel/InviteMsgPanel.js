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
 * 邀请消息面板
 */
var InviteMsgPanel = (function (_super) {
    __extends(InviteMsgPanel, _super);
    function InviteMsgPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.InviteMsgPanel);
        return _this;
    }
    InviteMsgPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0.5;
    };
    InviteMsgPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        var info = FriendManager.getFriendInfoById(appendData.roleId);
        this.roomBuyLabel.text = "";
        if (info && appendData.roomId && appendData.roomId != 0) {
            var def = RoomDefined.GetInstance().getDefinition(appendData.roomId);
            this.inviteMsgLable.text = "你的好友" + info.name + "现在邀请您一起游戏！";
            this.omahaInviteLable.text = "你的好友" + info.name + "现在邀请您一起进行";
            this.headComp.init(info, 120);
            if (def) {
                this.roomBuyLabel.text = qin.MathUtil.formatNum(def.sBuyin) + "买入";
                if (def.type == PlayingFieldType.OmahaPrimary || def.type == PlayingFieldType.OmahaMiddle || def.type == PlayingFieldType.OmahaHigh || def.type == PlayingFieldType.OmahaPersonal) {
                    this.inviteMsgLable.visible = false;
                    this.omahaGroup.visible = true;
                }
                else {
                    this.inviteMsgLable.visible = true;
                    this.omahaGroup.visible = false;
                }
            }
        }
        else {
            qin.Console.logError("ERROR好友信息未找到角色ID：" + appendData.roleId);
        }
        if (appendData.id) {
            if (appendData.id.toString().length < 5) {
                this.roomIdLabel.text = PlayingFieldManager.roomIdAddZero(appendData.id);
            }
            else {
                this.roomIdLabel.text = appendData.id.toString();
            }
        }
    };
    InviteMsgPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    InviteMsgPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.joinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.joinBtnHandler, this);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClickHandler, this);
        GamblingManager.OnGetRoomInfoEvent.addListener(this.onGetRoomInfoHandler, this);
    };
    InviteMsgPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.joinBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.joinBtnHandler, this);
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClickHandler, this);
        GamblingManager.OnGetRoomInfoEvent.removeListener(this.onGetRoomInfoHandler, this);
    };
    InviteMsgPanel.prototype.onBackBtnClickHandler = function () {
        this.onCloseBtnClickHandler(null);
    };
    /**
     * 立即加入房间
    */
    InviteMsgPanel.prototype.joinBtnHandler = function (event) {
        if (SceneManager.sceneType == SceneType.Game && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.id != 0) {
            if (GamblingManager.roomInfo.id == this.panelData.id) {
                UIManager.showFloatTips("已在房间内");
                this.onBackBtnClickHandler();
                return;
            }
        }
        this.confirmGotoRoom();
    };
    InviteMsgPanel.prototype.confirmGotoRoom = function () {
        if (this.panelData) {
            GamblingManager.reqEnterRoom(this.panelData.id, this.panelData.pwd);
        }
    };
    /**
     * 进入房间信息返回
     */
    InviteMsgPanel.prototype.onGetRoomInfoHandler = function () {
        if (SceneManager.sceneType == SceneType.Game) {
            var panel = UIManager.getPanel(UIModuleName.GamblingPanel);
            if (panel) {
                panel.switchToGameSceneInRoom();
            }
            else {
                UIManager.showPanel(UIModuleName.GamblingPanel);
            }
        }
        else {
            SceneManager.switcScene(SceneType.Game);
        }
        this.onCloseBtnClickHandler(null);
    };
    InviteMsgPanel.prototype.backToHall = function () {
        if (GamblingManager.roomInfo) {
            switch (GamblingManager.roomInfo.gamblingType) {
                case GamblingType.Common:
                    GamblingManager.reqLeaveRoom();
                    break;
                case GamblingType.Match:
                    AlertManager.showConfirm("退出比赛后，比赛将进入托管状态，是否确认退出？", this.leaveRoom, null, this.panelData);
                    break;
                case GamblingType.PlayFieldPersonal:
                case GamblingType.OmahaPersonal:
                    if (GamblingManager.isMaster) {
                        AlertManager.showConfirm("是否退出并解散当前房间,进入被邀请房间?", this.leaveRoom, null, this.panelData);
                    }
                    else {
                        this.leaveRoom(this.panelData);
                    }
                    break;
            }
        }
    };
    InviteMsgPanel.prototype.leaveRoom = function (data) {
        if (data) {
            GamblingManager.reqEnterRoom(data.id, data.pwd);
        }
    };
    return InviteMsgPanel;
}(BasePanel));
__reflect(InviteMsgPanel.prototype, "InviteMsgPanel");
//# sourceMappingURL=InviteMsgPanel.js.map