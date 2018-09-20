/**
 * 龙骨动画
 */
class BoneAnimation
{
	/**
	 * 极速动画缓存列表
	 */
    public static _boneList: qin.Dictionary<string, BoneAnimeInfo>;
    /**
     * 加载动画资源
     */
    public static async resBoneAnime(info: BoneAnimeInfo, config: string, img: string, name: string, parent: any, posX: number, posY: number, onComplete: Function)
    {
        if (info)
        {
            if (parent && parent.getChildIndex(info.movie) == -1)
            {
                parent.addChild(info.movie);
            }
            else
            {
                qin.Console.log("parent对象出错");
            }
        }
        else
        {
            let info: BoneAnimeInfo = new BoneAnimeInfo();
            BoneAnimation._boneList.add(name, info);
            let boneConfig = await RES.getResAsync(ResPrefixPathName.Bone + config);
            let boneImg = await RES.getResAsync(ResPrefixPathName.Bone + img);
            dragonBones.addMovieGroup(boneConfig, boneImg);
            let movie: dragonBones.Movie = dragonBones.buildMovie(name);
            movie.x = posX;
            movie.y = posY;
            parent.addChild(movie);
            info.movie = movie;
            info.isLoaded = true;
            onComplete(info);
        }
    }

	/**
	 * 获取缓存bone动画
	 */
    public static getFastAnimeByName(name: string): BoneAnimeInfo
    {
        if (BoneAnimation._boneList && BoneAnimation._boneList.containsKey(name))
        {
            return BoneAnimation._boneList.getValue(name);
        }
        return null;
    }
}

/**
 * 龙骨动画信息
 */
class BoneAnimeInfo
{
    /**
     * 动画
     */
    public movie: dragonBones.Movie;
    /**
     * 是否加载完毕
     */
    public isLoaded: boolean = false;
    /**
     * 播放状态
     */
    public state: BonePlayState = BonePlayState.Play;
    /**
     * 播放
     */
    public play(name: string, times: number, timeScale: number)
    {
        if (!this.isLoaded)
        {
            qin.Console.log("资源未加载完成");
            return;
        }
        this.movie.timeScale = timeScale;
        if (this.state == BonePlayState.Play)
        {
            this.movie.play(name, times);
        }
    }
    /**
     * 停止播放
     */
    public stop()
    {
        if (this.movie)
        {
            this.movie.stop();
        }
    }
}

enum BonePlayState
{
    Play = 1,
    Stop = 2,
}