/**
 * 绑定大礼包管理
 */
class BindPhoneAwardHandler extends BaseActivitySubHandler<BindPhoneAwardInfo>
{
    public initialize(info: ActivityInfo)
    {
        super.initialize(info);
        let def: ActivityPhoneDefintion;
        let pInfo: BindPhoneAwardInfo;
        for (let i: number = 0; i < ActivityPhoneDefined.GetInstance().dataList.length; i++) //填充子列表信息
        {
            def = ActivityPhoneDefined.GetInstance().dataList[i];
            pInfo = this.addSubInfo(info, BindPhoneAwardInfo, def);
        };
    }
    /**
	 *兑换完成操作
	 */
    public onGetAwardComplete(id: number, subId: number)
    {
        this.bringSuccessEvent.dispatch(id);
    }
    /**
     * 领取奖励成功
    */
    public bringSuccessEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
}