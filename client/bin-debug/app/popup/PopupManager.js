var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 弹窗管理
 */
var PopupManager = (function () {
    function PopupManager() {
    }
    PopupManager.initialize = function () {
        if (!PopupManager._popupList) {
            PopupManager._popupList = new Array();
            var info = new PopupInfo();
            info.type = PopupType.CreateRole;
            //大厅面板打开 创建角色面板弹出
            info.triggerType.push(PopupTriggerType.OpenPanel);
            info.triggerParams.push(UIModuleName.GameHallPanel);
            PopupManager._popupList.push(info);
            info = new PopupInfo();
            info.type = PopupType.Guide;
            //大厅面板打开||关闭创建角色面板 触发引导
            info.triggerType.push(PopupTriggerType.OpenPanel, PopupTriggerType.ClosePanel);
            info.triggerParams.push(UIModuleName.GameHallPanel, UIModuleName.CreateRolePanel);
            PopupManager._popupList.push(info);
            info = new PopupInfo();
            info.type = PopupType.TextNotify;
            info.isDelay = true;
            //大厅面板打开||引导完成||关闭创建角色面板 触发文字公告
            info.triggerType.push(PopupTriggerType.OpenPanel, PopupTriggerType.ClosePanel, PopupTriggerType.GuideComplete);
            info.triggerParams.push(UIModuleName.GameHallPanel, UIModuleName.CreateRolePanel, 1);
            PopupManager._popupList.push(info);
            info = new PopupInfo();
            info.type = PopupType.ImageNotify;
            info.isDelay = true;
            //大厅面板打开||文字公告面板关闭||引导完成 触发图片公告
            info.triggerType.push(PopupTriggerType.OpenPanel, PopupTriggerType.ClosePanel, PopupTriggerType.GuideComplete);
            info.triggerParams.push(UIModuleName.GameHallPanel, UIModuleName.TextInfoPanel, 1);
            PopupManager._popupList.push(info);
            info = new PopupInfo();
            info.type = PopupType.SignIn;
            info.isDelay = true;
            //打开大厅面板||关闭图片公告 ||关闭文字公告面板||引导完成
            info.triggerType.push(PopupTriggerType.OpenPanel, PopupTriggerType.ClosePanel, PopupTriggerType.ClosePanel, PopupTriggerType.GuideComplete);
            info.triggerParams.push(UIModuleName.GameHallPanel, UIModuleName.ImgNotifyPanel, UIModuleName.TextInfoPanel, 1);
            PopupManager._popupList.push(info);
            info = new PopupInfo();
            info.type = PopupType.FirstPay;
            info.isDelay = true;
            //大厅面板打开||图片公告关闭||文字公告面板关闭||签到面板关闭||引导完成
            info.triggerType.push(PopupTriggerType.OpenPanel, PopupTriggerType.ClosePanel, PopupTriggerType.ClosePanel, PopupTriggerType.ClosePanel, PopupTriggerType.GuideComplete);
            info.triggerParams.push(UIModuleName.GameHallPanel, UIModuleName.ImgNotifyPanel, UIModuleName.TextInfoPanel, UIModuleName.SignInPanel, 1);
            PopupManager._popupList.push(info);
        }
        PopupManager._popupList.sort(function (a, b) {
            if (a.type > b.type) {
                return 1;
            }
            if (a.type < b.type) {
                return -1;
            }
            return 0;
        });
        UIManager.onPanelOpenEvent.addListener(PopupManager.onPanelOpenHandler, this);
        UIManager.onPanelCloseEvent.addListener(PopupManager.onPanelCloseHandler, this);
        GuideManager.onSetGuideStepEvent.addListener(PopupManager.onGuideStepHandler, this);
    };
    /**
     * 检测
     */
    PopupManager.check = function (type, params) {
        var info;
        for (var i = 0; i < PopupManager._popupList.length; i++) {
            info = PopupManager._popupList[i];
            if (!info.isPopuped) {
                var paramsIndex = info.triggerParams.indexOf(params);
                if (paramsIndex != -1 && info.triggerType[paramsIndex] == type) {
                    info.isPopuped = true;
                    if (info.isDelay) {
                        qin.Tick.AddTimeoutInvoke(function () {
                            PopupManager.popup(info, type, params);
                        }, 50, this);
                    }
                    else {
                        PopupManager.popup(info, type, params);
                    }
                    if (i == PopupManager._popupList.length - 1) {
                        PopupManager.destory();
                    }
                    break;
                }
            }
        }
    };
    /**
     * 弹出窗口
     */
    PopupManager.popup = function (info, type, params) {
        switch (info.type) {
            case PopupType.CreateRole:
                if (!UserManager.userInfo.name || UserManager.userInfo.name.length <= 0) {
                    UIManager.showPanel(UIModuleName.CreateRolePanel);
                }
                else {
                    PopupManager.check(type, params);
                }
                break;
            case PopupType.Guide:
                GuideExecutor.checkGuide();
                if (!GuideExecutor.isOnGuide) {
                    PopupManager.check(type, params);
                }
                break;
            case PopupType.TextNotify:
                PopupManager.textNotify.loginTextNotify(function () {
                    PopupManager.check(type, params);
                }, this);
                break;
            case PopupType.ImageNotify:
                if (UserManager.isFirstLoginToday) {
                    var urlList = ActivityManager.getShowNoticeList();
                    if (urlList.length > 0) {
                        JumpUtil.JumpToNoticePanel(urlList);
                    }
                    else {
                        PopupManager.check(type, params);
                    }
                }
                else {
                    PopupManager.check(type, params);
                }
                break;
            case PopupType.SignIn:
                if (!ActivityManager.signInHandler.isSignToday()) {
                    JumpUtil.JumpToSignIn();
                }
                else {
                    PopupManager.check(type, params);
                }
                break;
            case PopupType.FirstPay:
                if (ActivityManager.payPrizeHandler.isShowFirstPay() && UserManager.isFirstLoginToday) {
                    JumpUtil.JumpToFirstPayPanel();
                }
                else {
                    PopupManager.check(type, params);
                }
                break;
        }
    };
    /**
     * 面板打开
     */
    PopupManager.onPanelOpenHandler = function (name) {
        if (PopupManager._popupList && !GuideExecutor.isOnGuide) {
            for (var _i = 0, _a = PopupManager._popupList; _i < _a.length; _i++) {
                var info = _a[_i];
                var paramsIndex = info.triggerParams.indexOf(name);
                if (paramsIndex != -1 && info.triggerType[paramsIndex] == PopupTriggerType.OpenPanel) {
                    PopupManager.check(PopupTriggerType.OpenPanel, name);
                    break;
                }
            }
        }
    };
    /**
     * 面板关闭
     */
    PopupManager.onPanelCloseHandler = function (name) {
        if (PopupManager._popupList && !GuideExecutor.isOnGuide) {
            for (var _i = 0, _a = PopupManager._popupList; _i < _a.length; _i++) {
                var info = _a[_i];
                var paramsIndex = info.triggerParams.indexOf(name);
                if (paramsIndex != -1 && info.triggerType[paramsIndex] == PopupTriggerType.ClosePanel) {
                    PopupManager.check(PopupTriggerType.ClosePanel, name);
                    break;
                }
            }
        }
    };
    /**
     * 新手引导完成
     */
    PopupManager.onGuideStepHandler = function (data) {
        var phase = GuideDefined.GetInstance().getMaxPhase(data.type);
        if (phase == data.id) {
            PopupManager.check(PopupTriggerType.GuideComplete, 1);
        }
    };
    PopupManager.destory = function () {
        UIManager.onPanelCloseEvent.removeListener(PopupManager.onPanelCloseHandler, this);
        UIManager.onPanelOpenEvent.removeListener(PopupManager.onPanelOpenHandler, this);
        GuideManager.onSetGuideStepEvent.removeListener(PopupManager.onGuideStepHandler, this);
    };
    PopupManager.reset = function () {
        if (PopupManager._popupList) {
            for (var _i = 0, _a = PopupManager._popupList; _i < _a.length; _i++) {
                var info = _a[_i];
                info.isPopuped = false;
            }
        }
    };
    /**
     * 文本公告
     */
    PopupManager.textNotify = new TextNotifyHandler();
    return PopupManager;
}());
__reflect(PopupManager.prototype, "PopupManager");
//# sourceMappingURL=PopupManager.js.map