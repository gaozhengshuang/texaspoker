/**
 * 运营活动直通车--重返巅峰
 */
class GoAheadHigherfieldItemComponent extends BaseComponent<GoAheadHigherfieldItemData>
{
	public necessaryFlagImg: eui.Image;
	public selectGroup: eui.Group;
	public itemComp: CommonIcon;
	public awardLabel: eui.Label;
	public costLabel: eui.Label;
	public titleLabel: eui.Label;

	public delayInit()
	{
		this.titleLabel.text = this.bindData.title;
		this.selected = this.bindData.selected;

		let def: table.IAwardDefine = table.AwardById[this.bindData.awardId];
		if (def)
		{
			this.costLabel.text = AwardManager.getCostDesDigital(def.Id);
			this.awardLabel.text = AwardManager.getCostDesDigital(def.Id);
			if (def.RewardId.length > 0)
			{
				this.itemComp.init(def.RewardId[0]);
			}
		}
		else
		{
			this.costLabel.text = this.awardLabel.text = game.StringConstants.Empty;
		}
		this.necessaryFlagImg.visible = this.bindData.necessary;
	}
	public set selected(value: boolean)
	{
		this.selectGroup.visible = value;
	}
}
/**
 * 组件绑定数据
 */
interface GoAheadHigherfieldItemData
{
	/**
	 * 兑换ID
	 */
	awardId: number;
	/**
	 * 标题
	 */
	title: string;
	/**
	 * 默认是否选中
	 */
	selected?: boolean;
	/**
	 * 是否是必买
	 */
	necessary?: boolean;
}