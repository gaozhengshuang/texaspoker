/**
 * 设置面板
 */
class SetPanel extends BasePanel
{
	public bgSoundTog: eui.ToggleButton;
	public soundEffectTog: eui.ToggleButton;
	public shakeTog: eui.ToggleButton;
	public userNameLabel: eui.Label;
	public reLoginLabel: eui.Label;
	public forum: eui.Label;
	public QQ: eui.Label;
	public customerService: eui.Label;
	public forumTitle: eui.Label;
	public QQTitle: eui.Label;
	public customerServiceTitle: eui.Label;
	public aboutLabel: eui.Label;

	public verticalGroup: eui.Group;
	public shockGroup: eui.Group;

	public autoVocieTog: eui.ToggleButton;
	public autoVoiceGroup: eui.Group;

	public resizeScroller: eui.Scroller;
	public resizeGroup: eui.Group;

	private _anime: PanelAnime;
	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.SetPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this._anime = new PanelAnime(this);
		this.maskAlpha = 0;
		this.isCloseButtonTween = true;
		if (game.System.isMicro)
		{
			this.autoVoiceGroup.visible = true;;
			this.verticalGroup.addChildAt(this.autoVoiceGroup, 5);
		}
		else
		{
			if (this.autoVoiceGroup.parent)
			{
				this.autoVoiceGroup.parent.removeChild(this.autoVoiceGroup);
			}
		}
		if (game.System.isMicro || game.System.isWebVibrate)
		{
			this.verticalGroup.addChildAt(this.shockGroup, 5);
		}
		else
		{
			if (this.shockGroup.parent)
			{
				this.shockGroup.parent.removeChild(this.shockGroup);
			}
		}
		this.resizeScroller.viewport = this.verticalGroup;
		UIManager.pushResizeScroller(this.resizeScroller, 1130);
		UIManager.pushResizeGroup(this.resizeGroup);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this.bgSoundTog.selected = SoundManager.bgEnabled;
		this.soundEffectTog.selected = SoundManager.effectEnabled;
		this.shakeTog.selected = GameSetting.shakeEnabled;
		this.autoVocieTog.selected = GameSetting.autoVoiceEnabled;
		let def: TextDefinition;
		def = TextDefined.GetInstance().getDefinition(TextFixedId.Forum);
		if (def)
		{
			this.forum.text = def.text;
			this.forumTitle.text = def.title;
		}
		def = TextDefined.GetInstance().getDefinition(TextFixedId.QQ);
		if (def)
		{
			this.QQ.text = def.text;
			this.QQTitle.text = def.title;
		}
		def = TextDefined.GetInstance().getDefinition(TextFixedId.CustomerService);
		if (def)
		{
			this.customerService.text = def.text;
			this.customerServiceTitle.text = def.title;
		}
		if (UserManager.userInfo)
		{
			this.userNameLabel.text = UserManager.userInfo.name;
		}
		this.aboutLabel.text = VersionManager.getVersionStr();
	}

	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this._anime.onEnable();
		this.bgSoundTog.addEventListener(egret.Event.CHANGE, this.closeBgSoundHandler, this);
		this.soundEffectTog.addEventListener(egret.Event.CHANGE, this.closeSoundEffectHandler, this);
		this.reLoginLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reLoginClickHandler, this);
		this.shakeTog.addEventListener(egret.Event.CHANGE, this.changeShake, this);
		this.autoVocieTog.addEventListener(egret.Event.CHANGE, this.changeAutoVoice, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this._anime.onDisable();
		this.bgSoundTog.removeEventListener(egret.Event.CHANGE, this.closeBgSoundHandler, this);
		this.soundEffectTog.removeEventListener(egret.Event.CHANGE, this.closeSoundEffectHandler, this);
		this.reLoginLabel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reLoginClickHandler, this);
		this.shakeTog.removeEventListener(egret.Event.CHANGE, this.changeShake, this);
		this.autoVocieTog.removeEventListener(egret.Event.CHANGE, this.changeAutoVoice, this);
	}
	private closeBgSoundHandler(event: egret.Event)
	{
		SoundManager.playEffect(MusicAction.buttonClick);
		SoundManager.bgEnabled = this.bgSoundTog.selected;
	}
	private closeSoundEffectHandler(event: egret.Event)
	{
		SoundManager.playEffect(MusicAction.buttonClick);
		SoundManager.effectEnabled = this.soundEffectTog.selected;
	}
	private reLoginClickHandler(event: egret.TouchEvent)
	{
		SoundManager.playEffect(MusicAction.buttonClick);
		ChannelManager.logout();
	}

	private changeShake(event: egret.Event)
	{
		SoundManager.playEffect(MusicAction.buttonClick);
		GameSetting.shakeEnabled = this.shakeTog.selected;
	}

	private changeAutoVoice(event: egret.Event)
	{
		SoundManager.playEffect(MusicAction.buttonClick);
		GameSetting.autoVoiceEnabled = this.autoVocieTog.selected;
	}
	protected onCloseBtnClickHandler(event: egret.TouchEvent): void
	{
		this._anime.onCloseBtnClickHandler(event);
	}
}