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
 * 百人大战无座玩家面板
*/
var HundredWarNoSeatPlayerPanel = (function (_super) {
    __extends(HundredWarNoSeatPlayerPanel, _super);
    function HundredWarNoSeatPlayerPanel() {
        var _this = _super.call(this) || this;
        _this._reqNum = 12;
        _this.setSkinName(UIModuleName.HundredWarNoSeatPlayerPanel);
        return _this;
    }
    HundredWarNoSeatPlayerPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        UIUtil.listRenderer(this.userList, this.userScroller, HundredWarNoSeatItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.reqscroller = new ReqScroller(this.userScroller, this.userList, this._reqNum, this.reqInfo.bind(this));
        this.userScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.showGroup();
        this.maskAlpha = 0;
    };
    HundredWarNoSeatPlayerPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.reqscroller.Clear();
        this.reqInfo();
    };
    HundredWarNoSeatPlayerPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    HundredWarNoSeatPlayerPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        HundredWarManager.panelHandler.OnGetHundredWarNoSeatInfoEvent.addListener(this.refreshUI, this);
    };
    HundredWarNoSeatPlayerPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        HundredWarManager.panelHandler.OnGetHundredWarNoSeatInfoEvent.removeListener(this.refreshUI, this);
    };
    /**
     * 请求数据
     */
    HundredWarNoSeatPlayerPanel.prototype.reqInfo = function () {
        HundredWarManager.panelHandler.reqHundredWarNoSeatInfo(this.reqscroller.index, this.reqscroller.reqNum);
    };
    /**
     * 刷新数据
     */
    HundredWarNoSeatPlayerPanel.prototype.refreshUI = function (data) {
        this.reqscroller.init(new eui.ArrayCollection(data.userList), data.isBottom);
        if (data.playerNum > 0) {
            this.showGroup(this.userGroup);
            this.playerNumLabel.text = "当前无座玩家共有" + data.playerNum + "人";
            // UIUtil.writeListInfo(this.userList, HundredWarManager.panelHandler.hundredWarNoSeatList, "roleId", true, SortUtil.HundredWarNoSeatSort);
        }
        else {
            this.showGroup(this.noUserGroup);
        }
    };
    HundredWarNoSeatPlayerPanel.prototype.showGroup = function (group) {
        this.userGroup.visible = false;
        this.noUserGroup.visible = false;
        if (group) {
            group.visible = true;
        }
    };
    return HundredWarNoSeatPlayerPanel;
}(BasePanel));
__reflect(HundredWarNoSeatPlayerPanel.prototype, "HundredWarNoSeatPlayerPanel");
//# sourceMappingURL=HundredWarNoSeatPlayerPanel.js.map