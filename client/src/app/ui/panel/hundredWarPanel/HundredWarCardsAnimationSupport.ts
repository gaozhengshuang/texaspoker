/**
 * 百人大战牌动画
 */
class HundredWarCardsAnimationSupport 
{
    private _actionList: qin.Dictionary<string, BaseAnimation<any>>;
	/**
 	* 本家手牌Y坐标
 	*/
    // private readonly _selfY: number = 300;
    public context: HWCardsComponent;
    public constructor(target: HWCardsComponent)
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
	 * 比牌动画
	 */
    public runThanTheCardAnim(pointList: Array<egret.Point>)
    {
        for (let i: number = 0; i < pointList.length; i++)
        {
            this.startRunThanTheCardAnim(pointList[i], this.context["card" + i], i + 1);
        }
    }
    private startRunThanTheCardAnim(point: egret.Point, target: CardFaceComponent, index: number)
    {
        let run: CardFaceMoveToPoint = <CardFaceMoveToPoint>this.getAnimation(AnimationType.CardFaceMoveToPoint, target, index);
        run.nextAnimation = this.getAnimation(AnimationType.CardFaceTurnToFace, target, index);
        (run.nextAnimation as CardFaceTurnToFace).scale = 0.7;
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
            this._actionList = new qin.Dictionary<string, BaseAnimation<any>>();
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