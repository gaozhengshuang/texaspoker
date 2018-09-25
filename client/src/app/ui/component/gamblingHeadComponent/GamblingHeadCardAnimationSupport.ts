/**
 * 头像组件动画
 */
class GamblingHeadCardAnimationSupport
{
	private _actionList: game.Map<string, BaseAnimation<any>>;
	/**
 	* 本家手牌Y坐标
 	*/
	// private readonly _selfY: number = 300;
	public context: GamblingHeadComponent;
	public constructor(target: GamblingHeadComponent)
	{
		this.context = target;
	}
	public clear() //清理动画
	{
		if (this._actionList)
		{
			this._actionList.foreach(this.clearAnimation, this);
		}
	}
	private clearAnimation(key: string, item: BaseAnimation<any>)
	{
		item.clear();
	}
	/**
 	* 发牌跑自己的手牌动画
	*/
	public runSelfCard(callback: Function, thisObject: any)
	{
		if (GamblingUtil.isOmaha)
		{
			let run: SelfCard1Appear = <SelfCard1Appear>this.getAnimation(AnimationType.OmahaSelfCard1Appear, this.context.cardFace1, 1);
			let run2: SelfCard2Appear = <SelfCard2Appear>this.getAnimation(AnimationType.OmahaSelfCard2Appear, this.context.cardFace2, 2);
			let run3: SelfCard2Appear = <SelfCard2Appear>this.getAnimation(AnimationType.OmahaSelfCard3Appear, this.context.cardFace3, 3);
			let run4: SelfCard2Appear = <SelfCard2Appear>this.getAnimation(AnimationType.OmahaSelfCard4Appear, this.context.cardFace4, 4);
			run4.callBack = new game.Delegate(callback, thisObject);
			run.run(true);
			run2.run(true);
			run3.run(true);
			run4.run(true);
		} else
		{
			let run: SelfCard1Appear = <SelfCard1Appear>this.getAnimation(AnimationType.SelfCard1Appear, this.context.cardFace1, 1);
			let run2: SelfCard2Appear = <SelfCard2Appear>this.getAnimation(AnimationType.SelfCard2Appear, this.context.cardFace2, 2);
			run2.callBack = new game.Delegate(callback, thisObject);
			run.run(true);
			run2.run(true);
		}
	}
	/**
 	* 一局完了亮牌
 	*/
	public runBrightCard(callBack: Function, thisObj: any, roleId?: number)
	{
		if (GamblingUtil.isOmaha)
		{
			if (roleId == UserManager.userInfo.id)
			{
				this.startRunBrightCard(this.context.cardFace1, 0, 0, 38, 98, null, null, 1);
				this.startRunBrightCard(this.context.cardFace2, 0, 0, 58, 98, null, null, 2);
				this.startRunBrightCard(this.context.cardFace3, 0, 0, 78, 98, null, null, 3);
				this.startRunBrightCard(this.context.cardFace4, 0, 0, 98, 98, callBack, this, 4);
			} else
			{
				this.startRunBrightCard(this.context.cardFace1, 0, 0, 55, 98, null, null, 1);
				this.startRunBrightCard(this.context.cardFace2, 0, 0, 80, 98, null, null, 2);
				this.startRunBrightCard(this.context.cardFace3, 0, 0, 105, 98, null, null, 3);
				this.startRunBrightCard(this.context.cardFace4, 0, 0, 130, 98, callBack, this, 4);
			}
		} else
		{
			this.startRunBrightCard(this.context.cardFace1, -10, -40, 60, 80, null, null, 1);
			this.startRunBrightCard(this.context.cardFace2, 13, -70, 83, 90, callBack, this, 2);
		}
	}
	public startRunBrightCard(target: CardFaceComponent, rotation: number, initOffsetX: number, x: number, y: number, callBack: Function, thisObj: any, index: number)
	{
		let run: CardFaceBright = <CardFaceBright>this.getAnimation(AnimationType.CardFaceBright, target, index);
		run.run(rotation, initOffsetX, x, y, callBack, thisObj);
	}
	/**
	 * 比牌动画
	 */
	public runThanTheCardAnim(point1: egret.Point, point2: egret.Point, point3?: egret.Point, point4?: egret.Point)
	{
		if (GamblingUtil.isOmaha)
		{
			this.startRunThanTheCardAnim(point1, this.context.cardFace1, 1);
			this.startRunThanTheCardAnim(point2, this.context.cardFace2, 2);
			this.startRunThanTheCardAnim(point3, this.context.cardFace3, 3);
			this.startRunThanTheCardAnim(point4, this.context.cardFace4, 4);
		} else
		{
			this.startRunThanTheCardAnim(point1, this.context.cardFace1, 1);
			this.startRunThanTheCardAnim(point2, this.context.cardFace2, 2);
		}
	}
	private startRunThanTheCardAnim(point: egret.Point, target: CardFaceComponent, index: number)
	{
		let run: CardFaceMoveToPoint = <CardFaceMoveToPoint>this.getAnimation(AnimationType.CardFaceMoveToPoint, target, index);
		run.nextAnimation = this.getAnimation(AnimationType.CardFaceTurnToFace, target, index);
		(run.nextAnimation as CardFaceTurnToFace).scale = 1;
		let initX: number = 0;
		if (index == 1)
		{
			initX = point.x + 15;
		}
		else
		{
			initX = point.x - 15;
		}
		run.run(point, initX);
	}

	private getAnimation(type: AnimationType, target: CardFaceComponent, index: number): BaseAnimation<CardFaceComponent>
	{
		if (!this._actionList)
		{
			this._actionList = new game.Map<string, BaseAnimation<any>>();
		}
		let key: string = type.toString() + "_" + index.toString();
		if (!this._actionList.containsKey(key))
		{
			let run: BaseAnimation<CardFaceComponent> = AnimationFactory.getCardFaceAnimation(type);
			run.setTarget(target);
			this._actionList.add(key, run);
			return run;
		}
		return this._actionList.getValue(key);
	}
}