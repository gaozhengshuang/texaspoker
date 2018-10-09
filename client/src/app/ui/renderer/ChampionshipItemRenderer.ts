/**
 * 锦标赛赛事列表项面板
*/
class ChampionshipItemRenderer extends BaseItemRenderer<MatchRoomInfo>
{
    public itemComp: CommonIcon;
    /**
     * 名称
    */
    public nameLabel: eui.Label;
    /**
     * 报名费
    */
    public priceLabel: eui.Label;
    //锦标赛-------------------------------------
    /**
     * 比赛时间还未开始group
    */
    public notStartGroup: eui.Group;
    public timeDesBGImg: eui.Image;
    public timeBGImg: eui.Image;
    /**
     * 金币icon
    */
    public goldImg: eui.Image;
    /**
     * 门票icon
    */
    public ticketImg: eui.Image;
    /**
     * 重购图标
    */
    public rebuyImg: eui.Image;
    /**
     * 增购图标
    */
    public addonImg: eui.Image;

    /**
     * 人数信息
    */
    public numLabel: eui.Label;
    /**
     * 还未开始的比赛时间信息描述
    */
    public timeDesLabel: eui.Label;
    /**
     * 还未开始的比赛时间
    */
    public timeLabel: eui.Label;
    /**
     * 正在托管中或坐满即玩
    */
    public trusteeshipImg: eui.Image;
    /**
     * 等待开始
    */
    public waitLabel: eui.Label;
    /**
     * 立即进入按钮
    */
    public enterBtn: eui.Button;
    /**
     * 立即报名按钮
    */
    public applyBtn: eui.Button;
    /**
     * 开始报名group
    */
    public startJoinGroup: eui.Group;
    /**
     * 等待开始报名group
    */
    public waitJoinGroup: eui.Group;
    /**
     * 开始报名时间
    */
    public startJoinTimeLabel: eui.Label;
    /**
     * mtt人数显示group
    */
    public mttNumGroup: eui.Group;

    private _countDownNum: number;
    //坐满即玩----------------------------
    /**
     * 坐满即玩人数显示group
    */
    public sitAndGoNumGroup: eui.Group;
    public sitAndGonumLabel: eui.Label;  // 坐满即玩人数
    /**
     * 坐满即玩奖励group
    */
    public sitAndPlayAwardGroup: eui.Group;  //（未报名时显示）
    public awardLabel: eui.Label;  //坐满即玩奖励

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.ChampionshipItemRenderer;
    }
    public updateData()
    {
        this.dataChanged();
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (InfoUtil.checkAvailable(this.bindData))
        {
            this.init();
            this.itemComp.init(this.bindData.definition.Icon + ResSuffixName.PNG, 100);
            this.nameLabel.text = this.bindData.definition.Name;

            if (this.bindData.definition.Type == MatchType.MTT) 
            {
                this.mttShow();
            } else
            {
                this.sitAndPlayShow();
            }

            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.applyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onaApplyBtnClick, this);
            this.applyBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterBtnClick, this);
            this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            ChampionshipManager.onRequestJoinEvent.addListener(this.requestJoinSuccess, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.applyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onaApplyBtnClick, this);
        this.applyBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterBtnClick, this);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        ChampionshipManager.onRequestJoinEvent.removeListener(this.requestJoinSuccess, this);
        game.Tick.RemoveSecondsInvoke(this.countDown, this);
        game.Tick.RemoveSecondsInvoke(this.delayTimeCountDown, this);
        game.Tick.RemoveSecondsInvoke(this.getNowTime, this);
    }

    /***************锦标赛*******************/
    /**
     * 锦标赛显示
    */
    private mttShow()
    {
        this.mttNumGroup.visible = true;
        this.numLabel.text = this.bindData.join + "/" + this.bindData.definition.BNum;

        if (this.bindData.definition.Addon)
        {
            this.addonImg.visible = true;
        }
        if (this.bindData.definition.Rebuy)
        {
            this.rebuyImg.visible = true;
        }

        if (this.bindData.joinWay)  //是否已报名
        {
            this.hasJoinedShow();
        } else
        {
            this.notJoinedShow();
        }

        if (TimeManager.GetServerUtcTimestamp() >= this.bindData.startTime)  //比赛进行中
        {
            if (TimeManager.GetServerUtcTimestamp() <= this.bindData.startTime + this.bindData.definition.DelaySign)
            {
                this.countDownOver();
            } else
            {
                this.showTrusteeship();
            }
        } else 
        {
            if ((this.bindData.startTime - TimeManager.GetServerUtcTimestamp()) <= 300)  //比赛开始前5分钟
            {
                this.fiveMinStart();
                if ((this.bindData.startTime - TimeManager.GetServerUtcTimestamp()) < 60)  //比赛前一分钟
                {
                    this.oneMinStart();
                }
            } else  //比赛开始大于5分钟
            {
                this.beyondFiveMinStart();
            }
            this.countDown();
            game.Tick.AddSecondsInvoke(this.countDown, this);
        }
    }

    /**
     * mtt已报名显示
    */
    private hasJoinedShow()
    {
        this.startJoin();
        this.waitLabel.visible = true;
        this.showJoinedCostByJoinWay();
    }
    /**
     * mtt托管中
    */
    private showTrusteeship()
    {
        if (!this.bindData.outTime && !this.bindData.endTime)
        {
            this.trusteeshipShowSet();
            if (TimeManager.GetServerUtcTimestamp() > this.bindData.startTime + 3)
            {
                this.trusteeshipImg.source = SheetSubName.MTTTrusteeship;
            } else
            {
                this.trusteeshipImg.source = "";
            }
        }
    }
    /**
     * mtt未开始报名
    */
    private mttNotStartJoinShow()
    {
        this.startJoinGroup.visible = false;
        this.waitJoinGroup.visible = true;
        let today: Date = new Date(TimeManager.GetServerUtcTimestamp() * 1000);
        let todayLastTime: number = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).getTime();
        let date: Date = new Date((this.bindData.startTime - this.bindData.definition.SignTime) * 1000);
        if (this.bindData.startTime - this.bindData.definition.SignTime > Math.floor(todayLastTime / 1000))  //大于一天
        {
            this.startJoinTimeLabel.text = (date.getMonth() + 1) + "-" + date.getDate() + "  " + game.DateTimeUtil.formatDate(date, game.DateTimeUtil.Format_Standard_NoSecond).split(game.StringConstants.Blank)[1];
        } else
        {
            this.startJoinTimeLabel.text = "今日" + "  " + game.DateTimeUtil.formatDate(date, game.DateTimeUtil.Format_Standard_NoSecond).split(game.StringConstants.Blank)[1];
        }
    }

    /**************坐满即玩***************/
    /**
     * 坐满即玩显示
    */
    private sitAndPlayShow()
    {
        this.sitAndGoNumGroup.visible = true;
        this.sitAndGonumLabel.text = "开赛人数:" + this.bindData.definition.BNum;
        this.getMoreInfo(this.bindData.id);
        if (this.bindData.joinWay) //是否已报名
        {
            this.sitAndPlayJoinedShow();
        } else
        {
            this.sitAndPlayNotJoinedShow();
        }
    }

    /**
     * 坐满即玩已报名显示
    */
    private sitAndPlayJoinedShow()
    {
        this.startJoin();
        this.showJoinedCostByJoinWay();
        this.trusteeshipShowSet();
        if (this.bindData.join >= this.bindData.definition.BNum)  //报名人数是否满足开赛人数
        {
            //满足时显示托管中
            if (!this.bindData.outTime && !this.bindData.endTime)
            {
                this.trusteeshipImg.source = SheetSubName.MTTTrusteeship;
            }
        } else
        {
            this.trusteeshipImg.source = SheetSubName.SitAndPlay;
        }
    }
    /**
     * 坐满即玩未报名显示
    */
    private sitAndPlayNotJoinedShow()
    {
        this.sitAndPlayAwardGroup.visible = true;
        this.awardLabel.text = game.MathUtil.formatNum(this.getSNGAllAward());
        this.notJoinedShow();
        game.Tick.AddSecondsInvoke(this.getNowTime, this);
    }
    /**
     * 获得坐满即玩总奖励
    */
    private getSNGAllAward(): number
    {
        let championshipPrizeList: Array<table.IChampionshipPrizeDefine> = ChampionshipManager.getAwardList(this.bindData.id);
        let total: number = 0;
        if (championshipPrizeList)
        {
            for (let championshipPrize of championshipPrizeList)
            {
                let num: number = AwardDefined.GetInstance().getAwardNumByAwardId(championshipPrize.AwardId);
                if (num)
                {
                    total += num;
                }
            }
        }
        return total;
    }
    /**
     * 坐满即玩未开始报名显示
    */
    private sitAndPlayNotStartJoinShow()
    {
        this.startJoin();
        this.applyBtn.visible = true;
        this.applyBtn.enabled = false;
    }
    /**
     * 获得坐满即玩的协议信息
    */
    private getMoreInfo(id: number)
    {
        let sngMatchInfo: MatchRoomInfo = ChampionshipManager.getJoinedMathInfoById(id);
        if (sngMatchInfo)
        {
            this.bindData = sngMatchInfo;
        }
    }
    /*****************end*********************/

    /**
     * 初始化
    */
    private init()
    {
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
        this.sitAndGoNumGroup.visible = this.sitAndPlayAwardGroup.visible = false;  //坐满即玩
        this.mttNumGroup.visible = false;  //锦标赛
        game.Tick.RemoveSecondsInvoke(this.countDown, this);
        game.Tick.RemoveSecondsInvoke(this.delayTimeCountDown, this);
    }
    /**
     * 托管中或者坐满即玩报名人数未达到开赛人数显示设置
    */
    private trusteeshipShowSet()
    {
        this.trusteeshipImg.visible = true;
        this.enterBtn.visible = true;
        this.notStartGroup.visible = false;
        this.applyBtn.visible = false;
        this.waitLabel.visible = false;
    }
    /**
     * 比赛开始时间大于5分钟时开始时间的颜色和背景设置
    */
    private setMoreFiveMStyle()
    {
        this.timeDesBGImg.visible = true;
        this.timeBGImg.visible = false;
        this.timeDesLabel.textColor = ColorEnum.MTT_time_Green;

    }
    /**
     * 开始时间小于5分钟颜色和背景设置
    */
    private setLessFiveMStyle()
    {
        this.timeDesBGImg.visible = false;
        this.timeBGImg.visible = true;
        this.timeDesLabel.textColor = ColorEnum.Yellow;
    }
    /**
     * 开始报名
    */
    private startJoin()
    {
        this.startJoinGroup.visible = true;
        this.waitJoinGroup.visible = false;
    }
    /**
     * 未报名显示
    */
    private notJoinedShow()
    {
        if (ChampionshipManager.isStartJoin(this.bindData))
        {
            this.startJoin();
            this.applyBtn.enabled = true;
        } else 
        {
            this.notStartJoinShow();
        }

        this.applyBtn.visible = true;
        this.showNotJoinCostByIsHasTicket();
    }
    /**
     * 已报名时根据报名方式显示报名费
    */
    private showJoinedCostByJoinWay()
    {
        if (this.bindData.joinWay == 1)
        {
            this.priceByGoldShow();
        } else if (this.bindData.joinWay == 2)
        {
            this.priceByTicketShow();
        }
    }
    /**
     * 未报名时根据是否有门票显示报名费
    */
    private showNotJoinCostByIsHasTicket()
    {
        if (this.isHaveThisMTTTicket())
        {
            this.priceByTicketShow();
        } else
        {
            this.priceByGoldShow();
        }
    }
    /**
     * 未开始报名显示
    */
    private notStartJoinShow()
    {
        if (this.bindData.definition.Type == MatchType.MTT)
        {
            this.mttNotStartJoinShow();
        } else if (this.bindData.definition.Type == MatchType.SNG)
        {
            this.sitAndPlayNotStartJoinShow();
        }
    }
    /**
     * 秒循环获取当前时间 判断是否到达开启关闭报名时间点
    */
    private getNowTime()
    {
        if (this.bindData.openTime <= TimeManager.GetServerUtcTimestamp() * 1000)
        {
            this.startJoin();
            this.applyBtn.enabled = true;
        }
        if (this.bindData.closeTime <= TimeManager.GetServerUtcTimestamp() * 1000)
        {
            this.sitAndPlayNotStartJoinShow();
        }
    }
    /**
     * 判断是否有对应赛事的门票
    */
    private isHaveThisMTTTicket(): boolean
    {
        let flag: boolean = false;
        if (ItemManager.itemList && ItemManager.itemList.length > 0)
        {
            for (let def of ItemManager.itemList)
            {
                if (this.bindData.definition.TicketId == def.id)
                {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    }
    /**
     * 距离比赛开始大于5分钟
    */
    private beyondFiveMinStart()
    {
        this.notStartGroup.visible = true;
        this.timeDesBGImg.visible = true;
        this.timeBGImg.visible = false;
        this.setMoreFiveMStyle();
        this.getTimeDesAndTime();
        this._countDownNum = Math.floor(this.bindData.startTime - TimeManager.GetServerUtcTimestamp());
    }
    /**
     * 获得比赛时间描述
    */
    private getTimeDesAndTime()
    {
        let date: Date = new Date(this.bindData.startTime * 1000);
        let today: Date = new Date(TimeManager.GetServerUtcTimestamp() * 1000);
        let todayLastTime: number = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).getTime();
        if (this.bindData.startTime > Math.floor(todayLastTime / 1000) || this.bindData.startTime < (Math.floor(todayLastTime / 1000) - 86400))  //不是今天
        {
            this.timeDesLabel.text = (date.getMonth() + 1) + "-" + date.getDate();
        } else   // 今天
        {
            this.timeDesLabel.text = "今日";
        }
        this.timeLabel.text = game.DateTimeUtil.formatDate(date, game.DateTimeUtil.Format_Standard_NoSecond).split(game.StringConstants.Blank)[1];
    }
    /**
     * 距离比赛开始小于5分钟大于1分钟
    */
    private fiveMinStart()
    {
        this.setLessFiveMStyle();
        this.notStartGroup.visible = true;
        this.timeDesLabel.text = "即将开始";
        this._countDownNum = Math.floor(this.bindData.startTime - TimeManager.GetServerUtcTimestamp());
    }
    /**
     * 距离比赛开始小于1分钟
    */
    private oneMinStart()
    {
        if (this.bindData.joinWay)
        {
            this.waitLabel.visible = false;
            this.enterBtn.visible = true;
        }
    }
    /**
     * 报名费有门票的时候的显示
    */
    private priceByTicketShow()
    {
        this.priceLabel.text = "X1";
        this.goldImg.visible = false;
        this.ticketImg.visible = true;
    }
    /**
     * 报名费用金币的时候的显示
    */
    private priceByGoldShow()
    {
        this.goldImg.visible = true;
        this.ticketImg.visible = false;
        if (this.bindData.definition.SignCost == 0 || this.bindData.definition.SignCost == undefined)
        {
            this.priceLabel.text = "免费" + "+" + game.MathUtil.formatNum(this.bindData.definition.ServeCost);
        } else
        {
            this.priceLabel.text = game.MathUtil.formatNum(this.bindData.definition.SignCost) + "+" + game.MathUtil.formatNum(this.bindData.definition.ServeCost);
        }
    }
    /**
     * 延迟报名时间结束后将赛事从赛事列表中删除
    */
    private delFromMTTList()
    {
        ChampionshipManager.refreshMTTMatchInfo(this.bindData.recordId);
    }
    /**
     * 立即报名成功
    */
    private requestJoinSuccess(data: any)
    {
        if (data.recordId == this.bindData.recordId)
        {
            this.applyBtn.visible = false;
            let matchType: MatchType = this.bindData.definition.Type;
            if (matchType == MatchType.MTT)
            {
                this.bindData.joinWay = data.flag;
                this.numLabel.text = this.bindData.join + "/" + this.bindData.definition.BNum;
                let time: number = this.bindData.startTime - TimeManager.GetServerUtcTimestamp();
                if (time <= 60)
                {
                    if (time < 0)
                    {
                        // 直接进入比赛房间
                        ChampionshipManager.enterMttHandler.enterMatch(this.bindData, game.StringConstants.Empty);

                    } else
                    {
                        this.enterBtn.visible = true;
                    }
                } else
                {
                    this.waitLabel.visible = true;
                }
            } else if (matchType == MatchType.SNG)
            {
                this.sitAndPlayAwardGroup.visible = false;
                this.sitAndPlayJoinedShow();
            }
        }
    }
    /**
     * 立即报名点击事件
    */
    private onaApplyBtnClick(event: TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        let flag: boolean = ItemManager.isHaveTicket(this.bindData.definition.TicketId);
        if (flag)
        {
            ChampionshipManager.reqRequestJoin(this.bindData.recordId, JoinChampionshipWay.Ticket, this.bindData.startTime, this.bindData.id, this.bindData.definition.Type);
        } else
        {
            if (CostManager.verifyGold(this.bindData.definition.SignCost + this.bindData.definition.ServeCost, true)) 
            {
                ChampionshipManager.reqRequestJoin(this.bindData.recordId, JoinChampionshipWay.Gold, this.bindData.startTime, this.bindData.id, this.bindData.definition.Type);
            }
        }
    }
    /**
    * 立即进入
    */
    private onEnterBtnClick(event: TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (this.bindData.definition.Type == MatchType.MTT)
        {
            ChampionshipManager.enterMttHandler.enterMatch(this.bindData, game.StringConstants.Empty);
        } else if (this.bindData.definition.Type == MatchType.SNG)
        {
            let enterMatch: MatchRoomInfo = ChampionshipManager.getMathInfoByRecordId(this.bindData.recordId);
            if (enterMatch)
            {
                ChampionshipManager.enterMttHandler.enterMatch(enterMatch, game.StringConstants.Empty);
            } else
            {
                AlertManager.showAlert("获取赛事信息异常");
            }
        }
    }

    /**
     * 取消冒泡
    */
    private cancelBubble(event: egret.TouchEvent)
    {
        event.stopImmediatePropagation();
    }
    /**
     * 倒计时
    */
    private countDown()
    {
        this._countDownNum--;
        if (this._countDownNum <= 300)
        {
            this.timeLabel.text = game.DateTimeUtil.countDownFormat(this._countDownNum, false);
            if (this._countDownNum < 60)
            {
                this.oneMinStart();
            }
            if (this._countDownNum <= 0)
            {
                game.Tick.RemoveSecondsInvoke(this.countDown, this);
                this.countDownOver();
            }
        }
        if (this._countDownNum == 300)
        {
            this.fiveMinStart();
        }
        if (this._countDownNum == this.bindData.definition.SignTime)  //从未开始报名过渡到开始报名
        {
            this.startJoin();
        }
    }
    /**
     * 延迟时间倒计时
    */
    private delayTimeCountDown()
    {
        this._countDownNum--;
        if (this._countDownNum >= 0)
        {
            this.timeLabel.text = game.DateTimeUtil.countDownFormat(this._countDownNum, false);

        } else
        {
            game.Tick.RemoveSecondsInvoke(this.delayTimeCountDown, this);
            this.delFromMTTList();
        }
    }
    /**
     * 倒计时结束操作(延迟时间内操作)
    */
    private countDownOver()
    {
        this.setLessFiveMStyle();
        if (this.bindData.definition.DelaySign)
        {
            if (TimeManager.GetServerUtcTimestamp() >= this.bindData.startTime + this.bindData.definition.DelaySign)
            {
                this.delFromMTTList();
            } else
            {
                this.notStartGroup.visible = true;
                this.timeDesLabel.text = "延迟报名";
                if (this.bindData.joinWay)
                {
                    this.waitLabel.visible = false;
                    this.enterBtn.visible = true;
                }
                this._countDownNum = Math.floor(this.bindData.startTime + this.bindData.definition.DelaySign - TimeManager.GetServerUtcTimestamp());
                this.delayTimeCountDown();
                game.Tick.AddSecondsInvoke(this.delayTimeCountDown, this);
            }
        } else
        {
            this.delFromMTTList();
        }
    }
}