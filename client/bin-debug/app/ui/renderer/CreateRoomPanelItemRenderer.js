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
 * 创建房间游戏renderer
 */
var CreateRoomPanelItemRenderer = (function (_super) {
    __extends(CreateRoomPanelItemRenderer, _super);
    function CreateRoomPanelItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.CreateRoomPanelRenderer;
        return _this;
    }
    CreateRoomPanelItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data) {
            this.radioBtn1.label = this.data.des;
            this.radioBtn1.groupName = this.data.groupName;
            this.costImg.visible = this.costLabel.visible = this.data.isRound;
            if (this.costLabel.visible) {
                this.costLabel.text = "房卡(     x" + (this.data.num / 8).toString() + ")";
                var label = this.radioBtn1.labelDisplay;
            }
        }
    };
    return CreateRoomPanelItemRenderer;
}(BaseItemRenderer));
__reflect(CreateRoomPanelItemRenderer.prototype, "CreateRoomPanelItemRenderer");
//# sourceMappingURL=CreateRoomPanelItemRenderer.js.map