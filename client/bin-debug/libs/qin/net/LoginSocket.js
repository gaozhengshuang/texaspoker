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
    var LoginSocket = (function (_super) {
        __extends(LoginSocket, _super);
        function LoginSocket() {
            return _super.call(this, false) || this;
        }
        LoginSocket.prototype.initialize = function (buff, msgType) {
            if (msgType === void 0) { msgType = egret.WebSocket.TYPE_BINARY; }
            this._msgType = msgType;
            if (buff) {
                var dataView = new DataView(buff);
                var schema = new Array();
                for (var i = 0; i < dataView.byteLength; i++) {
                    schema[i] = dataView.getUint8(i);
                }
                if (schema.length > 0) {
                    this._spRpc = Sproto.createNew({ buf: schema, sz: schema.length });
                }
                if (!this._spRpc) {
                    qin.Console.log("创建Sproto对象失败!");
                }
            }
        };
        return LoginSocket;
    }(qin.BaseSocket));
    qin.LoginSocket = LoginSocket;
    __reflect(LoginSocket.prototype, "qin.LoginSocket");
})(qin || (qin = {}));
//# sourceMappingURL=LoginSocket.js.map