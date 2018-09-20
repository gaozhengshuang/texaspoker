/**
 * 请求数据组件
 */
class ReqScrollerbotton extends BaseComponent<any>
{
	public itemGroup: eui.Group;
	public itemLabel: eui.Label;
	public groupWidth: number;

	public constructor(width: number, skinName:string)
	{
		super(skinName);
		this.groupWidth = width;
	}

	public init(isBotton: boolean)
	{
		this.itemGroup.width = this.groupWidth;
		if (isBotton)
		{
			this.itemLabel.text = "已到最底部";
		}
		else
		{
			this.itemLabel.text = "下拉以继续";
		}
	}

	public setAnime()
	{
		this.clearAnime();
		let callback: Function = function ()
		{
			this.visible = false;
		}
		this.visible = true;
		this.alpha = 1;
		egret.Tween.get(this).wait(1000).to({ alpha: 0 }, 200).call(callback);
	}

	public clearAnime()
	{
		egret.Tween.removeTweens(this);
	}

}