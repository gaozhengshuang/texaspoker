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
 * 数字组件
 */
var NumComponent = (function (_super) {
    __extends(NumComponent, _super);
    function NumComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
    };
    NumComponent.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (this.bindData) {
            this.label1.text = this.bindData.toString();
        }
    };
    NumComponent.prototype.refresh = function (num) {
        if (this.label1) {
            if (num != undefined) {
                this.label1.text = num.toString();
            }
            else {
                this.label1.text = qin.StringConstants.Empty;
            }
        }
    };
    return NumComponent;
}(BaseComponent));
__reflect(NumComponent.prototype, "NumComponent");
//# sourceMappingURL=NumComponent.js.map