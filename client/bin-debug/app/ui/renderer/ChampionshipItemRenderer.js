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
 * 锦标赛赛事列表项面板
*/
var ChampionshipItemRenderer = (function (_super) {
    __extends(ChampionshipItemRenderer, _super);
    function ChampionshipItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.ChampionshipItemRenderer;
        return _this;
    }
    ChampionshipItemRenderer.prototype.updateData = function () {
        this.dataChanged();
    };
    ChampionshipItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (InfoUtil.checkAvailable(this.bindData)) {
            this.init();
            this.itemComp.init(this.bindData.definition.icon + ResSuffixName.PNG, 100);
            this.nameLabel.text = this.bindData.definition.name;
            if (this.bindData.definition.type == MatchType.MTT) {
                this.mttShow();
            }
            else {
                this.sitAndPlayShow();
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.applyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onaApplyBtnClick, this);
            this.applyBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterBtnClick, this);
            this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            ChampionshipManager.onRequestJoinEvent.addListener(this.requestJoinSuccess, this);
        }
    };
    ChampionshipItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.applyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onaApplyBtnClick, this);
        this.applyBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterBtnClick, this);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        ChampionshipManager.onRequestJoinEvent.removeListener(this.requestJoinSuccess, this);
        qin.Tick.RemoveSecondsInvoke(this.countDown, this);
        qin.Tick.RemoveSecondsInvoke(this.delayTimeCountDown, this);
        qin.Tick.RemoveSecondsInvoke(this.getNowTime, this);
    };
    /***************锦标赛*******************/
    /**
     * 锦标赛显示
    */
    ChampionshipItemRenderer.prototype.mttShow = function () {
        this.mttNumGroup.visible = true;
        this.numLabel.text = this.bindData.join + "/" + this.bindData.definition.bNum;
        if (this.bindData.definition.addon) {
            this.addonImg.visible = true;
        }
        if (this.bindData.definition.rebuy) {
            this.rebuyImg.visible = true;
        }
        if (this.bindData.joinWay) {
            this.hasJoinedShow();
        }
        else {
            this.notJoinedShow();
        }
        if (TimeManager.GetServerUtcTimestamp() >= this.bindData.startTime) {
            if (TimeManager.GetServerUtcTimestamp() <= this.bindData.startTime + this.bindData.definition.delaySign) {
                this.countDownOver();
            }
            else {
                this.showTrusteeship();
            }
        }
        else {
            if ((this.bindData.startTime - TimeManager.GetServerUtcTimestamp()) <= 300) {
                this.fiveMinStart();
                if ((this.bindData.startTime - TimeManager.GetServerUtcTimestamp()) < 60) {
                    this.oneMinStart();
                }
            }
            else {
                this.beyondFiveMinStart();
            }
            this.countDown();
            qin.Tick.AddSecondsInvoke(this.countDown, this);
        }
    };
    /**
     * mtt已报名显示
    */
    ChampionshipItemRenderer.prototype.hasJoinedShow = function () {
        this.startJoin();
        this.waitLabel.visible = true;
        this.showJoinedCostByJoinWay();
    };
    /**
     * mtt托管中
    */
    ChampionshipItemRenderer.prototype.showTrusteeship = function () {
        if (!this.bindData.outTime && !this.bindData.endTime) {
            this.trusteeshipShowSet();
            if (TimeManager.GetServerUtcTimestamp() > this.bindData.startTime + 3) {
                this.trusteeshipImg.source = SheetSubName.MTTTrusteeship;
            }
            else {
                this.trusteeshipImg.source = "";
            }
        }
    };
    /**
     * mtt未开始报名
    */
    ChampionshipItemRenderer.prototype.mttNotStartJoinShow = function () {
        this.startJoinGroup.visible = false;
        this.waitJoinGroup.visible = true;
        var today = new Date(TimeManager.GetServerUtcTimestamp() * 1000);
        var todayLastTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).getTime();
        var date = new Date((this.bindData.startTime - this.bindData.definition.signTime) * 1000);
        if (this.bindData.startTime - this.bindData.definition.signTime > Math.floor(todayLastTime / 1000)) {
            this.startJoinTimeLabel.text = (date.getMonth() + 1) + "-" + date.getDate() + "  " + qin.DateTimeUtil.formatDate(date, qin.DateTimeUtil.Format_Standard_NoSecond).split(qin.StringConstants.Blank)[1];
        }
        else {
            this.startJoinTimeLabel.text = "今日" + "  " + qin.DateTimeUtil.formatDate(date, qin.DateTimeUtil.Format_Standard_NoSecond).split(qin.StringConstants.Blank)[1];
        }
    };
    /**************坐满即玩***************/
    /**
     * 坐满即玩显示
    */
    ChampionshipItemRenderer.prototype.sitAndPlayShow = function () {
        this.sitAndGoNumGroup.visible = true;
        this.sitAndGonumLabel.text = "开赛人数:" + this.bindData.definition.bNum;
        this.getMoreInfo(this.bindData.id);
        if (this.bindData.joinWay) {
            this.sitAndPlayJoinedShow();
        }
        else {
            this.sitAndPlayNotJoinedShow();
        }
    };
    /**
     * 坐满即玩已报名显示
    */
    ChampionshipItemRenderer.prototype.sitAndPlayJoinedShow = function () {
        this.startJoin();
        this.showJoinedCostByJoinWay();
        this.trusteeshipShowSet();
        if (this.bindData.join >= this.bindData.definition.bNum) {
            //满足时显示托管中
            if (!this.bindData.outTime && !this.bindData.endTime) {
                this.trusteeshipImg.source = SheetSubName.MTTTrusteeship;
            }
        }
        else {
            this.trusteeshipImg.source = SheetSubName.SitAndPlay;
        }
    };
    /**
     * 坐满即玩未报名显示
    */
    ChampionshipItemRenderer.prototype.sitAndPlayNotJoinedShow = function () {
        this.sitAndPlayAwardGroup.visible = true;
        this.awardLabel.text = qin.MathUtil.formatNum(this.getSNGAllAward());
        this.notJoinedShow();
        qin.Tick.AddSecondsInvoke(this.getNowTime, this);
    };
    /**
     * 获得坐满即玩总奖励
    */
    ChampionshipItemRenderer.prototype.getSNGAllAward = function () {
        var championshipPrizeList = ChampionshipManager.getAwardList(this.bindData.id);
        var total = 0;
        if (championshipPrizeList) {
            for (var _i = 0, championshipPrizeList_1 = championshipPrizeList; _i < championshipPrizeList_1.length; _i++) {
                var championshipPrize = championshipPrizeList_1[_i];
                var num = AwardDefined.GetInstance().getAwardNumByAwardId(championshipPrize.awardId);
                if (num) {
                    total += num;
                }
            }
        }
        return total;
    };
    /**
     * 坐满即玩未开始报名显示
    */
    ChampionshipItemRenderer.prototype.sitAndPlayNotStartJoinShow = function () {
        this.startJoin();
        this.applyBtn.visible = true;
        this.applyBtn.enabled = false;
    };
    /**
     * 获得坐满即玩的协议信息
    */
    ChampionshipItemRenderer.prototype.getMoreInfo = function (id) {
        var sngMatchInfo = ChampionshipManager.getJoinedMathInfoById(id);
        if (sngMatchInfo) {
            this.bindData = sngMatchInfo;
        }
    };
    /*****************end*********************/
    /**
     * 初始化
    */
    ChampionshipItemRenderer.prototype.init = function () {
        this.rebuyImg.visible = false;
        this.addonImg.visible = false;
        this.goldImg.visible = false;
        this.ticketImg.visible = false;
        this.notStartGroup.visible = false;
        this.trusteeshipImg.visible = false;
        this.enterBtn.visible = false;
        this.applyBtn.visible = false;
        this.waitLabel.visible = false;
        this.startJoinGroup.visible = this.waitJoinGroup.visible = false;
        this.sitAndGoNumGroup.visible = this.sitAndPlayAwardGroup.visible = false; //坐满即玩
        this.mttNumGroup.visible = false; //锦标赛
        qin.Tick.RemoveSecondsInvoke(this.countDown, this);
        qin.Tick.RemoveSecondsInvoke(this.delayTimeCountDown, this);
    };
    /**
     * 托管中或者坐满即玩报名人数未达到开赛人数显示设置
    */
    ChampionshipItemRenderer.prototype.trusteeshipShowSet = function () {
        this.trusteeshipImg.visible = true;
        this.enterBtn.visible = true;
        this.notStartGroup.visible = false;
        this.applyBtn.visible = false;
        this.waitLabel.visible = false;
    };
    /**
     * 比赛开始时间大于5分钟时开始时间的颜色和背景设置
    */
    ChampionshipItemRenderer.prototype.setMoreFiveMStyle = function () {
        this.timeDesBGImg.visible = true;
        this.timeBGImg.visible = false;
        this.timeDesLabel.textColor = ColorEnum.MTT_time_Green;
    };
    /**
     * 开始时间小于5分钟颜色和背景设置
    */
    ChampionshipItemRenderer.prototype.setLessFiveMStyle = function () {
        this.timeDesBGImg.visible = false;
        this.timeBGImg.visible = true;
        this.timeDesLabel.textColor = ColorEnum.Yellow;
    };
    /**
     * 开始报名
    */
    ChampionshipItemRenderer.prototype.startJoin = function () {
        this.startJoinGroup.visible = true;
        this.waitJoinGroup.visible = false;
    };
    /**
     * 未报名显示
    */
    ChampionshipItemRenderer.prototype.notJoinedShow = function () {
        if (ChampionshipManager.isStartJoin(this.bindData)) {
            this.startJoin();
            this.applyBtn.enabled = true;
        }
        else {
            this.notStartJoinShow();
        }
        this.applyBtn.visible = true;
        this.showNotJoinCostByIsHasTicket();
    };
    /**
     * 已报名时根据报名方式显示报名费
    */
    ChampionshipItemRenderer.prototype.showJoinedCostByJoinWay = function () {
        if (this.bindData.joinWay == 1) {
            this.priceByGoldShow();
        }
        else if (this.bindData.joinWay == 2) {
            this.priceByTicketShow();
        }
    };
    /**
     * 未报名时根据是否有门票显示报名费
    */
    ChampionshipItemRenderer.prototype.showNotJoinCostByIsHasTicket = function () {
        if (this.isHaveThisMTTTicket()) {
            this.priceByTicketShow();
        }
        else {
            this.priceByGoldShow();
        }
    };
    /**
     * 未开始报名显示
    */
    ChampionshipItemRenderer.prototype.notStartJoinShow = function () {
        if (this.bindData.definition.type == MatchType.MTT) {
            this.mttNotStartJoinShow();
        }
        else if (this.bindData.definition.type == MatchType.SNG) {
            this.sitAndPlayNotStartJoinShow();
        }
    };
    /**
     * 秒循环获取当前时间 判断是否到达开启关闭报名时间点
    */
    ChampionshipItemRenderer.prototype.getNowTime = function () {
        if (this.bindData.openTime <= TimeManager.GetServerUtcTimestamp() * 1000) {
            this.startJoin();
            this.applyBtn.enabled = true;
        }
        if (this.bindData.closeTime <= TimeManager.GetServerUtcTimestamp() * 1000) {
            this.sitAndPlayNotStartJoinShow();
        }
    };
    /**
     * 判断是否有对应赛事的门票
    */
    ChampionshipItemRenderer.prototype.isHaveThisMTTTicket = function () {
        var flag = false;
        if (ItemManager.itemList && ItemManager.itemList.length > 0) {
            for (var _i = 0, _a = ItemManager.itemList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (this.bindData.definition.ticketId == def.id) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    };
    /**
     * 距离比赛开始大于5分钟
    */
    ChampionshipItemRenderer.prototype.beyondFiveMinStart = function () {
        this.notStartGroup.visible = true;
        this.timeDesBGImg.visible = true;
        this.timeBGImg.visible = false;
        this.setMoreFiveMStyle();
        this.getTimeDesAndTime();
        this._countDownNum = Math.floor(this.bindData.startTime - TimeManager.GetServerUtcTimestamp());
    };
    /**
     * 获得比赛时间描述
    */
    ChampionshipItemRenderer.prototype.getTimeDesAndTime = function () {
        var date = new Date(this.bindData.startTime * 1000);
        var today = new Date(TimeManager.GetServerUtcTimestamp() * 1000);
        var todayLastTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).getTime();
        if (this.bindData.startTime > Math.floor(todayLastTime / 1000) || this.bindData.startTime < (Math.floor(todayLastTime / 1000) - 86400)) {
            this.timeDesLabel.text = (date.getMonth() + 1) + "-" + date.getDate();
        }
        else {
            this.timeDesLabel.text = "今日";
        }
        this.timeLabel.text = qin.DateTimeUtil.formatDate(date, qin.DateTimeUtil.Format_Standard_NoSecond).split(qin.StringConstants.Blank)[1];
    };
    /**
     * 距离比赛开始小于5分钟大于1分钟
    */
    ChampionshipItemRenderer.prototype.fiveMinStart = function () {
        this.setLessFiveMStyle();
        this.notStartGroup.visible = true;
        this.timeDesLabel.text = "即将开始";
        this._countDownNum = Math.floor(this.bindData.startTime - TimeManager.GetServerUtcTimestamp());
    };
    /**
     * 距离比赛开始小于1分钟
    */
    ChampionshipItemRenderer.prototype.oneMinStart = function () {
        if (this.bindData.joinWay) {
            this.waitLabel.visible = false;
            this.enterBtn.visible = true;
        }
    };
    /**
     * 报名费有门票的时候的显示
    */
    ChampionshipItemRenderer.prototype.priceByTicketShow = function () {
        this.priceLabel.text = "X1";
        this.goldImg.visible = false;
        this.ticketImg.visible = true;
    };
    /**
     * 报名费用金币的时候的显示
    */
    ChampionshipItemRenderer.prototype.priceByGoldShow = function () {
        this.goldImg.visible = true;
        this.ticketImg.visible = false;
        if (this.bindData.definition.signCost == 0 || this.bindData.definition.signCost == undefined) {
            this.priceLabel.text = "免费" + "+" + qin.MathUtil.formatNum(this.bindData.definition.serveCost);
        }
        else {
            this.priceLabel.text = qin.MathUtil.formatNum(this.bindData.definition.signCost) + "+" + qin.MathUtil.formatNum(this.bindData.definition.serveCost);
        }
    };
    /**
     * 延迟报名时间结束后将赛事从赛事列表中删除
    */
    ChampionshipItemRenderer.prototype.delFromMTTList = function () {
        ChampionshipManager.refreshMTTMatchInfo(this.bindData.recordId);
    };
    /**
     * 立即报名成功
    */
    ChampionshipItemRenderer.prototype.requestJoinSuccess = function (data) {
        if (data.recordId == this.bindData.recordId) {
            this.applyBtn.visible = false;
            var matchType = this.bindData.definition.type;
            if (matchType == MatchType.MTT) {
                this.bindData.joinWay = data.flag;
                this.numLabel.text = this.bindData.join + "/" + this.bindData.definition.bNum;
                var time = this.bindData.startTime - TimeManager.GetServerUtcTimestamp();
                if (time <= 60) {
                    if (time < 0) {
                        // 直接进入比赛房间
                        ChampionshipManager.enterMttHandler.enterMatch(this.bindData, qin.StringConstants.Empty);
                    }
                    else {
                        this.enterBtn.visible = true;
                    }
                }
                else {
                    this.waitLabel.visible = true;
                }
            }
            else if (matchType == MatchType.SNG) {
                this.sitAndPlayAwardGroup.visible = false;
                this.sitAndPlayJoinedShow();
            }
        }
    };
    /**
     * 立即报名点击事件
    */
    ChampionshipItemRenderer.prototype.onaApplyBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        var flag = ItemManager.isHaveTicket(this.bindData.definition.ticketId);
        if (flag) {
            ChampionshipManager.reqRequestJoin(this.bindData.recordId, JoinChampionshipWay.Ticket, this.bindData.startTime, this.bindData.id, this.bindData.definition.type);
        }
        else {
            if (CostManager.verifyGold(this.bindData.definition.signCost + this.bindData.definition.serveCost, true)) {
                ChampionshipManager.reqRequestJoin(this.bindData.recordId, JoinChampionshipWay.Gold, this.bindData.startTime, this.bindData.id, this.bindData.definition.type);
            }
        }
    };
    /**
    * 立即进入
    */
    ChampionshipItemRenderer.prototype.onEnterBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (this.bindData.definition.type == MatchType.MTT) {
            ChampionshipManager.enterMttHandler.enterMatch(this.bindData, qin.StringConstants.Empty);
        }
        else if (this.bindData.definition.type == MatchType.SNG) {
            var enterMatch = ChampionshipManager.getMathInfoByRecordId(this.bindData.recordId);
            if (enterMatch) {
                ChampionshipManager.enterMttHandler.enterMatch(enterMatch, qin.StringConstants.Empty);
            }
            else {
                AlertManager.showAlert("获取赛事信息异常");
            }
        }
    };
    /**
     * 取消冒泡
    */
    ChampionshipItemRenderer.prototype.cancelBubble = function (event) {
        event.stopImmediatePropagation();
    };
    /**
     * 倒计时
    */
    ChampionshipItemRenderer.prototype.countDown = function () {
        this._countDownNum--;
        if (this._countDownNum <= 300) {
            this.timeLabel.text = qin.DateTimeUtil.countDownFormat(this._countDownNum, false);
            if (this._countDownNum < 60) {
                this.oneMinStart();
            }
            if (this._countDownNum <= 0) {
                qin.Tick.RemoveSecondsInvoke(this.countDown, this);
                this.countDownOver();
            }
        }
        if (this._countDownNum == 300) {
            this.fiveMinStart();
        }
        if (this._countDownNum == this.bindData.definition.signTime) {
            this.startJoin();
        }
    };
    /**
     * 延迟时间倒计时
    */
    ChampionshipItemRenderer.prototype.delayTimeCountDown = function () {
        this._countDownNum--;
        if (this._countDownNum >= 0) {
            this.timeLabel.text = qin.DateTimeUtil.countDownFormat(this._countDownNum, false);
        }
        else {
            qin.Tick.RemoveSecondsInvoke(this.delayTimeCountDown, this);
            this.delFromMTTList();
        }
    };
    /**
     * 倒计时结束操作(延迟时间内操作)
    */
    ChampionshipItemRenderer.prototype.countDownOver = function () {
        this.setLessFiveMStyle();
        if (this.bindData.definition.delaySign) {
            if (TimeManager.GetServerUtcTimestamp() >= this.bindData.startTime + this.bindData.definition.delaySign) {
                this.delFromMTTList();
            }
            else {
                this.notStartGroup.visible = true;
                this.timeDesLabel.text = "延迟报名";
                if (this.bindData.joinWay) {
                    this.waitLabel.visible = false;
                    this.enterBtn.visible = true;
                }
                this._countDownNum = Math.floor(this.bindData.startTime + this.bindData.definition.delaySign - TimeManager.GetServerUtcTimestamp());
                this.delayTimeCountDown();
                qin.Tick.AddSecondsInvoke(this.delayTimeCountDown, this);
            }
        }
        else {
            this.delFromMTTList();
        }
    };
    return ChampionshipItemRenderer;
}(BaseItemRenderer));
__reflect(ChampionshipItemRenderer.prototype, "ChampionshipItemRenderer");
//# sourceMappingURL=ChampionshipItemRenderer.js.map