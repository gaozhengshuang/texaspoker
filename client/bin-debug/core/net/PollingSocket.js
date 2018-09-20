var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
* socket轮询连接处理
*/
var PollingSocket = (function () {
    function PollingSocket(type, connect, timeout) {
        this._type = type;
        this.onConnectDelegate = connect;
        this.onTimeoutDelegate = timeout;
        this._pollingRequest = new PollingRequest(qin.Delegate.getOut(this.onConnectHandler, this), qin.Delegate.getOut(this.onTimeOutHandler, this));
    }
    Object.defineProperty(PollingSocket.prototype, "isTimeout", {
        get: function () {
            return this._pollingRequest.isTimeout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PollingSocket.prototype, "isPolling", {
        /**
        * 是否轮询
        */
        get: function () {
            return this._pollingRequest.isPolling;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 游戏连接
    */
    PollingSocket.prototype.gameConnect = function (address, port, isShowLoading) {
        this._initAdress = address;
        this.port = port;
        this._isShowLoading = isShowLoading;
        this.setGameAdress();
        this.onEnable();
        if (this.onConnectDelegate) {
            this.onConnectDelegate.invoke(isShowLoading);
        }
    };
    /**
     * 游戏重连
     */
    PollingSocket.prototype.gameReconnect = function () {
        this._pollingRequest.changeAdressIndex();
        this.gameConnect(this._initAdress, this.port, this._isShowLoading);
    };
    /**
     * 登录连接
     */
    PollingSocket.prototype.loginConnect = function () {
        this.setLoginAdressPort();
        this.onEnable();
        if (this.onConnectDelegate) {
            this.onConnectDelegate.invoke();
        }
    };
    PollingSocket.prototype.onEnable = function () {
        this._pollingRequest.connect(false);
    };
    PollingSocket.prototype.stop = function () {
        this._pollingRequest.stop();
    };
    /**
     * 设置登录地址端口
     */
    PollingSocket.prototype.setLoginAdressPort = function () {
        this.address = ProjectDefined.GetInstance().getLoginAddress(this._pollingRequest.isIntranet);
        if (this._pollingRequest.isPolling) {
            var index = this._pollingRequest.addressIndex;
            var repStr = qin.StringConstants.Empty;
            if (index > 0) {
                repStr = index.toString();
            }
            this.address = this.address.replace(qin.StringConstants.Asterisk, repStr);
        }
        this.port = ProjectDefined.GetInstance().getLoginPort(this._pollingRequest.isIntranet, VersionManager.isServerTest);
    };
    /**
     * 设置游戏地址
     */
    PollingSocket.prototype.setGameAdress = function () {
        this.address = ProjectDefined.GetInstance().getLoginAddress(this._pollingRequest.isIntranet);
        if (this._pollingRequest.isPolling) {
            var index = this._pollingRequest.addressIndex;
            var repStr = qin.StringConstants.Empty;
            if (index > 0) {
                repStr = index.toString();
            }
            if (this._initAdress) {
                this.address = this._initAdress.replace(qin.StringConstants.Asterisk, repStr);
            }
            else {
                this.address = this.address.replace(qin.StringConstants.Asterisk, repStr); //使用登录的地址
            }
        }
    };
    /**
     * 超时自动重连
     */
    PollingSocket.prototype.onConnectHandler = function (event) {
        if (this._type == 1) {
            this.setLoginAdressPort();
        }
        else if (this._type == 2) {
            this.setGameAdress();
        }
        this._pollingRequest.resetTime();
        if (this.onConnectDelegate) {
            this.onConnectDelegate.invoke(this._isShowLoading);
        }
    };
    PollingSocket.prototype.onTimeOutHandler = function (event) {
        this.stop(); //超次数停止轮询
        if (this.onTimeoutDelegate) {
            this.onTimeoutDelegate.invoke();
        }
    };
    PollingSocket.prototype.errorConnectHandler = function () {
        this._pollingRequest.errorConnectHandler();
    };
    return PollingSocket;
}());
__reflect(PollingSocket.prototype, "PollingSocket");
//# sourceMappingURL=PollingSocket.js.map