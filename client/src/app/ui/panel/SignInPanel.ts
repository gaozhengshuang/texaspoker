/**
 * 签到面板
 */
class SignInPanel extends BaseActivityPanel
{
	public signInList: eui.List;
	public signIn_scroller: eui.Scroller;
	public threeDayLabel: eui.Label;
	public fiveDayLabel: eui.Label;
	public sevenDayLabel: eui.Label;
	public signInBtn: eui.Button;
	public haveSignedImg: eui.Label;
	public processGroup: eui.Group;
	public processScroller: eui.Scroller;

	public signImg3: eui.Image;
	public signImg5: eui.Image;
	public signImg7: eui.Image;
	/**
	 * 签到进度条单位
	 */
	private readonly _processUnit: number = 82;
	/**
	 * 进度条偏移量
	 */
	private readonly _processOffset: number = 19;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.SignInPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
		this.processScroller.viewport = this.processGroup;
		UIUtil.listRenderer(this.signInList, this.signIn_scroller, SignInGoldItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, false);
	}

	public init(appendData: any)
	{
		super.init(appendData);
		this.setDaysPrize(SignInDay.SignInThree, this.threeDayLabel, this.signImg3);
		this.setDaysPrize(SignInDay.SignInFive, this.fiveDayLabel, this.signImg5);
		this.setDaysPrize(SignInDay.SignInSeven, this.sevenDayLabel, this.signImg7);
		this.refreshUI();
	}
	/**
	 * 设置累计签到奖励
	 */
	private setDaysPrize(day: SignInDay, prizeLabel: eui.Label, prizeIcon: eui.Image)
	{
		let signinDef: SignInDefinition = SignInDefined.GetInstance().getDefinitionbySubId(day);
		if (signinDef)
		{
			let awardDef: table.IAwardDefine = table.AwardById[signinDef.pilePrize];
			if (awardDef && awardDef.RewardId)
			{
				prizeLabel.text = ActivityManager.signInHandler.getAwardDes(awardDef);
				let itemDef: ItemDefinition = ItemDefined.GetInstance().getDefinition(awardDef.RewardId[0]);
				if (itemDef)
				{
					prizeIcon.source = itemDef.icon + ResSuffixName.PNG;
				}
			}
		}
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.signInBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		ActivityManager.signInHandler.signInCompleteEvent.addListener(this.onSignInResult, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.signInBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		ActivityManager.signInHandler.signInCompleteEvent.removeListener(this.onSignInResult, this);
	}
	/**
	 * 点击签到
	*/
	public onClickHandler()
	{
		SoundManager.playEffect(MusicAction.buttonClick);
		ActivityManager.signInHandler.reqSignIn(this.activityInfo.id, this.activityInfo.step);
	}
	/**
	 * 签到成功刷新信息
	 */
	public onSignInResult()
	{
		this.refreshUI();
		this.onCloseBtnClickHandler(null);
	}

	protected onCloseBtnClickHandler(event: egret.TouchEvent)
	{
		super.onCloseBtnClickHandler(event);
	}
	/**
	 * 刷新签到信息
	*/
	protected refreshUI()
	{
		if (ActivityManager.signInHandler.isSignToday(this.activityInfo.id))
		{
			this.signInBtn.visible = false;
			this.haveSignedImg.visible = true;
		}
		else
		{
			this.signInBtn.visible = true;
			this.haveSignedImg.visible = false;
		}
		if (this.activityInfo.step == 0)
		{
			this.processScroller.width = 0;
		}
		else
		{
			this.processScroller.width = this._processUnit * (this.activityInfo.step - 1) + this._processOffset;
		}
		UIUtil.writeListInfo(this.signInList, this.activityInfo.subList, "subId");
	}
}