/**
 * 等待下局开始面板
 */
class WaitNextRoundComponent extends BaseComponent<any>
{
	/**
	 * 旋转图片
	 */
	public rotateImg: eui.Image;
	public desLabel: eui.Label;
	private _rotateIndex: number;
	/**
	 * 时间速度
	 */
	private readonly _speed: number = 100;
	private readonly _rotation: number = 60;
	private _lastTime: number;
	private _posPointList: Array<egret.Point>;
	
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this._posPointList = new Array<egret.Point>();
		this._posPointList.push(
			new egret.Point(108.94, 64.73),
			new egret.Point(90.69, 74.23),
			new egret.Point(73.44, 63.48),
			new egret.Point(73.94, 42.73),
			new egret.Point(92.19, 33.48),
			new egret.Point(109.19, 43.73)
		);
		this.horizontalCenter = 0;
		this.verticalCenter = -150;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this._rotateIndex = 0;
		this._lastTime = 0;
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		qin.Tick.addFrameInvoke(this.update, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		qin.Tick.removeFrameInvoke(this.update, this);
	}
	private update()
	{
		if (this._lastTime == 0)
		{
			this._lastTime = egret.getTimer();
		}
		if (egret.getTimer() - this._lastTime >= this._speed)
		{
			this._lastTime = egret.getTimer();

			let tmpRotation: number = this._rotateIndex * this._rotation;
			let point: egret.Point = this._posPointList[this._rotateIndex];

			this.rotateImg.x = point.x;
			this.rotateImg.y = point.y;

			this.rotateImg.rotation = tmpRotation;

			let index: number = Math.ceil(this._rotateIndex / 2);
			let str: string = qin.StringConstants.Empty;
			for (let i: number = 0; i < index; i++)
			{
				str += qin.StringConstants.Dot;
			}
			this.desLabel.text = str;
			this._rotateIndex++;
			if (this._rotateIndex > 5)
			{
				this._rotateIndex = 0;
			}
		}
	}
	public show(flag: boolean)
	{
		if (flag)
		{
			this.onEnable(null);
			this.visible = true;
		}
		else
		{
			this._rotateIndex = 0;
			this._lastTime = 0;
			this.onDisable(null);
			this.visible = false;
		}
	}
}