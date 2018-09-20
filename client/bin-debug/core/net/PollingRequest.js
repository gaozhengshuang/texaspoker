var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 轮循请求处理器
 */
var PollingRequest = (function () {
    function PollingRequest(connect, timeout) {
        this._addressIndex = 0;
        this._outTime = 5000;
        /**
        * 轮询连接次数
        */
        this._connectTimes = 0;
        this.onConnectDelegate = connect;
        this.onTimeoutDelegate = timeout;
    }
    Object.defineProperty(PollingRequest.prototype, "addressIndex", {
        get: function () {
            return this._addressIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PollingRequest.prototype, "isIntranet", {
        get: function () {
            return ChannelManager.loginType == ChannelLoginType.IntranetAccount || ChannelManager.loginType == ChannelLoginType.IntranetGuest;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PollingRequest.prototype, "isPolling", {
        /**
         * 是否轮询
         */
        get: function () {
            return !this.isIntranet;
        },
        enumerable: true,
        configurable: true
    });
    PollingRequest.prototype.connect = function (isAutoConnect) {
        if (isAutoConnect === void 0) { isAutoConnect = true; }
        this.resetTime();
        qin.Tick.addFrameInvoke(this.timing, this);
        if (this.onConnectDelegate && isAutoConnect) {
            this.onConnectDelegate.invoke();
        }
    };
    PollingRequest.prototype.resetTime = function () {
        this._startConnectTime = egret.getTimer();
    };
    PollingRequest.prototype.stop = function () {
        qin.Tick.removeFrameInvoke(this.timing, this);
    };
    //超时自动轮询
    PollingRequest.prototype.timing = function (event) {
        var offsetTime = egret.getTimer() - this._startConnectTime;
        if (offsetTime > this._outTime) {
            this.nextPolling(true);
            if (!this.isTimeout && this.onConnectDelegate) {
                this.resetTime();
                this.onConnectDelegate.invoke();
            }
        }
    };
    PollingRequest.prototype.changeAdressIndex = function () {
        this._addressIndex++;
        if (this._addressIndex > ProjectDefined.GetInstance().pollingLimit) {
            this._addressIndex = 0;
        }
    };
    PollingRequest.prototype.nextPolling = function (isTimesOutDispatch) {
        if (this.isPolling) {
            this.changeAdressIndex();
            this._connectTimes++;
            if (this._connectTimes > ProjectDefined.GetInstance().pollingLimit) {
                this._connectTimes = 0;
                this.isTimeout = true;
                this.stop();
                if (this.onTimeoutDelegate && isTimesOutDispatch) {
                    this.onTimeoutDelegate.invoke();
                }
            }
            else {
                this.isTimeout = false;
            }
        }
        else {
            this.isTimeout = true;
        }
    };
    //连接错误手动执行轮询
    PollingRequest.prototype.errorConnectHandler = function () {
        if (this.isPolling) {
            this.stop(); //停止自动轮询
            this.nextPolling(false);
            if (!this.isTimeout && this.onConnectDelegate) {
                this.onConnectDelegate.invoke();
            }
        }
        else {
            this.isTimeout = true; //非正式服直接超时，点击重连
        }
    };
    return PollingRequest;
}());
__reflect(PollingRequest.prototype, "PollingRequest");
//# sourceMappingURL=PollingRequest.js.map