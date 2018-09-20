var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 牌的排序
 */
var SortUtil = (function () {
    function SortUtil() {
    }
    SortUtil.sortCardById = function (card1, card2) {
        if (card1.id > card2.id) {
            return 1;
        }
        if (card1.id < card2.id) {
            return -1;
        }
        return 0;
    };
    SortUtil.sortY = function (a, b) {
        if (a.y > b.y) {
            return 1;
        }
        if (a.y < b.y) {
            return -1;
        }
        return 0;
    };
    SortUtil.downSort = function (a, b) {
        if (a > b) {
            return -1;
        }
        if (a < b) {
            return 1;
        }
        return 0;
    };
    /**
     * 按照盲注升序排序(买入适用)
    */
    SortUtil.blindUpSort = function (a, b) {
        if (a.definition.sBuyin > b.definition.sBuyin) {
            return 1;
        }
        if (a.definition.sBuyin < b.definition.sBuyin) {
            return -1;
        }
        if (a.definition.sBuyin == b.definition.sBuyin) {
            if (a.player > b.player) {
                return 1;
            }
            if (a.player < b.player) {
                return -1;
            }
            if (a.player == b.player) {
                if (a.id > b.id) {
                    return 1;
                }
                if (a.id < b.id) {
                    return -1;
                }
                return 0;
            }
        }
    };
    /**
     * 按照盲注降序排序(买入适用)
    */
    SortUtil.blindDownSort = function (a, b) {
        if (a.definition.sBuyin > b.definition.sBuyin) {
            return -1;
        }
        if (a.definition.sBuyin < b.definition.sBuyin) {
            return 1;
        }
        if (a.definition.sBuyin == b.definition.sBuyin) {
            if (a.player > b.player) {
                return -1;
            }
            if (a.player < b.player) {
                return 1;
            }
            if (a.player == b.player) {
                if (a.id > b.id) {
                    return -1;
                }
                if (a.id < b.id) {
                    return 1;
                }
                return 0;
            }
        }
    };
    /**
     * 按照房间id升序排序
    */
    SortUtil.roomIdUpSort = function (a, b) {
        if (a.id > b.id) {
            return 1;
        }
        if (a.id < b.id) {
            return -1;
        }
        return 0;
    };
    /**
     * 按照房间id降序排序
    */
    SortUtil.roomIdDownSort = function (a, b) {
        if (a.id > b.id) {
            return -1;
        }
        if (a.id < b.id) {
            return 1;
        }
        return 0;
    };
    /**
     * 按照在玩人数升序排序
    */
    SortUtil.roomPlayNumUpSort = function (a, b) {
        if (a.player > b.player) {
            return 1;
        }
        if (a.player < b.player) {
            return -1;
        }
        if (a.player == b.player) {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            return 0;
        }
    };
    /**
     * 按照在玩人数降序排序
    */
    SortUtil.roomPlayNumDownSort = function (a, b) {
        if (a.player > b.player) {
            return -1;
        }
        if (a.player < b.player) {
            return 1;
        }
        if (a.player == b.player) {
            if (a.id > b.id) {
                return -1;
            }
            if (a.id < b.id) {
                return 1;
            }
            return 0;
        }
        return 0;
    };
    /**
     * 任务列表排序
     */
    SortUtil.showAchieveListSort = function (a, b) {
        if (a.isComplete == true && b.isComplete == false) {
            return -1;
        }
        if (a.isComplete == false && b.isComplete == true) {
            return 1;
        }
        if (a.isComplete == b.isComplete) {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id > b.id) {
                return -1;
            }
            if (a.id == b.id) {
                return 0;
            }
        }
    };
    /**
     * 赛事时间排序
    */
    SortUtil.matchStartTimeSort = function (a, b) {
        if (a.startTime > b.startTime) {
            return 1;
        }
        if (a.startTime < b.startTime) {
            return -1;
        }
        return 0;
    };
    /**
     * 根据好友在线离线和vip等级排序
    */
    SortUtil.friendSort = function (a, b) {
        if (!a.offlineTime && b.offlineTime) {
            return -1;
        }
        if (a.offlineTime && !b.offlineTime) {
            return 1;
        }
        if ((a.offlineTime && b.offlineTime) || (!a.offlineTime && !b.offlineTime)) {
            if (a.vipLevel > b.vipLevel) {
                return -1;
            }
            if (a.vipLevel < b.vipLevel) {
                return 1;
            }
            return 0;
        }
    };
    /**
     * 邀请好友排序
     */
    SortUtil.inviteFriendSort = function (a, b) {
        return SortUtil.friendSort(a.friendInfo, b.friendInfo);
    };
    /**
     * 手牌竞猜开奖信息按时间降序排序
    */
    SortUtil.guessResultTimeSort = function (a, b) {
        if (a.time < b.time) {
            return 1;
        }
        if (a.time > b.time) {
            return -1;
        }
        return 0;
    };
    /**
     * 门票按id升序排序
    */
    SortUtil.TicketIdSort = function (a, b) {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    };
    /**
     * 邮箱根据发送日期降序排序
    */
    SortUtil.MailDateSort = function (a, b) {
        if (a.IsGot == false && b.IsGot == true) {
            return -1;
        }
        if (a.IsGot == true && b.IsGot == false) {
            return 1;
        }
        if (a.IsGot == b.IsGot) {
            if (a.Date < b.Date) {
                return 1;
            }
            if (a.Date > b.Date) {
                return -1;
            }
            return 0;
        }
    };
    /**
     * 锦标赛最近赛况根据时间降序排序
    */
    SortUtil.MTTOutsInfoTimeSort = function (a, b) {
        if (a.time < b.time) {
            return 1;
        }
        if (a.time > b.time) {
            return -1;
        }
        return 0;
    };
    /**
     * 百人大战玩家信息排序（金币降序,ID升序）
     */
    SortUtil.HundredWarNoSeatSort = function (a, b) {
        if (a.gold < b.gold) {
            return 1;
        }
        if (a.gold > b.gold) {
            return -1;
        }
        if (a.gold == b.gold) {
            if (a.roleId < b.roleId) {
                return -1;
            }
            if (a.roleId > b.roleId) {
                return 1;
            }
            if (a.roleId == b.roleId) {
                return 0;
            }
        }
    };
    /**
     * 百人大战按照房间id升序排序
    */
    SortUtil.hundredWarRoomIdUpSort = function (a, b) {
        if (a.id > b.id) {
            return 1;
        }
        if (a.id < b.id) {
            return -1;
        }
        return 0;
    };
    /**
     * 百人大战结算排名排序（金币降序,ID升序）
     */
    SortUtil.hundredOverRankSort = function (a, b) {
        if (a.num < b.num) {
            return 1;
        }
        if (a.num > b.num) {
            return -1;
        }
        if (a.num == b.num) {
            if (a.roleId < b.roleId) {
                return -1;
            }
            if (a.roleId > b.roleId) {
                return 1;
            }
            if (a.roleId == b.roleId) {
                return 0;
            }
        }
    };
    /**
     * 锦标赛已报名赛事排序
    */
    SortUtil.JoinedMTTListSort = function (a, b) {
        if (a.outTime && !b.outTime) {
            return 1;
        }
        if (!a.outTime && b.outTime) {
            return -1;
        }
        if (a.outTime && b.outTime) {
            if (a.startTime > b.startTime) {
                return -1;
            }
            if (a.startTime < b.startTime) {
                return 1;
            }
            if (a.startTime == b.startTime) {
                return 0;
            }
        }
        if (!a.outTime && !b.outTime) {
            if (a.startTime < TimeManager.GetServerUtcTimestamp() && b.startTime > TimeManager.GetServerUtcTimestamp()) {
                return -1;
            }
            if (a.startTime > TimeManager.GetServerUtcTimestamp() && b.startTime < TimeManager.GetServerUtcTimestamp()) {
                return 1;
            }
            if ((a.startTime < TimeManager.GetServerUtcTimestamp() && b.startTime < TimeManager.GetServerUtcTimestamp()) || (a.startTime > TimeManager.GetServerUtcTimestamp() && b.startTime > TimeManager.GetServerUtcTimestamp())) {
                if (a.startTime > b.startTime) {
                    return 1;
                }
                if (a.startTime < b.startTime) {
                    return -1;
                }
                if (a.startTime == b.startTime) {
                    return 0;
                }
            }
        }
    };
    /**
     * 兑换记录时间排序（降序）
     */
    SortUtil.AwardRecoedSort = function (a, b) {
        if (a.time > b.time) {
            return -1;
        }
        if (a.time < b.time) {
            return 1;
        }
        return 0;
    };
    /**
     * 大厅按钮优先级排序（升序）
     */
    SortUtil.GameHallBtnSort = function (a, b) {
        if (a.priority > b.priority) {
            return 1;
        }
        if (a.priority < b.priority) {
            return -1;
        }
        return 0;
    };
    return SortUtil;
}());
__reflect(SortUtil.prototype, "SortUtil");
//# sourceMappingURL=SortUtil.js.map