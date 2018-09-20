var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 资源缓存管理
 */
var ResCacheManager = (function () {
    function ResCacheManager() {
        //------------------------------------------------------------------
        // 
        //------------------------------------------------------------------
        this._cacheMap = new qin.Dictionary();
        this._cacheMap.add(ResCacheType.Head, new ResCache(150));
        this._cacheMap.add(ResCacheType.CircleHead, new ResCache(150));
        this._cacheMap.add(ResCacheType.Voice, new ResCache(50));
    }
    ResCacheManager.getInstance = function () {
        if (ResCacheManager._instance == null) {
            ResCacheManager._instance = new ResCacheManager();
        }
        return ResCacheManager._instance;
    };
    /**
     * 获取缓存(不存在则返回null)
     */
    ResCacheManager.getRes = function (resType, key) {
        return ResCacheManager.getInstance().getRes(resType, key);
    };
    /**
     * 添加缓存
     */
    ResCacheManager.addRes = function (resType, key, value) {
        ResCacheManager.getInstance().addRes(resType, key, value);
    };
    ResCacheManager.clear = function (resType) {
        ResCacheManager.getInstance().clear(resType);
    };
    /**
     * 获取缓存(不存在则返回null)
     */
    ResCacheManager.prototype.getRes = function (resType, key) {
        switch (resType) {
            case ResCacheType.Head:
            case ResCacheType.CircleHead:
                var textureList = this.getCacheListByType(resType);
                if (textureList) {
                    return textureList.getValue(key);
                }
                return null;
            case ResCacheType.Voice:
                var voiceList = this.getCacheListByType(resType);
                if (voiceList) {
                    return voiceList.getValue(key);
                }
                return null;
        }
        return null;
    };
    /**
     * 添加缓存
     */
    ResCacheManager.prototype.addRes = function (resType, key, value) {
        var list = this.getCacheListByType(resType);
        if (list) {
            list.add(key, value);
        }
    };
    /**
     * 清空所有
     */
    ResCacheManager.prototype.clear = function (resType) {
        this._cacheMap.foreach(function (k, v) {
            if (resType == null || resType == k) {
                v.clear();
            }
        }, this);
    };
    /**
     * 根据类型获取缓存列表
     */
    ResCacheManager.prototype.getCacheListByType = function (resType) {
        if (this._cacheMap.containsKey(resType)) {
            return this._cacheMap.getValue(resType);
        }
        qin.Console.log("类型不存在");
        return null;
    };
    return ResCacheManager;
}());
__reflect(ResCacheManager.prototype, "ResCacheManager");
//# sourceMappingURL=ResCacheManager.js.map