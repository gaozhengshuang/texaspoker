class InfoUtil
{
    /**
     * 检查定义是否合法
     */
    public static checkAvailable(info: IHaveDefintionInfo): boolean
    {
        if (info && info.definition)
        {
            return true;
        }
        return false
    }
}