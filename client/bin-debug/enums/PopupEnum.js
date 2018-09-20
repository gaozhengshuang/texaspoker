/**
 * 弹窗类型
 */
var PopupType;
(function (PopupType) {
    /**
     * 创建角色
     */
    PopupType[PopupType["CreateRole"] = 1] = "CreateRole";
    /**
     * 引导
     */
    PopupType[PopupType["Guide"] = 2] = "Guide";
    /**
    * 文字公告
    */
    PopupType[PopupType["TextNotify"] = 3] = "TextNotify";
    /**
    * 图片公告
    */
    PopupType[PopupType["ImageNotify"] = 4] = "ImageNotify";
    /**
     * 签到
     */
    PopupType[PopupType["SignIn"] = 5] = "SignIn";
    /**
     * 首冲
     */
    PopupType[PopupType["FirstPay"] = 6] = "FirstPay";
})(PopupType || (PopupType = {}));
/**
 * 触发弹窗类型
 */
var PopupTriggerType;
(function (PopupTriggerType) {
    /**
     * 打开面板触发
     */
    PopupTriggerType[PopupTriggerType["OpenPanel"] = 1] = "OpenPanel";
    /**
     * 关闭面板触发
     */
    PopupTriggerType[PopupTriggerType["ClosePanel"] = 2] = "ClosePanel";
    /**
     * 引导完毕触发
     */
    PopupTriggerType[PopupTriggerType["GuideComplete"] = 3] = "GuideComplete";
})(PopupTriggerType || (PopupTriggerType = {}));
//# sourceMappingURL=PopupEnum.js.map