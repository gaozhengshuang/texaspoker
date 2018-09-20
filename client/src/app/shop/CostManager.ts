/**
 * 消费管理
 */
class CostManager
{
    /**
     * 验证钻石不足
     */
    public static verifyDiamond(diamond: number, isShowTips = false, callback?: Function, cancelCallBack?: Function): boolean
    {
        if (diamond <= UserManager.userInfo.diamond)
        {
            return true;
        }
        if (isShowTips)
        {
            CostManager.showBuyDiamond(callback, cancelCallBack);
        }

        return false;
    }
    /**
     * 显示购买钻石提示
     */
    public static showBuyDiamond(callback?: Function, cancelCallBack?: Function)
    {
        if (callback)
        {
            AlertManager.showConfirm("钻石数量不足，是否前往充值？", callback, cancelCallBack);
        }
        else
        {
            CostManager.currentTab = ShopGroupIndex.Diamond;
            AlertManager.showConfirm("钻石数量不足，是否前往充值？", CostManager.gotoShoppingPanel, cancelCallBack);
        }
    }
    /**
     * 验证金币不足
     */
    public static verifyGold(gold: number, isShowTips = false, callback?: Function, cancelCallBack?: Function): boolean
    {
        if (gold <= UserManager.userInfo.gold)
        {
            return true;
        }
        if (isShowTips)
        {
            CostManager.showBuyGold(gold, callback, cancelCallBack);
        }
        return false;
    }
    /**
     * 显示购买金币提示
     */
    public static showBuyGold(goldShortage: number, callback?: Function, cancelCallBack?: Function)
    {
        if (callback)
        {
            AlertManager.showConfirm("金币数量不足，是否前往充值？", callback, cancelCallBack);
        }
        else
        {
            UIManager.showPanel(UIModuleName.GoldShortagePanel, { goldShortage: goldShortage });
        }
    }


    private static currentTab: number = 0;
    private static gotoShoppingPanel()
    {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: CostManager.currentTab });
    }

}