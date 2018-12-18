/**
 * 活动面板跳转管理
 */
class ActivityPanelJumpManager
{
    /**
     * 加载面板
     */
    private static _switchPanel: LoadingSwitchPanel;
    /**
     * 当前跳转活动信息
     */
    private static _currentActivityInfo: ActivityInfo;
    /**
     * 加载列表
     */
    private static _loadedList: string[] = [];
    /**
     * 是否在加载中
     */
    private static _isLoading: boolean;
    /**
     * 加载中的资源名
     */
    private static _loadingName: string;
    /**
     * 是否加载公共了资源
     */
    private static _isLoadCommon: boolean = false;

    /**
     * 显示切换面板
     */
    private static showSwitchPanel(): void
    {
        if (!ActivityPanelJumpManager._switchPanel)
        {
            ActivityPanelJumpManager._switchPanel = UIManager.getPanel(UIModuleName.LoadingSwitchPanel) as LoadingSwitchPanel;
        }
        if (!UIManager.isShowPanelObj(ActivityPanelJumpManager._switchPanel))
        {
            UIManager.showPanel(UIModuleName.LoadingSwitchPanel);
        }
    }

    /**
	 * 关闭切换面板
	 */
    private static closeSwitchPanel(): void
    {
        UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
    }

    /**
     * 跳转面板
     */
    public static async JumpToPanel(activityInfo: ActivityInfo)
    {
        switch (activityInfo.definition.Type) //move todo
        {
            case ActivityType.PayPrize:
            case ActivityType.BindChannel:
                AlertManager.showAlertByString("暂未开启");
                return;
        }
        if (ActivityPanelJumpManager._isLoading)
        {
            return;
        }
        ActivityPanelJumpManager._currentActivityInfo = activityInfo;
        if (InfoUtil.checkAvailable(activityInfo) && activityInfo.definition.ResGroup && ActivityPanelJumpManager._loadedList.indexOf(activityInfo.definition.ResGroup) == -1)
        {
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            ActivityPanelJumpManager._loadingName = activityInfo.definition.ResGroup;
            ActivityPanelJumpManager._isLoading = true;
            ActivityPanelJumpManager.showSwitchPanel();
            if (!ActivityPanelJumpManager._isLoadCommon)
            {
                await RES.loadGroup(ResGroupName.ActivityCommon, 1);
                ActivityPanelJumpManager._isLoadCommon = true;
                ActivityPanelJumpManager._loadedList.push(ResGroupName.ActivityCommon);
            }
            await RES.loadGroup(activityInfo.definition.ResGroup, 0);
            ActivityPanelJumpManager._loadedList = ActivityPanelJumpManager._loadedList.concat(activityInfo.definition.ResGroup);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            ActivityPanelJumpManager._isLoading = false;
            ActivityPanelJumpManager.closeSwitchPanel();
            ActivityPanelJumpManager.jumpToActivity(ActivityPanelJumpManager._currentActivityInfo);
        }
        else if (InfoUtil.checkAvailable(activityInfo))
        {
            ActivityPanelJumpManager.jumpToActivity(activityInfo);
        }
        else
        {
            game.Console.logError("跳转活动页面信息异常！   活动info:" + JSON.stringify(activityInfo));
        }
    }

    private static onResourceLoadError(event: RES.ResourceEvent)
    {
        ActivityPanelJumpManager._isLoading = false;
        console.warn("Group:" + event.groupName + " has failed to load");
    }

    private static onResourceProgress(event: RES.ResourceEvent)
    {
        if (event.resItem)
        {
            game.Console.log("资源加载地址groupName：" + event.groupName);
        }
    }
    private static jumpToActivity(info: ActivityInfo)
    {
        if (ActivityManager.showList.indexOf(info) != -1)
        {
            ActivityManager.showPanelInActivityCenter(info);
        }
        else
        {
            UIManager.showPanel(info.definition.PanelName, { info: info });
        }
    }
}