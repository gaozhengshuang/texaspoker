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
 * 行为操作支持
 */
var HWPanelActionSupport = (function (_super) {
    __extends(HWPanelActionSupport, _super);
    function HWPanelActionSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HWPanelActionSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.initBankerBtn();
        HundredWarManager.panelHandler.reqHundredWarBankerList();
    };
    HWPanelActionSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        this.target.goBankerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoBankerClick, this);
        this.target.outBankerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOutBankerClick, this);
        HundredWarManager.onPosChangeEvent.addListener(this.setBankerBth, this);
    };
    HWPanelActionSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        this.target.goBankerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoBankerClick, this);
        this.target.outBankerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOutBankerClick, this);
        HundredWarManager.onPosChangeEvent.removeListener(this.setBankerBth, this);
    };
    /**
     * 设置上庄和下庄按钮
    */
    HWPanelActionSupport.prototype.setBankerBth = function (data) {
        if (data.roleId && data.pos == 0) {
            if (data.roleId == UserManager.userInfo.roleId) {
                this.target.outBankerBtn.visible = true;
                this.target.goBankerBtn.visible = false;
            }
            else {
                this.target.goBankerBtn.visible = true;
                this.target.outBankerBtn.visible = false;
            }
        }
    };
    /**
     * 初始化上下庄按钮
    */
    HWPanelActionSupport.prototype.initBankerBtn = function () {
        if (HundredWarManager.isBanker(UserManager.userInfo.roleId)) {
            this.target.outBankerBtn.visible = true;
            this.target.goBankerBtn.visible = false;
        }
        else {
            this.target.goBankerBtn.visible = true;
            this.target.outBankerBtn.visible = false;
        }
    };
    /**
     * 我要上庄按钮点击执行事件
    */
    HWPanelActionSupport.prototype.onGoBankerClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        JumpUtil.JumpToHundredWarBanker();
    };
    /**
     * 下庄按钮点击执行事件
    */
    HWPanelActionSupport.prototype.onOutBankerClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        JumpUtil.JumpToHundredWarBanker();
    };
    /**
     * 点击充值跳转到商城
    */
    HWPanelActionSupport.prototype.showShopping = function () {
        JumpUtil.JumpToShopping(ShopGroupIndex.Gold, UIModuleName.HundredWarRoomPanel);
    };
    return HWPanelActionSupport;
}(BaseHWPanelSupport));
__reflect(HWPanelActionSupport.prototype, "HWPanelActionSupport");
//# sourceMappingURL=HWPanelActionSupport.js.map