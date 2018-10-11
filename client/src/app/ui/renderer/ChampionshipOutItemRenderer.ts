/**
 * 锦标赛已结束赛事列表项面板
*/
class ChampionshipOutItemRenderer extends BaseItemRenderer<MatchRoomInfo>
{
    public itemComp: CommonIcon;
    /**
     * 名称
    */
    private nameLabel: eui.Label;
    /**
     * 人数信息
    */
    private numLabel: eui.Label;
    /**
     * 比赛时间信息描述
    */
    private timeDesLabel: eui.Label;
    /**
     * 比赛时间
    */
    private timeLabel: eui.Label;
    /**
     * 名次
    */
    public rankImg0: eui.Image;
    public rankImg1: eui.Image;
    public rankImg2: eui.Image;
    public rankImg3: eui.Image;
    /**
     * 奖励
    */
    public awardLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.ChampionshipOutItemRenderer;
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
            this.itemComp.init(this.bindData.definition.Icon + ResSuffixName.PNG, 100);
            this.nameLabel.text = this.bindData.definition.Name;
            this.numLabel.text = this.bindData.join.toString();
            this.getTimeDesAndTime();
            this.setRankImg();
            this.setAwardInfo();

            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
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
        let str: string = this.bindData.rank.toString();
        if (str.length <= 4)
        {
            for (let i: number = 0; i < str.length; i++)
            {
                this["rankImg" + i].source = ResPrefixName.MTTListRankImage + str[i] + ResSuffixName.PNG;
            }
        }
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
     * 设置奖励信息
    */
    private setAwardInfo()
    {
        let prizeListInfo: Array<table.IChampionshipPrizeDefine> = ChampionshipManager.getAwardList(this.bindData.id);
        let des: string = "淘汰";
        if (prizeListInfo && prizeListInfo.length > 0)
        {
            for (let def of prizeListInfo)
            {
                if (def.Start == this.bindData.rank)
                {
                    let name: string = AwardDefined.GetInstance().getAwardNameById(def.AwardId);
                    if (name)
                    {
                        des = name;
                    }
                    break;
                }
            }
        }
        this.awardLabel.text = des;
    }
}