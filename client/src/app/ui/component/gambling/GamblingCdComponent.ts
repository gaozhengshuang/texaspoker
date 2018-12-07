/**
 * 操作CD组件
 */
class GamblingCdComponent extends BaseComponent<number>
{
	public cdLabel: eui.Label;

	private _phase: number = 0;
	private _maxPhase: number = 0;
	private _cdTime: number;

	private _timePhase1: number;
	private _timePhase2: number;

	private _isShock: boolean;

	private _armatureDisplay: dragonBones.EgretArmatureDisplay;

	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);

		let dragonbonesData = RES.getRes(ResFixedFileName.CD_ske);
		let textureData = RES.getRes(ResFixedFileName.CD_texturedata);
		let texture = RES.getRes(ResFixedFileName.CD_png);
		let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
		egretFactory.parseDragonBonesData(dragonbonesData);
		egretFactory.parseTextureAtlasData(textureData, texture);

		this._armatureDisplay = egretFactory.buildArmatureDisplay("cd");
		this._armatureDisplay.x = this._armatureDisplay.y = 45;
		this.addChild(this._armatureDisplay);
	}

	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
	}
	/**
	 * 如果没有必要，面板的所有事件移除需写在此方法内
	 */
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		game.Tick.removeFrameInvoke(this.tick, this);
		this.clearCdAnim();
	}
	public init(data: number)
	{
		if (data != undefined)
		{
			this._cdTime = data;
		}
		else
		{
			this._cdTime = 15;
		}
	}
	private _ratioTime: number;
	public start(startTime: number, isPush: boolean)
	{
		this._lastCdNum = 0;
		let nowTime: number = TimeManager.GetServerUtcSecondstamp();
		if (isPush) //推送过来的时间改变则相等
		{
			nowTime = startTime;
		}
		else
		{
			nowTime = TimeManager.GetServerUtcSecondstamp(); //断线重连的则用当前时间
		}

		let remainTime: number = nowTime - startTime;

		if (remainTime < 0)
		{
			remainTime = 0;
		}
		this._phase = Math.floor(remainTime * GameManager.stage.frameRate);
		this._maxPhase = GameManager.stage.frameRate * this._cdTime;

		this._timePhase1 = this._maxPhase / 3;
		this._timePhase2 = this._timePhase1 * 1.5;
		// this._armatureDisplay.animation.play();  //"Sprite", Math.floor(this._phase / 6)
		this._ratioTime = this._cdTime / 2;
		this._isShock = false;
		game.Tick.addFrameInvoke(this.tick, this);
		this.tick();
	}

	private tick()
	{
		this.showCdLabel();
		if (this._phase >= this._timePhase2 && this._phase < this._maxPhase)
		{
			if (GameSetting.shakeEnabled && GamblingUtil.getIsOnAction(GamblingManager.self) && !this._isShock)
			{
				ChannelManager.shake();
				this._isShock = true;
			}
		}
		this._phase += 1;
		if (this._phase > this._maxPhase)  //超时操作
		{
			game.Tick.removeFrameInvoke(this.tick, this);
			GamblingManager.TimeOutEvent.dispatch();
			this.clearCdAnim();
			this._armatureDisplay.animation.gotoAndStopByFrame("idle", 119);
		}
		else
		{
			let frame = Math.floor(this._phase / this._ratioTime);
			frame = Math.min(119, frame);
			this._armatureDisplay.animation.gotoAndStopByFrame("idle", frame);
		}
	}
	private clearCdAnim()
	{
		if (this._armatureDisplay)
		{
			this._armatureDisplay.animation.stop();
		}
	}
	private _lastCdNum;
	/**
	 * 显示CD改变
	 */
	private showCdLabel()
	{
		let num: number = Math.ceil((this._maxPhase - this._phase) / GameManager.stage.frameRate);
		if (this._lastCdNum != num)
		{
			this._lastCdNum = num;
			if (num <= 0)
			{
				this.cdLabel.text = "0";
			}
			else
			{
				this.cdLabel.text = game.DateTimeUtil.formatCountdown(num);
			}
		}
	}
}