/**
 * 累充活动配置
 */
class ActivityPilePrizeDefined extends BaseActivitySubDefined<ActivityPilePrizeDefintion>
{
    private static readonly activityConfig: string = "activity_pilePrize";
    private static _instance: ActivityPilePrizeDefined;
    public static GetInstance(): ActivityPilePrizeDefined
    {
        if (!ActivityPilePrizeDefined._instance)
        {
            ActivityPilePrizeDefined._instance = new ActivityPilePrizeDefined();
        }
        if (DefinedManager.IsParsed(ActivityPilePrizeDefined.activityConfig) == false)
        {
            ActivityPilePrizeDefined._instance.initialize();
        }
        return ActivityPilePrizeDefined._instance;
    }

    public initialize()
    {
        this.dataList = DefinedManager.GetData(ActivityPilePrizeDefined.activityConfig) as Array<ActivityPilePrizeDefintion>;
    }
}
/**
 * 累充活动配置
 */
class ActivityPilePrizeDefintion extends BaseActivitySubDefnition
{
    /**
     *任务名称
     */
    public textDescription: string;
    /**
     * 类型
     * 1，拥有金币
2，拥有好友
3，等级成长     参数1：等级 
4，牌型         参数1：获取牌型数 参数2：牌型
5，注册并登录游戏
6，下载手机APP（使用APP登录）
101，游戏场对局 参数1：次数  参数2:1，初级场。2：中级场，3：高级场
102，mtt锦标赛成功参与。报名后玩家比赛开始就算
201，德州胜利   参数1：胜利次数
202，mtt锦标赛获得冠军
301，参与百人大战，参数2:1，欢乐场，2，富豪场
303，百人大战胜利
     */
    public type: number;
    /**
     * 参数
     */
    public para1: any;
    public para2: any;
    public para3: any;
    public para4: any;
    /**
     * 是否隐藏
     */
    public isHide: boolean;
    /**
     * 图标
     */
    public icon: string;
    /**
     * 奖励id
     */
    public awardId: number;
    /**
     * 跳转界面
     */
    public tran: number;
}