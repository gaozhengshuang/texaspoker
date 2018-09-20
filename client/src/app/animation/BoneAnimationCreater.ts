/**
 * 龙骨动画生成器
 */
class BoneAnimationCreater
{
    /**
     * 创建龙骨动画
     */
    public static CreateBoneAnimation(name: string, parent: any, times: number, timeScale: number, onComplete: Function = function () { })
    {
        if (!BoneAnimation._boneList)
        {
            BoneAnimation._boneList = new game.Map<string, BoneAnimeInfo>();
        }

        if (BoneAnimation._boneList.containsKey(name) && !BoneAnimation._boneList.getValue(name).isLoaded)
        {
            return;
        }
        let info: BoneAnimeInfo = BoneAnimation._boneList.getValue(name);
        if (name == BoneAnimeName.HallLiuGuang)
        {
            BoneAnimation.resBoneAnime(info, ResFixedFileName.LiuGuang_Config, ResFixedFileName.LiuGuang_Img, name, parent, 90, 21, onComplete);
        }
    }
}