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
 * 游戏功能配置定义
 */
var ProjectDefined = (function (_super) {
    __extends(ProjectDefined, _super);
    function ProjectDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProjectDefined.GetInstance = function () {
        if (ProjectDefined._instance == null) {
            ProjectDefined._instance = new ProjectDefined();
        }
        if (DefinedManager.IsParsed(ProjectDefined.projectConfig) == false) {
            ProjectDefined._instance.initialize();
        }
        return ProjectDefined._instance;
    };
    ProjectDefined.prototype.initialize = function () {
        this._projectObject = DefinedManager.GetData(ProjectDefined.projectConfig);
        this.vipSpeed = this._projectObject.vipSpeed;
        this.MTTBuyTimeoutClient = this._projectObject.MTTBuyTimeoutClient;
        this.mTTIntervalTime = this._projectObject.mTTIntervalTime;
        if (this.mTTIntervalTime < 60) {
            this.mTTIntervalTime = 60;
        }
        ProjectDefined.giveOnceGoldNum = this._projectObject.giveOnceGoldNum;
    };
    ProjectDefined.prototype.getValue = function (key) {
        if (this._projectObject) {
            return this._projectObject[key];
        }
        return null;
    };
    ProjectDefined.prototype.getVipSpeedDefinition = function (type) {
        for (var _i = 0, _a = this.vipSpeed; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.type == type) {
                return def;
            }
        }
        return null;
    };
    /**
     * 获取登录地址
     */
    ProjectDefined.prototype.getLoginAddress = function (isIntranet) {
        if (isIntranet) {
            return this.getValue(ProjectDefined.login_in_address);
        }
        return this.getValue(ProjectDefined.login_address);
    };
    /**
     * 获取登录端口
     */
    ProjectDefined.prototype.getLoginPort = function (isIntranet, isServerTest) {
        if (isIntranet) {
            return this.getValue(ProjectDefined.login_in_port);
        }
        if (isServerTest) {
            return this.getValue(ProjectDefined.login_test_port);
        }
        return this.getValue(ProjectDefined.login_port);
    };
    /**
     * 获取储存服地址
     */
    ProjectDefined.prototype.getStorageHost = function () {
        return this.getValue(ProjectDefined.storage_host);
    };
    /**
     * 头像上传url
     */
    ProjectDefined.prototype.getHeadUpLoadUrl = function () {
        return this.getStorageHost() + '/uploadimg.php';
    };
    /**
     * 语音上传url
     */
    ProjectDefined.prototype.getVoiceUpLoadUrl = function () {
        return this.getStorageHost() + '/uploadvoice.php';
    };
    /**
     * 获取支付url
     */
    ProjectDefined.prototype.getPayIndexUrl = function () {
        return this.getValue(ProjectDefined.webpay_url) + '/inpay.php';
    };
    /**
     * 苹果支付验证回调url
     */
    ProjectDefined.prototype.getPayCallbackUrl = function (isServerTest) {
        return this.getValue(isServerTest ? ProjectDefined.sdk_url_test : ProjectDefined.sdk_url) + '/applepay/paycallback.php';
    };
    /**
     * 微信支付unifiedorder url
     */
    ProjectDefined.prototype.getWxpayUnifiedOrderUrl = function () {
        return this.getValue(ProjectDefined.webpay_url) + '/wxpay/unifiedorder.php';
    };
    /**
     * 微信支付wappay url
     */
    ProjectDefined.prototype.getWxpayWapPayUrl = function () {
        return this.getValue(ProjectDefined.webpay_url) + '/wxpay/wappay.php';
    };
    /**
     * 支付宝wappay url
     */
    ProjectDefined.prototype.getAlipayWapPayUrl = function () {
        return this.getValue(ProjectDefined.webpay_url) + '/alipay/wappay.php';
    };
    /**
     * 版本文件url
     */
    ProjectDefined.prototype.getVersionUrl = function (appId) {
        return this.getValue(ProjectDefined.webclient_url) + '/' + appId + '/version/version.json?' + Date.now().toString() + Math.random().toString();
    };
    /**
     * 维护内容url
     */
    ProjectDefined.prototype.getMaintainUrl = function (appId) {
        return this.getValue(ProjectDefined.webclient_url) + '/' + appId + '/version/mt.txt?' + Date.now().toString() + Math.random().toString();
    };
    Object.defineProperty(ProjectDefined.prototype, "userAgreementUrl", {
        /**
         * 用户协议url
        */
        get: function () {
            return this.getValue(ProjectDefined.webclient_url) + '/resource/agreement.txt';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 微信jsapi ticket url
     */
    ProjectDefined.prototype.getWxTicketUrl = function () {
        return this.getValue(ProjectDefined.authorize_url) + '/wx_ticket.php';
    };
    /**
     * 微信二维码登录 url
     */
    ProjectDefined.prototype.getWxQrconnectUrl = function () {
        return this.getValue(ProjectDefined.authorize_url) + '/wx_qrconnect.php';
    };
    Object.defineProperty(ProjectDefined.prototype, "codeVersion", {
        /**
         * 代码版本，和服务器同步
         */
        get: function () {
            return this.getValue(ProjectDefined.version);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectDefined.prototype, "pollingLimit", {
        /**
         * 轮询上限
         */
        get: function () {
            return parseInt(this.getValue(ProjectDefined.pollingLimit));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectDefined.prototype, "shareResultNumLimit", {
        /**
         * 分享抽奖结果展示上限
         */
        get: function () {
            return parseInt(this.getValue(ProjectDefined.shareResultNumLimit));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectDefined.prototype, "goldBeanLimit", {
        /**
         * 获得金豆上限
         */
        get: function () {
            var data = this.getValue(ProjectDefined.invite);
            if (data && data.goldBeanLimit) {
                return parseInt(data.goldBeanLimit);
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectDefined.prototype, "bindICodeLevelLimit", {
        /**
         * 获得绑定邀请码等级上限
         */
        get: function () {
            var data = this.getValue(ProjectDefined.invite);
            if (data && data.levelLimit) {
                return parseInt(data.levelLimit);
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectDefined.prototype, "finishSelf", {
        /**
         * 获得绑定邀请码后绑定者完成新人礼后被绑定者获得的金豆数
        */
        get: function () {
            var data = this.getValue(ProjectDefined.invite);
            if (data && data.finishSelf) {
                return parseInt(data.finishSelf);
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectDefined.prototype, "invite", {
        /**
         * 获得邀请奖励信息
         */
        get: function () {
            return this.getValue(ProjectDefined.invite);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取分享 web url
     */
    ProjectDefined.prototype.getShareWebUrl = function (appId, inviteCode) {
        inviteCode = inviteCode ? '&invite_code=' + inviteCode : '';
        return this.getValue(ProjectDefined.webclient_url) + '/?appid=' + appId + inviteCode;
    };
    /**
     * 获取web客户端根url
     */
    ProjectDefined.prototype.getWebAppRootUrl = function (appId) {
        return this.getValue(ProjectDefined.webclient_url) + '/' + appId;
    };
    /**
     * 获取公告
     */
    ProjectDefined.prototype.getNoticeUrl = function (appId) {
        return this.getWebAppRootUrl(appId) + '/notice.txt';
    };
    //------------------------------------------------------------------
    // static
    //------------------------------------------------------------------
    ProjectDefined.projectConfig = "project";
    //------------------------------------------------------------------
    // public
    //------------------------------------------------------------------
    /**
     * socket连接超时
     */
    ProjectDefined.onTimeOut = "onTimeOut";
    /**
     * 服务器拥挤人数限定
     */
    ProjectDefined.serverCrowded = "serverCrowded";
    /**
     * 等待碰杠时间 超时不给碰杠
     */
    ProjectDefined.waitActionTimeClient = "waitActionTimeClient";
    /**
     * 出牌超时时间 超时自动本次出牌
     */
    ProjectDefined.putTimeoutClient = "putTimeoutClient";
    /**
     * 出牌超时次数 超过次次数 则托管
     */
    ProjectDefined.putTimeoutTimes = "putTimeoutTimes";
    /**
    * 初始化出牌时间 庄家第一次出牌
    */
    ProjectDefined.initPutTimeOutClient = "initPutTimeOutClient";
    /**
     * 准备时间倒计时
     */
    ProjectDefined.waitReadyTime = "waitReadyTime";
    /**
     * 解散房间等待时间
     */
    ProjectDefined.waitDisbandTime = "waitDisbandTime";
    /**
     * 聊天最大记录时间
     */
    ProjectDefined.chatMaxRecordTime = "chatMaxRecordTime";
    /**
     * 免费金币间隔时间
     */
    ProjectDefined.freeGoldTime = "freeGoldTime";
    /**
     * 免费金币awardId
     */
    ProjectDefined.freeGoldAward = "freeGoldAward";
    /**
     * 是否使用手机号码
     */
    ProjectDefined.usePhone = "usePhone";
    //------------------------------------------------------------------
    // private
    //------------------------------------------------------------------
    /**
     * 代码版本，和服务器同步
     */
    ProjectDefined.version = 'version';
    /**
     * 内网登录IP
     */
    ProjectDefined.login_in_address = "login_in_address";
    /**
     * 内容登录端口
     */
    ProjectDefined.login_in_port = "login_in_port";
    /**
     * 登录地址
     */
    ProjectDefined.login_address = "login_address";
    /**
     * 登录端口
     */
    ProjectDefined.login_port = "login_port";
    /**
     * 测试登录端口
     */
    ProjectDefined.login_test_port = "login_test_port";
    /**
     * 储存服地址
     */
    ProjectDefined.storage_host = "storage_host";
    /**
     * web支付URL
     */
    ProjectDefined.webpay_url = "webpay_url";
    /**
     * sdk服地址
     */
    ProjectDefined.sdk_url = 'sdk_url';
    /**
     * sdk服测试地址
     */
    ProjectDefined.sdk_url_test = 'sdk_url_test';
    /**
     * 授权地址
     */
    ProjectDefined.authorize_url = 'authorize_url';
    /**
     * 轮询上限
     */
    ProjectDefined.pollingLimit = "pollingLimit";
    /**
     * 网页版客户端根url
     */
    ProjectDefined.webclient_url = 'webclient_url';
    /**
     * 邀请奖励信息
    */
    ProjectDefined.invite = "invite";
    /**
     * 分享抽奖结果展示条数
    */
    ProjectDefined.shareResultNumLimit = "shareResultNumLimit";
    return ProjectDefined;
}(BaseDefined));
__reflect(ProjectDefined.prototype, "ProjectDefined");
/**
 * 局数定义
 */
var RoundDefinition = (function () {
    function RoundDefinition() {
    }
    return RoundDefinition;
}());
__reflect(RoundDefinition.prototype, "RoundDefinition");
/**
 * 玩法定义
 */
var PlayWayDefinition = (function () {
    function PlayWayDefinition() {
    }
    return PlayWayDefinition;
}());
__reflect(PlayWayDefinition.prototype, "PlayWayDefinition");
/**
 * 底分定义
 */
var AntesDefinition = (function () {
    function AntesDefinition() {
    }
    return AntesDefinition;
}());
__reflect(AntesDefinition.prototype, "AntesDefinition");
/**
 * 底分定义
 */
var BringRoomCardDefinition = (function () {
    function BringRoomCardDefinition() {
    }
    return BringRoomCardDefinition;
}());
__reflect(BringRoomCardDefinition.prototype, "BringRoomCardDefinition");
/**
 * 游戏成长速度
 */
var VipSpeedDefinition = (function () {
    function VipSpeedDefinition() {
    }
    return VipSpeedDefinition;
}());
__reflect(VipSpeedDefinition.prototype, "VipSpeedDefinition");
//# sourceMappingURL=ProjectDefined.js.map