/**
 * 坐下/选择金币 逻辑支持
 */
class HWPanelSitDownAndChooseCoinSupport extends BaseHWPanelSupport
{
    public initialize()
    {
        super.initialize();
        this.target.doubleBtn["lightImg"].visible = false;
        this.target.doubleBtn["bgImg"].source = HWPanelSetting.Chip_db;
        this.target.repetBtn["lightImg"].visible = false;
        this.target.repetBtn["bgImg"].source = HWPanelSetting.Chip_rep;
        this.resetDbAndRepetBtn();
    }
    public onEnable()
    {
        super.onEnable();
        for (let pit of this.target.pitList) 
        {
            pit.headComponent.headIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
            pit.headComponent.emptyGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
        }
        this.target.betList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBetListClick, this);
        this.target.repetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRepetBtnClick, this);
        this.target.doubleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDoubleBtnClick, this);
        HundredWarManager.onSeatEvent.addListener(this.onSeatSuccess, this);
        HundredWarManager.onBetEvent.addListener(this.refreshBetMask, this);
        HundredWarManager.onRoomStateChangeEvent.addListener(this.resetDbAndRepetBtn, this);
        HundredWarManager.OnGetRoomInfoEvent.addListener(this.resetDbAndRepetBtn, this);
        HundredWarManager.panelHandler.onUpDownBankerEvent.addListener(this.resetDbAndRepetBtn, this);
        HundredWarManager.onPosChangeEvent.addListener(this.onPosChange, this);
    }
    public onDisable()
    {
        super.onDisable();
        for (let pit of this.target.pitList) 
        {
            pit.headComponent.headIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
            pit.headComponent.emptyGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
        }
        this.target.betList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBetListClick, this);
        this.target.repetBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRepetBtnClick, this);
        this.target.doubleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDoubleBtnClick, this);
        HundredWarManager.onSeatEvent.removeListener(this.onSeatSuccess, this);
        HundredWarManager.onBetEvent.removeListener(this.refreshBetMask, this);
        HundredWarManager.onRoomStateChangeEvent.removeListener(this.resetDbAndRepetBtn, this);
        HundredWarManager.OnGetRoomInfoEvent.removeListener(this.resetDbAndRepetBtn, this);
        HundredWarManager.panelHandler.onUpDownBankerEvent.removeListener(this.resetDbAndRepetBtn, this);
        HundredWarManager.onPosChangeEvent.removeListener(this.onPosChange, this);
    }

    /**
     * 禁用重复下注按钮
    */
    private forbidRepBtn()
    {
        this.target.repetBtn["maskImg"].visible = true;
        this.target.repetBtn.touchEnabled = false;
    }
    /**
     * 启用重复下注按钮
    */
    private openRepBtn()
    {
        this.target.repetBtn["maskImg"].visible = false;
        this.target.repetBtn.touchEnabled = true;
    }
    /**
     * 禁用双倍下注按钮
    */
    private forbidDbBtn()
    {
        this.target.doubleBtn["maskImg"].visible = true;
        this.target.doubleBtn.touchEnabled = false;
    }
    /**
     * 启用双倍下注按钮
    */
    private openDbBtn()
    {
        this.target.doubleBtn["maskImg"].visible = false;
        this.target.doubleBtn.touchEnabled = true;
    }
    /**
     * 重置重复按钮
    */
    private resetRepetBtn()
    {
        this.target.repetBtn.visible = true;
        if (this.repIsUseable())
        {
            this.openRepBtn();
        } else
        {
            this.forbidRepBtn();
        }
    }
    /**
     * 重置双倍按钮
    */
    private resetDbBtn()
    {
        this.target.doubleBtn.visible = false;
        this.openDbBtn();
    }
    /**
     * 重置重复双倍按钮和注数选择
    */
    private resetDbAndRepetBtn()
    {
        if (HundredWarManager.roomInfo)
        {
            if (HundredWarManager.roomInfo.state == HWState.Bet && !HundredWarManager.isBanker(UserManager.userInfo.id))
            {
                this.resetRepetBtn();
                this.resetDbBtn();
                this.reSetBetMask();
            } else if (HundredWarManager.roomInfo.state == HWState.WaitNext)
            {
                this.forbidBet();
                this.forbidBetChoose();
            }
        }
    }
    /**
     * 禁用重复合双倍按钮
    */
    private forbidBet()
    {
        this.forbidRepBtn();
        this.forbidDbBtn();
    }
    /**
     * 判断重复或者双倍下注后金币是否会超出庄家上限
    */
    public isOverBankerMost()
    {
        for (let playerInfo of HundredWarManager.roomInfo.playerList)
        {
            if (playerInfo.pos == 0 && !HundredWarManager.isSysBanker(playerInfo.roleId))
            {
                if (HundredWarManager.getPlayerBetTotalNum() + this.target.getPreBetGold() > (playerInfo.gold / 5))
                {
                    UIManager.showFloatTips("当前下注金币数已达庄家金币上限");
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * 重复下注按钮点击执行事件
    */
    private onRepetBtnClick(event: egret.TouchEvent)
    {
        if (this.repIsUseable() && !this.isOverBankerMost() && this.target.stateSupport.isOnBet)
        {
            SoundManager.playButtonEffect(event.target);
            this.target.repetBtn.visible = false;
            this.target.doubleBtn.visible = true;
            if (this.dbIsUseable(true))
            {
                this.target.doubleBtn["maskImg"].visible = false;
            } else
            {
                this.target.doubleBtn["maskImg"].visible = true;
            }
            for (let betInfo of this.target.preBetList)  //重复上一轮下注
            {
                if (betInfo.myBet > 0)
                {
                    HundredWarManager.reqBet(betInfo.pos, betInfo.myBet);
                }
            }
        }
    }
    /**
     * 位置改变执行事件
    */
    private onPosChange(data: any) 
    {
        if (data.roleId && data.roleId == UserManager.userInfo.id)
        {
            if (HundredWarManager.isBanker(data.roleId))
            {
                this.forbidBet();
                this.forbidBetChoose();
            } else
            {
                if (this.target.repetBtn.visible == true)
                {
                    this.resetRepetBtn();
                }
                this.reSetBetMask();
            }
        }
    }
    /**
     * 双倍按钮点击执行事件
    */
    private onDoubleBtnClick(event: egret.TouchEvent)
    {
        if (this.dbIsUseable() && !this.isOverBankerMost() && this.target.stateSupport.isOnBet)
        {
            SoundManager.playButtonEffect(event.target);
            this.forbidDbBtn();
            for (let betInfo of this.target.preBetList)  //双倍下注
            {
                if (betInfo.myBet > 0)
                {
                    HundredWarManager.reqBet(betInfo.pos, betInfo.myBet);
                }
            }
        }
    }
    /**
     * 判断重复按钮是否是可点击的
    */
    private repIsUseable(): boolean
    {
        if (HundredWarManager.roomInfo.state == HWState.Bet)
        {
            let total: number = this.target.getPreBetGold() + HundredWarManager.getThisBetGold();
            if (this.target.getPreBetGold() && ((UserManager.userInfo.gold + HundredWarManager.getThisBetGold()) / 5) >= total)
            {
                return true;
            }
        }
        return false;
    }
    /**
     * 判断双倍按钮是否是可点击的
    */
    private dbIsUseable(isRepClick: boolean = false): boolean
    {
        if (HundredWarManager.roomInfo.state == HWState.Bet)
        {
            let total: number;
            if (isRepClick)
            {
                total = this.target.getPreBetGold() * 2 + HundredWarManager.getThisBetGold();
            } else
            {
                total = this.target.getPreBetGold() + HundredWarManager.getThisBetGold();
            }
            if (((UserManager.userInfo.gold + HundredWarManager.getThisBetGold()) / 5) >= total)
            {
                return true;
            }
        }
        return false;
    }
    /**
     * 点击注数执行事件
    */
    private onBetListClick(event: egret.TouchEvent)
    {
        if (this.target.betList.selectedItem && this.target.betList.selectedItem.isBet)
        {
            SoundManager.playEffect(MusicAction.buttonClick);
            this.refreshBetColor(this.target.betList.selectedItem.id);
            HundredWarManager.oneBetGold = this.target.betList.selectedItem.bet;  //设置数据
        }
    }
    private refreshBetColor(id: number)
    {
        let dp: eui.ArrayCollection = this.target.betList.dataProvider as eui.ArrayCollection;  //设置显示状态
        for (let i: number = 0; i < this.target.betList.numChildren; i++)
        {
            if (dp.source[i].id == id)
            {
                let hwBetItem: HWBetItemRenderer = this.target.betList.getChildAt(id) as HWBetItemRenderer;
                if (hwBetItem)
                {
                    hwBetItem.setActive();
                }
            } else
            {
                let hwBetItem: HWBetItemRenderer = this.target.betList.getChildAt(dp.source[i].id) as HWBetItemRenderer;
                if (hwBetItem)
                {
                    hwBetItem.setNotActive();
                }
            }
        }
    }
    /**
     * 重置注数遮罩
    */
    public reSetBetMask()
    {
        this.setBetMask();
    }
    /**
     * 更新遮罩
    */
    private refreshBetMask()
    {
        this.setBetMask();
        if (this.target.repetBtn.visible == true)
        {
            if (this.repIsUseable())
            {
                this.openRepBtn();
            } else
            {
                this.forbidRepBtn();
            }
        }
        if (this.target.doubleBtn["maskImg"].visible == false)
        {
            if (this.dbIsUseable())
            {
                this.openDbBtn();
            } else
            {
                this.forbidDbBtn();
            }
        }
    }
    /**
     * 设置遮罩
    */
    private setBetMask()
    {
        let dp: eui.ArrayCollection = this.target.betList.dataProvider as eui.ArrayCollection;  //设置显示状态     
        let flag: boolean = true;
        for (let i: number = 0; i < this.target.betList.numChildren; i++)
        {
            let hwBetItem: HWBetItemRenderer = this.target.betList.getChildAt(dp.source[i].id) as HWBetItemRenderer;
            if (HundredWarManager.roomInfo.state == HWState.Bet)
            {
                let total: number;
                total = dp.source[i].bet + HundredWarManager.getThisBetGold();
                if (((UserManager.userInfo.gold + HundredWarManager.getThisBetGold()) / 5) >= total)
                {
                    hwBetItem.bet["maskImg"].visible = false;
                    dp.source[i].isBet = true;
                } else
                {
                    if (flag)
                    {
                        let total1: number;
                        if (i > 0)
                        {
                            total1 = dp.source[i - 1].bet + HundredWarManager.getThisBetGold();
                        } else
                        {
                            total1 = dp.source[0].bet + HundredWarManager.getThisBetGold();
                        }
                        if ((dp.source[i].bet <= HundredWarManager.oneBetGold) && (((UserManager.userInfo.gold + HundredWarManager.getThisBetGold()) / 5) >= total1))
                        {
                            if (i > 0)
                            {
                                this.refreshBetColor(dp.source[i - 1].id)
                                HundredWarManager.oneBetGold = dp.source[i - 1].bet;
                            } else if (i == 0)
                            {
                                this.refreshBetColor(dp.source[i].id)
                                HundredWarManager.oneBetGold = dp.source[i].bet;
                            }
                            flag = false;
                        }
                    }
                    hwBetItem.bet["maskImg"].visible = true;
                    dp.source[i].isBet = false;
                }
            } else
            {
                hwBetItem.bet["maskImg"].visible = true;
                dp.source[i].isBet = false;
            }
        }
    }
    /**
     * 判断是否可下注  （剩余的钱是否满足已下注的五分之一）
    */
    public isBetByOneFifth(): boolean
    {
        let flag: boolean = false;
        let dp: eui.ArrayCollection = this.target.betList.dataProvider as eui.ArrayCollection;
        for (let i: number = 0; i < this.target.betList.numChildren; i++)
        {
            if (dp.source[i].isBet == true)
            {
                flag = true;
                break;
            }
        }
        return flag;
    }
    /**
    * 禁用筹码选择
    */
    public forbidBetChoose()
    {
        let dp: eui.ArrayCollection = this.target.betList.dataProvider as eui.ArrayCollection;  //设置显示状态     
        let flag: boolean = true;
        for (let i: number = 0; i < this.target.betList.numChildren; i++)
        {
            let hwBetItem: HWBetItemRenderer = this.target.betList.getChildAt(dp.source[i].id) as HWBetItemRenderer;
            hwBetItem.bet["maskImg"].visible = true;
            dp.source[i].isBet = false;
        }
    }
    /**
    * 点击充值跳转到商城
   */
    private showShopping()
    {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { prevPanelName: UIModuleName.HundredWarRoomPanel });
    }
    /**
     * 头像点击执行事件
    */
    private pitTouchHandler(event: egret.TouchEvent)
    {
        if (this.target.moveTouchEnd(event))
        {
            return;
        }
        let headComponent: HWHeadComponent;
        if (event.currentTarget.parent instanceof HWHeadComponent) //空组
        {
            headComponent = event.currentTarget.parent as HWHeadComponent;
        }
        else if (event.currentTarget.parent.parent instanceof HWHeadComponent) //头像
        {
            headComponent = event.currentTarget.parent.parent as HWHeadComponent;
        }
        if (headComponent.bindData == null && InfoUtil.checkAvailable(HundredWarManager.roomInfo) && UserManager.userInfo.gold < HundredWarManager.roomInfo.definition.seatGold)
        {
            SoundManager.playEffect(MusicAction.buttonClick);
            AlertManager.showConfirm("坐下需要金币大于" + game.MathUtil.formatNum(HundredWarManager.roomInfo.definition.seatGold) + "，您的余额不足！", null, this.showShopping, null, null, null, null, "充值");
            return;
        }
        for (let pit of this.target.pitList) 
        {
            if (pit.headComponent == headComponent && HundredWarManager.roomInfo)
            {
                if (headComponent.bindData == null)
                {
                    let hwPlayerInfo: HWHundredWarRoomPlayerInfo;
                    hwPlayerInfo = HundredWarManager.getPlayerInfo(UserManager.userInfo.id);
                    if (hwPlayerInfo && hwPlayerInfo.pos != undefined)
                    {
                        return;
                    }
                    //发送坐下请求 
                    SoundManager.playEffect(MusicAction.buttonClick);
                    HundredWarManager.reqSeat(pit.pos);
                } else
                {
                    if (!HundredWarManager.isSysBanker(headComponent.bindData.roleId))
                    {
                        SoundManager.playEffect(MusicAction.buttonClick);
                        UserManager.reqShowOtherUserInfoPanel(headComponent.bindData.roleId);
                    }
                }
                break;
            }
        }
    }
    /**
     * 坐下成功广播执行事件
    */
    private onSeatSuccess(pos: number)
    {
        let hwHeadCom: HWHeadComponent;
        hwHeadCom = this.target.getHeadComponent(pos);
        if (hwHeadCom)
        {
            let hwPlayerInfo: HWHundredWarRoomPlayerInfo = new HWHundredWarRoomPlayerInfo();
            hwPlayerInfo.copyValueFromThis(UserManager.userInfo);
            hwHeadCom.sitDownInit(hwPlayerInfo);
            // this.onSitOrStand();
        }
    }
    /**
     * 自己坐下成功时显示坐下特效
    */
    public onSitOrStand()
    {
        if (this.isDisabled) //处理动画异步访问数据的问题
        {
            game.Console.log("异步不显示自己的手牌");
            return;
        }
        let com: HWHeadComponent = this.target.getHeadComponentByRole(UserManager.userInfo.id);
        if (com)
        {
            this.target.showDownEffect(com.playerGroup);
        }
    }
    public clear()
    {
        super.clear();
    }
    /*public clearBankerGold()
    {
        this.bankerGold = undefined;
    }*/
}