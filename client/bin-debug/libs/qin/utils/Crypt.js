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
        Crypt.lrandomkey = function () {
            var tmp = new Array(4);
            var num = 0;
            for (var i = 0; i < 4; i++) {
                num = qin.MathUtil.getRandom(0, 255);
                tmp[i] = String.fromCharCode((num & 0xff));
            }
            var str = Crypt.toString(tmp);
            return str;
        };
        Crypt.lb64encode = function (str) {
            var arr = new Array();
            for (var i = 0; i < str.length; i++) {
                arr[i] = str.charCodeAt(i);
            }
            var buf = array2arraybuffer(arr);
            return egret.Base64Util.encode(buf);
        };
        Crypt.lb64decode = function (str) {
            var buf = egret.Base64Util.decode(str);
            var arr = arraybuffer2array(buf);
            var result = qin.CodeUtil.byteArray2String(arr);
            return result;
        };
        // private static readonly P: bigInt = new bigInt(18446744073709551557);
        Crypt.ltohex = function (str) {
            var hex = Crypt.toCharArray("0123456789abcdef");
            var sz = 0;
            var text = Crypt.toCharArray(str);
            sz = text.length;
            var tmp = new Array(256);
            var buffer = tmp;
            if (sz > 256 / 2) {
                buffer = new Array(sz * 2);
            }
            var i;
            var txtStr = qin.StringConstants.Empty;
            for (i = 0; i < sz; i++) {
                txtStr = text[i];
                buffer[i * 2] = hex[txtStr.charCodeAt(0) / Math.pow(2, 4)];
                buffer[i * 2 + 1] = hex[txtStr.charCodeAt(0) & 0xf];
            }
            var result = Crypt.toString(buffer);
            var reg = /\0+$/g;
            result = result.replace(reg, qin.StringConstants.Empty);
            // result = Regex.Replace(result, @"\0+$", "");
            return result;
        };
        Crypt.mul_mod_p = function (a, b) {
            var m = new bigInt(0);
            while (b.greater(0)) {
                if (b.and(1).greater(0)) {
                    var t = Crypt.P.subtract(a);
                    if (m.greaterOrEquals(t)) {
                        m = m.subtract(t);
                    }
                    else {
                        m = m.add(a);
                    }
                }
                if (a.greaterOrEquals(Crypt.P.subtract(a))) {
                    a = a.multiply(2).subtract(Crypt.P);
                }
                else {
                    a = a.multiply(2);
                }
                b = b.shiftRight(1);
            }
            return m;
        };
        Crypt.pow_mod_p = function (a, b) {
            if (b.equals(1)) {
                return a;
            }
            var t = Crypt.pow_mod_p(a, b.shiftRight(1));
            t = Crypt.mul_mod_p(t, t);
            if (b.mod(2).greater(0)) {
                t = Crypt.mul_mod_p(t, a);
            }
            return t;
        };
        // calc a^b % p
        Crypt.powmodp = function (a, b) {
            var bia = new bigInt(a);
            var bigP = new bigInt(Crypt.P);
            if (bia.greater(bigP)) {
                bia = bia.mod(bigP);
            }
            return Crypt.pow_mod_p(bia, b);
        };
        Crypt.push64 = function (r) {
            var tmp = new Array();
            tmp[0] = r.and(0xff);
            tmp[1] = r.shiftRight(8).and(0xff);
            tmp[2] = r.shiftRight(16).and(0xff);
            tmp[3] = r.shiftRight(24).and(0xff);
            var chartmp = new Array(4);
            for (var i = 0; i < tmp.length; i++) {
                chartmp[i] = String.fromCharCode(tmp[i].value);
            }
            return Crypt.toString(chartmp);
            // return "";
        };
        Crypt.read64 = function (xx, yy, str1, str2) {
            var x = Crypt.toCharArray(str1);
            var y = Crypt.toCharArray(str2);
            if (x.length != 4 || y.length != 4) {
                throw new Error("Invalid uint32 x or y");
            }
            var bix0 = new bigInt(x[0].charCodeAt(0));
            var bix1 = new bigInt(x[1].charCodeAt(0));
            var bix2 = new bigInt(x[2].charCodeAt(0));
            var bix3 = new bigInt(x[3].charCodeAt(0));
            var biy0 = new bigInt(y[0].charCodeAt(0));
            var biy1 = new bigInt(y[1].charCodeAt(0));
            var biy2 = new bigInt(y[2].charCodeAt(0));
            var biy3 = new bigInt(y[3].charCodeAt(0));
            xx[0] = bix0.or(bix1.shiftLeft(8));
            xx[1] = bix2.or(bix3.shiftLeft(8));
            yy[0] = biy0.or(biy1.shiftLeft(8));
            yy[1] = biy2.or(biy3.shiftLeft(8));
            // yy[0] = biy0.or(biy1.multiply(two8)).or(biy2.multiply(two16)).or(biy3.multiply(two24));
            // yy[1] = biy4.or(biy5.multiply(two8)).or(biy6.multiply(two16)).or(biy7.multiply(two24));
            // xx[0] = (x[0].charCodeAt(0) | x[1].charCodeAt(0) << 8 | x[2].charCodeAt(0) << 16 | x[3].charCodeAt(0) << 24) >>> 0;
            // xx[1] = (x[4].charCodeAt(0) | x[5].charCodeAt(0) << 8 | x[6].charCodeAt(0) << 16 | x[7].charCodeAt(0) << 24) >>> 0;
            // yy[0] = (y[0].charCodeAt(0) | y[1].charCodeAt(0) << 8 | y[2].charCodeAt(0) << 16 | y[3].charCodeAt(0) << 24) >>> 0;
            // yy[1] = (y[4].charCodeAt(0) | y[5].charCodeAt(0) << 8 | y[6].charCodeAt(0) << 16 | y[7].charCodeAt(0) << 24) >>> 0;
        };
        Crypt.ldhexchange = function (key) {
            var x = Crypt.toCharArray(key);
            if (x.length != 4) {
                throw new Error("Invalid dh uint32 key");
            }
            var xx = new Array(2);
            var bix0 = new bigInt(x[0].charCodeAt(0));
            var bix1 = new bigInt(x[1].charCodeAt(0));
            var bix2 = new bigInt(x[2].charCodeAt(0));
            var bix3 = new bigInt(x[3].charCodeAt(0));
            xx[0] = bix0.or(bix1.shiftLeft(24));
            xx[1] = bix2.or(bix3.shiftLeft(24));
            // let r: bigInt = new bigInt(Crypt.P);
            // let mod: bigInt = new bigInt(xx[0].or(xx[1].shiftLeft(8)));
            // r = r.modPow(5, mod);
            var r = Crypt.powmodp(new bigInt(5), xx[0].or(xx[1].shiftLeft(24)));
            var result = Crypt.push64(r);
            return result;
            // return StringConstants.Empty;
        };
        Crypt.ldhsecret = function (key1, key2) {
            var x = new Array(2);
            var y = new Array(2);
            Crypt.read64(x, y, key1, key2);
            var r = Crypt.powmodp(x[0].or(x[1].shiftLeft(24)), y[0].or(y[1].shiftLeft(24)));
            return Crypt.push64(r);
            // return StringConstants.Empty;
        };
        Crypt.HmacSha1 = function (key, input) {
            var result = b64_hmac_sha1(key, input);
            return result;
        };
        /// <summary>
        /// AES加密 
        /// </summary>
        /// <param name="toEncrypt"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        Crypt.AESEncrypt = function (toEncrypt, key) {
            var keyArray = aesjs.utils.utf8.toBytes(key);
            var keyFix = new Array(16);
            var len = Math.min(16, keyArray.length);
            for (var i = 0; i < len; i++) {
                keyFix[i] = keyArray[i];
            }
            var toEncryptArray = aesjs.utils.utf8.toBytes(toEncrypt);
            var keyFixTmp = aesjs.padding.pkcs7.pad(keyFix);
            var aesEcb = new aesjs.ModeOfOperation.ecb(keyFix);
            var test1 = aesjs.padding.pkcs7.pad(toEncryptArray);
            var encryptedBytes = aesEcb.encrypt(test1);
            var b64encoded = Base64.btoa(String.fromCharCode.apply(null, encryptedBytes));
            return b64encoded;
        };
        /// <summary>
        /// AES解密
        /// </summary>
        /// <param name="toDecrypt"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        Crypt.AESDecrypt = function (toDecrypt, key) {
            // byte[] keyArray = UTF8Encoding.UTF8.GetBytes(key);
            // let keyArray: Array<number> = aesjs.utils.utf8.toBytes(key);
            // // byte[] keyFix = new byte[16];
            // let keyFix: Array<number> = new Array<number>(16);
            // // Array.ConstrainedCopy(keyArray, 0, keyFix, 0, keyArray.Length > 16 ? 16 : keyArray.Length);
            // let len: number = Math.min(16, keyArray.length);
            // for (let i: number = 0; i < len; i++)
            // {
            // 	keyFix[i] = keyArray[i];
            // }
            // // byte[] toEncryptArray = Convert.FromBase64String(toDecrypt);
            // let aesEcb: aesjs.ModeOfOperation.ecb = new aesjs.ModeOfOperation.ecb(keyFix);
            // let toEncryptArray: Array<number> = aesjs.utils.utf8.toBytes(toDecrypt);
            // let resultArray: aesjs.Float32Array = aesEcb.decrypt(toEncryptArray);
            // // RijndaelManaged rDel = GetRM();
            // // rDel.Key = keyFix;
            // // ICryptoTransform cTransform = rDel.CreateDecryptor();
            // // byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
            // // return UTF8Encoding.UTF8.GetString(resultArray);
            // return aesjs.utils.utf8.fromBytes(resultArray);
            return qin.StringConstants.Empty;
        };
        Crypt.toString = function (arrStr) {
            var str = qin.StringConstants.Empty;
            for (var i = 0; i < arrStr.length; i++) {
                str += arrStr[i];
            }
            return str;
        };
        Crypt.toCharArray = function (str) {
            var arrStr = new Array();
            if (str) {
                for (var i = 0; i < str.length; i++) {
                    arrStr.push(str.charAt(i));
                }
            }
            return arrStr;
        };
        /**
         * MD5加密
         */
        Crypt.hex_md5 = function (target) {
            return Crypt._md5.hex_md5(target);
        };
        Crypt.P = new bigInt(1999999973);
        Crypt._md5 = new md5();
        return Crypt;
    }());
    qin.Crypt = Crypt;
    __reflect(Crypt.prototype, "qin.Crypt");
})(qin || (qin = {}));
//# sourceMappingURL=Crypt.js.map