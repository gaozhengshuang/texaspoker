/**
 * 数字组件
 */
class NumComponent extends BaseComponent<number>
{
	public label1: eui.Label;

	public init(data: number)
	{
		super.init(data);
	}
	protected createChildren()
	{
		super.createChildren();
		if (this.bindData)
		{
			this.label1.text = this.bindData.toString();
		}
	}
	public refresh(num?: number)
	{
		if (this.label1)
		{
			if (num != undefined)
			{
				this.label1.text = num.toString();
			}
			else
			{
				this.label1.text = qin.StringConstants.Empty;
			}
		}
	}
}