/**
 * 登录界面
 */
class LoginPanel extends BasePanel
{
	public fbBtn: eui.Button;
	public gamecenterBtn: eui.Button;
	public googlePlayBtn: eui.Button;
	public intranetAccountBtn: eui.Button;

	public btnGroup: eui.Group;

	public versionLabel: eui.Label;
	public logoImg: eui.Image;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.LoginPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		this.isTween = false;
		super.onAwake(event);
		this.logoImg.source = BundleManager.getResNameByBundle(ResFixedFileName.Logo_png);
	}
	public init(appendData: any): void
	{
		super.init(appendData);
		let loginTypeList: string[] = ChannelLoginType.GetChannelLoginList(OperatePlatform.getCurrent(), ChannelManager.channelType, VersionManager.isServerTest, VersionManager.isSafe);

		this.btnGroup.removeChildren();

		for (let val of loginTypeList)
		{
			if (val == ChannelLoginType.GooglePlay)
			{
				this.btnGroup.addChild(this.googlePlayBtn);
			}
			else if (val == ChannelLoginType.GameCenter)
			{
				this.btnGroup.addChild(this.gamecenterBtn);
			}
			else if (val == ChannelLoginType.IntranetAccount)
			{
				this.btnGroup.addChild(this.intranetAccountBtn);
			}
			else if (val == ChannelLoginType.FaceBook)
			{
				this.btnGroup.addChild(this.fbBtn);
			}
		}
		this.versionLabel.text = VersionManager.getVersionStr();
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.panelClick, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.panelClick, this);
	}
	private panelClick(event: egret.TouchEvent): void
	{
		let target = event.target;
		switch (target)
		{
			case this.fbBtn:
				SoundManager.playButtonEffect(event.target);
				UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.FaceBook);
				break;
			case this.googlePlayBtn:
				SoundManager.playButtonEffect(event.target);
				UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.GooglePlay);
				break;
			case this.intranetAccountBtn:
				SoundManager.playButtonEffect(event.target);
				UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.IntranetAccount);
				break;
			case this.gamecenterBtn:
				SoundManager.playButtonEffect(event.target);
				UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.GameCenter);
				break;
		}
	}
	private userBtnClickHandler(event: egret.TouchEvent): void
	{
		SoundManager.playButtonEffect(event.target);
		UIManager.showPanel(UIModuleName.UserAngreementPanel);
	}
}