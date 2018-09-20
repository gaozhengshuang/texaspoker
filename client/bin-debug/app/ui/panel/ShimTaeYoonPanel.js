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
 *  德州转转转
 */
var ShimTaeYoonPanel = (function (_super) {
    __extends(ShimTaeYoonPanel, _super);
    function ShimTaeYoonPanel() {
        var _this = _super.call(this) || this;
        _this._onceHeight = 150; //一个滚动图片的高
        _this._listOneY = -1003.5;
        _this._listTwoY = 46.5;
        _this._listHeight = 1050;
        _this._autoReqPoolTime = 30; //更新奖池秒数
        _this.setSkinName(UIModuleName.ShimTaeYoonPanel);
        return _this;
    }
    ShimTaeYoonPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        this._sourceList = new Array();
        this._bottomList = new Array();
        this._offsetScrollV = new Array();
        this._startImgIndexList = new Array();
        this._resultImgIndexList = new Array();
        this._coefficientList = new Array();
        this.shimTaeYoonInfo = new ShimTaeYoonInfo();
        for (var i = 0; i < 3; i++) {
            UIUtil.bindRender(this["list" + i], ShimTaeYoonItemRenderer, null);
            UIUtil.bindRender(this["list" + i + i], ShimTaeYoonItemRenderer, null);
            this["list" + i].useVirtualLayout = false;
            this["list" + i + i].useVirtualLayout = false;
            this["scroller" + i].viewport = this["group" + i];
            this["scroller" + i].scrollPolicyH = eui.ScrollPolicy.OFF;
            this["scroller" + i].scrollPolicyV = eui.ScrollPolicy.OFF;
        }
        for (var i = 0; i < 7; i++) {
            this._sourceList.push(i);
        }
        UIManager.pushResizeScroller(this.groupScroller, 1205);
        this.groupScroller.viewport = this.mainGroup;
        this.groupScroller.scrollPolicyV = eui.ScrollPolicy.AUTO;
        this.groupScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
    };
    ShimTaeYoonPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.group0.visible = this.group1.visible = this.group2.visible = false;
        qin.Tick.AddTimeoutInvoke(this.setGroupvisble, 300, this);
        this.setScrollerImg();
        this._activityInfo = new ActivityInfo();
        if (appendData) {
            this._activityInfo = appendData.info;
        }
        this.shimTaeYoonInfo.id = this._activityInfo.id;
        this.reset();
    };
    ShimTaeYoonPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        ActivityManager.onJoinActivityEvent.addListener(this.setActivityInfo, this);
        UIManager.onPanelCloseEvent.addListener(this.resetPanel, this);
        ActivityManager.onReqPubJsonEvent.addListener(this.setPoolInfo, this);
    };
    ShimTaeYoonPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        ActivityManager.onJoinActivityEvent.removeListener(this.setActivityInfo, this);
        UIManager.onPanelCloseEvent.removeListener(this.resetPanel, this);
        ActivityManager.onReqPubJsonEvent.removeListener(this.setPoolInfo, this);
        qin.Tick.RemoveTimeoutInvoke(this.showResultPanel, this);
        qin.Tick.RemoveSecondsInvoke(this.countDown, this);
        qin.Tick.RemoveTimeoutInvoke(this.setGroupvisble, this);
        for (var i = 0; i < 3; i++) {
            qin.Tick.RemoveTimeoutInvoke(this["scrollAnim" + i], this);
            egret.Tween.removeTweens(this["scroller" + i].viewport);
        }
    };
    ShimTaeYoonPanel.prototype.setGroupvisble = function () {
        this.group0.visible = this.group1.visible = this.group2.visible = true;
    };
    /**
     * 重置
    */
    ShimTaeYoonPanel.prototype.reset = function () {
        qin.ArrayUtil.Clear(this._bottomList);
        this.setOffsetScrollV([0, 0, 0]);
        this.setStartImgIndex([0, 0, 0]);
        this.setResultImgIndex([0, 0, 0]);
        this._bottomList = LaBaDefined.GetInstance().getBottomList(this._activityInfo.id);
        this._minBottom = this._bottomList[0];
        this._MaxBottom = this._bottomList[this._bottomList.length - 1];
        if (this._bottomList) {
            var num = this._bottomList.shift();
            this.forbidPrevBetBtn();
            this.openStartBtn();
            this.openNextBetBtn();
            this.openAutoStartBtn();
            this.autoStartBtn["btnImg"].source = SheetSubName.LaBa_AutoStartOpen;
            this.betLabel.text = num.toString();
            this._bottomList.push(num);
            this.reqPubInfo();
            qin.ArrayUtil.Clear(this._coefficientList);
            this._coefficientList = LaBaDefined.GetInstance().getCoefficientListByBottom(this._activityInfo.id, num);
        }
        this._isAutoStart = false;
        this.setSelfGold();
        for (var i = 0; i < 3; i++) {
            this["scroller" + i].viewport.scrollV = 0;
            this["group" + i].getChildAt(0).y = this._listOneY;
            this["group" + i].getChildAt(1).y = this._listTwoY;
        }
        this._isNext = true;
        this._countDownTime = this._autoReqPoolTime;
        this._isUnderway = false;
        qin.Tick.AddSecondsInvoke(this.countDown, this);
    };
    /**
     * 倒计时拉取奖池信息
    */
    ShimTaeYoonPanel.prototype.countDown = function () {
        this._countDownTime--;
        if (this._countDownTime <= 0) {
            this.reqPubInfo();
        }
    };
    /**
     * 设置奖池信息
    */
    ShimTaeYoonPanel.prototype.setPoolInfo = function (data) {
        if (data && data.Array && data.Array[0].Id == this._activityInfo.id) {
            var num = parseInt(this.betLabel.text);
            switch (num) {
                case 200:
                    this.poolLabel.text = qin.MathUtil.numAddSpace(data.Array[0].Step1);
                    break;
                case 2000:
                    this.poolLabel.text = qin.MathUtil.numAddSpace(data.Array[0].Step2);
                    break;
                case 20000:
                    this.poolLabel.text = qin.MathUtil.numAddSpace(data.Array[0].Step3);
                    break;
                case 200000:
                    this.poolLabel.text = qin.MathUtil.numAddSpace(data.Array[0].Step4);
                    break;
            }
            this._countDownTime = this._autoReqPoolTime;
        }
        else {
            this.poolLabel.text = "0";
        }
    };
    /**
     * 设置开始图片的index数据
    */
    ShimTaeYoonPanel.prototype.setStartImgIndex = function (arr) {
        for (var i = 0; i < 3; i++) {
            this._startImgIndexList[i] = arr[i];
        }
    };
    /**
     * 设置结果图片的index数据
    */
    ShimTaeYoonPanel.prototype.setResultImgIndex = function (arr) {
        for (var i = 0; i < 3; i++) {
            this._resultImgIndexList[i] = arr[i];
        }
    };
    /**
     * 设置滚动结果偏移数据
    */
    ShimTaeYoonPanel.prototype.setOffsetScrollV = function (arr) {
        for (var i = 0; i < 3; i++) {
            this._offsetScrollV[i] = arr[i];
        }
    };
    /**
     * 设置自己的金额
    */
    ShimTaeYoonPanel.prototype.setSelfGold = function () {
        this.selfGoldLabel.text = qin.MathUtil.numAddSpace(UserManager.userInfo.gold);
        this._selfGold = UserManager.userInfo.gold;
    };
    /**
     * 禁用开始按钮
    */
    ShimTaeYoonPanel.prototype.forbidStartBtn = function () {
        this.startBtn.enabled = false;
    };
    /**
     * 开启开始按钮
    */
    ShimTaeYoonPanel.prototype.openStartBtn = function () {
        this.startBtn.enabled = true;
    };
    /**
     * 禁用下一个投注按钮
    */
    ShimTaeYoonPanel.prototype.forbidNextBetBtn = function () {
        this.nextBetBtn.enabled = false;
    };
    /**
     * 开启下一个投注按钮
    */
    ShimTaeYoonPanel.prototype.openNextBetBtn = function () {
        this.nextBetBtn.enabled = true;
    };
    /**
     * 禁用上一个投注按钮
    */
    ShimTaeYoonPanel.prototype.forbidPrevBetBtn = function () {
        this.prevBetBtn.enabled = false;
    };
    /**
     * 开启上一个投注按钮
    */
    ShimTaeYoonPanel.prototype.openPrevBetBtn = function () {
        this.prevBetBtn.enabled = true;
    };
    /**
     * 禁用自动开始按钮
    */
    ShimTaeYoonPanel.prototype.forbidAutoStartBtn = function () {
        this.autoStartBtn.touchEnabled = false;
    };
    /**
     * 开启自动开始按钮
    */
    ShimTaeYoonPanel.prototype.openAutoStartBtn = function () {
        this.autoStartBtn.touchEnabled = true;
    };
    /**
     * 写入滚动的图片
    */
    ShimTaeYoonPanel.prototype.setScrollerImg = function () {
        UIUtil.writeListInfo(this.list0, this._sourceList, null);
        UIUtil.writeListInfo(this.list00, this._sourceList, null);
        UIUtil.writeListInfo(this.list1, this._sourceList, null);
        UIUtil.writeListInfo(this.list11, this._sourceList, null);
        UIUtil.writeListInfo(this.list2, this._sourceList, null);
        UIUtil.writeListInfo(this.list22, this._sourceList, null);
    };
    /**
     * 开始按钮点击事件
    */
    ShimTaeYoonPanel.prototype.onStartBtnClick = function () {
        //发送开始请求
        this.reqStart();
    };
    /**
     * 自动开始按钮点击事件
    */
    ShimTaeYoonPanel.prototype.onAutoStartBtnClick = function () {
        if (!this._isAutoStart) {
            this._isAutoStart = true;
            this.autoStartBtn["btnImg"].source = SheetSubName.LaBa_AutoStartClose;
            if (!this._isUnderway) {
                this.forbidStartBtn();
                //发送开始请求
                this.reqStart();
            }
        }
        else {
            this._isAutoStart = false;
            this.autoStartBtn["btnImg"].source = SheetSubName.LaBa_AutoStartOpen;
        }
    };
    /**
     * 底注数组读取第一个后移到最后一个并返回第一个
    */
    ShimTaeYoonPanel.prototype.getFirstBottom = function () {
        var num;
        if (this._bottomList) {
            num = this._bottomList.shift();
            this._bottomList.push(num);
        }
        return num;
    };
    /**
     * 底注数组读取最后一个后移到第一个并返回最后一个
    */
    ShimTaeYoonPanel.prototype.getLastBottom = function () {
        var num;
        if (this._bottomList) {
            num = this._bottomList.pop();
            this._bottomList.unshift(num);
        }
        return num;
    };
    /**
     * 下一个投注按钮点击事件
    */
    ShimTaeYoonPanel.prototype.onNextBetBtnClick = function () {
        if (this._bottomList) {
            var num = void 0;
            if (this._isNext) {
                num = this.getFirstBottom();
            }
            else {
                num = this.getFirstBottom();
                num = this.getFirstBottom();
                this._isNext = true;
            }
            if (num == this._MaxBottom) {
                this.forbidNextBetBtn();
            }
            if (this.prevBetBtn.enabled == false) {
                this.openPrevBetBtn();
            }
            this.betLabel.text = num.toString();
            this.reqPubInfo();
            qin.ArrayUtil.Clear(this._coefficientList);
            this._coefficientList = LaBaDefined.GetInstance().getCoefficientListByBottom(this._activityInfo.id, num);
        }
    };
    /**
     * 上一个投注按钮点击事件
    */
    ShimTaeYoonPanel.prototype.onPrevBetBtnClick = function () {
        if (this._bottomList) {
            var num = void 0;
            if (!this._isNext) {
                num = this.getLastBottom();
            }
            else {
                num = this.getLastBottom();
                num = this.getLastBottom();
                this._isNext = false;
            }
            if (num == this._minBottom) {
                this.forbidPrevBetBtn();
            }
            if (this.nextBetBtn.enabled == false) {
                this.openNextBetBtn();
            }
            this.betLabel.text = num.toString();
            this.reqPubInfo();
            qin.ArrayUtil.Clear(this._coefficientList);
            this._coefficientList = LaBaDefined.GetInstance().getCoefficientListByBottom(this._activityInfo.id, num);
        }
    };
    /**
     * 请求公共数据
    */
    ShimTaeYoonPanel.prototype.reqPubInfo = function () {
        ActivityManager.reqPubJson(this._activityInfo.id);
    };
    /**
     * 写入活动数据
    */
    ShimTaeYoonPanel.prototype.setActivityInfo = function (data) {
        if (data) {
            if (data.ResultList) {
                var def = LaBaDefined.GetInstance().getSubDefinition(this._activityInfo.id, data.ResultList[0].SubId);
                if (def) {
                    this._type = def.type;
                }
            }
            if (data.AwardList) {
                this.shimTaeYoonInfo.gold = data.AwardList[0].Count;
            }
            this.startScroll();
            this.selfGoldLabel.text = qin.MathUtil.numAddSpace(this._selfGold - parseInt(this.betLabel.text));
            this._isUnderway = true;
        }
    };
    /**
     * 开始滚动
    */
    ShimTaeYoonPanel.prototype.startScroll = function () {
        this.setScrollerResult();
        this.forbidStartBtn();
        this.forbidNextBetBtn();
        this.forbidPrevBetBtn();
        if (!this._isAutoStart) {
            this.forbidAutoStartBtn();
            this.autoStartBtn["btnImg"].source = SheetSubName.LaBa_AutoStartClose;
        }
        var round = this.getRandomRound(4, 6);
        for (var i = 0; i < 3; i++) {
            this["_flag" + i] = false;
            this["_index" + i] = 1;
            this["_changeYFlag" + i] = false;
            this["_isFirstChangeY" + i] = true;
        }
        if (round) {
            this.scrollAnim0(round);
            for (var i = 1; i < 3; i++) {
                qin.Tick.AddTimeoutInvoke(this["scrollAnim" + i], i * 500, this, round);
            }
        }
    };
    /**
     * 滚动动画
    */
    ShimTaeYoonPanel.prototype.scrollAnim0 = function (round) {
        this.group0.getChildAt(0).y = this._listOneY;
        this.group0.getChildAt(1).y = this._listTwoY;
        var startScrollV = this._startImgIndexList[0] * this._onceHeight;
        var offsetScrollV = this._offsetScrollV[0];
        var targetPos = this._onceHeight * 7 * round + startScrollV + offsetScrollV;
        egret.Tween.get(this.scroller0.viewport, { onChange: this.onScroll0, onChangeObj: this })
            .set({ scrollV: startScrollV })
            .to({ scrollV: targetPos }, 4000, egret.Ease.quadInOut)
            .call(this.scrollEnd, this, [0]);
    };
    ShimTaeYoonPanel.prototype.scrollAnim1 = function (round) {
        this.group1.getChildAt(0).y = this._listOneY;
        this.group1.getChildAt(1).y = this._listTwoY;
        var startScrollV = this._startImgIndexList[1] * this._onceHeight;
        var offsetScrollV = this._offsetScrollV[1];
        var targetPos = this._onceHeight * 7 * round + startScrollV + offsetScrollV;
        egret.Tween.get(this.scroller1.viewport, { onChange: this.onScroll1, onChangeObj: this })
            .set({ scrollV: startScrollV })
            .to({ scrollV: targetPos }, 4000, egret.Ease.quadInOut)
            .call(this.scrollEnd, this, [1]);
    };
    ShimTaeYoonPanel.prototype.scrollAnim2 = function (round) {
        this.group2.getChildAt(0).y = this._listOneY;
        this.group2.getChildAt(1).y = this._listTwoY;
        var startScrollV = this._startImgIndexList[2] * this._onceHeight;
        var offsetScrollV = this._offsetScrollV[2];
        var targetPos = this._onceHeight * 7 * round + startScrollV + offsetScrollV;
        egret.Tween.get(this.scroller2.viewport, { onChange: this.onScroll2, onChangeObj: this })
            .set({ scrollV: startScrollV })
            .to({ scrollV: targetPos }, 4000, egret.Ease.quadInOut)
            .call(this.scrollEnd, this, [2]);
    };
    /**
     * 设置滚动结果
    */
    ShimTaeYoonPanel.prototype.setScrollerResult = function () {
        if (this._type) {
            var offsetIndex0 = void 0;
            var offsetIndex1 = void 0;
            var offsetIndex2 = void 0;
            switch (this._type) {
                case ShimTaeYoonResultType.ThreeSev:
                case ShimTaeYoonResultType.ThreeBAR:
                case ShimTaeYoonResultType.ThreeApple:
                case ShimTaeYoonResultType.ThreeBell:
                case ShimTaeYoonResultType.ThreeGrape:
                case ShimTaeYoonResultType.ThreePersimmon:
                case ShimTaeYoonResultType.ThreeCherry:
                    this.setResultImgIndex([this._type - 1, this._type - 1, this._type - 1]);
                    offsetIndex0 = this._resultImgIndexList[0] - this._startImgIndexList[0];
                    offsetIndex1 = this._resultImgIndexList[1] - this._startImgIndexList[1];
                    offsetIndex2 = this._resultImgIndexList[2] - this._startImgIndexList[2];
                    this.setOffsetScrollV([this._onceHeight * offsetIndex0, this._onceHeight * offsetIndex1, this._onceHeight * offsetIndex2]);
                    break;
                case ShimTaeYoonResultType.TwoCherry:
                    var arr = this.getResultImgTwoCherry(ShimTaeYoonResultType.TwoCherry, ShimTaeYoonImgIndex.Cherry);
                    this.setOffsetScrollV(arr);
                    break;
                case ShimTaeYoonResultType.OneCherry:
                    var arr1 = this.getResultImgOneCherry(ShimTaeYoonResultType.OneCherry, ShimTaeYoonImgIndex.Cherry);
                    this.setOffsetScrollV(arr1);
                    break;
                case ShimTaeYoonResultType.NoAward:
                    var arr2 = this.getResultImgNoAward();
                    this.setOffsetScrollV(arr2);
                    break;
            }
        }
    };
    /**
     * 没中奖时
    */
    ShimTaeYoonPanel.prototype.getResultImgNoAward = function () {
        var arr0 = new Array(0, 1, 2);
        var arr1 = new Array(); //结果的图片的index数组                  
        var scrollerImgIndex0 = this.getRandomRound(0, 5);
        var scrollerImgIndex1 = this.getRandomRound(0, 5);
        var scrollerImgIndex2 = this.getRandomRound(0, 5);
        var scrollerIndex;
        if (scrollerImgIndex0 == scrollerImgIndex1 && scrollerImgIndex0 == scrollerImgIndex2) {
            scrollerIndex = this.getRandomRound(0, 2);
            scrollerImgIndex0 = this.getRandomRound(0, 5);
            while (scrollerImgIndex0 == scrollerImgIndex1) {
                scrollerImgIndex0 = this.getRandomRound(0, 5);
            }
        }
        else {
            scrollerIndex = 1;
        }
        for (var i = 0; i < arr0.length; i++) {
            if (arr0[i] == scrollerIndex) {
                arr0.splice(i, 1);
                arr1[i] = scrollerImgIndex0;
                break;
            }
        }
        arr1[arr0[0]] = scrollerImgIndex1;
        arr1[arr0[1]] = scrollerImgIndex2;
        this.setResultImgIndex(arr1);
        return this.getScrollVList();
    };
    /**
     * 结果是一个樱桃时
    */
    ShimTaeYoonPanel.prototype.getResultImgOneCherry = function (shimTaeYoonResultType, shimTaeYoonImgIndex) {
        var arr0 = new Array(0, 1, 2);
        var arr1 = new Array(); //结果的图片的index数组        
        var scrollerIndex0 = this.getRandomRound(0, 2); //是樱桃的那个滚动框的编号
        var scrollerImgIndex0 = this.getRandomRound(0, 6); //不是樱桃的图片的编号
        var scrollerImgIndex1 = this.getRandomRound(0, 6); //不是樱桃的图片的编号
        for (var i = 0; i < arr0.length; i++) {
            if (arr0[i] == scrollerIndex0) {
                arr0.splice(i, 1);
                arr1[i] = shimTaeYoonImgIndex;
                break;
            }
        }
        while (scrollerImgIndex0 == shimTaeYoonImgIndex) {
            scrollerImgIndex0 = this.getRandomRound(0, 6);
        }
        while (scrollerImgIndex1 == shimTaeYoonImgIndex) {
            scrollerImgIndex1 = this.getRandomRound(0, 6);
        }
        arr1[arr0[0]] = scrollerImgIndex0;
        arr1[arr0[1]] = scrollerImgIndex1;
        this.setResultImgIndex(arr1);
        return this.getScrollVList();
    };
    /**
     * 结果是2个相同的时
    */
    ShimTaeYoonPanel.prototype.getResultImgTwoCherry = function (shimTaeYoonResultType, shimTaeYoonImgIndex) {
        var scrollerIndex0 = this.getRandomRound(0, 2); //不相同的那个滚动框的编号
        var scrollerImgIndex = this.getRandomRound(0, 6); //不相同的那个图片的编号
        while (scrollerImgIndex == shimTaeYoonImgIndex) {
            scrollerImgIndex = this.getRandomRound(0, 6);
        }
        var arr1 = new Array(); //结果的图片的index数组
        for (var i = 0; i < 3; i++) {
            if (i == scrollerIndex0) {
                arr1[i] = scrollerImgIndex;
            }
            else {
                arr1[i] = shimTaeYoonImgIndex;
            }
        }
        this.setResultImgIndex(arr1);
        return this.getScrollVList();
    };
    /**
     * 计算并返回结果scrollv偏移的距离
    */
    ShimTaeYoonPanel.prototype.getScrollVList = function () {
        var offsetIndex0;
        var offsetIndex1;
        var offsetIndex2;
        var arr = new Array(); //结果scrollv偏移的距离
        offsetIndex0 = this._resultImgIndexList[0] - this._startImgIndexList[0];
        offsetIndex1 = this._resultImgIndexList[1] - this._startImgIndexList[1];
        offsetIndex2 = this._resultImgIndexList[2] - this._startImgIndexList[2];
        arr[0] = this._onceHeight * offsetIndex0;
        arr[1] = this._onceHeight * offsetIndex1;
        arr[2] = this._onceHeight * offsetIndex2;
        return arr;
    };
    /**
     * 调整图片位置
    */
    ShimTaeYoonPanel.prototype.setImgPos = function (i) {
        var num;
        if (this["_isFirstChangeY" + i]) {
            num = this["scroller" + i].viewport.scrollV / 853.5;
        }
        else {
            num = (this["scroller" + i].viewport.scrollV - 853.5) / this._listHeight + 1;
        }
        if (num >= this["_index" + i]) {
            this["_preIndex" + i] = Math.floor(num);
            if (this["_preIndex" + i] == this["_index" + i]) {
                this["_flag" + i] = true;
            }
        }
        if (this["_flag" + i] == true) {
            this["_flag" + i] = false;
            if (!this["_changeYFlag" + i]) {
                this["group" + i].getChildAt(0).y = this._listHeight * this["_index" + i] + Math.abs(this._listTwoY);
                this["_isFirstChangeY" + i] = false;
            }
            else {
                this["group" + i].getChildAt(1).y = this._listHeight * this["_index" + i] + Math.abs(this._listTwoY);
            }
            this["_index" + i]++;
            this["_changeYFlag" + i] = !this["_changeYFlag" + i];
        }
    };
    /**
     * 滚动时
    */
    ShimTaeYoonPanel.prototype.onScroll0 = function () {
        this.setImgPos(0);
    };
    ShimTaeYoonPanel.prototype.onScroll1 = function () {
        this.setImgPos(1);
    };
    ShimTaeYoonPanel.prototype.onScroll2 = function () {
        this.setImgPos(2);
    };
    /**
     * 滚动结束
    */
    ShimTaeYoonPanel.prototype.scrollEnd = function (index) {
        if (index == 2) {
            qin.Tick.AddTimeoutInvoke(this.showResultPanel, 500, this);
        }
    };
    /**
     * 显示结果后重置面板状态
    */
    ShimTaeYoonPanel.prototype.resetPanel = function (panelName) {
        if (panelName == UIModuleName.ShimTaeYoonResultPanel) {
            this._isUnderway = false;
            this.reqPubInfo();
            this.openAutoStartBtn();
            this.autoStartBtn["btnImg"].source = SheetSubName.LaBa_AutoStartOpen;
            this.setStartImgIndex(this._resultImgIndexList);
            if (this._isAutoStart) {
                //发送开始请求
                this.reqStart();
            }
            else {
                this.resetBtnState();
            }
        }
        if (panelName == UIModuleName.ShoppingPanel) {
            this.setSelfGold();
        }
    };
    /**
     * 重置按钮状态
    */
    ShimTaeYoonPanel.prototype.resetBtnState = function () {
        var bet = parseInt(this.betLabel.text);
        if (bet != this._minBottom) {
            this.openPrevBetBtn();
        }
        if (bet != this._MaxBottom) {
            this.openNextBetBtn();
        }
        this.openStartBtn();
    };
    /**
     * 显示结果面板
    */
    ShimTaeYoonPanel.prototype.showResultPanel = function () {
        this.setSelfGold();
        UIManager.showPanel(UIModuleName.ShimTaeYoonResultPanel, { gold: this.shimTaeYoonInfo.gold, type: this._type });
    };
    /**
     * 发送开始请求
    */
    ShimTaeYoonPanel.prototype.reqStart = function () {
        var num = parseInt(this.betLabel.text);
        if (this._isAutoStart) {
            this.autoStartBtn["btnImg"].source = SheetSubName.LaBa_AutoStartClose;
        }
        if (UserManager.userInfo.gold < num) {
            if (this._isAutoStart) {
                this._isAutoStart = false;
                this.autoStartBtn["btnImg"].source = SheetSubName.LaBa_AutoStartOpen;
                this.resetBtnState();
            }
            AlertManager.showConfirm("您的金币不足，快去商城补充点金币吧！", this.goShoppingPanel, null, null, null, null, "前往商城");
            return;
        }
        var def = LaBaDefined.GetInstance().getDefByBottom(this._activityInfo.id, parseInt(this.betLabel.text));
        var id;
        var subId;
        if (def) {
            id = def.id;
            subId = def.subId;
            ActivityManager.reqJoinActivity(id, subId);
        }
    };
    /**
    * 充值金币
   */
    ShimTaeYoonPanel.prototype.goShoppingPanel = function (event) {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { prevPanelName: UIModuleName.ShimTaeYoonPanel });
    };
    /**
     * 获得随机数
    */
    ShimTaeYoonPanel.prototype.getRandomRound = function (start, end) {
        return (Math.floor(Math.random() * 1000000000)) % (end - start + 1) + start;
    };
    /**
     * 点击事件处理
    */
    ShimTaeYoonPanel.prototype.clickHandler = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        switch (event.target) {
            case this.helpBtn:
                UIManager.showPanel(UIModuleName.ShimTaeYoonHelpPanel, { coefficientList: this._coefficientList, bottom: parseInt(this.betLabel.text) });
                break;
            case this.rankBtn:
                UIManager.showPanel(UIModuleName.ShimTaeYoonRankPanel, this._activityInfo);
                break;
            case this.nextBetBtn:
                this.onNextBetBtnClick();
                break;
            case this.prevBetBtn:
                this.onPrevBetBtnClick();
                break;
            case this.startBtn:
                this.onStartBtnClick();
                break;
            case this.autoStartBtn:
                this.onAutoStartBtnClick();
                break;
        }
    };
    ShimTaeYoonPanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    return ShimTaeYoonPanel;
}(BaseActivityPanel));
__reflect(ShimTaeYoonPanel.prototype, "ShimTaeYoonPanel");
//# sourceMappingURL=ShimTaeYoonPanel.js.map