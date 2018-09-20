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
 * 邮箱面板
 */
var MailPanel = (function (_super) {
    __extends(MailPanel, _super);
    function MailPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.MailPanel);
        return _this;
    }
    MailPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.tab.build(TabComponent.CreatData(["系统邮箱", "私人邮箱"], [this.mailGroup, this.mailGroup], TabButtonType.SmallOf2));
        this.tab.isTween = false;
        UIUtil.listRenderer(this.mailList, this.mailScroller, MailItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.addRedPoint();
        this.maskAlpha = 0;
    };
    MailPanel.prototype.addRedPoint = function () {
        var btn = this.tab.getBtnByLabel("系统邮箱");
        UIUtil.addSingleNotify(btn, NotifyType.Mail_HaveNewSystem, 3, 78);
        btn = this.tab.getBtnByLabel("私人邮箱");
        UIUtil.addSingleNotify(btn, NotifyType.Mail_HaveNewPlayer, 3, 78);
    };
    MailPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.tab.init(0);
        MailManager.unReadCount = 0;
        this.onBarItemTap(0);
    };
    MailPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.tab.tabChangeEvent.addListener(this.onBarItemTap, this);
        MailManager.getMailListEvent.addListener(this.getMailList, this);
    };
    MailPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.tab.tabChangeEvent.removeListener(this.onBarItemTap, this);
        MailManager.getMailListEvent.removeListener(this.getMailList, this);
        this.mailScroller.stopAnimation();
    };
    MailPanel.prototype.getMailList = function () {
        this.refreshUI();
    };
    /**
     * 渲染信息
    */
    MailPanel.prototype.refreshUI = function () {
        this.noMailLabel.visible = MailManager.mailList.length == 0;
        UIUtil.writeListInfo(this.mailList, MailManager.mailList, "Id");
    };
    MailPanel.prototype.onBarItemTap = function (index) {
        var list = MailManager.getListByType(index);
        if (list) {
            this.noMailLabel.visible = list.length == 0;
            UIUtil.writeListInfo(this.mailList, MailManager.getListByType(index), "Id", false, SortUtil.MailDateSort);
        }
        else {
            this.noMailLabel.visible = true;
        }
        this.mailScroller.stopAnimation();
    };
    return MailPanel;
}(BasePanel));
__reflect(MailPanel.prototype, "MailPanel");
//# sourceMappingURL=MailPanel.js.map