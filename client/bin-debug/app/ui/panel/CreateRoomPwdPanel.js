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
 * 创建私人房密码面板
*/
var CreateRoomPwdPanel = (function (_super) {
    __extends(CreateRoomPwdPanel, _super);
    function CreateRoomPwdPanel() {
        var _this = _super.call(this, true) || this;
        _this.setSkinName(UIModuleName.CreateRoomPwdPanel);
        return _this;
    }
    CreateRoomPwdPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.setAlignInfo(PanelAlignType.Center_Center);
        this.isShowKeyBoardPanel = false;
    };
    CreateRoomPwdPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.goldLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.gold);
        this.getMaxCarrayInfo();
    };
    CreateRoomPwdPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.createBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createRoom, this);
        this.labelGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeIndex, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        PlayingFieldManager.onKeyBoardCloseEvent.addListener(this.restoreY, this);
        this.blindHS.addEventListener(egret.Event.CHANGE, this.chooseBlind, this);
    };
    CreateRoomPwdPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.createBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.createRoom, this);
        this.labelGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeIndex, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        PlayingFieldManager.onKeyBoardCloseEvent.removeListener(this.restoreY, this);
        this.blindHS.removeEventListener(egret.Event.CHANGE, this.chooseBlind, this);
        this.restoreY();
    };
    CreateRoomPwdPanel.prototype.enterPwd = function (type, num) {
        if (num) {
            var label = this.getUnWriteLabel();
            if (label) {
                label.refresh(parseInt(num));
            }
        }
        //键盘删除键按下
        if (type == 2) {
            var delLabel = this.getWirteLabel();
            if (delLabel) {
                delLabel.refresh();
            }
        }
        else if (type == 3) {
            this.resetLabel();
        }
    };
    /**
     * 选择盲注
    */
    CreateRoomPwdPanel.prototype.chooseBlind = function () {
        var roomInfo = this._maxCarryList[this.blindHS.value];
        this.blindLabel.text = qin.MathUtil.formatNum(roomInfo.sBlind) + "/" + qin.MathUtil.formatNum(roomInfo.bBlind);
        this.sBuyLabel.text = qin.MathUtil.formatNum(roomInfo.sBuyin);
        this.setAnte(roomInfo.id);
    };
    /**
     * 设置前注数据
    */
    CreateRoomPwdPanel.prototype.setAnte = function (id) {
        var roomDef = RoomDefined.GetInstance().getDefinition(id);
        if (roomDef) {
            this.ante1ToggleSwitch.label = qin.MathUtil.formatNum(roomDef.ante[0]);
            this.ante2ToggleSwitch.label = qin.MathUtil.formatNum(roomDef.ante[1]);
            this.ante3ToggleSwitch.label = qin.MathUtil.formatNum(roomDef.ante[2]);
            this.ante4ToggleSwitch.label = qin.MathUtil.formatNum(roomDef.ante[3]);
        }
        this._ante = 0;
        if (this.selectedAnte) {
            this.selectedAnte.selected = false;
            this.ante1ToggleSwitch.selected = true;
            this.selectedAnte = this.ante1ToggleSwitch;
        }
        this._selectedId = id;
    };
    /**
     * 重置
    */
    CreateRoomPwdPanel.prototype.reset = function () {
        if (this._maxCarryList) {
            this._selectedId = this._maxCarryList[0].id;
            this.ante1ToggleSwitch.label = qin.MathUtil.formatNum(this._maxCarryList[0].ante[0]);
            this.ante2ToggleSwitch.label = qin.MathUtil.formatNum(this._maxCarryList[0].ante[1]);
            this.ante3ToggleSwitch.label = qin.MathUtil.formatNum(this._maxCarryList[0].ante[2]);
            this.ante4ToggleSwitch.label = qin.MathUtil.formatNum(this._maxCarryList[0].ante[3]);
        }
        if (this.selectedAnte) {
            this.selectedAnte.selected = false;
        }
        this._ante = 0;
        this.ante1ToggleSwitch.selected = true;
        this.selectedAnte = this.ante1ToggleSwitch;
    };
    /**
     * 点击事件处理
    */
    CreateRoomPwdPanel.prototype.onClickHandler = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        switch (event.target) {
            case this.ante1ToggleSwitch:
                this._ante = this.changeToNum(this.ante1ToggleSwitch.label);
                this.changSelectAnte(this.ante1ToggleSwitch);
                break;
            case this.ante2ToggleSwitch:
                this._ante = this.changeToNum(this.ante2ToggleSwitch.label);
                this.changSelectAnte(this.ante2ToggleSwitch);
                break;
            case this.ante3ToggleSwitch:
                this._ante = this.changeToNum(this.ante3ToggleSwitch.label);
                this.changSelectAnte(this.ante3ToggleSwitch);
                break;
            case this.ante4ToggleSwitch:
                this._ante = this.changeToNum(this.ante4ToggleSwitch.label);
                this.changSelectAnte(this.ante4ToggleSwitch);
                break;
        }
    };
    /**
     * 更改前注选中项
    */
    CreateRoomPwdPanel.prototype.changSelectAnte = function (selectAnte) {
        if (!this.selectedAnte) {
            selectAnte.selected = true;
            this.selectedAnte = selectAnte;
        }
        else {
            if (selectAnte != this.selectedAnte) {
                this.selectedAnte.selected = false;
                selectAnte.selected = true;
                this.selectedAnte = selectAnte;
            }
            else {
                this.selectedAnte.selected = !this.selectedAnte.selected;
            }
        }
    };
    /**
     * 去掉万  亿
    */
    CreateRoomPwdPanel.prototype.changeToNum = function (str) {
        var w = str.indexOf("万");
        var y = str.indexOf("亿");
        if (w == -1 && y == -1) {
            return parseInt(str);
        }
        else {
            if (w != -1) {
                return parseInt(str) * 10000;
            }
            if (y != -1) {
                return parseInt(str) * 100000000;
            }
            return null;
        }
    };
    /**
     * 输入密码框点击事件
    */
    CreateRoomPwdPanel.prototype.changeIndex = function () {
        UIManager.showPanel(UIModuleName.KeyBoardPanel, { callback: this.callback, target: this, isbgNotCanClick: false });
        this.verticalCenter = -300;
    };
    /**
     * 获取最大携带数数据和前注数据
    */
    CreateRoomPwdPanel.prototype.getMaxCarrayInfo = function () {
        if (this.panelData) {
            if (this.panelData.playWay == PlayWayType.Omaha) {
                this._maxCarryList = RoomDefined.GetInstance().getInfoByType(PlayingFieldType.OmahaPersonal);
            }
            else if (this.panelData.playWay == PlayWayType.PlayField) {
                this._maxCarryList = RoomDefined.GetInstance().getInfoByType(PlayingFieldType.PlayFieldPersonal);
            }
        }
        if (this._maxCarryList) {
            this.reset();
            this.blindHS.maximum = this._maxCarryList.length - 1;
            this.blindHS.value = 0;
            var roomInfo = new RoomDefinition();
            roomInfo = this._maxCarryList[0];
            this.setAnte(this._maxCarryList[0].id);
            this.blindLabel.text = qin.MathUtil.formatNum(roomInfo.sBlind) + "/" + qin.MathUtil.formatNum(roomInfo.bBlind);
            this.sBuyLabel.text = qin.MathUtil.formatNum(roomInfo.sBuyin);
        }
    };
    /**
     * 创建私人房
    */
    CreateRoomPwdPanel.prototype.createRoom = function (event) {
        SoundManager.playButtonEffect(event.target);
        var str = this.getRoomPwd();
        if (str == "") {
            AlertManager.showAlert("请先输入6位数的密码再创建房间！");
            return;
        }
        if (str && str.length < 6) {
            AlertManager.showAlert("请先输入6位数的密码再创建房间！");
            return;
        }
        else if (this._selectedId != undefined) {
            var roomInfo = RoomDefined.GetInstance().getDefinition(this._selectedId);
            if (roomInfo) {
                if (UserManager.userInfo.gold < roomInfo.sBuyin) {
                    AlertManager.showAlert("您的金币不足" + qin.MathUtil.formatNum(roomInfo.sBuyin) + ",请补充金币或者选择较低场次。");
                    return;
                }
            }
            PlayingFieldManager.reqCreatePersonalRoom(this._selectedId, str, this._ante);
        }
        else {
            AlertManager.showAlert("请选择盲注级别！");
        }
    };
    /**
     * 还原y轴位置
    */
    CreateRoomPwdPanel.prototype.restoreY = function () {
        this.verticalCenter = 0;
    };
    return CreateRoomPwdPanel;
}(EnterRoomPwdPanel));
__reflect(CreateRoomPwdPanel.prototype, "CreateRoomPwdPanel");
//# sourceMappingURL=CreateRoomPwdPanel.js.map