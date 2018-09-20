var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * 委托
     */
    var Delegate = (function () {
        function Delegate(method, target) {
            this._method = method;
            this._target = target;
        }
        /**
         * 获取
         */
        Delegate.getOut = function (method, target) {
            if (Delegate._poolList.length > 0) {
                var obj = Delegate._poolList.pop();
                obj.reset(method, target);
                return obj;
            }
            else {
                return new Delegate(method, target);
            }
        };
        /**
         * 存入
         */
        Delegate.putIn = function (obj) {
            if (obj != null && Delegate._poolList.length < 20) {
                obj.reset();
                Delegate._poolList.push(obj);
            }
        };
        Object.defineProperty(Delegate.prototype, "method", {
            get: function () {
                return this._method;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Delegate.prototype, "target", {
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });
        Delegate.prototype.reset = function (method, target) {
            this._method = method;
            this._target = target;
        };
        /**
         * 是否相等
         */
        Delegate.prototype.equals = function (obj) {
            if (obj != null) {
                if (this._method == obj._method && this._target == obj._target) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 是否相等
         */
        Delegate.prototype.equals2 = function (method, target) {
            if (this._method == method && this._target == target) {
                return true;
            }
            return false;
        };
        Delegate.prototype.invoke = function (params) {
            qin.FuncUtil.invoke(this._method, this._target, params);
        };
        Delegate._poolList = new Array();
        return Delegate;
    }());
    qin.Delegate = Delegate;
    __reflect(Delegate.prototype, "qin.Delegate");
})(qin || (qin = {}));
//# sourceMappingURL=Delegate.js.map