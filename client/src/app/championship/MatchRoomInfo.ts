/**
 * 锦标赛赛事信息
*/
class MatchRoomInfo extends BaseServerValueInfo implements IHaveDefintionInfo
{

    private _id: number;
    /**
     * 配置ID
     */
    public get id(): number
    {
        return this._id;
    }
    public set id(value: number)
    {
        this._id = value;
        this._definition = ChampionshipDefined.GetInstance().getDefinition(value);
        this.maxAwardRank = ChampionshipManager.getAwardMaxRank(this._definition);
    }
    private _definition: ChampionshipDefinition
    public get definition(): ChampionshipDefinition
    {
        return this._definition;
    }
    /**
     * 赛事唯一id
    */
    public recordId: number;
    private _roomId: number;
    /**
     * 赛事所在房间的ID 只有进行中的比赛有房间ID
     */
    public get roomId(): number
    {
        return this._roomId;
    }
    public set roomId(value: number)
    {
        this._roomId = value;
    }
    /**
	 * 锦标赛的状态是否在等待开始
	 */
    public get isWaitStart(): boolean
    {
        return !this.roomId;
    }
    /**
     * 已报名人数
    */
    public join: number;
    /**
     * 剩余参赛人数
     */
    public leftJoin: number;
    /**
     * 赛事开始时间
    */
    public startTime: number;
    /**
     * 报名方式  1 金币   2 门票
    */
    public joinWay: JoinChampionshipWay;
    /**
     * 是否显示  1显示  0不显示
    */
    public isShow: number;
    /**
     * 均码
     */
    public avgChips: number;
    /**
     * 排名
     */
    public rank: number;
    /**
     * 进入奖励圈排名
     */
    public maxAwardRank: number;
    /**
     * 被淘汰时间
    */
    public outTime: number;
    /**
     * 赛事结束时间
    */
    public endTime: number;
    /**
     * 赛事开放开始时间
    */
    public openTime: number;
    /**
     * 赛事开放结束时间
    */
    public closeTime: number;
    /**
     * 是否已经提醒过（坐满即玩）
    */
    public isRemineded: boolean;
    /**
     * 将自己克隆到一个对象
     */
    public cloneTo(target: MatchRoomInfo)
    {
        target._definition = this._definition;
        let data: any = this;
        for (let key in data)
        {
            target[key] = data[key];
        }
    }
    public reset()
    {
        super.reset();
    }
}