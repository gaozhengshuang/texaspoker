/**
 * 手牌信息
 */
class HandCardInfo extends BaseServerValueInfo
{
	private _data: msg.IHandCardInfo;
	public get data(): msg.IHandCardInfo
	{
		return this._data;
	}
	public set data(value: msg.IHandCardInfo)
	{
		this._data = value;
		if (value)
		{
			if (value.card)
			{
				this.cardList = new Array<CardInfo>();
				GamblingUtil.cardArr2CardInfoList(value.card, this.cardList);
				if (this.cardList.length == 0)
				{
					this.cardList = undefined;
				}
			}
		}
	}
	/**
	 * 用户ID
	 */
	public get roleId(): number
	{
		if (this.data)
		{
			return game.longToNumber(this.data.roleid);
		}
	}
	public set roleId(value: number)
	{
		if (this.data)
		{
			this.data.roleid = value;
		}
	}
	private _cardList: CardInfo[];
	/**
	 * 手牌列表
	 */
	public get cardList(): Array<CardInfo>
	{
		return this._cardList;
	}
	public set cardList(value: CardInfo[])
	{
		this._cardList = value;
	}
	public reset()
	{
		this.roleId = 0;
		this.cardList = undefined;
		this.data = undefined;
	}
}