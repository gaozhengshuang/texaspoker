var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * 消息类型
     */
    var SocketMessageType;
    (function (SocketMessageType) {
        SocketMessageType[SocketMessageType["None"] = 0] = "None";
        /**
         * 连接
         */
        SocketMessageType[SocketMessageType["Connect"] = 1] = "Connect";
        /**
         * 网络错误，网络不可用,连接断开
         */
        SocketMessageType[SocketMessageType["NetworkError"] = 2] = "NetworkError";
        /**
         * 失败，需要重新登录的
         */
        SocketMessageType[SocketMessageType["Failing"] = 3] = "Failing";
        /**
         * 握手错误
         */
        SocketMessageType[SocketMessageType["HandshakeError"] = 4] = "HandshakeError";
        /**
        * 协议发送出错
        */
        SocketMessageType[SocketMessageType["SendError"] = 5] = "SendError";
        /**
         * 初始化异常
         */
        SocketMessageType[SocketMessageType["NotInitialized"] = 6] = "NotInitialized";
    })(SocketMessageType = qin.SocketMessageType || (qin.SocketMessageType = {}));
    /**
     * 通信消息
     */
    var SocketMessage = (function () {
        function SocketMessage(msgType, errorCode, msg) {
            this._type = msgType;
            this._errorCode = errorCode;
            this._message = msg;
        }
        Object.defineProperty(SocketMessage.prototype, "type", {
            /**
             * 消息类型
             */
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SocketMessage.prototype, "errorCode", {
            get: function () {
                return this._errorCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SocketMessage.prototype, "message", {
            /**
             * 消息
             */
            get: function () {
                return this._message;
            },
            enumerable: true,
            configurable: true
        });
        return SocketMessage;
    }());
    qin.SocketMessage = SocketMessage;
    __reflect(SocketMessage.prototype, "qin.SocketMessage");
})(qin || (qin = {}));
//# sourceMappingURL=SocketMessage.js.map