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
 * 百人大战面板
*/
var HundredWarPanel = (function (_super) {
    __extends(HundredWarPanel, _super);
    function HundredWarPanel() {
        var _this = _super.call(this) || this;
        _this._secondNum = 0;
        _this.setSkinName(UIModuleName.HundredWarPanel);
        return _this;
    }
    HundredWarPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._anime = new PanelAnime(this);
        UIUtil.listRenderer(this.matchList, this.matchScroller, HundredWarItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.matchScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.showGroup();
        UIManager.pushResizeScroller(this.matchScroller, 1145);
        UIManager.pushResizeScroller(this.noMatchGroup, 1145);
    };
    HundredWarPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.getHundredWarInfo();
        qin.ArrayUtil.Clear(HundredWarManager.panelHandler.hundredWarList);
        if (!HundredWarManager.panelHandler.hundredWarList) {
            HundredWarManager.panelHandler.hundredWarList = new Array();
        }
        this.getHundredWarInfoSuccess();
    };
    HundredWarPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
        HundredWarManager.panelHandler.OnGetHundredWarInfoEvent.addListener(this.getHundredWarInfoSuccess, this);
        HundredWarManager.OnGetRoomInfoEvent.addListener(this.closePanel, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.matchList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.setRoomId, this);
        qin.Tick.AddSecondsInvoke(this.refreshPerTenSeconds, this);
    };
    HundredWarPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
        HundredWarManager.panelHandler.OnGetHundredWarInfoEvent.removeListener(this.getHundredWarInfoSuccess, this);
        HundredWarManager.OnGetRoomInfoEvent.removeListener(this.closePanel, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.matchList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.setRoomId, this);
        qin.Tick.RemoveSecondsInvoke(this.refreshPerTenSeconds, this);
    };
    /**
     * 每十秒调用
     */
    HundredWarPanel.prototype.refreshPerTenSeconds = function () {
        if (this._secondNum == 10) {
            this._secondNum = 0;
            HundredWarManager.panelHandler.reqGetHundredWarInfo();
        }
        else {
            this._secondNum++;
        }
    };
    /**
     * 发送请求获取百人大战信息
    */
    HundredWarPanel.prototype.getHundredWarInfo = function () {
        HundredWarManager.panelHandler.reqGetHundredWarInfo();
    };
    /**
     * 设置进入的房间的配置表id
    */
    HundredWarPanel.prototype.setRoomId = function (event) {
        if (this.matchList.selectedItem) {
            this._enterRoomId = this.matchList.selectedItem.hwId;
        }
    };
    /**
     * 获取百人大战信息成功执行操作
    */
    HundredWarPanel.prototype.getHundredWarInfoSuccess = function () {
        if (HundredWarManager.panelHandler.hundredWarList && HundredWarManager.panelHandler.hundredWarList.length > 0) {
            this.showGroup(this.hasMatchGroup);
            UIUtil.writeListInfo(this.matchList, HundredWarManager.panelHandler.hundredWarList, "id", false, SortUtil.hundredWarRoomIdUpSort);
        }
        else {
            this.showGroup(this.noMatchGroup);
        }
    };
    HundredWarPanel.prototype.onClick = function (event) {
        if (event.target == this.shoppingBtn) {
            JumpUtil.JumpToShopping(ShopGroupIndex.Gold, UIModuleName.HundredWarPanel);
        }
    };
    /**
     * 请求进入百人大战成功后关闭面板
    */
    HundredWarPanel.prototype.closePanel = function () {
        SceneManager.switcScene(SceneType.HundredWar);
        // UIManager.closePanel(UIModuleName.HundredWarPanel);
    };
    HundredWarPanel.prototype.showGroup = function (group) {
        this.hasMatchGroup.visible = false;
        this.noMatchGroup.visible = false;
        if (group) {
            group.visible = true;
        }
    };
    HundredWarPanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    return HundredWarPanel;
}(BasePanel));
__reflect(HundredWarPanel.prototype, "HundredWarPanel");
//# sourceMappingURL=HundredWarPanel.js.map