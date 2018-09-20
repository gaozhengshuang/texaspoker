/**
 * 赛事场房间信息
*/
class PlayingFieldRoomInfo extends BaseServerValueInfo
{
    /**
     * 房间Id
    */
    public id: number;
    /**
     * 房间类型Id(配置表id)
    */
    private _roomId: number;
    /**
     * 配置ID
     */
    public get roomId(): number
    {
        return this._roomId;
    }
    public set roomId(value: number)
    {
        this._roomId = value;
        this._definition = RoomDefined.GetInstance().getDefinition(value);
        if (this._definition && this._definition.ante && this._definition.ante.length > 0)
        {
            this._ante = this._definition.ante[0];
        }
    }
    private _definition: RoomDefinition
    public get definition(): RoomDefinition
    {
        return this._definition;
    }
    /**
     * 房间玩家人数
    */
    public player: number;
    /**
     * 房间是否有密码  0:无    1有
    */
    public hasPwd: number;
    /**
     * 前注
    */
    private _ante: number;
    public get ante(): number
    {
        return this._ante;
    }

    public reset()
    {
        super.reset();
    }
}