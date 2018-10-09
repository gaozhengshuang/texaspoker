/**
 *屏蔽词
*/
class ForbiddenDefined extends BaseDefined<ForbiddenDefinition>
{
    public static readonly forbiddenConfig: string = "forbidden";
    private static _instance: ForbiddenDefined;
    public static GetInstance(): ForbiddenDefined
    {
        if (!ForbiddenDefined._instance)
        {
            ForbiddenDefined._instance = new ForbiddenDefined();
        }
        if (DefinedManager.IsParsed(ForbiddenDefined.forbiddenConfig) == false)
        {
            ForbiddenDefined._instance.initialize();
        }
        return ForbiddenDefined._instance;
    }

    private initialize()
    {
        this.dataList = DefinedManager.GetData(ForbiddenDefined.forbiddenConfig) as Array<ForbiddenDefinition>;
    }
    /**
     * 是否包含屏蔽字符
     */
    public isContains(str: string): boolean
    {
        for (let i: number = 0; i < this.dataList.length; i++)
        {
            if (str.indexOf(this.dataList[i].des) >= 0)
            {
                return true;
            }
        }
        return false;
    }
    /**
     * 将所有屏蔽词替换为*
     */
    public replaceView(str: string): string
    {
        for (let i: number = 0; i < this.dataList.length; i++)
        {
            if (str.indexOf(this.dataList[i].des.toString()) >= 0)
            {
                let forbiddenStr: string = this.dataList[i].des;
                let replaceStr: string = game.StringConstants.Empty;
                for (let j: number = 0; j < forbiddenStr.length; j++)
                {
                    replaceStr += game.StringConstants.Asterisk;
                }
                str = str.replace(new RegExp(forbiddenStr, 'g'), replaceStr);
            }
        }
        return str;
    }
}
/**
* 屏蔽词的定义
*/
class ForbiddenDefinition implements IBaseDefintion
{
    public Id: number;
    public des: string;
}