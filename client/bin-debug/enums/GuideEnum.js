/**
 * 引导类型
 */
var GuideType;
(function (GuideType) {
    GuideType[GuideType["None"] = 0] = "None";
    /**
     * 新手引导
     */
    GuideType[GuideType["NewUser"] = 1] = "NewUser";
})(GuideType || (GuideType = {}));
/**
 * 引导触发类型
 */
var GuideTriggerType;
(function (GuideTriggerType) {
    GuideTriggerType[GuideTriggerType["None"] = 0] = "None";
    /**
     * 登录到大厅触发
     */
    GuideTriggerType[GuideTriggerType["Login_Hall"] = 1] = "Login_Hall";
})(GuideTriggerType || (GuideTriggerType = {}));
/**
 * 引导步骤类型
 */
var GuideStepType;
(function (GuideStepType) {
    GuideStepType[GuideStepType["None"] = 0] = "None";
    /**
     * 创建房间
     */
    GuideStepType[GuideStepType["CreateRoom"] = 1] = "CreateRoom";
    /**
     * 发牌
     */
    GuideStepType[GuideStepType["FlopCard"] = 2] = "FlopCard";
    /**
     * 发公共牌
     */
    GuideStepType[GuideStepType["BoardCard"] = 3] = "BoardCard";
    /**
     * 需要玩家手动操作的行为 (加注，跟注，allin，弃牌)
     */
    GuideStepType[GuideStepType["Action"] = 5] = "Action";
    /**
     * 引导提示
     */
    GuideStepType[GuideStepType["Tips"] = 6] = "Tips";
    /**
     * 打开面板
     */
    GuideStepType[GuideStepType["OpenPanel"] = 7] = "OpenPanel";
    /**
     * 牌局结算
     */
    GuideStepType[GuideStepType["GamblingOver"] = 8] = "GamblingOver";
    /**
     * 点击
     */
    GuideStepType[GuideStepType["Click"] = 9] = "Click";
    /**
     * 滑动
     */
    GuideStepType[GuideStepType["Slide"] = 10] = "Slide";
    /**
     * 场景切换
     */
    GuideStepType[GuideStepType["SwitchScene"] = 11] = "SwitchScene";
    /**
     * 指示
     */
    GuideStepType[GuideStepType["Prompt"] = 12] = "Prompt";
    /**
     * 隐藏组件
     */
    GuideStepType[GuideStepType["HideComponent"] = 13] = "HideComponent";
    /**
     * 执行面板函数
     */
    GuideStepType[GuideStepType["RunPanelFunc"] = 14] = "RunPanelFunc";
})(GuideStepType || (GuideStepType = {}));
/**
 * 引导tips or 指示方向
 */
var GuideTipsOrientation;
(function (GuideTipsOrientation) {
    GuideTipsOrientation[GuideTipsOrientation["None"] = 0] = "None";
    /**
     * 上
     */
    GuideTipsOrientation[GuideTipsOrientation["Up"] = 1] = "Up";
    /**
     * 下
     */
    GuideTipsOrientation[GuideTipsOrientation["Down"] = 2] = "Down";
    /**
     * 左
     */
    GuideTipsOrientation[GuideTipsOrientation["Left"] = 3] = "Left";
    /**
     * 右
     */
    GuideTipsOrientation[GuideTipsOrientation["Right"] = 4] = "Right";
})(GuideTipsOrientation || (GuideTipsOrientation = {}));
/**
 * 新手引导选择面板类型
*/
var GuideChooseType;
(function (GuideChooseType) {
    /**
     * 进入新手引导选择
    */
    GuideChooseType[GuideChooseType["IsEnterGuide"] = 1] = "IsEnterGuide";
    /**
     * 进入训练营选择
    */
    GuideChooseType[GuideChooseType["IsEnterTrainingCamp"] = 2] = "IsEnterTrainingCamp";
})(GuideChooseType || (GuideChooseType = {}));
//# sourceMappingURL=GuideEnum.js.map