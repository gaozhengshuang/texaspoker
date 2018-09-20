var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * 字典
     */
    var Dictionary = (function () {
        function Dictionary() {
            this._keys = [];
            this._values = [];
        }
        Object.defineProperty(Dictionary.prototype, "count", {
            get: function () {
                return this._keys.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加
         */
        Dictionary.prototype.add = function (key, value) {
            var index = this._keys.indexOf(key, 0);
            if (index >= 0) {
                this._values[index] = value;
            }
            else {
                this._keys.push(key);
                this._values.push(value);
            }
        };
        /**
         * 移除
         */
        Dictionary.prototype.remove = function (key) {
            var index = this._keys.indexOf(key, 0);
            if (index >= 0) {
                this._keys.splice(index, 1);
                this._values.splice(index, 1);
            }
        };
        /**
         * 根据值获取KEY
         */
        Dictionary.prototype.getKey = function (value) {
            var index = this._values.indexOf(value);
            if (index >= 0) {
                return this._keys[index];
            }
            return null;
        };
        /**
         *开启"[]"访问的情况下，缓存与字典数据为同一份，引用数据会同时修改，
        *非引用数据不能被修改，只能访问
        */
        Dictionary.prototype.getValue = function (key) {
            var index = this._keys.indexOf(key, 0);
            if (index != -1) {
                return this._values[index];
            }
            return null;
        };
        Dictionary.prototype.containsKey = function (key) {
            return this._keys.indexOf(key) >= 0;
        };
        Dictionary.prototype.containsValue = function (value) {
            return this._values.indexOf(value) >= 0;
        };
        Dictionary.prototype.getKeys = function () {
            return this._keys.concat();
        };
        Dictionary.prototype.getValues = function () {
            return this._values.concat();
        };
        Dictionary.prototype.clear = function () {
            this._keys.length = 0;
            this._values.length = 0;
        };
        /**
         * 循环每一项执行函数
         */
        Dictionary.prototype.foreach = function (callback, thisObject) {
            for (var i = 0, length_1 = this._keys.length; i < length_1; i++) {
                callback.call(thisObject, this._keys[i], this._values[i]);
            }
        };
        /**
         * 循环每一项执行测试函数，直到获得返回true
         */
        Dictionary.prototype.some = function (callback, thisObject) {
            for (var i = 0, length_2 = this._keys.length; i < length_2; i++) {
                if (callback.call(thisObject, this._keys[i], this._values[i])) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 循环每一项执行测试函数，直到获得返回false
         */
        Dictionary.prototype.every = function (callback, thisObject) {
            for (var i = 0, length_3 = this._keys.length; i < length_3; i++) {
                if (!callback.call(thisObject, this._keys[i], this._values[i])) {
                    return true;
                }
            }
            return false;
        };
        return Dictionary;
    }());
    qin.Dictionary = Dictionary;
    __reflect(Dictionary.prototype, "qin.Dictionary");
})(qin || (qin = {}));
//# sourceMappingURL=Dictionary.js.map