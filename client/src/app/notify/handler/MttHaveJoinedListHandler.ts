/**
 * 锦标赛已报名有赛事列表通知
 */
class MttHaveJoinedListHandler extends BaseNotifyHandle
{
	protected init()
	{
		super.init();
		ChampionshipManager.onRefreshMTTListEvent.addListener(this.refresh, this);
		ChampionshipManager.onGetJoinedMatchListEvent.addListener(this.refresh, this);
		ChampionshipManager.onRequestJoinEvent.addListener(this.refresh, this);
	}
	public get count(): number
	{
		if (ChampionshipManager.joinMTTList)
		{
			for (let info of ChampionshipManager.joinMTTList)
			{
				if (!info.outTime && !info.endTime)
				{
					return 1;
				}
			}
		}
		return 0;
	}
	private refresh(data: any)
	{
		this.dispatchNotify();
	}
	public destroy()
	{
		ChampionshipManager.onRefreshMTTListEvent.removeListener(this.refresh, this);
		ChampionshipManager.onGetJoinedMatchListEvent.removeListener(this.refresh, this);
		ChampionshipManager.onRequestJoinEvent.removeListener(this.refresh, this);
	}
}