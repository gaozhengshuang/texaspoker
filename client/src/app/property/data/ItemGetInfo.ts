/**
 * 获得道具信息
 */
class ItemGetInfo
{
    /**
     * itemId
     */
    public id: number;
    /**
     * 数量
     */
    public count: number;
    /**
     * 类型
     */
    public type: number;
    /**
     * 尺寸
     */
    public size = 100;

    public static CreateFromAwardInfoDefinition(infoDef: AwardInfoDefinition, size: number = 65): ItemGetInfo
    {
        let info: ItemGetInfo = new ItemGetInfo();
        if (infoDef != null)
        {
            info.id = infoDef.id;
            info.type = infoDef.type;
            info.count = infoDef.count;
            info.size = size;
        }
        return info;
    }

    public static CreateFromItemInfo(item: ItemInfo): ItemGetInfo
    {
        let info: ItemGetInfo = new ItemGetInfo();
        info.id = item.id;
        if (InfoUtil.checkAvailable(item))
        {
            info.type = item.definition.type;
        }
        info.count = item.count;
        return info;
    }

}