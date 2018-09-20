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
 * 场景加载切换面板
 */
var LoadingSwitchPanel = (function (_super) {
    __extends(LoadingSwitchPanel, _super);
    function LoadingSwitchPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.LoadingSwitchPanel);
        return _this;
    }
    LoadingSwitchPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    LoadingSwitchPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        var randomId = qin.MathUtil.getRandom(0, LoadingTextDefined.GetInstance().dataList.length - 1);
        var loadingTextDef = LoadingTextDefined.GetInstance().getDefinition(randomId);
        if (loadingTextDef) {
            this.textLabel.text = loadingTextDef.des;
        }
        this.loading.play();
        this._allowTimeout = appendData;
        this._time = egret.getTimer();
        this._isOut = false;
    };
    LoadingSwitchPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        if (this._allowTimeout) {
            qin.Tick.addFrameInvoke(this.update, this);
        }
    };
    LoadingSwitchPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.loading.pause();
        qin.Tick.removeFrameInvoke(this.update, this);
    };
    LoadingSwitchPanel.prototype.update = function (event) {
        if (this._allowTimeout && this._isOut == false) {
            var offsetTime = egret.getTimer() - this._time;
            if (offsetTime >= ProjectDefined.GetInstance().getValue(ProjectDefined.onTimeOut)) {
                this._isOut = true;
                UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
                UIManager.dispatchEvent(UIModuleName.LoadingSwitchPanel, UIModuleEvent.OnTimeout);
            }
        }
    };
    return LoadingSwitchPanel;
}(BasePanel));
__reflect(LoadingSwitchPanel.prototype, "LoadingSwitchPanel");
//# sourceMappingURL=LoadingSwitchPanel.js.map