/**
 * 邀请管理
 */
class InviteManager
{
    /**
     * 奖励信息
    */
    public static inviteAwardInfo: InviteAwardInfo;
    /**
     * 刷新时间
    */
    private static _time: number;

    public static initialize(result: game.SpRpcResult)
    {
        //设置奖励数据
        InviteManager.setAwardInfo(result);
        game.Tick.AddSecondsInvoke(InviteManager.refreshAwardInfo, InviteManager);
    }
    /**
     * 发送绑定邀请码请求
    */
    public static reqBindInviteCode(shareId: string)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            if (result.data)
            {
                UserManager.userInfo.bindRoleId = result.data.bindRoleId;
                InviteManager.OnBindInviteCodeEvent.dispatch();
            }
        };
        let errorCallback: Function = function (result: game.SpRpcResult)
        {
            if (result.data)
            {
                AlertManager.showAlert("此邀请码不正确，请检查后重新输入");
            }
        };
        SocketManager.call(Command.BindInviteCode_Req_3708, { shareId: shareId }, callback, errorCallback, this);
    }
    /**
     * 拉取邀请奖励数据
    */
    public static reqInviteAward()
    {
        SocketManager.call(Command.InviteAward_Req_3714, null, InviteManager.setAwardInfo, null, this);
    }
    /**
     * 设置奖励数据
    */
    public static setAwardInfo(result: game.SpRpcResult)
    {
        if (result.data)
        {
            if (!InviteManager.inviteAwardInfo)
            {
                InviteManager.inviteAwardInfo = new InviteAwardInfo();
            }
            InviteManager.inviteAwardInfo.reset();
            if (result.data.getBean)
            {
                result.data.getBean = result.data.getBean * ProjectDefined.GetInstance().finishSelf;
            }
            if (result.data.gotBean)
            {
                result.data.gotBean = result.data.gotBean * ProjectDefined.GetInstance().finishSelf;
            }
            InviteManager.inviteAwardInfo.copyValueFrom(result.data);
            InviteManager.OnInviteAwardEvent.dispatch();
        }
        InviteManager._time = 0;
    }
    /**
     * 发送获取绑定数据请求
    */
    public static reqBindListInfo(startId: number = 0, count: number = 10)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            let isBottom: boolean = true;
            let bindList: Array<InviteBindInfo> = new Array<InviteBindInfo>();
            if (result.data && result.data.logList)
            {
                if (result.data.logList.length < count)
                {
                    isBottom = true;
                } else
                {
                    isBottom = false;
                }
                for (let info of result.data.logList)
                {
                    let bindInfo: InviteBindInfo = new InviteBindInfo();
                    bindInfo.copyValueFrom(info);
                    bindList.push(bindInfo);
                }
            }
            InviteManager.OnBindListInfoEvent.dispatch({ isBottom: isBottom, bindList: bindList });
        };
        SocketManager.call(Command.NewGiftFinish_Req_3709, { startId: startId, count: count }, callback, null, this);
    }
    /**
     * 发送获取充值信息请求
    */
    public static reqPayListInfo(startId: number = 0, count: number = 10)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            let isBottom: boolean = true;
            let payList: Array<InviteBindInfo> = new Array<InviteBindInfo>();
            if (result.data && result.data.logList)
            {
                if (result.data.logList.length < count)
                {
                    isBottom = true;
                } else
                {
                    isBottom = false;
                }
                for (let info of result.data.logList)
                {
                    let payInfo: InviteBindInfo = new InviteBindInfo();
                    payInfo.copyValueFrom(info);
                    payList.push(payInfo);
                }
            }
            InviteManager.OnPayListInfoEvent.dispatch({ isBottom: isBottom, payList: payList });
        };
        SocketManager.call(Command.BindPay_Req_3710, { startId: startId, count: count }, callback, null, this);
    }
    /**
     * 发送领取金豆请求
    */
    public static reqBringBean()
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            PropertyManager.ShowItemList();
            InviteManager.OnBringBeanEvent.dispatch();
        };
        PropertyManager.OpenGet();
        SocketManager.call(Command.BringNewGiftGoldBean_Req_3711, null, callback, null, this);
    }
    /**
     * 发送领取金币请求
    */
    public static reqBringGold()
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            PropertyManager.ShowItemList();
            InviteManager.OnBringGoldEvent.dispatch();
        };
        PropertyManager.OpenGet();
        SocketManager.call(Command.BringBindGold_Req_3712, null, callback, null, this);
    }

    /**
     * 判断是否有可领取的奖励
    */
    public static get isCanBring(): boolean
    {
        if (InviteManager.inviteAwardInfo)
        {
            if (InviteManager.inviteAwardInfo.getBean > 0 || InviteManager.inviteAwardInfo.getGold > 0)
            {
                return true;
            }
        }
        return false;
    }
    /**
	 * 判断邀请功能是否在开启时间内
	*/
    public static get isInviteOpen(): boolean
    {
        let inviteDef: any = ProjectDefined.GetInstance().invite;
        if (inviteDef)
        {
            let dt: Date = TimeManager.GetServerLocalDateTime();
            let startDt: Date;
            let endDt: Date;
            if (inviteDef.startTime)
            {
                startDt = ActivityDefined.GetInstance().getDate(inviteDef, inviteDef.startTime);
            } else
            {
                inviteDef.startDt = TimeManager.Utc1970;
            }
            if (inviteDef.endTime)
            {
                endDt = ActivityDefined.GetInstance().getDate(inviteDef, inviteDef.endTime);
            }
            else
            {
                endDt = new Date(2099, 0, 1, 0, 0, 0);
            }
            if (dt >= startDt && dt < endDt)
            {
                return true;
            }
        }
        return false;
    }
    /**
     * 定时刷新奖励数据
    */
    private static refreshAwardInfo()
    {
        InviteManager._time++;
        if (InviteManager._time >= 300)
        {
            InviteManager._time = 0;
            InviteManager.reqInviteAward();
        }
    }

    /**
     *绑定好友邀请码成功
    */
    public static OnBindInviteCodeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 领取新人礼金豆奖励成功
    */
    public static OnBringBeanEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 领取绑定充值金币奖励成功
    */
    public static OnBringGoldEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 获取绑定数据成功
    */
    public static OnBindListInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 获取充值数据成功
    */
    public static OnPayListInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 获取奖励数据成功
    */
    public static OnInviteAwardEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}
