/**
 * 牌的排序
 */
class SortUtil
{
	public static sortCardById(card1: IBaseDefintion, card2: IBaseDefintion): number
	{
		if (card1.Id > card2.Id)
		{
			return 1;
		}
		if (card1.Id < card2.Id)
		{
			return -1;
		}
		return 0;
	}
	public static sortY(a: egret.DisplayObjectContainer, b: egret.DisplayObjectContainer): number
	{
		if (a.y > b.y)
		{
			return 1;
		}
		if (a.y < b.y)
		{
			return -1;
		}
		return 0;
	}
	public static downSort(a: number, b: number)
	{
		if (a > b)
		{
			return -1;
		}
		if (a < b)
		{
			return 1;
		}
		return 0;
	}
	/**
	 * 按照盲注升序排序(买入适用)
	*/
	public static blindUpSort(a: PlayingFieldRoomInfo, b: PlayingFieldRoomInfo)
	{
		if (a.definition.SBuyin > b.definition.SBuyin)
		{
			return 1;
		}
		if (a.definition.SBuyin < b.definition.SBuyin)
		{
			return -1;
		}
		if (a.definition.SBuyin == b.definition.SBuyin)
		{
			if (a.player > b.player)
			{
				return 1;
			}
			if (a.player < b.player)
			{
				return -1;
			}
			if (a.player == b.player)
			{
				if (a.id > b.id)
				{
					return 1;
				}
				if (a.id < b.id)
				{
					return -1;
				}
				return 0;
			}
		}
	}
	/**
	 * 按照盲注降序排序(买入适用)
	*/
	public static blindDownSort(a: PlayingFieldRoomInfo, b: PlayingFieldRoomInfo)
	{
		if (a.definition.SBuyin > b.definition.SBuyin)
		{
			return -1;
		}
		if (a.definition.SBuyin < b.definition.SBuyin)
		{
			return 1;
		}
		if (a.definition.SBuyin == b.definition.SBuyin)
		{
			if (a.player > b.player)
			{
				return -1;
			}
			if (a.player < b.player)
			{
				return 1;
			}
			if (a.player == b.player)
			{
				if (a.id > b.id)
				{
					return -1;
				}
				if (a.id < b.id)
				{
					return 1;
				}
				return 0;
			}
		}
	}
	/**
	 * 按照房间id升序排序
	*/
	public static roomIdUpSort(a: PlayingFieldRoomInfo, b: PlayingFieldRoomInfo)
	{
		if (a.id > b.id)
		{
			return 1;
		}
		if (a.id < b.id)
		{
			return -1;
		}
		return 0;
	}
	/**
	 * 按照房间id降序排序
	*/
	public static roomIdDownSort(a: PlayingFieldRoomInfo, b: PlayingFieldRoomInfo)
	{
		if (a.id > b.id)
		{
			return -1;
		}
		if (a.id < b.id)
		{
			return 1;
		}
		return 0;
	}
	/**
	 * 按照在玩人数升序排序
	*/
	public static roomPlayNumUpSort(a: PlayingFieldRoomInfo, b: PlayingFieldRoomInfo)
	{
		if (a.player > b.player)
		{
			return 1;
		}
		if (a.player < b.player)
		{
			return -1;
		}
		if (a.player == b.player)
		{
			if (a.id > b.id)
			{
				return 1;
			}
			if (a.id < b.id)
			{
				return -1;
			}
			return 0;
		}
	}
	/**
	 * 按照在玩人数降序排序
	*/
	public static roomPlayNumDownSort(a: PlayingFieldRoomInfo, b: PlayingFieldRoomInfo)
	{
		if (a.player > b.player)
		{
			return -1;
		}
		if (a.player < b.player)
		{
			return 1;
		}
		if (a.player == b.player)
		{
			if (a.id > b.id)
			{
				return -1;
			}
			if (a.id < b.id)
			{
				return 1;
			}
			return 0;
		}
		return 0;
	}
	/**
	 * 任务列表排序
	 */
	public static showAchieveListSort(a: AchievementInfo, b: AchievementInfo)
	{
		if (a.isComplete == true && b.isComplete == false)
		{
			return -1;
		}
		if (a.isComplete == false && b.isComplete == true)
		{
			return 1;
		}
		if (a.isComplete == b.isComplete)
		{
			if (a.id > b.id)
			{
				return 1;
			}
			if (a.id > b.id)
			{
				return -1;
			}
			if (a.id == b.id)
			{
				return 0;
			}
		}
	}
	/**
	 * 赛事时间排序
	*/
	public static matchStartTimeSort(a: MatchRoomInfo, b: MatchRoomInfo)
	{
		if (a.startTime > b.startTime)
		{
			return 1;
		}
		if (a.startTime < b.startTime)
		{
			return -1;
		}
		return 0;
	}
	/**
     * 根据好友在线离线和vip等级排序
    */
	public static friendSort(a: FriendInfo, b: FriendInfo)
	{
		if (!a.offlineTime && b.offlineTime)   //a在线 b不在线
		{
			return -1;
		}
		if (a.offlineTime && !b.offlineTime)  //a不在线 b在线
		{
			return 1;
		}
		if ((a.offlineTime && b.offlineTime) || (!a.offlineTime && !b.offlineTime))
		{
			if (a.vipLevel > b.vipLevel)
			{
				return -1;
			}
			if (a.vipLevel < b.vipLevel)
			{
				return 1;
			}
			return 0;
		}
	}
	/**
	 * 邀请好友排序
	 */
	public static inviteFriendSort(a: InviteInfo, b: InviteInfo)
	{
		return SortUtil.friendSort(a.friendInfo, b.friendInfo);
	}
	/**
	 * 手牌竞猜开奖信息按时间降序排序
	*/
	public static guessResultTimeSort(a: GuessResultInfo, b: GuessResultInfo)
	{
		if (a.time < b.time)
		{
			return 1;
		}
		if (a.time > b.time)
		{
			return -1;
		}
		return 0;
	}
	/**
	 * 门票按id升序排序
	*/
	public static TicketIdSort(a: ItemInfo, b: ItemInfo)
	{
		if (a.id < b.id)
		{
			return -1;
		}
		if (a.id > b.id)
		{
			return 1;
		}
		return 0;
	}
	/**
	 * 邮箱根据发送日期降序排序
	*/
	public static MailDateSort(a: MailInfo, b: MailInfo)
	{
		if (a.IsGot == false && b.IsGot == true)
		{
			return -1;
		}
		if (a.IsGot == true && b.IsGot == false)
		{
			return 1;
		}
		if (a.IsGot == b.IsGot)
		{
			if (a.Date < b.Date)
			{
				return 1;
			}
			if (a.Date > b.Date)
			{
				return -1;
			}
			return 0;
		}
	}
	/**
	 * 锦标赛最近赛况根据时间降序排序
	*/
	public static MTTOutsInfoTimeSort(a: OutsInfo, b: OutsInfo)
	{
		if (a.time < b.time)
		{
			return 1;
		}
		if (a.time > b.time)
		{
			return -1;
		}
		return 0;
	}
	/**
	 * 百人大战玩家信息排序（金币降序,ID升序）
	 */
	public static HundredWarNoSeatSort(a: SimpleUserInfo, b: SimpleUserInfo)
	{
		if (a.gold < b.gold)
		{
			return 1;
		}
		if (a.gold > b.gold)
		{
			return -1;
		}
		if (a.gold == b.gold)
		{
			if (a.roleId < b.roleId)
			{
				return -1;
			}
			if (a.roleId > b.roleId)
			{
				return 1;
			}
			if (a.roleId == b.roleId)
			{
				return 0;
			}
		}
	}
	/**
	 * 百人大战按照房间id升序排序
	*/
	public static hundredWarRoomIdUpSort(a: HundredWarListInfo, b: HundredWarListInfo)
	{
		if (a.id > b.id)
		{
			return 1;
		}
		if (a.id < b.id)
		{
			return -1;
		}
		return 0;
	}
	/**
	 * 百人大战结算排名排序（金币降序,ID升序）
	 */
	public static hundredOverRankSort(a: any, b: any)
	{
		if (a.num < b.num)
		{
			return 1;
		}
		if (a.num > b.num)
		{
			return -1;
		}
		if (a.num == b.num)
		{
			if (a.roleId < b.roleId)
			{
				return -1;
			}
			if (a.roleId > b.roleId)
			{
				return 1;
			}
			if (a.roleId == b.roleId)
			{
				return 0;
			}
		}
	}
	/**
	 * 锦标赛已报名赛事排序
	*/
	public static JoinedMTTListSort(a: MatchRoomInfo, b: MatchRoomInfo)
	{
		if (a.outTime && !b.outTime)
		{
			return 1;
		}
		if (!a.outTime && b.outTime)
		{
			return -1;
		}
		if (a.outTime && b.outTime)
		{
			if (a.startTime > b.startTime)
			{
				return -1;
			}
			if (a.startTime < b.startTime)
			{
				return 1;
			}
			if (a.startTime == b.startTime)
			{
				return 0;
			}
		}
		if (!a.outTime && !b.outTime)
		{
			if (a.startTime < TimeManager.GetServerUtcTimestamp() && b.startTime > TimeManager.GetServerUtcTimestamp())
			{
				return -1;
			}
			if (a.startTime > TimeManager.GetServerUtcTimestamp() && b.startTime < TimeManager.GetServerUtcTimestamp())
			{
				return 1;
			}
			if ((a.startTime < TimeManager.GetServerUtcTimestamp() && b.startTime < TimeManager.GetServerUtcTimestamp()) || (a.startTime > TimeManager.GetServerUtcTimestamp() && b.startTime > TimeManager.GetServerUtcTimestamp()))
			{
				if (a.startTime > b.startTime)
				{
					return 1;
				}
				if (a.startTime < b.startTime)
				{
					return -1;
				}
				if (a.startTime == b.startTime)
				{
					return 0;
				}
			}
		}
	}
	/**
	 * 兑换记录时间排序（降序）
	 */
	public static AwardRecoedSort(a: AwardRecordInfo, b: AwardRecordInfo)
	{
		if (a.time > b.time)
		{
			return -1
		}
		if (a.time < b.time)
		{
			return 1;
		}
		return 0;
	}
	/**
	 * 大厅按钮优先级排序（升序）
	 */
	public static GameHallBtnSort(a: GameHallBtnListInfo, b: GameHallBtnListInfo)
	{
		if (a.priority > b.priority)
		{
			return 1
		}
		if (a.priority < b.priority)
		{
			return -1;
		}
		return 0;
	}
}