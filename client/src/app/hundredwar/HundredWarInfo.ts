/**
 * 百人大战房间列表信息
*/
class HundredWarListInfo extends BaseServerValueInfo implements IHaveDefintionInfo
{
    /**
     * 房间唯一id
     */
    public id: number;
    /**
     * 配置表id
    */
    private _hwId: number;
    /**
     * 定义
    */
    private _definition: table.IHundredWarDefine;
    public set hwId(value: number)
    {
        this._hwId = value;
        this._definition = table.HundredWarById[value];
    }
    public get hwId(): number
    {
        return this._hwId;
    }

    public get definition(): table.IHundredWarDefine
    {
        return this._definition;
    }
    /**
     * 已参加人数
    */
    public join: number;
    /**
     * 奖池金额
    */
    public pool: number;

    public reset()
    {
        super.reset();
    }
}