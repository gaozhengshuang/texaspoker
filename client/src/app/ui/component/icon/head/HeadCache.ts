/**
 * 头像缓存
 */
class HeadCache
{
    /**
     * 头像缓存
     */
    public static _headCacheList: HeadCache = new HeadCache();
    /**
     * 圆形头像缓存
     */
    public static _circleheadCacheList: HeadCache = new HeadCache();

    private static _maxCacheLength: number = 50;
    private _heads: Array<string> = new Array<string>();
    private _textures: Array<egret.Texture> = new Array<egret.Texture>();

    public add(head: string, texture: egret.Texture)
    {
        if (this._heads.length >= HeadCache._maxCacheLength)
        {
            let url: string = this._heads.shift();
            this._textures.shift();
            RES.destroyRes(url); //清理加载的头像
        }
        this._heads.push(head);
        this._textures.push(texture);
    }

    public containsKey(head: string)
    {
        return this._heads.indexOf(head) >= 0;
    }

    public getValue(head: string)
    {
        var index: number = this._heads.indexOf(head, 0);
        if (index != -1)
        {
            return this._textures[index];
        }
        return null;
    }

    public clear()
    {
        game.ArrayUtil.Clear(this._heads);
        game.ArrayUtil.Clear(this._textures);
    }
}
