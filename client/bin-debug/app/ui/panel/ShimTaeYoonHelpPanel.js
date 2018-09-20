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
 *德州转转转帮助面板
*/
var ShimTaeYoonHelpPanel = (function (_super) {
    __extends(ShimTaeYoonHelpPanel, _super);
    function ShimTaeYoonHelpPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.ShimTaeYoonHelpPanel);
        return _this;
    }
    ShimTaeYoonHelpPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        UIUtil.listRenderer(this.list, this.scroller, ShimTaeYoonHelpItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.AUTO, null, true);
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this._coefficientList = new Array();
        this._shimTaeYoonHelpInfotList = new Array();
    };
    ShimTaeYoonHelpPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        qin.ArrayUtil.Clear(this._coefficientList);
        qin.ArrayUtil.Clear(this._shimTaeYoonHelpInfotList);
        if (appendData) {
            this._coefficientList = appendData.coefficientList.concat();
            this._bottom = appendData.bottom;
        }
        this.setShimTaeYoonHelpListInfo();
        this.setPanelInfo();
    };
    ShimTaeYoonHelpPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    ShimTaeYoonHelpPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    ShimTaeYoonHelpPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    ShimTaeYoonHelpPanel.prototype.setShimTaeYoonHelpListInfo = function () {
        var shimTaeYoonHelpInfo;
        for (var i = 0; i < this._coefficientList.length - 1; i++) {
            shimTaeYoonHelpInfo = new ShimTaeYoonHelpInfo();
            if (i < 3) {
                shimTaeYoonHelpInfo.coefficientDes = "奖池" + this._coefficientList[i] * 100 + "%";
            }
            else {
                shimTaeYoonHelpInfo.coefficientDes = (this._bottom * this._coefficientList[i]).toString();
            }
            if (i < 7) {
                var str = void 0;
                str = ResPrefixName.LaBaResult + i + ResSuffixName.PNG;
                shimTaeYoonHelpInfo.img1 = shimTaeYoonHelpInfo.img2 = shimTaeYoonHelpInfo.img3 = str;
            }
            else {
                if (i == 7) {
                    shimTaeYoonHelpInfo.img1 = shimTaeYoonHelpInfo.img2 = ResPrefixName.LaBaResult + 6 + ResSuffixName.PNG;
                    shimTaeYoonHelpInfo.img3 = ResPrefixName.LaBaResult + i + ResSuffixName.PNG;
                }
                else if (i == 8) {
                    shimTaeYoonHelpInfo.img1 = ResPrefixName.LaBaResult + 6 + ResSuffixName.PNG;
                    shimTaeYoonHelpInfo.img3 = shimTaeYoonHelpInfo.img2 = ResPrefixName.LaBaResult + 7 + ResSuffixName.PNG;
                }
            }
            this._shimTaeYoonHelpInfotList.push(shimTaeYoonHelpInfo);
        }
    };
    /**
     * 设置面板数据
    */
    ShimTaeYoonHelpPanel.prototype.setPanelInfo = function () {
        UIUtil.writeListInfo(this.list, this._shimTaeYoonHelpInfotList);
    };
    return ShimTaeYoonHelpPanel;
}(BasePanel));
__reflect(ShimTaeYoonHelpPanel.prototype, "ShimTaeYoonHelpPanel");
/**
 * 德州转转转帮助面板项数据
*/
var ShimTaeYoonHelpInfo = (function () {
    function ShimTaeYoonHelpInfo() {
    }
    return ShimTaeYoonHelpInfo;
}());
__reflect(ShimTaeYoonHelpInfo.prototype, "ShimTaeYoonHelpInfo");
//# sourceMappingURL=ShimTaeYoonHelpPanel.js.map