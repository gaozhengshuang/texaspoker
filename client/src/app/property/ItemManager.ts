/**
 * 物品管理
 */
class ItemManager
{
    public static itemList: Array<ItemInfo> = new Array<ItemInfo>();
    /**
     * 物品增加事件
     */
    public static itemAddEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 物品减少事件
     */
    public static itemReduceEvent: game.DelegateDispatcher = new game.DelegateDispatcher();

    public static reset()
    {
        game.ArrayUtil.Clear(ItemManager.itemList);
    }

    public static initialize(result: game.SpRpcResult)
    {
        ItemManager.reset();
        if (result.data && result.data.Array)
        {
            for (let info of result.data.Array)
            {
                let item: ItemInfo = new ItemInfo();
                item.id = info.Id;
                item.count = info.Count;
                ItemManager.itemList.push(item);
            }
        }
        SocketManager.AddCommandListener(Command.Rec_ItemListAdd_2002, this.onItemListAdd, this);
        SocketManager.AddCommandListener(Command.Rec_ItemListReduce_2005, this.onItemListReduce, this);
    }
    /**
     * 物品增加
     */
    private static onItemListAdd(result: game.SpRpcResult)
    {
        if (result.data && result.data.Array)
        {
            for (let info of result.data.Array)
            {
                let item: ItemInfo = ItemManager.getItemById(info.Id);
                if (item)
                {
                    item.count += info.Count;
                    ItemManager.checkItemCount(item);
                }
                else
                {
                    item = new ItemInfo();
                    item.id = info.Id;
                    item.count = info.Count;
                    ItemManager.itemList.push(item);
                }
            }
        }
        ItemManager.itemAddEvent.dispatch();
    }
    /**
     * 物品减少
     */
    private static onItemListReduce(result: game.SpRpcResult)
    {
        if (result.data && result.data.Array)
        {
            for (let info of result.data.Array)
            {
                let item: ItemInfo = ItemManager.getItemById(info.Id);
                if (item)
                {
                    item.count -= info.Count;
                    ItemManager.checkItemCount(item);
                }
            }
        }
        ItemManager.itemReduceEvent.dispatch();
    }

    public static getItemById(id: number): ItemInfo
    {
        for (let item of ItemManager.itemList)
        {
            if (item.id == id)
            {
                return item;
            }
        }
        return null;
    }
    /**
     * 通过id查找某列表物品数量
     */
    public static getItemNumById(id: number, list: ItemInfo[]): number
    {
        for (let item of list)
        {
            if (item.id == id)
            {
                return item.count;
            }
        }
        return 0;
    }

    /**
     * 使用物品的请求
     */
    public static reqUseItem(id: number, count: number, msg: string = null)
    {
        let iteminfo: ItemInfo = ItemManager.getItemById(id);
        let number = count;
        if (InfoUtil.checkAvailable(iteminfo))
        {
            let callback: Function = function ()
            {
                // UIManager.showFloatTips(game.StringUtil.format("使用了{0} * {1}", iteminfo.definition.name, count))
                let def: table.IItemBaseDataDefine = table.ItemBaseDataById[id];
                if (def)
                {
                    TalkingDataManager.onItemUse(def.Name, count);
                }
            }

            if (iteminfo.count < count)
            {
                UIManager.showFloatTips("物品不存在或数量不够");
            }
            else
            {
                SocketManager.call(Command.Req_UseItem_3021, { "Id": id, "Count": count, "msg": msg }, callback, null, this);
            }
        }
    }

    /**
     * 检查物品是用完
     */
    private static checkItemCount(info: ItemInfo)
    {
        if (info.count == 0)
        {
            game.ArrayUtil.RemoveItem<ItemInfo>(info, ItemManager.itemList);
        }
    }
    /**
     * 根据类型获取道具列表
     */
    public static getItemListByType(type: number): Array<ItemInfo>
    {
        let result: Array<ItemInfo> = new Array<ItemInfo>();
        for (let info of ItemManager.itemList)
        {
            if (info.definition.Type == type)
            {
                result.push(info);
            }
        }
        return result;
    }
    /**
     * 是否拥有某赛事的门票
    */
    public static isHaveTicket(ticketId: number): boolean
    {
        if (ItemManager.itemList && ItemManager.itemList.length > 0)
        {
            for (let def of ItemManager.itemList)
            {
                if (def.id == ticketId)
                {
                    return true;
                }
            }
        }
        return false;
    }
}