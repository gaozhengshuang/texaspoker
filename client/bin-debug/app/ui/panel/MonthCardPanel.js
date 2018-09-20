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
 * 月卡面板
*/
var MonthCardPanel = (function (_super) {
    __extends(MonthCardPanel, _super);
    function MonthCardPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.MonthCardPanel);
        return _this;
    }
    MonthCardPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this._monthCardsList = new Array();
        var info;
        for (var i = 0; i < ShopDefined.GetInstance().dataList.length; i++) {
            info = new ShopInfo();
            info.id = ShopDefined.GetInstance().dataList[i].id;
            if (info.definition && info.definition.type == ShopType.MonthCard) {
                this._monthCardsList.push(info);
            }
        }
        UIUtil.listRenderer(this.list, this.scroller, MonthCardItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.AUTO, null, true);
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
    };
    MonthCardPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.refreshUI();
    };
    MonthCardPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    MonthCardPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    MonthCardPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    /**
     * 重置面板
    */
    MonthCardPanel.prototype.refreshUI = function () {
        UIUtil.writeListInfo(this.list, this._monthCardsList, null);
    };
    return MonthCardPanel;
}(BasePanel));
__reflect(MonthCardPanel.prototype, "MonthCardPanel");
//# sourceMappingURL=MonthCardPanel.js.map