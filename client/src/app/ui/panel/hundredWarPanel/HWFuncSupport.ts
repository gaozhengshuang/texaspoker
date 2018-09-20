/**
 * 其他功能跳转
 */
class HWFuncSupport extends BaseHWPanelSupport
{
    /**
     * 本局结束时候站起
    */
    public isRoundOverStandUp: boolean;

    public initialize()
    {
        super.initialize();
        this.setStandUpBtn();
    }
    public onEnable()
    {
        super.onEnable();
        this.target.addEventListener(egret.TouchEvent.TOUCH_TAP, this.funcGroupClickHandler, this);
        HundredWarManager.onLeaveEvent.addListener(this.backToHallFromServer, this);
        HundredWarManager.onOutRoomEvent.addListener(this.outRoom, this);
        HundredWarManager.onPosChangeEvent.addListener(this.setStandUpBtn, this);
        HundredWarManager.onShowCardsAnimOverEvent.addListener(this.reqStandUp, this);
        HundredWarManager.onStandUpEvent.addListener(this.onStandUp, this);
    }
    public onDisable()
    {
        super.onDisable();
        this.target.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.funcGroupClickHandler, this);
        HundredWarManager.onLeaveEvent.removeListener(this.backToHallFromServer, this);
        HundredWarManager.onOutRoomEvent.removeListener(this.outRoom, this);
        HundredWarManager.onPosChangeEvent.removeListener(this.setStandUpBtn, this);
        HundredWarManager.onShowCardsAnimOverEvent.removeListener(this.reqStandUp, this);
        HundredWarManager.onStandUpEvent.removeListener(this.onStandUp, this);
        game.Tick.RemoveTimeoutInvoke(this.leaveRoom, this);
    }

    /**
     * 站起成功
    */
    private onStandUp()
    {
        if (this.isRoundOverStandUp)
        {
            this.isRoundOverStandUp = false;
        }
    }
    /**
     * 位置变更时设置站起按钮
    */
    private setStandUpBtn()
    {
        if (HundredWarManager.self && HundredWarManager.self.pos != 0)
        {
            this.target.funcGroup.addChildAt(this.target.standUpBtn, 2);
            this.target.standUpBtn.visible = true;
        }
        else
        {
            if (this.target.standUpBtn.parent)
            {
                this.target.addChildAt(this.target.standUpBtn, 0);
                this.target.standUpBtn.visible = false;
            }
        }
    }
    /**
     * 发送站起请求
    */
    private reqStandUp()
    {
        if (this.isRoundOverStandUp)
        {
            HundredWarManager.reqStandUp();
        }
    }
    private funcGroupClickHandler(event: egret.TouchEvent)
    {
        switch (event.target)
        {
            case this.target.chargeBtn: //充值
                SoundManager.playEffect(MusicAction.buttonClick);
                UIManager.showPanel(UIModuleName.ShoppingPanel, { prevPanelName: UIModuleName.HundredWarRoomPanel, toRight: true });
                break;
            case this.target.backToHallBtn: //返回大厅
                SoundManager.playEffect(MusicAction.buttonClick);
                this.backToHallBtnClickHandler(event);
                break;
            case this.target.standUpBtn:  //站起
                if (HundredWarManager.roomInfo.state == HWState.Bet && HundredWarManager.getThisBetGold())
                {
                    AlertManager.showAlert("游戏正在进行中，本局结束后将自动站起！");
                    this.isRoundOverStandUp = true;
                } else
                {
                    HundredWarManager.reqStandUp();
                }
                break;
            case this.target.chatBtn://聊天
                SoundManager.playEffect(MusicAction.buttonClick);
                if (this.target.moveTouchEnd(event))
                {
                    return;
                }
                JumpUtil.JumpToChatPanel();
                break;
            case this.target.achieveBtn: //任务
                SoundManager.playEffect(MusicAction.buttonClick);
                if (this.target.moveTouchEnd(event))
                {
                    return;
                }
                JumpUtil.JumpToAchievementInHundredWar(AchieveShowPattern.HundredWarAll);
                break;
            case this.target.buyBtn: //商城
                SoundManager.playEffect(MusicAction.buttonClick);
                if (this.target.moveTouchEnd(event))
                {
                    return;
                }
                UIManager.showPanel(UIModuleName.ShoppingPanel, { prevPanelName: UIModuleName.HundredWarRoomPanel, toRight: false });
                break;
            case this.target.playersBtn://未入座玩家
                SoundManager.playEffect(MusicAction.buttonClick);
                if (this.target.moveTouchEnd(event))
                {
                    return;
                }
                JumpUtil.JumpToHundredWarNoSeatPlayer();
                break;
            case this.target.trendBtn://趋势
                SoundManager.playEffect(MusicAction.buttonClick);
                if (this.target.moveTouchEnd(event))
                {
                    return;
                }
                JumpUtil.JumpToHundredWarTrend();
                break;
            case this.target.helpBtn: //帮助
                SoundManager.playEffect(MusicAction.buttonClick);
                if (this.target.moveTouchEnd(event))
                {
                    return;
                }
                JumpUtil.JumpToHundredWarHelp();
                break;
            case this.target.potGroup:
                SoundManager.playEffect(MusicAction.buttonClick);
                if (this.target.moveTouchEnd(event))
                {
                    return;
                }
                JumpUtil.JumpToHundredWarPoolInfo();
                break;
        }
    }
    private backToHallFromServer()
    {
        //this.target.onClose();
        this.isRoundOverStandUp = false;
        this.target.leaveClear();
        SceneManager.switcScene(SceneType.Hall, { action: SceneSwitchAction.RepleacePanel, panel: UIModuleName.HundredWarPanel });
    }
	/**
	 * 返回大厅按钮点击
	 */
    private backToHallBtnClickHandler(event: egret.TouchEvent)
    {
        if (HundredWarManager.roomInfo)
        {
            this.leaveRoom();
        }
        else
        {
            this.backToHallFromServer();
        }
    }
    /**
     * 别踢出房间
    */
    private outRoom()
    {
        this.backToHallFromServer();
    }
    /**
     * 发送请求离开房间
    */
    private leaveRoom()
    {
        HundredWarManager.reqLeave();
    }
    public clear()
    {
        super.clear();
    }
}