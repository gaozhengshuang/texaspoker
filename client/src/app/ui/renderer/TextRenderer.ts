/**
 * 文本渲染项
 */
class TextRenderer extends BaseItemRenderer<string>
{
	public txtLabel: eui.Label;
	public constructor()
	{
		super();
		this.skinName = UIRendererSkinName.TextRenderer;
	}
	protected dataChanged(): void
	{
		super.dataChanged();
		if (this.bindData && this.txtLabel)
		{
			this.txtLabel.text = this.bindData;
		}
	}
}