var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 活动触发处理器
 */
var ActivityTriggerHandler = (function () {
    function ActivityTriggerHandler() {
        this._registerList = new Array();
        this._propMap = new qin.Dictionary();
    }
    ActivityTriggerHandler.prototype.initialize = function () {
        this.onEnable();
    };
    /**
    * 注册触发事件
    */
    ActivityTriggerHandler.prototype.register = function (info) {
        if (InfoUtil.checkAvailable(info) && info.definition.triggerType != ActivityTriggerType.None) {
            for (var _i = 0, _a = this._registerList; _i < _a.length; _i++) {
                var childInfo = _a[_i];
                if (childInfo.id == info.id) {
                    return;
                }
            }
            this._registerList.push(info);
        }
    };
    /**
     * 取消注册
     */
    ActivityTriggerHandler.prototype.unRegister = function (info) {
        qin.ArrayUtil.RemoveItem(info, this._registerList);
    };
    ActivityTriggerHandler.prototype.onEnable = function () {
        UIManager.onPanelOpenEvent.addListener(this.onPanelOpenHandler, this);
        UIManager.onPanelCloseEvent.addListener(this.onPanelCloseHandler, this);
    };
    ActivityTriggerHandler.prototype.onDisable = function () {
        UIManager.onPanelOpenEvent.removeListener(this.onPanelOpenHandler, this);
        UIManager.onPanelCloseEvent.removeListener(this.onPanelCloseHandler, this);
    };
    ActivityTriggerHandler.prototype.onPanelOpenHandler = function (panelName) {
        for (var _i = 0, _a = this._registerList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.definition && info.definition.triggerType == ActivityTriggerType.Click && info.definition.triggerParams) {
                if (info.definition.triggerParams.length > 0) {
                    var triggerPanelName = info.definition.triggerParams[0];
                    if (triggerPanelName == panelName) {
                        var panel = UIManager.getPanel(triggerPanelName);
                        if (panel) {
                            var params = info.definition.triggerParams.concat();
                            params.shift();
                            var prop = qin.ObjectUtil.getTreeProperty(panel, params);
                            if (prop) {
                                prop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.triggerActivity, this);
                                this._propMap.add(prop, info);
                            }
                            else {
                                qin.Console.log("开启触发组件未找到 面板名：" + panel + "---参数：" + params);
                            }
                        }
                        else {
                            qin.Console.log("活动触发配置clik类型参数异常！面板未找到" + info.definition.trigger);
                        }
                    }
                }
            }
        }
    };
    ActivityTriggerHandler.prototype.onPanelCloseHandler = function (panelName) {
        for (var _i = 0, _a = this._registerList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.definition && info.definition.triggerType == ActivityTriggerType.Click && info.definition.triggerParams) {
                if (info.definition.triggerParams.length > 0) {
                    var triggerPanelName = info.definition.triggerParams[0];
                    if (triggerPanelName == panelName) {
                        var panel = UIManager.getPanel(triggerPanelName);
                        if (panel) {
                            var params = info.definition.triggerParams.concat();
                            params.shift();
                            var prop = qin.ObjectUtil.getTreeProperty(panel, params);
                            if (prop) {
                                prop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.triggerActivity, this);
                                this._propMap.remove(prop);
                            }
                            else {
                                qin.Console.log("关闭触发组件未找到 面板名：" + panel + "---参数：" + params);
                            }
                        }
                        else {
                            qin.Console.log("活动触发配置clik类型参数异常！面板未找到" + info.definition.trigger);
                        }
                    }
                }
            }
        }
    };
    ActivityTriggerHandler.prototype.triggerActivity = function (event) {
        var info = this._propMap.getValue(event.currentTarget);
        if (InfoUtil.checkAvailable(info)) {
            if (info.definition.panelName) {
                ActivityPanelJumpManager.JumpToPanel(info);
                //UIManager.showPanel(info.definition.panelName, { info: info });
            }
            else {
                qin.Console.log("活动面板绑定异常！" + info.definition.panelName);
            }
        }
    };
    ActivityTriggerHandler.prototype.clear = function () {
        qin.ArrayUtil.Clear(this._registerList);
        this._propMap.clear();
    };
    return ActivityTriggerHandler;
}());
__reflect(ActivityTriggerHandler.prototype, "ActivityTriggerHandler");
//# sourceMappingURL=ActivityTriggerHandler.js.map