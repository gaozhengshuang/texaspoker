var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    var RuntimeTypeName = (function () {
        function RuntimeTypeName() {
        }
        /**
         * 运行类型名（Web和Native混一起区分，如果要获取运行的系统名，请使用getOSName()）
         */
        RuntimeTypeName.getCurrentName = function () {
            if (qin.System.isMicro) {
                return RuntimeTypeName.getOSName();
            }
            else {
                return RuntimeTypeName.Web;
            }
        };
        /**
         * 获取终端系统名
         */
        RuntimeTypeName.getOSName = function () {
            var os = egret.Capabilities.os.toLowerCase();
            if (os == 'ios') {
                return RuntimeTypeName.Ios;
            }
            else if (os == 'android') {
                return RuntimeTypeName.Android;
            }
            else if (os == 'windows phone') {
                return RuntimeTypeName.WindowsPhone;
            }
            else if (os == 'windows pc') {
                return RuntimeTypeName.WindowsPC;
            }
            else {
                return qin.StringConstants.Empty;
            }
        };
        RuntimeTypeName.Web = 'web';
        RuntimeTypeName.Ios = 'ios';
        RuntimeTypeName.Android = 'android';
        RuntimeTypeName.WindowsPhone = 'wphone';
        RuntimeTypeName.WindowsPC = 'wpc';
        return RuntimeTypeName;
    }());
    qin.RuntimeTypeName = RuntimeTypeName;
    __reflect(RuntimeTypeName.prototype, "qin.RuntimeTypeName");
})(qin || (qin = {}));
//# sourceMappingURL=RuntimeTypeName.js.map