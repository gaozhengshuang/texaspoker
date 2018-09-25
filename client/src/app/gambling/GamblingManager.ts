/**
 * 牌局管理器
 */
class GamblingManager
{
	/**
	 * 计时奖励管理
	*/
	public static timeAwardHandler = new TimeAwardHandler();
	/**
	 * 竞猜管理
	*/
	public static guessHandler = new GuessHandler();
	/**
	 * 锦标赛管理
	 */
	public static championshipHandler = new ChampionshipHandler();
	/**
	 * 上局回顾管理
	 */
	public static gamblingReviewHandler = new GamblingReviewHandler();
	/**
 	* 房间数据推送
 	*/
	// public static roomDataPushHandler: PushRoomDataHandler = new PushRoomDataHandler();
	/**
 	* 最大牌数
 	*/
	public static readonly MaxCardNum: number = 7;
	/**
	 * 公共牌最大数量
	 */
	public static readonly MaxBoardNum: number = 5;
	/**
	 * 奥马哈手牌数量
	 */
	public static readonly OmahaHandCardNum: number = 4;
	/**
	 * 大于10的显示图片
	 */
	public static readonly FlushSplitIndex: number = 10;
	/**
	 * 房间信息
	 */
	public static roomInfo: RoomInfo;

	private static _matchRoomInfo: MatchRoomInfo;
	/**
	 * 当前比赛信息
	 */
	public static get matchRoomInfo(): MatchRoomInfo
	{
		if (!GamblingManager._matchRoomInfo)
		{
			GamblingManager._matchRoomInfo = new MatchRoomInfo();
		}
		return GamblingManager._matchRoomInfo;
	}
	/**
	 * 自己的信息
	 */
	private static _self: PlayerInfo;
	/**
	 * 一局的结算信息
	 */
	public static roundOverInfo: RoundOverInfo;
	/**
	 * 是否过或弃
	 */
	public static isCheckOrFold: boolean = false;
	/**
	 * 是否跟任何
	 */
	public static isCallAny: boolean = false;
	/**
	 * 是否是快速游戏进入房间标记
	 */
	public static isQuicklyEnter: boolean = false;
	/**
	 * 最后跟注人的位置 弃用
	 */
	public static lastCallPos: number;
	private static _showPotChips: number = 0;
	/**
	 * 是否在座位上 请求下一局准备标记变量
	 */
	private static _isOnSeat: boolean = false;
	private static _isInitialize: boolean = false;
	/**
	 * 显示的底池筹码 客户端自己维护
	 */
	public static get showPotChips(): number
	{
		if (GamblingManager._showPotChips == undefined)
		{
			GamblingManager._showPotChips = GamblingManager.totalPotChips;
		}
		return GamblingManager._showPotChips;
	}
	/**
	 * 显示的底池筹码 客户端自己维护
	 */
	public static set showPotChips(value: number)
	{
		GamblingManager._showPotChips = value;
	}
	/**
	 * 是否在房间中
	 */
	public static get isInRoom(): boolean
	{
		return GamblingManager.roomInfo != null;
	}
	/**
	 * 是否在座位上
	 */
	public static get isInSeat(): boolean
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList)
		{
			for (let i: number = 0; i < GamblingManager.roomInfo.playerList.length; i++)
			{
				if (GamblingManager.roomInfo.playerList[i].roleId == UserManager.userInfo.id)
				{
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 获取当前房间的总底池
	 */
	public static get totalPotChips(): number
	{
		let tmpChips: number = 0;
		if (GamblingManager.roomInfo)
		{
			if (GamblingManager.roomInfo.potChips)
			{
				for (let chips of GamblingManager.roomInfo.potChips) //当前底池边池
				{
					tmpChips += chips;
				}
			}
			if (GamblingManager.roomInfo.playerList) //玩家已加注的总数量
			{
				for (let pInfo of GamblingManager.roomInfo.playerList)
				{
					if (pInfo.num > 0)
					{
						tmpChips += pInfo.num;
					}
				}
			}
			return tmpChips;
		}
		return 0;
	}
	public static resetByReLogin()
	{
		GamblingManager.reset();
		GamblingManager._isInitialize = false;
	}
	public static reset()
	{
		// GamblingManager.roomDataPushHandler.reset();
		GamblingManager.standClear();
		if (GamblingManager.roomInfo)
		{
			GamblingManager.roomInfo.publicCard = undefined;
		}
		GamblingManager.roomInfo = undefined;
		GamblingManager.roundOverInfo = undefined;
		GamblingManager.clearPlayerTotalNum();
		GamblingManager.lastCallPos = undefined;
		GamblingManager.clearMatchRoomInfo();
		GamblingManager.timeAwardHandler.isGetTimeAward = false;
		game.Tick.RemoveSecondsInvoke(GamblingManager.sngReadyCountDown, this);
	}
	public static clearMatchRoomInfo()
	{
		GamblingManager._matchRoomInfo = undefined;
	}
	/**
	 * 站起数据清理
	 */
	private static standClear()
	{
		GamblingManager._isOnSeat = false;
		GamblingManager._self = null;
		if (GamblingManager.roomInfo)
		{
			GamblingManager.roomInfo.handCard = undefined;
		}
		GamblingManager.oneLoopClear();
		GamblingManager.timeAwardHandler.stopCountDown();
	}
	/**
	 * 一轮圈注结束清理
	 */
	public static oneLoopClear()
	{
		GamblingManager.showPotChips = 0;
		if (GamblingManager.roomInfo)
		{
			GamblingManager.roomInfo.maxAnte = 0;
			// GamblingManager.roomInfo.minRaiseNum = 0;
		}
		GamblingManager.isCallAny = false;
		GamblingManager.isCheckOrFold = false;
		GamblingManager.clearPlayerNum();
	}
	/**
	 * 一局结束清理
	 */
	public static roundOverClear()
	{
		GamblingManager.showPotChips = 0;
		GamblingManager.roomInfo.maxAnte = 0;
		GamblingManager.roomInfo.minRaiseNum = 0;
		GamblingManager.roundOverInfo.handCardList = undefined;
		GamblingManager.roomInfo.handCard = undefined;
		GamblingManager.clearPlayerNum();
	}
	/**
	 * 清理玩家身上的筹码
	 */
	private static clearPlayerNum()
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList)
		{
			for (let pInfo of GamblingManager.roomInfo.playerList)
			{
				pInfo.num = 0; //一局结束清空玩家筹码
			}
		}
	}
	private static clearPlayerTotalNum()
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList)
		{
			for (let pInfo of GamblingManager.roomInfo.playerList)
			{
				pInfo.totalnum = 0; //一局结束清空玩家总筹码
			}
		}
	}
	/**
	 * 添加推送协议侦听
	 */
	private static addPushListener()
	{
		// GamblingManager.roomDataPushHandler.initialize();
		SocketManager.AddCommandListener(Command.NextRoundStart_Push_2107, GamblingManager.pushNextRoundStart, this);
		SocketManager.AddCommandListener(Command.BlindChange_Push_2100, GamblingManager.pushBlindChange, this);
		// SocketManager.AddCommandListener(Command.Push_PotChipsChange_2101, GamblingManager.pushPotChipsChange);
		SocketManager.AddCommandListener(Command.OneLoopOver_Push_2102, GamblingManager.pushOneLoopOver, this);
		SocketManager.AddCommandListener(Command.SitOrStand_Push_2103, GamblingManager.pushSitOrStand, this);
		SocketManager.AddCommandListener(Command.PlayerStateChange_Push_2104, GamblingManager.pushStateChange, this);
		SocketManager.AddCommandListener(Command.ActionPosChange_Push_2105, GamblingManager.pushActionPosChange, this);
		SocketManager.AddCommandListener(Command.OneRoundOver_Push_2106, GamblingManager.pushOneRoundOver, this);
		SocketManager.AddCommandListener(Command.HandCard_Push_2108, GamblingManager.pushHandCard, this);
		SocketManager.AddCommandListener(Command.ChipsChange_Push_2110, GamblingManager.pushChipsChange, this);
		SocketManager.AddCommandListener(Command.InTrusteeship_Push_2119, GamblingManager.pushInTrusteeship, this);
		SocketManager.AddCommandListener(Command.OutRoom_Push_2128, GamblingManager.pushExitRoom, this);
		SocketManager.AddCommandListener(Command.BrightCard_Push_2109, GamblingManager.pushImmediatelyBirhgtCard, this);
		GamblingManager.timeAwardHandler.addPushListener();

		SocketManager.OnReconnectSynchronize.addListener(GamblingManager.onReconnectHandler, this);
		// SocketManager.AddCommandListener(Command.Push_PlayerListStateChange_2113, GamblingManager.pushPlayerListStateChange);
	}
	/**
	 * 推送离开房间
	 */
	public static pushExitRoom(result: game.SpRpcResult)
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && result.data && GamblingManager.roomInfo.id == result.data["id"])
		{
			let type: GamblingType = GamblingType.Common;
			if (GamblingManager.roomInfo)
			{
				type = GamblingManager.roomInfo.gamblingType;
			}
			switch (GamblingManager.roomInfo.gamblingType)
			{
				case GamblingType.Match:
					if (GamblingManager.roomInfo.isOnWatch) 
					{
						GamblingManager.OnPushLeaveRoomEvent.dispatch({ type: type, isInMtt: false });
						// AlertManager.showAlert("", () =>
						// {
						// 	GamblingManager.leaveRoom();
						// })
					}
					break;
			}
		}
	}
	/**
	 * 请求进入房间
	 */
	public static reqEnterRoom(id: number = 0, password?: string, isQuicklyEnter?: boolean, isReconnect?: boolean)
	{
		// game.QinLog.log("gamlbingmanager进入房间：reqEnterRoom" + id);
		// GamblingManager.roomDataPushHandler.reset();
		let callback: Function = function (result: game.SpRpcResult)
		{
			SocketManager.RemoveCommandListener(Command.C2GW_ReqEnterRoom, callback, this);
			GamblingManager.isQuicklyEnter = isQuicklyEnter;
			GamblingManager.initialize(result, isReconnect);
			if (!GamblingManager._isInitialize)
			{
				GamblingManager._isInitialize = true;
				GamblingManager.addPushListener();
			}
		};
		SocketManager.AddCommandListener(Command.C2GW_ReqEnterRoom, callback, this);
		if (password != undefined && id > 0)
		{
			SocketManager.Send(Command.C2GW_ReqEnterRoom, msg.C2GW_ReqEnterRoom.encode({ userid: UserManager.userInfo.id, roomid: id, passwd: password }));
		}
		else if (id > 0)
		{
			SocketManager.Send(Command.C2GW_ReqEnterRoom, msg.C2GW_ReqEnterRoom.encode({ userid: UserManager.userInfo.id, roomid: id }));
		}
		else
		{
			SocketManager.Send(Command.C2GW_ReqEnterRoom, msg.C2GW_ReqEnterRoom.encode({ userid: UserManager.userInfo.id }));
		}
	}
	public static initialize(result: game.SpRpcResult, isReconnect?: boolean)
	{
		GamblingManager.reset();
		let data: msg.RS2C_RetEnterRoomInfo = result.data;
		if (data && data["id"] > 0)
		{
			GamblingManager.roomInfo = new RoomInfo();
			GamblingManager.roomInfo.data = result.data;
			GamblingManager.roomInfo.isTrusteeship = undefined;
			GamblingManager.roomInfo.isMatchOut = undefined;
			GamblingManager.roomInfo.isFlopCardOver = true;
			GamblingManager.championshipHandler.initializeRoomInfo(result);
			GamblingManager.roomInfo.handCard = new Array<CardInfo>();
			GamblingUtil.cardArr2CardInfoList(result.data["handcard"], GamblingManager.roomInfo.handCard);
			if (GamblingManager.roomInfo.handCard.length == 0)
			{
				GamblingManager.roomInfo.handCard = undefined;
			}

			GamblingManager.roomInfo.publicCard = new Array<CardInfo>();
			GamblingUtil.cardArr2CardInfoList(result.data["publiccard"], GamblingManager.roomInfo.publicCard);
			if (GamblingManager.roomInfo.publicCard.length == 0)
			{
				GamblingManager.roomInfo.publicCard = undefined;
			}

			if (GamblingManager.roomInfo.handCard && GamblingManager.roomInfo.handCard.length > 2)
			{
				game.Console.logError("手牌张数大于2" + GamblingManager.roomInfo.handCard.length);
			}
			if (GamblingManager.roomInfo.playerList && GamblingManager.roomInfo.playerList.length > 0)
			{
				for (let pInfo of GamblingManager.roomInfo.playerList)
				{
					if (pInfo.roleId == UserManager.userInfo.id)
					{
						GamblingManager._isOnSeat = true;
					}
					GamblingManager.reqGetPlayerUserInfo(pInfo);
				}
			}
			else
			{
				GamblingManager.getPlayerUserInfoOver();
			}
			//设置计时奖励数据	
			if (result.data.roomId)
			{
				let roomDef: table.ITexasRoomDefine = table.TexasRoomById[result.data.roomId];
				if (roomDef)
				{
					this.timeAwardHandler.reqGetTimeAwardInfo(roomDef.Type);
				}
			}
			GamblingManager.gamblingReviewHandler.isNewRound = true;
			// GamblingManager.roomDataPushHandler.isGetRoomData = true;
			// GamblingManager.roomDataPushHandler.setRoomData();
		}
		else
		{
			GamblingManager.getPlayerUserInfoOver();
		}
		GamblingManager.showPotChips = GamblingManager.totalPotChips;
		GamblingManager.guessHandler.onEnable();
		GamblingManager.OnGetRoomInfoEvent.dispatch(isReconnect);
	}
	/**
	 * 推送下一局开始
	 */
	public static pushNextRoundStart(result: game.SpRpcResult)
	{
		// GamblingManager.roomDataPushHandler.writeResult(Command.NextRoundStart_Push_2107, result);
		if (result.data && GamblingManager.roomInfo)
		{
			GamblingManager.roomInfo.publicCard = undefined;
			GamblingManager.roundOverInfo = undefined;
			GamblingManager.clearPlayerTotalNum();
			GamblingManager.roomInfo.isShowCard = false;
			GamblingManager.oneLoopClear();
			GamblingManager.roomInfo.copyValueFrom(result.data);
			GamblingManager.roomInfo.potChips = undefined;
			GamblingManager.roomInfo.startTime = TimeManager.GetServerUtcTimestamp();
			GamblingManager.roomInfo.isFlopCardOver = false;
			//重置初始筹码数
			if (GamblingManager.self)
			{
				GamblingManager.self.initbankRoll = GamblingManager.self.bankRoll;
				GamblingManager.roomInfo.isOnWatch = false;
			}
			else
			{
				GamblingManager.roomInfo.isOnWatch = true;
			}
			if (GamblingManager.roomInfo.gamblingType == GamblingType.Match && GamblingManager.roomInfo.blindLevel)
			{
				if (GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.definition)
				{
					let def: ChampionshipBlindDefinition = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(GamblingManager.roomInfo.blindLevel, GamblingManager.matchRoomInfo.definition.blindType);
					if (def && def.sBlind == GamblingManager.roomInfo.sBlind && def.bBlind == GamblingManager.roomInfo.bBlind)
					{
						GamblingManager.roomInfo.ante = def.preBet;
					}
				}
				GamblingManager.roomInfo.nowBlindLevel = GamblingManager.roomInfo.blindLevel;
			}
			GamblingManager.roomInfo.addbuy = 0;

			GamblingManager.guessHandler.resetBuyRB();
			if (GamblingManager.roomInfo.playerList) //一局开始将重构增购的玩家状态置为等待下一局 其他玩家状态不变 弃牌的弃牌跟注的跟注
			{
				for (let pInfo of GamblingManager.roomInfo.playerList)
				{
					if (pInfo.bankRoll <= 0)
					{
						pInfo.state = PlayerState.WaitNext;
					}
				}
			}
			GamblingManager.NextRoundStartEvent.dispatch();
		}
	}
	/**
	 * 推送盲注前注变化
	 */
	public static pushBlindChange(result: game.SpRpcResult)
	{
		// GamblingManager.roomDataPushHandler.writeResult(Command.BlindChange_Push_2100, result);
		if (result.data && GamblingManager.roomInfo)
		{
			let bLevel: number = GamblingManager.roomInfo.blindLevel;
			GamblingManager.roomInfo.copyValueFrom(result.data);
			let isAddLevel: boolean = false;
			if (bLevel < GamblingManager.roomInfo.blindLevel)
			{
				isAddLevel = true;
				GamblingManager.championshipHandler.setNextAddTime();
			}
			GamblingManager.BlindChangeEvent.dispatch({ isAddLevel: isAddLevel });
		}
	}
	private static pushPotChipsChange(result: game.SpRpcResult)
	{
		if (result.data && GamblingManager.roomInfo)
		{
			GamblingManager.roomInfo.copyValueFrom(result.data);
			GamblingManager.PotChipsChangeEvent.dispatch();
		}
	}
	/**
	 * 推送公共牌
	 */
	public static pushOneLoopOver(result: game.SpRpcResult)
	{
		// GamblingManager.roomDataPushHandler.writeResult(Command.OneLoopOver_Push_2102, result);
		if (result.data && GamblingManager.roomInfo)
		{
			// if (GamblingManager.roomInfo.playerList)
			// {
			// 	for (let pInfo of GamblingManager.roomInfo.playerList)
			// 	{
			// 		switch (pInfo.state)
			// 		{
			// 			case PlayerState.Action:
			// 				break;
			// 		}
			// 		pInfo.num = 0;
			// 	}
			// }
			if (!GamblingManager.roomInfo.publicCard)
			{
				// game.CopyUtil.supCopyList(GamblingManager.roomInfo, result.data, "cardList", CardInfo);
				GamblingManager.roomInfo.publicCard = new Array<CardInfo>();
			}
			GamblingUtil.cardArr2CardInfoList(result.data["card"], GamblingManager.roomInfo.publicCard);
			if (GamblingManager.roomInfo.publicCard.length == 0)
			{
				GamblingManager.roomInfo.publicCard = undefined;
			}
			let cardList: Array<CardInfo>;
			if (GamblingManager.roomInfo.handCard)
			{
				cardList = GamblingManager.roomInfo.handCard.concat();
			}
			let publicCardList: Array<CardInfo>;
			if (GamblingManager.roomInfo.publicCard)
			{
				publicCardList = GamblingManager.roomInfo.publicCard.concat();
			}
			GamblingManager.oneLoopClear();
			GamblingManager.roomInfo.minRaiseNum = GamblingManager.roomInfo.bBlind; //一轮押注圈结束 下注金额最低最1*大盲
			GamblingManager.roomInfo.potChips = result.data["potChips"];
			GamblingManager.roomInfo.maxAnte = 0;
			GamblingManager.OneLoopOverEvent.dispatch([cardList, publicCardList]);
		}
	}
	/**
	 * 推送玩家坐下或站起
	 */
	public static pushSitOrStand(result: game.SpRpcResult)
	{
		// GamblingManager.roomDataPushHandler.writeResult(Command.SitOrStand_Push_2103, result);
		if (result.data)
		{
			let state: number = result.data["state"];
			if (state == BuyInGameState.Sit)
			{
				let playerInfo: PlayerInfo = new PlayerInfo();
				playerInfo.roleId = result.data["roleId"];
				playerInfo.pos = result.data["pos"];
				playerInfo.bankRoll = result.data["bankRoll"];
				playerInfo.state = PlayerState.WaitNext; //刚坐下来 处于空状态

				GamblingManager.addPlayer(playerInfo);
				GamblingManager.SitOrStandEvent.dispatch({ pInfo: playerInfo, state: state });

				GamblingManager.reqGetPlayerUserInfo(playerInfo);
			}
			else if (state == BuyInGameState.Stand)
			{
				let roleId: number = result.data["roleId"];
				let playerInfo: PlayerInfo = GamblingManager.getPlayerInfo(roleId);

				if (playerInfo)
				{
					if (playerInfo.roleId == UserManager.userInfo.id) //站起需要清空自己的信息
					{
						GamblingManager.standClear();
					}
					GamblingManager.removePlayer(roleId);
					GamblingManager.SitOrStandEvent.dispatch({ pInfo: playerInfo, state: state });
				}
			}
		}
	}
	/**
	 * 推送玩家状态变更
	 */
	public static pushStateChange(result: game.SpRpcResult)
	{
		// GamblingManager.roomDataPushHandler.writeResult(Command.PlayerStateChange_Push_2104, result);
		if (result.data)
		{
			let roleId: number = result.data["roleId"];
			if (roleId == UserManager.userInfo.id)
			{
				GamblingManager.isCallAny = false;
				GamblingManager.isCheckOrFold = false;
			}
			let state: PlayerState = <PlayerState>result.data["state"];
			let num: number = result.data["num"];
			if (num == undefined)
			{
				num = 0;
			}

			let pInfo: PlayerInfo = GamblingManager.getPlayerInfo(roleId);
			if (GamblingManager.showPotChips == 0)
			{
				GamblingManager.showPotChips = GamblingManager.totalPotChips;
			}
			if (pInfo && pInfo.totalnum == undefined)
			{
				pInfo.totalnum = 0;
			}
			if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && num > 0)
			{
				if (pInfo && pInfo.num > 0)
				{
					GamblingManager.showPotChips += num - pInfo.num;
					pInfo.totalnum += num - pInfo.num;
				}
				else
				{
					GamblingManager.showPotChips += num;
					pInfo.totalnum += num;
				}
			}

			if ((state == PlayerState.Check || state == PlayerState.AllIn || state == PlayerState.Blind || state == PlayerState.Raise) && InfoUtil.checkAvailable(GamblingManager.roomInfo) && num > 0)
			{
				if (num > GamblingManager.roomInfo.maxAnte)
				{
					if (num < GamblingManager.roomInfo.bBlind)
					{
						GamblingManager.roomInfo.maxAnte = GamblingManager.roomInfo.bBlind; //处理跟注不足一个大盲的问题
					}
					else
					{
						GamblingManager.roomInfo.maxAnte = num;
					}
				}
			}
			if (pInfo)
			{
				pInfo.state = state;
				pInfo.num = num;

				if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && pInfo.state == PlayerState.Raise || pInfo.state == PlayerState.AllIn)
				{
					let lastMaxNum: number = GamblingManager.findMaxPlayerNum(pInfo.roleId);
					let tmpNum: number = pInfo.num - lastMaxNum;

					if (lastMaxNum == 0 || lastMaxNum == GamblingManager.roomInfo.ante) //第一次下注
					{
						GamblingManager.roomInfo.minRaiseNum = GamblingManager.roomInfo.bBlind * 2;
						GamblingManager.roomInfo.minRaiseNum = Math.max(GamblingManager.roomInfo.minRaiseNum, tmpNum * 2);
					}
					else if (tmpNum > 0) //<=0为无效的情况 相当于 平跟
					{
						if (tmpNum < GamblingManager.roomInfo.bBlind)
						{
							GamblingManager.roomInfo.minRaiseNum = pInfo.num + GamblingManager.roomInfo.bBlind;
						}
						else
						{
							GamblingManager.roomInfo.minRaiseNum = pInfo.num + tmpNum; //最小加注额度
						}
					}
				}
				if (state == PlayerState.Call || state == PlayerState.AllIn)
				{
					GamblingManager.lastCallPos = pInfo.pos;
				}
				if (state == PlayerState.Check || state == PlayerState.Fold || state == PlayerState.Raise)
				{
					GamblingManager.lastCallPos = undefined;
				}
				GamblingManager.PlayerStateChangeEvent.dispatch({ roleId: roleId, state: state, num: num });
			}
		}
	}
	/**
	 * 查找状态参数最大的数量
	 */
	public static findMaxPlayerNum(excludeRoleId: number): number
	{
		let num: number = 0;
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList)
		{
			for (let pInfo of GamblingManager.roomInfo.playerList)
			{
				if (pInfo.roleId != excludeRoleId && pInfo.num > num)
				{
					num = pInfo.num;
				}
			}
		}
		return num;
	}
	/**
	 * 推送说话位置变更
	 */
	public static pushActionPosChange(result: game.SpRpcResult)
	{
		// GamblingManager.roomDataPushHandler.writeResult(Command.ActionPosChange_Push_2105, result);
		if (result.data && GamblingManager.roomInfo)
		{
			GamblingManager.roomInfo.copyValueFrom(result.data);
			GamblingManager.ActionPosChangeEvent.dispatch(GamblingManager.roomInfo.handCard);
		}
	}
	/**
	 * 推送一局结束
	 */
	public static pushOneRoundOver(result: game.SpRpcResult)
	{
		// GamblingManager.roomDataPushHandler.writeResult(Command.OneRoundOver_Push_2106, result);
		if (result.data)
		{
			if (!GamblingManager.roundOverInfo)
			{
				GamblingManager.roundOverInfo = new RoundOverInfo();
			}
			let handCard: Array<CardInfo>;
			if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.handCard)
			{
				handCard = GamblingManager.roomInfo.handCard.concat();
			}
			GamblingManager.roundOverClear();
			GamblingManager.roundOverInfo.copyValueFrom(result.data);
			if (GamblingManager.roomInfo)
			{
				GamblingManager.roomInfo.endTime = TimeManager.GetServerUtcTimestamp();
			}
			//重置初始筹码数
			let temporaryRoll: number = undefined;
			if (GamblingManager.self)
			{
				temporaryRoll = GamblingManager.self.initbankRoll;
				GamblingManager.self.initbankRoll = 0;
			}
			GamblingManager.RoundOverEvent.dispatch({ initbankRoll: temporaryRoll, handCard: handCard });
			GamblingManager.gamblingReviewHandler.isNewRound = true;
			// GamblingManager.roomInfo.potChips = undefined;
		}
	}
	/**
	 * 推送玩家手牌
	 */
	public static pushHandCard(result: game.SpRpcResult)
	{
		// GamblingManager.roomDataPushHandler.writeResult(Command.HandCard_Push_2108, result);
		if (result.data && GamblingManager.self)
		{
			if (!GamblingManager.roomInfo.handCard)
			{
				GamblingManager.roomInfo.handCard = new Array<CardInfo>();
			}
			GamblingManager.roomInfo.handCard.length = 0;
			let cardInfo: CardInfo;
			if (result.data["card"])
			{
				GamblingUtil.cardArr2CardInfoList(result.data["card"], GamblingManager.roomInfo.handCard);
				if (GamblingManager.roomInfo.handCard.length == 0)
				{
					GamblingManager.roomInfo.handCard = undefined;
				}
				if (GamblingManager.roomInfo.handCard && GamblingManager.roomInfo.handCard.length > 2)
				{
					game.Console.logError("手牌张数大于2" + GamblingManager.roomInfo.handCard.length);
				}
			}
			let cardList: Array<CardInfo>;
			if (GamblingManager.roomInfo.handCard)
			{
				cardList = GamblingManager.roomInfo.handCard.concat();
			}
			GamblingManager.guessHandler.setResultListInfo();
			GamblingManager.HandCardComeEvent.dispatch(cardList);
		}
	}
	/**
	 * 推送筹码变更
	 */
	public static pushChipsChange(result: game.SpRpcResult)
	{
		// GamblingManager.roomDataPushHandler.writeResult(Command.ChipsChange_Push_2110, result);
		if (result.data)
		{
			let roleId: number = result.data["roleId"];
			let br: number = result.data["bankRoll"];
			let pInfo: PlayerInfo = GamblingManager.getPlayerInfo(roleId);
			if (pInfo)
			{
				pInfo.bankRoll = br;
				GamblingManager.ChipsChangeEvent.dispatch(pInfo);
			}
		}
	}
	/**
	 * 推送玩家列表状态变更
	 */
	private static pushPlayerListStateChange(result: game.SpRpcResult)
	{
		if (result.data)
		{
			let list: Array<number> = result.data["roleId"];
			let state: PlayerState = result.data["state"];
			if (list && state != undefined)
			{
				let pInfo: PlayerInfo
				for (let roleId of list)
				{
					pInfo = GamblingManager.getPlayerInfo(roleId);
					if (pInfo)
					{
						pInfo.state = state;
					}
				}
				GamblingManager.PlayerListStateChangeEvent.dispatch();
			}
		}
	}
	public static pushInTrusteeship(result: game.SpRpcResult)
	{
		// GamblingManager.roomDataPushHandler.writeResult(Command.InTrusteeship_Push_2119, result);
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && !GamblingManager.roomInfo.isTrusteeship)
		{
			GamblingManager.roomInfo.isTrusteeship = true;
			GamblingManager.InTrusteeshipEvent.dispatch();
		}
	}
	/**
	 * 推送有人立即亮牌
	 */
	public static pushImmediatelyBirhgtCard(result: game.SpRpcResult)
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && result.data)
		{
			let info: HandCardInfo = new HandCardInfo(result.data);
			GamblingManager.SomeBodyBrightCardEvent.dispatch(info);
		}
	}
	public static onReconnectHandler()
	{
		if (GamblingManager.roomInfo) //重连回来，session差别太大，导致数据不同步的问题
		{
			egret.log("重连从新拉取数据！");
			let id: number = GamblingManager.roomInfo.id;
			GamblingManager.reset();
			GamblingManager.reqEnterRoom(id, game.StringConstants.Empty, false, true); //从新拉取房间数据
		}
	}
	//--------------------------------------------------------------------
	public static sngReadyCountDownTime: number = 8;
	public static sngNextRoundStart(time: number)
	{
		if (time != undefined)
		{
			GamblingManager.sngReadyCountDownTime = time;
		}
		else
		{
			if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo))
			{
				GamblingManager.sngReadyCountDownTime = GamblingManager.matchRoomInfo.definition.waitingTime;
				if (GamblingManager.sngReadyCountDownTime == undefined)
				{
					GamblingManager.sngReadyCountDownTime = 8;
				}
			}
			else
			{
				GamblingManager.sngReadyCountDownTime = 8;
			}
		}
		game.Tick.RemoveSecondsInvoke(GamblingManager.sngReadyCountDown, this);
		game.Tick.AddSecondsInvoke(GamblingManager.sngReadyCountDown, this);
	}
	private static sngReadyCountDown()
	{
		GamblingManager.sngReadyCountDownTime--;
		if (GamblingManager.sngReadyCountDownTime <= 0)
		{
			game.Tick.RemoveSecondsInvoke(GamblingManager.sngReadyCountDown, this);
			GamblingManager.reqNextRoundStart();
		}
		GamblingManager.SngReadyCountDownEvent.dispatch();
	}
	/**
	 * 请求下一局开始(准备)
	 */
	public static reqNextRoundStart()
	{
		if (GamblingUtil.isMatch)
		{
			if (GamblingManager._isOnSeat && !GamblingManager.roomInfo.isMatchOut && !GamblingUtil.isSelfMatchOut) //未被淘汰
			{
				GamblingManager.sendNextRoundStart();
			}
		}
		else
		{
			if (GamblingManager._isOnSeat) //在座位上 
			{
				GamblingManager.sendNextRoundStart();
			}
		}
	}
	private static sendNextRoundStart()
	{
		SocketManager.AddCommandListener(Command.NextRound_Req_3601, GamblingManager.onNextRoundStart, this);
		SocketManager.Send(Command.NextRound_Req_3601);
	}

	private static onNextRoundStart(result: game.SpRpcResult)
	{
		SocketManager.RemoveCommandListener(Command.NextRound_Req_3601, GamblingManager.onNextRoundStart, this);
		if (GamblingManager.roomInfo)
		{
			GamblingManager.ReadyStateChangeEvent.dispatch();
		}
	}
	public static cancelTrusteeship()
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isTrusteeship)
		{
			GamblingManager.reqAction(PlayerState.Trusteeship);
		}
	}
	/**
	 * 请求说话
	 */
	public static reqAction(state: PlayerState, num: number = 0)
	{
		let callBack: Function = function (result: game.SpRpcResult)
		{
			if (GamblingManager.self)
			{
				if (GamblingManager.roomInfo)
				{
					GamblingManager.roomInfo.isTrusteeship = false;
				}
				SocketManager.RemoveCommandListener(Command.Action_Req_3602, callBack, this);
				GamblingManager.ActionOverEvent.dispatch(state);
			}
		};
		SocketManager.AddCommandListener(Command.Action_Req_3602, callBack, this);
		if (num != 0)
		{
			SocketManager.Send(Command.Action_Req_3602, { state: state, num: num });
		}
		else
		{
			SocketManager.Send(Command.Action_Req_3602, { state: state });
		}
	}
	/**
	 * 请求超时操作
	 */
	public static reqTimeOut()
	{
		if (GamblingUtil.isCanCheck)
		{
			GamblingManager.reqAction(PlayerState.Check);
		}
		else
		{
			GamblingManager.reqAction(PlayerState.Fold);
		}
	}
	/**
	 * 请求离开房间(返回大厅)如需添加事件请在发送请求之前添加
	 */
	public static reqLeaveRoom(isInMtt: boolean = false)
	{
		let callBack: Function = function (result: game.SpRpcResult)
		{
			let type: GamblingType = GamblingType.Common;
			if (GamblingManager.roomInfo)
			{
				type = GamblingManager.roomInfo.gamblingType;
			}
			SocketManager.RemoveCommandListener(Command.C2GW_ReqLeaveRoom, callBack, this);
			SocketManager.RemoveErrorListener(Command.C2GW_ReqLeaveRoom, callBackError, this);
			if (GamblingManager.roomInfo.gamblingType == GamblingType.Match && GamblingManager.roomInfo.isMatchOut)
			{
				GamblingManager.roomInfo.isMatchOut = undefined;
			}
			GamblingManager.leaveRoom();
			GamblingManager.LeaveRoomEvent.dispatch({ type: type, isInMtt: isInMtt });
		};
		let callBackError: Function = function (result: game.SpRpcResult)
		{
			let type: GamblingType = GamblingType.Common;
			if (GamblingManager.roomInfo)
			{
				type = GamblingManager.roomInfo.gamblingType;
			}

			SocketManager.RemoveCommandListener(Command.C2GW_ReqLeaveRoom, callBack, this);
			SocketManager.RemoveErrorListener(Command.C2GW_ReqLeaveRoom, callBackError, this);
			if (GamblingManager.roomInfo.gamblingType == GamblingType.Match && GamblingManager.roomInfo.isMatchOut)
			{
				GamblingManager.roomInfo.isMatchOut = undefined;
			}
			if (!isInMtt)
			{
				GamblingManager.leaveRoom();
			}
			GamblingManager.LeaveRoomErrorEvent.dispatch({ type: type, isInMtt: isInMtt });
		};
		/**
		 * 发了离开房间，离开房间协议没有返回，又发了请求下一局的协议 则会报错误 
		 */
		GamblingManager._isOnSeat = false;//点击了返回大厅则此值立即生效
		GamblingManager.roomInfo.isOnWatch = false; //主动点击离开房间
		// if (GamblingUtil.isMatch) //比赛中请求离开房间
		// {
		// 	if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isMatchOut) //被淘汰状态，请求直接清理数据抛送离开事件
		// 	{
		// 		let type: GamblingType = GamblingManager.roomInfo.gamblingType;
		// 		GamblingManager.roomInfo.isMatchOut = undefined;
		// 		GamblingManager.leaveRoom();
		// 		GamblingManager.LeaveRoomEvent.dispatch({ type: type, isInMtt: isInMtt });
		// 	}
		// 	else
		// 	{
		// 		SocketManager.AddCommandListener(Command.LeaveRoom_Req_3603, callBack, this);
		// 		SocketManager.AddErrorListener(Command.LeaveRoom_Req_3603, callBackError, this);
		// 		SocketManager.Send(Command.LeaveRoom_Req_3603);
		// 	}
		// }
		// else
		// {
		SocketManager.AddCommandListener(Command.C2GW_ReqLeaveRoom, callBack, this);
		SocketManager.AddErrorListener(Command.C2GW_ReqLeaveRoom, callBackError, this);
		SocketManager.Send(Command.C2GW_ReqLeaveRoom, msg.C2GW_ReqLeaveRoom.encode({}));
		// }
	}
	private static leaveRoom()
	{
		GamblingManager.isQuicklyEnter = false;
		GamblingManager.guessHandler.leaveRoomReset();
		GamblingManager.championshipHandler.stopRoomDisbandListener();
		GamblingManager.reset();
	}
	/**
	 * 请求买入游戏
	 */
	public static reqBuyInGame(num: number, isAutoBuy: boolean, pos: number)
	{
		let callBack: Function = function (result: game.SpRpcResult)
		{
			SocketManager.RemoveCommandListener(Command.C2RS_ReqBuyInGame, callBack, this);
			GamblingManager._isOnSeat = true;
			if (GamblingManager.roomInfo)
			{
				GamblingManager.roomInfo.isAutoBuy = isAutoBuy;
			}
			if (result.data)
			{
				GamblingManager.BuyInGameEvent.dispatch();
			}
		};
		SocketManager.AddCommandListener(Command.C2RS_ReqBuyInGame, callBack, this);
		SocketManager.Send(Command.C2RS_ReqBuyInGame, msg.C2RS_ReqBuyInGame.encode({ num: num, isautobuy: isAutoBuy, pos: pos }));
	}
	/**
	 * 快速开始游戏
	 */
	public static reqQuicklyBuyInGame(): boolean
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo))
		{
			if (UserManager.userInfo.gold < GamblingManager.roomInfo.definition.SBuyin)
			{
				game.Console.log("快速买入失败！玩家身上金币小于最低买入金额");
				return false;
			}
			let willBuyNum: number = Math.ceil(GamblingManager.roomInfo.definition.BBuyin / 2);
			willBuyNum = Math.min(UserManager.userInfo.gold, willBuyNum);
			if (willBuyNum > 0)
			{
				let pInfo: PlayerInfo;
				for (let i: number = 1; i <= GamblingManager.maxSeats; i++)
				{
					pInfo = GamblingManager.getPlayerInfoByPos(i);
					if (!pInfo)
					{
						GamblingManager.reqBuyInGame(willBuyNum, true, i);
						return true; //也存在服务器买入失败的情况，但客户端已验证通过
					}
				}
			}
			game.Console.log("快速买入失败！买入金额" + willBuyNum + "位子已满？");
			return false;
		}
		else
		{
			game.Console.log("快速买入失败！房间信息不能为空！");
			return false;
		}
	}
	/**
	 * 请求站起
	 */
	public static reqStandUp()
	{
		let callBack: Function = function (result: game.SpRpcResult)
		{
			SocketManager.RemoveCommandListener(Command.StandUp_Req_3605, callBack, this);
			GamblingManager.StandUpEvent.dispatch();
		};
		SocketManager.AddCommandListener(Command.StandUp_Req_3605, callBack, this);
		SocketManager.Send(Command.StandUp_Req_3605);
	}
	/**
	 * 请求亮牌
	 */
	public static reqBrightCard()
	{
		let callBack: Function = function (result: game.SpRpcResult)
		{
			SocketManager.RemoveCommandListener(Command.BrightCard_Req_3606, callBack, this);
			if (GamblingManager.roomInfo)
			{
				GamblingManager.roomInfo.isShowCard = !GamblingManager.roomInfo.isShowCard;
			}
			GamblingManager.BrightCardFlagEvent.dispatch();
		};
		SocketManager.AddCommandListener(Command.BrightCard_Req_3606, callBack, this);
		SocketManager.Send(Command.BrightCard_Req_3606);
	}
	/**
	 * 请求增加金币
	 */
	public static reqAddCoin(num: number)
	{
		if (num > 0)
		{
			let callBack: Function = function (result: game.SpRpcResult)
			{
				SocketManager.RemoveCommandListener(Command.AddCoin_Req_3607, callBack, this);
				GamblingManager.AddCoinEvent.dispatch();
			};
			SocketManager.AddCommandListener(Command.AddCoin_Req_3607, callBack, this);
			SocketManager.Send(Command.AddCoin_Req_3607, { num: num });
		}
		else
		{
			game.Console.log("增加金币数量异常！");
		}
	}
	//--------------------------组全用户信息用-----------------------------
	/**
	 * 拉取玩家信息完毕 可以进入房间 or 进入大厅
	 */
	private static getPlayerUserInfoOver()
	{
		if (GamblingManager.self && GamblingManager.self.state != PlayerState.WaitNext && GamblingManager.self.state != PlayerState.Empty)
		{
			GamblingManager.timeAwardHandler.startCountDown(); //断线重连开始计时
		}
	}
	private static _getUserInfoQueue: Array<PlayerInfo>;
	private static _isOnGetUserInfo: boolean = false;
	/**
 	* 拉取玩家的用户信息
 	*/
	public static reqGetPlayerUserInfo(playerInfo: PlayerInfo)
	{
		if (!playerInfo)
		{
			return;
		}
		if (!GamblingManager._getUserInfoQueue)
		{
			GamblingManager._getUserInfoQueue = new Array<PlayerInfo>();
		}
		for (let info of GamblingManager._getUserInfoQueue)
		{
			if (playerInfo.roleId == info.roleId)
			{
				return; //已存在
			}
		}
		GamblingManager._getUserInfoQueue.push(playerInfo);
		GamblingManager.startGetUserInfo(GamblingManager._getUserInfoQueue[0]);
	}
	private static startGetUserInfo(target: PlayerInfo)
	{
		if (!GamblingManager._isOnGetUserInfo)
		{
			GamblingManager._isOnGetUserInfo = true;
			let callBack: Function = function (result: game.SpRpcResult)
			{
				GamblingManager._isOnGetUserInfo = false;
				GamblingManager._getUserInfoQueue[0].userInfo = new UserInfo(result.data);
				GamblingManager.OnGetRoomUserInfoEvent.dispatch(GamblingManager._getUserInfoQueue[0].userInfo.id);

				GamblingManager._getUserInfoQueue.shift();
				if (result.data)
				{
					GamblingManager.getNext();
				}
			};
			let errorCallBack: Function = function (result: game.SpRpcResult)
			{
				GamblingManager._isOnGetUserInfo = false;
				GamblingManager._getUserInfoQueue.shift();
				GamblingManager.getNext();
			};
			UserManager.sendGetUserInfo(target.roleId, callBack, errorCallBack);
		}
	}
	private static getNext()
	{
		if (GamblingManager._getUserInfoQueue.length > 0)
		{
			GamblingManager.startGetUserInfo(GamblingManager._getUserInfoQueue[0]);
		}
		else
		{
			GamblingManager.getPlayerUserInfoOver();
		}
	}
	/**
	 * 检测破产
	 */
	public static checkBust()
	{
		if (GamblingManager.self)
		{
			if (UserManager.isBust && GamblingManager.self.bankRoll <= 0)
			{
				GamblingManager.reqStandUp();
			}
		}
	}
	/**
 	* 执行默认的行为
 	*/
	public static doDefaultAction()
	{
		if (GamblingUtil.isCanCheck) //是否过牌
		{
			GamblingManager.reqAction(PlayerState.Check);
		}
		else if (GamblingUtil.isNeedAllIn) //是否需要allin
		{
			if (GamblingManager.self)
			{
				GamblingManager.reqAction(PlayerState.AllIn, GamblingManager.self.bankRoll);
			}
		}
		else if (GamblingUtil.callNum > 0) //需要跟注
		{
			GamblingManager.reqAction(PlayerState.Call, GamblingUtil.callNum);
		}
	}
	//--------------------------------------------------------------------

	//-----------------------------数据状态处理与更新----------------------
	public static get self(): PlayerInfo
	{
		if (!GamblingManager._self)
		{
			GamblingManager._self = GamblingManager.getPlayerInfo(UserManager.userInfo.id);
		}
		return GamblingManager._self;
	}

	public static addPlayer(playerInfo: PlayerInfo)
	{
		if (GamblingManager.roomInfo)
		{
			if (GamblingManager.roomInfo.playerList)
			{
				if (playerInfo && GamblingUtil.isContainPlayer(playerInfo.roleId) == false)
				{
					GamblingManager.roomInfo.playerList.push(playerInfo);
				}
			}
			else
			{
				GamblingManager.roomInfo.playerList = new Array<PlayerInfo>();
				if (playerInfo)
				{
					GamblingManager.roomInfo.playerList.push(playerInfo);
				}
			}
		}
	}
	/**
	 * 移除玩家
	 */
	public static removePlayer(roleId: number)
	{
		let player: PlayerInfo = GamblingManager.getPlayerInfo(roleId);
		game.ArrayUtil.RemoveItem(player, GamblingManager.roomInfo.playerList);
	}
	/**
	 * 获取玩家信息
	 */
	public static getPlayerInfo(roleId: number): PlayerInfo
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList)
		{
			for (let player of GamblingManager.roomInfo.playerList)
			{
				if (player.roleId == roleId)
				{
					return player;
				}
			}
		}
		return null;
	}
	/**
	 * 获取玩家状态
	 */
	public static getPlayerStateByRoleId(roleId: number): PlayerState
	{
		let pInfo: PlayerInfo = GamblingManager.getPlayerInfo(roleId);
		if (pInfo)
		{
			return pInfo.state;
		}
		else
		{
			return PlayerState.Empty;
		}
	}
	/**
	 * 获取玩家信息根据位置
	 */
	public static getPlayerInfoByPos(pos: number): PlayerInfo
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList)
		{
			for (let player of GamblingManager.roomInfo.playerList)
			{
				if (player.pos == pos)
				{
					return player;
				}
			}
		}
		return null;
	}
	/**
	 * 获取最大座位
	 */
	public static get maxSeats(): number
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo))
		{
			return GamblingManager.roomInfo.definition.Seat;
		}
		return 0;
	}
	/**
	 * 获取自己是否是房主
	 */
	public static get isMaster(): boolean
	{
		return GamblingUtil.getIsMaster(GamblingManager.self);
	}
	/**
	 * 是否是新一轮圈注开始
	 */
	public static get isOneLoopStart(): boolean
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList)
		{
			for (let pInfo of GamblingManager.roomInfo.playerList)
			{
				if (pInfo.num > 0)
				{
					return false;
				}
			}
			return true;
		}
		return false;
	}
	/**
	 * 牌局是否在结算中
	 */
	public static get isOnRoundOverIng(): boolean
	{
		return GamblingManager.roundOverInfo != undefined;
	}
	//-----------------------------------event事件--------------------------------
	/**
	 * 拉取房间信息
	 */
	public static OnGetRoomInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 获取玩家房间信息
	 */
	public static OnGetRoomUserInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 下一局开始事件
	 */
	public static NextRoundStartEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 买入游戏事件
	 */
	public static BuyInGameEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 坐下或站起
	 */
	public static SitOrStandEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 玩家状态变更
	 */
	public static PlayerStateChangeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 手牌推送
	 */
	public static HandCardComeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 筹码变更
	 */
	public static ChipsChangeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 底池变更
	 */
	public static PotChipsChangeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 公共牌变化
	 */
	public static OneLoopOverEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 推送说话位置变更
	 */
	public static ActionPosChangeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 准备状态变更
	 */
	public static ReadyStateChangeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 说话完毕
	 */
	public static ActionOverEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 离开房间事件
	 */
	public static LeaveRoomEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 服务器主动推送房间离开
	 */
	public static OnPushLeaveRoomEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 离开房间错误事件
	 */
	public static LeaveRoomErrorEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 站起
	 */
	public static StandUpEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 请求亮牌
	 */
	public static BrightCardFlagEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 增加金币
	 */
	public static AddCoinEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 玩家列表状态变更
	 */
	public static PlayerListStateChangeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 一局结束
	 */
	public static RoundOverEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 盲注前注变更
	 */
	public static BlindChangeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
     * 重购/增购完成
     */
	public static RebuyORAddonEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 进入托管状态
	 */
	public static InTrusteeshipEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 超时事件
	 */
	public static TimeOutEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 发牌完毕事件
	 */
	public static FlopCardOverEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 淘汰赛准备倒计时事件
	 */
	public static SngReadyCountDownEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 推送某人亮牌事件
	 */
	public static SomeBodyBrightCardEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}