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
 * 保险箱面板
 */
var SafeBoxPanel = (function (_super) {
    __extends(SafeBoxPanel, _super);
    function SafeBoxPanel() {
        var _this = _super.call(this) || this;
        _this.pwdIndex = 2;
        _this.getGold = 1;
        _this.setSkinName(UIModuleName.SafeBoxPanel);
        return _this;
    }
    SafeBoxPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        var array = new Array();
        array.push(this.saveGoldGroup);
        array.push(this.withdrawGroup);
        array.push(this.modifyPwdGroup);
        this.saveTab.build(TabComponent.CreatData(["存款", "提现", "修改密码"], array, TabButtonType.SmallOf3));
        this.saveTab.isTween = false;
        this.setTips("");
        this.oldPwdCom = new PwdComponent(UIComponentSkinName.PwdComponent);
        this.pwdGroup.addChild(this.oldPwdCom);
        this.newPwdCom = new PwdComponent(UIComponentSkinName.PwdComponent);
        this.pwdGroup.addChild(this.newPwdCom);
        this.againPwdCom = new PwdComponent(UIComponentSkinName.PwdComponent);
        this.pwdGroup.addChild(this.againPwdCom);
        this.withdrawPwd = new PwdComponent(UIComponentSkinName.PwdComponent);
        this.withdrawPwdGroup.addChild(this.withdrawPwd);
    };
    SafeBoxPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        //刷新资产
        this.refreshProperty();
        //设置存入滑动条进度
        this.saveGoldHs.value = 0;
        //设置取出滑动条进度
        this.withdrawGoldHs.value = 0;
        this._safeGold = UserManager.userInfo.safeGold;
        this.importGoldHs();
        this.exportGoldHs();
        this.saveTab.init(0);
    };
    SafeBoxPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        if (UserManager.userInfo.isSafePwd == undefined || UserManager.userInfo.isSafePwd == false) {
            UIManager.showPanel(UIModuleName.SafeCreatePanel);
        }
        this.oldPwdCom.init({ isNotMaskKeyPanel: true });
        this.newPwdCom.init({ isNotMaskKeyPanel: true });
        this.againPwdCom.init({ isNotMaskKeyPanel: true });
        this.withdrawPwd.init({ isNotMaskKeyPanel: true });
    };
    SafeBoxPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.saveGoldHs.addEventListener(egret.Event.CHANGE, this.importGoldHs, this);
        this.saveGoldHs.addEventListener(eui.UIEvent.CHANGE_START, this.unEnoughGold, this);
        this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goldBtnHandle, this);
        this.subBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goldBtnHandle, this);
        this.withdrawGoldHs.addEventListener(egret.Event.CHANGE, this.exportGoldHs, this);
        this.withdrawGoldHs.addEventListener(eui.UIEvent.CHANGE_START, this.unEnoughGold, this);
        this.withdrawAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goldBtnHandle, this);
        this.withdrawSubBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goldBtnHandle, this);
        this.saveTab.tabChangeEvent.addListener(this.onBarItemTap, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandle, this);
        SafeBoxManager.modifyPwdEvent.addListener(this.modifyPwdSuccessHandle, this);
        UserManager.propertyChangeEvent.addListener(this.refreshProperty, this);
        this.newPwdCom.pwdInput.addListener(this.pwdInput, this);
        this.againPwdCom.pwdInput.addListener(this.pwdInput, this);
        SafeBoxManager.saveWithdrawEvent.addListener(this.saveWithdrawEvent, this);
        this.withdrawPwdGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeIndex, this);
        UIManager.onPanelCloseEvent.addListener(this.restoreY, this);
    };
    SafeBoxPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.saveGoldHs.removeEventListener(egret.Event.CHANGE, this.importGoldHs, this);
        this.saveGoldHs.removeEventListener(eui.UIEvent.CHANGE_START, this.unEnoughGold, this);
        this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goldBtnHandle, this);
        this.subBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goldBtnHandle, this);
        this.withdrawGoldHs.removeEventListener(egret.Event.CHANGE, this.exportGoldHs, this);
        this.withdrawGoldHs.removeEventListener(eui.UIEvent.CHANGE_START, this.unEnoughGold, this);
        this.withdrawAddBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goldBtnHandle, this);
        this.withdrawSubBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goldBtnHandle, this);
        this.saveTab.tabChangeEvent.removeListener(this.onBarItemTap, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandle, this);
        SafeBoxManager.modifyPwdEvent.removeListener(this.modifyPwdSuccessHandle, this);
        UserManager.propertyChangeEvent.removeListener(this.refreshProperty, this);
        this.newPwdCom.pwdInput.removeListener(this.pwdInput, this);
        this.againPwdCom.pwdInput.removeListener(this.pwdInput, this);
        SafeBoxManager.saveWithdrawEvent.removeListener(this.saveWithdrawEvent, this);
        this.withdrawPwdGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeIndex, this);
        UIManager.onPanelCloseEvent.removeListener(this.restoreY, this);
        UIManager.closePanel(UIModuleName.KeyBoardPanel);
        this.restoreY();
    };
    /**
     * 输入密码框点击事件
    */
    SafeBoxPanel.prototype.changeIndex = function () {
        this.verticalCenter = -220;
    };
    /**
     * 还原y轴位置
    */
    SafeBoxPanel.prototype.restoreY = function () {
        this.verticalCenter = 0;
    };
    SafeBoxPanel.prototype.saveWithdrawEvent = function (data) {
        //重置计算数		
        if (data == SafeBoxOperateType.Withdraw) {
            this.withdrawGoldHs.value = 0;
            this.withdrawCount.text = "0万";
        }
    };
    SafeBoxPanel.prototype.pwdInput = function () {
        var pwd1 = this.newPwdCom.getPwd();
        var pwd2 = this.againPwdCom.getPwd();
        if (pwd1.length > 0 && pwd2.length > 0) {
            var min = Math.min(pwd1.length, pwd2.length);
            if (pwd1.substring(0, min) != pwd2.substring(0, min)) {
                this.setTips("*新密码两次不一致");
            }
            else {
                this.setTips("");
            }
        }
    };
    SafeBoxPanel.prototype.onBarItemTap = function (index) {
        if (index == this.pwdIndex) {
            this.goldGroup.visible = false;
            this.oldPwdCom.init({ isNotMaskKeyPanel: true, isSelect: true });
            this.newPwdCom.init({ isNotMaskKeyPanel: true });
            this.againPwdCom.init({ isNotMaskKeyPanel: true });
            this.setTips("");
        }
        else if (index == this.getGold) {
            UIManager.closePanel(UIModuleName.KeyBoardPanel);
            this.goldGroup.visible = true;
            this.withdrawPwd.init({ isNotMaskKeyPanel: true });
        }
        else {
            UIManager.closePanel(UIModuleName.KeyBoardPanel);
            this.goldGroup.visible = true;
        }
    };
    /**
     * 刷新资产
    */
    SafeBoxPanel.prototype.refreshProperty = function () {
        this.withdrawPwd.init({ isNotMaskKeyPanel: true });
        this.currentGold.text = qin.MathUtil.numAddSpace(UserManager.userInfo.gold);
        this.saveGold.text = qin.MathUtil.numAddSpace(UserManager.userInfo.safeGold);
        if (this._safeGold > UserManager.userInfo.safeGold) {
            this.withdrawGoldHs.value = 0;
        }
        this._safeGold = UserManager.userInfo.safeGold;
        if (UserManager.userInfo.gold >= 10000) {
            this.saveGoldHs.maximum = Math.floor(UserManager.userInfo.gold / 10000);
        }
        else {
            this.saveGoldHs.maximum = 0;
        }
        this.withdrawGoldHs.maximum = UserManager.userInfo.safeGold / 10000;
    };
    /**
     * 修改密码成功操作
    */
    SafeBoxPanel.prototype.modifyPwdSuccessHandle = function () {
        this.oldPwdCom.init({ isNotMaskKeyPanel: true });
        this.newPwdCom.init({ isNotMaskKeyPanel: true });
        this.againPwdCom.init({ isNotMaskKeyPanel: true });
        UIManager.closePanel(UIModuleName.KeyBoardPanel);
        UIManager.showFloatTips("密码修改成功");
    };
    /**
     * 面板点击
    */
    SafeBoxPanel.prototype.onClickHandle = function (event) {
        var flag = true;
        switch (event.target) {
            case this.saveBtn:
                this.saveGoldHandler();
                break;
            case this.withdrawBtn:
                this.withdrawGoldHandler();
                break;
            case this.modifyPwdBtn:
                this.modifyPwdHandle();
                break;
            case this.buyVIPlabel:
                JumpUtil.JumpToShopping(ShopGroupIndex.Vip, UIModuleName.SafeBoxPanel);
                break;
            case this.retrievePwd:
                JumpUtil.JumpToSafeRetrievePwd();
                break;
            default:
                flag = false;
                break;
        }
        if (flag) {
            SoundManager.playButtonEffect(event.target);
        }
        if (this.saveTab && this.saveTab.tabGroup && event.target.parent == this.saveTab.tabGroup) {
            return;
        }
        if (!this.oldPwdCom.isTarget(event.target) && !this.newPwdCom.isTarget(event.target)
            && !this.againPwdCom.isTarget(event.target) && !this.withdrawPwd.isTarget(event.target)) {
            UIManager.closePanel(UIModuleName.KeyBoardPanel);
        }
    };
    /**
     * 滑动存入金币滚动条
    */
    SafeBoxPanel.prototype.importGoldHs = function () {
        this.saveCount.text = this.saveGoldHs.value.toString() + "万";
    };
    /**
     * 存入金币
    */
    SafeBoxPanel.prototype.saveGoldHandler = function () {
        if (this.saveGoldHs.value >= 1) {
            var num = Math.floor(this.saveGoldHs.value) * 10000;
            //重置计算数	
            this.saveGoldHs.value = 0;
            this.saveCount.text = "0万";
            //请求存入金币
            SafeBoxManager.reqSaveWithdrawGold(num, SafeBoxOperateType.Save);
        }
        else {
            UIManager.showFloatTips("存入金币不能低于1万");
        }
    };
    /**
     * 滑动取出金币滚动条
    */
    SafeBoxPanel.prototype.exportGoldHs = function () {
        this.withdrawCount.text = this.withdrawGoldHs.value.toString() + "万";
    };
    /**
     * 取出金币
    */
    SafeBoxPanel.prototype.withdrawGoldHandler = function () {
        var pwd = this.withdrawPwd.getPwd();
        if (pwd.length == 0) {
            UIManager.showFloatTips("密码不能为空");
        }
        else if (pwd.length != 6) {
            UIManager.showFloatTips("密码长度为6位");
        }
        else {
            this._safeGold = UserManager.userInfo.safeGold;
            if (this.withdrawGoldHs.value >= 1) {
                var num = Math.floor(this.withdrawGoldHs.value) * 10000;
                SafeBoxManager.reqSaveWithdrawGold(num, SafeBoxOperateType.Withdraw, pwd);
                this.withdrawPwd.init({ isNotMaskKeyPanel: true });
            }
            else if (this.withdrawGoldHs.value > 0 && UserManager.userInfo.safeGold < 10000) {
                //避免出现保险箱金币余额小于一万而无法取出(理论上应该不会出现,但涉及金币问题特殊处理)
                var num = this.withdrawGoldHs.value * 10000;
                SafeBoxManager.reqSaveWithdrawGold(num, SafeBoxOperateType.Withdraw, pwd);
                this.withdrawPwd.init({ isNotMaskKeyPanel: true });
            }
            else {
                UIManager.showFloatTips("取出金额不能为空");
            }
        }
    };
    /**
      * 金币不足
     */
    SafeBoxPanel.prototype.unEnoughGold = function (event) {
        if (event.target == this.saveGoldHs) {
            if (this.saveGoldHs.maximum == 0) {
                UIManager.showFloatTips("当前可存金币不足一万");
            }
        }
        else if (event.target == this.withdrawGoldHs) {
            if (this.withdrawGoldHs.maximum == 0) {
                UIManager.showFloatTips("保险箱金币为0");
            }
        }
    };
    /**
      * 点击金币加减按钮
     */
    SafeBoxPanel.prototype.goldBtnHandle = function (event) {
        SoundManager.playButtonEffect(event.target);
        switch (event.target) {
            case this.addBtn:
                this.saveGoldHs.value++;
                break;
            case this.subBtn:
                this.saveGoldHs.value--;
                break;
            case this.withdrawAddBtn:
                this.withdrawGoldHs.value++;
                break;
            case this.withdrawSubBtn:
                this.withdrawGoldHs.value--;
                break;
        }
        if (this.saveGoldHs.value > this.saveGoldHs.maximum) {
            this.saveGoldHs.value = this.saveGoldHs.maximum;
        }
        else if (this.withdrawGoldHs.value > this.withdrawGoldHs.maximum) {
            this.withdrawGoldHs.value = this.withdrawGoldHs.maximum;
        }
        else if (this.saveGoldHs.value < 0) {
            this.saveGoldHs.value = 0;
        }
        else if (this.withdrawGoldHs.value < 0) {
            this.withdrawGoldHs.value = 0;
        }
        this.importGoldHs();
        this.exportGoldHs();
    };
    /**
     * 修改密码操作
    */
    SafeBoxPanel.prototype.modifyPwdHandle = function () {
        var oldPwd = this.oldPwdCom.getPwd();
        var newPwd = this.newPwdCom.getPwd();
        var againPwd = this.againPwdCom.getPwd();
        if (UserUtil.checkPwd(oldPwd, 6, 6, this.tipPwd) && UserUtil.checkTwoPwd(newPwd, againPwd, 6, 6, this.tipPwd)) {
            SafeBoxManager.reqModifyPwd(newPwd, oldPwd);
        }
    };
    /**
      * 设置提示
     */
    SafeBoxPanel.prototype.setTips = function (tipName) {
        this.tipPwd.text = tipName;
    };
    SafeBoxPanel.prototype.onCloseBtnClickHandler = function (event) {
        UIManager.closePanel(UIModuleName.KeyBoardPanel);
        _super.prototype.onCloseBtnClickHandler.call(this, event);
    };
    return SafeBoxPanel;
}(BasePanel));
__reflect(SafeBoxPanel.prototype, "SafeBoxPanel");
//# sourceMappingURL=SafeBoxPanel.js.map