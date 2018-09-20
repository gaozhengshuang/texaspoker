/**
 * 成就renderer
 */
class AchievementItemRenderer extends BaseItemRenderer<AchievementInfo>
{
	public itemImg: eui.Image;
	public numImg: ImageNumComponent;
	public achieveMask: eui.Image;
	public achieveGroup: eui.Group;
	public bg: eui.Image;
	private _numContentInfo: NumContentInfo;
	private readonly _width = 90;
	public constructor()
	{
		super();
		this._numContentInfo = new NumContentInfo();
		this._numContentInfo.gap = -8;
		this._numContentInfo.setImgWidHei(37, 47, 49, 47);
		this._numContentInfo.limtiWidth = 150;
		this._numContentInfo.preFix = ResPrefixName.Achieve_Num;
		this.skinName = UIRendererSkinName.AchievementItemRenderer;
	}
	protected dataChanged()
	{
		super.dataChanged();
		this.scaleX = this.scaleY = this._width / this.width;
		if (InfoUtil.checkAvailable(this.bindData))
		{
			this.itemImg.source = this.bindData.definition.icon + ResSuffixName.PNG;
			this._numContentInfo.content = qin.MathUtil.formatNum(this.bindData.definition.para1);
			this.numImg.init(this._numContentInfo);
			this.refreshiUI();
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}
	}

	private refreshiUI()
	{
		let userInfo: UserInfo;
		if (UserManager.otherUserInfo == null || UserManager.otherUserInfo.roleId == UserManager.userInfo.roleId)
		{
			userInfo = UserManager.userInfo;
		}
		else
		{
			userInfo = UserManager.otherUserInfo;
		}
		this.achieveGroup.visible = true;
		this.touchEnabled = true;
		this.touchChildren = true;
		if (this.bindData.isComplete)
		{
			this.achieveMask.visible = false;
		}
		else if (this.bindData.definition.preId == 0)
		{
			this.achieveMask.visible = true;
		}
		else if (AchievementManager.getAchieveInfoById(userInfo.allAchieveList, this.bindData.definition.preId).isComplete)
		{
			this.achieveMask.visible = true;
		}
		else
		{
			this.achieveGroup.visible = false;
			this.touchEnabled = false;
			this.touchChildren = false;
		}
	}

	private info: AchievementInfo;
	public init(info: AchievementInfo, width: number)
	{
		this.info = info;
		this.itemImg.source = info.definition.icon + ResSuffixName.PNG;
		this._numContentInfo.content = qin.MathUtil.formatNum(info.definition.para1);
		this.numImg.init(this._numContentInfo);
		this.achieveGroup.visible = true;
		this.achieveMask.visible = false;
		this.bg.visible = false;
		this.scaleX = this.scaleY = width / this.width;
	}
	private onClick(event: egret.TouchEvent)
	{
		SoundManager.playEffect(MusicAction.buttonClick);
		UIManager.showPanel(UIModuleName.AchievementItemPanel, this.bindData);
	}
	public onDisable(event: egret.Event)
	{
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}
}