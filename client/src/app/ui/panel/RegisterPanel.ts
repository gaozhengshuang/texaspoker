/**
 * 注册面板
 */
class RegisterPanel extends BasePanel
{
	public registerBtn: eui.Button;
	public backBtn: eui.Button;
	public accountLabel: eui.Label;
	public pwdLabel: eui.Label;
	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.RegisterPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
		this.accountLabel.type = egret.TextFieldType.INPUT;
		this.pwdLabel.type = egret.TextFieldType.INPUT;
		this.pwdLabel.inputType = egret.TextFieldInputType.PASSWORD;
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerClickHandler, this);
		this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backClickHandler, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.registerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.registerClickHandler, this);
		this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backClickHandler, this);
	}
	private registerClickHandler(event: egret.TouchEvent)
	{
		SoundManager.playButtonEffect(event.target);
		let account: string = this.accountLabel.text.trim();
		let pwd: string = this.pwdLabel.text.trim();
		if (account && pwd)
		{
			ChannelManager.DispatchAccountLoginSucceed(account, pwd, true);
			this.onCloseBtnClickHandler(event);
		}
	}
	private backClickHandler(event: egret.TouchEvent)
	{
		SoundManager.playButtonEffect(event.target);
		UIManager.showPanel(UIModuleName.LoginLocalPanel);
		this.onCloseBtnClickHandler(event);
	}
}