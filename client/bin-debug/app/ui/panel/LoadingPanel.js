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
/// <summary>
/// 转圈loading
/// </summary>
var LoadingPanel = (function (_super) {
    __extends(LoadingPanel, _super);
    function LoadingPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.LoadingPanel);
        return _this;
    }
    LoadingPanel.prototype.onAwake = function (event) {
        this.isTween = false;
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0.01;
        if (this.container.parent) {
            this.container.parent.removeChild(this.container);
        }
    };
    LoadingPanel.prototype.init = function (appendData) {
        this._allowTimeout = true;
        if (appendData) {
            this._allowTimeout = appendData;
        }
        this._time = egret.getTimer();
        this._isOut = false;
        if (this.container.parent) {
            this.container.parent.removeChild(this.container);
        }
        qin.Tick.AddTimeoutInvoke(this.delayShowContainer, 1000, this);
    };
    LoadingPanel.prototype.delayShowContainer = function () {
        this.addChild(this.container);
    };
    LoadingPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.setAnime();
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    LoadingPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeAnime();
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        qin.Tick.RemoveTimeoutInvoke(this.delayShowContainer, this);
    };
    LoadingPanel.prototype.update = function (event) {
        if (this._allowTimeout && this._isOut == false && this.container.parent) {
            var offsetTime = egret.getTimer() - this._time;
            if (offsetTime >= ProjectDefined.GetInstance().getValue(ProjectDefined.onTimeOut)) {
                this._isOut = true;
                UIManager.closePanel(UIModuleName.LoadingPanel);
                UIManager.dispatchEvent(UIModuleName.LoadingPanel, UIModuleEvent.OnTimeout);
            }
        }
    };
    LoadingPanel.prototype.setAnime = function () {
        egret.Tween.get(this.image, { loop: true })
            .set({ rotation: 0 })
            .to({ rotation: 360 }, 1000);
    };
    LoadingPanel.prototype.removeAnime = function () {
        egret.Tween.removeTweens(this.image);
    };
    return LoadingPanel;
}(BasePanel));
__reflect(LoadingPanel.prototype, "LoadingPanel");
//# sourceMappingURL=LoadingPanel.js.map