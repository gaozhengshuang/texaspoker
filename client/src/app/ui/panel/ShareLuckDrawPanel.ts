/**
 *分享抽奖活动面板
 */
class ShareLuckDrawPanel extends BaseActivityPanel
{
    public shareBtn: eui.Group  //分享
    public desLabel: eui.Label;  //描述
    //结果
    public scroller: eui.Scroller;
    public scrollGroup: eui.Group;
    public list0: eui.List;
    public list1: eui.List;
    //抽奖
    public item0: ShareLuckDrawItemComponent;
    public item1: ShareLuckDrawItemComponent;
    public item2: ShareLuckDrawItemComponent;
    public item3: ShareLuckDrawItemComponent;
    public item4: ShareLuckDrawItemComponent;
    public item5: ShareLuckDrawItemComponent;
    public item6: ShareLuckDrawItemComponent;
    public item7: ShareLuckDrawItemComponent;
    public item8: ShareLuckDrawItemComponent;
    public item9: ShareLuckDrawItemComponent;
    public item10: ShareLuckDrawItemComponent;
    public item11: ShareLuckDrawItemComponent;
    public itemList: Array<ShareLuckDrawItemComponent>;  //物品数组
    public drawBtn: eui.Button;  //抽奖按钮

    private readonly _itemHeight: number = 25;  //每一项的高 + 项与项之间的间距   项高40   间距0
    private readonly _itemNum: number = 9;  //每个list中的item的数量
    private readonly _itemSpace: number = 3.5;  //列的文字上下间距   3.5    列与列之间的间距即为  3.5+3.5
    private _resultListClone: Array<ChampionshipRankInfo>;
    private resultList: Array<ChampionshipRankInfo>;
    private _timer2: any;  //计时器    
    private _changeYFlag: boolean;  //true  list0下移   false  list1下移

    private _itemIndex: number;  //初始滚动的位置
    private _timer: any;  //计时器
    private _timer1: any;  //计时器
    private _index: number; //物品下标
    private _result: number;  //抽奖的结果  0-11
    private _roundItemIndex: number  //一次累计转过的物品数
    private _totalItem: number  //一次累计要转的物品数
    private readonly _addSpendList: Array<number> = new Array<number>(1000, 1400, 1600, 1700, 1750);
    private readonly _cutSpendList: Array<number> = new Array<number>(50, 100, 200, 400, 700);

    private readonly _timeLine: number = 1;
    private _isDraw: boolean;  //用户是否点击了抽奖
    private _subId: number;  //用户抽中的结果

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.ShareLuckDrawPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        this.itemList = new Array<ShareLuckDrawItemComponent>();
        for (let i: number = 0; i < 12; i++)
        {
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
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this._itemIndex = 0;
        for (let i: number = 0; i < this.itemList.length; i++)
        {
            if (i == 0)
            {
                this.itemList[i].setHighLightImgVisible(true);
                this.itemList[i].setHighLightAlpha(1);
            } else
            {
                this.itemList[i].setHighLightImgVisible(false);
            }
        }

        this.desLabel.text = this.activityInfo.definition.des;
        this.drawBtn.enabled = true;
        this.reqResultInfo();
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.drawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.drawBtnClick, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareBtnClick, this);
        ActivityManager.onJoinActivityEvent.addListener(this.joinActivitySuccess, this);
        ActivityManager.onReqSingleActivityEvent.addListener(this.getDrawTimeSuccess, this);
        ActivityManager.OnActionRecordEvent.addListener(this.reqResultSuccess, this);
        ChannelManager.OnShareSucceed.addListener(this.onShareSuccess, this);
        ActivityManager.shareLuckDrawHandler.OnShareSuccessEvent.addListener(this.reqDrawTime, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
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
    }

    /**
     * 设置奖品信息
    */
    private setAwardInfo()
    {
        let dataList: Array<ActivityShareDefintion> = ActivityShareDefined.GetInstance().dataList;
        if (dataList && this.itemList)
        {
            for (let i: number = 0; i < this.itemList.length; i++)
            {
                let data: ActivityShareDefintion = dataList[i];
                if (data.rewardList && data.rewardList.length > 0)
                {
                    let rewardInfo: AwardInfoDefinition = data.rewardList[0];
                    this.itemList[i].init(rewardInfo.id, rewardInfo.count);
                }
            }
        }
    }
    /**
     * 请求中奖结果
    */
    private reqResultInfo()
    {
        ActivityManager.reqActionRecord(this.activityInfo.id, ProjectDefined.GetInstance().shareResultNumLimit, 0);
    }
    /**
     * 请求中奖结果成功
    */
    private reqResultSuccess(data: any)
    {
        if (data && data.length > 0)
        {
            this.resultList = new Array<ChampionshipRankInfo>();
            for (let info of data)
            {
                let resultInfo: ChampionshipRankInfo = new ChampionshipRankInfo();
                resultInfo.copyValueFrom(info);
                let def: ActivityShareDefintion = ActivityShareDefined.GetInstance().getSubDefinition(this.activityInfo.id, info.subId);
                if (def)
                {
                    let rewardInfo: AwardInfoDefinition = def.rewardList[0];
                    resultInfo.award = ItemDefined.GetInstance().getDefinition(rewardInfo.id).name + "*" + rewardInfo.count;
                    this.resultList.push(resultInfo);
                }
            }
        }
        if (this.resultList && this.resultList.length > 0)
        {
            this._changeYFlag = false;
            this.scroller.viewport.scrollV = 0;
            this.scrollGroup.getChildAt(0).y = 0;
            this.scrollGroup.getChildAt(1).y = this._itemNum * this._itemHeight + this._itemSpace;
            if (this.resultList.length * this._itemHeight > this.scroller.height)
            {
                this.resultScrollAnim();
            } else
            {
                UIUtil.writeListInfo(this.list0, this.resultList);
            }
        }
    }
    /**
     * 中奖信息滚动动画
    */
    private resultScrollAnim()
    {
        this._resultListClone = this.resultList.concat();
        let list0: Array<ChampionshipRankInfo> = this._resultListClone.splice(0, this._itemNum);
        if (this._resultListClone.length < this._itemNum)
        {
            this._resultListClone = this._resultListClone.concat(this.resultList);
        }
        let list1: Array<ChampionshipRankInfo> = this._resultListClone.splice(0, this._itemNum);
        UIUtil.writeListInfo(this.list0, list0);
        UIUtil.writeListInfo(this.list1, list1);
        this.list0.validateNow();
        this.list1.validateNow();
        this._timer2 = egret.setTimeout(this.setScroll, this, 0);
    }
    private setScroll()
    {
        let startScrollV: number = this.scroller.viewport.scrollV;
        let endScrollV: number = this.scroller.viewport.scrollV + this.list1.height + this._itemSpace;
        egret.Tween.get(this.scroller.viewport)
            .set({ scrollV: startScrollV })
            .to({ scrollV: endScrollV }, this.list1.numChildren * 1000)
            .call(this.scrollEnd, this);
    }
    private scrollEnd()
    {
        if (this._resultListClone.length < this._itemNum)
        {
            this._resultListClone = this._resultListClone.concat(this.resultList);
        }
        if (this._changeYFlag)
        {
            this.scrollGroup.getChildAt(1).y = this.scroller.viewport.scrollV + this.scrollGroup.getChildAt(1).height + this._itemSpace;
            let list: Array<ChampionshipRankInfo> = this._resultListClone.splice(0, this._itemNum);
            UIUtil.writeListInfo(this.list1, list);
        } else
        {
            this.scrollGroup.getChildAt(0).y = this.scroller.viewport.scrollV + this.scrollGroup.getChildAt(1).height + this._itemSpace;
            let list: Array<ChampionshipRankInfo> = this._resultListClone.splice(0, this._itemNum);
            UIUtil.writeListInfo(this.list0, list);
        }
        this._timer2 = egret.setTimeout(this.setScroll, this, 0);
        this._changeYFlag = !this._changeYFlag;
    }

    /**
     * 立即分享按钮点击事件
    */
    private shareBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (!(qin.System.isWeChat || qin.System.isMicro))
        {
            UIManager.showFloatTips("当前打开方式不支持分享，请在微信里打开或使用App版本");
            return;
        }
        if (qin.System.isMicro && ChannelManager.hasWeixin == false)
        {
            AlertManager.showAlert("您未安装微信，分享失败。");
            return;
        }
        ChannelManager.share(ChannelShareType.WxTimeLine, ChannelManager.appName, "话费送不停，豪礼不间断，这个德州不一般！");
    }
    /**
     * 请求抽奖次数
    */
    private reqDrawTime()
    {
        ActivityManager.reqActivityInfo(this.activityInfo.id);  //请求抽奖次数        
    }
    /**
     * 抽奖按钮点击事件
    */
    private drawBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        this.reqDrawTime();
        this._isDraw = true;
    }
    /**
     * 分享成功
    */
    private onShareSuccess(type: ChannelShareType)
    {
        if (type == ChannelShareType.WxTimeLine)
        {
            ActivityManager.shareLuckDrawHandler.reqShareSuccess(this._timeLine);
        }
    }
    /**
     * 获得抽奖次数成功
    */
    private getDrawTimeSuccess(id: number)
    {
        if (id == this.activityInfo.id && this._isDraw)
        {
            if (this.activityInfo.step > 0 && !(this.activityInfo.gotJsonObj.length && this.activityInfo.gotJsonObj.length > 0))  //step代表抽奖次数
            {
                // 请求参与活动
                let def: ActivityShareDefintion = ActivityShareDefined.GetInstance().getDefinition(this.activityInfo.id);
                let id: number;
                let subId: number;
                if (def)
                {
                    id = def.id;
                    subId = def.subId;
                    ActivityManager.reqJoinActivity(def.id, def.subId);
                }
                this.drawBtn.enabled = false;
            } else
            {
                AlertManager.showConfirm("您还没有抽奖次数，每日首次分享朋友圈即可获得1次抽奖机会！", this.shareBtnClick.bind(this), null, null, null, null, "立即分享");
            }
            this._isDraw = false;
        }
    }
    /**
     * 参与活动成功
    */
    private joinActivitySuccess(data: any)
    {
        if (data) 
        {
            if (data.ResultList)
            {
                this._subId = data.ResultList[0].SubId;
                this._result = data.ResultList[0].SubId - 1;
                this.reqDrawTime();
                this.scrollAnim();
            }
        }
    }
    /**
     * 更新中奖展示数据
    */
    private refreshResultInfo(info: ChampionshipRankInfo)
    {
        if (this.resultList)
        {
            if (this.resultList.length >= ProjectDefined.GetInstance().shareResultNumLimit)
            {
                this.resultList.splice(ProjectDefined.GetInstance().shareResultNumLimit - 1, 1);
            }
        } else
        {
            this.resultList = new Array<ChampionshipRankInfo>();
        }
        this.resultList.push(info);
        if (this.resultList.length * this._itemHeight <= this.scroller.height)  //非滚动状态时更新显示数据   滚动状态会自动更新
        {
            UIUtil.writeListInfo(this.list0, this.resultList);
        }
    }
    /**
     * 滚动动画
    */
    private scrollAnim()
    {
        let itemListLen: number = this.itemList.length;
        let turnsNum: number = qin.MathUtil.getRandom(4, 7);  //一共转动的圈数        
        this._index = this._itemIndex;
        this._roundItemIndex = 0;
        this._totalItem = itemListLen - this._itemIndex + itemListLen * (turnsNum - 1) + this._result + 1;
        for (let i: number = 0; i < itemListLen; i++)
        {
            if (i == 0)
            {
                this._timer = egret.setTimeout(this.setHighLight, this, 400);
            } else
            {
                let len: number = this._addSpendList.length;
                if (i <= len)
                {
                    this._timer = egret.setTimeout(this.setHighLight, this, this._addSpendList[i - 1]);  //加速
                } else
                {
                    egret.clearTimeout(this._timer);
                    qin.Tick.AddTimeoutInvoke(this.constantSpeedAnim, this._addSpendList[len - 1], this)
                    break;
                }
            }
        }
    }
    /**
     * 匀速调用
    */
    private constantSpeedAnim()
    {
        this._timer1 = egret.setInterval(this.setHighLight, this, 50);  //匀速
    }
    /**
     * 设置高亮效果的显隐
    */
    private setHighLight()
    {
        let len: number = this.itemList.length;
        let totalItem: number = len - this._itemIndex
        this.itemList[this._index].setHighLightImgVisible(true);
        this.itemList[this._index].setHighLightAlpha(1);
        this._roundItemIndex++;
        if (this._roundItemIndex <= 2)
        {
            for (let m: number = 1; m < 3; m++)
            {
                if (this._index - m > 0)
                {
                    this.itemList[this._index - m].setHighLightAlpha(1 - 0.3 * m);
                } else
                {
                    this.itemList[len - m].setHighLightAlpha(1 - 0.3 * m);
                }
            }
        } else
        {
            for (let j: number = 1; j <= 3; j++)  // 3 同时高亮的个数
            {
                if (j == 3)
                {
                    if (this._index - j >= 0)
                    {
                        this.itemList[this._index - j].setHighLightImgVisible(false);
                    } else
                    {
                        this.itemList[len - j + this._index].setHighLightImgVisible(false);
                    }
                } else
                {
                    if (this._index - j >= 0)
                    {
                        this.itemList[this._index - j].setHighLightImgVisible(true);
                        this.itemList[this._index - j].setHighLightAlpha(1 - 0.3 * j);
                    } else
                    {
                        this.itemList[len - j + this._index].setHighLightImgVisible(true);
                        this.itemList[len - j + this._index].setHighLightAlpha(1 - 0.3 * j);
                    }
                }
            }
        }
        if ((this._totalItem >= this._roundItemIndex) && (this._totalItem - this._roundItemIndex <= this._cutSpendList.length))
        {
            egret.clearInterval(this._timer1);
            qin.Tick.AddTimeoutInvoke(this.setHighLight, this._cutSpendList[this._cutSpendList.length - (this._totalItem - this._roundItemIndex)], this);  //减速
            if (this._index == this._result)
            {
                qin.Tick.RemoveTimeoutInvoke(this.setHighLight, this);
                this.hideAfterHighLight();
                this._itemIndex = this._result;
                this.drawBtn.enabled = true;
            }
        }
        this._index++;
        if (this._index == len)
        {
            this._index = 0;
        }
    }
    /**
     * 转到结果后将结果后面的2个高亮隐藏并更新抽奖结果
    */
    private hideAfterHighLight()
    {
        for (let i: number = 1; i < 3; i++)  //转到结果后将结果后面的2个高亮隐藏
        {
            if (this._result - i >= 0) 
            {
                this.itemList[this._result - i].setHighLightImgVisible(false);
            } else
            {
                this.itemList[this.itemList.length - i + this._index].setHighLightImgVisible(false);
            }
        }
        if (this._subId)  //更新抽奖结果
        {
            let def: ActivityShareDefintion = ActivityShareDefined.GetInstance().getSubDefinition(this.activityInfo.id, this._subId);
            if (def)
            {
                if (def.hotTag && def.rewardList && def.rewardList.length > 0)
                {
                    let result: ChampionshipRankInfo = new ChampionshipRankInfo();
                    let rewardInfo: AwardInfoDefinition = def.rewardList[0];
                    result.name = UserManager.userInfo.name;
                    result.award = ItemDefined.GetInstance().getDefinition(rewardInfo.id).name + "*" + rewardInfo.count;
                    this.refreshResultInfo(result);
                }
            }
        }
    }
}
