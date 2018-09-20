/**
 *  德州转转转
 */
class ShimTaeYoonPanel extends BaseActivityPanel
{
    public groupScroller: eui.Scroller;
    public mainGroup: eui.Group;
    /**
     * 背景图
    */
    public bgImg: eui.Image;
    /**
     * 自己的金币
    */
    public selfGoldLabel: eui.Label;
    private _selfGold: number;
    /**
     * 帮助
    */
    public helpBtn: eui.Button;
    /**
     * 奖池
    */
    public poolLabel: eui.Label;
    /**
     * 投注
    */
    public prevBetBtn: eui.Button;  //投注按钮
    public nextBetBtn: eui.Button;  //投注按钮
    public betLabel: eui.Label;  //投注的额度
    /**
     * 开始按钮
    */
    public startBtn: eui.Button;
    /**
     * 自动开始按钮
    */
    public autoStartBtn: eui.Button;
    /**
     * 排行按钮
    */
    public rankBtn: eui.Button;
    /**
     * 滚动内容
    */
    public scroller0: eui.Scroller;
    public scroller1: eui.Scroller;
    public scroller2: eui.Scroller;
    public list0: eui.List;
    public list00: eui.List;
    public list1: eui.List;
    public list11: eui.List;
    public list2: eui.List;
    public list22: eui.List;
    public group0: eui.Group;
    public group1: eui.Group;
    public group2: eui.Group;

    /**
     * 是否自动开始
    */
    private _isAutoStart: boolean;
    private _sourceList: Array<number>;

    private _index0: number;  //第几次切换y坐标
    private _index1: number;
    private _index2: number;
    private _flag0: boolean;  //是否改变y坐标标记
    private _flag1: boolean;
    private _flag2: boolean;
    private _changeYFlag0: boolean;  //切换y坐标标记
    private _changeYFlag1: boolean;
    private _changeYFlag2: boolean;
    private _isFirstChangeY0: boolean;  //是否是列表1第一次切换y坐标
    private _isFirstChangeY1: boolean;
    private _isFirstChangeY2: boolean;
    private _preIndex0: number;  //已经切换过几次y坐标
    private _preIndex1: number;
    private _preIndex2: number;
    private _bottomList: Array<number>;  //底注金额数组
    private _startImgIndexList: Array<number>;  //开始的3个图片的index
    private _resultImgIndexList: Array<number>;  //结果的3个图片的index
    private _offsetScrollV: Array<number>;  //滚动结果偏移距离
    private readonly _onceHeight: number = 150;  //一个滚动图片的高
    private readonly _listOneY: number = -1003.5;
    private readonly _listTwoY: number = 46.5;
    private readonly _listHeight: number = 1050;
    private readonly _autoReqPoolTime: number = 30;  //更新奖池秒数
    private _coefficientList: Array<number>;  //赔率数组
    private _activityInfo: ActivityInfo;
    private _minBottom: number;  //最小底注
    private _MaxBottom: number;  //最大底注
    private _isNext: boolean;  //点击的时候是下一个按钮
    private _countDownTime: number;
    private _type: number; // 结果类型
    private _isUnderway: boolean;  //是否进行中
    /**
     * 德州转转转活动信息
    */
    public shimTaeYoonInfo: ShimTaeYoonInfo;

    private _anime: PanelAnime;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.ShimTaeYoonPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        this._sourceList = new Array<number>();
        this._bottomList = new Array<number>();
        this._offsetScrollV = new Array<number>();
        this._startImgIndexList = new Array<number>();
        this._resultImgIndexList = new Array<number>();
        this._coefficientList = new Array<number>();
        this.shimTaeYoonInfo = new ShimTaeYoonInfo();
        for (let i: number = 0; i < 3; i++)
        {
            UIUtil.bindRender(this["list" + i], ShimTaeYoonItemRenderer, null);
            UIUtil.bindRender(this["list" + i + i], ShimTaeYoonItemRenderer, null);
            this["list" + i].useVirtualLayout = false;
            this["list" + i + i].useVirtualLayout = false;
            this["scroller" + i].viewport = this["group" + i];
            this["scroller" + i].scrollPolicyH = eui.ScrollPolicy.OFF;
            this["scroller" + i].scrollPolicyV = eui.ScrollPolicy.OFF;
        }
        for (let i: number = 0; i < 7; i++)
        {
            this._sourceList.push(i);
        }
        UIManager.pushResizeScroller(this.groupScroller, 1205);
        this.groupScroller.viewport = this.mainGroup;
        this.groupScroller.scrollPolicyV = eui.ScrollPolicy.AUTO;
        this.groupScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.group0.visible = this.group1.visible = this.group2.visible = false;
        game.Tick.AddTimeoutInvoke(this.setGroupvisble, 300, this);
        this.setScrollerImg();
        this._activityInfo = new ActivityInfo();
        if (appendData)
        {
            this._activityInfo = appendData.info;
        }
        this.shimTaeYoonInfo.id = this._activityInfo.id;
        this.reset();
    }

    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this._anime.onEnable();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        ActivityManager.onJoinActivityEvent.addListener(this.setActivityInfo, this);
        UIManager.onPanelCloseEvent.addListener(this.resetPanel, this);
        ActivityManager.onReqPubJsonEvent.addListener(this.setPoolInfo, this)
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this._anime.onDisable();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        ActivityManager.onJoinActivityEvent.removeListener(this.setActivityInfo, this);
        UIManager.onPanelCloseEvent.removeListener(this.resetPanel, this);
        ActivityManager.onReqPubJsonEvent.removeListener(this.setPoolInfo, this)
        game.Tick.RemoveTimeoutInvoke(this.showResultPanel, this);
        game.Tick.RemoveSecondsInvoke(this.countDown, this);
        game.Tick.RemoveTimeoutInvoke(this.setGroupvisble, this);
        for (let i: number = 0; i < 3; i++)
        {
            game.Tick.RemoveTimeoutInvoke(this["scrollAnim" + i], this);
            egret.Tween.removeTweens(this["scroller" + i].viewport);
        }
    }

    private setGroupvisble()
    {
        this.group0.visible = this.group1.visible = this.group2.visible = true;
    }
    /**
     * 重置
    */
    private reset()
    {
        game.ArrayUtil.Clear(this._bottomList);
        this.setOffsetScrollV([0, 0, 0]);
        this.setStartImgIndex([0, 0, 0]);
        this.setResultImgIndex([0, 0, 0]);
        this._bottomList = LaBaDefined.GetInstance().getBottomList(this._activityInfo.id);
        this._minBottom = this._bottomList[0];
        this._MaxBottom = this._bottomList[this._bottomList.length - 1];
        if (this._bottomList)
        {
            let num: number = this._bottomList.shift();
            this.forbidPrevBetBtn();
            this.openStartBtn();
            this.openNextBetBtn();
            this.openAutoStartBtn();
            this.autoStartBtn["btnImg"].source = SheetSubName.LaBa_AutoStartOpen;
            this.betLabel.text = num.toString();
            this._bottomList.push(num);
            this.reqPubInfo();
            game.ArrayUtil.Clear(this._coefficientList);
            this._coefficientList = LaBaDefined.GetInstance().getCoefficientListByBottom(this._activityInfo.id, num);
        }
        this._isAutoStart = false;
        this.setSelfGold();
        for (let i: number = 0; i < 3; i++)
        {
            this["scroller" + i].viewport.scrollV = 0;
            this["group" + i].getChildAt(0).y = this._listOneY;
            this["group" + i].getChildAt(1).y = this._listTwoY;
        }
        this._isNext = true;
        this._countDownTime = this._autoReqPoolTime;
        this._isUnderway = false;
        game.Tick.AddSecondsInvoke(this.countDown, this);
    }
    /**
     * 倒计时拉取奖池信息
    */
    private countDown()
    {
        this._countDownTime--;
        if (this._countDownTime <= 0)
        {
            this.reqPubInfo();
        }
    }
    /**
     * 设置奖池信息
    */
    private setPoolInfo(data: any)
    {
        if (data && data.Array && data.Array[0].Id == this._activityInfo.id)
        {
            let num: number = parseInt(this.betLabel.text);
            switch (num)
            {
                case 200:
                    this.poolLabel.text = game.MathUtil.numAddSpace(data.Array[0].Step1);
                    break;
                case 2000:
                    this.poolLabel.text = game.MathUtil.numAddSpace(data.Array[0].Step2);
                    break;
                case 20000:
                    this.poolLabel.text = game.MathUtil.numAddSpace(data.Array[0].Step3);
                    break;
                case 200000:
                    this.poolLabel.text = game.MathUtil.numAddSpace(data.Array[0].Step4);
                    break;
            }
            this._countDownTime = this._autoReqPoolTime;
        }
        else
        {
            this.poolLabel.text = "0";
        }
    }
    /**
     * 设置开始图片的index数据
    */
    private setStartImgIndex(arr: Array<number>)
    {
        for (let i: number = 0; i < 3; i++)
        {
            this._startImgIndexList[i] = arr[i];
        }
    }
    /**
     * 设置结果图片的index数据
    */
    private setResultImgIndex(arr: Array<number>)
    {
        for (let i: number = 0; i < 3; i++)
        {
            this._resultImgIndexList[i] = arr[i];
        }
    }
    /**
     * 设置滚动结果偏移数据
    */
    private setOffsetScrollV(arr: Array<number>)
    {
        for (let i: number = 0; i < 3; i++)
        {
            this._offsetScrollV[i] = arr[i];
        }
    }
    /**
     * 设置自己的金额
    */
    private setSelfGold()
    {
        this.selfGoldLabel.text = game.MathUtil.numAddSpace(UserManager.userInfo.gold);
        this._selfGold = UserManager.userInfo.gold;
    }
    /**
     * 禁用开始按钮
    */
    private forbidStartBtn()
    {
        this.startBtn.enabled = false;
    }
    /**
     * 开启开始按钮
    */
    private openStartBtn()
    {
        this.startBtn.enabled = true;
    }
    /**
     * 禁用下一个投注按钮
    */
    private forbidNextBetBtn()
    {
        this.nextBetBtn.enabled = false;
    }
    /**
     * 开启下一个投注按钮
    */
    private openNextBetBtn()
    {
        this.nextBetBtn.enabled = true;
    }
    /**
     * 禁用上一个投注按钮
    */
    private forbidPrevBetBtn()
    {
        this.prevBetBtn.enabled = false;
    }
    /**
     * 开启上一个投注按钮
    */
    private openPrevBetBtn()
    {
        this.prevBetBtn.enabled = true;
    }
    /**
     * 禁用自动开始按钮
    */
    private forbidAutoStartBtn()
    {
        this.autoStartBtn.touchEnabled = false;
    }
    /**
     * 开启自动开始按钮
    */
    private openAutoStartBtn()
    {
        this.autoStartBtn.touchEnabled = true;
    }
    /**
     * 写入滚动的图片
    */
    private setScrollerImg()
    {
        UIUtil.writeListInfo(this.list0, this._sourceList, null);
        UIUtil.writeListInfo(this.list00, this._sourceList, null);
        UIUtil.writeListInfo(this.list1, this._sourceList, null);
        UIUtil.writeListInfo(this.list11, this._sourceList, null);
        UIUtil.writeListInfo(this.list2, this._sourceList, null);
        UIUtil.writeListInfo(this.list22, this._sourceList, null);
    }
    /**
     * 开始按钮点击事件
    */
    private onStartBtnClick()
    {
        //发送开始请求
        this.reqStart();
    }
    /**
     * 自动开始按钮点击事件
    */
    private onAutoStartBtnClick()
    {
        if (!this._isAutoStart)
        {
            this._isAutoStart = true;
            this.autoStartBtn["btnImg"].source = SheetSubName.LaBa_AutoStartClose;
            if (!this._isUnderway)
            {
                this.forbidStartBtn();
                //发送开始请求
                this.reqStart();
            }
        } else
        {
            this._isAutoStart = false;
            this.autoStartBtn["btnImg"].source = SheetSubName.LaBa_AutoStartOpen;
        }
    }
    /**
     * 底注数组读取第一个后移到最后一个并返回第一个
    */
    private getFirstBottom(): number
    {
        let num: number;
        if (this._bottomList)
        {
            num = this._bottomList.shift();
            this._bottomList.push(num);
        }
        return num;
    }
    /**
     * 底注数组读取最后一个后移到第一个并返回最后一个
    */
    private getLastBottom(): number
    {
        let num: number;
        if (this._bottomList)
        {
            num = this._bottomList.pop();
            this._bottomList.unshift(num);
        }
        return num;
    }
    /**
     * 下一个投注按钮点击事件
    */
    private onNextBetBtnClick()
    {
        if (this._bottomList)
        {
            let num: number;
            if (this._isNext)
            {
                num = this.getFirstBottom();
            } else
            {
                num = this.getFirstBottom();
                num = this.getFirstBottom();
                this._isNext = true;
            }
            if (num == this._MaxBottom)
            {
                this.forbidNextBetBtn();
            }
            if (this.prevBetBtn.enabled == false)
            {
                this.openPrevBetBtn();
            }
            this.betLabel.text = num.toString();
            this.reqPubInfo();
            game.ArrayUtil.Clear(this._coefficientList);
            this._coefficientList = LaBaDefined.GetInstance().getCoefficientListByBottom(this._activityInfo.id, num);
        }
    }
    /**
     * 上一个投注按钮点击事件
    */
    private onPrevBetBtnClick()
    {
        if (this._bottomList)
        {
            let num: number;
            if (!this._isNext)
            {
                num = this.getLastBottom();
            } else
            {
                num = this.getLastBottom();
                num = this.getLastBottom();
                this._isNext = false;
            }
            if (num == this._minBottom)
            {
                this.forbidPrevBetBtn();
            }
            if (this.nextBetBtn.enabled == false)
            {
                this.openNextBetBtn();
            }
            this.betLabel.text = num.toString();
            this.reqPubInfo();
            game.ArrayUtil.Clear(this._coefficientList);
            this._coefficientList = LaBaDefined.GetInstance().getCoefficientListByBottom(this._activityInfo.id, num);
        }
    }
    /**
     * 请求公共数据
    */
    private reqPubInfo()
    {
        ActivityManager.reqPubJson(this._activityInfo.id);
    }
    /**
     * 写入活动数据
    */
    private setActivityInfo(data: any)
    {
        if (data)
        {
            if (data.ResultList)
            {
                let def: LaBaDefinition = LaBaDefined.GetInstance().getSubDefinition(this._activityInfo.id, data.ResultList[0].SubId);
                if (def)
                {
                    this._type = def.type;
                }
            }
            if (data.AwardList)
            {
                this.shimTaeYoonInfo.gold = data.AwardList[0].Count;
            }
            this.startScroll();
            this.selfGoldLabel.text = game.MathUtil.numAddSpace(this._selfGold - parseInt(this.betLabel.text));
            this._isUnderway = true;
        }
    }
    /**
     * 开始滚动
    */
    private startScroll()
    {
        this.setScrollerResult();
        this.forbidStartBtn();
        this.forbidNextBetBtn();
        this.forbidPrevBetBtn();
        if (!this._isAutoStart)
        {
            this.forbidAutoStartBtn();
            this.autoStartBtn["btnImg"].source = SheetSubName.LaBa_AutoStartClose;
        }
        let round: number = this.getRandomRound(4, 6);
        for (let i: number = 0; i < 3; i++)
        {
            this["_flag" + i] = false;
            this["_index" + i] = 1;
            this["_changeYFlag" + i] = false;
            this["_isFirstChangeY" + i] = true;
        }
        if (round)
        {
            this.scrollAnim0(round);
            for (let i: number = 1; i < 3; i++)
            {
                game.Tick.AddTimeoutInvoke(this["scrollAnim" + i], i * 500, this, round);
            }
        }
    }
    /**
     * 滚动动画
    */
    private scrollAnim0(round: number)
    {
        this.group0.getChildAt(0).y = this._listOneY;
        this.group0.getChildAt(1).y = this._listTwoY;
        let startScrollV: number = this._startImgIndexList[0] * this._onceHeight;
        let offsetScrollV: number = this._offsetScrollV[0];
        let targetPos: number = this._onceHeight * 7 * round + startScrollV + offsetScrollV;
        egret.Tween.get(this.scroller0.viewport, { onChange: this.onScroll0, onChangeObj: this })
            .set({ scrollV: startScrollV })
            .to({ scrollV: targetPos }, 4000, egret.Ease.quadInOut)
            .call(this.scrollEnd, this, [0]);
    }
    private scrollAnim1(round: number)
    {
        this.group1.getChildAt(0).y = this._listOneY;
        this.group1.getChildAt(1).y = this._listTwoY;
        let startScrollV: number = this._startImgIndexList[1] * this._onceHeight;
        let offsetScrollV: number = this._offsetScrollV[1];
        let targetPos: number = this._onceHeight * 7 * round + startScrollV + offsetScrollV;
        egret.Tween.get(this.scroller1.viewport, { onChange: this.onScroll1, onChangeObj: this })
            .set({ scrollV: startScrollV })
            .to({ scrollV: targetPos }, 4000, egret.Ease.quadInOut)
            .call(this.scrollEnd, this, [1]);
    }
    private scrollAnim2(round: number)
    {
        this.group2.getChildAt(0).y = this._listOneY;
        this.group2.getChildAt(1).y = this._listTwoY;
        let startScrollV: number = this._startImgIndexList[2] * this._onceHeight;
        let offsetScrollV: number = this._offsetScrollV[2];
        let targetPos: number = this._onceHeight * 7 * round + startScrollV + offsetScrollV;
        egret.Tween.get(this.scroller2.viewport, { onChange: this.onScroll2, onChangeObj: this })
            .set({ scrollV: startScrollV })
            .to({ scrollV: targetPos }, 4000, egret.Ease.quadInOut)
            .call(this.scrollEnd, this, [2]);
    }
    /**
     * 设置滚动结果
    */
    private setScrollerResult()
    {
        if (this._type)
        {
            let offsetIndex0: number;
            let offsetIndex1: number;
            let offsetIndex2: number;
            switch (this._type)
            {
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
                    let arr: Array<number> = this.getResultImgTwoCherry(ShimTaeYoonResultType.TwoCherry, ShimTaeYoonImgIndex.Cherry);
                    this.setOffsetScrollV(arr);
                    break;
                case ShimTaeYoonResultType.OneCherry:
                    let arr1: Array<number> = this.getResultImgOneCherry(ShimTaeYoonResultType.OneCherry, ShimTaeYoonImgIndex.Cherry);
                    this.setOffsetScrollV(arr1);
                    break;
                case ShimTaeYoonResultType.NoAward:
                    let arr2: Array<number> = this.getResultImgNoAward();
                    this.setOffsetScrollV(arr2);
                    break;
            }
        }
    }
    /**
     * 没中奖时
    */
    private getResultImgNoAward(): Array<number>
    {
        let arr0: Array<number> = new Array<number>(0, 1, 2);
        let arr1: Array<number> = new Array<number>();  //结果的图片的index数组                  
        let scrollerImgIndex0: number = this.getRandomRound(0, 5);
        let scrollerImgIndex1: number = this.getRandomRound(0, 5);
        let scrollerImgIndex2: number = this.getRandomRound(0, 5);
        let scrollerIndex: number;
        if (scrollerImgIndex0 == scrollerImgIndex1 && scrollerImgIndex0 == scrollerImgIndex2)
        {
            scrollerIndex = this.getRandomRound(0, 2);
            scrollerImgIndex0 = this.getRandomRound(0, 5);
            while (scrollerImgIndex0 == scrollerImgIndex1)
            {
                scrollerImgIndex0 = this.getRandomRound(0, 5);
            }
        } else
        {
            scrollerIndex = 1;
        }
        for (let i: number = 0; i < arr0.length; i++)
        {
            if (arr0[i] == scrollerIndex)
            {
                arr0.splice(i, 1);
                arr1[i] = scrollerImgIndex0;
                break;
            }
        }
        arr1[arr0[0]] = scrollerImgIndex1;
        arr1[arr0[1]] = scrollerImgIndex2;
        this.setResultImgIndex(arr1);
        return this.getScrollVList();
    }
    /**
     * 结果是一个樱桃时
    */
    private getResultImgOneCherry(shimTaeYoonResultType: ShimTaeYoonResultType, shimTaeYoonImgIndex: ShimTaeYoonImgIndex): Array<number>
    {
        let arr0: Array<number> = new Array<number>(0, 1, 2);
        let arr1: Array<number> = new Array<number>();  //结果的图片的index数组        
        let scrollerIndex0: number = this.getRandomRound(0, 2);  //是樱桃的那个滚动框的编号
        let scrollerImgIndex0: number = this.getRandomRound(0, 6);  //不是樱桃的图片的编号
        let scrollerImgIndex1: number = this.getRandomRound(0, 6);  //不是樱桃的图片的编号

        for (let i: number = 0; i < arr0.length; i++)
        {
            if (arr0[i] == scrollerIndex0)
            {
                arr0.splice(i, 1);
                arr1[i] = shimTaeYoonImgIndex;
                break;
            }
        }
        while (scrollerImgIndex0 == shimTaeYoonImgIndex)
        {
            scrollerImgIndex0 = this.getRandomRound(0, 6);
        }
        while (scrollerImgIndex1 == shimTaeYoonImgIndex)
        {
            scrollerImgIndex1 = this.getRandomRound(0, 6);
        }
        arr1[arr0[0]] = scrollerImgIndex0;
        arr1[arr0[1]] = scrollerImgIndex1;
        this.setResultImgIndex(arr1);
        return this.getScrollVList();
    }
    /**
     * 结果是2个相同的时
    */
    private getResultImgTwoCherry(shimTaeYoonResultType: ShimTaeYoonResultType, shimTaeYoonImgIndex: ShimTaeYoonImgIndex): Array<number>
    {
        let scrollerIndex0: number = this.getRandomRound(0, 2);  //不相同的那个滚动框的编号
        let scrollerImgIndex: number = this.getRandomRound(0, 6);  //不相同的那个图片的编号
        while (scrollerImgIndex == shimTaeYoonImgIndex)
        {
            scrollerImgIndex = this.getRandomRound(0, 6);
        }
        let arr1: Array<number> = new Array<number>();  //结果的图片的index数组
        for (let i: number = 0; i < 3; i++)
        {
            if (i == scrollerIndex0)
            {
                arr1[i] = scrollerImgIndex;
            } else
            {
                arr1[i] = shimTaeYoonImgIndex;
            }
        }
        this.setResultImgIndex(arr1);
        return this.getScrollVList();
    }
    /**
     * 计算并返回结果scrollv偏移的距离
    */
    private getScrollVList(): Array<number>
    {
        let offsetIndex0: number;
        let offsetIndex1: number;
        let offsetIndex2: number;
        let arr: Array<number> = new Array<number>();  //结果scrollv偏移的距离
        offsetIndex0 = this._resultImgIndexList[0] - this._startImgIndexList[0];
        offsetIndex1 = this._resultImgIndexList[1] - this._startImgIndexList[1];
        offsetIndex2 = this._resultImgIndexList[2] - this._startImgIndexList[2];
        arr[0] = this._onceHeight * offsetIndex0;
        arr[1] = this._onceHeight * offsetIndex1;
        arr[2] = this._onceHeight * offsetIndex2;
        return arr;
    }
    /**
     * 调整图片位置
    */
    private setImgPos(i: number)
    {
        let num: number;
        if (this["_isFirstChangeY" + i])
        {
            num = this["scroller" + i].viewport.scrollV / 853.5;
        } else
        {
            num = (this["scroller" + i].viewport.scrollV - 853.5) / this._listHeight + 1;
        }
        if (num >= this["_index" + i])
        {
            this["_preIndex" + i] = Math.floor(num);
            if (this["_preIndex" + i] == this["_index" + i])
            {
                this["_flag" + i] = true;
            }
        }
        if (this["_flag" + i] == true)
        {
            this["_flag" + i] = false;
            if (!this["_changeYFlag" + i])
            {
                this["group" + i].getChildAt(0).y = this._listHeight * this["_index" + i] + Math.abs(this._listTwoY);
                this["_isFirstChangeY" + i] = false;
            } else
            {
                this["group" + i].getChildAt(1).y = this._listHeight * this["_index" + i] + Math.abs(this._listTwoY);
            }
            this["_index" + i]++;
            this["_changeYFlag" + i] = !this["_changeYFlag" + i];
        }
    }
    /**
     * 滚动时
    */
    private onScroll0()
    {
        this.setImgPos(0);
    }
    private onScroll1()
    {
        this.setImgPos(1);
    }
    private onScroll2()
    {
        this.setImgPos(2);
    }
    /**
     * 滚动结束
    */
    private scrollEnd(index: number)
    {
        if (index == 2)
        {
            game.Tick.AddTimeoutInvoke(this.showResultPanel, 500, this);
        }
    }
    /**
     * 显示结果后重置面板状态
    */
    private resetPanel(panelName: string)
    {
        if (panelName == UIModuleName.ShimTaeYoonResultPanel)
        {
            this._isUnderway = false;
            this.reqPubInfo();
            this.openAutoStartBtn();
            this.autoStartBtn["btnImg"].source = SheetSubName.LaBa_AutoStartOpen;
            this.setStartImgIndex(this._resultImgIndexList);
            if (this._isAutoStart)
            {
                //发送开始请求
                this.reqStart();
            } else
            {
                this.resetBtnState();
            }
        }
        if (panelName == UIModuleName.ShoppingPanel)
        {
            this.setSelfGold();
        }
    }
    /**
     * 重置按钮状态
    */
    private resetBtnState()
    {
        let bet: number = parseInt(this.betLabel.text);
        if (bet != this._minBottom)
        {
            this.openPrevBetBtn();
        }
        if (bet != this._MaxBottom)
        {
            this.openNextBetBtn();
        }
        this.openStartBtn();
    }
    /**
     * 显示结果面板
    */
    private showResultPanel()
    {
        this.setSelfGold();
        UIManager.showPanel(UIModuleName.ShimTaeYoonResultPanel, { gold: this.shimTaeYoonInfo.gold, type: this._type });
    }
    /**
     * 发送开始请求
    */
    private reqStart()
    {
        let num: number = parseInt(this.betLabel.text);
        if (this._isAutoStart)
        {
            this.autoStartBtn["btnImg"].source = SheetSubName.LaBa_AutoStartClose;
        }
        if (UserManager.userInfo.gold < num)
        {
            if (this._isAutoStart)
            {
                this._isAutoStart = false;
                this.autoStartBtn["btnImg"].source = SheetSubName.LaBa_AutoStartOpen;
                this.resetBtnState();
            }
            AlertManager.showConfirm("您的金币不足，快去商城补充点金币吧！", this.goShoppingPanel, null, null, null, null, "前往商城");
            return;
        }
        let def: LaBaDefinition = LaBaDefined.GetInstance().getDefByBottom(this._activityInfo.id, parseInt(this.betLabel.text));
        let id: number;
        let subId: number;
        if (def)
        {
            id = def.id;
            subId = def.subId;
            ActivityManager.reqJoinActivity(id, subId);
        }
    }
    /**
    * 充值金币
   */
    private goShoppingPanel(event: egret.TouchEvent)
    {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { prevPanelName: UIModuleName.ShimTaeYoonPanel });
    }
    /**
     * 获得随机数
    */
    private getRandomRound(start: number, end: number): number
    {
        return (Math.floor(Math.random() * 1000000000)) % (end - start + 1) + start;
    }
    /**
     * 点击事件处理
    */
    private clickHandler(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        switch (event.target)
        {
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
    }

    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        this._anime.onCloseBtnClickHandler(event);
    }
}