/**
 * 百人大战类型
 */
var HundredWarType;
(function (HundredWarType) {
    /**
     * 欢乐场
     */
    HundredWarType[HundredWarType["FunPattern"] = 1] = "FunPattern";
    /**
     * 富豪场
     */
    HundredWarType[HundredWarType["RichPattern"] = 2] = "RichPattern";
})(HundredWarType || (HundredWarType = {}));
/**
 * 百人大战状态
*/
var HWState;
(function (HWState) {
    /**
     * 等待下一局
    */
    HWState[HWState["WaitNext"] = 0] = "WaitNext";
    /**
     * 下注阶段
    */
    HWState[HWState["Bet"] = 1] = "Bet";
})(HWState || (HWState = {}));
//# sourceMappingURL=HundredWarEnum.js.map