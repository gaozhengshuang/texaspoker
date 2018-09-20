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
 * 通用组件
 */
var CommonIcon = (function (_super) {
    __extends(CommonIcon, _super);
    function CommonIcon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._defaultItemSize = 0.85;
        return _this;
    }
    CommonIcon.prototype.init = function (item, size, bg, isHighLight, hideBg) {
        if (typeof item == "string") {
            this.itemImg.source = item;
        }
        else if (typeof item == "number") {
            var def = ItemDefined.GetInstance().getDefinition(item);
            if (def) {
                this.itemImg.source = def.icon + ResSuffixName.PNG;
            }
        }
        else if (item && item.rewardList) {
            var id = item.rewardList[0].id;
            var def = ItemDefined.GetInstance().getDefinition(id);
            if (def) {
                this.itemImg.source = def.icon + ResSuffixName.PNG;
            }
        }
        if (size != undefined) {
            this.width = this.height = size;
            var scaleWidth = this._defaultItemSize * size / this.itemImg.width;
            var scaleHeight = this._defaultItemSize * size / this.itemImg.height;
            this.itemImg.scaleX = this.itemImg.scaleY = Math.min(scaleWidth, scaleHeight);
        }
        if (hideBg) {
            this.bgImg.visible = false;
        }
        else {
            this.bgImg.visible = true;
            if (bg != undefined) {
                this.bgImg.source = bg;
            }
            else {
                this.bgImg.source = SheetSubName.CommonItemBg;
            }
        }
        if (isHighLight != undefined) {
            this.highLightImg.visible = isHighLight;
        }
        else {
            this.highLightImg.visible = true;
        }
    };
    return CommonIcon;
}(BaseComponent));
__reflect(CommonIcon.prototype, "CommonIcon");
//# sourceMappingURL=CommonIcon.js.map