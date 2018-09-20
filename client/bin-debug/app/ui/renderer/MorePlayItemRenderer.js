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
 * 更多玩法列表渲染项
 */
var MorePlayItemRenderer = (function (_super) {
    __extends(MorePlayItemRenderer, _super);
    function MorePlayItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.MorePlayItemRenderer;
        return _this;
    }
    MorePlayItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refresh();
    };
    MorePlayItemRenderer.prototype.refresh = function () {
        if (this.bindData) {
            this.itemTitleLabel.text = this.bindData.name;
            this.itemDesLabel.text = this.bindData.des;
            this.morePlayIcon.source = this.bindData.icon + ResSuffixName.PNG;
            this.playWayBtn.visible = this.bindData.desId != undefined;
        }
    };
    MorePlayItemRenderer.prototype.onClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (event.target == this.playWayBtn) {
            UIManager.showPanel(UIModuleName.TextInfoPanel, this.bindData.desId);
        }
        else {
            if (this.bindData.id == MorePlay.Omaha) {
                UIManager.showPanel(UIModuleName.PlayingFieldPanel, { playWay: PlayWayType.Omaha, prevPanelName: UIModuleName.MorePlayPanel });
            }
        }
    };
    MorePlayItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    return MorePlayItemRenderer;
}(BaseItemRenderer));
__reflect(MorePlayItemRenderer.prototype, "MorePlayItemRenderer");
//# sourceMappingURL=MorePlayItemRenderer.js.map