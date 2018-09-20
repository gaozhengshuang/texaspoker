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
 * 首充组件
 */
var FirstPayItemComponent = (function (_super) {
    __extends(FirstPayItemComponent, _super);
    function FirstPayItemComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FirstPayItemComponent.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
    };
    FirstPayItemComponent.prototype.rendererStart = function (event) {
        _super.prototype.rendererStart.call(this, event);
        if (this.bindData) {
            var itemDef = ItemDefined.GetInstance().getDefinition(this.bindData.id);
            if (itemDef) {
                this.nameLabel.text = itemDef.name;
                this.itemComp.init(itemDef.icon + ResSuffixName.PNG, 130, null, false, true);
            }
            this.countLabel.text = qin.MathUtil.numAddSpace(this.bindData.count);
        }
    };
    return FirstPayItemComponent;
}(BaseComponent));
__reflect(FirstPayItemComponent.prototype, "FirstPayItemComponent");
//# sourceMappingURL=FirstPayItemComponent.js.map