/**
 * 牌局坑位数据支持
 */
class GamblingPanelPitDataSupport extends BaseGamblingPanelSupport
{
	public initialize()
	{
		super.initialize();
	}
	public onEnable()
	{
		super.onEnable();
	}
	public onDisable()
	{
		super.onDisable();
	}
	/**
	 * 获取当前坑位的playerpos
	 */
	public getPlayerPos(pit: GamblingPitInfo): number
	{
		if (pit.headComponent.bindData)
		{
			return pit.headComponent.bindData.pos; //如果有玩家则直接返回玩家位置
		}
		let nextPitInfo: GamblingPitInfo = this.getNextPlayerPitInfo(pit);
		if (nextPitInfo)
		{
			let pos: number = GamblingPanelSetting.getPreIndex(nextPitInfo.headComponent.bindData.pos, nextPitInfo.index - pit.index);
			return pos;
		}
		else
		{
			return pit.index; //如果都没有则 坑位的索引即是 玩家的pos
		}
	}
	/**
	 * 根据玩家位置获取坑位信息
	 */
	public getPitInfo(playerPos: number): GamblingPitInfo
	{
		let pitInfo: GamblingPitInfo;
		for (let i: number = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++)
		{
			pitInfo = this.target.pitList[i - 1];
			if (pitInfo.headComponent.bindData && pitInfo.headComponent.bindData.pos == playerPos)
			{
				return pitInfo; //如果坑位有玩家 且玩家的位置为目标位置，则返回
			}
		}
		let nextPlayerInfo: PlayerInfo = this.getNextPlayerInfo(playerPos); //没有则寻找下一个玩家
		if (nextPlayerInfo)
		{
			let nextPitInfo: GamblingPitInfo = this.getPitInfoByPlayerInfo(nextPlayerInfo);
			if (nextPitInfo)
			{
				let nowIndex: number = GamblingPanelSetting.getPreIndex(nextPitInfo.index, nextPlayerInfo.pos - playerPos);
				return this.getPitInfoByIndex(nowIndex);
			}
		}
		return this.getPitInfoByIndex(playerPos);
	}
	public getPitInfoByIndex(index: number): GamblingPitInfo
	{
		for (let pitInfo of this.target.pitList)
		{
			if (pitInfo.index == index)
			{
				return pitInfo; //如果都没有玩家信息 则玩家位置即是坑位位置
			}
		}
		return null;
	}
	/**
	 * 获取头像组件，根据玩家位置
	 */
	public getHeadComponent(playerPos: number): GamblingHeadComponent
	{
		let pitInfo: GamblingPitInfo = this.getPitInfo(playerPos);
		if (pitInfo)
		{
			return pitInfo.headComponent;
		}
		return null;
	}
	/**
	 * 获取下一个有玩家的坑位信息 如果都没有则返回null
	 */
	public getNextPlayerPitInfo(pit: GamblingPitInfo): GamblingPitInfo
	{
		let nextIndex: number = GamblingPanelSetting.getNextIndex(pit.index);
		for (let i: number = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++)
		{
			let nextPitInfo: GamblingPitInfo = this.target.pitList[nextIndex - 1];
			if (nextPitInfo.headComponent.bindData)
			{
				return nextPitInfo;
			}
			// if (nextPitInfo.index == pit.index)
			// {
			// 	return null;
			// }
			nextIndex = GamblingPanelSetting.getNextIndex(nextIndex);
		}
		return null;
	}
	/**
	 * 获取下一个位置的玩家信息
	 */
	public getNextPlayerInfo(playerPos: number): PlayerInfo
	{
		let nextPos: number = GamblingPanelSetting.getNextIndex(playerPos);
		for (let i: number = GamblingPanelSetting.MinPitIndex; i < GamblingManager.maxSeats; i++)
		{
			let nextPlayerInfo: PlayerInfo = GamblingManager.getPlayerInfoByPos(nextPos);
			if (nextPlayerInfo)
			{
				return nextPlayerInfo;
			}
			nextPos = GamblingPanelSetting.getNextIndex(nextPos);
		}
		return null;
	}
	/**
	 * 根据玩家信息获取坑位信息
	 */
	public getPitInfoByPlayerInfo(playerInfo: PlayerInfo): GamblingPitInfo
	{
		let pitInfo: GamblingPitInfo;
		for (let i: number = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++)
		{
			pitInfo = this.target.pitList[i - 1];
			if (pitInfo.headComponent.bindData && pitInfo.headComponent.bindData.roleId == playerInfo.roleId)
			{
				return pitInfo;
			}
		}
		return null;
	}
}