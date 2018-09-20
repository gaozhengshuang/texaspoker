/**
 * 引导管理
*/
class GuideManager
{
    /**
     * 发送设置引导步骤请求
    */
    public static reqSetGuideStep(def: GuideDefinition, next?: number)
    {
        let callback: Function = function (result: qin.SpRpcResult)
        {
            UserManager.userInfo.addGuideRecord(def.phase, def.type);
            qin.Console.log("设置引导步骤完成type" + def.type, "-----phase:" + def.phase);
            GuideManager.onSetGuideStepEvent.dispatch({ id: def.phase, type: def.type, uid: def.id, next: next });
            if (def.awardId > 0)
            {
                PropertyManager.ShowItemList();
            }
        };
        if (def.awardId > 0)
        {
            PropertyManager.OpenGet();
        }
        SocketManager.call(Command.SetGuideStep_Req_3691, { Id: def.phase, Type: def.type }, callback, null, this);
    }
    /**
     * 设置引导步骤成功广播
    */
    public static onSetGuideStepEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
}
