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
        let roomDef:table.ITexasRoomDefine = table.TexasRoomById[value];

        this._definition = table.TexasRoomById[value];
        if (this._definition && this._definition.Ante && this._definition.Ante.length > 0)
        {
            this._ante = game.longToNumber(this._definition.Ante[0]);
        }
    }
    private _definition: table.ITexasRoomDefine
    public get definition(): table.ITexasRoomDefine
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