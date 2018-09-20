/**
 * 获得道具面板(appendData传Array<ItemGetInfo>类型)
 */
class GetItemTipsPanel extends BasePanel
{
	public getItemRender: GetItemComponent;
	public itemGetList: Array<ItemGetInfo> = new Array<ItemGetInfo>();
	private readonly _cellTime: number = 1200;
	public group: eui.Group;
	public constructor()
	{
		super();
		this.layer = UILayerType.Tips;
		this.setTouchChildren(false);
		this.setTouchEnable(false);
		this.setSkinName(UIModuleName.GetItemTipsPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		egret.Tween.removeTweens(this.group);
		if (appendData && appendData.length > 0)
		{
			this.itemGetList = appendData;
			SoundManager.playEffect(MusicAction.item_fall);
			this.startPlay();
		}
		else
		{
			this.onCloseBtnClickHandler(null);
		}
	}

	private startPlay()
	{
		if (!this.getItemRender)
		{
			this.getItemRender = new GetItemComponent(UIComponentSkinName.GetItemComponent);
			this.group.addChild(this.getItemRender);
		}
		this.nextPlay();
	}

	private nextPlay()
	{
		if (this.itemGetList.length > 0)
		{
			let itemInfo = this.itemGetList.shift();
			this.getItemRender.initInfo(itemInfo);
			egret.Tween.get(this.group).set({ scaleX: 0, scaleY: 0 }).to({ scaleX: 1, scaleY: 1 }, 200).wait(800).to({ scaleX: 0, scaleY: 0 }, 200).call(this.nextPlay, this);
		}
		else
		{
			egret.Tween.removeTweens(this.group);
			this.onCloseBtnClickHandler(null);
		}
	}
}