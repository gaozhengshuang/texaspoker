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
 * 设置面板
 */
var SetPanel = (function (_super) {
    __extends(SetPanel, _super);
    function SetPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.SetPanel);
        return _this;
    }
    SetPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        if (qin.System.isMicro) {
            this.autoVoiceGroup.visible = true;
            ;
            this.verticalGroup.addChildAt(this.autoVoiceGroup, 5);
        }
        else {
            if (this.autoVoiceGroup.parent) {
                this.autoVoiceGroup.parent.removeChild(this.autoVoiceGroup);
            }
        }
        if (qin.System.isMicro || qin.System.isWebVibrate) {
            this.verticalGroup.addChildAt(this.shockGroup, 5);
        }
        else {
            if (this.shockGroup.parent) {
                this.shockGroup.parent.removeChild(this.shockGroup);
            }
        }
        this.resizeScroller.viewport = this.verticalGroup;
        UIManager.pushResizeScroller(this.resizeScroller, 1130);
        UIManager.pushResizeGroup(this.resizeGroup);
    };
    SetPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.bgSoundTog.selected = SoundManager.bgEnabled;
        this.soundEffectTog.selected = SoundManager.effectEnabled;
        this.shakeTog.selected = GameSetting.shakeEnabled;
        this.autoVocieTog.selected = GameSetting.autoVoiceEnabled;
        var def;
        def = TextDefined.GetInstance().getDefinition(TextFixedId.Forum);
        if (def) {
            this.forum.text = def.text;
            this.forumTitle.text = def.title;
        }
        def = TextDefined.GetInstance().getDefinition(TextFixedId.QQ);
        if (def) {
            this.QQ.text = def.text;
            this.QQTitle.text = def.title;
        }
        def = TextDefined.GetInstance().getDefinition(TextFixedId.CustomerService);
        if (def) {
            this.customerService.text = def.text;
            this.customerServiceTitle.text = def.title;
        }
        if (UserManager.userInfo) {
            this.userNameLabel.text = UserManager.userInfo.name;
        }
        this.aboutLabel.text = VersionManager.getVersionStr();
    };
    SetPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
        this.bgSoundTog.addEventListener(egret.Event.CHANGE, this.closeBgSoundHandler, this);
        this.soundEffectTog.addEventListener(egret.Event.CHANGE, this.closeSoundEffectHandler, this);
        this.reLoginLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reLoginClickHandler, this);
        this.shakeTog.addEventListener(egret.Event.CHANGE, this.changeShake, this);
        this.autoVocieTog.addEventListener(egret.Event.CHANGE, this.changeAutoVoice, this);
    };
    SetPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
        this.bgSoundTog.removeEventListener(egret.Event.CHANGE, this.closeBgSoundHandler, this);
        this.soundEffectTog.removeEventListener(egret.Event.CHANGE, this.closeSoundEffectHandler, this);
        this.reLoginLabel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reLoginClickHandler, this);
        this.shakeTog.removeEventListener(egret.Event.CHANGE, this.changeShake, this);
        this.autoVocieTog.removeEventListener(egret.Event.CHANGE, this.changeAutoVoice, this);
    };
    SetPanel.prototype.closeBgSoundHandler = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        SoundManager.bgEnabled = this.bgSoundTog.selected;
    };
    SetPanel.prototype.closeSoundEffectHandler = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        SoundManager.effectEnabled = this.soundEffectTog.selected;
    };
    SetPanel.prototype.reLoginClickHandler = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        ChannelManager.logout();
    };
    SetPanel.prototype.changeShake = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        GameSetting.shakeEnabled = this.shakeTog.selected;
    };
    SetPanel.prototype.changeAutoVoice = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        GameSetting.autoVoiceEnabled = this.autoVocieTog.selected;
    };
    SetPanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    return SetPanel;
}(BasePanel));
__reflect(SetPanel.prototype, "SetPanel");
//# sourceMappingURL=SetPanel.js.map