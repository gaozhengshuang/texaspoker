var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 引导管理
*/
var GuideManager = (function () {
    function GuideManager() {
    }
    /**
     * 发送设置引导步骤请求
    */
    GuideManager.reqSetGuideStep = function (def, next) {
        var callback = function (result) {
            UserManager.userInfo.addGuideRecord(def.phase, def.type);
            qin.Console.log("设置引导步骤完成type" + def.type, "-----phase:" + def.phase);
            GuideManager.onSetGuideStepEvent.dispatch({ id: def.phase, type: def.type, uid: def.id, next: next });
            if (def.awardId > 0) {
                PropertyManager.ShowItemList();
            }
        };
        if (def.awardId > 0) {
            PropertyManager.OpenGet();
        }
        SocketManager.call(Command.SetGuideStep_Req_3691, { Id: def.phase, Type: def.type }, callback, null, this);
    };
    /**
     * 设置引导步骤成功广播
    */
    GuideManager.onSetGuideStepEvent = new qin.DelegateDispatcher();
    return GuideManager;
}());
__reflect(GuideManager.prototype, "GuideManager");
//# sourceMappingURL=GuideManager.js.map