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
 * 获得道具渲染项
 */
var GetItemComponent = (function (_super) {
    __extends(GetItemComponent, _super);
    function GetItemComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetItemComponent.prototype.initInfo = function (info) {
        this.itemComp.init(info.id, 100, SheetSubName.GetItemBg);
        var itemDef = ItemDefined.GetInstance().getDefinition(info.id);
        if (itemDef) {
            this.nameLabel.text = itemDef.name + " * " + info.count;
        }
    };
    return GetItemComponent;
}(BaseComponent));
__reflect(GetItemComponent.prototype, "GetItemComponent");
//# sourceMappingURL=GetItemComponent.js.map