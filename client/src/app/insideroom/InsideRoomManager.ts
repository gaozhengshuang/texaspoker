/**
 * 自己在里面的房间管理器
 */
class InsideRoomManager
{
    /**
     * 房间信息列表
     */
    public static list: Array<InsideRoomInfo> = new Array<InsideRoomInfo>();
    /**
     * 游戏场房间的起始ID
     */
    public static readonly ID_GAME_START: number = 100000;
    /**
     * 游戏场房间的结束ID
     */
    public static readonly ID_GAME_END: number = 200000;
    /**
     * 百人大战房间的起始ID
     */
    public static readonly ID_HUNDREDWAR_START: number = 400000;
    /**
     * 百人大战房间的结束ID
     */
    public static readonly ID_HUNDREDWAR_END: number = 499999;
    /**
     * 锦标赛的房间起始ID
     */
    public static readonly ID_MTT_START: number = 500000;
    /**
     * 锦标赛的房间结束ID
     */
    public static readonly ID_MTT_END: number = 599999;
    /**
     * 奥马哈房间的起始ID
     */
    public static readonly ID_OMAHA_START: number = 600000;
    /**
     * 奥马哈房间结束ID
     */
    public static readonly ID_OMAHA_END: number = Number.MAX_VALUE;
    /**
     * 游戏场私人房起始ID
     */
    public static readonly ID_GAMEPERSON_START: number = 10000;
    /**
     * 游戏场私人房结束ID
     */
    public static readonly ID_GAMEPERSON_END: number = 19999;
    /**
     * 奥马哈私人房起始ID
     */
    public static readonly ID_OMAHAPERSON_START: number = 20000;
    /**
     * 奥马哈私人房结束ID
     */
    public static readonly ID_OMAHAPERSON_END: number = 29999;

    /**
     * 最后所在的房间配置表ID
     */
    // private static lastTId: number;
    /**
     * 最后所在的房间的唯一id
     */
    public static lastId: number;
    /**
     * 最后房间的密码
     */
    public static lastPasswd: string;

    public static initialize(result: game.SpRpcResult)
    {
        InsideRoomManager.list.length = 0;
        // InsideRoomManager.lastTId = undefined;
        let data: msg.RS2C_RetInsideRoomInfoList = result.data;
        if (data)
        {
            // InsideRoomManager.lastId = game.longToNumber(data.roomid);
            // InsideRoomManager.lastTId = data.tid;
            // InsideRoomManager.lastPasswd = data.passwd;
            // let info = new InsideRoomInfo();
            // info.id = game.longToNumber(data.roomid);
            // info.tid = data.tid;
            // info.passwd = data.passwd;

            // InsideRoomManager.list.push(info);

            InsideRoomManager.lastId = game.longToNumber(data.lastid);
            if (data.roomlist)
            {
                for (let roomInfo of data.roomlist)
                {
                    let info = new InsideRoomInfo();
                    info.id = game.longToNumber(roomInfo.id);
                    // info.tid = roomInfo.tid;
                    info.mttId = roomInfo.mttid;
                    // info.passwd = roomInfo.passwd;
                    InsideRoomManager.list.push(info);
                }
            }
        }
    }
    /**
     * 根据类型获取类型的房间列表
     */
    public static getInfoListByType(type: InsideRoomType): Array<InsideRoomInfo>
    {
        let start: number;
        let end: number;
        let list: Array<InsideRoomInfo> = new Array<InsideRoomInfo>();
        switch (type)
        {
            // case InsideRoomType.Game:
            //     start = InsideRoomManager.ID_GAME_START;
            //     end = InsideRoomManager.ID_GAME_END;
            //     break;
            // case InsideRoomType.HundredWar:
            //     start = InsideRoomManager.ID_HUNDREDWAR_START;
            //     end = InsideRoomManager.ID_HUNDREDWAR_END;
            //     break;
            case InsideRoomType.Match:
                let info: InsideRoomInfo;
                for (let i: number = 0; i < InsideRoomManager.list.length; i++)
                {
                    info = InsideRoomManager.list[i];
                    if (info.mttId > 0)
                    {
                        list.push(info);
                    }
                }
                break;
            // case InsideRoomType.Omaha:
            //     start = InsideRoomManager.ID_OMAHA_START;
            //     end = InsideRoomManager.ID_OMAHA_END;
            //     break;
            // case InsideRoomType.GamePerson:
            //     start = InsideRoomManager.ID_GAMEPERSON_START;
            //     end = InsideRoomManager.ID_GAMEPERSON_END;
            //     break;
            // case InsideRoomType.OmahaPerson:
            //     start = InsideRoomManager.ID_OMAHAPERSON_START;
            //     end = InsideRoomManager.ID_OMAHAPERSON_END;
            //     break;
            default:
                game.Console.logError("根据类型获取房间列表异常！type：" + type);
                return null;
        }

        return list;
    }

    /**
     * 获取房间类型根据唯一ID
     */
    public static getRoomType(id: number);
    /**
     * 获取房间类型根据roominfo
     */
    public static getRoomType(info: RoomInfo);
    public static getRoomType(data: any)
    {
        let id: number;
        if (typeof data == "number")
        {
            id = data;
        }
        else if (data instanceof RoomInfo)
        {
            id = data.roomId;
        }

        let roomDef = table.TexasRoomById[id];
        if (roomDef)
        {
            switch (roomDef.Type)
            {
                case PlayingFieldType.Primary:
                case PlayingFieldType.Middle:
                case PlayingFieldType.High:
                    return InsideRoomType.Game;
                case PlayingFieldType.OmahaPrimary:
                case PlayingFieldType.OmahaMiddle:
                case PlayingFieldType.OmahaHigh:
                    return InsideRoomType.Omaha;
                case PlayingFieldType.PlayFieldPersonal:
                    return InsideRoomType.GamePerson;
                case PlayingFieldType.OmahaPersonal:
                    return InsideRoomType.OmahaPerson;
                case PlayingFieldType.Mtt:
                case PlayingFieldType.Sng:
                    return InsideRoomType.Match;
                case PlayingFieldType.Guide:
                case PlayingFieldType.GuidePlayWay:
                    break;
                default:
                    game.Console.logError("获取房间类型异常data：" + data);
                    return InsideRoomType.None;
            }
        }
        // if (id >= InsideRoomManager.ID_GAME_START && id <= InsideRoomManager.ID_GAME_END)
        // {
        //     return InsideRoomType.Game;
        // }
        // else if (id >= InsideRoomManager.ID_HUNDREDWAR_START && id <= InsideRoomManager.ID_HUNDREDWAR_END)
        // {
        //     return InsideRoomType.HundredWar; //move todo 百人大战待定
        // }
        // else if (id >= InsideRoomManager.ID_MTT_START && id <= InsideRoomManager.ID_MTT_END)
        // {
        //     return InsideRoomType.Match;
        // }
        // else if (id >= InsideRoomManager.ID_OMAHA_START && id <= InsideRoomManager.ID_OMAHA_END)
        // {
        //     return InsideRoomType.Omaha;
        // }
        // else if (id >= InsideRoomManager.ID_GAMEPERSON_START && id <= InsideRoomManager.ID_GAMEPERSON_END)
        // {
        //     return InsideRoomType.GamePerson;
        // }
        // else if (id >= InsideRoomManager.ID_OMAHAPERSON_START && id <= InsideRoomManager.ID_OMAHAPERSON_END)
        // {
        //     return InsideRoomType.OmahaPerson;
        // }
        // else
        // {
        //     game.Console.logError("获取房间类型异常data：" + data);
        //     return InsideRoomType.None;
        // }
    }
}