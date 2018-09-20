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
 * 编辑资料面板
 */
var EditUserInfoPanel = (function (_super) {
    __extends(EditUserInfoPanel, _super);
    function EditUserInfoPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.EditUserInfoPanel);
        return _this;
    }
    /**
 * 皮肤文件加载完成时调用，仅面板初始化调用一次
 * */
    EditUserInfoPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.sexButtonGroup = new eui.RadioButtonGroup();
        this.sexMaleButton.group = this.sexButtonGroup;
        this.sexMaleButton.value = Sex.Male;
        this.sexFemaleButton.group = this.sexButtonGroup;
        this.sexFemaleButton.value = Sex.Female;
        this.sexUnkonwnButton.group = this.sexButtonGroup;
        this.sexUnkonwnButton.value = Sex.Unknown;
        this._headInfo = new SimpleHeadInfo();
    };
    EditUserInfoPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.sexButtonGroup.selectedValue = UserManager.userInfo.sex;
        this.ageLabel.inputType = egret.TextFieldInputType.TEL;
        this.ageLabel.restrict = "0-9";
        this.ageLabel.maxChars = 2;
    };
    EditUserInfoPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.refreshInfo();
    };
    EditUserInfoPanel.prototype.refreshInfo = function () {
        this.refreshHead();
        this.ageLabel.text = UserManager.userInfo.age.toString();
        this.sexLabel.text = this.sexButtonGroup.getRadioButtonAt(UserManager.userInfo.sex).label;
    };
    EditUserInfoPanel.prototype.refreshHead = function () {
        if (qin.StringUtil.isNullOrEmpty(UserManager.userInfo.verifyHead)) {
            this._headInfo.head = UserManager.userInfo.head;
        }
        else {
            this._headInfo.head = UserManager.userInfo.verifyHead;
        }
        this._headInfo.sex = UserManager.userInfo.sex;
        this.userHeadComp.init(this._headInfo);
        this.addheadlabel.visible = false;
        this.verifyLabel.visible = false;
        this.userHeadComp.touchEnabled = true;
        if (UserManager.userInfo.isHeadVerify) {
            this.headMask.visible = true;
            this.verifyLabel.text = "审核中";
            this.verifyLabel.visible = true;
            this.userHeadComp.touchEnabled = false;
        }
        else if (UserManager.userInfo.isHeadUnPass) {
            this.headMask.visible = true;
            this.verifyLabel.text = "未通过";
            this.verifyLabel.visible = true;
        }
        else {
            this.headMask.visible = false;
            this.addheadlabel.visible = false;
        }
    };
    EditUserInfoPanel.prototype.reqSaveEdit = function () {
        var userDes = null;
        var userSex = undefined;
        var userAge = undefined;
        if (this.sexButtonGroup.selectedValue != UserManager.userInfo.sex) {
            userSex = this.sexButtonGroup.selectedValue;
        }
        if (this.ageLabel.text != qin.StringConstants.Empty && parseInt(this.ageLabel.text) != UserManager.userInfo.age) {
            userAge = parseInt(this.ageLabel.text);
        }
        UserManager.reqSetUserInfo(userDes, userSex, userAge);
    };
    EditUserInfoPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.sexButtonGroup.addEventListener(egret.Event.CHANGE, this.changeActive, this);
        UploadHeadManager.OnUploadHeadUpdate.addListener(this.refreshHead, this); //需要审核通过才能变更头像
        UserManager.headImageUpdateEvent.addListener(this.refreshHead, this);
    };
    EditUserInfoPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.sexButtonGroup.removeEventListener(egret.Event.CHANGE, this.changeActive, this);
        //UserHeadManager.clear();
        UserManager.headImageUpdateEvent.removeListener(this.refreshHead, this);
        UploadHeadManager.OnUploadHeadUpdate.removeListener(this.refreshHead, this);
        UploadHeadManager.clear();
    };
    /**
     * 点击面板按钮事件处理
    */
    EditUserInfoPanel.prototype.clickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (this.sexGroup.visible) {
            this.sexGroup.visible = false;
        }
        switch (event.target) {
            case this.closeButton:
                this.reqSaveEdit();
                break;
            case this.sexLabel:
            case this.showSexSelect:
                this.sexGroup.visible = true;
                break;
            case this.userHeadComp:
                UploadHeadManager.selectHead();
                break;
        }
    };
    /**
     * 改变选项卡按钮状态
    */
    EditUserInfoPanel.prototype.changeActive = function (event) {
        this.sexLabel.text = this.sexButtonGroup.selection.label;
    };
    return EditUserInfoPanel;
}(BasePanel));
__reflect(EditUserInfoPanel.prototype, "EditUserInfoPanel");
/**
 * 简单头像信息
 */
var SimpleHeadInfo = (function () {
    function SimpleHeadInfo() {
    }
    return SimpleHeadInfo;
}());
__reflect(SimpleHeadInfo.prototype, "SimpleHeadInfo", ["IBaseHead"]);
//# sourceMappingURL=EditUserInfoPanel.js.map