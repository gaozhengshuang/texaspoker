var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 渠道管理/原生扩展管理
 */
var ChannelManager = (function () {
    function ChannelManager() {
    }
    //------------------------------------------------------------------
    // sdk回调执行方法
    //------------------------------------------------------------------
    ChannelManager.sdk_Logout = function () {
        PrefsManager.clearLoginInfo();
        GameManager.reload();
        ChannelManager.OnLogout.dispatch();
    };
    Object.defineProperty(ChannelManager, "channelType", {
        /**
         * 渠道类型
         */
        get: function () {
            return ChannelManager._channelType;
        },
        enumerable: true,
        configurable: true
    });
    /// <summary>
    /// 获取渠道类型+登录类型
    /// </summary>
    /// <returns></returns>
    ChannelManager.getLoginChannel = function () {
        return ChannelUtil.GetLoginChannel(ChannelManager.channelType, ChannelManager.loginType);
    };
    Object.defineProperty(ChannelManager, "appName", {
        /**
         * 应用名
         */
        get: function () {
            return ChannelManager._appName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelManager, "deviceId", {
        /**
         * 设备id
         */
        get: function () {
            return ChannelManager._deviceId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelManager, "bundleId", {
        /**
         * 包id
         */
        get: function () {
            return ChannelManager._bundleId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelManager, "hasWeixin", {
        /**
         * 是否安装有微信
         */
        get: function () {
            return ChannelManager._hasWeixin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelManager, "hasMicrophone", {
        /**
         * 是否有麦克风或麦克风权限(需要执行requestMicrophone方法过后才有用)
         */
        get: function () {
            return ChannelManager._hasMicrophone;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelManager, "clientVersion", {
        /**
         * 本地客户端安装包版本(web版没有)
         */
        get: function () {
            return ChannelManager._clientVersion;
        },
        enumerable: true,
        configurable: true
    });
    //------------------------------------------------------------------
    // 
    //------------------------------------------------------------------
    /**
     * 初始化
     */
    ChannelManager.initialize = function () {
        if (ChannelManager._isInitComplete) {
            ChannelManager.OnInitComplete.dispatch();
            return;
        }
        if (qin.System.isMicro) {
            if (qin.RuntimeTypeName.getCurrentName() == qin.RuntimeTypeName.Ios) {
                ChannelManager._channel = new Channel_ios();
            }
            else if (qin.RuntimeTypeName.getCurrentName() == qin.RuntimeTypeName.Android) {
                ChannelManager._channel = new Channel_android();
            }
            //安装包版初始化
            ChannelManager.initPackage();
        }
        else {
            //web版初始化
            ChannelManager.initWeb();
        }
    };
    ChannelManager.initPackage = function () {
        qin.ExternalInterface.addCallback(ExtFuncName.OnApplicationFocus, function (status) {
            var isStatus = qin.StringUtil.toBoolean(status);
            if (isStatus && qin.RuntimeTypeName.getCurrentName() == qin.RuntimeTypeName.Android) {
                UIManager.closePanel(UIModuleName.PayMaskPanel);
            }
            ChannelManager.OnApplicationFocus.dispatch(isStatus);
        });
        qin.ExternalInterface.addCallback(ExtFuncName.Share, function (status) {
            if (qin.StringUtil.toBoolean(status)) {
                ChannelManager.OnShareSucceed.dispatch(status);
            }
            else {
                ChannelManager.OnShareFailed.dispatch();
            }
        });
        qin.ExternalInterface.addCallback(ExtFuncName.Login, function (json) {
            var data = JSON.parse(json);
            if (qin.StringUtil.toBoolean(data.status)) {
                ChannelManager.OnTokenLoginSucceed.dispatch(data.token);
            }
            else {
                ChannelManager.OnLoginFailed.dispatch();
            }
        });
        qin.ExternalInterface.addCallback(ExtFuncName.Pay, function (json) {
            var data = JSON.parse(json);
            if (qin.StringUtil.toBoolean(data.status)) {
                ChannelManager._channel.sdkPaySucceed(JSON.parse(data.data)); //不同平台可能有特殊处理
            }
            else {
                UIManager.closePanel(UIModuleName.PayMaskPanel);
                ChannelManager._channel.sdkPayFailed();
            }
        });
        qin.ExternalInterface.addCallback(ExtFuncName.Logout, ChannelManager.sdk_Logout);
        qin.ExternalInterface.addCallback(ExtFuncName.OnBackToApplication, function (status) {
            ChannelManager.OnBackToApplication.dispatch(qin.StringUtil.toBoolean(status));
        });
        qin.ExternalInterface.addCallback(ExtFuncName.RecordAudio, function (data) {
            RecordAudioManager.RecordComplete(data);
        });
        qin.ExternalInterface.addCallback(ExtFuncName.HasRecordData, function (json) {
            ChatManager.checkComplete(json);
        });
        qin.ExternalInterface.addCallback(ExtFuncName.RequestMicrophone, function (status) {
            ChannelManager._hasMicrophone = qin.StringUtil.toBoolean(status);
        });
        qin.ExternalInterface.addCallback(ExtFuncName.ImageSelect, function (data) {
            ChannelManager.OnImageSelect.dispatch({ type: HeadUploadSystemType.native, data: data });
        });
        qin.ExternalInterface.addCallback(ExtFuncName.CopyToPastboard, function (data) {
            UIManager.showFloatTips("邀请码复制成功");
        });
        //
        qin.ExternalInterface.addCallback(ExtFuncName.Initialize, function (json) {
            ChannelManager._isInitComplete = true;
            var data = JSON.parse(json);
            ChannelManager._channelType = data['channelType'];
            if (qin.StringUtil.isNullOrEmpty(ChannelManager._channelType)) {
                ChannelManager._channelType = ChannelType.qin;
            }
            ChannelManager._appName = data['appName'];
            ChannelManager._deviceId = data['deviceId'];
            ChannelManager._bundleId = data['bundleId'];
            ChannelManager._clientVersion = data['clientVersion'];
            ChannelManager._hasWeixin = qin.StringUtil.toBoolean(data['hasWeixin']);
            ChannelManager.OnInitComplete.dispatch();
        });
        qin.ExternalInterface.call(ExtFuncName.Initialize, '');
    };
    ChannelManager.initWeb = function () {
        ChannelManager._channel = new Channel_web();
        ChannelManager._isInitComplete = true;
        ChannelManager._channelType = URLOption.getString(URLOption.Channel);
        if (qin.StringUtil.isNullOrEmpty(ChannelManager._channelType)) {
            ChannelManager._channelType = ChannelType.qin;
        }
        ChannelManager._appName = window.document.title;
        ChannelManager.OnInitComplete.dispatch();
    };
    /**
     * 登录
     */
    ChannelManager.login = function (loginType, isAutoLogin) {
        if (isAutoLogin === void 0) { isAutoLogin = false; }
        if (loginType == ChannelLoginType.Qin) {
            ChannelManager._accountHandler.Login(isAutoLogin);
        }
        else {
            ChannelManager._channel.Login(loginType, isAutoLogin);
        }
    };
    /**
     * 登出
     */
    ChannelManager.logout = function () {
        if (ChannelManager.loginType == ChannelLoginType.Qin) {
            ChannelManager._accountHandler.Logout();
        }
        else {
            if (qin.System.isMicro) {
                qin.ExternalInterface.call(ExtFuncName.Logout, '');
            }
            else {
                ChannelManager.sdk_Logout();
            }
        }
    };
    /**
     * 支付发送
     */
    ChannelManager.PaySend = function (shopId) {
        var payDef = ShopDefined.GetInstance().getDefinition(shopId);
        if (payDef) {
            var awardDef = AwardDefined.GetInstance().getDefinition(payDef.awardId);
            if (awardDef) {
                var payState = BundleManager.getPayState();
                if (payState == PayState.Close) {
                    AlertManager.showAlertByString('支付已关闭，无法支付');
                    return;
                }
                if (awardDef.costList && awardDef.costList.length > 0 && awardDef.costList[0].type == CostType.RMB) {
                    var price = awardDef.costList[0].count;
                    if (price > 0) {
                        var orderId = ChannelUtil.GenerateOrder(payDef.awardId, VersionManager.isServerTest); //订单id		
                        ChannelManager._channel.PaySend(payState, payDef.awardId, UserManager.serverInfo.id, orderId, price, awardDef.name);
                    }
                    else {
                        qin.Console.log("支付异常");
                    }
                }
            }
        }
    };
    /**
     * 设置sdk扩展数据
     */
    ChannelManager.SetExtData = function () {
        if (qin.System.isMicro) {
            var data = {};
            data["channelToken"] = LoginManager.channelToken;
            data["userId"] = LoginManager.loginInfo.userid;
            data["loginChannel"] = ChannelManager.getLoginChannel();
            qin.ExternalInterface.call(ExtFuncName.SetExtData, JSON.stringify(data));
        }
    };
    /**
     * 设置服务器返回的渠道数据，有些坑爹的sdk用
     */
    ChannelManager.SetChannelData = function (account, token) {
        if (qin.System.isMicro) {
            qin.ExternalInterface.call(ExtFuncName.SetChannelData, JSON.stringify({ account: account, token: token }));
        }
    };
    /**
     * 检查有没有未完成的订单（苹果丢单处理,第一次进主场景时候检查）
     */
    ChannelManager.checkUnFinishedPayList = function () {
        if (qin.System.isMicro) {
            ChannelManager._channel.checkUnFinishedPayList();
        }
    };
    /**
     * 微信分享
     */
    ChannelManager.share = function (type, title, message, inviteCode) {
        ChannelManager._channel.share(type, title, message, inviteCode);
    };
    /**
     * 请求一次麦克风权限(ios、android有弹窗确认)
     */
    ChannelManager.requestMicrophone = function () {
        if (qin.System.isMicro) {
            qin.ExternalInterface.call(ExtFuncName.RequestMicrophone, '');
        }
    };
    /**
     * 录音
     */
    ChannelManager.recordAudio = function (code) {
        if (qin.System.isMicro) {
            RecordAudioManager.RecordVoice(code);
            qin.ExternalInterface.call(ExtFuncName.RecordAudio, code.toString());
        }
    };
    /**
    * 停止播放正在播放的录音
    */
    ChannelManager.stopRecord = function (guid) {
        if (qin.System.isMicro) {
            qin.ExternalInterface.call(ExtFuncName.StopRecord, guid);
        }
    };
    /**
     * 设置录音数据
     */
    ChannelManager.setRecordData = function (guid, data, playNow) {
        if (qin.System.isMicro) {
            qin.ExternalInterface.call(ExtFuncName.SetRecordData, JSON.stringify({ "guid": guid, "data": data, "playNow": playNow }));
        }
    };
    /**
     * 本地是否已经存在录音文件
     */
    ChannelManager.hasRecordData = function (guid) {
        if (qin.System.isMicro) {
            qin.ExternalInterface.call(ExtFuncName.HasRecordData, guid);
        }
    };
    /**
     * 播放录音
     */
    ChannelManager.playRecord = function (guid) {
        if (qin.System.isMicro) {
            qin.ExternalInterface.call(ExtFuncName.PlayRecord, guid);
        }
    };
    /**
     * 选择图片
     */
    ChannelManager.imageSelect = function (size, quality) {
        ChannelManager._channel.imageSelect(size, quality);
    };
    ChannelManager.openURL = function (url) {
        ChannelManager._channel.openURL(url);
    };
    /**
     * 震动
     */
    ChannelManager.shake = function () {
        if (qin.System.isMicro) {
            qin.ExternalInterface.call(ExtFuncName.Shake, qin.StringConstants.Empty);
        }
        else {
            qin.System.webVibrate();
        }
    };
    ChannelManager.copyToPastboard = function (data) {
        ChannelManager._channel.copyToPastboard(data);
    };
    ChannelManager.DispatchAccountLoginSucceed = function (account, password, isRegister) {
        if (isRegister === void 0) { isRegister = false; }
        ChannelManager.OnAccountLoginSucceed.dispatch([account, password, isRegister]);
    };
    //------------------------------------------------------------------
    // 
    //------------------------------------------------------------------
    ChannelManager._channelType = qin.StringConstants.Empty;
    ChannelManager._accountHandler = new AccountHandler(); //Qin 帐号系统 登录
    ChannelManager._isInitComplete = false; //渠道初始化是否完成
    ChannelManager._appName = qin.StringConstants.Empty;
    ChannelManager._deviceId = qin.StringConstants.Empty;
    ChannelManager._bundleId = qin.StringConstants.Empty;
    ChannelManager._hasWeixin = false;
    ChannelManager._hasMicrophone = false;
    ChannelManager._clientVersion = qin.StringConstants.Empty;
    //------------------------------------------------------------------
    // Event
    //------------------------------------------------------------------
    /**
     * 应用 获取/失去 焦点
     */
    ChannelManager.OnApplicationFocus = new qin.DelegateDispatcher();
    /**
     * 账号登录成功
     */
    ChannelManager.OnAccountLoginSucceed = new qin.DelegateDispatcher(); //Action< string, string, bool >
    /**
     * 初始化完成
     */
    ChannelManager.OnInitComplete = new qin.DelegateDispatcher();
    /**
     * token登录成功
     */
    ChannelManager.OnTokenLoginSucceed = new qin.DelegateDispatcher();
    /**
     * 登录失败
     */
    ChannelManager.OnLoginFailed = new qin.DelegateDispatcher();
    /**
     * 游戏登出
     */
    ChannelManager.OnLogout = new qin.DelegateDispatcher();
    /**
     * 从其他程序返回当前程序的事件
     */
    ChannelManager.OnBackToApplication = new qin.DelegateDispatcher();
    /**
     * 分享成功
     */
    ChannelManager.OnShareSucceed = new qin.DelegateDispatcher();
    /**
     * 分享失败
     */
    ChannelManager.OnShareFailed = new qin.DelegateDispatcher();
    /**
     * 图片选择完成回调
     */
    ChannelManager.OnImageSelect = new qin.DelegateDispatcher();
    /**
     * 支付模式选择
     */
    ChannelManager.OnPayModelSelectEvent = new qin.DelegateDispatcher();
    return ChannelManager;
}());
__reflect(ChannelManager.prototype, "ChannelManager");
//# sourceMappingURL=ChannelManager.js.map