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
 *分享抽奖活动面板
 */
var ShareLuckDrawPanel = (function (_super) {
    __extends(ShareLuckDrawPanel, _super);
    function ShareLuckDrawPanel() {
        var _this = _super.call(this) || this;
        _this._itemHeight = 25; //每一项的高 + 项与项之间的间距   项高40   间距0
        _this._itemNum = 9; //每个list中的item的数量
        _this._itemSpace = 3.5; //列的文字上下间距   3.5    列与列之间的间距即为  3.5+3.5
        _this._addSpendList = new Array(1000, 1400, 1600, 1700, 1750);
        _this._cutSpendList = new Array(50, 100, 200, 400, 700);
        _this._timeLine = 1;
        _this.setSkinName(UIModuleName.ShareLuckDrawPanel);
        return _this;
    }
    ShareLuckDrawPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.itemList = new Array();
        for (var i = 0; i < 12; i++) {
            this.itemList.push(this["item" + i]);
        }
        UIUtil.bindRender(this.list0, ShareLuckDrawItemRenderer, null);
        UIUtil.bindRender(this.list1, ShareLuckDrawItemRenderer, null);
        this.list0.useVirtualLayout = false;
        this.list1.useVirtualLayout = false;
        this.scroller.viewport = this.scrollGroup;
        this.scroller.scrollPolicyV = eui.ScrollPolicy.OFF;
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.setAwardInfo();
    };
    ShareLuckDrawPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this._itemIndex = 0;
        for (var i = 0; i < this.itemList.length; i++) {
            if (i == 0) {
                this.itemList[i].setHighLightImgVisible(true);
                this.itemList[i].setHighLightAlpha(1);
            }
            else {
                this.itemList[i].setHighLightImgVisible(false);
            }
        }
        this.desLabel.text = this.activityInfo.definition.des;
        this.drawBtn.enabled = true;
        this.reqResultInfo();
    };
    ShareLuckDrawPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.drawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.drawBtnClick, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareBtnClick, this);
        ActivityManager.onJoinActivityEvent.addListener(this.joinActivitySuccess, this);
        ActivityManager.onReqSingleActivityEvent.addListener(this.getDrawTimeSuccess, this);
        ActivityManager.OnActionRecordEvent.addListener(this.reqResultSuccess, this);
        ChannelManager.OnShareSucceed.addListener(this.onShareSuccess, this);
        ActivityManager.shareLuckDrawHandler.OnShareSuccessEvent.addListener(this.reqDrawTime, this);
    };
    ShareLuckDrawPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.drawBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.drawBtnClick, this);
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shareBtnClick, this);
        ActivityManager.onJoinActivityEvent.removeListener(this.joinActivitySuccess, this);
        ActivityManager.onReqSingleActivityEvent.removeListener(this.getDrawTimeSuccess, this);
        ActivityManager.OnActionRecordEvent.removeListener(this.reqResultSuccess, this);
        ChannelManager.OnShareSucceed.removeListener(this.onShareSuccess, this);
        ActivityManager.shareLuckDrawHandler.OnShareSuccessEvent.removeListener(this.reqDrawTime, this);
        egret.clearTimeout(this._timer);
        egret.clearInterval(this._timer1);
        egret.clearTimeout(this._timer2);
        qin.Tick.RemoveTimeoutInvoke(this.constantSpeedAnim, this);
        egret.Tween.removeTweens(this.scroller.viewport);
    };
    /**
     * 设置奖品信息
    */
    ShareLuckDrawPanel.prototype.setAwardInfo = function () {
        var dataList = ActivityShareDefined.GetInstance().dataList;
        if (dataList && this.itemList) {
            for (var i = 0; i < this.itemList.length; i++) {
                var data = dataList[i];
                if (data.rewardList && data.rewardList.length > 0) {
                    var rewardInfo = data.rewardList[0];
                    this.itemList[i].init(rewardInfo.id, rewardInfo.count);
                }
            }
        }
    };
    /**
     * 请求中奖结果
    */
    ShareLuckDrawPanel.prototype.reqResultInfo = function () {
        ActivityManager.reqActionRecord(this.activityInfo.id, ProjectDefined.GetInstance().shareResultNumLimit, 0);
    };
    /**
     * 请求中奖结果成功
    */
    ShareLuckDrawPanel.prototype.reqResultSuccess = function (data) {
        if (data && data.length > 0) {
            this.resultList = new Array();
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var info = data_1[_i];
                var resultInfo = new ChampionshipRankInfo();
                resultInfo.copyValueFrom(info);
                var def = ActivityShareDefined.GetInstance().getSubDefinition(this.activityInfo.id, info.subId);
                if (def) {
                    var rewardInfo = def.rewardList[0];
                    resultInfo.award = ItemDefined.GetInstance().getDefinition(rewardInfo.id).name + "*" + rewardInfo.count;
                    this.resultList.push(resultInfo);
                }
            }
        }
        if (this.resultList && this.resultList.length > 0) {
            this._changeYFlag = false;
            this.scroller.viewport.scrollV = 0;
            this.scrollGroup.getChildAt(0).y = 0;
            this.scrollGroup.getChildAt(1).y = this._itemNum * this._itemHeight + this._itemSpace;
            if (this.resultList.length * this._itemHeight > this.scroller.height) {
                this.resultScrollAnim();
            }
            else {
                UIUtil.writeListInfo(this.list0, this.resultList);
            }
        }
    };
    /**
     * 中奖信息滚动动画
    */
    ShareLuckDrawPanel.prototype.resultScrollAnim = function () {
        this._resultListClone = this.resultList.concat();
        var list0 = this._resultListClone.splice(0, this._itemNum);
        if (this._resultListClone.length < this._itemNum) {
            this._resultListClone = this._resultListClone.concat(this.resultList);
        }
        var list1 = this._resultListClone.splice(0, this._itemNum);
        UIUtil.writeListInfo(this.list0, list0);
        UIUtil.writeListInfo(this.list1, list1);
        this.list0.validateNow();
        this.list1.validateNow();
        this._timer2 = egret.setTimeout(this.setScroll, this, 0);
    };
    ShareLuckDrawPanel.prototype.setScroll = function () {
        var startScrollV = this.scroller.viewport.scrollV;
        var endScrollV = this.scroller.viewport.scrollV + this.list1.height + this._itemSpace;
        egret.Tween.get(this.scroller.viewport)
            .set({ scrollV: startScrollV })
            .to({ scrollV: endScrollV }, this.list1.numChildren * 1000)
            .call(this.scrollEnd, this);
    };
    ShareLuckDrawPanel.prototype.scrollEnd = function () {
        if (this._resultListClone.length < this._itemNum) {
            this._resultListClone = this._resultListClone.concat(this.resultList);
        }
        if (this._changeYFlag) {
            this.scrollGroup.getChildAt(1).y = this.scroller.viewport.scrollV + this.scrollGroup.getChildAt(1).height + this._itemSpace;
            var list = this._resultListClone.splice(0, this._itemNum);
            UIUtil.writeListInfo(this.list1, list);
        }
        else {
            this.scrollGroup.getChildAt(0).y = this.scroller.viewport.scrollV + this.scrollGroup.getChildAt(1).height + this._itemSpace;
            var list = this._resultListClone.splice(0, this._itemNum);
            UIUtil.writeListInfo(this.list0, list);
        }
        this._timer2 = egret.setTimeout(this.setScroll, this, 0);
        this._changeYFlag = !this._changeYFlag;
    };
    /**
     * 立即分享按钮点击事件
    */
    ShareLuckDrawPanel.prototype.shareBtnClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (!(qin.System.isWeChat || qin.System.isMicro)) {
            UIManager.showFloatTips("当前打开方式不支持分享，请在微信里打开或使用App版本");
            return;
        }
        if (qin.System.isMicro && ChannelManager.hasWeixin == false) {
            AlertManager.showAlert("您未安装微信，分享失败。");
            return;
        }
        ChannelManager.share(ChannelShareType.WxTimeLine, ChannelManager.appName, "话费送不停，豪礼不间断，这个德州不一般！");
    };
    /**
     * 请求抽奖次数
    */
    ShareLuckDrawPanel.prototype.reqDrawTime = function () {
        ActivityManager.reqActivityInfo(this.activityInfo.id); //请求抽奖次数        
    };
    /**
     * 抽奖按钮点击事件
    */
    ShareLuckDrawPanel.prototype.drawBtnClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        this.reqDrawTime();
        this._isDraw = true;
    };
    /**
     * 分享成功
    */
    ShareLuckDrawPanel.prototype.onShareSuccess = function (type) {
        if (type == ChannelShareType.WxTimeLine) {
            ActivityManager.shareLuckDrawHandler.reqShareSuccess(this._timeLine);
        }
    };
    /**
     * 获得抽奖次数成功
    */
    ShareLuckDrawPanel.prototype.getDrawTimeSuccess = function (id) {
        if (id == this.activityInfo.id && this._isDraw) {
            if (this.activityInfo.step > 0 && !(this.activityInfo.gotJsonObj.length && this.activityInfo.gotJsonObj.length > 0)) {
                // 请求参与活动
                var def = ActivityShareDefined.GetInstance().getDefinition(this.activityInfo.id);
                var id_1;
                var subId = void 0;
                if (def) {
                    id_1 = def.id;
                    subId = def.subId;
                    ActivityManager.reqJoinActivity(def.id, def.subId);
                }
                this.drawBtn.enabled = false;
            }
            else {
                AlertManager.showConfirm("您还没有抽奖次数，每日首次分享朋友圈即可获得1次抽奖机会！", this.shareBtnClick.bind(this), null, null, null, null, "立即分享");
            }
            this._isDraw = false;
        }
    };
    /**
     * 参与活动成功
    */
    ShareLuckDrawPanel.prototype.joinActivitySuccess = function (data) {
        if (data) {
            if (data.ResultList) {
                this._subId = data.ResultList[0].SubId;
                this._result = data.ResultList[0].SubId - 1;
                this.reqDrawTime();
                this.scrollAnim();
            }
        }
    };
    /**
     * 更新中奖展示数据
    */
    ShareLuckDrawPanel.prototype.refreshResultInfo = function (info) {
        if (this.resultList) {
            if (this.resultList.length >= ProjectDefined.GetInstance().shareResultNumLimit) {
                this.resultList.splice(ProjectDefined.GetInstance().shareResultNumLimit - 1, 1);
            }
        }
        else {
            this.resultList = new Array();
        }
        this.resultList.push(info);
        if (this.resultList.length * this._itemHeight <= this.scroller.height) {
            UIUtil.writeListInfo(this.list0, this.resultList);
        }
    };
    /**
     * 滚动动画
    */
    ShareLuckDrawPanel.prototype.scrollAnim = function () {
        var itemListLen = this.itemList.length;
        var turnsNum = qin.MathUtil.getRandom(4, 7); //一共转动的圈数        
        this._index = this._itemIndex;
        this._roundItemIndex = 0;
        this._totalItem = itemListLen - this._itemIndex + itemListLen * (turnsNum - 1) + this._result + 1;
        for (var i = 0; i < itemListLen; i++) {
            if (i == 0) {
                this._timer = egret.setTimeout(this.setHighLight, this, 400);
            }
            else {
                var len = this._addSpendList.length;
                if (i <= len) {
                    this._timer = egret.setTimeout(this.setHighLight, this, this._addSpendList[i - 1]); //加速
                }
                else {
                    egret.clearTimeout(this._timer);
                    qin.Tick.AddTimeoutInvoke(this.constantSpeedAnim, this._addSpendList[len - 1], this);
                    break;
                }
            }
        }
    };
    /**
     * 匀速调用
    */
    ShareLuckDrawPanel.prototype.constantSpeedAnim = function () {
        this._timer1 = egret.setInterval(this.setHighLight, this, 50); //匀速
    };
    /**
     * 设置高亮效果的显隐
    */
    ShareLuckDrawPanel.prototype.setHighLight = function () {
        var len = this.itemList.length;
        var totalItem = len - this._itemIndex;
        this.itemList[this._index].setHighLightImgVisible(true);
        this.itemList[this._index].setHighLightAlpha(1);
        this._roundItemIndex++;
        if (this._roundItemIndex <= 2) {
            for (var m = 1; m < 3; m++) {
                if (this._index - m > 0) {
                    this.itemList[this._index - m].setHighLightAlpha(1 - 0.3 * m);
                }
                else {
                    this.itemList[len - m].setHighLightAlpha(1 - 0.3 * m);
                }
            }
        }
        else {
            for (var j = 1; j <= 3; j++) {
                if (j == 3) {
                    if (this._index - j >= 0) {
                        this.itemList[this._index - j].setHighLightImgVisible(false);
                    }
                    else {
                        this.itemList[len - j + this._index].setHighLightImgVisible(false);
                    }
                }
                else {
                    if (this._index - j >= 0) {
                        this.itemList[this._index - j].setHighLightImgVisible(true);
                        this.itemList[this._index - j].setHighLightAlpha(1 - 0.3 * j);
                    }
                    else {
                        this.itemList[len - j + this._index].setHighLightImgVisible(true);
                        this.itemList[len - j + this._index].setHighLightAlpha(1 - 0.3 * j);
                    }
                }
            }
        }
        if ((this._totalItem >= this._roundItemIndex) && (this._totalItem - this._roundItemIndex <= this._cutSpendList.length)) {
            egret.clearInterval(this._timer1);
            qin.Tick.AddTimeoutInvoke(this.setHighLight, this._cutSpendList[this._cutSpendList.length - (this._totalItem - this._roundItemIndex)], this); //减速
            if (this._index == this._result) {
                qin.Tick.RemoveTimeoutInvoke(this.setHighLight, this);
                this.hideAfterHighLight();
                this._itemIndex = this._result;
                this.drawBtn.enabled = true;
            }
        }
        this._index++;
        if (this._index == len) {
            this._index = 0;
        }
    };
    /**
     * 转到结果后将结果后面的2个高亮隐藏并更新抽奖结果
    */
    ShareLuckDrawPanel.prototype.hideAfterHighLight = function () {
        for (var i = 1; i < 3; i++) {
            if (this._result - i >= 0) {
                this.itemList[this._result - i].setHighLightImgVisible(false);
            }
            else {
                this.itemList[this.itemList.length - i + this._index].setHighLightImgVisible(false);
            }
        }
        if (this._subId) {
            var def = ActivityShareDefined.GetInstance().getSubDefinition(this.activityInfo.id, this._subId);
            if (def) {
                if (def.hotTag && def.rewardList && def.rewardList.length > 0) {
                    var result = new ChampionshipRankInfo();
                    var rewardInfo = def.rewardList[0];
                    result.name = UserManager.userInfo.name;
                    result.award = ItemDefined.GetInstance().getDefinition(rewardInfo.id).name + "*" + rewardInfo.count;
                    this.refreshResultInfo(result);
                }
            }
        }
    };
    return ShareLuckDrawPanel;
}(BaseActivityPanel));
__reflect(ShareLuckDrawPanel.prototype, "ShareLuckDrawPanel");
//# sourceMappingURL=ShareLuckDrawPanel.js.map