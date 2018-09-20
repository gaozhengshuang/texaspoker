/**
 * 按钮位逻辑支持
 */
class GamblingPanelButtonPosSupport extends BaseGamblingPanelSupport
{
	private _moveAnim: CommonMoveToPointByNowPos;
	public initialize()
	{
		super.initialize();
		if (!this._moveAnim)
		{
			this._moveAnim = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.CommonMoveToPointByNowPos);
			this._moveAnim.setTarget(this.target.buttonPosFlagImg);
		}
		let index: number;
		this.showPitInfo(false);
		this.target.buttonPosFlagImg.visible = true;
	}
	public onEnable()
	{
		super.onEnable();
		GamblingManager.NextRoundStartEvent.addListener(this.onNextRoundStart, this);
	}
	public onDisable()
	{
		super.onDisable();
		GamblingManager.NextRoundStartEvent.removeListener(this.onNextRoundStart, this);
		game.Tick.RemoveTimeoutInvoke(this.delayMove, this);
	}
	/**
	 * 是否需要延迟
	 */
	private onNextRoundStart()
	{
		this.showPitInfo(true);
	}
	/**
	 * 清理相对位置
	 */
	private clearReleativePos(target: eui.Image)
	{
		target.top = undefined;
		target.bottom = undefined;
		target.horizontalCenter = undefined;
		target.verticalCenter = undefined;
	}

	private showPitInfo(isRun: boolean)
	{
		if (!GamblingManager.roomInfo)
		{
			return;
		}
		let pos: number = GamblingManager.roomInfo.buttonPos > 0 ? GamblingManager.roomInfo.buttonPos : 1;
		let pitInfo: GamblingPitInfo = this.target.getPitInfo(pos);
		if (pitInfo)
		{
			let p: egret.Point = new egret.Point();
			let w: number = pitInfo.headComponent.maxWidth;
			let h: number = pitInfo.headComponent.maxHeight;

			this.clearReleativePos(this.target.buttonPosFlagImg);
			this.clearReleativePos(this.target.buttonPosFlagImgSpt);

			if (pitInfo.headComponent.horizontalCenter != undefined && isNaN(pitInfo.headComponent.horizontalCenter) == false)
			{
				if (pitInfo.index == 1)
				{
					p.x = pitInfo.headComponent.horizontalCenter - pitInfo.headComponent.maxWidth / 2 - 30;
				}
				else
				{
					p.x = pitInfo.headComponent.horizontalCenter;
				}
				this.target.buttonPosFlagImgSpt.horizontalCenter = p.x;
			}
			if (pitInfo.headComponent.top != undefined && isNaN(pitInfo.headComponent.top) == false)
			{
				p.y = pitInfo.headComponent.top + h + 10;
				this.target.buttonPosFlagImgSpt.top = p.y;
			}
			else if (pitInfo.headComponent.bottom != undefined && isNaN(pitInfo.headComponent.bottom) == false)
			{
				if (pitInfo.index == 1)
				{
					p.y = pitInfo.headComponent.bottom + 20;
				}
				else
				{
					p.y = pitInfo.headComponent.bottom - 40;
				}
				this.target.buttonPosFlagImgSpt.bottom = p.y;
			}
			else if (pitInfo.headComponent.verticalCenter != undefined && isNaN(pitInfo.headComponent.verticalCenter) == false)
			{
				if (pitInfo.headComponent.verticalCenter > 0)
				{
					p.y = pitInfo.headComponent.verticalCenter + h + 10;
				}
				else
				{
					p.y = pitInfo.headComponent.verticalCenter + h + 10;
				}
				this.target.buttonPosFlagImgSpt.verticalCenter = p.y;
			}
			else
			{
				if (pitInfo.index == 1)
				{
					this.target.buttonPosFlagImgSpt.y = pitInfo.headComponent.y + pitInfo.headComponent.emptyGroup.height - 20;
				}
				else
				{
					this.target.buttonPosFlagImgSpt.y = pitInfo.headComponent.y + pitInfo.headComponent.emptyGroup.height + 67;
				}
			}
			if (isRun)
			{
				game.Tick.AddTimeoutInvoke(this.delayMove, GameManager.stage.frameRate, this);
			}
			else
			{
				this.moveFinish();
			}
		}
		else
		{
			game.Console.logError("显示按钮位信息失败！按钮位：" + pos);
		}
	}
	private delayMove()
	{
		this._moveAnim.run(this.target.buttonPosFlagImgSpt.x, this.target.buttonPosFlagImgSpt.y, this.moveFinish, this);
	}
	/**
	 * 移动完毕
	 */
	private moveFinish()
	{
		this.target.buttonPosFlagImg.horizontalCenter = this.target.buttonPosFlagImgSpt.horizontalCenter;
		this.target.buttonPosFlagImg.verticalCenter = this.target.buttonPosFlagImgSpt.verticalCenter;
		this.target.buttonPosFlagImg.top = this.target.buttonPosFlagImgSpt.top;
		this.target.buttonPosFlagImg.bottom = this.target.buttonPosFlagImgSpt.bottom;
		this.target.buttonPosFlagImg.y = this.target.buttonPosFlagImgSpt.y;
	}
}