var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * 数组工具
     */
    var ArrayUtil = (function () {
        function ArrayUtil() {
        }
        ArrayUtil.RemoveItem = function (item, list, count) {
            if (count === void 0) { count = 1; }
            if (count == 0) {
                return 0;
            }
            var rc = 0;
            for (var i = list.length - 1; i >= 0; i--) {
                if (list[i] == item) {
                    list.splice(i, 1);
                    rc++;
                    if (count != -1 && rc >= count) {
                        break;
                    }
                }
            }
            return rc;
        };
        /**
         * 清空索引数组，关联数组不可使用
         */
        ArrayUtil.Clear = function (list) {
            if (list) {
                list.length = 0;
            }
        };
        /**
         * 根据某一个值，获取这个值的索引相等的对象的索引
         */
        ArrayUtil.getIndex = function (value, list, field) {
            if (list && field) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i][field] == value) {
                        return i;
                    }
                }
            }
            return -1;
        };
        /// <summary>
        /// 打乱顺序
        /// </summary>
        /// <param name="array"></param>
        /// <param name="startIndex"></param>
        /// <param name="length"></param>
        ArrayUtil.moveSomeElementsToTheEnd = function (array, startIndex, len) {
            if (startIndex < 0 || startIndex >= array.length - 1) {
                //throw new Exception("startIndex must be greater than 0 and less than " + (array.length - 1).ToString());
            }
            if (startIndex + len + 1 > array.length) {
                //throw new Exception("Please provide a valid length");
            }
            var temp = new Array(len);
            for (var i = 0; i < temp.length; i++) {
                temp[i] = array[startIndex + i];
            }
            //Move forward the other element
            for (var i = startIndex; i < array.length - len; i++) {
                array[i] = array[i + len];
            }
            //Move the first part back to the end of array
            var k = 0;
            for (var i = array.length - len; i < array.length; i++) {
                array[i] = temp[k];
                k++;
            }
        };
        return ArrayUtil;
    }());
    qin.ArrayUtil = ArrayUtil;
    __reflect(ArrayUtil.prototype, "qin.ArrayUtil");
})(qin || (qin = {}));
//# sourceMappingURL=ArrayUtil.js.map