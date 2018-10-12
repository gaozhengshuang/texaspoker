/**
 * 选择服务器渲染项
 */
class ServerSelectItemRender extends BaseItemRenderer<game.ServerInfo>
{
	public selectImg: eui.Image;
	public nameLabel: eui.Label;
	public adressLabel: eui.Label;

	public constructor()
	{
		super();
		this.skinName = UIRendererSkinName.ServerSelectItemRenderer;
	}
	protected dataChanged(): void
	{
		super.dataChanged();
		if (this.bindData)
		{
			this.nameLabel.text = this.bindData.name;
			this.adressLabel.text = this.bindData.$netIp;
		}
	}
	public set selected(value: boolean)
	{
		this.selectImg.visible = value;
	}
}