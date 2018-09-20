var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/// <summary>
/// 验证码处理类
/// </summary>
var AccountVerifyCode = (function () {
    function AccountVerifyCode() {
        this._isAgain = false;
    }
    Object.defineProperty(AccountVerifyCode.prototype, "isAgain", {
        get: function () {
            return this._isAgain;
        },
        enumerable: true,
        configurable: true
    });
    AccountVerifyCode.prototype.AccountVerifyCode = function (label) {
        this._label = label;
        this._label.text = qin.StringConstants.Empty;
    };
    AccountVerifyCode.prototype.Reset = function () {
        this._vcTime = 0;
        this._isAgain = false;
        qin.Tick.AddSecondsInvoke(this.OnTick, this);
        this.OnTick(0);
    };
    AccountVerifyCode.prototype.OnEnable = function () {
        AccountManager.OnAgainMobileCode.addListener(this.OnAgainMobileCode, this);
    };
    AccountVerifyCode.prototype.OnDisable = function () {
        AccountManager.OnAgainMobileCode.removeListener(this.OnAgainMobileCode, this);
        qin.Tick.RemoveSecondsInvoke(this.OnTick, this);
    };
    AccountVerifyCode.prototype.OnAgainMobileCode = function () {
        this.Reset();
    };
    AccountVerifyCode.prototype.OnTick = function (delta) {
        this._vcTime += delta;
        if (this._vcTime >= AccountConfig.MobileCodeTimeout) {
            qin.Tick.RemoveSecondsInvoke(this.OnTick, this);
            this._label.text = "获取验证码";
            this._isAgain = true;
        }
        else {
            this._label.text = qin.DateTimeUtil.countDownFormat(AccountConfig.MobileCodeTimeout - this._vcTime, false) + "秒";
        }
    };
    return AccountVerifyCode;
}());
__reflect(AccountVerifyCode.prototype, "AccountVerifyCode");
//# sourceMappingURL=AccountVerifyCode.js.map