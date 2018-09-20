/**
 * 锦标赛最近赛况项面板
*/
class OutsItemRenderer extends BaseItemRenderer<OutsInfo>
{
    /**
     * 昵称
    */
    public nameLabel: eui.Label;
    /**
     * 日期
    */
    public dateLabel: eui.Label;
    /**
     * 时间
    */
    public timeLabel: eui.Label;
    /**
     * 名次
    */
    public rankLabel: eui.Label;
    /**
     * 用户昵称
    */
    public userNameLabel: eui.Label;
    /**
     * 获得的奖励
    */
    public awardLabel: eui.Label;
    /**
     * 更多按钮
    */
    public dirBtn: eui.ToggleSwitch;
    /**
     * 子列表
    */
    public list = new eui.List();

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.OutsItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.dirBtn.touchEnabled = false;
            let date: Date = new Date(this.bindData.time * 1000);
            let today: Date = new Date();
            let todayLastTime: number = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 23, 59, 59).getTime();
            if (this.bindData.time <= Math.floor(todayLastTime / 1000))  //今天之前
            {
                this.dateLabel.text = (date.getMonth() + 1) + "-" + date.getDate();
            } else  // 在今天
            {
                this.dateLabel.text = "今天";
            }
            this.timeLabel.text = qin.DateTimeUtil.formatDate(date, qin.DateTimeUtil.Format_Standard_NoSecond).split(qin.StringConstants.Blank)[1];
            this.nameLabel.text = this.bindData.name;
            this.rankLabel.text = "冠军";
            this.userNameLabel.text = this.bindData.rankList[0].name;
            this.awardLabel.text = this.bindData.rankList[0].award;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getOutsRankInfo, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getOutsRankInfo, this);
    }

    /**
     * 设置最近赛况点击触发的操作事件
     * 获取被点击的最近赛况的排名信息
    */
    private getOutsRankInfo(event: TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        ChampionshipManager.recentMTTId = this.bindData.id;
        if (this.bindData.rankList.length < 2)
        {
            ChampionshipManager.reqGetRankList(this.bindData.recordId);
        } else
        {
            ChampionshipManager.OnGetRankListEvent.dispatch(this.bindData.recordId);
        }
    }
}