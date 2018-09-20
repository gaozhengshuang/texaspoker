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
var qin;
(function (qin) {
    /// <summary>
    /// 客户端socket，异步的
    /// </summary>
    var GameSocket = (function (_super) {
        __extends(GameSocket, _super);
        function GameSocket() {
            var _this = _super.call(this, true) || this;
            _this._handshakeMsgId = 0; //握手id，自增
            return _this;
        }
        Object.defineProperty(GameSocket.prototype, "userId", {
            /// <summary>
            /// 用户账号id
            /// </summary>
            get: function () {
                return this._userId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSocket.prototype, "roleId", {
            /// <summary>
            /// 角色id(是在握手包返回的，从这里取)
            /// </summary>
            get: function () {
                return this._roleId;
            },
            enumerable: true,
            configurable: true
        });
        //------------------------------------------------------------------
        // 
        //------------------------------------------------------------------
        GameSocket.prototype.initialize = function (userId, roleId, serverId, secret, session, msgType) {
            if (msgType === void 0) { msgType = egret.WebSocket.TYPE_BINARY; }
            this._userId = userId;
            this._roleId = roleId;
            this._serverId = serverId;
            this._secret = secret;
            this._session1 = session;
            this._msgType = msgType;
        };
        /// <summary>
        /// 调用断线重发
        /// </summary>
        GameSocket.prototype.InvokeDiscRetry = function () {
            if (this._infoList != null && this._infoList.length > 0) {
                for (var i = 0; i < this._infoList.length; i++) {
                    var info = this._infoList[i];
                    if (info.isDiscRetry) {
                        this.SendObject(info); //不能使用InvokeSend，不然会被重复添加进_infoList，问题很严重
                    }
                }
            }
        };
        GameSocket.prototype.Handshake = function () {
            this._handshakeMsgId++;
            this.SimpleSend(qin.BaseSocket.HandshakeName, { "session": this._session1, "userid": this._userId, "roleid": 0, "serverid": this._serverId, "token": "" }); //move todo
        };
        GameSocket.prototype.ParseHandshake = function (result) {
            if (result.cmdId == qin.BaseSocket.HandshakeName) {
                this._isHandshaking = false;
                if (result.error == 0) {
                    this._roleId = result.data["roleid"];
                    _super.prototype.DispatchMessage.call(this, new qin.SocketMessage(qin.SocketMessageType.Connect, "0", "handshake succeed"));
                }
                else {
                    _super.prototype.DispatchMessage.call(this, new qin.SocketMessage(qin.SocketMessageType.HandshakeError, result.error.toString(), "handshake failed"));
                }
            }
        };
        return GameSocket;
    }(qin.BaseSocket));
    qin.GameSocket = GameSocket;
    __reflect(GameSocket.prototype, "qin.GameSocket");
})(qin || (qin = {}));
//# sourceMappingURL=GameSocket.js.map