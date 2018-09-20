/**
 * 缓存列表
 */
class ResCache<T>
{

    private _maxCacheLength: number;
    private _keys: Array<string> = new Array<string>();
    private _values: Array<T> = new Array<T>();

    constructor(maxCache: number)
    {
        this._maxCacheLength = maxCache;
    }

    public add(key: string, value: T)
    {
        if (this._keys.length >= this._maxCacheLength)
        {
            let url: string = this._keys.shift();
            this._values.shift();
            RES.destroyRes(url); //清理加载的头像
        }
        let index: number = this._keys.indexOf(key);
        if (index == -1)
        {
            this._keys.push(key);
            this._values.push(value);
        }
        else
        {
            this._values[index] = value;
        }
    }

    public containsKey(key: string): boolean
    {
        return this._keys.indexOf(key) >= 0;
    }

    public getValue(key: string): T
    {
        var index: number = this._keys.indexOf(key, 0);
        if (index != -1)
        {
            return this._values[index];
        }
        return null;
    }

    public clear()
    {
        game.ArrayUtil.Clear(this._keys);
        game.ArrayUtil.Clear(this._values);
    }
}
