/**
 * 充值选项的定义
 * */
class ItemDefined extends BaseDefined<ItemDefinition>
{
    private static readonly itemConfig: string = "item";
    private static _instance: ItemDefined;
    public static GetInstance(): ItemDefined
    {
        if (!ItemDefined._instance)
        {
            ItemDefined._instance = new ItemDefined();
        }
        if (DefinedManager.IsParsed(ItemDefined.itemConfig) == false)
        {
            ItemDefined._instance.initialize();
        }
        return ItemDefined._instance;
    }

    private initialize()
    {
        this.dataList = DefinedManager.GetData(ItemDefined.itemConfig) as Array<ItemDefinition>;
    }
}
/**
 * 道具的定义
 * */
class ItemDefinition implements IBaseDefintion
{
    /**
     * 道具id
     */
    public id: number;

    /**
     * 道具名称
     */
    public name: string;
    /**
     * 道具类型
     */
    public type: number;
    /**
     * 子类型
     */
    public typeDes: number;
    /**
     * 效果类型
     */
    public effectType: number;
    /**
     * 效果参数
     */
    public effectNum: number;
    /**
     * 道具说明
     */
    public des: string;
    /**
     * 道具icon
     */
    public icon: string;
    /**
     * 获得方式
     */
    public extern: string;
}