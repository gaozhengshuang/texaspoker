/**
 * 牌局工具
 */
class GamblingUtil
{
	/**
	 * 卡牌数据转换 因为一开始定的数据结构，服务器存储数据库问题
	 */
	public static cardArr2CardInfoList(data: Array<any>, targetList: Array<CardInfo>)
	{
		if (data && targetList)
		{
			let cardInfo: CardInfo;
			for (let i: number = 0; i < data.length; i++)
			{
				if (i % 2 == 1)
				{
					for (cardInfo of targetList)
					{
						if (cardInfo.card[0] == data[i - 1] && cardInfo.card[1] == data[i])
						{
							AlertManager.showAlertByString("已存在相同的牌");
							qin.Console.logError("已存在相同的牌");
							continue; //容错 推送了相同的牌不添加
						}
					}
					cardInfo = new CardInfo([data[i - 1], data[i]]);
					targetList.push(cardInfo);
				}
			}
		}
	}
	/**
 	* 根据结算信息判断是否获胜
 	*/
	public static isWin(roleId: number): boolean
	{
		if (GamblingManager.roundOverInfo)
		{
			if (GamblingManager.roundOverInfo.potList && GamblingManager.roundOverInfo.potList.length > 0)
			{
				let getNum: number = 0;
				for (let potAwardInfo of GamblingManager.roundOverInfo.potList)
				{
					if (potAwardInfo.roleId && potAwardInfo.roleId.indexOf(roleId) != -1)
					{
						getNum += Math.floor(potAwardInfo.num / potAwardInfo.roleId.length);
					}
				}
				let pInfo: PlayerInfo = GamblingManager.getPlayerInfo(roleId);
				if (pInfo)
				{
					return getNum > pInfo.totalnum; //收益大于投入
				}
				qin.Console.log("获取是否赢牌失败,奖励的roleID列表为空！：" + roleId);
				return false;
			}
			else
			{
				qin.Console.log("获取是否赢牌失败,底池为空！roleId：" + roleId);
			}
		}
		else
		{
			qin.Console.log("获取是否赢牌失败，结算信息为空！roleId：" + roleId);
		}
	}
	/**
 	* 玩家是否已存在
 	*/
	public static isContainPlayer(roleId: number): boolean
	{
		return GamblingManager.getPlayerInfo(roleId) != null;
	}
	/**
	 * 获取与小盲位置差
	 */
	public static getOffsetPosBySbPos(targetPos: number): number
	{
		let sbPos: number = GamblingUtil.sBlindPos;
		let pos: number = 0;
		if (sbPos != -1)
		{
			if (targetPos >= sbPos)
			{
				pos = targetPos - sbPos;
			}
			else
			{
				pos = targetPos + (GamblingManager.maxSeats - sbPos);
			}
			return pos;
		}
		return pos;
	}
	/**
	 * 获取最先开始说话人的位置
	 */
	public static get earliestActionPos(): number
	{
		let sbPos: number = GamblingUtil.sBlindPos;
		let pos: number = 0;
		if (sbPos != -1)
		{
			let pInfo: PlayerInfo;
			let index: number = 1;
			let currentIndex: number = 0;
			if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && !GamblingManager.roomInfo.publicCard)
			{
				index = 3; //第一圈注从小盲的起的第二个说话位置开始
			}
			for (let i: number = 0; i < GamblingManager.maxSeats; i++)
			{
				pInfo = GamblingManager.getPlayerInfoByPos(GamblingPanelSetting.getNextIndex(sbPos, i));
				if (pInfo && pInfo.state != PlayerState.Fold && pInfo.state != PlayerState.WaitNext)
				{
					currentIndex++;
					if (currentIndex == index)
					{
						return pInfo.pos;
					}
				}
			}
		}
		return -1;
	}
	/**
	 * 小盲位
	 */
	public static get sBlindPos(): number
	{
		if (GamblingManager.roomInfo.playerList)
		{
			let len: number = GamblingManager.roomInfo.playerList.length;
			let pInfo: PlayerInfo;
			if (len == 2) //2个人
			{
				for (pInfo of GamblingManager.roomInfo.playerList)
				{
					if (pInfo.pos != GamblingManager.roomInfo.buttonPos)
					{
						return pInfo.pos;
					}
				}
			}
			else
			{
				GamblingManager.roomInfo.playerList.sort(GamblingUtil.sortPlayerListByPos);
				let posIndex: number;
				for (let i: number = 0; i < len; i++)
				{
					pInfo = GamblingManager.roomInfo.playerList[i];
					if (pInfo.pos == GamblingManager.roomInfo.buttonPos)
					{
						if (i + 1 > len - 1)
						{
							posIndex = i + 1 - len;
						}
						else
						{
							posIndex = i + 1;
						}
						// posIndex = GamblingPanelSetting.getNextIndex(i, 1, len - 1);
						break;
					}
				}
				if (posIndex >= 0 && posIndex <= GamblingManager.roomInfo.playerList.length)
				{
					return GamblingManager.roomInfo.playerList[posIndex].pos;
				}
			}
		}
		return -1;
	}
	/**
	 * 大盲位
	 */
	public static get bBlindPos(): number
	{
		if (GamblingManager.roomInfo.playerList)
		{
			let len: number = GamblingManager.roomInfo.playerList.length;
			let pInfo: PlayerInfo;
			if (len == 2) //2个人
			{
				return GamblingManager.roomInfo.buttonPos;
			}
			else
			{
				GamblingManager.roomInfo.playerList.sort(GamblingUtil.sortPlayerListByPos);
				let posIndex: number;
				for (let i: number = 0; i < len; i++)
				{
					pInfo = GamblingManager.roomInfo.playerList[i];
					if (pInfo.pos == GamblingManager.roomInfo.buttonPos)
					{
						if (i + 2 > len - 1)
						{
							posIndex = i + 2 - len;
						}
						else
						{
							posIndex = i + 2;
						}
						// posIndex = GamblingPanelSetting.getNextIndex(i, 2, len - 1);
						break;
					}
				}
				if (posIndex >= 0 && posIndex < GamblingManager.roomInfo.playerList.length)
				{
					return GamblingManager.roomInfo.playerList[posIndex].pos;
				}
			}
		}
		return -1;
	}
	/**
	 * 枪口位
	 */
	public static get utgPos(): number
	{
		let pos: number;
		let bbPos: number = GamblingUtil.bBlindPos;
		for (let i: number = 1; i <= GamblingPanelSetting.MaxPitIndex - 1; i++)
		{
			pos = GamblingPanelSetting.getNextIndex(bbPos, i); //查找大盲位置的后一位，如果有玩家存在，则该位置是枪口位
			if (GamblingManager.roomInfo && GamblingManager.roomInfo.playerList)
			{
				for (let info of GamblingManager.roomInfo.playerList)
				{
					if (info.pos == pos)
					{
						return info.pos;
					}
				}
			}
		}
		return -1;
	}
	/**
	 * 获取可以加注的最大值
	 */
	public static get maxRaiseChips(): number
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList && GamblingManager.self)
		{
			let maxBankRoll: number = GamblingUtil.maxBankRoll;
			if (maxBankRoll > GamblingManager.roomInfo.minRaiseNum)
			{
				// let offset: number = maxBankRoll - GamblingManager.roomInfo.minRaiseNum;
				// let bbNum: number = Math.ceil(offset / GamblingManager.roomInfo.bBlind);
				// let additional: number = bbNum * GamblingManager.roomInfo.bBlind;
				// additional += GamblingManager.roomInfo.minRaiseNum;
				return Math.min(maxBankRoll, GamblingManager.self.bankRoll + GamblingManager.self.num);
			}
			return GamblingManager.roomInfo.minRaiseNum;
		}
		return 0;
	}
	/**
	 * 是否在说话
	 */
	public static getIsOnAction(role: number | PlayerInfo): boolean
	{
		if (role instanceof PlayerInfo)
		{
			return GamblingManager.roomInfo.pos == role.pos && role.state != PlayerState.WaitNext;
		}
		else
		{
			let pInfo: PlayerInfo = GamblingManager.getPlayerInfo(role);
			if (pInfo && GamblingManager.roomInfo)
			{
				return pInfo.pos == GamblingManager.roomInfo.pos && pInfo.state != PlayerState.WaitNext;
			}
		}
		return false;
	}
	/**
 	* 获取需要跟注的数量
 	*/
	public static get callNum(): number
	{
		if (GamblingManager.self && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingUtil.isOnProcess(GamblingManager.self))
		{
			return GamblingManager.roomInfo.maxAnte - GamblingManager.self.num;
		}
		return 0;
	}
	/**
	 * 当前玩家身上最多的筹码量
	 */
	public static get maxBankRoll(): number
	{
		let maxBankRoll: number = 0;
		for (let pInfo of GamblingManager.roomInfo.playerList)
		{
			if (pInfo.roleId != UserManager.userInfo.roleId && pInfo.bankRoll + pInfo.num > maxBankRoll) 
			{
				maxBankRoll = pInfo.bankRoll + pInfo.num;
			}
		}
		return maxBankRoll;
	}
	/**
	 * 是否可以过牌
	 */
	public static get isCanCheck(): boolean
	{
		if (GamblingManager.self && GamblingManager.roomInfo)
		{
			if (GamblingUtil.isOnProcess(GamblingManager.self) && GamblingManager.self.num == GamblingManager.roomInfo.maxAnte)
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * 是否可以加注
	 */
	public static get isCanRaise(): boolean
	{
		if (GamblingManager.self && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingUtil.getIsOnAction(GamblingManager.self))
		{
			if (GamblingManager.self.bankRoll + GamblingManager.self.num > GamblingManager.roomInfo.maxAnte)
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * 是否需要allin 加注最小值
	 */
	public static get isNeedAllIn(): boolean
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo))
		{
			if (GamblingManager.roomInfo.definition.pattern == GamblingPattern.AllIn)
			{
				let maxBankRoll: number = GamblingUtil.maxBankRoll;
				if (GamblingManager.self && GamblingUtil.isOnProcess(GamblingManager.self))
				{
					if (maxBankRoll >= GamblingManager.self.bankRoll || GamblingManager.roomInfo.maxAnte <= GamblingManager.roomInfo.bBlind)
					{
						return true;
					}
					else
					{
						return false;
					}
				}
			}
			else
			{
				if (GamblingManager.self && GamblingUtil.isOnProcess(GamblingManager.self))
				{
					if (GamblingManager.self.bankRoll + GamblingManager.self.num <= GamblingManager.roomInfo.maxAnte)
					{
						return true;
					}
				}
			}
		}
		return false;
	}
	/**
 	* 是否还在玩牌 没有弃牌，非等待下一局
 	*/
	public static isOnProcess(role: number | PlayerInfo): boolean
	{
		let pInfo: PlayerInfo
		if (role instanceof PlayerInfo)
		{
			pInfo = role;
		}
		else
		{
			pInfo = GamblingManager.getPlayerInfo(role);
		}
		if (pInfo)
		{
			switch (pInfo.state)
			{
				case PlayerState.Check:
				case PlayerState.Call:
				case PlayerState.Raise:
				case PlayerState.Blind:
				case PlayerState.AllIn:
				case PlayerState.WaitAction:
					return true;
			}
			return GamblingUtil.getIsOnAction(pInfo);
		}
		return false;
	}
	/**
	 * 获取是否是房主
	 */
	public static getIsMaster(role: number | PlayerInfo): boolean
	{
		if (GamblingManager.roomInfo)
		{
			if (role instanceof PlayerInfo)
			{
				return role.roleId == GamblingManager.roomInfo.masterId;
			}
			else
			{
				return role == GamblingManager.roomInfo.masterId;
			}
		}
		return false;
	}
	/**
	 * 是否可以比牌
	 */
	public static get isCanThanCard(): boolean
	{
		if (GamblingManager.roundOverInfo && GamblingManager.roundOverInfo.handCardList)
		{
			for (let handCardInfo of GamblingManager.roundOverInfo.handCardList)
			{
				let pInfo: PlayerInfo = GamblingManager.getPlayerInfo(handCardInfo.roleId);
				if (GamblingUtil.isOnProcess(pInfo))
				{
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 是否可以操作
	 */
	public static get isCanOper(): boolean
	{
		if (GamblingManager.self)
		{
			switch (GamblingManager.self.state)
			{
				case PlayerState.AllIn:
				case PlayerState.Fold:
				case PlayerState.WaitNext:
					return false;
			}
			return true;
		}
		return false;
	}
	/**
	 * 是否是奥马哈
	*/
	public static get isOmaha(): boolean
	{
		return InfoUtil.checkAvailable(GamblingManager.roomInfo) && (GamblingManager.roomInfo.gamblingType == GamblingType.Omaha || GamblingManager.roomInfo.gamblingType == GamblingType.OmahaPersonal);
	}
	/**
	 * 是否是比赛房间
	 */
	public static get isMatch(): boolean
	{
		return InfoUtil.checkAvailable(GamblingManager.roomInfo) && (GamblingManager.roomInfo.gamblingType == GamblingType.Match);
	}
	/**
	 * 是否是锦标赛
	 */
	public static get isMtt(): boolean
	{
		return InfoUtil.checkAvailable(GamblingManager.roomInfo) &&
			InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) &&
			GamblingManager.matchRoomInfo.definition.type == MatchType.MTT;
	}
	/**
	 * 是否是淘汰赛
	 */
	public static get isSng(): boolean
	{
		return InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) &&
			GamblingManager.matchRoomInfo.definition.type == MatchType.SNG;
	}
	/**
	 * 是否是单桌
	 */
	public static isSingleTable(info: MatchRoomInfo): boolean
	{
		if (InfoUtil.checkAvailable(info))
		{
			let roomDef: RoomDefinition = RoomDefined.GetInstance().getDefinition(info.definition.roomId);
			if (roomDef && roomDef.seat && Math.ceil(info.definition.bNum / roomDef.seat) == 1)
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * 客户端获取自己是否已经被淘汰
	 */
	public static get isSelfMatchOut(): boolean
	{
		if (GamblingUtil.isMatch && GamblingManager.matchRoomInfo && GamblingManager.self && GamblingManager.roomInfo)
		{
			if (GamblingManager.self.bankRoll <= 0)
			{
				if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Rebuy) == false && GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Addon) == false)
				{
					return true;
				}
			}
			return false;
		}
		return false;
	}
	public static get gamblingPanelStateIndex(): GamblingPanelStateIndex
	{
		if (GamblingManager.roomInfo)
		{
			switch (GamblingManager.roomInfo.gamblingType)
			{
				case GamblingType.Common:
				case GamblingType.PlayFieldPersonal:
					return GamblingPanelStateIndex.Normal;
				case GamblingType.Match:
					return GamblingUtil.getGamblingPanelStateIndex(GamblingManager.matchRoomInfo); //等待状态不做断线处理，所以如果房间类型是锦标赛则面板的状态是锦标赛状态
				case GamblingType.Guide:
					return GamblingPanelStateIndex.Guide;
				case GamblingType.GuidePlayWay:
					return GamblingPanelStateIndex.GuidePlayWay;
				case GamblingType.Omaha:
				case GamblingType.OmahaPersonal:
					return GamblingPanelStateIndex.Omaha;
			}
		}
		return GamblingUtil.getGamblingPanelStateIndex(GamblingManager.matchRoomInfo); //房间信息不存在，则是比赛赛等待状态
	}
	/**
	 * 是否超出了报名时间，某比赛
	 */
	public static isOutOfJoin(info: MatchRoomInfo): boolean
	{
		if (InfoUtil.checkAvailable(info))
		{
			let leftTime: number = info.startTime + info.definition.delaySign - TimeManager.GetServerUtcTimestamp();
			return leftTime <= 0;
		}
		return false;
	}
    /**
     * 根据锦标赛状态获取面板状态
     */
	public static getGamblingPanelStateIndex(info: MatchRoomInfo): GamblingPanelStateIndex
	{
		if (info)
		{
			return info.isWaitStart ? GamblingPanelStateIndex.MatchWait : GamblingPanelStateIndex.Match;
		}
		qin.Console.logError("切换到游戏场景状态有问题，比赛的房间信息为空！");
		return GamblingPanelStateIndex.Match;
	}
	/**
	 * 玩家列表根据位置升序排序
	 * @param a 
	 * @param b 
	 */
	public static sortPlayerListByPos(a: PlayerInfo, b: PlayerInfo): number
	{
		if (a.pos > b.pos)
		{
			return 1;
		}
		if (a.pos < b.pos)
		{
			return -1;
		}
		return 0;
	}
}