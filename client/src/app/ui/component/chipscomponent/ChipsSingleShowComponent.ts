/**
 * 只显示一单张图片的筹码组件
 */
class ChipsSingleShowComponent extends BaseComponent<any>
{
    public bgImg: eui.Image;
    public numLabel: eui.Label;

    private _initY: number;
    private _initX: number;
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.touchChildren = false;
    }
    public init(data: any)
    {
        super.init(data);
        egret.Tween.removeTweens(this.bgImg);

        this.numLabel.horizontalCenter = 0;
        this.bgImg.horizontalCenter = 0;
        this.bgImg.alpha = 1;

        this.refreshNum(data.num);

        this.numLabel.y = this.numLabel.height + 12;
        this._initX = this.bgImg.x;
        this._initY = this.bgImg.y = 0;

        if (this.bindData.isShowTween)
        {
            this.showTweens();
        }
    }
    private _radius: number = 45;
    private _yRadius: number = 25;
    private _time: number = 300;
    private showTweens()
    {
        this.bgImg.horizontalCenter = this.numLabel.horizontalCenter = undefined;
        this.numLabel.visible = false;
        this.bgImg.alpha = 0.1;

        let tween: egret.Tween = egret.Tween.get(this.bgImg, { onChange: this.onTweenHandler.bind(this) });
        switch (this.bindData.state)
        {
            case ChipsShowState.LeftDown:
            case ChipsShowState.Left:
                this.bgImg.y -= this._yRadius;
                this.bgImg.x += this._radius;
                tween.to({ x: this._initX, y: this._initY, alpha: 1 }, this._time).call(this.tweenOver.bind(this));
                break;
            case ChipsShowState.RightDown:
            case ChipsShowState.Right:
                this.bgImg.y -= this._yRadius;
                this.bgImg.x -= this._radius;
                tween.to({ x: this._initX, y: this._initY, alpha: 1 }, this._time).call(this.tweenOver.bind(this));
                break;
            case ChipsShowState.Top:
                this.bgImg.y = this._initY + this._yRadius * 2;
                tween.to({ y: this._initY, alpha: 1 }, this._time).call(this.tweenOver.bind(this));
                break;
        }
    }
    private onTweenHandler()
    {
    }
    private tweenOver()
    {
        egret.Tween.removeTweens(this.bgImg);
        this.numLabel.visible = true;
        this.bgImg.horizontalCenter = this.numLabel.horizontalCenter = 0;
    }
    private refreshNum(num: number)
    {
        this.numLabel.text = qin.MathUtil.formatNum(num);
    }
}