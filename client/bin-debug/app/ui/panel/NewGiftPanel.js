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
 * 新人礼面板
 */
var NewGiftPanel = (function (_super) {
    __extends(NewGiftPanel, _super);
    function NewGiftPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.NewGiftPanel);
        return _this;
    }
    NewGiftPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        UIUtil.listRenderer(this.newGiftList, this.newGiftScroller, NewGiftItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    NewGiftPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.refresh();
    };
    NewGiftPanel.prototype.refresh = function () {
        UIUtil.writeListInfo(this.newGiftList, ActivityManager.pilePrizeHandler.getShowSubList(this.activityInfo.id), "subId", false);
    };
    NewGiftPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        ActivityManager.pilePrizeHandler.takePrizeCompleteEvent.addListener(this.onTake, this);
    };
    NewGiftPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        ActivityManager.pilePrizeHandler.takePrizeCompleteEvent.removeListener(this.onTake, this);
    };
    NewGiftPanel.prototype.onTake = function (id) {
        if (id == this.activityInfo.id) {
            this.refresh();
            if (ActivityManager.pilePrizeHandler.isTakeAllAward(this.activityInfo.id) && UserManager.userInfo.bindRoleId != 0) {
                var info = ActivityManager.pilePrizeHandler.getExtraAward(this.activityInfo.id);
                if (InfoUtil.checkAvailable(info) && !info.isTaken) {
                    ActivityManager.ReqGetActivityAward(info.id, info.subId, false);
                    UIManager.showPanel(UIModuleName.BringAwardComPanel, { awardId: info.definition.awardId, des: "恭喜你完成所有新人礼，你绑定了好友的邀请码，你额外获得：", thisObj: this });
                }
            }
        }
    };
    return NewGiftPanel;
}(BaseActivityPanel));
__reflect(NewGiftPanel.prototype, "NewGiftPanel");
//# sourceMappingURL=NewGiftPanel.js.map