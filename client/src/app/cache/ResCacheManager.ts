/**
 * 资源缓存管理
 */
class ResCacheManager
{
    private static _instance: ResCacheManager;
    private static getInstance(): ResCacheManager
    {
        if (ResCacheManager._instance == null)
        {
            ResCacheManager._instance = new ResCacheManager();
        }
        return ResCacheManager._instance;
    }
    /**
     * 获取缓存(不存在则返回null)
     */
    public static getRes(resType: ResCacheType, key: string):any
    {
        return ResCacheManager.getInstance().getRes(resType, key);
    }
    /**
     * 添加缓存
     */
    public static addRes<T>(resType: ResCacheType, key: string, value: T)
    {
        ResCacheManager.getInstance().addRes<T>(resType, key, value);
    }
    public static clear(resType: ResCacheType)
    {
        ResCacheManager.getInstance().clear(resType);
    }

    //------------------------------------------------------------------
	// 
	//------------------------------------------------------------------

    private _cacheMap: qin.Dictionary<ResCacheType, ResCache<any>> = new qin.Dictionary<ResCacheType, ResCache<any>>();

    constructor()
    {
        this._cacheMap.add(ResCacheType.Head, new ResCache<egret.Texture>(150));
        this._cacheMap.add(ResCacheType.CircleHead, new ResCache<egret.Texture>(150));
        this._cacheMap.add(ResCacheType.Voice, new ResCache<egret.Sound>(50));
    }
    /**
     * 获取缓存(不存在则返回null)
     */
    public getRes(resType: ResCacheType, key: string)
    {
        switch (resType)
        {
            case ResCacheType.Head:
            case ResCacheType.CircleHead:
                let textureList = this.getCacheListByType<egret.Texture>(resType);
                if (textureList)
                {
                    return textureList.getValue(key);
                }
                return null;
            case ResCacheType.Voice:
                let voiceList = this.getCacheListByType<egret.Sound>(resType);
                if (voiceList)
                {
                    return voiceList.getValue(key);
                }
                return null;
        }
        return null;
    }
    /**
     * 添加缓存
     */
    public addRes<T>(resType: ResCacheType, key: string, value: T)
    {
        let list = this.getCacheListByType<T>(resType);
        if (list)
        {
            list.add(key, value);
        }
    }
    /**
     * 清空所有
     */
    public clear(resType: ResCacheType)
    {
        this._cacheMap.foreach((k, v) =>
        {
            if(resType == null || resType == k)
            {
                v.clear();
            }
        }, this);
    }
    /**
     * 根据类型获取缓存列表
     */
    private getCacheListByType<T>(resType: ResCacheType): ResCache<T>
    {
        if (this._cacheMap.containsKey(resType))
        {
            return this._cacheMap.getValue(resType);
        }
        qin.Console.log("类型不存在")
        return null;
    }
}