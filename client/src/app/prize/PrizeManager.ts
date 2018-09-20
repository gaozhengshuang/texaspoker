/**
 * 我的奖品管理
*/
class PrizeManager
{
    /**
     * 拉取已领取列表 
    */
    public static reqGetAwardList(startId: number = 0, count: number = 10)
    {
        let callback: Function = function (result: qin.SpRpcResult)
        {
            let isBottom: boolean = true;
            let hasReceiveList: Array<PrizeInfo> = new Array<PrizeInfo>();
            if (result.data && result.data.Array)
            {
                if (result.data.Array.length < count)
                {
                    isBottom = true;
                } else
                {
                    isBottom = false;
                }
                for (let arrayInfo of result.data.Array)
                {
                    let info: PrizeInfo;
                    info = arrayInfo;
                    info.isGet = 2;
                    hasReceiveList.push(info);
                }
            }
            PrizeManager.onGetAwardListEvent.dispatch({ isBottom: isBottom, hasReceiveList: hasReceiveList });
        };
        SocketManager.call(Command.PrizeGetList_Req_3684, { startId: startId, count: count }, callback, null, this);
    }
    /**
     * 发送领取奖品请求
    */
    public static reqGetAward(id: number)
    {
        let callback: Function = function (result: qin.SpRpcResult)
        {
            PrizeManager.onGetAwardEvent.dispatch(id);
        };
        SocketManager.call(Command.Req_UseItem_3021, { Id: id, Count: 1, msg: null }, callback, null, this);
    }
    /**
     * 拉取收货信息
    */
    public static getAddressInfo()
    {
        let callback: Function = function (result: qin.SpRpcResult)
        {
            if (result.data)
            {
                UserManager.userInfo.addressName = result.data.name;
                UserManager.userInfo.address = result.data.address;
                UserManager.userInfo.phoneNum = result.data.phone;
                UserManager.userInfo.qqNum = result.data.qq;
                UserManager.userInfo.eMail = result.data.mail;
            }
            PrizeManager.onGetAddressInfoEvent.dispatch();
        };
        SocketManager.call(Command.PrizeGetTakeInfo_Req_3687, null, callback, null, this);
    }
    /**
     * 发送保存领奖信息请求
    */
    public static reqSaveInfo(name: string, tel: string, qq: string, email: string, address: string)
    {
        let callback: Function = function (result: qin.SpRpcResult)
        {
            UserManager.userInfo.addressName = name;
            UserManager.userInfo.address = address;
            UserManager.userInfo.phoneNum = tel;
            UserManager.userInfo.qqNum = qq;
            UserManager.userInfo.eMail = email;
            AlertManager.showAlert("领奖信息保存成功");
        };
        SocketManager.call(Command.PrizeSave_Req_3686, { name: name, phone: tel, qq: qq, mail: email, address: address }, callback, null, this);
    }
    /**
     * 拉取订单详情
    */
    public static getOrderDetailInfo(id: number)
    {
        let callback: Function = function (result: qin.SpRpcResult)
        {
            if (result.data)
            {
                PrizeManager.onGetOrderDetailInfoEvent.dispatch(result.data);
            }
        };
        SocketManager.call(Command.PrizeGetDetails_Req_3685, { id: id }, callback, null, this);
    }

    /**
     * 获取已领取奖品信息成功后发送的广播
    */
    public static onGetAwardListEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 领取奖品成功后发送的广播
    */
    public static onGetAwardEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 跳转到领奖信息的广播
    */
    public static onSkipEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 拉取收货信息成功回调
    */
    public static onGetAddressInfoEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 拉取订单详情成功回调
    */
    public static onGetOrderDetailInfoEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
}
/**
 * 订单状态
*/
enum OrderStateType
{
    /**
     * 等待发货 
    */
    WaitSend = 0,
    /**
     * 已发货
    */
    Sent = 1,
    /**
     * 信息有误
    */
    InfoError = 2,
}