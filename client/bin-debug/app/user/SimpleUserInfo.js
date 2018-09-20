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
 * 简单的用户信息
*/
var SimpleUserInfo = (function (_super) {
    __extends(SimpleUserInfo, _super);
    function SimpleUserInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SimpleUserInfo.prototype, "verifyHead", {
        get: function () {
            return this._verifyHead;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleUserInfo.prototype, "head", {
        get: function () {
            if (qin.StringUtil.isNullOrEmpty(this._head)) {
                return SheetSubName.getdefaultHead(this.sex);
            }
            else {
                return this._head;
            }
        },
        set: function (value) {
            this._isHeadUnPass = false;
            this._isHeadVerify = false;
            if (qin.StringUtil.isNullOrEmpty(value) == false) {
                this._isHeadVerify = value.indexOf(GameSetting.HeadUploadVerifySign) != -1;
                this._isHeadUnPass = value.indexOf(GameSetting.HeadUploadUnPassSign) != -1;
                if (this._isHeadVerify) {
                    var heads = value.split(GameSetting.HeadUploadVerifySign);
                    value = heads[0];
                    this._verifyHead = heads[1];
                }
            }
            this._head = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleUserInfo.prototype, "isHeadVerify", {
        /**
         * 获取头像审核状态
         */
        get: function () {
            return this._isHeadVerify;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleUserInfo.prototype, "isHeadUnPass", {
        /**
         * 头像上传审核未通过
         */
        get: function () {
            return this._isHeadUnPass;
        },
        enumerable: true,
        configurable: true
    });
    SimpleUserInfo.prototype.reset = function () {
        this.roleId = 0;
        this.head = null;
        this.name = null;
        this.sex = undefined;
        this.gold = undefined;
        this.vipLevel = undefined;
    };
    return SimpleUserInfo;
}(BaseServerValueInfo));
__reflect(SimpleUserInfo.prototype, "SimpleUserInfo");
//# sourceMappingURL=SimpleUserInfo.js.map