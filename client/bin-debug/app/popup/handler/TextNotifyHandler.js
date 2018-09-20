var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 文字公告
 */
var TextNotifyHandler = (function () {
    function TextNotifyHandler() {
        this.ReloadThreshold = 1800 * 1000; //重新加载公告阀值
        //
        this._textNotifyTime = new Date();
        this._textNotify = null;
        this._isLoginNotifyed = false;
    }
    Object.defineProperty(TextNotifyHandler.prototype, "isLoginNotifyed", {
        get: function () {
            return this._isLoginNotifyed;
        },
        set: function (value) {
            this._isLoginNotifyed = value;
        },
        enumerable: true,
        configurable: true
    });
    TextNotifyHandler.prototype.createTextNotify = function () {
        if (this._textNotify == null) {
            this._textNotify = new TextDefinition();
            this._textNotify.title = "公  告";
        }
    };
    //------------------------------------------------------------------
    // 文字公告
    //------------------------------------------------------------------
    /**
     * 显示文字公告
     */
    TextNotifyHandler.prototype.showTextNotify = function () {
        if (VersionManager.isSafe || qin.System.isLocalhost) {
            this.onTextNotifyException();
            return;
        }
        if (!this._textNotify || Date.now() - this._textNotifyTime.getTime() > this.ReloadThreshold) {
            var url = ProjectDefined.GetInstance().getNoticeUrl(GameSetting.AppId);
            RES.getResByUrl(url, this.OnTextNotifyComplete, this, RES.ResourceItem.TYPE_TEXT);
        }
        else {
            UIManager.showPanel(UIModuleName.TextInfoPanel, this._textNotify);
        }
    };
    TextNotifyHandler.prototype.OnTextNotifyComplete = function (data) {
        this._textNotifyTime.setTime(Date.now());
        if (data) {
            this.createTextNotify();
            this._textNotify.text = qin.StringUtil.format(data, ChannelManager.appName);
            UIManager.showPanel(UIModuleName.TextInfoPanel, this._textNotify);
        }
        else {
            this.onTextNotifyException();
        }
    };
    TextNotifyHandler.prototype.onTextNotifyException = function (error) {
        UIManager.showFloatTips("当前没有公告");
    };
    /**
     * 显示登录公告
     */
    TextNotifyHandler.prototype.loginTextNotify = function (checkCallBack, thisObj) {
        this._checkNextCallBack = checkCallBack;
        this._checkNextThisObj = thisObj;
        if ((VersionManager.isSafe || qin.System.isLocalhost)) {
            qin.Console.log("编辑器运行和安全开关开启不自动加载公告");
            qin.FuncUtil.invoke(this._checkNextCallBack, this._checkNextThisObj);
            return false;
        }
        var url = ProjectDefined.GetInstance().getNoticeUrl(GameSetting.AppId);
        RES.getResByUrl(url, this.onLoginNotifyComplete, this, RES.ResourceItem.TYPE_TEXT);
    };
    TextNotifyHandler.prototype.onLoginNotifyComplete = function (data) {
        this._textNotifyTime.setTime(Date.now());
        if (data) {
            var storageData = PrefsManager.getValue(PrefsManager.LoginTextNotify);
            if (storageData) {
                try {
                    storageData = JSON.parse(storageData);
                }
                catch (e) {
                    qin.Console.log("文字公告本地数据存储异常！storageData：" + storageData);
                }
            }
            var nowMd5 = qin.Crypt.hex_md5(data);
            var isShow = false;
            if (storageData) {
                if (storageData.md5 != nowMd5) {
                    isShow = true;
                }
                else {
                    var time = parseInt(storageData.time);
                    if (Date.now() - time > 3600 * 3 * 1000) {
                        isShow = true;
                    }
                }
            }
            else {
                isShow = true;
            }
            if (isShow) {
                PrefsManager.setValue(PrefsManager.LoginTextNotify, JSON.stringify({ time: Date.now().toString(), md5: nowMd5 }));
                this.createTextNotify();
                if (!qin.StringUtil.isNullOrEmpty(data)) {
                    this._textNotify.text = qin.StringUtil.format(data, ChannelManager.appName);
                }
                else {
                    this._textNotify.text = qin.StringConstants.Empty;
                }
                UIManager.showPanel(UIModuleName.TextInfoPanel, this._textNotify);
            }
            else {
                qin.FuncUtil.invoke(this._checkNextCallBack, this._checkNextThisObj);
            }
        }
        else {
            qin.FuncUtil.invoke(this._checkNextCallBack, this._checkNextThisObj);
        }
    };
    return TextNotifyHandler;
}());
__reflect(TextNotifyHandler.prototype, "TextNotifyHandler");
//# sourceMappingURL=TextNotifyHandler.js.map