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
        GameSocket.prototype.initialize = function (userId, roleId, serverId, secret, session, c2s, s2c, msgType) {
            if (msgType === void 0) { msgType = egret.WebSocket.TYPE_BINARY; }
            this._userId = userId;
            this._roleId = roleId;
            this._serverId = serverId;
            this._secret = secret;
            this._session1 = session;
            this._msgType = msgType;
            if (c2s && s2c) {
                var s2cSchema = this.getSchema(s2c);
                var s2cSpRpc = void 0;
                if (s2cSchema.length > 0) {
                    s2cSpRpc = Sproto.createNew({ buf: s2cSchema, sz: s2cSchema.length });
                }
                // let obj1 = JSON.parse(JSON.stringify(s2cSpRpc.proto));
                // let idxoper = function addIdx(target)
                // {
                // 	for (let i = 0; i < target.length; i++)
                // 	{
                // 		target[i].index = i;
                // 	}
                // 	console.log(JSON.stringify(target));
                // }
                // idxoper(obj1);
                // let obj2 = JSON.parse(JSON.stringify(s2cSpRpc.type));
                // idxoper(obj2);
                var c2sSchema = this.getSchema(c2s);
                if (c2sSchema.length > 0) {
                    this._spRpc = Sproto.createNew({ buf: c2sSchema, sz: c2sSchema.length });
                    // let obj3 = JSON.parse(JSON.stringify(this._spRpc.proto));
                    // idxoper(obj3);
                    // let obj4 = JSON.parse(JSON.stringify(this._spRpc.type));
                    // idxoper(obj4);
                    if (s2cSpRpc) {
                        this._spRpc.s2cProtocol_n = s2cSpRpc.protocol_n;
                        this._spRpc.s2cProto = s2cSpRpc.proto;
                        this._spRpc.protocol_n += s2cSpRpc.protocol_n;
                        this._spRpc.proto = this._spRpc.proto.concat(s2cSpRpc.proto);
                        //移动子类型索引
                        for (var _i = 0, _a = s2cSpRpc.type; _i < _a.length; _i++) {
                            var tp = _a[_i];
                            for (var _b = 0, _c = tp.f; _b < _c.length; _b++) {
                                var obj = _c[_b];
                                if (obj.st) {
                                    obj.st = obj.st + this._spRpc.type_n;
                                }
                            }
                        }
                        this._spRpc.type_n += s2cSpRpc.type_n;
                        this._spRpc.type = this._spRpc.type.concat(s2cSpRpc.type);
                        s2cSchema = null;
                        s2cSpRpc = null;
                    }
                }
                if (!this._spRpc) {
                    qin.Console.log("创建Sproto对象失败!");
                }
            }
        };
        GameSocket.prototype.getSchema = function (buf) {
            var dataView = new DataView(buf);
            var schema = new Array();
            for (var i = 0; i < dataView.byteLength; i++) {
                schema[i] = dataView.getUint8(i);
            }
            return schema;
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
            this.SimpleSend(qin.BaseSocket.HandshakeName, { "session": this._session1, "userid": this._userId, "roleid": 0, "serverid": this._serverId, "token": qin.Crypt.HmacSha1(this._secret, qin.StringUtil.format("{0},{1}", this._userId, this._handshakeMsgId)) });
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