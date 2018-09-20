/**
 * 跳转工具
 */
class JumpUtil
{
    /**
     * 跳转到商城界面
     */
    public static JumpToShopping(index?: ShopGroupIndex, prePanel?: string)
    {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: index, prevPanelName: prePanel });
    }
    /**
     * 跳转到礼物商城界面
     */
    public static JumpToGiftShop(userInfo: UserInfo, index?: GiftShopTabIndex, subTab?: number)
    {
        UIManager.showPanel(UIModuleName.GiftShopPanel, { tab: index, subTab: subTab, userInfo: userInfo });
    }
    /**
     * 跳转到好友界面
     */
    public static JumpTofriend()
    {
        UIManager.showPanel(UIModuleName.FriendPanel);
    }
    /**
     * 跳转到游戏场
     */
    public static JumpToPlayingField(index?: PlayingFieldType)
    {
        UIManager.showPanel(UIModuleName.PlayingFieldPanel);

    }
    /**
     * 跳转到锦标赛
     */
    public static JumpToChampionship()
    {
        UIManager.showPanel(UIModuleName.ChampionshipPanel);
    }
    /**
     * 跳转到活动中心
     */
    public static JumpToActivity(prePanel?: string)
    {
        UIManager.showPanel(UIModuleName.ActivityPanel, { prevPanelName: prePanel });
    }
    /**
     * 跳转到邮箱
     */
    public static JumpToMail()
    {
        UIManager.showPanel(UIModuleName.MailPanel);
    }
    /**
     * 跳转到兑奖
     */
    public static JumpToGoldenBeanAward()
    {
        UIManager.showPanel(UIModuleName.AwardsPanel);
    }
    /**
     * 跳转到任务界面
     */
    public static JumpToAssignment()
    {
        UIManager.showPanel(UIModuleName.AssignmentPanel);
    }
    /**
     * 跳转到保险箱
     */
    public static JumpToSafeBox(prevPanel: string)
    {
        if (VipManager.isVip())
        {
            if (!UserManager.userInfo.mno)
            {
                UIManager.showPanel(UIModuleName.BindPhonePanel, { isShowCreatePwd: true, prevPanelName: prevPanel });
            } else
            {
                if (!UserManager.userInfo.isSafePwd)//保险箱未设置密码
                {
                    UIManager.showPanel(UIModuleName.SafeCreatePanel);
                }
                else
                {
                    UIManager.showPanel(UIModuleName.SafeBoxPanel);
                }
            }
        }
        else
        {
            AlertManager.showConfirm("保险箱功能仅对VIP用户开放", () => { JumpUtil.JumpToShopping(ShopGroupIndex.Vip, prevPanel); }, null, null, null, null, "成为VIP");
        }
    }
    /**
     * 跳转到玩法
     */
    public static JumpToGameRule(prePanel?: string)
    {
        UIManager.showPanel(UIModuleName.GameRulePanel, { prevPanelName: prePanel });
    }
    /**
     * 跳转到设置
     */
    public static JumpToSetting()
    {
        UIManager.showPanel(UIModuleName.SetPanel);
    }
    /**
     * 跳转到排行榜
     */
    public static JumpTorank()
    {
        UIManager.showPanel(UIModuleName.RankPanel);
    }
    /**
     * 战局中跳转任务
     */
    public static JumpToAchievementInGame(type: AchieveShowPattern)
    {
        UIManager.showPanel(UIModuleName.AchievementInGamePanel, type);
    }
    /**
     * 百人大战跳转任务
     */
    public static JumpToAchievementInHundredWar(type: AchieveShowPattern)
    {
        UIManager.showPanel(UIModuleName.AchievementInHundredWarPanel, type);
    }
    /**
     * 账号登录跳转到找回密码
     */
    public static JumpToRetrievePwd(prevPanelName?: string)
    {
        UIManager.showPanel(UIModuleName.AccountRetrievePwdPanel, { prevPanelName: prevPanelName });
    }
    /**
     * 跳转到找回保险箱密码
     */
    public static JumpToSafeRetrievePwd()
    {
        UIManager.showPanel(UIModuleName.SafeBoxRetrievePwdPanel);
    }
    /**
     * 跳转到百人大战
     */
    public static JumpToHundredWar()
    {
        UIManager.showPanel(UIModuleName.HundredWarPanel);
    }
    /**
     * 跳转百人大战帮助
     */
    public static JumpToHundredWarHelp()
    {
        UIManager.showPanel(UIModuleName.HundredWarHelpPanel);
    }
    /**
     * 跳转百人大战奖池信息
     */
    public static JumpToHundredWarPoolInfo()
    {
        UIManager.showPanel(UIModuleName.HundredWarPoolInfoPanel);
    }
    /**
     * 跳转百人大战庄家信息
     */
    public static JumpToHundredWarBanker()
    {
        UIManager.showPanel(UIModuleName.HundredWarBankerListPanel);
    }
    /**
     * 跳转到胜负走势
     */
    public static JumpToHundredWarTrend()
    {
        UIManager.showPanel(UIModuleName.HundredWarTrendPanel);
    }

    /**
     * 跳转百人大战无座玩家
     */
    public static JumpToHundredWarNoSeatPlayer()
    {
        UIManager.showPanel(UIModuleName.HundredWarNoSeatPlayerPanel);
    }
    /**
     * 跳转百人大战结算界面
     */
    public static JumpToHundredWarOver()
    {
        UIManager.showPanel(UIModuleName.HundredWarOverPanel);
    }
    /**
     * 跳转百人大战任务
     */
    public static JumpToHundredWarAchieve(type: PlayingFieldType)
    {
        UIManager.showPanel(UIModuleName.AchievementInHundredWarPanel, type);
    }
    /**
     * 根据玩法模式跳转
     */
    public static JumpByPlayField(playMode: AchieveShowPattern, prePanel: string)
    {
        switch (playMode)
        {
            case AchieveShowPattern.PrimaryPattern:
            case AchieveShowPattern.MiddlePattern:
            case AchieveShowPattern.HighPattern:
                UIManager.showPanel(UIModuleName.PlayingFieldPanel, { enterIndex: playMode - 1, prevPanelName: prePanel });
                break;
            case AchieveShowPattern.Match:
                UIManager.showPanel(UIModuleName.ChampionshipPanel, { enterIndex: 0, prevPanelName: prePanel });
                break;
            case AchieveShowPattern.HundredWarAll:
            case AchieveShowPattern.HundredWarFun:
            case AchieveShowPattern.HundredWarRich:
                UIManager.showPanel(UIModuleName.HundredWarPanel, { prevPanelName: prePanel });
                break;
        }
    }
    /**
     * 跳转到聊天界面
     */
    public static JumpToChatPanel()
    {
        UIManager.showPanel(UIModuleName.ChatPanel);
    }
    /**
     * 跳转到签到
     */
    public static JumpToSignIn()
    {
        let info: ActivityInfo = ActivityManager.getOpenAchivityByType(ActivityType.Signin);
        if (info)
        {
            UIManager.showPanel(UIModuleName.SignInPanel, { info: info });
        }
        else
        {
            game.Console.log("打开签到面板失败，签到活动数据异常！");
        }
    }
    /**
     * 跳转到公告
     */
    public static JumpToNoticePanel(urlList: Array<string>)
    {
        UIManager.showPanel(UIModuleName.ImgNotifyPanel, urlList);
    }
    /**
     * 跳转到首充面板
     */
    public static JumpToFirstPayPanel()
    {
        let info: ActivityInfo = ActivityManager.getOpenAchivityByType(ActivityType.PayPrize);
        if (info)
        {
            ActivityPanelJumpManager.JumpToPanel(info);
        }
        else
        {
            game.Console.log("打开首充面板失败，首充数据异常！");
        }
    }
    /**
     * 跳转到充值混合界面
     */
    public static JumpToPayModePanel(info: ShopInfo)
    {
        UIManager.showPanel(UIModuleName.PayModePanel, info);
    }

    public static JumpToOmahaCardTypePanel(cardType: CardType)
    {
        UIManager.showPanel(UIModuleName.OmahaCardTypePanel, cardType);
    }
    /**
     * 跳转到邀请
    */
    public static async JumpToInvite()
    {
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        UIManager.showPanel(UIModuleName.LoadingSwitchPanel);
        await RES.loadGroup(ResGroupName.ActivityCommon, 1);
        await RES.loadGroup(ResGroupName.Invite, 0);
        UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
        UIManager.showPanel(UIModuleName.InvitePanel);
    }

    private static onResourceLoadError(event: RES.ResourceEvent): void
    {
        UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
        console.warn("Group:" + event.groupName + " has failed to load");
    }
    /**
     * 跳转到月卡
    */
    public static async JumpToMonthCard()
    {
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        UIManager.showPanel(UIModuleName.LoadingSwitchPanel);
        await RES.loadGroup(ResGroupName.ActivityCommon);
        UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
        UIManager.showPanel(UIModuleName.MonthCardPanel);
    }
}