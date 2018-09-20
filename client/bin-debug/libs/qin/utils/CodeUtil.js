var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * 编码工具
     */
    var CodeUtil = (function () {
        function CodeUtil() {
        }
        /**
         * base64 to ArrayBuffer
         */
        CodeUtil.base64ToArrayBuffer = function (base64) {
            var binary_string = atob(base64);
            var len = binary_string.length;
            var bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        };
        /**
         * ArrayBuffer to base64
         */
        CodeUtil.arrayBuffer2Base64 = function (buf) {
            var dv = new DataView(buf);
            var a = [];
            for (var i = 0; i < dv.byteLength; i++) {
                a[i] = dv.getUint8(i);
            }
            return CodeUtil.byteArray2String(a);
        };
        /**
         * 字节数组转字符串
         */
        CodeUtil.byteArray2String = function (arr) {
            var result = qin.StringConstants.Empty;
            for (var i = 0; i < arr.length; i++) {
                result += String.fromCharCode(arr[i]);
            }
            return result;
        };
        /**
         * 获取字符串占字节长度
        */
        CodeUtil.getStringByteLength = function (str) {
            var byteSize = 0;
            for (var i = 0; i < str.length; i++) {
                var code = str.charCodeAt(i);
                if (0x00 <= code && code <= 0x7f) {
                    byteSize += 1;
                }
                else if (0x80 <= code && code <= 0x7ff) {
                    byteSize += 2;
                }
                else if ((0x800 <= code && code <= 0xd7ff)
                    || (0xe000 <= code && code <= 0xffff)) {
                    byteSize += 3;
                }
            }
            return byteSize;
        };
        return CodeUtil;
    }());
    qin.CodeUtil = CodeUtil;
    __reflect(CodeUtil.prototype, "qin.CodeUtil");
})(qin || (qin = {}));
//# sourceMappingURL=CodeUtil.js.map