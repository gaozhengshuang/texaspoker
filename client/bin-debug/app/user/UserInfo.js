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
 * 用户信息
 */
var UserInfo = (function (_super) {
    __extends(UserInfo, _super);
    function UserInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
        * 头像宽高
        */
        _this.width = 100;
        _this.height = 100;
        return _this;
    }
    UserInfo.prototype.copyValueFrom = function (data) {
        _super.prototype.copyValueFrom.call(this, data);
        if (data["maxHand"]) {
            this.maxHandList = new Array();
            GamblingUtil.cardArr2CardInfoList(data["maxHand"], this.maxHandList);
            CardTypeMatchUtil.matchCardType(this.maxHandList);
            this.maxHandName = CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
        }
    };
    UserInfo.prototype.reset = function () {
        this._diamond = 0;
        this._gold = 0;
        this._saveGold = 0;
        this.timestamp = 0;
        this.timezone = 0;
        this.roleId = 0;
        this.name = qin.StringConstants.Empty;
        this.head = null;
        this.sex = 0;
        this.level = 0;
        this.exp = 0;
        this.ip = qin.StringConstants.Empty;
        this.sign = qin.StringConstants.Empty;
        this.age = 0;
        this.lastGoldTime = Math.round(TimeManager.Utc1970.getTime() / 1000);
        //概况
        this.createdTime = Math.round(TimeManager.Utc1970.getTime() / 1000);
        this.maxGold = 0;
        this.maxGoldOnetimes = 0;
        this._friendNum = 0;
        this.gameTimes = 0;
        this.winTimes = 0;
        this.entryTimes = 0;
        this.showdownTimes = 0;
        this.maxHandList = undefined;
        this.maxHandName = qin.StringConstants.Empty;
        this.mttJoinTimes = 0;
        this.mttPrizeTimes = 0;
        this.gameTimes2 = 0;
        this.winTimes2 = 0;
        this.entryTimes2 = 0;
        this.showdownTimes2 = 0;
        this.championTimes = 0;
        //收货信息
        this.addressName = qin.StringConstants.Empty;
        this.phoneNum = qin.StringConstants.Empty;
        this.qqNum = qin.StringConstants.Empty;
        this.eMail = qin.StringConstants.Empty;
        this.address = qin.StringConstants.Empty;
        //Vip信息
        this.vipType = 0;
        // this.vipLevel = 0;
        this.vipExp = 0;
        this.vipSpeed = 0;
        this.vipTime = 0;
        this.yearVipTime = 0;
        //成就和任务信息
        this.allAchieveList = null;
        //状态
        this.isOffline = undefined;
        this.stateId = 0;
        this.stateConfId = 0;
        this._isHeadVerify = false;
        //
        this.mno = undefined;
        //
        this.FuncList = undefined;
        //邀请
        this.bindRoleId = 0;
        this.shareId = undefined;
    };
    Object.defineProperty(UserInfo.prototype, "diamond", {
        get: function () {
            return this._diamond;
        },
        set: function (value) {
            this._diamond = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "gold", {
        get: function () {
            return this._gold;
        },
        set: function (value) {
            this._gold = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "safeGold", {
        get: function () {
            return this._saveGold;
        },
        set: function (value) {
            this._saveGold = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "verifyHead", {
        get: function () {
            return this._verifyHead;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "head", {
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
    Object.defineProperty(UserInfo.prototype, "isHeadVerify", {
        /**
         * 获取头像审核状态
         */
        get: function () {
            return this._isHeadVerify;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "isHeadUnPass", {
        /**
         * 头像上传审核未通过
         */
        get: function () {
            return this._isHeadUnPass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "friendNum", {
        get: function () {
            if (this.roleId == UserManager.userInfo.roleId && FriendManager.friendList) {
                return FriendManager.friendList.length;
            }
            else {
                return this._friendNum;
            }
        },
        set: function (value) {
            this._friendNum = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "vipLevel", {
        /**
         * 会员等级
         */
        get: function () {
            if (VipManager.isVip(this)) {
                return VipDefined.GetInstance().getVipLevel(this.vipExp);
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "userState", {
        /**
         * 用户状态
         */
        get: function () {
            return UserManager.getUserState(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 添加引导记录
     */
    UserInfo.prototype.addGuideRecord = function (id, type) {
        if (!this.FuncList) {
            this.FuncList = new Array();
        }
        var guidInfo = this.getGuideInfo(type);
        if (!guidInfo) {
            guidInfo = new GuideInfo();
        }
        guidInfo.Id = id;
        guidInfo.Type = type;
        this.FuncList.push(guidInfo);
    };
    /**
     * 获取引导记录
     */
    UserInfo.prototype.getGuideInfo = function (type) {
        var info;
        if (this.FuncList) {
            for (var i = 0; i < this.FuncList.length; i++) {
                info = this.FuncList[i];
                if (info.Type == type) {
                    return info;
                }
            }
        }
        return info;
    };
    return UserInfo;
}(BaseServerValueInfo));
__reflect(UserInfo.prototype, "UserInfo", ["IBaseHead"]);
//# sourceMappingURL=UserInfo.js.map