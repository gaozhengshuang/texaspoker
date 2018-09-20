/**
 * 结算信息
 */
class RoundOverInfo extends BaseServerValueInfo
{
	/**
	 * 底池奖励列表
	 */
	public potList: Array<PotAwardInfo>;
	/**
	 * 手牌信息
	 */
	public handCardList: Array<HandCardInfo>;
	public reset()
	{
		this.potList = undefined;
		this.handCardList = undefined;
	}
	public copyValueFrom(data: any)
	{
		super.copyValueFrom(data);
		qin.CopyUtil.supCopyList(this, data, "handCardList", HandCardInfo);
	}
}