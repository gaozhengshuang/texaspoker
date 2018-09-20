/**
 * 手牌信息
 */
class HandCardInfo extends BaseServerValueInfo
{
	/**
	 * 用户ID
	 */
	public roleId: number;
	/**
	 * 手牌列表
	 */
	public cardList: Array<CardInfo>;
	public reset()
	{
		this.roleId = 0;
		this.cardList = undefined;
	}
	public copyValueFrom(data: any)
	{
		super.copyValueFrom(data);
		if (data["card"])
		{
			this.cardList = new Array<CardInfo>();
			GamblingUtil.cardArr2CardInfoList(data["card"], this.cardList);
			if (this.cardList.length == 0)
			{
				this.cardList = undefined;
			}
		}
		// game.CopyUtil.supCopyList(this, data, "cardList", CardInfo);
	}
}