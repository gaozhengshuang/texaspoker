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
 * 游戏规则面板
 */
var GameRulePanel = (function (_super) {
    __extends(GameRulePanel, _super);
    function GameRulePanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.GameRulePanel);
        return _this;
    }
    GameRulePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        //创建标签页
        var array = new Array();
        array.push(this.RuleIntroGroup);
        array.push(this.cardTypeGroup);
        array.push(this.resizeGroup);
        this.gameRullTab.build(TabComponent.CreatData(["玩法介绍", "牌型介绍", "功能键介绍"], array, TabButtonType.BigOf3));
        this.resizeScroller.viewport = this.resizeScrollerGroup;
        UIManager.pushResizeScroller(this.resizeScroller, 820);
        UIManager.pushResizeGroup(this.resizeBottomGroup);
        this.cardScroller.viewport = this.cardGroup;
        UIManager.pushResizeScroller(this.cardScroller, 1020);
        this.funcKeyIntroScroller.viewport = this.funcKeyIntroGroup;
        UIManager.pushResizeScroller(this.funcKeyIntroScroller, 1020);
    };
    GameRulePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.gameRullTab.init(0);
        this.onTabTap(0);
    };
    GameRulePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
        this.gameRullTab.tabChangeEvent.addListener(this.onTabTap, this);
    };
    GameRulePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
        this.gameRullTab.tabChangeEvent.addListener(this.onTabTap, this);
    };
    GameRulePanel.prototype.showPrePanelName = function () {
        if (this.prevPanelName == UIModuleName.GamblingPanel) {
            UIManager.showPanel(this.prevPanelName, true);
        }
        else {
            UIManager.showPanel(this.prevPanelName);
        }
    };
    GameRulePanel.prototype.onTabTap = function (index) {
        switch (index) {
            case 0:
                this.resizeScroller.viewport.scrollV = 0;
                break;
            case 1:
                this.cardScroller.viewport.scrollV = 0;
                break;
            case 2:
                this.funcKeyIntroScroller.viewport.scrollV = 0;
                break;
        }
    };
    GameRulePanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    return GameRulePanel;
}(BasePanel));
__reflect(GameRulePanel.prototype, "GameRulePanel");
//# sourceMappingURL=GameRulePanel.js.map