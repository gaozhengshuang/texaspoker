var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/// <summary>
/// 帐号prefs本地储存
/// </summary>
var AccountPlayerPrefs = (function () {
    function AccountPlayerPrefs() {
    }
    AccountPlayerPrefs.Reset = function () {
        AccountPlayerPrefs._accountList = null;
    };
    AccountPlayerPrefs.GetAccountList = function () {
        if (AccountPlayerPrefs._accountList == null) {
            var data = PrefsManager.getValue(AccountPlayerPrefs.PrefsKey);
            try {
                AccountPlayerPrefs._accountList = JSON.parse(data);
            }
            catch (e) {
                qin.Console.log("获取账号列表解析json格式失败：" + data);
            }
        }
        return AccountPlayerPrefs._accountList;
    };
    /// <summary>
    /// 是否有匹配的帐号密码
    /// </summary>
    /// <param name="account"></param>
    /// <param name="pw"></param>
    AccountPlayerPrefs.IsMatchAccountPassword = function (account, pw) {
        var list = AccountPlayerPrefs.GetAccountList();
        if (list != null && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                var info = list[i];
                if (info.account == account && info.pw == pw) {
                    return true;
                }
            }
        }
        return false;
    };
    AccountPlayerPrefs.InsertAccount = function (account, pw, type) {
        if (type === void 0) { type = AccountPwdType.pw; }
        if (AccountPlayerPrefs._accountList == null) {
            AccountPlayerPrefs._accountList = new Array();
        }
        var isHas = false;
        for (var i = 0; i < AccountPlayerPrefs._accountList.length; i++) {
            var info = AccountPlayerPrefs._accountList[i];
            if (info.account == account) {
                if (i == 0 && ((info.pw == pw && info.type == AccountPwdType.pw) || (info.token == pw && info.type == AccountPwdType.token))) {
                    return;
                }
                isHas = true;
                if (type == AccountPwdType.token) {
                    info.token = pw;
                }
                else {
                    info.pw = pw;
                }
                info.type = type;
                if (i > 0) {
                    AccountPlayerPrefs._accountList.splice(i, 1);
                    AccountPlayerPrefs._accountList.unshift(info);
                }
                break;
            }
        }
        if (isHas == false) {
            var info = void 0;
            if (type == AccountPwdType.token) {
                info = { account: account, token: pw, type: type };
            }
            else {
                info = { account: account, pw: pw, type: type };
            }
            AccountPlayerPrefs._accountList.unshift(info);
        }
        if (AccountPlayerPrefs._accountList.length > AccountPlayerPrefs.MaxCount) {
            AccountPlayerPrefs._accountList.splice(AccountPlayerPrefs._accountList.length - 1, 1);
        }
        AccountPlayerPrefs.Flush(AccountPlayerPrefs._accountList);
    };
    AccountPlayerPrefs.RemoveAccount = function (account) {
        if (AccountPlayerPrefs._accountList == null) {
            return;
        }
        for (var i = 0; i < AccountPlayerPrefs._accountList.length; i++) {
            var info = AccountPlayerPrefs._accountList[i];
            if (info.account == account) {
                AccountPlayerPrefs._accountList.splice(i, 1);
                break;
            }
        }
        AccountPlayerPrefs.Flush(AccountPlayerPrefs._accountList);
    };
    AccountPlayerPrefs.Flush = function (list) {
        if (list == null) {
            PrefsManager.removeData(AccountPlayerPrefs.PrefsKey);
            return;
        }
        PrefsManager.setValue(AccountPlayerPrefs.PrefsKey, JSON.stringify(list));
    };
    AccountPlayerPrefs.PrefsKey = "Qingame.Account";
    AccountPlayerPrefs.MaxCount = 5;
    return AccountPlayerPrefs;
}());
__reflect(AccountPlayerPrefs.prototype, "AccountPlayerPrefs");
//# sourceMappingURL=AccountPlayerPrefs.js.map