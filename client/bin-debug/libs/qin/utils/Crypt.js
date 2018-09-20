var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * 加密
     */
    var Crypt = (function () {
        function Crypt() {
        }
        /**
         * MD5加密
         */
        Crypt.hex_md5 = function (target) {
            return Crypt._md5.hex_md5(target);
        };
        Crypt._md5 = new md5();
        return Crypt;
    }());
    qin.Crypt = Crypt;
    __reflect(Crypt.prototype, "qin.Crypt");
})(qin || (qin = {}));
//# sourceMappingURL=Crypt.js.map