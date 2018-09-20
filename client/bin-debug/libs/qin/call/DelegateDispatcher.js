var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * 委托派发器
     */
    var DelegateDispatcher = (function () {
        function DelegateDispatcher() {
            this._list = new Array();
        }
        /**
         * 销毁
         */
        DelegateDispatcher.prototype.destroy = function () {
            this._list = null;
        };
        /**
         * 清空
         */
        DelegateDispatcher.prototype.clear = function () {
            this._list.length = 0;
        };
        Object.defineProperty(DelegateDispatcher.prototype, "count", {
            /**
             * 已添加回调侦听的数量
             */
            get: function () {
                return this._list.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加呼叫回调侦听(自动过滤重复的方法)
         */
        DelegateDispatcher.prototype.addListener = function (listener, thisObject) {
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.equals2(listener, thisObject)) {
                    return;
                }
            }
            this._list.push(new qin.Delegate(listener, thisObject));
        };
        /**
         * 移除呼叫回调
         */
        DelegateDispatcher.prototype.removeListener = function (listener, thisObject) {
            var length = this._list.length;
            for (var i = 0; i < length; i++) {
                if (this._list[i].equals2(listener, thisObject)) {
                    this._list.splice(i, 1);
                    break;
                }
            }
        };
        /**
         * 广播呼叫回调
         */
        DelegateDispatcher.prototype.dispatch = function (data) {
            if (this._list.length > 0) {
                var list = this._list.concat(); //要拷贝
                for (var i = 0, length_1 = list.length; i < length_1; i++) {
                    list[i].invoke(data);
                }
            }
        };
        return DelegateDispatcher;
    }());
    qin.DelegateDispatcher = DelegateDispatcher;
    __reflect(DelegateDispatcher.prototype, "qin.DelegateDispatcher");
})(qin || (qin = {}));
//# sourceMappingURL=DelegateDispatcher.js.map