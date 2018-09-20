var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    var ExternalInterface = (function () {
        function ExternalInterface() {
        }
        /**
         * 调用 functionName，并将value传入到native中。
         * 包装一次移到帧尾执行
         */
        ExternalInterface.call = function (functionName, value) {
            if (value === void 0) { value = ''; }
            egret.callLater(function () {
                egret.ExternalInterface.call(functionName, value);
            }, ExternalInterface);
        };
        /**
         * 监听 functionName 回调，需要在native中有调用 functionName 这个字段，而不是 此类的call。
         * 包装一次移到帧尾执行
         */
        ExternalInterface.addCallback = function (functionName, listener) {
            egret.ExternalInterface.addCallback(functionName, function (value) {
                egret.callLater(function () {
                    if (listener) {
                        listener(value);
                    }
                }, ExternalInterface);
            });
        };
        return ExternalInterface;
    }());
    qin.ExternalInterface = ExternalInterface;
    __reflect(ExternalInterface.prototype, "qin.ExternalInterface");
})(qin || (qin = {}));
//# sourceMappingURL=ExternalInterface.js.map