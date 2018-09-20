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
 * 锦标赛赛事信息面板
 */
var ChampionshipInfoPanel = (function (_super) {
    __extends(ChampionshipInfoPanel, _super);
    function ChampionshipInfoPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.ChampionshipInfoPanel);
        return _this;
    }
    ChampionshipInfoPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.matchInfoTab.isTween = false;
        UIUtil.listRenderer(this.rankList, this.rankScroller, ChampionshipRankItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.reqscroller = new ReqScroller(this.rankScroller, this.rankList, 10, this.getMTTInfoRank.bind(this));
        UIUtil.listRenderer(this.blindList, this.blindScroller, BlindItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.awardList, this.awardScroller, AwardItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.rankScroller.scrollPolicyH = this.blindScroller.scrollPolicyH = this.awardScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        var array = new Array();
        array.push(this.baseInfoGroup);
        array.push(this.outsGroup);
        array.push(this.rankGroup);
        array.push(this.blindGroup);
        array.push(this.awardGroup);
        this._outsIndex = array.indexOf(this.outsGroup);
        this.matchInfoTab.build(TabComponent.CreatData(["概述", "赛况", "排名", "盲注", "奖励"], array, TabButtonType.SmallOf5));
    };
    ChampionshipInfoPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.matchInfoTab.init(0);
        this._isInRoom = undefined;
        if (appendData && appendData.isInRoom) {
            this._isInRoom = true;
            this.matchInfoTab.setSelectIndex(this._outsIndex);
            this.withdrawBtn.visible = false;
        }
        if (appendData.championshipInfo.definition.type == MatchType.SNG) {
            this.getMoreInfo();
        }
        else {
            this._championshipInfo = appendData.championshipInfo;
        }
        this.rebuyGroup.visible = this.addonGroup.visible = this.applicationBtn.visible = this.withdrawBtn.visible = this.hasJoinGroup.visible = this.noJoinGroup.visible = false;
        this.setAwardInfo();
        this.reset();
        if (this._championshipInfo.definition) {
            if (this._championshipInfo.recordId == undefined && this._championshipInfo.definition.type == MatchType.SNG) {
                this.setSitAndPlayNoRecordIdOutsInfo();
                this.setOutsInfo();
                return;
            }
            ChampionshipManager.reqOutsInfo(this._championshipInfo.recordId, this._championshipInfo.definition.blindType);
        }
    };
    ChampionshipInfoPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.matchInfoTab.tabChangeEvent.addListener(this.onTabClickHandler, this);
        ChampionshipManager.OnOutsInfoEvent.addListener(this.setOutsInfo, this);
        ChampionshipManager.OnRankInfoEvent.addListener(this.setRankInfo, this);
        this.applicationBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onApplicationBtnClick, this);
        this.withdrawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWithdrawBtnClick, this);
        ChampionshipManager.OnWithdrawEvent.addListener(this.closePanel, this);
        ChampionshipManager.onRequestJoinEvent.addListener(this.joinSuccess, this);
    };
    ChampionshipInfoPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.matchInfoTab.tabChangeEvent.removeListener(this.onTabClickHandler, this);
        ChampionshipManager.OnOutsInfoEvent.removeListener(this.setOutsInfo, this);
        ChampionshipManager.OnRankInfoEvent.removeListener(this.setRankInfo, this);
        qin.Tick.RemoveSecondsInvoke(this.countDown, this);
        qin.Tick.RemoveSecondsInvoke(this.countUp, this);
        this.applicationBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onApplicationBtnClick, this);
        this.withdrawBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onWithdrawBtnClick, this);
        ChampionshipManager.OnWithdrawEvent.removeListener(this.closePanel, this);
        ChampionshipManager.onRequestJoinEvent.removeListener(this.joinSuccess, this);
    };
    /**
     * 发送获取赛事排名
    */
    ChampionshipInfoPanel.prototype.getMTTInfoRank = function () {
        ChampionshipManager.reqRankInfo(this._championshipInfo.recordId, this.reqscroller.index, this.reqscroller.reqNum);
    };
    /**
     * 报名成功执行的事件
    */
    ChampionshipInfoPanel.prototype.joinSuccess = function () {
        this.applicationBtn.visible = false;
        this.withdrawBtn.visible = true;
        if (this._championshipInfo.definition.type == MatchType.MTT) {
            var time = this._championshipInfo.startTime - TimeManager.GetServerUtcTimestamp();
            if (time <= 0) {
                _super.prototype.onCloseBtnClickHandler.call(this, null);
            }
        }
    };
    /**
     * 退赛成功后关闭面板
    */
    ChampionshipInfoPanel.prototype.closePanel = function (data) {
        var matchType = this._championshipInfo.definition.type;
        if (matchType == MatchType.MTT) {
            this.mttWithDrawSuccessRemind(data);
        }
        else if (matchType == MatchType.SNG) {
            this.sitAndPlayWithDrawSuccessRemind();
        }
        this.onCloseBtnClickHandler(null);
    };
    /**
     * mtt退赛成功提示
    */
    ChampionshipInfoPanel.prototype.mttWithDrawSuccessRemind = function (data) {
        if (data.joinWay == JoinChampionshipWay.Ticket) {
            AlertManager.showAlert("退赛成功，您的门票已返回账户");
        }
        else {
            AlertManager.showAlert("退赛成功，报名费已返回账户");
        }
    };
    /**
     * 坐满即玩退赛成功提示
    */
    ChampionshipInfoPanel.prototype.sitAndPlayWithDrawSuccessRemind = function () {
        AlertManager.showAlert("退赛成功");
    };
    /**
     * 退赛按钮点击事件
    */
    ChampionshipInfoPanel.prototype.onWithdrawBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        var matchType = this._championshipInfo.definition.type;
        if (matchType == MatchType.MTT) {
            this.mttWithdraw();
        }
        else if (matchType == MatchType.SNG) {
            this.sitAndPlayWithdraw();
        }
    };
    /**
     * mtt退赛处理
    */
    ChampionshipInfoPanel.prototype.mttWithdraw = function () {
        if (TimeManager.GetServerUtcTimestamp() >= this._championshipInfo.startTime) {
            AlertManager.showAlert("比赛已经开启，不可退赛。");
            return;
        }
        if (this._championshipInfo.joinWay == JoinChampionshipWay.Ticket) {
            ChampionshipManager.reqWithdraw(this._championshipInfo.recordId);
        }
        else {
            AlertManager.showConfirm("提示：主动退赛仅退还报名费，服务费将不予退还。", this.confirmWithdraw, null, this._championshipInfo.recordId);
        }
    };
    /**
     * 坐满即玩退赛处理
    */
    ChampionshipInfoPanel.prototype.sitAndPlayWithdraw = function () {
        if (this._championshipInfo.join >= this._championshipInfo.definition.bNum) {
            AlertManager.showAlert("比赛已经开启，不可退赛。");
            return;
        }
        AlertManager.showConfirm("主动退赛将退还全部报名费、服务费或者门票，您是否进行退赛？", this.confirmWithdraw, null, this._championshipInfo.recordId);
    };
    /**
     * 退赛提示框确认退赛按钮执行事件
    */
    ChampionshipInfoPanel.prototype.confirmWithdraw = function (recordId) {
        ChampionshipManager.reqWithdraw(recordId);
    };
    /**
     * 报名按钮点击事件
    */
    ChampionshipInfoPanel.prototype.onApplicationBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (this._championshipInfo.definition) {
            var flag = ItemManager.isHaveTicket(this._championshipInfo.definition.ticketId);
            if (flag) {
                ChampionshipManager.reqRequestJoin(this._championshipInfo.recordId, JoinChampionshipWay.Ticket, this._championshipInfo.startTime, this._championshipInfo.id, this._championshipInfo.definition.type);
            }
            else {
                if (CostManager.verifyGold(this._championshipInfo.definition.signCost + this._championshipInfo.definition.serveCost, true)) {
                    ChampionshipManager.reqRequestJoin(this._championshipInfo.recordId, JoinChampionshipWay.Gold, this._championshipInfo.startTime, this._championshipInfo.id, this._championshipInfo.definition.type);
                }
            }
        }
    };
    /**
     * 设置奖励信息
    */
    ChampionshipInfoPanel.prototype.setAwardInfo = function () {
        var prizeListInfo = ChampionshipManager.getAwardList(this._championshipInfo.id);
        if (!ChampionshipManager.awardList) {
            ChampionshipManager.awardList = new Array();
        }
        ChampionshipManager.awardList.length = 0;
        if (prizeListInfo && prizeListInfo.length > 0) {
            for (var _i = 0, prizeListInfo_1 = prizeListInfo; _i < prizeListInfo_1.length; _i++) {
                var def = prizeListInfo_1[_i];
                var info = new ChampionshipAwardInfo();
                var des = AwardDefined.GetInstance().getAwardNameById(def.awardId);
                if (des) {
                    info.des = des;
                    info.rank = def.start;
                    ChampionshipManager.awardList.push(info);
                }
            }
        }
        if (ChampionshipManager.awardList.length > 0) {
            UIUtil.writeListInfo(this.awardList, ChampionshipManager.awardList, "rank");
        }
    };
    /**
     * 设置盲注信息
    */
    ChampionshipInfoPanel.prototype.setBlindInfo = function () {
        if (ChampionshipManager.blindList && ChampionshipManager.blindList.length > 0) {
            UIUtil.writeListInfo(this.blindList, ChampionshipManager.blindList, "id");
        }
    };
    /**
     * 设置排名信息
    */
    ChampionshipInfoPanel.prototype.setRankInfo = function (data) {
        if (data.rankList && !(data.isBottom && data.rankList.length <= 0 && this.reqscroller.index == 0)) {
            this.hasJoinGroup.visible = true;
            this.noJoinGroup.visible = false;
            this.reqscroller.init(new eui.ArrayCollection(data.rankList), data.isBottom);
        }
        else {
            this.hasJoinGroup.visible = false;
            this.noJoinGroup.visible = true;
        }
    };
    /**
     * 初始化
    */
    ChampionshipInfoPanel.prototype.reset = function () {
        this.rankLabel.text = "0";
        this.joinLabel.text = "0";
        this.nowAnteLabel.text = "0";
        this.nextAnteLabel.text = "0";
        this.forTimeLabel.text = "00:00:00";
        this.forTimeLabel.text = "00:00:00";
        this.surplusTimeGroup.visible = this.notStartGroup.visible = false;
    };
    /**
     * 设置赛况信息（坐满即玩比赛未生成无recordId时）
    */
    ChampionshipInfoPanel.prototype.setSitAndPlayNoRecordIdOutsInfo = function () {
        ChampionshipManager.nowBlindId = this._championshipInfo.definition.blindType;
        if (!ChampionshipManager.matchOutsInfo) {
            ChampionshipManager.matchOutsInfo = new MatchOutsInfo();
        }
        ChampionshipManager.nowBlindRank = 1;
        var mttBlindDef = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(ChampionshipManager.nowBlindRank, this._championshipInfo.definition.blindType);
        if (mttBlindDef) {
            ChampionshipManager.matchOutsInfo.addBlindTime = mttBlindDef.upTime;
        }
        var blindDef = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(ChampionshipManager.nowBlindRank, this._championshipInfo.definition.blindType);
        ChampionshipManager.setOutsBlindInfo(blindDef);
        ChampionshipManager.matchOutsInfo.rank = 0;
    };
    /**
     * 设置赛况信息
    */
    ChampionshipInfoPanel.prototype.setOutsInfo = function () {
        if (ChampionshipManager.matchOutsInfo) {
            if (ChampionshipManager.matchOutsInfo.rank) {
                this.rankLabel.text = ChampionshipManager.matchOutsInfo.rank.toString();
            }
            if (this._championshipInfo.join) {
                this.joinLabel.text = this._championshipInfo.join.toString();
            }
            if (this._championshipInfo.definition.type == MatchType.MTT) {
                var num = Math.floor(TimeManager.GetServerUtcTimestamp()) - this._championshipInfo.startTime;
                if (num > 0) {
                    this.countUpNum = num;
                    this.countUpLabel = this.forTimeLabel;
                    qin.Tick.AddSecondsInvoke(this.countUp, this);
                    this.surplusTimeGroup.visible = true;
                    this.notStartGroup.visible = false;
                    this.countDownNum = ChampionshipManager.matchOutsInfo.addBlindTime;
                    this.countDownLabel = this.surplusTimeLabel;
                    qin.Tick.AddSecondsInvoke(this.countDown, this);
                }
                else {
                    this.surplusTimeGroup.visible = false;
                    this.notStartGroup.visible = true;
                }
            }
            else if (this._championshipInfo.definition.type == MatchType.SNG) {
                if (this._championshipInfo.join >= this._championshipInfo.definition.bNum) {
                    var num = Math.floor(TimeManager.GetServerUtcTimestamp()) - this._championshipInfo.startTime;
                    if (num > 0) {
                        this.countUpNum = num;
                        this.countUpLabel = this.forTimeLabel;
                        qin.Tick.AddSecondsInvoke(this.countUp, this);
                        this.surplusTimeGroup.visible = true;
                        this.notStartGroup.visible = false;
                        this.countDownNum = ChampionshipManager.matchOutsInfo.addBlindTime;
                        this.countDownLabel = this.surplusTimeLabel;
                        qin.Tick.AddSecondsInvoke(this.countDown, this);
                    }
                }
                else {
                    this.surplusTimeGroup.visible = false;
                    this.notStartGroup.visible = true;
                }
            }
            this.nowBlindLabel.text = qin.MathUtil.formatNum(ChampionshipManager.matchOutsInfo.nowSBlind) + "/" + qin.MathUtil.formatNum(ChampionshipManager.matchOutsInfo.nowBBlind);
            if (ChampionshipManager.matchOutsInfo.nowAnte) {
                this.nowAnteLabel.text = qin.MathUtil.formatNum(ChampionshipManager.matchOutsInfo.nowAnte);
            }
            this.nextBlindLabel.text = qin.MathUtil.formatNum(ChampionshipManager.matchOutsInfo.nextSBlind) + "/" + qin.MathUtil.formatNum(ChampionshipManager.matchOutsInfo.nextBBlind);
            if (ChampionshipManager.matchOutsInfo.nextAnte) {
                this.nextAnteLabel.text = qin.MathUtil.formatNum(ChampionshipManager.matchOutsInfo.nextAnte);
            }
        }
        this.setApplicationInfo();
    };
    /**
     * 设置概述信息
    */
    ChampionshipInfoPanel.prototype.setApplicationInfo = function () {
        var champDef = this._championshipInfo.definition;
        if (champDef) {
            this.nameLabel.text = champDef.name;
            if (champDef.signCost == 0) {
                this.applicationFeeLabel.text = "免费" + "+" + champDef.serveCost + "服务费 ";
            }
            else {
                this.applicationFeeLabel.text = champDef.signCost + "金币" + "+" + champDef.serveCost + "服务费 " + "或 " + champDef.name + "门票1张";
            }
            this.initChipLabel.text = champDef.initialChips.toString();
            this.getChampionshipBlindInfo(champDef.blindType);
            if (this._championshipInfo.definition.type == MatchType.MTT) {
                this.setMTTApplicationInfo(champDef);
            }
            else if (this._championshipInfo.definition.type == MatchType.SNG) {
                this.setSitAndPlayApplicationInfo(champDef);
            }
        }
        if (this._championshipInfo.joinWay) {
            if (!this._isInRoom) {
                this.withdrawBtn.visible = true;
            }
        }
        else {
            this.applicationBtn.visible = true;
            if (ChampionshipManager.isStartJoin(this._championshipInfo)) {
                this.applicationBtn.enabled = true;
            }
            else {
                this.applicationBtn.enabled = false;
            }
        }
    };
    /**
     * 获得坐满即玩的协议信息
    */
    ChampionshipInfoPanel.prototype.getMoreInfo = function () {
        var sngMatchInfo = ChampionshipManager.getJoinedMathInfoById(this.panelData.championshipInfo.id);
        if (sngMatchInfo) {
            this._championshipInfo = sngMatchInfo;
        }
        else {
            this._championshipInfo = this.panelData.championshipInfo;
        }
    };
    /**
     * 设置mtt概述信息
    */
    ChampionshipInfoPanel.prototype.setMTTApplicationInfo = function (champDef) {
        this.timeDesLabel.text = "比赛时间:";
        var date = new Date(this._championshipInfo.startTime * 1000);
        if (champDef.delaySign) {
            this.timeLabel.text = (date.getMonth() + 1) + "-" + date.getDate() + " " + qin.DateTimeUtil.formatDate(date, qin.DateTimeUtil.Format_Standard_NoSecond).split(" ")[1] + "（延迟报名" + Math.floor(champDef.delaySign / 60) + "分钟）";
        }
        else {
            this.timeLabel.text = (date.getMonth() + 1) + "-" + date.getDate() + " " + qin.DateTimeUtil.formatDate(date, qin.DateTimeUtil.Format_Standard_NoSecond).split(" ")[1];
        }
        this.joinNumLabel.text = champDef.sNum + "-" + champDef.bNum + "人";
        this.setRebuyAndAddonInfo(champDef);
    };
    /**
     * 设置坐满即玩概述信息
    */
    ChampionshipInfoPanel.prototype.setSitAndPlayApplicationInfo = function (champDef) {
        this.timeDesLabel.text = "开放时间:";
        var date = new Date(this._championshipInfo.openTime);
        var endDate = new Date(this._championshipInfo.closeTime);
        this.timeLabel.text = qin.DateTimeUtil.formatDate(date, qin.DateTimeUtil.Format_Standard_NoSecond).split(" ")[1] + "-" + qin.DateTimeUtil.formatDate(endDate, qin.DateTimeUtil.Format_Standard_NoSecond).split(" ")[1] + "，坐满即开";
        this.joinNumLabel.text = champDef.bNum + "人";
    };
    /**
     * 设置锦标赛重购和增购信息
    */
    ChampionshipInfoPanel.prototype.setRebuyAndAddonInfo = function (champDef) {
        if (champDef.rebuy) {
            this.rebuyGroup.visible = true;
            this.rebuyDesLabel.textFlow = qin.TextUtil.parse('可重购比赛，次数：' +
                '<font color="#F3C655" size="24">' + champDef.rebuy + '次' + '</font>' +
                '，第' + '<font color="#F3C655" size="24">' + this.nthRebuy + '</font>' +
                '个盲注级别前可用' + '<font color="#F3C655" size="24">' + champDef.rebuyCost + '金币' + '</font>' +
                '兑换' + '<font color="#F3C655" size="24">' + champDef.initialChips + '比赛筹码' + '</font>');
        }
        if (champDef.addon) {
            this.addonGroup.visible = true;
            this.addonDesLabel.textFlow = qin.TextUtil.parse('可增购比赛，次数：' +
                '<font color="#F3C655" size="24">' + champDef.addon + '次' + '</font>' +
                '，第' + '<font color="#F3C655" size="24">' + this.nthAddon + '</font>' +
                '个盲注级别前可用' + '<font color="#F3C655" size="24">' + champDef.addonCost + '金币' + '</font>' +
                '兑换' + '<font color="#F3C655" size="24">' + champDef.addonChips + '比赛筹码' + '</font>');
        }
    };
    /**
     * 选项卡点击事件
    */
    ChampionshipInfoPanel.prototype.onTabClickHandler = function (index) {
        if (index == 1) {
            if (this._championshipInfo.definition) {
                ChampionshipManager.reqOutsInfo(this._championshipInfo.recordId, this._championshipInfo.definition.blindType);
            }
        }
        else if (index == 2) {
            if (this._championshipInfo.recordId == undefined && this._championshipInfo.definition && this._championshipInfo.definition.type == MatchType.SNG) {
                this.hasJoinGroup.visible = false;
                this.noJoinGroup.visible = true;
                return;
            }
            this.reqscroller.Clear();
            ChampionshipManager.reqRankInfo(this._championshipInfo.recordId, this.reqscroller.index, 10);
        }
    };
    /**
     * 获得盲注,重购,增购的信息
    */
    ChampionshipInfoPanel.prototype.getChampionshipBlindInfo = function (type) {
        if (!ChampionshipManager.blindList) {
            ChampionshipManager.blindList = new Array();
        }
        ChampionshipManager.blindList.length = 0;
        for (var _i = 0, _a = ChampionshipBlindDefined.GetInstance().dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.blindId == type) {
                ChampionshipManager.blindList.push(def);
                if (def.rebuy) {
                    this.nthRebuy = def.level;
                }
                if (def.addon) {
                    this.nthAddon = def.level;
                }
            }
        }
        this.setBlindInfo();
    };
    /**
     * 倒计时
    */
    ChampionshipInfoPanel.prototype.countDown = function () {
        if (this.countDownNum <= 0) {
            this.countDownLabel.text = qin.DateTimeUtil.countDownFormat(this.countDownNum, false);
        }
        else {
            this.countDownNum--;
            this.countDownLabel.text = qin.DateTimeUtil.countDownFormat(this.countDownNum, false);
        }
        if (this.countDownNum <= 0) {
            qin.Tick.RemoveSecondsInvoke(this.countDown, this);
            if (ChampionshipManager.blindList && ChampionshipManager.blindList.length > 0 && ChampionshipManager.nowBlindRank < ChampionshipManager.blindList.length) {
                ChampionshipManager.nowBlindRank++;
                this.refreshNowBlindColor();
                var blindDef = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(ChampionshipManager.nowBlindRank, ChampionshipManager.nowBlindId);
                ChampionshipManager.setOutsBlindInfo(blindDef);
                if (blindDef) {
                    ChampionshipManager.setOutsAddBlindTimeInfo(blindDef.upTime);
                }
                this.setOutsInfo();
            }
        }
    };
    /**
     * 更新当前盲注级别的颜色
    */
    ChampionshipInfoPanel.prototype.refreshNowBlindColor = function () {
        if (ChampionshipManager.nowBlindItem) {
            ChampionshipManager.nowBlindItem.rankLabel.textColor = ColorEnum.White;
            ChampionshipManager.nowBlindItem.blindLabel.textColor = ColorEnum.White;
            ChampionshipManager.nowBlindItem.anteLabel.textColor = ColorEnum.White;
            ChampionshipManager.nowBlindItem.timeLabel.textColor = ColorEnum.White;
            var item = void 0;
            for (var i = 0; i < this.blindList.numChildren; i++) {
                item = this.blindList.getChildAt(i);
                if (item.bindData.level == ChampionshipManager.nowBlindRank) {
                    item.rankLabel.textColor = ColorEnum.Golden;
                    item.blindLabel.textColor = ColorEnum.Golden;
                    item.anteLabel.textColor = ColorEnum.Golden;
                    item.timeLabel.textColor = ColorEnum.Golden;
                    ChampionshipManager.nowBlindItem = item;
                    break;
                }
            }
        }
    };
    /**
     * 正计时
    */
    ChampionshipInfoPanel.prototype.countUp = function () {
        this.countUpNum++;
        this.countUpLabel.text = qin.DateTimeUtil.countDownFormat(this.countUpNum, true);
        if (this.countUpNum >= 359999) {
            qin.Tick.RemoveSecondsInvoke(this.countUp, this);
        }
    };
    return ChampionshipInfoPanel;
}(BasePanel));
__reflect(ChampionshipInfoPanel.prototype, "ChampionshipInfoPanel");
//# sourceMappingURL=ChampionshipInfoPanel.js.map