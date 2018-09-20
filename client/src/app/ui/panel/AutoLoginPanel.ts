/**
 * 自动登录面板
 */
class AutoLoginPanel extends BasePanel
{
    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.AutoLoginPanel);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        AccountManager.OnLoginSuccess.addListener(this.loginSuccessHandler, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        AccountManager.OnLoginSuccess.removeListener(this.loginSuccessHandler, this);
    }
    /**
    * 登录成功回调
   */
    private loginSuccessHandler()
    {
        UIManager.showFloatTips("欢迎回来 " + AccountManager.account);
        this.onCloseBtnClickHandler(null);
    }
}