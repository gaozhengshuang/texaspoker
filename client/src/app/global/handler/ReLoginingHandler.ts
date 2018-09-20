/**
 * 重新登录处理
 */
class ReLoginingHandler
{
    public invoke(): void
    {
        SocketManager.Dispose();
        UserManager.resetByReLogin();
        ShopManager.clearList();
        GamblingManager.resetByReLogin();
        HundredWarManager.resetByReLogin();
        NotifyManager.clearMultiParams();
        PopupManager.reset();
    }
}