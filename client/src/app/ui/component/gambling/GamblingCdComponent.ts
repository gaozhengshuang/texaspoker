/**
 * 操作CD组件
 */
class GamblingCdComponent extends BaseComponent<number>
{
	public cdLabel: eui.Label;

	private _shape: egret.Shape;
	private _angle: number = 0;
	private _phase: number = 0;
	private _maxPhase: number = 0;
	private _cdTime: number;
	private _angleStep: number;
	private _timePhase1: number;
	private _timePhase2: number;

	private _color: number = 0x00ff00;
	private _colorStep1: number;
	private _colorChangeStep1: number;
	private _colorStep2: number;
	private _colorChangeStep2: number;

	private _totalAngle: number = 359;

	private _isShock: boolean;

	private static _cdImgList: Array<egret.Shape> = new Array<egret.Shape>();

	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this._shape = new egret.Shape();
		this.addChild(this._shape);
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
		qin.Tick.removeFrameInvoke(this.tick, this);
		this._shape.graphics.clear();
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
	public start(startTime: number, isPush: boolean)
	{
		this._shape.graphics.clear();
		let nowTime: number = TimeManager.GetServerUtcTimestamp();
		if (isPush) //推送过来的时间改变则相等
		{
			nowTime = startTime;
		}
		else
		{
			nowTime = TimeManager.GetServerUtcTimestamp(); //断线重连的则用当前时间
		}

		let remainTime: number = nowTime - startTime;

		if (remainTime < 0)
		{
			remainTime = 0;
		}
		this._phase = Math.floor(remainTime * GameManager.stage.frameRate);
		this._shape.rotation = -90;
		this._maxPhase = GameManager.stage.frameRate * this._cdTime;
		this._angleStep = 360 / this._maxPhase;
		this._angle = this._angleStep * this._phase;
		this._timePhase1 = this._maxPhase / 3;
		this._timePhase2 = this._timePhase1 * 1.5;

		this.setColorData();
		this._isShock = false;
		qin.Tick.addFrameInvoke(this.tick, this);
		this.tick();
	}
	private setColorData()
	{
		this._color = 0x00ff00;
		this._colorChangeStep1 = Math.floor((this._timePhase2 - this._timePhase1) / 0xff);
		this._colorChangeStep2 = Math.floor((this._maxPhase - this._timePhase2) / 0xff);
		if (this._colorChangeStep1 < 1)
		{ //CD过慢，要步长几次变一次色
			this._colorChangeStep1 = 1;
		}
		if (this._colorChangeStep2 < 1)
		{
			this._colorChangeStep2 = 1;
		}

		this._colorStep1 = Math.ceil(0xff / (this._timePhase2 - this._timePhase1));
		this._colorStep2 = Math.ceil(0xff / (this._maxPhase - this._timePhase2));
		if (this._colorStep1 < 1) //变一次色的步长值
		{
			this._colorStep1 = 1;
		}
		if (this._colorStep2 < 1)
		{
			this._colorStep2 = 1;
		}

		if (this._phase >= this._timePhase1 && this._phase < this._timePhase2)
		{
			this.calculateColor(0, Math.ceil(Math.min(this._phase / this._timePhase2) * 0xff)); //立即设置颜色
		}
		else if (this._phase >= this._timePhase2)
		{
			this.calculateColor(0, 0xff); //绿到黄
			this.calculateColor(1, Math.ceil(Math.min(1, this._phase / this._maxPhase) * 0xff)); //立即设置颜色
		}
	}
	protected rendererStart(event: egret.Event)
	{
		super.rendererStart(event);
		egret.callLater(() =>
		{
			this._shape.x = this.width / 2 + 2;
			this._shape.y = this.height / 2 + 2;
		}, this);
	}
	private tick()
	{
		this.showCdLabel();
		this._angle = this._angleStep * this._phase;
		if (this._angle >= this._totalAngle)
		{
			this._angle = this._totalAngle;
		}
		this.mgraphics(this._angle);

		if (this._phase >= this._timePhase1 && this._phase < this._timePhase2)
		{
			if (this._phase % this._colorChangeStep1 == 0)
			{
				this.calculateColor(0, this._colorStep1); //绿到黄
			}
		}
		else if (this._phase >= this._timePhase2 && this._phase < this._maxPhase)
		{
			if (this._phase % this._colorChangeStep2 == 0)
			{
				this.calculateColor(1, this._colorStep2); //黄到红
			}
			if (GameSetting.shakeEnabled && GamblingUtil.getIsOnAction(GamblingManager.self) && !this._isShock)
			{
				ChannelManager.shake();
				this._isShock = true;
			}
		}
		this._phase += 1;
		if (this._phase > this._maxPhase)
		{
			//超时操作
			qin.Tick.removeFrameInvoke(this.tick, this);
			this.mgraphics(this._totalAngle);
			GamblingManager.TimeOutEvent.dispatch();
		}
	}
	/**
	 * 显示CD改变
	 */
	private showCdLabel()
	{
		let num: number = Math.ceil((this._maxPhase - this._phase) / GameManager.stage.frameRate);
		if (num <= 0)
		{
			this.cdLabel.text = "0";
		}
		else
		{
			this.cdLabel.text = qin.DateTimeUtil.formatCountdown(num);
		}
	}
	private _lastShape: egret.Shape;
	private mgraphics(angle: number): void
	{
		this._shape.graphics.clear();
		this._shape.graphics.lineStyle(5, this._color, 1);
		this._shape.graphics.drawArc(0, 0, 43, 0, angle * Math.PI / 180, true);
		this._shape.graphics.endFill();



		// console.log("angle-----:" + angle);
		// let shape: egret.Shape = new egret.Shape();
		// shape.rotation = -90;
		// shape.x = this.width / 2 + 2;
		// shape.y = this.height / 2 + 2;
		// shape.graphics.clear();
		// shape.graphics.lineStyle(5, this._color, 1);
		// shape.graphics.drawArc(0, 0, 43, 0, angle * Math.PI / 180, true);
		// shape.graphics.endFill();
		// shape.cacheAsBitmap = true;
		// shape.name = "shape" + angle;
		// if (this._lastShape != null && this._lastShape.parent)
		// {
		// 	this._lastShape.parent.removeChild(this._lastShape);
		// }
		// this._lastShape = shape;
		// this.addChild(shape);
		// if (angle == this._totalAngle)
		// {
		// 	GamblingCdComponent._cdImgList.push(shape);
		// }
		// else
		// {
		// 	GamblingCdComponent._cdImgList.push(shape);
		// }

	}
	private calculateColor(phase: number, step: number)
	{
		let tmp: number;
		let tmp2: number;
		if (phase == 0)
		{
			tmp = this._color >> 16 & 0xff;
			tmp += step;
			if (tmp > 0xff)
			{
				tmp = 0xff;
			}
			tmp2 = this._color >> 8 & 0xff;
			this._color = tmp << 16 | tmp2 << 8;
		}
		else if (phase == 1)
		{
			tmp = this._color >> 8 & 0xff;
			tmp -= step;
			if (tmp < 0)
			{
				tmp = 0;
			}
			tmp2 = this._color >> 16 & 0xff;
			this._color = tmp2 << 16 | tmp << 8;
		}
	}
}