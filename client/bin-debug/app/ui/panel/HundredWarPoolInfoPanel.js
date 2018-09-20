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
 * 奖池信息面板
 */
var HundredWarPoolInfoPanel = (function (_super) {
    __extends(HundredWarPoolInfoPanel, _super);
    function HundredWarPoolInfoPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.HundredWarPoolInfoPanel);
        return _this;
    }
    HundredWarPoolInfoPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        UIUtil.listRenderer(this.rankList, this.rankScroller, HundredWarPoolPrizeItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    HundredWarPoolInfoPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        HundredWarManager.panelHandler.reqPoolInfo();
        this.poolNumComp.init("$" + qin.MathUtil.numAddSpace(HundredWarManager.roomInfo.pool));
    };
    HundredWarPoolInfoPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    HundredWarPoolInfoPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        HundredWarManager.panelHandler.OnGetHundredWarPoolInfoEvent.addListener(this.refreshReqInfo, this);
    };
    HundredWarPoolInfoPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        HundredWarManager.panelHandler.OnGetHundredWarPoolInfoEvent.removeListener(this.refreshReqInfo, this);
    };
    HundredWarPoolInfoPanel.prototype.refreshReqInfo = function () {
        if (HundredWarManager.panelHandler.lastPoolInfo.cards && HundredWarManager.panelHandler.lastPoolInfo.cards.length > 0) {
            this.lastGroup.visible = true;
            this.noPoolLabel.visible = false;
            if (!this.cardList) {
                this.cardList = new Array();
                for (var i = 0; i < this.cardGroup.numChildren; i++) {
                    var card = this.cardGroup.getChildAt(i);
                    this.cardList.push(card);
                }
                this.cardList.reverse();
            }
            for (var _i = 0, _a = this.cardList; _i < _a.length; _i++) {
                var item = _a[_i];
                item.visible = false;
            }
            var list = HundredWarManager.panelHandler.lastPoolInfo.cards;
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (i < this.cardList.length) {
                        var card = this.cardList[i];
                        card.visible = true;
                        card.init(list[i]);
                        card.initElementsShow2();
                    }
                }
            }
            this.poolLastLabel.text = "$" + qin.MathUtil.formatNum(HundredWarManager.panelHandler.lastPoolInfo.gold);
            this.dateLabel.text = qin.DateTimeUtil.formatDate(new Date(HundredWarManager.panelHandler.lastPoolInfo.time * 1000), qin.DateTimeUtil.Format_Standard_NoSecondAndYear);
        }
        else {
            this.lastGroup.visible = false;
            this.noPoolLabel.visible = true;
        }
        if (HundredWarManager.panelHandler.lastPoolInfo.prizeList && HundredWarManager.panelHandler.lastPoolInfo.prizeList.length > 0) {
            this.rankGroup.visible = true;
            this.noUserLabel.visible = false;
            UIUtil.writeListInfo(this.rankList, HundredWarManager.panelHandler.lastPoolInfo.prizeList, "roleId", false);
        }
        else {
            this.rankGroup.visible = false;
            this.noUserLabel.visible = true;
        }
    };
    return HundredWarPoolInfoPanel;
}(BasePanel));
__reflect(HundredWarPoolInfoPanel.prototype, "HundredWarPoolInfoPanel");
//# sourceMappingURL=HundredWarPoolInfoPanel.js.map