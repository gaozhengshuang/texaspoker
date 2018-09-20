/**
 * 引导滑动条处理器
 */
class GuideSlideStepProcess extends BaseGuideStepProcess
{
	private _slider: eui.SliderBase;
	private _thumb: eui.UIComponent;
	private _posX: number;
	private _posY: number;
	public run()
	{
		super.run();
		if (!this.stepDef)
		{
			return;
		}
		let panel: BasePanel = UIManager.getPanel(this.stepDef.panelName);
		if (!panel)
		{
			qin.Console.logError("引导滑动条处理异常！未找到显示的面板，面板名：" + this.stepDef.panelName);
			return;
		}
		if (this.stepDef.component)
		{
			this._slider = panel[this.stepDef.component[0]];
			if (!this._slider)
			{
				qin.Console.logError("引导滑动条处理异常！未找到显示的滑动条，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
				return;
			}
			if (this._slider instanceof eui.SliderBase == false)
			{
				qin.Console.logError("引导滑动条处理异常！组件类型不是滑动条：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
				return;
			}
			this._thumb = this._slider[this.stepDef.component[1]];
			this._slider.addEventListener(egret.Event.CHANGE, this.changeHandler, this);
			this._thumb.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.confirmAddChips, this);
			this._thumb.addEventListener(egret.TouchEvent.TOUCH_END, this.confirmAddChips, this);
			this.changeHandler(null);
		}
		else
		{
			qin.Console.logError("引导滑动条处理异常！未找到显示的组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
		}
	}
	private confirmAddChips(event: egret.TouchEvent)
	{
		if (event.type == egret.TouchEvent.TOUCH_BEGIN)
		{
			this._posX = event.stageX;
			this._posY = event.stageY;
		}
		else if (event.type == egret.TouchEvent.TOUCH_END)
		{
			if (event.stageX == this._posX && event.stageY == this._posY)
			{
				if (this._slider.value == this.definition.stepParams.end.limit)
				{
					this.removeEvents();
					UIManager.closePanel(this.stepDef.panelName);
					if (this.definition.stepParams.end.goto == 1)
					{
						if (this.parent)
						{
							this.parent.complete();
						}
					}
				}
			}
		}
	}
	private changeHandler(event: egret.Event)
	{
		GuideExecutor.clearChildStepProcess();
		if (this.definition.stepParams.start.limit == this._slider.value)
		{
			GuideExecutor.runChildStep(this.definition.stepParams.start);
		}
		if (this.definition.stepParams.end.limit == this._slider.value)
		{
			GuideExecutor.runChildStep(this.definition.stepParams.end);
		}
	}
	public complete()
	{
		super.complete();
	}
	private removeEvents()
	{
		if (this._slider)
		{
			this._slider.removeEventListener(egret.Event.CHANGE, this.changeHandler, this);
		}
		if (this._thumb)
		{
			this._thumb.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.confirmAddChips, this);
			this._thumb.removeEventListener(egret.TouchEvent.TOUCH_END, this.confirmAddChips, this);
		}
	}
	public clear()
	{
		this.removeEvents();
		this._slider = this._thumb = undefined;
		super.clear();
	}
}