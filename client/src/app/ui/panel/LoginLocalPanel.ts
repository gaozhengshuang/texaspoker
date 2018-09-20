/**
 * 内网登录面板
 */
class LoginLocalPanel extends BasePanel
{
	public loginBtn: eui.Button;
	public registerBtn: eui.Button;
	public accountLabel: eui.Label;
	public pwdLabel: eui.Label;

	public constructor()
	{
		super();
		this.isTween = true;
		this.setSkinName(UIModuleName.LoginLocalPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
		this.accountLabel.type = egret.TextFieldType.INPUT;
		this.pwdLabel.type = egret.TextFieldType.INPUT;
		this.pwdLabel.inputType = egret.TextFieldInputType.PASSWORD;

		this.accountLabel.text = PrefsManager.getValue(PrefsManager.Login_Account);
		this.pwdLabel.text = PrefsManager.getValue(PrefsManager.Login_Password);
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginHandler, this);
		this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerHandler, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.loginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.loginHandler, this);
		this.registerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.registerHandler, this);
	}
	/**
	 * 点击登录按钮进行登录
	 * DispatchAccountLoginSucceed（）第三个参数来区分是进行注册还是进行登录操作
	*/
	private loginHandler(event: egret.TouchEvent)
	{
		let account: string = this.accountLabel.text.trim();
		let pwd: string = this.pwdLabel.text.trim();
		SoundManager.playButtonEffect(event.target);
		if (!account || !pwd)
		{
			AlertManager.showAlert("您的账号或密码为空，请重新输入！");
			return;
		}
		this.onCloseBtnClickHandler(null);
		ChannelManager.DispatchAccountLoginSucceed(account, pwd, false);
	}
	/**
	 * 点击注册按钮显示注册面板
	*/
	private registerHandler(event: egret.TouchEvent)
	{
		SoundManager.playButtonEffect(event.target);
		this.onCloseBtnClickHandler(null);
		UIManager.showPanel(UIModuleName.RegisterPanel);
	}
	protected onCloseBtnClickHandler(event: egret.TouchEvent)
	{
		super.onCloseBtnClickHandler(event);
		if (event)
		{
			ChannelManager.OnLoginFailed.dispatch();
		}
	}
}