var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 头像缓存
 */
var HeadCache = (function () {
    function HeadCache() {
        this._heads = new Array();
        this._textures = new Array();
    }
    HeadCache.prototype.add = function (head, texture) {
        if (this._heads.length >= HeadCache._maxCacheLength) {
            var url = this._heads.shift();
            this._textures.shift();
            RES.destroyRes(url); //清理加载的头像
        }
        this._heads.push(head);
        this._textures.push(texture);
    };
    HeadCache.prototype.containsKey = function (head) {
        return this._heads.indexOf(head) >= 0;
    };
    HeadCache.prototype.getValue = function (head) {
        var index = this._heads.indexOf(head, 0);
        if (index != -1) {
            return this._textures[index];
        }
        return null;
    };
    HeadCache.prototype.clear = function () {
        qin.ArrayUtil.Clear(this._heads);
        qin.ArrayUtil.Clear(this._textures);
    };
    /**
     * 头像缓存
     */
    HeadCache._headCacheList = new HeadCache();
    /**
     * 圆形头像缓存
     */
    HeadCache._circleheadCacheList = new HeadCache();
    HeadCache._maxCacheLength = 50;
    return HeadCache;
}());
__reflect(HeadCache.prototype, "HeadCache");
//# sourceMappingURL=HeadCache.js.map