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
 * 兑奖面板
 */
var AwardsPanel = (function (_super) {
    __extends(AwardsPanel, _super);
    function AwardsPanel() {
        var _this = _super.call(this) || this;
        _this._startId = 0;
        _this._count = 30;
        _this.setSkinName(UIModuleName.AwardsPanel);
        return _this;
    }
    AwardsPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.tabComponent.isTween = false;
        this.tabComponent.build(TabComponent.CreatData(["奖品兑换", "兑换记录"], [this.awardsGroup, this.awardsRecordGroup], TabButtonType.SmallOf2));
        UIUtil.listRenderer(this.awardsList, this.awardsScroller, GoldenBeanAwardItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.recordList, this.recordScroller, GoldenBeanRecordItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    AwardsPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this._recordList = null;
        this.tabComponent.init(0);
        this.refresh();
    };
    AwardsPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        ItemManager.itemReduceEvent.addListener(this.refresh, this);
        this.tabComponent.tabChangeEvent.addListener(this.onTabChange, this);
        AwardManager.getAwardRecordEvent.addListener(this.refreshRecordList, this);
    };
    AwardsPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        ItemManager.itemReduceEvent.removeListener(this.refresh, this);
        this.tabComponent.tabChangeEvent.removeListener(this.onTabChange, this);
        AwardManager.getAwardRecordEvent.removeListener(this.refreshRecordList, this);
    };
    AwardsPanel.prototype.refresh = function () {
        this.goldenBeanLabel.text = ItemManager.getItemNumById(ItemFixedId.GoldenBean, ItemManager.itemList).toString();
        UIUtil.writeListInfo(this.awardsList, GoldenBeanAwardDefined.GetInstance().dataList, "id", false);
    };
    AwardsPanel.prototype.refreshRecordList = function (list) {
        this._recordList = list;
        UIUtil.writeListInfo(this.recordList, this._recordList, "id", false);
    };
    AwardsPanel.prototype.onTabChange = function (index) {
        if (index == 1) {
            this.recordScroller.stopAnimation();
            this.recordScroller.viewport.scrollV = 0;
            if (!this._recordList) {
                AwardManager.reqAwardRecord(AwardLogId.GoldenBean, this._startId, this._count);
            }
            else {
                UIUtil.writeListInfo(this.recordList, this._recordList, "id", false, SortUtil.AwardRecoedSort);
            }
        }
    };
    return AwardsPanel;
}(BasePanel));
__reflect(AwardsPanel.prototype, "AwardsPanel");
//# sourceMappingURL=AwardsPanel.js.map