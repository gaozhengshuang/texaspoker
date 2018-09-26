/**
 * 结算信息
 */
class RoundOverInfo extends BaseServerValueInfo
{
	private _data: msg.IRS2C_PushOneRoundOver;
	public get data(): msg.IRS2C_PushOneRoundOver
	{
		return this._data;
	}
	public set data(value: msg.IRS2C_PushOneRoundOver)
	{
		this._data = value;
		if (this._data)
		{
			if (this._data.potlist)
			{
				this.potList = [];
				for (let info of this._data.potlist)
				{
					let awardInfo: PotAwardInfo = new PotAwardInfo();
					awardInfo.data = info;
					this.potList.push(awardInfo);
				}
			}
			if(this._data.handcardlist)
			{
				this.handCardList = [];
				for (let info of this._data.handcardlist)
				{
					let handCardInfo: HandCardInfo = new HandCardInfo();
					handCardInfo.data = info;
					this.handCardList.push(handCardInfo);
				}
			}
		}
	}
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
		this.data = undefined;
	}
}