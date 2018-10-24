/**
 * 百人大战结算面板
*/
class HundredWarOverPanel extends BasePanel
{
    public userGroup: eui.Group;
    /**
     * 输/赢标题
    */
    public titleImg: eui.Image;
    /**
     * 输赢背景
     */
    public overBgImg: eui.Image;
    /**
     * 输/赢提示
    */
    public tipsLabel: eui.Label;
    /**
     * 结算金币
    */
    public numComp: HundredWarNumComponent;
    /**
     * 确认按钮
    */
    public confirmBtn: ShadowButton;

    private _countDownTime: number;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.HundredWarOverPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.reset();
        this.coundDown();
        game.Tick.AddSecondsInvoke(this.coundDown, this);
        let overInfo: HundredWarOverInfo = HundredWarManager.hundredWarOverInfo;
        if (overInfo)
        {
            this.numComp.init("$" + game.MathUtil.numAddSpace(overInfo.gold));
            if (overInfo.isWin)
            {
                this.tipsLabel.text = "恭喜，您赢取了";
                this.titleImg.source = SheetSubName.HundredWar_Win;
                this.overBgImg.source = SheetSubName.HundredWar_WinBg;
            }
            else
            {
                this.tipsLabel.text = "您输了";
                this.titleImg.source = SheetSubName.HundredWar_Lose;
                this.overBgImg.source = SheetSubName.HundredWar_LoseBg;
            }
            if (overInfo.rankList)
            {
                this.refreshList(overInfo.rankList);
            }
        }
    }
    /**
     * 请求下一个
     */
    private refreshList(list: msg.ITFRankPlayer[])
    {
        if (list.length > 0)
        {
            for (let i: number = 0; i < list.length; i++)
            {
                let rankInfo: any = list[i];
                this["winGold" + i].text = game.MathUtil.formatNum(rankInfo.num);
                if (HundredWarManager.isSysBanker(rankInfo.roleId))
                {
                    this.userGroup.getChildAt(i).visible = true;
                    this["head" + i].init(HundredWarManager.sysBanker, 80);
                }
                else
                {
                    let userInfo: SimpleUserInfo = new SimpleUserInfo();
                    userInfo.copyValueFromIgnoreCase(list[i]);
                    this.userGroup.getChildAt(i).visible = true;
                    this["head" + i].init(userInfo, 80);
                }
            }

        }
    }
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
    //                 thisObj["winGold" + thisObj._headIndex].text = game.MathUtil.formatNum(rankInfo.num);
    //                 thisObj._headIndex++;
    //             }
    //             thisObj.reqInitRank(this._rankListClone);
    //         }
    //         if (rankInfo.roleId == HundredWarManager.sysBanker.roleId)
    //         {
    //             thisObj.userGroup.getChildAt(thisObj._headIndex).visible = true;
    //             thisObj["head" + thisObj._headIndex].init(HundredWarManager.sysBanker, 80);
    //             thisObj["winGold" + thisObj._headIndex].text = game.MathUtil.formatNum(rankInfo.num);
    //             thisObj._headIndex++;
    //             thisObj.reqInitRank(this._rankListClone);
    //         }
    //         else
    //         {
    //             //UserManager.reqSimpleUserInfo(rankInfo.roleId, game.Delegate.getOut(callback, this));
    //         }
    //     }
    //     else
    //     {
    //         this._headIndex = 0;
    //     }
    // }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        game.Tick.RemoveSecondsInvoke(this.coundDown, this);
    }
    /**
     * 倒计时
    */
    private coundDown()
    {
        this.confirmBtn.labelDisplay.text = "确定  " + this._countDownTime;
        if (this._countDownTime > 0)
        {
            this._countDownTime--;
        } else
        {
            game.Tick.RemoveSecondsInvoke(this.coundDown, this);
            this.closePanel(null);
        }
    }
    /**
     * 关闭面板
    */
    private closePanel(event: egret.TouchEvent)
    {
        if (event)
        {
            SoundManager.playButtonEffect(event.target);
        }
        if (!HundredWarManager.isBanker(UserManager.userInfo.roleId) && InfoUtil.checkAvailable(HundredWarManager.roomInfo) && UserManager.userInfo.gold < HundredWarManager.roomInfo.definition.MinBuyin)
        {
            AlertManager.showConfirm("您的金币不足，快去商城补充点金币吧！", this.goToShopping, this.outRoom, null, null, null, "前往商城");
        }
        this.onCloseBtnClickHandler(null);
    }
    /**
     * 进入商城
    */
    private goToShopping()
    {
        JumpUtil.JumpToShopping(ShopGroupIndex.Gold, UIModuleName.HundredWarRoomPanel);
    }
    /**
     * 把玩家踢出
    */
    private outRoom()
    {
        HundredWarManager.reqLeave();
    }
    private reset()
    {
        this._countDownTime = HundredWarManager.roomInfo.definition.ConfirmTime;
        for (let i: number = 0; i < this.userGroup.numChildren; i++)
        {
            this.userGroup.getChildAt(i).visible = false;
        }
    }
}