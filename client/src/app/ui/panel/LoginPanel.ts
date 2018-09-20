/**
 * 登录界面
 */
class LoginPanel extends BasePanel
{
	public weixinLoginBtn: eui.Button;
	public guestLoginBtn: eui.Button;
	public intranetAccountBtn: eui.Button;
	public intranetGuestBtn: eui.Button;
	public accountBtn: eui.Button;
	public telLoginBtn: eui.Button;
	public userBtn: eui.Button;
	public agreeCheckBox: eui.CheckBox;
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
		this.agreeCheckBox.selected = true;
		GameSetting.IsAgreeUserAgreement = this.agreeCheckBox.selected;
		this.guestLoginBtn.visible = false;
		this.intranetAccountBtn.visible = false;
		this.weixinLoginBtn.visible = false;
		this.accountBtn.visible = false;
		this.intranetGuestBtn.visible = false;
		this.telLoginBtn.visible = false;
		for (let val of loginTypeList)
		{
			if (val == ChannelLoginType.Qin)
			{
				this.telLoginBtn.visible = true;
				this.telLoginBtn.includeInLayout = true;
			}
			else if (val == ChannelLoginType.Guest)
			{
				this.guestLoginBtn.visible = true;
				this.guestLoginBtn.includeInLayout = true;
			}
			else if (val == ChannelLoginType.IntranetAccount)
			{
				this.intranetAccountBtn.visible = true;
				this.intranetAccountBtn.includeInLayout = true;
			}
			else if (val == ChannelLoginType.Weixin)
			{
				this.weixinLoginBtn.visible = true;
				this.weixinLoginBtn.includeInLayout = true;
			}
			else if (val == ChannelLoginType.Account)
			{
				this.accountBtn.visible = true;
				this.accountBtn.includeInLayout = true;
			}
			else if (val == ChannelLoginType.IntranetGuest)
			{
				this.intranetGuestBtn.visible = true;
				this.intranetGuestBtn.includeInLayout = true;
			}
		}
		this.versionLabel.text = VersionManager.getVersionStr();
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.weixinLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.weixinClickHandler, this);
		this.guestLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.guestLoginClickHandler, this);
		this.intranetAccountBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intranetAccountClickHandler, this);
		this.userBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.userBtnClickHandler, this);
		this.accountBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.accountBtnClickHandler, this);
		this.intranetGuestBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intranetGuestBtnClickHandler, this);
		this.telLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.telAccountBtnClickHandler, this);
		this.agreeCheckBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.agreeCheckBoxClickHandler, this);
		UIManager.addEventListener(UIModuleName.UserAngreementPanel, UIModuleEvent.CHANGE, this.outAngree, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.weixinLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.weixinClickHandler, this);
		this.guestLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.guestLoginClickHandler, this);
		this.intranetAccountBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.intranetAccountClickHandler, this);
		this.userBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.userBtnClickHandler, this);
		this.accountBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.accountBtnClickHandler, this);
		this.intranetGuestBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.intranetGuestBtnClickHandler, this);
		this.telLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.telAccountBtnClickHandler, this);
		this.agreeCheckBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.agreeCheckBoxClickHandler, this);
		UIManager.removeEventListener(UIModuleName.UserAngreementPanel, UIModuleEvent.CHANGE, this.outAngree, this);
	}
	private guestLoginClickHandler(event: egret.TouchEvent): void
	{
		SoundManager.playButtonEffect(event.target);
		UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.Guest);
	}
	private accountBtnClickHandler(event: egret.TouchEvent): void
	{
		SoundManager.playButtonEffect(event.target);
		UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.Account);
	}
	private intranetGuestBtnClickHandler(event: egret.TouchEvent): void
	{
		SoundManager.playButtonEffect(event.target);
		UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.IntranetGuest);
	}
	private telAccountBtnClickHandler(event: egret.TouchEvent): void
	{
		SoundManager.playButtonEffect(event.target);
		if (this.isAgreeUserAgreement())
		{
			UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.Qin);
		}
	}
	private intranetAccountClickHandler(event: egret.TouchEvent): void
	{
		SoundManager.playButtonEffect(event.target);
		UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.IntranetAccount);
	}
	private weixinClickHandler(event: egret.TouchEvent): void
	{
		SoundManager.playButtonEffect(event.target);
		if (this.isAgreeUserAgreement())
		{
			if (game.System.isWeb || ChannelManager.hasWeixin)
			{
				UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.Weixin);
			}
			else
			{
				UIManager.showFloatTips("请安装微信后重启本游戏！");
			}
		}
	}
	private userBtnClickHandler(event: egret.TouchEvent): void
	{
		SoundManager.playButtonEffect(event.target);
		UIManager.showPanel(UIModuleName.UserAngreementPanel);
	}
	/**
	 * 是否同意了用户协议
	*/
	private isAgreeUserAgreement(): boolean
	{
		if (GameSetting.IsAgreeUserAgreement)
		{
			return true;
		} else
		{
			UIManager.showFloatTips("用户必须同意用户协议才可进行登录！");
			return false;
		}
	}
	private agreeCheckBoxClickHandler(event: egret.TouchEvent)
	{
		SoundManager.playButtonEffect(event.target);
		GameSetting.IsAgreeUserAgreement = this.agreeCheckBox.selected;
	}
	private outAngree()
	{
		this.agreeCheckBox.selected = true;
		GameSetting.IsAgreeUserAgreement = this.agreeCheckBox.selected;
	}
}