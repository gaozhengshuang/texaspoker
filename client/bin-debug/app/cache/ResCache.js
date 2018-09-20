var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 缓存列表
 */
var ResCache = (function () {
    function ResCache(maxCache) {
        this._keys = new Array();
        this._values = new Array();
        this._maxCacheLength = maxCache;
    }
    ResCache.prototype.add = function (key, value) {
        if (this._keys.length >= this._maxCacheLength) {
            var url = this._keys.shift();
            this._values.shift();
            RES.destroyRes(url); //清理加载的头像
        }
        var index = this._keys.indexOf(key);
        if (index == -1) {
            this._keys.push(key);
            this._values.push(value);
        }
        else {
            this._values[index] = value;
        }
    };
    ResCache.prototype.containsKey = function (key) {
        return this._keys.indexOf(key) >= 0;
    };
    ResCache.prototype.getValue = function (key) {
        var index = this._keys.indexOf(key, 0);
        if (index != -1) {
            return this._values[index];
        }
        return null;
    };
    ResCache.prototype.clear = function () {
        qin.ArrayUtil.Clear(this._keys);
        qin.ArrayUtil.Clear(this._values);
    };
    return ResCache;
}());
__reflect(ResCache.prototype, "ResCache");
//# sourceMappingURL=ResCache.js.map