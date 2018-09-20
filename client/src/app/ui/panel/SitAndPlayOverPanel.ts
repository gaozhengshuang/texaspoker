/**
 * 坐满即玩结束面板
 */
class SitAndPlayOverPanel extends BasePanel
{
    /**
     * 冠军时显示的group
    */
    public winRankGroup: eui.Group;  //排名
    public winBtnGroup: eui.Group;  //按钮
    /**
     * 非冠军时显示的group
    */
    public lostRankGroup: eui.Group;  //排名
    public lostBtnGroup: eui.Group;  // 按钮
    /**
     * 有奖励group
    */
    public hasAwardGroup: eui.Group;
    public goldNumLabel: eui.Label;  //获得的奖励
    /**
     * 无奖励提示
    */
    public noAwardDesLabel: eui.Label;
    /**
    * 名次
   */
    public rankImg0: eui.Image;
    public rankImg1: eui.Image;
    public rankImg2: eui.Image;
    public rankImg3: eui.Image;
    /**
     * 最终排名
    */
    public endRankLabel: eui.Label;
    /**
     * 返回大厅按钮
    */
    public backHallBtn: eui.Button;
    public backHallBtn0: eui.Button;
    /**
     * 再来一局按钮
    */
    public againBtn: eui.Button;
    public againBtn0: eui.Button;
    /**
     * 留下观看按钮
    */
    public stayBtn: eui.Button;
    private _isToHall: boolean;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.SitAndPlayOverPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.setInfo();
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.backHallBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backHallBtnClick, this);
        this.backHallBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backHallBtnClick, this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.againBtnClick, this);
        this.againBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.againBtnClick, this);
        this.stayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stayBtnClick, this);
        GamblingManager.LeaveRoomEvent.addListener(this.switchScene, this);
        GamblingManager.LeaveRoomErrorEvent.addListener(this.switchScene, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.backHallBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backHallBtnClick, this);
        this.backHallBtn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backHallBtnClick, this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.againBtnClick, this);
        this.againBtn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.againBtnClick, this);
        this.stayBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stayBtnClick, this);
        GamblingManager.LeaveRoomEvent.removeListener(this.switchScene, this);
        GamblingManager.LeaveRoomErrorEvent.removeListener(this.switchScene, this);
    }

    /**
     * 设置数据
    */
    private setInfo()
    {
        if (this.panelData.rank == 1 || this.panelData.rank == 2)
        {
            this.winBtnGroup.visible = true;
            this.lostBtnGroup.visible = false;
            if (this.panelData.rank == 1)
            {
                this.winRankShow();
            } else
            {
                this.lostRankShow();
                this.setRankImg();
            }
        } else
        {
            this.lostRankShow();
            this.winBtnGroup.visible = false;
            this.lostBtnGroup.visible = true;
            this.setRankImg();
        }
        let championshipPrizeList: Array<ChampionshipPrizeDefinition> = ChampionshipManager.getAwardList(this.panelData.id);
        if (championshipPrizeList)
        {
            for (let championshipPrize of championshipPrizeList)
            {
                if (this.panelData.rank <= championshipPrizeList.length && this.panelData.rank == championshipPrize.start)
                {
                    this.hasAwardShow();
                    let num: number = AwardDefined.GetInstance().getAwardNumByAwardId(championshipPrize.awardId);
                    if (num)
                    {
                        this.goldNumLabel.text = qin.MathUtil.formatNum(num);
                    }
                    break;
                } else
                {
                    this.noAwardShow()
                }
            }
        }
    }
    /**
     * 冠军时排行显示
    */
    private winRankShow()
    {
        this.winRankGroup.visible = true;
        this.lostRankGroup.visible = false;
    }
    /**
     * 非冠军时排行显示
    */
    private lostRankShow()
    {
        this.winRankGroup.visible = false;
        this.lostRankGroup.visible = true;
    }
    /**
     * 有奖励时显示
    */
    private hasAwardShow()
    {
        this.hasAwardGroup.visible = true;
        this.noAwardDesLabel.visible = false;
    }
    /**
     * 无奖励时显示
    */
    private noAwardShow()
    {
        this.hasAwardGroup.visible = false;
        this.noAwardDesLabel.visible = true;
    }
    /**
     * 初始化排名图片
    */
    private initRankImg()
    {
        for (let i: number = 0; i < 4; i++)
        {
            this["rankImg" + i].source = "";
        }
    }
    /**
     * 写入排名图片
    */
    private setRankImg()
    {
        this.initRankImg();
        let str: string = this.panelData.rank.toString();
        if (str.length <= 4)
        {
            for (let i: number = 0; i < str.length; i++)
            {
                this["rankImg" + i].source = ResPrefixName.SNGRankImage + str[i] + ResSuffixName.PNG;
            }
        }
    }
    /**
     * 返回大厅按钮触发事件
    */
    private backHallBtnClick(event: egret.TouchEvent)
    {
        GamblingManager.reqLeaveRoom(true);
        this._isToHall = true;
    }
    /**
     * 再来一局按钮触发事件
    */
    private againBtnClick(event: egret.TouchEvent)
    {
        GamblingManager.reqLeaveRoom(true);
        this._isToHall = false;
    }
    /**
     * 留下观看按钮点击事件
    */
    private stayBtnClick(event: egret.TouchEvent)
    {
        GamblingManager.championshipHandler.startRoomDisbandListener();
        super.onCloseBtnClickHandler(event);
    }
    /**
     * 发送离开请求后切换场景
    */
    private switchScene()
    {
        if (this._isToHall)
        {
            SceneManager.switcScene(SceneType.Hall, { action: SceneSwitchAction.RepleacePanel, panel: UIModuleName.GameHallPanel });
        } else
        {
            SceneManager.switcScene(SceneType.Hall, { action: SceneSwitchAction.RepleacePanel, panel: UIModuleName.ChampionshipPanel, params: { isToSNG: true } });
        }
        super.onCloseBtnClickHandler(null);
    }
}
