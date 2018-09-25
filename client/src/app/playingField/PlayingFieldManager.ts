/**
 * 游戏场管理
 */
class PlayingFieldManager
{
    /**
     * 房间信息列表
    */
    public static roomList: Array<PlayingFieldRoomInfo>;

    /**
	 * 发送房间信息获取请求
	 */
    public static reqRoomListInfo(type: number)
    {
        SocketManager.call(Command.C2GW_ReqTexasRoomList, { "type": type }, PlayingFieldManager.RoomListInfoResponse, null, this);
    }
    public static RoomListInfoResponse(result: game.SpRpcResult)
    {
        let data: msg.TexasRoomSimpleInfo[] = result.data;

        if (data)
        {
            game.ArrayUtil.Clear(PlayingFieldManager.roomList);
            if (!PlayingFieldManager.roomList)
            {
                PlayingFieldManager.roomList = new Array<PlayingFieldRoomInfo>();
            }
            for (let roomInfo of data)
            {
                let info: PlayingFieldRoomInfo = new PlayingFieldRoomInfo();
                info.copyValueFrom(roomInfo);
                PlayingFieldManager.roomList.push(info);
            }
        }
        PlayingFieldManager.onGetRoomListEvent.dispatch();
    }
    /**
     * 发送创建私人房请求
    */
    public static reqCreatePersonalRoom(roomId: number, pwd: string, ante: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            if (result.data && result.data["id"] > 0)
            {
                UIManager.closePanel(UIModuleName.CreateRoomPwdPanel);
                UIManager.closePanel(UIModuleName.KeyBoardPanel);
                GamblingManager.reqEnterRoom(result.data["id"], pwd, true);
            }
        };
        if (pwd)
        {
            SocketManager.call(Command.Req_CreatePersonalRoom_3610, { roomId: roomId, pwd: pwd, ante: ante }, callback, null, this);
        } else
        {
            SocketManager.call(Command.Req_CreatePersonalRoom_3610, { roomId: roomId, ante: ante }, callback, null, this);
        }
    }

    public static roomIdAddZero(id: number): string
    {
        if (id)
        {
            return game.StringUtil.beforeZeroFill(id, 5);
        }
        return '';
    }

    /**
    * 返回场次名称
    */
    public static getPatternName(pattern: PlayingFieldType)
    {
        let name: string;
        switch (pattern)
        {
            case PlayingFieldType.Primary:
                name = "初级场";
                break;
            case PlayingFieldType.Middle:
                name = "中级场";
                break;
            case PlayingFieldType.High:
                name = "高级场";
                break;
            case PlayingFieldType.OmahaPrimary:
                name = "奥马哈初级场";
                break;
            case PlayingFieldType.OmahaMiddle:
                name = "奥马哈中级场";
                break;
            case PlayingFieldType.OmahaHigh:
                name = "奥马哈高级场";
                break;
            case PlayingFieldType.PlayFieldPersonal:
                name = "私人房";
                break;
            case PlayingFieldType.OmahaPersonal:
                name = "奥马哈私人房"
                break;
        }
        return name;
    }

    /**
    * 判断房间是否为游戏场
    */
    public static isPatternRoom(roomFieldType: PlayingFieldType)
    {
        switch (roomFieldType)
        {
            case PlayingFieldType.Primary:
            case PlayingFieldType.Middle:
            case PlayingFieldType.High:
                return true;
            default:
                return false;
        }
    }

    /**
	 * 请求房间列表事件
	 */
    public static onGetRoomListEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 直接关闭键盘事件
    */
    public static onCloseKeyboardEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 键盘关闭事件广播
    */
    public static onKeyBoardCloseEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}