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
 * 游戏场面板房间列表项渲染
 */
var PlayingFieldItemRenderer = (function (_super) {
    __extends(PlayingFieldItemRenderer, _super);
    function PlayingFieldItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.PlayingFieldItemRenderer;
        return _this;
    }
    PlayingFieldItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        for (var i = 0; i < 9; i++) {
            this["toggleBtn" + i].visible = false;
            this["toggleBtn" + i].touchEnabled = false;
        }
        if (InfoUtil.checkAvailable(this.bindData)) {
            this.anteLabel.visible = false;
            if (this.itemIndex == (PlayingFieldManager.roomList.length - 1)) {
                this.bottomLineImg.visible = true;
            }
            else {
                this.bottomLineImg.visible = false;
            }
            if (this.bindData.id.toString().length < 5) {
                this.roomIdLabel.text = PlayingFieldManager.roomIdAddZero(this.bindData.id);
            }
            else {
                this.roomIdLabel.text = this.bindData.id.toString();
            }
            this.blindLabel.text = qin.MathUtil.formatNum(this.bindData.definition.sBlind) + "/" + qin.MathUtil.formatNum(this.bindData.definition.bBlind);
            if (this.bindData.definition.bBuyin) {
                this.buyLabel.text = qin.MathUtil.formatNum(this.bindData.definition.sBuyin) + "/" + qin.MathUtil.formatNum(this.bindData.definition.bBuyin);
            }
            else {
                this.buyLabel.text = qin.MathUtil.formatNum(this.bindData.definition.sBuyin);
            }
            this.setRoomPattern();
            for (var i = 0; i < this.bindData.definition.seat; i++) {
                this["toggleBtn" + i].visible = true;
                this["toggleBtn" + i].selected = false;
            }
            for (var j = 0; j < this.bindData.player; j++) {
                this["toggleBtn" + j].selected = true;
            }
        }
    };
    /**
     * 设置房间模式
    */
    PlayingFieldItemRenderer.prototype.setRoomPattern = function () {
        switch (this.bindData.definition.pattern) {
            case GamblingPattern.AllIn:
                this.patternImage.source = SheetSubName.AllInImg;
                break;
            case GamblingPattern.Fast:
                this.patternImage.source = SheetSubName.FastImg;
                break;
            case GamblingPattern.Ante:
                this.patternImage.source = SheetSubName.AnteImg;
                this.anteLabel.visible = true;
                this.anteLabel.text = qin.MathUtil.formatNum(this.bindData.ante);
                break;
            case GamblingPattern.NoUpperLimit:
                this.patternImage.source = "";
                break;
            case GamblingPattern.Personal:
                this.patternImage.source = SheetSubName.PersonalImg;
                break;
            default:
                this.patternImage.source = "";
                break;
        }
    };
    return PlayingFieldItemRenderer;
}(BaseItemRenderer));
__reflect(PlayingFieldItemRenderer.prototype, "PlayingFieldItemRenderer");
//# sourceMappingURL=PlayingFieldItemRenderer.js.map