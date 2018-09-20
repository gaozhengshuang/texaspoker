var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * 消息发送
     */
    var SocketInfo = (function () {
        function SocketInfo() {
        }
        return SocketInfo;
    }());
    qin.SocketInfo = SocketInfo;
    __reflect(SocketInfo.prototype, "qin.SocketInfo");
})(qin || (qin = {}));
//# sourceMappingURL=SocketInfo.js.map