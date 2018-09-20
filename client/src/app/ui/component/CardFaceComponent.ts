/**
 * 牌面显示组件
 */
class CardFaceComponent extends BaseComponent<CardInfo>
{
	public backFace: eui.Image;
	public cardGroup: eui.Group;
	public numImg: eui.Image;
	public flushBigImg: eui.Image;
	public flushBigImg1: eui.Image;
	public flushSmallImg: eui.Image;
	public frontFaceImg: eui.Image;
	public maskImg: eui.Image;
	public maxFlagImg: eui.Image;

	public initMatrix: egret.Matrix;
	public mcGroup: eui.Group;
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.initMatrix = this.matrix.clone();
		this.anchorOffsetX = this.width / 2;
		this.anchorOffsetY = this.height / 2;
		this.touchChildren = false;
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
	}
	public init(data: CardInfo)
	{
		super.init(data);
		this.backFace.visible = true;
		this.cardGroup.visible = false;
		this.showMask(false);
		this.showMaxFlag(false);

		if (this.bindData)
		{
			let numRes: string = game.StringConstants.Empty;
			let bigRes: string = game.StringConstants.Empty;
			if (this.bindData.card[0] > 2)
			{
				numRes = ResPrefixName.card + ResPrefixName.FlushBlack + this.bindData.card[1] + ResSuffixName.PNG;
			}
			else
			{
				numRes = ResPrefixName.card + ResPrefixName.FlushRed + this.bindData.card[1] + ResSuffixName.PNG;
			}

			this.numImg.source = numRes;
			this.flushSmallImg.source = ResPrefixName.Flush + this.bindData.card[0] + ResSuffixName.PNG;

			this.flushBigImg1.visible = false;
			this.flushBigImg.visible = false;
			//大于10，小于A
			if (this.bindData.card[1] > GamblingManager.FlushSplitIndex && this.bindData.card[1] < CardTypeMatchUtil.maxIndex)
			{
				bigRes = ResPrefixName.card + this.bindData.card[0] + "_" + this.bindData.card[1] + ResSuffixName.PNG;
				this.flushBigImg1.source = bigRes;
				this.flushBigImg1.visible = true;
			}
			else
			{
				bigRes = ResPrefixName.Flush + this.bindData.card[0] + ResSuffixName.PNG;
				this.flushBigImg.source = bigRes;
				this.flushBigImg.visible = true;
			}
		}
		else
		{
			this.numImg.source = game.StringConstants.Empty;
			this.flushBigImg.source = game.StringConstants.Empty;
			this.flushBigImg1.source = game.StringConstants.Empty;
			this.flushSmallImg.source = game.StringConstants.Empty;
		}
	}
	protected rendererStart(event: egret.Event)
	{
		super.rendererStart(event);
	}
	public showMask(flag: boolean)
	{
		this.maskImg.visible = flag;
	}
	public showMaxFlag(flag: boolean)
	{
		this.maxFlagImg.visible = flag;
	}
	public initElementsShow()
	{
		this.backFace.visible = true;
		this.cardGroup.visible = false;
		this.frontFaceImg.visible = false;
	}
	public initElementsShow2()
	{
		this.backFace.visible = false;
		this.frontFaceImg.visible = false;
		this.cardGroup.visible = true;
	}
}