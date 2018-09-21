/**
 *房间信息
*/
class RoomDefined 
{

    private static _instance: RoomDefined;
    public static GetInstance(): RoomDefined
    {
        if (!RoomDefined._instance)
        {
            RoomDefined._instance = new RoomDefined();
        }

        return RoomDefined._instance;
    }
    /**
     * 通过type获得数据
    */
    public getInfoByType(type: PlayingFieldType): Array<table.ITexasRoomDefine>
    {
        return table.TexasRoom.filter(data =>
        {
            return data.Type == type
        });
    }
}
