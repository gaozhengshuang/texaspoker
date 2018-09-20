var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    var MathUtil = (function () {
        function MathUtil() {
        }
        // Obtient une valeur comprise dans un interval
        MathUtil.clamp = function (value, min, max) {
            if (value < min) {
                return min;
            }
            else if (value > max) {
                return max;
            }
            return value;
        };
        ;
        // Obtient une interpolation linéaire entre 2 valeurs
        MathUtil.lerp = function (value1, value2, amount) {
            amount = amount < 0 ? 0 : amount;
            amount = amount > 1 ? 1 : amount;
            return value1 + (value2 - value1) * amount;
        };
        /**
         * 获取一个随机值含头尾
         */
        MathUtil.getRandom = function (start, end) {
            return Math.round(Math.random() * (end - start)) + start;
        };
        /**
         * 将大于一万的数转换为数字加“万”或“亿”
        */
        MathUtil.formatNum = function (num) {
            var str;
            if (num < 10000) {
                str = num.toString();
                return str;
            }
            if (num >= 10000 && num < 100000000) {
                if (num % 10000 < 100) {
                    str = (num / 10000).toString();
                }
                else if (num % 1000 < 100) {
                    str = MathUtil.fixedFloor(num / 10000, 1);
                }
                else {
                    str = MathUtil.fixedFloor(num / 10000, 2);
                }
                str = MathUtil.subStrFour(str);
                return str + "万";
            }
            if (num >= 100000000) {
                if (num % 100000000 < 1000000) {
                    str = (num / 100000000).toString();
                }
                else if (num % 10000000 < 1000000) {
                    str = MathUtil.fixedFloor(num / 100000000, 1);
                }
                else {
                    str = MathUtil.fixedFloor(num / 100000000, 2);
                }
                str = MathUtil.subStrFour(str);
                return str + "亿";
            }
        };
        /**
         * 将数字用逗号以 MathUtil.CommaNum 进行分割(用于Label 显示空间大,数值有变化)
         * 当 MathUtil.CommaNum=3 :1234567=1,234,567
         * num 为小数时向下取整,支持负数
         */
        MathUtil.numAddSpace = function (num) {
            num = Math.floor(num);
            var isNegative = false;
            if (num < 0) {
                isNegative = true;
                num *= -1;
            }
            var str = num.toString();
            if (str.length <= MathUtil.CommaNum || MathUtil.CommaNum < 1) {
                if (isNegative) {
                    return "-" + str;
                }
                return str;
            }
            var len = str.length % MathUtil.CommaNum;
            var strResult = "";
            if (isNegative) {
                strResult = "-";
            }
            var strList = new Array();
            for (var i = 0; i < str.length;) {
                if (i == 0 && len > 0) {
                    var index = i + len;
                    if (index > str.length) {
                        index = str.length;
                    }
                    strResult += str.substring(i, index);
                    i += len;
                }
                else {
                    var index = i + MathUtil.CommaNum;
                    if (index > str.length) {
                        index = str.length;
                    }
                    strResult += str.substring(i, index);
                    i += MathUtil.CommaNum;
                }
                if (i <= str.length - MathUtil.CommaNum) {
                    strResult += ",";
                }
            }
            return strResult;
        };
        MathUtil.fixedFloor = function (num, fractionDigits) {
            if (!fractionDigits) {
                fractionDigits = 0;
            }
            var str = num.toString();
            if (str.indexOf(".") + fractionDigits + 1 > str.length) {
                return str;
            }
            else {
                return str.substring(0, str.indexOf(".") + fractionDigits + 1);
            }
        };
        /**
         * 剪切前4位数字（不包括小数点）
         */
        MathUtil.subStrFour = function (str) {
            var result;
            if (str.indexOf(".") > 3) {
                result = str.substr(0, 4);
            }
            else {
                result = str.substr(0, 5);
            }
            return result;
        };
        /**
         * 根据3个点，产生一个贝塞尔曲线点 t[0-1]
         */
        MathUtil.besselPoint = function (t, p0, p1, p2, movePoint) {
            if (t < 0 || t > 1 || !p0 || !p1 || !p2 || !movePoint) {
                qin.Console.log("贝塞尔曲线参数不合法");
                return;
            }
            var x;
            var y;
            movePoint.x = (1 - t) * (1 - t) * p0.x + 2 * t * (1 - t) * p1.x + t * t * p2.x;
            movePoint.y = (1 - t) * (1 - t) * p0.y + 2 * t * (1 - t) * p1.y + t * t * p2.y;
        };
        /**
         * 弧度转角度计量值
         */
        MathUtil.Radian2Angle = 180 / Math.PI;
        /**
         * 角度转弧度
         */
        MathUtil.Angle2Radian = Math.PI / 180;
        /**
         * 数字以逗号分割时的数位: 123,456,789
         */
        MathUtil.CommaNum = 3;
        return MathUtil;
    }());
    qin.MathUtil = MathUtil;
    __reflect(MathUtil.prototype, "qin.MathUtil");
})(qin || (qin = {}));
//# sourceMappingURL=MathUtil.js.map