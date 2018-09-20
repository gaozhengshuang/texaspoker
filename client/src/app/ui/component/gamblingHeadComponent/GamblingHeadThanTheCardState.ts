/**
 * 比牌状态 后继状态---->等待下一局|站起
 */
class GamblingHeadThanTheCardState extends BaseGamblingHeadState
{
	private _point1: egret.Point;
	private _point2: egret.Point;
	private _point3: egret.Point;
	private _point4: egret.Point;
	public run(parms: any)
	{
		super.run(parms);
		if (this.context.bindData)
		{
			this.context.showMask(false);
			this.context.showBase();
			this.context.showHaveCardImg(false);
			this.context.showCardFace(true);
			qin.Console.log("比牌状态显示手牌");
			if (!this._point1)
			{
				this._point1 = new egret.Point(55, 72);
				this._point2 = new egret.Point(80, 72);
				this._point3 = new egret.Point(105, 72);
				this._point4 = new egret.Point(130, 72);
			}
			if (this.context.bindData)
			{
				//	qin.QinLog.log(this.context.bindData.userInfo.name + "在比牌！");
			}
			if (GamblingUtil.isOmaha)
			{
				this.context.cardAnimationSpt.runThanTheCardAnim(this._point1, this._point2, this._point3, this._point4);
			} else
			{
				this.context.cardAnimationSpt.runThanTheCardAnim(this._point1, this._point2);
			}
		}
	}
}