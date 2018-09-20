var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * 集合
     */
    var HashSet = (function () {
        function HashSet() {
            this._values = [];
        }
        Object.defineProperty(HashSet.prototype, "count", {
            get: function () {
                return this._values.length;
            },
            enumerable: true,
            configurable: true
        });
        HashSet.prototype.add = function (value) {
            if (this._values.indexOf(value) == -1) {
                this._values.push(value);
            }
        };
        HashSet.prototype.remove = function (value) {
            var index = this._values.indexOf(value);
            if (index >= 0) {
                this._values.splice(index, 1);
            }
        };
        HashSet.prototype.contains = function (value) {
            return this._values.indexOf(value) >= 0;
        };
        HashSet.prototype.clear = function () {
            this._values.length = 0;
        };
        /**
         * 循环每一项执行函数
         */
        HashSet.prototype.foreach = function (callback, thisObject) {
            for (var i = 0, length_1 = this._values.length; i < length_1; i++) {
                callback.call(thisObject, this._values[i]);
            }
        };
        /**
         * 循环每一项执行测试函数，直到获得返回true
         */
        HashSet.prototype.some = function (callback, thisObject) {
            for (var i = 0, length_2 = this._values.length; i < length_2; i++) {
                if (callback.call(thisObject, this._values[i])) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 循环每一项执行测试函数，直到获得返回false
         */
        HashSet.prototype.every = function (callback, thisObject) {
            for (var i = 0, length_3 = this._values.length; i < length_3; i++) {
                if (!callback.call(thisObject, this._values[i])) {
                    return true;
                }
            }
            return false;
        };
        return HashSet;
    }());
    qin.HashSet = HashSet;
    __reflect(HashSet.prototype, "qin.HashSet");
})(qin || (qin = {}));
//# sourceMappingURL=HashSet.js.map