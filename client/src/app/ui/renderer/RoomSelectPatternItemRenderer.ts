/**
 * 房间盲注选择项
 */
class RoomSelectPatternItemRenderer extends BaseItemRenderer<RoomSelectInfo>{
	public selectRoomGroup: eui.Group;
	public blindBtn0: eui.Button;
	public blindBtn1: eui.Button;
	public patternGroup: eui.Group;

	public patternBtn: eui.Button;

	public constructor()
	{
		super();
		this.skinName = UIRendererSkinName.RoomSelectPatternItemRenderer;
	}
	protected dataChanged(): void
	{
		super.dataChanged();

		this.patternBtn.touchChildren = this.blindBtn0.touchChildren = this.blindBtn1.touchChildren = this.patternBtn.touchChildren = false;

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);

		this.selectRoomGroup.visible = this.patternGroup.visible = false;

		if (this.bindData.pattern != -1)
		{
			this.patternBtn.label = PlayingFieldManager.getPatternName(this.bindData.pattern);
			this.patternGroup.visible = true;
		}
		else
		{
			this.selectRoomGroup.visible = true;
			if (this.bindData.blindInfoList && this.bindData.blindInfoList.length > 0)
			{
				for (let i: number = 0; i < 2; i++)
				{
					this["blindBtn" + i.toString()]["blindNumLabel"].text = game.MathUtil.formatNum(this.bindData.blindInfoList[i].sblind) + "/" + game.MathUtil.formatNum(this.bindData.blindInfoList[i].bblind);
				}
			}
		}
	}
	private clickHandler(event: egret.TouchEvent)
	{
		switch (event.target)
		{
			case this.patternBtn:
				PlayingFieldManager.PatternSelectEvent.dispatch({data:this.bindData, btn:event.target});
				break;
			case this.blindBtn0:
				SoundManager.playEffect(MusicAction.buttonClick);
				PlayingFieldManager.quicklyEnterGame(this.bindData.blindInfoList[0]);
				break;
			case this.blindBtn1:
				SoundManager.playEffect(MusicAction.buttonClick);
				PlayingFieldManager.quicklyEnterGame(this.bindData.blindInfoList[1]);
				break;
		}
	}
	private onDisable(event: egret.Event)
	{
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
	}
}