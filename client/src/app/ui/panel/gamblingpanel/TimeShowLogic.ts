/**
 * 时间控制显示
 */
class TimeShowLogic
{
	public timeLabel: eui.Label;
	private _nowTotal: number;

	private _waitTimeGroup: eui.Group;
	// private _imgList: Array<eui.Image>;

	private _waitTime: number;
	/**
	 * 时间差值
	 */
	private _offsetTime: number;

	public set waitTime(value: number)
	{
		this._waitTime = value;
		if (value == undefined)
		{
			this._waitTimeGroup.visible = false;
		}
		else
		{
			this.refreshTime();
		}
	}
	public get waitTime(): number
	{
		return this._waitTime;
	}
	public get nowTotal(): number
	{
		return this._nowTotal;
	}
	public set nowTotal(value: number)
	{
		this._nowTotal = value;
		this.refreshTime();
	}
	constructor(label: eui.Label)
	{
		this.timeLabel = label;
		this.timeLabel.text = game.StringConstants.Empty;
	}
	public setWaitTimeGroup(group: eui.Group)
	{
		this._waitTimeGroup = group;
		// this._imgList = list;
	}
	public onEnable()
	{
		game.Tick.AddSecondsInvoke(this.refreshTime, this);
	}
	public onDisable()
	{
		game.Tick.RemoveSecondsInvoke(this.refreshTime, this);
	}
	public refreshTime()
	{
		if (this.nowTotal != undefined)
		{
			this._offsetTime = Math.round(this.nowTotal - TimeManager.GetServerUtcTimestamp());
			if (this._offsetTime >= 0)
			{
				this.timeLabel.text = game.DateTimeUtil.formatCountdown(this._offsetTime);
				// SceneManager.gameScene.gameProcesser.tryPutCardOut(this._offsetTime);
			}
		}
		else
		{
			this.timeLabel.text = game.StringConstants.Empty;
		}

		/**
		 * 等待时间倒计时
		 */
		if (this.waitTime != undefined && this.waitTime != NaN)
		{
			this._offsetTime = Math.round(this.waitTime - TimeManager.GetServerUtcTimestamp());
			if (this._offsetTime >= 0)
			{
				this._waitTimeGroup.visible = true;
				// let min: number = Math.floor(this._offsetTime / 60);
				// let seconds: number = Math.floor(this._offsetTime - min * 60);

				// let minStr: string = game.StringUtil.timeStringFormat(min);
				// let index: number = 0;
				// let img: eui.Image;
				// for (let i: number = 0; i < minStr.length; i++)
				// {
				// 	img = this._imgList[index];
				// 	img.source = UIUtil.getNumImg(parseInt(minStr.substr(i, 1)), NumResType.Yellow);
				// 	index++;
				// }

				// let secondsStr: string = game.StringUtil.timeStringFormat(seconds);

				// img = this._imgList[index]; //冒号
				// img.source = ImageSource.Yellow_MaoHao;

				// for (let i: number = 0; i < secondsStr.length; i++)
				// {
				// 	index++;
				// 	img = this._imgList[index];
				// 	img.source = UIUtil.getNumImg(parseInt(secondsStr.substr(i, 1)), NumResType.Yellow);
				// }
			}
			else
			{
				this._waitTimeGroup.visible = false;
			}
		}
		else
		{
			this._waitTimeGroup.visible = false;
		}
	}
}