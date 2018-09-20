var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * 对象池
     */
    var PoolUtil = (function () {
        function PoolUtil() {
        }
        /**
         * 从对象池中获取对象
         */
        PoolUtil.GetObject = function (instance) {
            var clsName = egret.getQualifiedClassName(instance);
            var pool = PoolUtil.GetPool(clsName);
            var obj = pool.pop();
            if (obj) {
                return obj;
            }
            else {
                return new instance();
            }
        };
        /**
         * 把重置并放入对象池
         */
        PoolUtil.PutObject = function (obj, maxCount) {
            if (maxCount === void 0) { maxCount = 10; }
            if (obj) {
                var clsName = egret.getQualifiedClassName(obj);
                var pool = PoolUtil.GetPool(clsName);
                if (pool.length < maxCount) {
                    obj.reset();
                    pool.push(obj);
                }
            }
        };
        PoolUtil.GetPool = function (clsName) {
            var pool = null;
            if (clsName) {
                pool = PoolUtil._map.getValue(clsName);
                if (pool == null) {
                    pool = new Array();
                    PoolUtil._map.add(clsName, pool);
                }
            }
            else {
                pool = new Array();
            }
            return pool;
        };
        PoolUtil._map = new qin.Dictionary();
        return PoolUtil;
    }());
    qin.PoolUtil = PoolUtil;
    __reflect(PoolUtil.prototype, "qin.PoolUtil");
})(qin || (qin = {}));
//# sourceMappingURL=PoolUtil.js.map