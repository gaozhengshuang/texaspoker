/**
 * 坐下
 */
class HWPanelPitSupport extends BaseHWPanelSupport
{
    /**
     * 是否是一局结束刷新
    */
    private _isRefreshPlayerInfo: boolean;
    public initialize()
    {
        super.initialize();
        this.setPitInfo();
    }
    public onEnable()
    {
        super.onEnable();
        HundredWarManager.onCardPushEvent.addListener(this.getUserInfo, this);
        UserManager.OnGetSimpleUserInfoEvent.addListener(this.refreshPitInfoByRoleId, this);
        HundredWarManager.onPosChangeEvent.addListener(this.playerLeave, this);
        HundredWarManager.OnGetPlayerInfoEvent.addListener(this.setPitInfo, this);
        HundredWarManager.onBetEvent.addListener(this.refreshSelfPitInfo, this);
        HundredWarManager.onShowCardsAnimOverEvent.addListener(this.refreshPitInfo, this);
    }
    public onDisable()
    {
        super.onDisable();
        HundredWarManager.onCardPushEvent.removeListener(this.getUserInfo, this);
        UserManager.OnGetSimpleUserInfoEvent.removeListener(this.refreshPitInfoByRoleId, this);
        HundredWarManager.onPosChangeEvent.removeListener(this.playerLeave, this);
        HundredWarManager.OnGetPlayerInfoEvent.removeListener(this.setPitInfo, this);
        HundredWarManager.onBetEvent.removeListener(this.refreshSelfPitInfo, this);
        HundredWarManager.onShowCardsAnimOverEvent.removeListener(this.refreshPitInfo, this);
    }

    /**
     * 牌推送后更新坐下玩家的信息
    */
    public getUserInfo()
    {
        if (HundredWarManager.roomInfo.playerList && HundredWarManager.roomInfo.playerList.length > 0)
        {
            this._isRefreshPlayerInfo = true;
            HundredWarManager.startReqPlayerInfo(HundredWarManager.roomInfo.playerList);
        }
    }
    /**
     * 下注成功更新自己座位的信息
    */
    private refreshSelfPitInfo()
    {
        if (HundredWarManager.self && HundredWarManager.self.pos != 0)
        {
            HundredWarManager.self.gold = UserManager.userInfo.gold;
            let pitInfo: HWPitInfo = this.target.getPitInfoByIndex(HundredWarManager.self.pos);
            pitInfo.headComponent.init(HundredWarManager.self);
        }
    }
    /**
     * 刷新坑位数据
    */
    private refreshPitInfo()
    {
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.playerList)
        {
            let pitInfo: HWPitInfo;
            for (let info of HundredWarManager.roomInfo.playerList)
            {
                if (info.roleId == HundredWarManager.sysBanker.roleId && !info.gold)
                {
                    info.copyValueFrom(HundredWarManager.sysBanker);
                }
                pitInfo = this.target.getPitInfoByIndex(info.pos);
                pitInfo.headComponent.init(info);
            }
        }
        this._isRefreshPlayerInfo = false;
    }
    /**
     * 设置坑位数据
    */
    public setPitInfo()
    {
        let pInfo: HWHundredWarRoomPlayerInfo;
        let pitInfo: HWPitInfo;
        for (let i: number = HWPanelSetting.MinPitIndex; i < HWPanelSetting.MaxPitNum; i++)
        {
            pInfo = HundredWarManager.getPlayerInfoByPos(i);
            pitInfo = this.target.getPitInfoByIndex(i);
            if (pInfo && pInfo.pos == 0)
            {
                if (HundredWarManager.isSysBanker(pInfo.roleId))  // 9999为系统庄家  服务器只返回id  其他信息客户端填充
                {
                    pInfo.name = HundredWarManager.sysBanker.name;
                    pInfo.sex = HundredWarManager.sysBanker.sex;
                    pInfo.gold = HundredWarManager.sysBanker.gold;
                    pInfo.head = HundredWarManager.sysBanker.head;
                }
                this.target.bankerNameLabel.text = pInfo.name;
            }
            pitInfo.headComponent.init(pInfo);
            pitInfo.headComponent.visible = true;
        }
    }
    /**
     * 根据玩家roleId更新对应的坑位信息
    */
    public refreshPitInfoByRoleId(data: any)
    {
        if (data)
        {
            HundredWarManager.getPlayerInfoSuccess(data);
            if (!this._isRefreshPlayerInfo)
            {
                if (HundredWarManager.isBanker(data.roleId) && !HundredWarManager.isSysBanker(data.roleId))  //庄家变更时
                {
                    let banker: HWHundredWarRoomPlayerInfo = HundredWarManager.getPlayerInfoByPos(0);
                    banker.gold = HundredWarManager.roomInfo.bankerGold;
                }
                if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.playerList)
                {
                    let pitInfo: HWPitInfo;
                    for (let info of HundredWarManager.roomInfo.playerList)
                    {
                        if (info.roleId == data["roleId"])
                        {
                            pitInfo = this.target.getPitInfoByIndex(info.pos);
                            pitInfo.headComponent.init(info);
                            if (info && info.pos == 0)
                            {
                                this.target.bankerNameLabel.text = info.name;
                            }
                        }
                    }
                }
            } else
            {
                if (HundredWarManager.reqPlayerInfoListClone && HundredWarManager.reqPlayerInfoListClone.length == 0)
                {
                    this._isRefreshPlayerInfo = false;
                }
                HundredWarManager.nextReq();
            }
        }
    }
    /**
     * 玩家离开
    */
    public playerLeave(data: any)
    {
        if (data.pos != 0)
        {
            if (!data.roleId)
            {
                //非庄家玩家离开座位  立即刷新位置信息
                let pitInfo: HWPitInfo;
                pitInfo = this.target.getPitInfoByIndex(data.pos);
                pitInfo.headComponent.init(null);
            }
        }
        if (data.pos == 0 && HundredWarManager.isSysBanker(data.roleId))
        {
            let pitInfo: HWPitInfo;
            pitInfo = this.target.getPitInfoByIndex(data.pos);
            pitInfo.headComponent.init(HundredWarManager.sysBanker);
            this.target.bankerNameLabel.text = HundredWarManager.sysBanker.name;
        }
    }
}