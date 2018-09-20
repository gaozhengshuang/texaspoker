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
 * 百人大战帮助面板
 */
var HundredWarHelpPanel = (function (_super) {
    __extends(HundredWarHelpPanel, _super);
    function HundredWarHelpPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.HundredWarHelpPanel);
        return _this;
    }
    HundredWarHelpPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        var array = new Array(this.playHelpGroup, this.uiHelpGroup, this.prizeHelpGroup);
        this.tab.build(TabComponent.CreatData(["玩法说明", "界面说明", "奖池说明"], array, TabButtonType.SmallOf3));
        this.tab.isTween = false;
        this.setLabel(this.playwayLabel, TextFixedId.HundredWarRule);
        this.playHelpScroller.viewport = this.imgLabelGroup;
        this.uiHelpScroller.viewport = this.imgGroup;
        this.maskAlpha = 0;
    };
    HundredWarHelpPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.tab.init(0);
        this.resetScroller();
    };
    HundredWarHelpPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    HundredWarHelpPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.tab.tabChangeEvent.addListener(this.onBarItemTap, this);
    };
    HundredWarHelpPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.tab.tabChangeEvent.removeListener(this.onBarItemTap, this);
    };
    HundredWarHelpPanel.prototype.setLabel = function (label, id) {
        var def = TextDefined.GetInstance().getDefinition(id);
        if (def) {
            if (def.isRichTxt) {
                label.textFlow = qin.TextUtil.parse(def.text);
            }
            else {
                label.text = def.text;
            }
        }
    };
    HundredWarHelpPanel.prototype.onBarItemTap = function (index) {
        if (index == 0) {
            this.resetScroller(this.playHelpScroller);
        }
        if (index == 1) {
            if (!this.uiHelpBg.texture) {
                UIUtil.loadBg(ResFixedFileName.HundredWar_Help, this.uiHelpBg);
            }
            this.resetScroller(this.uiHelpScroller);
        }
        if (index == 2) {
            if (qin.StringUtil.isNullOrEmpty(this.prizeLabel.text)) {
                this.setLabel(this.prizeLabel, TextFixedId.HundredWarPrize);
            }
        }
    };
    HundredWarHelpPanel.prototype.resetScroller = function (scroller) {
        if (scroller) {
            scroller.stopAnimation();
            scroller.viewport.scrollV = 0;
        }
        else {
            this.playHelpScroller.stopAnimation();
            this.playHelpScroller.viewport.scrollV = 0;
            this.uiHelpScroller.stopAnimation();
            this.uiHelpScroller.viewport.scrollV = 0;
        }
    };
    return HundredWarHelpPanel;
}(BasePanel));
__reflect(HundredWarHelpPanel.prototype, "HundredWarHelpPanel");
//# sourceMappingURL=HundredWarHelpPanel.js.map