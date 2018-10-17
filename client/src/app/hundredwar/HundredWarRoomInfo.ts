/**
 * 百人大战房间信息
 */
class HWRoomInfo extends BaseServerValueInfo implements IHaveDefintionInfo
{
	/**
	 * 房间id
	 */
    public id: number;
	/**
	 * 奖池筹码
	 */
    public pool: number;
    /**
     * 房间状态 (用来表示房间是处于下注 休息 还是其他的阶段)
    */
    public state: HWState;
    /**
     * 状态变化的时间  (房间已处于该状态多少时间 )
    */
    public stateTime: number;
    /**
     * 庄家金币
    */
    public bankerGold: number;

    private _roomId: number;
	/**
	 * 房间的配置ID
	 */
    public get hwId(): number 
    {
        return this._roomId;
    }
    public set hwId(value: number) 
    {
        this._roomId = value;
        this._definition = table.HundredWarById[value];
    }
	/**
 	* 房间定义
 	*/
    private _definition: table.IHundredWarDefine;
    public get definition(): table.IHundredWarDefine
    {
        return this._definition;
    }

	/**
	 * 玩家列表
	 */
    public playerList: Array<HWHundredWarRoomPlayerInfo> = new Array<HWHundredWarRoomPlayerInfo>();
    /**
     * 注池列表
    */
    public betList: Array<HWBetPotInfo> = new Array<HWBetPotInfo>();

    public reset()
    {
        super.reset();
    }
}