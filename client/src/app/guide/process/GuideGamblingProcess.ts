/**
 * 牌局引导处理
 */
class GuideGamblingProcess
{
	/**
 	* 自己的位置 or 自己的roleid
 	*/
	public static readonly self: number = 1;
	/**
	 * 下一局开始
	 */
	public static nextRoundStart()
	{
		GamblingManager.roomInfo.publicCard = undefined;
		GamblingManager.roundOverInfo = undefined;
		GamblingManager.roomInfo.isShowCard = false;
		GamblingManager.oneLoopClear();

		GamblingManager.roomInfo.potChips = undefined;
		GamblingManager.roomInfo.startTime = TimeManager.GetServerUtcSecondstamp();

		GamblingManager.NextRoundStartEvent.dispatch();

		if (GamblingManager.roomInfo.playerList) //改变玩家状态
		{
			for (let pInfo of GamblingManager.roomInfo.playerList)
			{
				GuideGamblingProcess.playerStateChange(pInfo.pos, PlayerState.WaitAction, pInfo.num);
			}
		}
	}
	/**
	 * 玩家状态改变
	 */
	public static playerStateChange(target: number, state: PlayerState, num: number)
	{
		let pInfo: PlayerInfo = GamblingManager.getPlayerInfoByPos(target);
		if (!pInfo)
		{
			game.Console.logError("新手引导房间状态变更异常！未找到状态变更的玩家数据！" + target);
			return;
		}
		if (num == undefined)
		{
			num = 0;
		}

		if (GamblingManager.showPotChips == 0)
		{
			GamblingManager.showPotChips = GamblingManager.totalPotChips;
		}
		if (num > 0)
		{
			if (pInfo.num > 0)
			{
				GamblingManager.showPotChips += num - pInfo.num;
			}
			else
			{
				GamblingManager.showPotChips += num
			}
		}

		if ((state == PlayerState.Check || state == PlayerState.AllIn || state == PlayerState.Blind || state == PlayerState.Raise) && num > 0)
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

		pInfo.state = state;
		pInfo.num = num;

		if (pInfo.state == PlayerState.Raise || pInfo.state == PlayerState.AllIn)
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
		GamblingManager.PlayerStateChangeEvent.dispatch({ roleId: pInfo.roleId, state: state, num: num });
	}
	/**
	 * 玩家身上筹码变更
	 */
	public static chipsChange(pos: number, definition: GuideControllerDefinition)
	{
		let pInfo: PlayerInfo = GamblingManager.getPlayerInfoByPos(pos);
		if (!pInfo)
		{
			game.Console.logError("更新玩家筹码失败，找不到玩家信息！pos" + pos);
			return;
		}
		let br: number = definition.stepParams["bankRoll"];
		pInfo.bankRoll = br;

		GamblingManager.ChipsChangeEvent.dispatch(pInfo);
	}
	/**
	 * 位置变更
	 */
	public static acitionPosChange(definition: GuideControllerDefinition)
	{
		if (definition.stepParams.pos != undefined)
		{
			GamblingManager.roomInfo.pos = definition.stepParams.pos;
			GamblingManager.roomInfo.posTime = TimeManager.GetServerUtcSecondstamp();
			GamblingManager.ActionPosChangeEvent.dispatch(GamblingManager.roomInfo.handCard);
		}
	}
	/**
	 * 一圈注结束
	 */
	public static oneLoopOver(definition: GuideControllerDefinition)
	{
		if (!GamblingManager.roomInfo.publicCard)
		{
			GamblingManager.roomInfo.publicCard = new Array<CardInfo>();
		}
		GamblingUtil.cardArr2CardInfoList(definition.stepParams["card"], GamblingManager.roomInfo.publicCard);

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

		GamblingManager.roomInfo.potChips = definition.stepParams["potChips"];

		GamblingManager.roomInfo.maxAnte = 0;
		GamblingManager.OneLoopOverEvent.dispatch([cardList, publicCardList]);

	}
}