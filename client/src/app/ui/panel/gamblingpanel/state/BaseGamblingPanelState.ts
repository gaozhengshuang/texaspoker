/**
 * 牌局状态
 */
abstract class BaseGamblingPanelState
{
	protected _componentList: Array<BaseGamblingSlotComponent>;
	public get componentList(): Array<BaseGamblingSlotComponent>
	{
		return this._componentList;
	}
	private _component: BaseGamblingSlotComponent; //引导辅助用
	public get component(): BaseGamblingSlotComponent
	{
		if (!this._component && this._componentList && this._componentList.length > 0)
		{
			return this._componentList[0]
		}
		return null;
	}
	protected context: GamblingPanel;

	private readonly gb_parent: string = "gb_parent";
	private readonly gb_index: string = "gb_index";

	protected supportList: Array<BaseGamblingPanelSupport>;

	constructor(context: GamblingPanel, sptList: Array<BaseGamblingPanelSupport>)
	{
		this.context = context;
		this.supportList = sptList;
	}
	public onAwake()
	{

	}
	public initialize()
	{
		let len: number = this.supportList.length;
		let spt: BaseGamblingPanelSupport;
		for (let i: number = 0; i < len; i++)
		{
			spt = this.supportList[i];
			spt.initialize();
		}
	}
	public run()
	{
		this.showElements();
	}

	public createComponent(c: { new (skinName: string, type: SlotLayerType): BaseGamblingSlotComponent; }, paramSkinName: string, paramType: SlotLayerType)
	{
		if (!this._componentList)
		{
			this._componentList = new Array<BaseGamblingSlotComponent>();
		}
		if (c)
		{
			this._componentList.push(new c(paramSkinName, paramType));
		}
	}

	public showElements()
	{
		UIUtil.clearLayout(this.context.slotContainerUp);
		UIUtil.clearLayout(this.context.slotContainerDown);
		if (this._componentList)
		{
			for (let comp of this._componentList)
			{
				switch (comp.layerType)
				{
					case SlotLayerType.Down:
						this.context.slotContainerDown.addChild(comp);
						break;
					case SlotLayerType.Up:
						this.context.slotContainerUp.addChild(comp);
						break;
					default:
						game.Console.log("牌局面板插槽类型异常！" + comp.layerType);
						break;
				}
			}
		}
	}
	public onEnable()
	{
		let len: number = this.supportList.length;
		let spt: BaseGamblingPanelSupport;
		for (let i: number = 0; i < len; i++)
		{
			spt = this.supportList[i];
			spt.onEnable();
		}
	}
	public onDisable()
	{
		let len: number = this.supportList.length;
		let spt: BaseGamblingPanelSupport;
		for (let i: number = 0; i < len; i++)
		{
			spt = this.supportList[i];
			spt.onDisable();
		}
	}
	public clear()
	{
		this.context.slotContainerDown.removeChildren();
		this.context.slotContainerUp.removeChildren();
	}
	/**
	 * 添加一个对象显示
	 */
	public addChild(target: egret.DisplayObject)
	{
		if (target && target.parent) //如果已经在显示状态 存储父对象
		{
			target[this.gb_parent] = target.parent;
			target[this.gb_index] = target.parent.getChildIndex(target);
		}
		else if (target && target[this.gb_parent]) //如果不在显示列表中 则拿前父对象的引用显示
		{
			let dis: egret.DisplayObjectContainer;
			target[this.gb_parent].addChildAt(target, target[this.gb_index]);
		}
		else
		{
			game.Console.logError("牌局切换状态，添加对象显示失败：" + target);
		}
	}
	/**
	 * 暂时移除一个对象显示
	 */
	public removeChild(target: egret.DisplayObject)
	{
		if (target && target.parent)
		{
			target[this.gb_parent] = target.parent;
			target[this.gb_index] = target.parent.getChildIndex(target);
			target.parent.removeChild(target);
		}
		else
		{
			game.Console.logError("牌局切换状态，移除对象显示失败：" + target);
		}
	}
	/**
	 * 根据类型获取组件
	 */
	public getCompoent<T extends BaseGamblingSlotComponent>(cls: any): T
	{
		if (this._componentList)
		{
			for (let comp of this._componentList)
			{
				if (comp instanceof cls)
				{
					return comp as T;
				}
			}
		}
		return null;
	}
}