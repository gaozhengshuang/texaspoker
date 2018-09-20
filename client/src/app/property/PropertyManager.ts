/**
 *  资产管理类
 */
class PropertyManager
{
    /**
     * 金币差值
     */
    private static _goldOffset: number;
    /**
     * 钻石差值
     */
    private static _diamondOffset: number;
    /**
     * 经验差值
     */
    private static _expOffset: number;
    private static _isOpen: boolean = false;
    /**
     * 物品
     */
    private static _itemOldList: qin.Dictionary<number, number> = new qin.Dictionary<number, number>();
    /**
     * item获取列表
     */
    private static _itemGetList: Array<ItemGetInfo> = new Array<ItemGetInfo>();
    public static get itemGetList(): Array<ItemGetInfo>
    {
        return PropertyManager._itemGetList;
    }

    public static OpenGet()
    {
        PropertyManager._isOpen = true;
        qin.ArrayUtil.Clear(PropertyManager._itemGetList);
        PropertyManager._itemOldList.clear();
        for (let itemInfo of ItemManager.itemList)
        {
            PropertyManager._itemOldList.add(itemInfo.id, itemInfo.count);
        }
        PropertyManager._goldOffset = UserManager.userInfo.gold;
        PropertyManager._diamondOffset = UserManager.userInfo.diamond;
        PropertyManager._expOffset = UserManager.userInfo.exp;
    }

    public static Clear()
    {
        PropertyManager._isOpen = false;
    }

    private static ShowGoldPanel(count: number)
    {
        if (PropertyManager._isOpen)
        {
            if (count > 0)
            {
                UIManager.showPanel(UIModuleName.GetCoinTipsPanel, "您获得了" + qin.MathUtil.formatNum(count) + "金币");
            }
        }
    }

    public static ShowItemList()
    {
        if (!PropertyManager._isOpen)
        {
            return;
        }
        PropertyManager._goldOffset = UserManager.userInfo.gold - PropertyManager._goldOffset;
        PropertyManager._diamondOffset = UserManager.userInfo.diamond - PropertyManager._diamondOffset;
        PropertyManager._expOffset = UserManager.userInfo.exp - PropertyManager._expOffset;
        for (let item of ItemManager.itemList)
        {
            if (PropertyManager._itemOldList.containsKey(item.id))
            {
                let itemCount: number = PropertyManager._itemOldList.getValue(item.id);
                if (item.count > itemCount)
                {
                    PropertyManager.AddBase(item.id, item.count - itemCount);
                }
            }
            else
            {
                PropertyManager.AddBase(item.id, item.count);
            }
        }
        PropertyManager.AddBase(ItemFixedId.gold, PropertyManager._goldOffset);
        PropertyManager.AddBase(ItemFixedId.diamond, PropertyManager._diamondOffset);
        PropertyManager.AddBase(ItemFixedId.exp, PropertyManager._expOffset);
        if (PropertyManager._itemGetList.length == 1 && PropertyManager._itemGetList[0].id == ItemFixedId.gold)
        {
            PropertyManager.ShowGoldPanel(PropertyManager._itemGetList[0].count);
            PropertyManager.Clear();
            return;
        }
        if (PropertyManager._itemGetList.length > 0)
        {
            UIManager.showPanel(UIModuleName.GetItemTipsPanel, PropertyManager._itemGetList);
        }
        PropertyManager.Clear();
    }

    public static AddBase(itemId: number, count: number)
    {
        if (count > 0 && PropertyManager._isOpen)
        {
            let info: ItemGetInfo = new ItemGetInfo();
            info.id = itemId;
            info.count = count;
            PropertyManager._itemGetList.push(info);
        }
    }
}