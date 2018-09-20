var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * 对象工具
     */
    var ObjectUtil = (function () {
        function ObjectUtil() {
        }
        /**
        * 以树级形式获取对象的属性
        */
        ObjectUtil.getTreeProperty = function (target, props) {
            if (target && props) {
                var property = target;
                for (var i = 0; i < props.length; i++) {
                    if (property) {
                        property = property[props[i]];
                    }
                    else {
                        qin.Console.log("树级获取对象异常！" + props + "i：" + props[i]);
                    }
                }
                return property;
            }
            return null;
        };
        return ObjectUtil;
    }());
    qin.ObjectUtil = ObjectUtil;
    __reflect(ObjectUtil.prototype, "qin.ObjectUtil");
})(qin || (qin = {}));
//# sourceMappingURL=ObjectUtil.js.map