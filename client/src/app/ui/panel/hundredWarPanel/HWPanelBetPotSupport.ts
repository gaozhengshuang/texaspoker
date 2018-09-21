/**
 * 注池支持 
 */
class HWPanelBetPotSupport extends BaseHWPanelSupport
{
    public posBetList: Array<PosBetInfo>;

    public initialize()
    {
        super.initialize();
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.state == HWState.Bet)
        {
            this.setBetPotInfo();
        }
    }
    public onEnable()
    {
        super.onEnable();
        for (let betPot of this.target.betPotList) 
        {
            betPot.addEventListener(egret.TouchEvent.TOUCH_TAP, this.betPotHandler, this);
        }
        HundredWarManager.OnGetRoomInfoEvent.addListener(this.setBetPotInfo, this);
        HundredWarManager.onBetEvent.addListener(this.refreshBetPotInfo, this);
        HundredWarManager.onBetChangeEvent.addListener(this.showBetCoinAnim, this);
        HundredWarManager.onHideCardsEvent.addListener(this.resetPreRoundInfo, this);
        this.target.cardsComponentGroup.addEventListener(egret.Event.RESIZE, this.onResize, this)
    }
    public onDisable()
    {
        super.onDisable();
        for (let betPot of this.target.betPotList) 
        {
            betPot.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.betPotHandler, this);
        }
        HundredWarManager.OnGetRoomInfoEvent.removeListener(this.setBetPotInfo, this);
        HundredWarManager.onBetEvent.removeListener(this.refreshBetPotInfo, this);
        HundredWarManager.onBetChangeEvent.removeListener(this.showBetCoinAnim, this);
        HundredWarManager.onHideCardsEvent.removeListener(this.resetPreRoundInfo, this);
        this.target.cardsComponentGroup.removeEventListener(egret.Event.RESIZE, this.onResize, this)
    }

    /**
     * 屏幕大小改变时
    */
    private onResize()
    {
        this.target.hwAnim.refreshPos(this.target.betPotList, 0, 38);
        this.target.cardsAnim.refreshPos(this.target.cardsComponentList, 48, 58);
    }
    /**
     * 清除上一轮信息
    */
    private resetPreRoundInfo()
    {
        HundredWarManager.roundOverClear();
        this.clearBetPot();
        game.ArrayUtil.Clear(this.posBetList);
    }
    /**
     * 离开清除数据
    */
    public leaveClear()
    {
        this.clearBetPot();
        game.ArrayUtil.Clear(this.posBetList);
    }
    /**
     * 清除注池组件信息
    */
    private clearBetPot()
    {
        for (let info of this.target.betPotList)
        {
            info.reset();
        }
    }
    /**
     * 设置注池数据
    */
    private setBetPotInfo()
    {
        if (HundredWarManager.roomInfo)
        {
            if (HundredWarManager.roomInfo.betList && HundredWarManager.roomInfo.betList.length > 0)  //设置各个注池信息
            {
                for (let betInfo of HundredWarManager.roomInfo.betList)
                {
                    let i: number = betInfo.pos - 1;
                    if (betInfo.bet)
                    {
                        this.target.betPotList[i].allChipsLabel.text = game.MathUtil.formatNum(betInfo.bet);
                    }
                    if (betInfo.myBet)
                    {
                        this.target.betPotList[i].myChipsLabel.text = game.MathUtil.formatNum(betInfo.myBet);
                        this.target.betPotList[i].myChipsImg.visible = true;
                    }
                }
            }
        }
    }
    /**
     * 写入位置下注信息
    */
    private setPosBetInfo(posBetInfo: PosBetInfo)
    {
        if (!this.posBetList)
        {
            this.posBetList = new Array<PosBetInfo>();
        }
        let flag: boolean = true;
        for (let i: number = 0; i < this.posBetList.length; i++)
        {
            if (this.posBetList[i].pos == posBetInfo.pos)  //更新数据
            {
                for (let j: number = 0; j < posBetInfo.bet.length; j++)
                {
                    if (posBetInfo.bet[j] > 0)
                    {
                        this.posBetList[i].bet[j] += posBetInfo.bet[j];
                    }
                }
                flag = false;
                break;
            }
        }
        if (flag)  //添加
        {
            this.posBetList.push(posBetInfo);
        }
    }
    /**
     * 玩家下注播放动画
    */
    private showBetCoinAnim(data: any)
    {
        let bet: Array<number> = data.bet;
        if (bet && bet.length > 0)  //无座玩家下注动画
        {
            this.target.hwAnim.setCoinToBets(this.target.playersBtn, bet, -20, -5);
            this.setBetPotInfo();
        }
        if (data.posBetList && data.posBetList.length > 0)  //坐下玩家下注动画
        {
            let pitInfo: HWPitInfo;
            let posBetInfo: PosBetInfo;
            let posList: Array<number> = new Array<number>();
            for (let i: number = 0; i < data.posBetList.length; i++)
            {
                posBetInfo = data.posBetList[i];
                this.setPosBetInfo(posBetInfo);
                if ((HundredWarManager.self && HundredWarManager.self.pos != posBetInfo.pos) || (!HundredWarManager.self))
                {
                    pitInfo = this.target.getPitInfoByIndex(posBetInfo.pos);  //要播放动画的座位
                    if (posBetInfo.bet && posBetInfo.bet.length > 0)
                    {
                        for (let j: number = 0; j < posBetInfo.bet.length; j++)
                        {
                            if (posBetInfo.bet[j] > 0)
                            {
                                posList.push(j + 1);
                            }
                        }
                    }
                    this.target.hwAnim.setCoinToBets(pitInfo.headComponent, posList, -25, -35);
                }
            }
        }
    }
    /**
     * 自己下注播放动画
    */
    private showSelfBetCoinAnim(pos: number)
    {
        if (pos >= 0)
        {
            this.target.hwAnim.setCoinToBets(this.target.selfGroup, [pos]);
        }
    }
    /**
     * 刷新注池自己下注数据
    */
    private refreshBetPotInfo(data: any)
    {
        if (data)
        {
            this.showSelfBetCoinAnim(data.pos);

            let hwPoolInfo: HundredWarPoolInfo;
            hwPoolInfo = this.target.getPoolInfoByIndex(data.pos);
            if (hwPoolInfo)
            {
                hwPoolInfo.betPotComponent.myChipsLabel.text = game.MathUtil.formatNum(HundredWarManager.getSelfPoolGoldByPos(data.pos));
                hwPoolInfo.betPotComponent.myChipsImg.visible = true;
            }
        }
    }
    /**
     * 注池点击事件处理
    */
    private betPotHandler(event: egret.TouchEvent)
    {
        if (HundredWarManager.roomInfo && this.target.stateSupport.isOnBet && HundredWarManager.roomInfo.state == HWState.Bet && !HundredWarManager.isBanker(UserManager.userInfo.id))
        {
            if (!this.target.sitDownAndAddCoin.isBetByOneFifth())
            {
                return;
            }
            if (this.isGtBankerOneFifth())
            {
                return;
            }
            let betPotComponent: HWBetPotComponent;
            if (event.currentTarget instanceof HWBetPotComponent) //空组
            {
                betPotComponent = event.currentTarget as HWBetPotComponent;
            }
            for (let pool of this.target.poolList) 
            {
                if (pool.betPotComponent == betPotComponent && HundredWarManager.roomInfo)
                {
                    HundredWarManager.reqBet(pool.pos, HundredWarManager.oneBetGold);
                    break;
                }
            }
        }
    }
    /**
     * 判断所有玩家已下注的注数加上即将下注的注数是否大于庄家金币的五分之一
    */
    private isGtBankerOneFifth(): boolean
    {
        let flag: boolean = false;
        let a: number = 0;
        for (let playerInfo of HundredWarManager.roomInfo.playerList)
        {
            if (playerInfo.pos == 0 && !HundredWarManager.isSysBanker(playerInfo.roleId))
            {
                a = playerInfo.gold / 5;
                if ((HundredWarManager.getPlayerBetTotalNum() + HundredWarManager.oneBetGold) > (playerInfo.gold / 5))
                {
                    flag = true;
                    UIManager.showFloatTips("当前下注金币数已达庄家金币上限");
                    break;
                }
            }
        }
        return flag;
    }
}
/**
 * 位置下注信息
*/
class PosBetInfo  
{
    /**
     * 位置
    */
    public pos: number;
    /**
     * 下注列表
    */
    public bet: Array<number>;
}