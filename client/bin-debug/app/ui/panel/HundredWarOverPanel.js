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
 * 百人大战结算面板
*/
var HundredWarOverPanel = (function (_super) {
    __extends(HundredWarOverPanel, _super);
    function HundredWarOverPanel() {
        var _this = _super.call(this) || this;
        _this._headIndex = 0;
        _this.setSkinName(UIModuleName.HundredWarOverPanel);
        return _this;
    }
    HundredWarOverPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    HundredWarOverPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.reset();
        this.coundDown();
        qin.Tick.AddSecondsInvoke(this.coundDown, this);
        var overInfo = HundredWarManager.hundredWarOverInfo;
        if (overInfo) {
            this.numComp.init("$" + qin.MathUtil.numAddSpace(overInfo.gold));
            if (overInfo.isWin) {
                this.tipsLabel.text = "恭喜，您赢取了";
                this.titleImg.source = SheetSubName.HundredWar_Win;
                this.overBgImg.source = SheetSubName.HundredWar_WinBg;
            }
            else {
                this.tipsLabel.text = "您输了";
                this.titleImg.source = SheetSubName.HundredWar_Lose;
                this.overBgImg.source = SheetSubName.HundredWar_LoseBg;
            }
            if (overInfo.rankList) {
                this.startReqRank(overInfo.rankList);
            }
        }
    };
    /**
     * 开始请求
     */
    HundredWarOverPanel.prototype.startReqRank = function (list) {
        this._headIndex = 0;
        this._rankListClone = list.concat();
        this.nextReq();
    };
    /**
     * 请求下一个
     */
    HundredWarOverPanel.prototype.nextReq = function () {
        if (this._rankListClone.length > 0) {
            var rankInfo = this._rankListClone.shift();
            this["winGold" + this._headIndex].text = qin.MathUtil.formatNum(rankInfo.num);
            if (HundredWarManager.isSysBanker(rankInfo.roleId)) {
                this.userGroup.getChildAt(this._headIndex).visible = true;
                this["head" + this._headIndex].init(HundredWarManager.sysBanker, 80);
                this.onReqComplete(null);
            }
            else {
                UserManager.reqSimpleUserInfo(rankInfo.roleId);
            }
        }
    };
    /**
     * 请求完成
     */
    HundredWarOverPanel.prototype.onReqComplete = function (data) {
        if (data) {
            var userInfo = new SimpleUserInfo(data);
            this.userGroup.getChildAt(this._headIndex).visible = true;
            this["head" + this._headIndex].init(userInfo, 80);
        }
        this._headIndex++;
        this.nextReq();
    };
    // /**
    //  * 请求数据(递归)
    //  */
    // private reqInitRank(list: any[])
    // {
    //     if (!this._rankListClone || this._rankListClone.length == 0)
    //     {
    //         this._rankListClone = list.concat();
    //     }
    //     if (this._rankListClone.length > 0)
    //     {
    //         let rankInfo: any = this._rankListClone.shift();
    //         let thisObj = this;
    //         let callback: Function = function (result)
    //         {
    //             if (result.data)
    //             {
    //                 let userInfo: SimpleUserInfo = new SimpleUserInfo(result.data);
    //                 thisObj.userGroup.getChildAt(thisObj._headIndex).visible = true;
    //                 thisObj["head" + thisObj._headIndex].init(userInfo, 80);
    //                 thisObj["winGold" + thisObj._headIndex].text = qin.MathUtil.formatNum(rankInfo.num);
    //                 thisObj._headIndex++;
    //             }
    //             thisObj.reqInitRank(this._rankListClone);
    //         }
    //         if (rankInfo.roleId == HundredWarManager.sysBanker.roleId)
    //         {
    //             thisObj.userGroup.getChildAt(thisObj._headIndex).visible = true;
    //             thisObj["head" + thisObj._headIndex].init(HundredWarManager.sysBanker, 80);
    //             thisObj["winGold" + thisObj._headIndex].text = qin.MathUtil.formatNum(rankInfo.num);
    //             thisObj._headIndex++;
    //             thisObj.reqInitRank(this._rankListClone);
    //         }
    //         else
    //         {
    //             //UserManager.reqSimpleUserInfo(rankInfo.roleId, qin.Delegate.getOut(callback, this));
    //         }
    //     }
    //     else
    //     {
    //         this._headIndex = 0;
    //     }
    // }
    HundredWarOverPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    HundredWarOverPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        UserManager.OnGetSimpleUserInfoEvent.addListener(this.onReqComplete, this);
    };
    HundredWarOverPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        qin.Tick.RemoveSecondsInvoke(this.coundDown, this);
        UserManager.OnGetSimpleUserInfoEvent.removeListener(this.onReqComplete, this);
    };
    /**
     * 倒计时
    */
    HundredWarOverPanel.prototype.coundDown = function () {
        this.confirmBtn.labelDisplay.text = "确定  " + this._countDownTime;
        if (this._countDownTime > 0) {
            this._countDownTime--;
        }
        else {
            qin.Tick.RemoveSecondsInvoke(this.coundDown, this);
            this.closePanel(null);
        }
    };
    /**
     * 关闭面板
    */
    HundredWarOverPanel.prototype.closePanel = function (event) {
        if (event) {
            SoundManager.playButtonEffect(event.target);
        }
        if (!HundredWarManager.isBanker(UserManager.userInfo.roleId) && InfoUtil.checkAvailable(HundredWarManager.roomInfo) && UserManager.userInfo.gold < HundredWarManager.roomInfo.definition.minBuyin) {
            AlertManager.showConfirm("您的金币不足，快去商城补充点金币吧！", this.goToShopping, this.outRoom, null, null, null, "前往商城");
        }
        this.onCloseBtnClickHandler(null);
    };
    /**
     * 进入商城
    */
    HundredWarOverPanel.prototype.goToShopping = function () {
        JumpUtil.JumpToShopping(ShopGroupIndex.Gold, UIModuleName.HundredWarRoomPanel);
    };
    /**
     * 把玩家踢出
    */
    HundredWarOverPanel.prototype.outRoom = function () {
        HundredWarManager.reqLeave();
    };
    HundredWarOverPanel.prototype.reset = function () {
        this._countDownTime = HundredWarManager.roomInfo.definition.confirmTime;
        for (var i = 0; i < this.userGroup.numChildren; i++) {
            this.userGroup.getChildAt(i).visible = false;
        }
    };
    return HundredWarOverPanel;
}(BasePanel));
__reflect(HundredWarOverPanel.prototype, "HundredWarOverPanel");
//# sourceMappingURL=HundredWarOverPanel.js.map