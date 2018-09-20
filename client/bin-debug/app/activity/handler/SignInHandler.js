var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 签到管理
 */
var SignInHandler = (function (_super) {
    __extends(SignInHandler, _super);
    function SignInHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 签到成功事件
         */
        _this.signInCompleteEvent = new qin.DelegateDispatcher();
        return _this;
    }
    SignInHandler.prototype.initialize = function (info) {
        _super.prototype.initialize.call(this, info);
        var def;
        for (var i = 0; i < SignInDefined.GetInstance().dataList.length; i++) {
            def = SignInDefined.GetInstance().dataList[i];
            this.addSubInfo(info, SignInInfo, def);
        }
        ;
    };
    /**
     * 发送签到请求
     */
    SignInHandler.prototype.reqSignIn = function (id, subId) {
        ActivityManager.ReqGetActivityAward(id, subId + 1);
    };
    SignInHandler.prototype.onGetAwardComplete = function (id, subId) {
        _super.prototype.onGetAwardComplete.call(this, id, subId);
        var info = this.getInfo(id);
        if (info) {
            info.jsonObj.isSignIn = true;
            info.jsonObj.SignTime = TimeManager.GetServerUtcTimestamp();
            info.step++;
        }
        this.signInCompleteEvent.dispatch();
    };
    /**
     * 今天是否签到 不传则是需要默认找一个签到活动类型
    */
    SignInHandler.prototype.isSignToday = function (id) {
        var info = this.getInfo(id);
        if (id == undefined) {
            info = ActivityManager.getOpenAchivityByType(ActivityType.Signin);
        }
        else {
            info = this.getInfo(id);
        }
        if (info) {
            if (info.jsonObj == undefined || info.jsonObj.SignTime == undefined) {
                return false;
            }
            var now = TimeManager.GetServerLocalDateTime();
            var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            var signTime = new Date(info.jsonObj.SignTime * 1000);
            if (signTime < today) {
                return false;
            }
            else {
                return true;
            }
        }
        return false;
    };
    /**
     * 生成获得物品的描述
     */
    SignInHandler.prototype.getAwardDes = function (awardDef) {
        var result = qin.StringConstants.Empty;
        if (awardDef && awardDef.rewardList) {
            for (var i = 0; i < awardDef.rewardList.length; i++) {
                result += ItemDefined.GetInstance().getDefinition(awardDef.rewardList[i].id).name + "*" + awardDef.rewardList[i].count;
                if (i < awardDef.rewardList.length - 1) {
                    result += ",";
                }
            }
        }
        return result;
    };
    return SignInHandler;
}(BaseActivitySubHandler));
__reflect(SignInHandler.prototype, "SignInHandler");
//# sourceMappingURL=SignInHandler.js.map