/**
 * 跑马灯界面
 */
class MarqueePanel extends BasePanel
{
	public bgImg: eui.Image;
	public textLabel: eui.Label;
	public scroller: eui.Scroller;
	public textGroup: eui.Group;
	public marqueeGroup: eui.Group;
	private move: egret.Tween;

	public constructor()
	{
		super();
		this.isTween = false;
		this.panelAlignType = PanelAlignType.Center_Top;
		this.layer = UILayerType.Tips;

		this.setTouchChildren(false);
		this.setTouchEnable(false);
		this.setSkinName(UIModuleName.MarqueePanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		this.scroller.viewport = this.textGroup;
		super.onAwake(event);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this.setMarqueePos();
		egret.Tween.removeTweens(this.scroller.viewport);
		if (appendData)
		{
			this.textLabel.text = appendData;
		}
		if (!this.panelData)
		{
			UIManager.showFloatTips("跑马灯内容为空！");
			this.onTweenGroupComplete();
		}
	}
	protected onRender(event: egret.Event)
	{
		ChatManager.isOnMessage = true;
		this.move = new egret.Tween(this.scroller.viewport, null, null);
		let duration: number = this.textLabel.width * 20;
		let targetPos: number = this.textLabel.width;
		this.scroller.viewport.scrollH = -this.bgImg.width;
		if (duration < 10000)
		{
			duration = 10000;
		}
		this.move.to({ scrollH: targetPos }, duration).call(this.onTweenGroupComplete, this);
		this.move.play();
		// qin.QinLog.log("this.textLabel.textWidth", targetPos);
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		UIUtil.hideScrollerBar(this.scroller, true, true);
		SceneManager.onSwitchCompleteEvent.addListener(this.setMarqueePos, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		ChatManager.isOnMessage = false;
		egret.Tween.removeTweens(this.scroller.viewport);
		SceneManager.onSwitchCompleteEvent.removeListener(this.setMarqueePos, this);
	}
	private onTweenGroupComplete()
	{
		egret.Tween.removeTweens(this.textGroup);
		this.onCloseBtnClickHandler(null);
		ChatManager.nextMarqueeMessage();
	}
	/**
	 * 根据场景设计跑马灯的位置
	*/
	private setMarqueePos()
	{
		if (SceneManager.sceneType == SceneType.Game || SceneManager.sceneType == SceneType.HundredWar)
		{
			this.top = 0;
			if (SceneManager.sceneType == SceneType.Game)
			{
				let targetPanel: GamblingPanel;
				targetPanel = UIManager.panelDict.getValue(UIModuleName.GamblingPanel) as GamblingPanel;
				if (targetPanel)
				{
					this.marqueeGroup.horizontalCenter = targetPanel.gameGroup.x;
				}
			} else if (SceneManager.sceneType == SceneType.HundredWar)
			{
				let targetPanel: HundredWarRoomPanel;
				targetPanel = UIManager.panelDict.getValue(UIModuleName.HundredWarRoomPanel) as HundredWarRoomPanel;
				if (targetPanel)
				{
					this.marqueeGroup.horizontalCenter = targetPanel.gameGroup.x;
				}
			}
		} else
		{
			this.top = 150;
			this.marqueeGroup.horizontalCenter = 0;
		}
	}
	/**
	 * 移动
	*/
	public onMoveing(x: number)
	{
		this.marqueeGroup.horizontalCenter = x;
	}
	/**
	 * 移动结束
	*/
	public onMoveEnd(data: any)
	{
		if (data.showAnimate)
		{
			this.run(data.num);
		} else
		{
			this.marqueeGroup.horizontalCenter = data.num;
		}
	}
	public run(num: number)
	{
		let tween: egret.Tween = egret.Tween.get(this.marqueeGroup);
		tween.to({ horizontalCenter: num }, 200, egret.Ease.sineIn).call(this.runOver, this);
		tween.play();
	}
	public runOver()
	{
		egret.Tween.removeTweens(this.marqueeGroup);
	}
}