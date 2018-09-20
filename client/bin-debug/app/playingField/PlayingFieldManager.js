var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏场管理
 */
var PlayingFieldManager = (function () {
    function PlayingFieldManager() {
    }
    /**
     * 发送房间信息获取请求
     */
    PlayingFieldManager.reqRoomListInfo = function (type) {
        SocketManager.call(Command.Req_RoomInfo_3002, { "type": type }, PlayingFieldManager.RoomListInfoResponse, null, this);
    };
    PlayingFieldManager.RoomListInfoResponse = function (result) {
        if (result.data && result.data["roomList"]) {
            qin.ArrayUtil.Clear(PlayingFieldManager.roomList);
            if (!PlayingFieldManager.roomList) {
                PlayingFieldManager.roomList = new Array();
            }
            for (var _i = 0, _a = result.data["roomList"]; _i < _a.length; _i++) {
                var roomInfo = _a[_i];
                var info = new PlayingFieldRoomInfo();
                info.copyValueFrom(roomInfo);
                PlayingFieldManager.roomList.push(info);
            }
        }
        PlayingFieldManager.onGetRoomListEvent.dispatch();
    };
    /**
     * 发送创建私人房请求
    */
    PlayingFieldManager.reqCreatePersonalRoom = function (roomId, pwd, ante) {
        var callback = function (result) {
            if (result.data && result.data["id"] > 0) {
                UIManager.closePanel(UIModuleName.CreateRoomPwdPanel);
                UIManager.closePanel(UIModuleName.KeyBoardPanel);
                GamblingManager.reqEnterRoom(result.data["id"], pwd, true);
            }
        };
        if (pwd) {
            SocketManager.call(Command.Req_CreatePersonalRoom_3610, { roomId: roomId, pwd: pwd, ante: ante }, callback, null, this);
        }
        else {
            SocketManager.call(Command.Req_CreatePersonalRoom_3610, { roomId: roomId, ante: ante }, callback, null, this);
        }
    };
    PlayingFieldManager.roomIdAddZero = function (id) {
        if (id) {
            return qin.StringUtil.beforeZeroFill(id, 5);
        }
        return '';
    };
    /**
    * 返回场次名称
    */
    PlayingFieldManager.getPatternName = function (pattern) {
        var name;
        switch (pattern) {
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
                name = "奥马哈私人房";
                break;
        }
        return name;
    };
    /**
    * 判断房间是否为游戏场
    */
    PlayingFieldManager.isPatternRoom = function (roomFieldType) {
        switch (roomFieldType) {
            case PlayingFieldType.Primary:
            case PlayingFieldType.Middle:
            case PlayingFieldType.High:
                return true;
            default:
                return false;
        }
    };
    /**
     * 请求房间列表事件
     */
    PlayingFieldManager.onGetRoomListEvent = new qin.DelegateDispatcher();
    /**
     * 直接关闭键盘事件
    */
    PlayingFieldManager.onCloseKeyboardEvent = new qin.DelegateDispatcher();
    /**
     * 键盘关闭事件广播
    */
    PlayingFieldManager.onKeyBoardCloseEvent = new qin.DelegateDispatcher();
    return PlayingFieldManager;
}());
__reflect(PlayingFieldManager.prototype, "PlayingFieldManager");
//# sourceMappingURL=PlayingFieldManager.js.map