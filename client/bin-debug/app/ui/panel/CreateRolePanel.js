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
 * 创建角色
*/
var CreateRolePanel = (function (_super) {
    __extends(CreateRolePanel, _super);
    function CreateRolePanel() {
        var _this = _super.call(this) || this;
        _this.radioGroup = new eui.RadioButtonGroup();
        _this.layer = UILayerType.Tips;
        _this.setSkinName(UIModuleName.CreateRolePanel);
        return _this;
    }
    CreateRolePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.nickNameLable.type = egret.TextFieldType.INPUT;
        this.manRadioBtn.label = "男";
        this.manRadioBtn.value = Sex.Male;
        this.manRadioBtn.selected = true;
        this.sex = this.manRadioBtn.value;
        this.manRadioBtn.group = this.radioGroup;
        this.womanRadioBtn.label = "女";
        this.womanRadioBtn.value = Sex.Female;
        this.womanRadioBtn.group = this.radioGroup;
        this.dealerImg.source = BundleManager.getResNameByBundle(ResFixedFileName.Dealer_Png);
    };
    CreateRolePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (ChannelManager.loginType == ChannelLoginType.Weixin && LoginManager.loginInfo.channeldata) {
            if (LoginManager.loginInfo.channeldata.hasOwnProperty("head")) {
                var head = LoginManager.loginInfo.channeldata["head"];
                if (head) {
                    UserManager.tryUpLoadWxHead(head);
                }
            }
            if (LoginManager.loginInfo.channeldata.hasOwnProperty("sex")) {
                this.radioGroup.selectedValue = this.sex = parseInt(LoginManager.loginInfo.channeldata["sex"]);
            }
            if (LoginManager.loginInfo.channeldata.hasOwnProperty("name")) {
                this.nickNameLable.text = LoginManager.loginInfo.channeldata["name"];
            }
            if (qin.StringUtil.isNullOrEmpty(this.nickNameLable.text)) {
                this.nickNameLable.text = NameDefined.GetInstance().getRandomNickName(this.sex);
            }
        }
        else {
            this.nickNameLable.text = NameDefined.GetInstance().getRandomNickName(this.sex);
        }
    };
    CreateRolePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.radioGroup.addEventListener(eui.UIEvent.CHANGE, this.sexRadioChangeHandler, this);
        this.manRadioBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sexRadioClickHandler, this);
        this.womanRadioBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sexRadioClickHandler, this);
        this.randomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.randomNameHandler, this);
        this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
        UserManager.onCreateRoleEvent.addListener(this.onCreateRoleHandler, this);
    };
    CreateRolePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.radioGroup.removeEventListener(eui.UIEvent.CHANGE, this.sexRadioChangeHandler, this);
        this.manRadioBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sexRadioClickHandler, this);
        this.womanRadioBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sexRadioClickHandler, this);
        this.randomBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.randomNameHandler, this);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
        UserManager.onCreateRoleEvent.removeListener(this.onCreateRoleHandler, this);
    };
    /**
     * 更改性别触发的操作
    */
    CreateRolePanel.prototype.sexRadioChangeHandler = function (event) {
        var radioGroup = event.target;
        var name;
        this.sex = radioGroup.selectedValue;
        this.nickNameLable.text = NameDefined.GetInstance().getRandomNickName(this.sex);
    };
    /**
     * 更改性别按钮点击播放声音
    */
    CreateRolePanel.prototype.sexRadioClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
    };
    /**
     * 点击随机按钮触发的操作
    */
    CreateRolePanel.prototype.randomNameHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        this.nickNameLable.text = NameDefined.GetInstance().getRandomNickName(this.sex);
    };
    /**
     * 点击进入游戏按钮触发的操作
    */
    CreateRolePanel.prototype.enterHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (UserUtil.isLegalNickName(this.nickNameLable.text)) {
            //首先验证是否重名
            UserManager.reqCreateRole(this.nickNameLable.text, this.sex);
        }
    };
    CreateRolePanel.prototype.onCreateRoleHandler = function () {
        if (qin.System.isWeb) {
            var code = URLOption.getString(URLOption.InviteCode);
            if (!qin.StringUtil.isNullOrEmpty(code)) {
                InviteManager.reqBindInviteCode(code);
            }
        }
        _super.prototype.onCloseBtnClickHandler.call(this, null);
    };
    return CreateRolePanel;
}(BasePanel));
__reflect(CreateRolePanel.prototype, "CreateRolePanel");
//# sourceMappingURL=CreateRolePanel.js.map