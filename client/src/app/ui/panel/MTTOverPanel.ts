/**
 * MTT结束面板
 */
class MTTOverPanel extends BasePanel
{
    public bottomGroup: eui.Group;
    /**
     * 最终排名
    */
    public endRankLabel: eui.Label;
    /**
     * 获得的奖励
    */
    public awardDesLabel: eui.Label;
    /**
     * icon图片
    */
    public iconImg: eui.Image;
    /**
     * 总报名人数
    */
    public allJoinNumLabel: eui.Label;
    /**
     * 比赛进行时间
    */
    public processTimeLabel: eui.Label;
    /**
     * 淘汰了的玩家数
    */
    public outNumLabel: eui.Label;
    /**
     * 最高排名
    */
    public highestLabel: eui.Label;
    /**
     * 分享按钮
    */
    public shareBtn: eui.Button;
    /**
     * 确定按钮
    */
    public confirmBtn: eui.Button;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.MTTOverPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        if ((game.System.isWeChat || game.System.isMicro) && !VersionManager.isSafe)
        {
            this.shareBtn.visible = true;
            this.bottomGroup.addChildAt(this.shareBtn, 0);
        } else
        {
            this.shareBtn.visible = false;
            this.addChildAt(this.shareBtn, 0);
        }
        this.setInfo();
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmBtnClick, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareBtnClick, this);
        GamblingManager.LeaveRoomEvent.addListener(this.switchScene, this);
        GamblingManager.LeaveRoomErrorEvent.addListener(this.switchScene, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmBtnClick, this);
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shareBtnClick, this);
        GamblingManager.LeaveRoomEvent.removeListener(this.switchScene, this);
        GamblingManager.LeaveRoomErrorEvent.removeListener(this.switchScene, this);
    }

    /**
     * 设置数据
    */
    private setInfo()
    {
        if (this.panelData.rank <= 3)
        {
            this.iconImg.source = SheetSubName.MTTOverGoldenCup;
        } else
        {
            this.iconImg.source = SheetSubName.MTTOverSilverCup;
        }
        if (this.panelData.rank == 1)
        {
            this.endRankLabel.text = "冠军";
        } else
        {
            this.endRankLabel.text = "第" + this.panelData.rank.toString() + "名";
        }
        let championshipPrizeList: Array<table.IChampionshipPrizeDefine> = ChampionshipManager.getAwardList(this.panelData.id);
        if (championshipPrizeList)
        {
            for (let championshipPrize of championshipPrizeList)
            {
                if (this.panelData.rank <= championshipPrizeList.length && this.panelData.rank == championshipPrize.Start)
                {
                    let str: string = "恭喜你获得了";
                    let des: string = AwardDefined.GetInstance().getAwardNameById(championshipPrize.AwardId);
                    if (des)
                    {
                        str = str + des + "奖励！";
                        this.awardDesLabel.text = str;
                    }
                    break;
                } else
                {
                    this.awardDesLabel.text = "您没有获得任何奖励";
                }
            }
        }
        this.allJoinNumLabel.text = this.panelData.join.toString();
        for (let matchInfo of ChampionshipManager.processMTTList)
        {
            if (matchInfo.recordId == this.panelData.recordId)
            {
                let num: number = Math.floor(TimeManager.GetServerUtcSecondstamp()) - matchInfo.startTime;
                let min: number = Math.round(num / 60);
                this.processTimeLabel.text = min.toString();
                break;
            }
        }
        this.outNumLabel.text = (this.panelData.join - this.panelData.rank).toString();
        if (this.panelData.maxRank)
        {
            this.highestLabel.text = this.panelData.maxRank.toString();
        }
    }
    /**
 * 关闭按钮触发事件
    */
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        GamblingManager.reqLeaveRoom(true);
    }
    /**
     * 确定按钮触发事件
    */
    private confirmBtnClick(event: egret.TouchEvent)
    {
        GamblingManager.reqLeaveRoom(true);
    }
    /**
     * 发送离开请求后切换场景
    */
    private switchScene()
    {
        SceneManager.switcScene(SceneType.Hall, { action: SceneSwitchAction.RepleacePanel, panel: UIModuleName.GameHallPanel });
        super.onCloseBtnClickHandler(null);
    }
    /**
     * 分享按钮触发事件
    */
    private shareBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (game.System.isMicro && ChannelManager.hasWeixin == false)
        {
            AlertManager.showAlert("您未安装微信，分享失败。");
        }
        else
        {
            UIManager.showPanel(UIModuleName.ChooseShareWayPanel, { wxMsgTitle: ChannelManager.appName, wxTimeLineTitle: game.StringUtil.format("我在{0}中获得了冠军。服吗？不服来战！", ChannelManager.appName), msg: game.StringUtil.format("我在{0}中获得了冠军。服吗？不服来战！", ChannelManager.appName), isHasShareId: false });
        }
    }
}
