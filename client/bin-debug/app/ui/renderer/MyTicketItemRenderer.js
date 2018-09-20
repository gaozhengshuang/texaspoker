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
 * 添加好友项面板
*/
var MyTicketItemRenderer = (function (_super) {
    __extends(MyTicketItemRenderer, _super);
    function MyTicketItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.MyTicketItemRenderer;
        return _this;
    }
    MyTicketItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (InfoUtil.checkAvailable(this.bindData)) {
            this.commonItem.init(this.bindData.definition.icon + ResSuffixName.PNG, 100);
            this.nameLabel.text = this.bindData.definition.name;
            this.desLabel.text = this.bindData.definition.des;
            this.numLabel.text = this.bindData.count.toString();
        }
    };
    return MyTicketItemRenderer;
}(BaseItemRenderer));
__reflect(MyTicketItemRenderer.prototype, "MyTicketItemRenderer");
//# sourceMappingURL=MyTicketItemRenderer.js.map