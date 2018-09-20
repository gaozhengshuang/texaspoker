/**
 * 引导玩法
 */
class GamblingPanelGuidePlayWaySupport extends BaseGamblingPanelSupport
{
	private _boardCardParent: egret.DisplayObjectContainer;
	private _childIndexList: Array<number>;

	public initialize()
	{
		super.initialize();
		let state: GamblingPanelGuidePlayWayState = this.target.panelState;
		let component: GamblingGuidePlayWayComponent = state.getCompoent<GamblingGuidePlayWayComponent>(GamblingGuidePlayWayComponent);
		component.guidePlayWayGroup.visible = false;
	}

	public run()
	{
		let state: GamblingPanelGuidePlayWayState = this.target.panelState;
		let component: GamblingGuidePlayWayComponent = state.getCompoent<GamblingGuidePlayWayComponent>(GamblingGuidePlayWayComponent);
		component.guidePlayWayGroup.visible = true;

		this._boardCardParent = this.target.cardList[0].parent;
		this._childIndexList = new Array<number>();

		for (let i: number = 0; i < this.target.cardList.length; i++) //将公共牌拿到引导组显示，同时记录在原父对象中的索引
		{
			let child: egret.DisplayObject = this.target.cardList[i];
			this._childIndexList.push(this._boardCardParent.getChildIndex(child));
			component.guidePlayWayGroup.addChild(child);
		}

		let anmation1: AlphaChangeAnimation = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.Alpha);
		anmation1.target = component.guidePlayWayBg; //灰色背景
		anmation1.run(0, 0.5, 0, 500);

		let anmation2: AlphaChangeAnimation = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.Alpha);
		anmation2.target = component.guidePlayWayFlopGroup; //翻牌
		anmation2.run(0, 1, 500);

		let anmation3: AlphaChangeAnimation = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.Alpha);
		anmation3.target = component.guidePlayTurnLabel; //转牌
		anmation3.run(0, 1, 2000);

		let anmation4: AlphaChangeAnimation = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.Alpha);
		anmation4.target = component.guidePlayRiverLabel; //河牌
		anmation4.run(0, 1, 3500, 1000, () =>
		{
			anmation1.run(0.5, 0, 2000);
			anmation2.run(1, 0, 2000);
			anmation3.run(1, 0, 2000);
			anmation4.run(1, 0, 2000, 1000, this.onDisable, this);
		}, this);
		// anmation = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.Alpha);
		// anmation.target = state.component.guidePlayWayGroup;  //引导隐藏
		// anmation.run(1, 0, 7500, 1000, this.onDisable, this);
	}
	public onEnable()
	{
		super.onEnable();
	}
	public onDisable()
	{
		super.onDisable();
		let state: GamblingPanelGuidePlayWayState = this.target.panelState;
		let component: GamblingGuidePlayWayComponent = state.getCompoent<GamblingGuidePlayWayComponent>(GamblingGuidePlayWayComponent);
		component.guidePlayWayGroup.visible = false;
		if (this._childIndexList && this._boardCardParent)
		{
			for (let i: number = 0; i < this.target.cardList.length; i++) //改阶段引导进行完毕再讲公共牌显示回去
			{
				let child: egret.DisplayObject = this.target.cardList[i];
				this._boardCardParent.addChildAt(child, this._childIndexList[i]);
			}
		}
		else
		{
			qin.Console.logError("引导玩法执行异常！");
		}
	}
}