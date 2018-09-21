/**
 * 百人大战牌局坑位数据支持
 */
class HWPanelPitDataSupport extends BaseHWPanelSupport
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
	 * 根据玩家位置获取坑位信息
	 */
	public getPitInfo(playerPos: number): HWPitInfo
	{
		let pitInfo: HWPitInfo;
		for (let i: number = HWPanelSetting.MinPitIndex; i < HWPanelSetting.MaxPitNum; i++)
		{
			pitInfo = this.target.pitList[i];
			if (pitInfo.headComponent.bindData && pitInfo.headComponent.bindData.pos == playerPos)
			{
				return pitInfo; //如果坑位有玩家 且玩家的位置为目标位置，则返回
			}
		}
		let nextPlayerInfo: PlayerInfo = this.getNextPlayerInfo(playerPos); //没有则寻找下一个玩家
		if (nextPlayerInfo)
		{
			let nextPitInfo: HWPitInfo = this.getPitInfoByPlayerInfo(nextPlayerInfo);
			if (nextPitInfo)
			{
				let nowIndex: number = GamblingPanelSetting.getPreIndex(nextPitInfo.pos, nextPlayerInfo.pos - playerPos);
				return this.getPitInfoByIndex(nowIndex);
			}
		}
		return this.getPitInfoByIndex(playerPos);
	}
	public getPitInfoByIndex(index: number): HWPitInfo
	{
		for (let pitInfo of this.target.pitList)
		{
			if (pitInfo.pos == index)
			{
				return pitInfo; //如果都没有玩家信息 则玩家位置即是坑位位置
			}
		}
		return null;
	}
	/**
	 * 获取头像组件，根据玩家位置
	 */
	public getHeadComponent(playerPos: number): HWHeadComponent
	{
		let pitInfo: HWPitInfo = this.getPitInfo(playerPos);
		if (pitInfo)
		{
			return pitInfo.headComponent;
		}
		return null;
	}
	/**
	 * 获取下一个有玩家的坑位信息 如果都没有则返回null
	 */
	public getNextPlayerPitInfo(pit: HWPitInfo): HWPitInfo
	{
		let nextIndex: number = GamblingPanelSetting.getNextIndex(pit.pos);
		for (let i: number = HWPanelSetting.MinPitIndex; i < HWPanelSetting.MaxPitNum; i++)
		{
			let nextPitInfo: HWPitInfo = this.target.pitList[nextIndex - 1];
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
		for (let i: number = HWPanelSetting.MinPitIndex; i < HWPanelSetting.MaxPitNum; i++)
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
	public getPitInfoByPlayerInfo(playerInfo: PlayerInfo): HWPitInfo
	{
		let pitInfo: HWPitInfo;
		for (let i: number = HWPanelSetting.MinPitIndex; i < HWPanelSetting.MaxPitNum; i++)
		{
			pitInfo = this.target.pitList[i];
			if (pitInfo.headComponent.bindData && pitInfo.headComponent.bindData.roleId == playerInfo.roleId)
			{
				return pitInfo;
			}
		}
		return null;
	}
}