var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *用户工具
 */
var UserUtil = (function () {
    function UserUtil() {
    }
    /**
     *获得当前等级经验百分比
    */
    UserUtil.getPercentage = function (levelValue, expValue) {
        var nextLevelExp;
        if (levelValue == 1) {
            return Math.round((expValue / ExpDefined.GetInstance().dataList[1].exp) * 100) / 100;
        }
        else if (levelValue > 1 && levelValue < 100) {
            for (var i = 1; i < levelValue; i++) {
                expValue = expValue - ExpDefined.GetInstance().dataList[i].exp;
            }
            nextLevelExp = ExpDefined.GetInstance().dataList[i].exp;
            return Math.round((expValue / nextLevelExp) * 100) / 100;
        }
        else {
            return 0;
        }
    };
    /**
     *获得当前等级经验百分比字符串
    */
    UserUtil.getExpStringPercent = function (levelValue, expValue) {
        var nextLevelExp;
        if (levelValue == 1) {
            return expValue + "/" + ExpDefined.GetInstance().dataList[1].exp;
        }
        else if (levelValue > 1 && levelValue < 100) {
            for (var i = 1; i < levelValue; i++) {
                expValue = expValue - ExpDefined.GetInstance().dataList[i].exp;
            }
            nextLevelExp = ExpDefined.GetInstance().dataList[i].exp;
            return expValue + "/" + nextLevelExp;
        }
        else {
            return 0 + "/" + 0;
        }
    };
    /**
     * 获得当前等级称号
    */
    UserUtil.getTitle = function (level) {
        for (var i = 0; i < ExpDefined.GetInstance().dataList.length; i++) {
            if (level == ExpDefined.GetInstance().dataList[i].level) {
                return ExpDefined.GetInstance().dataList[i].title;
            }
        }
        return null;
    };
    /**
     * 判断昵称是否合法
    */
    UserUtil.isLegalNickName = function (nickNameLable) {
        var nickName = nickNameLable;
        //是否为空
        if (!nickName) {
            AlertManager.showAlert("昵称不能为空");
            return false;
        }
        //长度是否合法
        if (nickName.length > 6) {
            AlertManager.showAlert("昵称不能大于6个字");
            return false;
        }
        //格式是否合法
        if (!(/^[\u4e00-\u9fa5\dA-Za-z]+$/.test(nickName))) {
            AlertManager.showAlert("昵称只能为汉字、英文和数字");
            return false;
        }
        //是否含有屏蔽词
        if (ForbiddenDefined.GetInstance().isContains(nickName)) {
            AlertManager.showAlert("您输入的昵称包含屏蔽词");
            return false;
        }
        return true;
    };
    /**
    * 检查密码是否合法
    */
    UserUtil.checkPwd = function (pwd, maxChar, minChar, tips) {
        var result = false;
        if (!maxChar || maxChar < 0 || !minChar || minChar < 0) {
            qin.Console.log("长度错误");
            return result;
        }
        if (pwd.length == 0) {
            tips.text = "*密码不能为空";
        }
        else if (pwd.length > maxChar || pwd.length < minChar) {
            if (maxChar == minChar) {
                tips.text = "*密码长度为" + maxChar + "位";
            }
            else {
                tips.text = "*密码长度为" + minChar + "-" + maxChar + "位";
            }
        }
        else {
            result = true;
        }
        return result;
    };
    /**
     * 检查两个密码是否合法且一致
     */
    UserUtil.checkTwoPwd = function (newPwd, againPwd, maxChar, minChar, tips) {
        var newPwdResult = UserUtil.checkPwd(newPwd, maxChar, minChar, tips);
        var againPwdResult = UserUtil.checkPwd(againPwd, maxChar, minChar, tips);
        var result = false;
        if (newPwd != againPwd) {
            tips.text = "*密码两次不一致";
        }
        else if (newPwdResult && againPwdResult) {
            result = true;
        }
        return result;
    };
    /**
     * 重置验证码按钮状态
    */
    UserUtil.initCode = function (sendCodeBtn) {
        sendCodeBtn.touchEnabled = true;
        sendCodeBtn.label = "发送验证码";
    };
    /**
     * 禁用验证码按钮状态
    */
    UserUtil.forbidCode = function (sendCodeBtn, time) {
        sendCodeBtn.touchEnabled = false;
        sendCodeBtn.label = qin.DateTimeUtil.formatCountdown(time);
    };
    UserUtil.addCodeCountDown = function (obj) {
        if (obj.time == undefined) {
            obj.time = 60; //默认60秒
        }
        UserUtil.forbidCode(obj.sendCodeBtn, obj.time);
        obj.leftTime = obj.time;
        UserUtil.timer = function () {
            UserUtil.updateCodeCountDown(obj);
        };
        qin.Tick.AddSecondsInvoke(UserUtil.timer, UserUtil);
    };
    /**
     * 移除验证码倒计时
    */
    UserUtil.removeCodeCountDown = function () {
        qin.Tick.RemoveSecondsInvoke(UserUtil.timer, UserUtil);
    };
    /**
     * 验证码倒计时
    */
    UserUtil.updateCodeCountDown = function (obj) {
        if (obj.leftTime == 0) {
            qin.Tick.RemoveSecondsInvoke(UserUtil.timer, UserUtil);
            obj.leftTime = obj.time;
            obj.sendCodeBtn.touchEnabled = true;
            obj.sendCodeBtn.label = "重新发送";
            return;
        }
        obj.leftTime--;
        if (obj.leftTime == 0) {
            obj.sendCodeBtn.label = obj.leftTime.toString();
        }
        else {
            obj.sendCodeBtn.label = qin.DateTimeUtil.formatCountdown(obj.leftTime);
        }
    };
    return UserUtil;
}());
__reflect(UserUtil.prototype, "UserUtil");
//# sourceMappingURL=UserUtil.js.map