/**
 * 创建房间游戏renderer
 */
class CreateRoomPanelItemRenderer extends BaseItemRenderer<any>
{
	public radioBtn1: eui.RadioButton;
	public costLabel: eui.Label;
	public costImg: eui.Image;

	public constructor()
	{
		super();
		this.skinName = UIRendererSkinName.CreateRoomPanelRenderer;
	}
	protected dataChanged()
	{
		super.dataChanged();
		if (this.data)
		{
			this.radioBtn1.label = this.data.des;
			this.radioBtn1.groupName = this.data.groupName;

			this.costImg.visible = this.costLabel.visible = this.data.isRound;
			if (this.costLabel.visible)
			{
				this.costLabel.text = "房卡(     x" + (this.data.num / 8).toString() + ")";
				let label: eui.Label = this.radioBtn1.labelDisplay as eui.Label;
			}
		}
	}
}