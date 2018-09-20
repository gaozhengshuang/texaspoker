var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏配置
 * */
var GameSetting = (function () {
    function GameSetting() {
    }
    Object.defineProperty(GameSetting, "shakeEnabled", {
        /**
         * 是否开启震动
         */
        get: function () {
            if (GameSetting._shakeEnabled === undefined) {
                GameSetting._shakeEnabled = PrefsManager.getBoolean(PrefsManager.Shake_Enable, true);
            }
            return GameSetting._shakeEnabled;
        },
        set: function (value) {
            GameSetting._shakeEnabled = value;
            PrefsManager.setBoolean(PrefsManager.Shake_Enable, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameSetting, "autoVoiceEnabled", {
        get: function () {
            if (GameSetting._autoVoiceEnabled === undefined) {
                GameSetting._autoVoiceEnabled = PrefsManager.getBoolean(PrefsManager.AutoVocie_Enable, true);
            }
            return GameSetting._autoVoiceEnabled;
        },
        set: function (value) {
            GameSetting._autoVoiceEnabled = value;
            PrefsManager.setBoolean(PrefsManager.AutoVocie_Enable, value);
        },
        enumerable: true,
        configurable: true
    });
    GameSetting.replaceHeadSign = function (targetStr) {
        return targetStr.replace(/#[12]{1}#/g, qin.StringConstants.Empty);
    };
    /**
     * 应用id
     */
    GameSetting.AppId = '1004';
    /**
     * 舞台宽高
     * */
    GameSetting.StageWidth = 720;
    GameSetting.StageHeight = 1280;
    /**
     * 是否同意了用户协议
     */
    GameSetting.IsAgreeUserAgreement = false;
    /**
     * 最大邮件数量
     */
    GameSetting.MaxMailNum = 30;
    /**
     * 头像上传审核标记
     */
    GameSetting.HeadUploadVerifySign = "#1#";
    /**
     * 头像上传审核未通过
     */
    GameSetting.HeadUploadUnPassSign = "#2#";
    return GameSetting;
}());
__reflect(GameSetting.prototype, "GameSetting");
//# sourceMappingURL=GameSetting.js.map