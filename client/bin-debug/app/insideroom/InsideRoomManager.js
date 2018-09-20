var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 自己在里面的房间管理器
 */
var InsideRoomManager = (function () {
    function InsideRoomManager() {
    }
    InsideRoomManager.initialize = function (result) {
        InsideRoomManager.list.length = 0;
        InsideRoomManager.lastId = undefined;
        if (result.data) {
            InsideRoomManager.lastId = result.data.lastId;
            if (result.data.roomList) {
                for (var _i = 0, _a = result.data.roomList; _i < _a.length; _i++) {
                    var roomInfo = _a[_i];
                    InsideRoomManager.list.push(new InsideRoomInfo(roomInfo));
                }
            }
        }
    };
    Object.defineProperty(InsideRoomManager, "lastInsideRoomType", {
        /**
         * 最后所在房间类型
         */
        get: function () {
            if (InsideRoomManager.lastId != undefined) {
                return InsideRoomManager.getRoomType(InsideRoomManager.lastId);
            }
            return InsideRoomType.None;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 根据类型获取类型的房间列表
     */
    InsideRoomManager.getInfoListByType = function (type) {
        var start;
        var end;
        switch (type) {
            case InsideRoomType.Game:
                start = InsideRoomManager.ID_GAME_START;
                end = InsideRoomManager.ID_GAME_END;
                break;
            case InsideRoomType.HundredWar:
                start = InsideRoomManager.ID_HUNDREDWAR_START;
                end = InsideRoomManager.ID_HUNDREDWAR_END;
                break;
            case InsideRoomType.Match:
                start = InsideRoomManager.ID_MTT_START;
                end = InsideRoomManager.ID_MTT_END;
                break;
            case InsideRoomType.Omaha:
                start = InsideRoomManager.ID_OMAHA_START;
                end = InsideRoomManager.ID_OMAHA_END;
                break;
            case InsideRoomType.GamePerson:
                start = InsideRoomManager.ID_GAMEPERSON_START;
                end = InsideRoomManager.ID_GAMEPERSON_END;
                break;
            case InsideRoomType.OmahaPerson:
                start = InsideRoomManager.ID_OMAHAPERSON_START;
                end = InsideRoomManager.ID_OMAHAPERSON_END;
                break;
            default:
                qin.Console.logError("根据类型获取房间列表异常！type：" + type);
                return null;
        }
        var list = new Array();
        var info;
        for (var i = 0; i < InsideRoomManager.list.length; i++) {
            info = InsideRoomManager.list[i];
            if (info.id >= start && info.id <= end) {
                list.push(info);
            }
        }
        return list;
    };
    InsideRoomManager.getRoomType = function (data) {
        var id;
        if (typeof data == "number") {
            id = data;
        }
        else if (data instanceof RoomInfo) {
            id = data.id;
        }
        if (id >= InsideRoomManager.ID_GAME_START && id <= InsideRoomManager.ID_GAME_END) {
            return InsideRoomType.Game;
        }
        else if (id >= InsideRoomManager.ID_HUNDREDWAR_START && id <= InsideRoomManager.ID_HUNDREDWAR_END) {
            return InsideRoomType.HundredWar;
        }
        else if (id >= InsideRoomManager.ID_MTT_START && id <= InsideRoomManager.ID_MTT_END) {
            return InsideRoomType.Match;
        }
        else if (id >= InsideRoomManager.ID_OMAHA_START && id <= InsideRoomManager.ID_OMAHA_END) {
            return InsideRoomType.Omaha;
        }
        else if (id >= InsideRoomManager.ID_GAMEPERSON_START && id <= InsideRoomManager.ID_GAMEPERSON_END) {
            return InsideRoomType.GamePerson;
        }
        else if (id >= InsideRoomManager.ID_OMAHAPERSON_START && id <= InsideRoomManager.ID_OMAHAPERSON_END) {
            return InsideRoomType.OmahaPerson;
        }
        else {
            qin.Console.logError("获取房间类型异常data：" + data);
            return InsideRoomType.None;
        }
    };
    /**
     * 房间信息列表
     */
    InsideRoomManager.list = new Array();
    /**
     * 游戏场房间的起始ID
     */
    InsideRoomManager.ID_GAME_START = 100000;
    /**
     * 游戏场房间的结束ID
     */
    InsideRoomManager.ID_GAME_END = 200000;
    /**
     * 百人大战房间的起始ID
     */
    InsideRoomManager.ID_HUNDREDWAR_START = 400000;
    /**
     * 百人大战房间的结束ID
     */
    InsideRoomManager.ID_HUNDREDWAR_END = 499999;
    /**
     * 锦标赛的房间起始ID
     */
    InsideRoomManager.ID_MTT_START = 500000;
    /**
     * 锦标赛的房间结束ID
     */
    InsideRoomManager.ID_MTT_END = 599999;
    /**
     * 奥马哈房间的起始ID
     */
    InsideRoomManager.ID_OMAHA_START = 600000;
    /**
     * 奥马哈房间结束ID
     */
    InsideRoomManager.ID_OMAHA_END = Number.MAX_VALUE;
    /**
     * 游戏场私人房起始ID
     */
    InsideRoomManager.ID_GAMEPERSON_START = 10000;
    /**
     * 游戏场私人房结束ID
     */
    InsideRoomManager.ID_GAMEPERSON_END = 19999;
    /**
     * 奥马哈私人房起始ID
     */
    InsideRoomManager.ID_OMAHAPERSON_START = 20000;
    /**
     * 奥马哈私人房结束ID
     */
    InsideRoomManager.ID_OMAHAPERSON_END = 29999;
    return InsideRoomManager;
}());
__reflect(InsideRoomManager.prototype, "InsideRoomManager");
//# sourceMappingURL=InsideRoomManager.js.map