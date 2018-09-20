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
 * 更多玩法中心面板
 */
var MorePlayPanel = (function (_super) {
    __extends(MorePlayPanel, _super);
    function MorePlayPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.MorePlayPanel);
        return _this;
    }
    MorePlayPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        UIManager.pushResizeScroller(this.morePlayScroller, 1180);
        UIUtil.listRenderer(this.morePlayList, this.morePlayScroller, MorePlayItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    MorePlayPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.morePlayScroller.viewport.scrollV = 0;
        this.refreshList();
    };
    MorePlayPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
    };
    MorePlayPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
    };
    MorePlayPanel.prototype.refreshList = function () {
        var list = MorePlayDefined.GetInstance().getDefListInMorePlay();
        if (list) {
            UIUtil.writeListInfo(this.morePlayList, list, "id");
        }
    };
    MorePlayPanel.prototype.showPrePanelName = function () {
        if (this.prevPanelName == UIModuleName.GamblingPanel) {
            UIManager.showPanel(this.prevPanelName, true);
        }
        else {
            UIManager.showPanel(this.prevPanelName);
        }
    };
    MorePlayPanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    return MorePlayPanel;
}(BasePanel));
__reflect(MorePlayPanel.prototype, "MorePlayPanel");
//# sourceMappingURL=MorePlayPanel.js.map