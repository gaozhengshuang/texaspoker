/**
 * 引导提示组件
 */
class GuidePromptComponent extends BaseComponent<any>
{
	private static cacheList: Array<GuidePromptComponent> = new Array<GuidePromptComponent>();

	public arrowImg: eui.Image;

	private readonly _roUp: number = 180;
	private readonly _roDown: number = 0;
	private readonly _roLeft: number = 90;
	private readonly _roRight: number = 270;

	private readonly _moveGap: number = 15;

	public static get(): GuidePromptComponent
	{
		let component: GuidePromptComponent;
		if (GuidePromptComponent.cacheList.length > 0)
		{
			component = GuidePromptComponent.cacheList.pop();
		}
		else
		{
			component = new GuidePromptComponent(UIComponentSkinName.GuidePromptComponent);
		}
		return component;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.touchEnabled = this.touchChildren = false;
		this.maxWidth = 47;
		this.maxHeight = 48;
		this.arrowImg.horizontalCenter = this.arrowImg.verticalCenter = 0;
	}
	public init(data: any)
	{
		super.init(data);
		let offsetV: number = 20;
		if (this.bindData.data.offsetV > 0)
		{
			offsetV = this.bindData.data.offsetV;
		}
		let tween: egret.Tween = egret.Tween.get(this, { loop: true });
		this.arrowImg.alpha = 1;
		switch (this.bindData.data.orientation)
		{
			case GuideTipsOrientation.Up:
				this.arrowImg.rotation = this._roUp;
				this.horizontalCenter = 0;

				this.verticalCenter = offsetV;
				tween.to({ verticalCenter: offsetV - this._moveGap, alpha: 0.5 }, 1000).to({ verticalCenter: offsetV, alpha: 1 }, 1000);
				break;
			case GuideTipsOrientation.Down:
				this.arrowImg.rotation = this._roDown;
				this.horizontalCenter = 0;

				this.verticalCenter = -offsetV;
				tween.to({ verticalCenter: -offsetV + this._moveGap, alpha: 0.5 }, 1000).to({ verticalCenter: -offsetV, alpha: 1 }, 1000);
				break;
			case GuideTipsOrientation.Left:
				this.arrowImg.rotation = this._roLeft;
				this.verticalCenter = 0;

				this.horizontalCenter = offsetV;
				tween.to({ horizontalCenter: offsetV - this._moveGap, alpha: 0.5 }, 1000).to({ horizontalCenter: offsetV, alpha: 1 }, 1000);
				break;
			case GuideTipsOrientation.Right:
				this.arrowImg.rotation = this._roRight;
				this.verticalCenter = 0;

				this.horizontalCenter = -offsetV;
				tween.to({ horizontalCenter: -offsetV + this._moveGap, alpha: 0.5 }, 1000).to({ horizontalCenter: -offsetV, alpha: 1 }, 1000);
				break;
		}
		if (data.parent)
		{
			data.parent.addChild(this);
		}
	}
	public destroy()
	{
		super.destroy();
		if (this.parent)
		{
			this.parent.removeChild(this);
		}
		this.bindData = undefined;
		egret.Tween.removeTweens(this.arrowImg);

		GuidePromptComponent.cacheList.push(this);
	}
	public static clear()
	{
		GuidePromptComponent.cacheList.length = 0;
	}
}