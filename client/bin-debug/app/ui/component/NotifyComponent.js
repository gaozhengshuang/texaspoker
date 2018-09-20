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
 * 通知组件
 */
var NotifyComponent = (function (_super) {
    __extends(NotifyComponent, _super);
    function NotifyComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = NotifyType.Null;
        return _this;
    }
    NotifyComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
        if (this.bindData) {
            this.visible = false;
            this.type = this.bindData.type;
            if (this.bindData.top != undefined) {
                this.top = this.bindData.top;
            }
            else {
                this.top = 5;
            }
            if (this.bindData.right != undefined) {
                this.right = this.bindData.right;
            }
            else {
                this.right = 5; //默认右上
            }
            if (this.bindData.attachObject) {
                this.bindData.attachObject.addChild(this);
            }
        }
        this.refresh();
    };
    NotifyComponent.prototype.refresh = function () {
        this.checkVisible();
    };
    NotifyComponent.prototype.rendererStart = function (event) {
        _super.prototype.rendererStart.call(this, event);
        this.refresh();
    };
    NotifyComponent.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        NotifyManager.OnNotifyValueChanged.addListener(this.notifyManager_onNotifyValueChanged, this);
    };
    NotifyComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        NotifyManager.OnNotifyValueChanged.removeListener(this.notifyManager_onNotifyValueChanged, this);
    };
    NotifyComponent.prototype.notifyManager_onNotifyValueChanged = function (data) {
        if (this.type == data.type) {
            if (data.params != undefined) {
                if (data.params == this.bindData.params) {
                    this.showByCount(data.count);
                }
            }
            else {
                this.showByCount(data.count);
            }
            this.showNumLabel(data.count);
        }
    };
    NotifyComponent.prototype.checkVisible = function () {
        var count = NotifyManager.getCount(this.type, this.bindData.params);
        this.showByCount(count);
        this.showNumLabel(count);
    };
    NotifyComponent.prototype.showByCount = function (count) {
        this.visible = count > 0;
    };
    NotifyComponent.prototype.showNumLabel = function (count) {
        if (this.bindData.isShowNum) {
            this.numLabel.visible = true;
            this.numLabel.text = count.toString();
        }
        else {
            this.numLabel.visible = false;
        }
    };
    return NotifyComponent;
}(BaseComponent));
__reflect(NotifyComponent.prototype, "NotifyComponent");
//# sourceMappingURL=NotifyComponent.js.map