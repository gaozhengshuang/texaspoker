var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 版本工具
 */
var VersionUtil = (function () {
    function VersionUtil() {
    }
    /**
     * 比较a强制版本是否比b强制版本新 全检测 做提审用
     */
    VersionUtil.CompareAllForce = function (a, b) {
        if (a == null || a.length <= 0) {
            return false;
        }
        if (b == null || b.length <= 0) {
            return true;
        }
        if (a[0] > b[0]) {
            return true;
        }
        else if (a[0] == b[0]) {
            if (a[1] > b[1]) {
                return true;
            }
            else if (a[1] == b[1]) {
                if (a[2] > b[2]) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 比较a强制版本是否比b强制版本新 仅检测前两位 做安装包的强制更新用
     */
    VersionUtil.CompareForce = function (a, b) {
        if (a == null || a.length <= 0) {
            return false;
        }
        if (b == null || b.length <= 0) {
            return true;
        }
        if (a[0] > b[0]) {
            return true;
        }
        else if (a[0] == b[0]) {
            if (a[1] > b[1]) {
                return true;
            }
        }
        return false;
    };
    /**
     * 是否有优化版本
     */
    VersionUtil.CompareOptimize = function (serverV, clientV) {
        if (serverV && clientV && clientV.length == serverV.length && clientV.length > 2) {
            return serverV[0] == clientV[0] && serverV[1] == clientV[1] && serverV[2] > clientV[2];
        }
        return false;
    };
    return VersionUtil;
}());
__reflect(VersionUtil.prototype, "VersionUtil");
//# sourceMappingURL=VersionUtil.js.map