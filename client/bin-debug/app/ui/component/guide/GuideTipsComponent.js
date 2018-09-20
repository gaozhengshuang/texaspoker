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
 * 引导文字说明组件
 */
var GuideTipsComponent = (function (_super) {
    __extends(GuideTipsComponent, _super);
    function GuideTipsComponent(skinName) {
        var _this = _super.call(this, skinName) || this;
        _this._arrowGap = 15;
        _this._textGap = 30;
        _this._bgGap = 66;
        _this._roUp = 180;
        _this._roDown = 0;
        _this._roLeft = 90;
        _this._roRight = 270;
        _this._aw = 31;
        _this._ah = 23;
        _this._defaultBh = 66;
        return _this;
    }
    GuideTipsComponent.get = function () {
        var component;
        if (GuideTipsComponent.cacheList.length > 0) {
            component = GuideTipsComponent.cacheList.pop();
        }
        else {
            component = new GuideTipsComponent(UIComponentSkinName.GuideTipsComponent);
        }
        component.alpha = 0;
        return component;
    };
    GuideTipsComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        // qin.FilterUtil.setColorFilters(this.circleBg, 0xffffff);
    };
    GuideTipsComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
        var def = data.data;
        if (!def) {
            qin.Console.log("引导组件提示初始化异常！" + data);
            return;
        }
        this.alpha = 0;
        egret.Tween.removeTweens(this);
        if (def.delay > 0) {
            qin.Tick.AddTimeoutInvoke(this.show, def.delay, this);
        }
        else {
            this.show();
        }
        this.textLabel.text = def.data;
        this.bg.width = this.textLabel.width + this._textGap;
        var bh = this.textLabel.height + this._textGap;
        if (bh < this._defaultBh) {
            bh = this._defaultBh;
        }
        this.bg.height = bh;
        this.width = this.bg.width + this._bgGap;
        this.height = this.bg.height + this._bgGap;
        this.arrowImg.horizontalCenter = this.arrowImg.verticalCenter = this.arrowImg.top = this.arrowImg.bottom = this.arrowImg.left = this.arrowImg.right = undefined;
        this.arrowImg.x = this.arrowImg.y = 0;
        switch (def.orientation) {
            case GuideTipsOrientation.Up:
                this.arrowImg.rotation = this._roUp;
                this.arrowImg.top = this._ah - 6.5;
                break;
            case GuideTipsOrientation.Down:
                this.arrowImg.rotation = this._roDown;
                this.arrowImg.bottom = this._ah - 4;
                break;
            case GuideTipsOrientation.Left:
                this.arrowImg.rotation = this._roLeft;
                this.arrowImg.left = this._aw / 2 + 1.7;
                this.arrowImg.verticalCenter = 0;
                break;
            case GuideTipsOrientation.Right:
                this.arrowImg.rotation = this._roRight;
                this.arrowImg.right = this._aw / 2 + 2;
                this.arrowImg.verticalCenter = 0;
                break;
        }
        if (def.xoffset != undefined) {
            this.x = def.xoffset;
        }
        if (def.yoffset != undefined) {
            this.y = def.yoffset;
        }
        //设置箭头位置
        if (def.ax != undefined) {
            this.arrowImg.x = def.ax;
        }
        if (def.ay != undefined) {
            this.arrowImg.y = def.ay;
        }
        if (data.parent) {
            data.parent.addChild(this);
        }
        this.showNum();
    };
    /**
     * 显示序号
     */
    GuideTipsComponent.prototype.showNum = function () {
        var def = this.bindData.data;
        if (def.num != undefined) {
            this.numGroup.visible = true;
            this.numLabel.text = def.num.toString();
            this.addChild(this.numGroup);
        }
        else {
            if (this.numGroup.parent) {
                this.numGroup.parent.removeChild(this.numGroup);
            }
        }
    };
    GuideTipsComponent.prototype.show = function () {
        var _this = this;
        var tween = egret.Tween.get(this);
        tween.to({ alpha: 1 }, 500).call(function () {
            var def = _this.bindData.data;
            if (def && def.showTime > 0) {
                qin.Tick.AddTimeoutInvoke(_this.disappear, def.showTime, _this);
            }
        }, this);
    };
    GuideTipsComponent.prototype.disappear = function () {
        var tween = egret.Tween.get(this);
        tween.to({ alpha: 0 }, 500);
    };
    GuideTipsComponent.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    /**
     * 如果没有必要，面板的所有事件移除需写在此方法内
     */
    GuideTipsComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        qin.Tick.RemoveTimeoutInvoke(this.show, this);
        qin.Tick.RemoveTimeoutInvoke(this.disappear, this);
        egret.Tween.removeTweens(this);
    };
    GuideTipsComponent.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.alpha = 1;
        this.bindData = undefined;
        GuideTipsComponent.cacheList.push(this);
    };
    GuideTipsComponent.clear = function () {
        GuideTipsComponent.cacheList.length = 0;
    };
    GuideTipsComponent.cacheList = new Array();
    return GuideTipsComponent;
}(BaseComponent));
__reflect(GuideTipsComponent.prototype, "GuideTipsComponent");
//# sourceMappingURL=GuideTipsComponent.js.map