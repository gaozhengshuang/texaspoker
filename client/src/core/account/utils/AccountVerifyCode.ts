/// <summary>
/// 验证码处理类
/// </summary>
class AccountVerifyCode
{
	private _label: eui.Label;
	private _vcTime: number;
	private _isAgain: boolean = false;
	public get isAgain(): boolean
	{
		return this._isAgain;
	}
	public AccountVerifyCode(label: eui.Label)
	{
		this._label = label;
		this._label.text = game.StringConstants.Empty;
	}
	public Reset()
	{
		this._vcTime = 0;
		this._isAgain = false;
		game.Tick.AddSecondsInvoke(this.OnTick, this);
		this.OnTick(0);
	}

	public OnEnable()
	{
		AccountManager.OnAgainMobileCode.addListener(this.OnAgainMobileCode, this);
	}
	public OnDisable()
	{
		AccountManager.OnAgainMobileCode.removeListener(this.OnAgainMobileCode, this);
		game.Tick.RemoveSecondsInvoke(this.OnTick, this);
	}
	private OnAgainMobileCode()
	{
		this.Reset();
	}
	private OnTick(delta: number)
	{
		this._vcTime += delta;
		if (this._vcTime >= AccountConfig.MobileCodeTimeout)
		{
			game.Tick.RemoveSecondsInvoke(this.OnTick, this);
			this._label.text = "获取验证码";
			this._isAgain = true;
		}
		else
		{
			this._label.text = game.DateTimeUtil.countDownFormat(AccountConfig.MobileCodeTimeout - this._vcTime, false) + "秒";
		}
	}
}
