var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    var ColorUtil = (function () {
        function ColorUtil() {
        }
        /**
         * 颜色字符串转颜色数字
         */
        ColorUtil.colorToNumber = function (color) {
            if (/^(rgb|RGB)/.test(color)) {
                var rgbList = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
                var strHex_1 = "0x";
                for (var i_1 = 0; i_1 < rgbList.length; i_1++) {
                    var hex_1 = Number(rgbList[i_1]).toString(16);
                    if (hex_1.length == 1) {
                        hex_1 = '0' + hex_1;
                    }
                    strHex_1 += hex_1;
                }
                return parseInt(strHex_1);
            }
            else if (/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color)) {
                var hex = color.replace(/#/, '').split('');
                if (hex.length === 6) {
                    return parseInt('0x' + hex.join(''));
                }
                else if (hex.length === 3) {
                    var strHex = '0x';
                    for (var i = 0; i < hex.length; i++) {
                        strHex += (hex[i] + hex[i]);
                    }
                    return parseInt(strHex);
                }
            }
            else if (/^0x([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color)) {
                return parseInt(color);
            }
            else {
                return parseInt('0x' + color);
            }
        };
        return ColorUtil;
    }());
    qin.ColorUtil = ColorUtil;
    __reflect(ColorUtil.prototype, "qin.ColorUtil");
})(qin || (qin = {}));
//# sourceMappingURL=ColorUtil.js.map