/**
 * 会员面板
 */
class VipPanel extends BasePanel
{
	//标签组
	public myVipGroup: eui.Group;
	public vipIntroduceGroup: eui.Group;

	public tab: TabComponent;

	//我的Vip
	public userHeadComp: CircleHeadComponent;
	public userNameLabel: eui.Label;//用户名
	public vipLevelLabel: eui.Label;//用户vip等级
	public yearVipImg: eui.Image;//年度会员标识
	public buyVipButton: GreenShadowButton;//续费会员 
	public vipProgressImg: eui.ProgressBar;//会员成长进度条
	public vipProgressLabel: eui.Label;//会员成长值
	public processBg: eui.Label;
	public vipExpLabel: eui.Label;//会员成长值
	public currentVipLevel: eui.Label;//会员等级
	public vipSpeedLabel: eui.Label;//会员成长速度
	public buyYearVip: eui.Label;//购买年会员
	public vipTimeLabel: eui.Label;//会员到期时间

	public imgGroup: eui.Group;
	public vipIntroduceScroller: eui.Scroller;
	public vipBg: eui.Image;
	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.VipPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
		let array = new Array<eui.Group>(this.myVipGroup, this.vipIntroduceGroup);
		this.tab.build(TabComponent.CreatData(["我的VIP", "VIP介绍"], array, TabButtonType.SmallOf2));
		this.tab.isTween = false;
		this.vipIntroduceScroller.viewport = this.imgGroup;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this.tab.init(0);
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
		this.userHeadComp.init(UserManager.userInfo);
		this.userNameLabel.text = UserManager.userInfo.name;
		this.refreshVipInfo();
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
		this.tab.tabChangeEvent.addListener(this.onBarItemTap, this);
		VipManager.vipUpgradeEvent.addListener(this.refreshVipInfo, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
		this.tab.tabChangeEvent.removeListener(this.onBarItemTap, this);
		VipManager.vipUpgradeEvent.removeListener(this.refreshVipInfo, this);
	}

	private refreshVipInfo()
	{
		this.vipLevelLabel.text = "VIP" + UserManager.userInfo.vipLevel.toString();
		switch (UserManager.userInfo.vipType)
		{
			case VipType.NoVip:
				this.yearVipImg.visible = false;
				this.buyYearVip.visible = true;
				this.buyVipButton.label = "开通会员";
				this.vipTimeLabel.visible = false;
				break;
			case VipType.Vip:
				this.yearVipImg.visible = false;
				this.buyYearVip.visible = true;
				this.buyVipButton.label = "续费会员";
				this.vipTimeLabel.visible = true;
				this.vipTimeLabel.text = game.DateTimeUtil.formatDate(new Date(VipManager.GetVipTime() * 1000), game.DateTimeUtil.Format_Standard_Date);
				break;
			case VipType.YearVip:
				this.yearVipImg.visible = true;
				this.buyYearVip.visible = false;
				this.buyVipButton.label = "续费会员";
				this.vipTimeLabel.visible = true;
				this.vipTimeLabel.text = game.DateTimeUtil.formatDate(new Date(VipManager.GetVipTime() * 1000), game.DateTimeUtil.Format_Standard_Date);
				break;
		}
		this.vipProgressImg.width = 560;
		this.vipProgressImg.width *= game.MathUtil.clamp(parseFloat((UserManager.userInfo.vipExp / 6000).toFixed(2)), 0, 1);
		this.vipProgressLabel.text = UserManager.userInfo.vipExp.toString();
		this.vipProgressLabel.x = this.vipProgressImg.width;
		this.processBg.x = this.vipProgressImg.width;
		this.vipExpLabel.text = UserManager.userInfo.vipExp.toString() + "点";
		this.currentVipLevel.text = UserManager.userInfo.vipLevel.toString();
		this.vipSpeedLabel.text = UserManager.userInfo.vipSpeed + "点";

	}

	/**
	 * 点击面板按钮事件处理
	*/
	private clickHandler(event: egret.TouchEvent)
	{
		SoundManager.playButtonEffect(event.target);
		if (event.target == this.buyVipButton || event.target == this.buyYearVip)
		{
			JumpUtil.JumpToShopping(ShopGroupIndex.Vip, UIModuleName.VipPanel);
		}
	}

	private onBarItemTap(index: number)
	{
		if (index == 1)
		{
			if (!this.vipBg.texture)
			{
				UIUtil.loadBg(ResFixedFileName.vipBg, this.vipBg);
			}
			this.vipIntroduceScroller.stopAnimation();
			this.vipIntroduceScroller.viewport.scrollV = 0;
		}
	}
}