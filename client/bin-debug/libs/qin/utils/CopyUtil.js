var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * 拷贝工具
     */
    var CopyUtil = (function () {
        function CopyUtil() {
        }
        /**
         * 拷贝子列表对象
         */
        CopyUtil.supCopyList = function (targetData, sourceData, propertyName, classType) {
            if (sourceData && targetData && sourceData[propertyName]) {
                targetData[propertyName] = new Array();
                var content = void 0;
                for (var i = 0; i < sourceData[propertyName].length; i++) {
                    content = new classType();
                    content.copyValueFrom(sourceData[propertyName][i]);
                    targetData[propertyName].push(content);
                }
            }
        };
        /**
         * 拷贝二级对象
         */
        CopyUtil.subCopy = function (targetData, sourceData, propertyName, classType) {
            if (sourceData && targetData && sourceData[propertyName]) {
                targetData[propertyName] = new classType();
                targetData[propertyName].copyValueFrom(sourceData[propertyName]);
            }
        };
        return CopyUtil;
    }());
    qin.CopyUtil = CopyUtil;
    __reflect(CopyUtil.prototype, "qin.CopyUtil");
})(qin || (qin = {}));
//# sourceMappingURL=CopyUtil.js.map