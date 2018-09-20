/**
 *房间信息
*/
class RoomDefined extends BaseDefined<RoomDefinition>
{
    public static readonly forbiddenConfig: string = "room";
    private static _instance: RoomDefined;
    public static GetInstance(): RoomDefined
    {
        if (!RoomDefined._instance)
        {
            RoomDefined._instance = new RoomDefined();
        }
        if (DefinedManager.IsParsed(RoomDefined.forbiddenConfig) == false)
        {
            RoomDefined._instance.initialize();
        }
        return RoomDefined._instance;
    }
    private initialize()
    {
        this.dataList = DefinedManager.GetData(RoomDefined.forbiddenConfig) as Array<RoomDefinition>;
    }

    /**
     * 通过type获得数据
    */
    public getInfoByType(type: PlayingFieldType): Array<RoomDefinition>
    {
        if (this.dataList != null)
        {
            let infoList: Array<RoomDefinition> = new Array<RoomDefinition>();
            for (let def of this.dataList)
            {
                if (def.type == type)
                {
                    infoList.push(def);
                }
            }
            return infoList;
        }
        return null;
    }
}
/**
* 房间信息定义
*/
class RoomDefinition implements IBaseDefintion
{
    /**
     * ID
    */
    public id: number;
    /**
     * 游戏场次类型 1.普通场 2.中级场 3.高级场 11.私人房间 21.比赛房间  31.引导训练营房间 32.引导玩法房间
    */
    public type: PlayingFieldType;
    /**
     * 小盲注
    */
    public sBlind: number;
    /**
     * 大盲注
    */
    public bBlind: number;
    /**
     * 最小买入
    */
    public sBuyin: number;
    /**
     * 最大买入
    */
    public bBuyin: number;
    /**
     * 税
    */
    public tax: number;
    /**
     * 座位
     */
    public seat: number;
    /**
     * CD时间
     */
    public cd: number;
    /**
     * 客户端CD时间
     */
    public clientCd: number;
    /**
     * 玩牌模式（0.正常模式 1.快速模式 2.前注模式 3.无上限模式 4.私人房模式 5.all模式）
     */
    public pattern: number;
    /**
     * 前注列表
     */
    public ante: Array<number>;
    /**
     * 超时踢出次数
     */
    public timeOut: number;
    /**
     * 结算时间到下一局的等待时间
     */
    public waitingTime: number;
}
