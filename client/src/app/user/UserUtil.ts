/**
 *用户工具
 */
class UserUtil
{
    /**
     *获得当前等级经验百分比
    */
    public static getPercentage(levelValue: number, expValue: number): number
    {
        let nextLevelExp: number;
        if (levelValue == 1)
        {
            return Math.round((expValue / ExpDefined.GetInstance().dataList[1].exp) * 100) / 100;
        }
        else if (levelValue > 1 && levelValue < 100)
        {
            for (var i: number = 1; i < levelValue; i++)
            {
                expValue = expValue - ExpDefined.GetInstance().dataList[i].exp;
            }
            nextLevelExp = ExpDefined.GetInstance().dataList[i].exp;
            return Math.round((expValue / nextLevelExp) * 100) / 100;
        }
        else
        {
            return 0;
        }
    }
    /**
     *获得当前等级经验百分比字符串
    */
    public static getExpStringPercent(levelValue: number, expValue: number): string
    {
        let nextLevelExp: number;
        if (levelValue == 1)
        {
            return expValue + "/" + ExpDefined.GetInstance().dataList[1].exp;
        }
        else if (levelValue > 1 && levelValue < 100)
        {
            for (var i: number = 1; i < levelValue; i++)
            {
                expValue = expValue - ExpDefined.GetInstance().dataList[i].exp;
            }
            nextLevelExp = ExpDefined.GetInstance().dataList[i].exp;
            return expValue + "/" + nextLevelExp;
        }
        else
        {
            return 0 + "/" + 0;
        }
    }
    /**
     * 获得当前等级称号
    */
    public static getTitle(level: number): string
    {
        // for (let i: number = 0; i < ExpDefined.GetInstance().dataList.length; i++) //move todo
        // {
        //     if (level == ExpDefined.GetInstance().dataList[i].level)
        //     {
        //         return ExpDefined.GetInstance().dataList[i].title;
        //     }
        // }
        return null;
    }
    /**
     * 判断昵称是否合法
    */
    public static isLegalNickName(nickNameLable: string): boolean
    {
        let nickName = nickNameLable;
        //是否为空
        if (!nickName)
        {
            AlertManager.showAlert("昵称不能为空");
            return false;
        }
        //长度是否合法
        if (nickName.length > 6)
        {
            AlertManager.showAlert("昵称不能大于6个字");
            return false;
        }
        //格式是否合法
        if (!(/^[\u4e00-\u9fa5\dA-Za-z]+$/.test(nickName)))
        {
            AlertManager.showAlert("昵称只能为汉字、英文和数字");
            return false;
        }
        //是否含有屏蔽词
        if (ForbiddenDefined.GetInstance().isContains(nickName))
        {
            AlertManager.showAlert("您输入的昵称包含屏蔽词");
            return false;
        }
        return true;
    }
    /**
    * 检查密码是否合法
    */
    public static checkPwd(pwd: string, maxChar: number, minChar: number, tips: eui.Label): boolean
    {
        let result: boolean = false;
        if (!maxChar || maxChar < 0 || !minChar || minChar < 0)
        {
            game.Console.log("长度错误");
            return result;
        }
        if (pwd.length == 0)
        {
            tips.text = "*密码不能为空";
        }
        else if (pwd.length > maxChar || pwd.length < minChar)
        {
            if (maxChar == minChar)
            {
                tips.text = "*密码长度为" + maxChar + "位";
            }
            else
            {
                tips.text = "*密码长度为" + minChar + "-" + maxChar + "位";
            }
        }
        else
        {
            result = true;
        }
        return result;
    }
    /**
     * 检查两个密码是否合法且一致
     */
    public static checkTwoPwd(newPwd: string, againPwd: string, maxChar: number, minChar: number, tips: eui.Label): boolean
    {
        let newPwdResult: boolean = UserUtil.checkPwd(newPwd, maxChar, minChar, tips);
        let againPwdResult: boolean = UserUtil.checkPwd(againPwd, maxChar, minChar, tips);
        let result: boolean = false;

        if (newPwd != againPwd)
        {
            tips.text = "*密码两次不一致";
        }
        else if (newPwdResult && againPwdResult)
        {
            result = true;
        }
        return result;
    }


    /**
     * 重置验证码按钮状态
    */
    public static initCode(sendCodeBtn: eui.Button)  
    {
        sendCodeBtn.touchEnabled = true;
        sendCodeBtn.label = "发送验证码";
    }
    /**
     * 禁用验证码按钮状态
    */
    private static forbidCode(sendCodeBtn: eui.Button, time: number)
    {
        sendCodeBtn.touchEnabled = false;
        sendCodeBtn.label = game.DateTimeUtil.formatCountdown(time);
    }
    /**
     * 添加验证码倒计时
    */
    public static timer: Function;
    public static addCodeCountDown(obj: any)
    {
        if (obj.time == undefined)
        {
            obj.time = 60;   //默认60秒
        }
        UserUtil.forbidCode(obj.sendCodeBtn, obj.time);
        obj.leftTime = obj.time;
        UserUtil.timer = function ()
        {
            UserUtil.updateCodeCountDown(obj);
        };
        game.Tick.AddSecondsInvoke(UserUtil.timer, UserUtil);
    }
    /**
     * 移除验证码倒计时
    */
    public static removeCodeCountDown()
    {
        game.Tick.RemoveSecondsInvoke(UserUtil.timer, UserUtil);
    }
    /**
     * 验证码倒计时
    */
    public static updateCodeCountDown(obj: any)
    {
        if (obj.leftTime == 0)
        {
            game.Tick.RemoveSecondsInvoke(UserUtil.timer, UserUtil);
            obj.leftTime = obj.time;
            obj.sendCodeBtn.touchEnabled = true;
            obj.sendCodeBtn.label = "重新发送";
            return;
        }
        obj.leftTime--;
        if (obj.leftTime == 0)
        {
            obj.sendCodeBtn.label = obj.leftTime.toString();
        } else
        {
            obj.sendCodeBtn.label = game.DateTimeUtil.formatCountdown(obj.leftTime);
        }
    }
}