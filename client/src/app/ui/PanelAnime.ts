/**
 * 全屏面板的入场动画
 */
class PanelAnime
{
	private anmGroup: eui.Group;
	private anmGroup1: eui.Group;
	public isEnterOver: boolean;
	private titleGroup: eui.Group;

	public panel: BasePanel;

	constructor(panel: BasePanel)
	{
		this.panel = panel;
		this.anmGroup = this.panel["anmGroup"];
		this.anmGroup1 = this.panel["anmGroup1"];
		this.titleGroup = this.panel["titleGroup"];
		//this.isCloseButtonTween = true;
	}

	public onEnable(): void
	{
		this.setEnterAnime();
	}
	public onDisable(): void
	{
		this.isEnterOver = false;
	}

	private setEnterAnime()
	{
		this.isEnterOver = false;
		this.removeAllAnime();
		// if (this.panel.grayMask)
		// {
		// 	egret.Tween.removeTweens(this.panel.grayMask);
		// }
		this.resetPos();
		egret.Tween.get(this.anmGroup).set({ top: -100 }).to({ top: 0 }, 260);
		egret.Tween.get(this.anmGroup1).set({ y: this.panel.height }).to({ y: 100 }, 260);
		egret.Tween.get(this.titleGroup).set({ top: -100 }).wait(300).to({ top: 0 }, 200).call(this.onEnterAnmComplete.bind(this));
	}

	private onEnterAnmComplete()
	{
		this.isEnterOver = true;
	}
	public onCloseBtnClickHandler(event: egret.TouchEvent): void
	{
		if (event)
		{
			if (event.target instanceof eui.Button)
			{
				SoundManager.playEffect(MusicAction.close);
			}
		}
		if (!this.panel.prevPanelName || this.panel.prevPanelName == UIModuleName.GameHallPanel)
		{
			this.showPrePanelName();
		}

		this.removeAllAnime();
		for (let i: number = 0; i < this.panel.numChildren; i++)
		{
			let displayObj: egret.DisplayObject = this.panel.getChildAt(i);
			let enter: egret.Tween = egret.Tween.get(displayObj);
			displayObj.x = 0;
			if (displayObj === this.anmGroup1)
			{
				enter.to({ x: -720 }, 200, egret.Ease.circOut).call(this.onCloseAnmComplete.bind(this));
			}
			else
			{
				enter.to({ x: -720 }, 200, egret.Ease.circOut);
			}
		}
	}

	private resetPos()
	{
		for (let i: number = 0; i < this.panel.numChildren; i++)
		{
			let displayObj: egret.DisplayObject = this.panel.getChildAt(i);
			displayObj.x = 0;
		}
	}
	private removeAllAnime()
	{
		egret.Tween.removeTweens(this.anmGroup);
		egret.Tween.removeTweens(this.anmGroup1);
		egret.Tween.removeTweens(this.titleGroup);
	}
	private showPrePanelName()
	{
		if (!this.panel.prevPanelName)
		{
			UIManager.showPanel(UIModuleName.GameHallPanel);
		}
		if (this.panel.prevPanelName != UIModuleName.None)
		{
			UIManager.showPanel(this.panel.prevPanelName);
		}
	}
	private onCloseAnmComplete()
	{
		UIManager.closePanel(this.panel);
	}
}