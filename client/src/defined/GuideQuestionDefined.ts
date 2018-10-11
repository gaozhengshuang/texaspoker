/**
 *引导问题信息
*/
class GuideQuestionDefined extends BaseDefined<GuideQuestionDefinition>
{
    public static readonly guideQuestionConfig: string = "guideQuestion";
    private static _instance: GuideQuestionDefined;
    public static GetInstance(): GuideQuestionDefined
    {
        if (!GuideQuestionDefined._instance)
        {
            GuideQuestionDefined._instance = new GuideQuestionDefined();
        }
        if (DefinedManager.IsParsed(GuideQuestionDefined.guideQuestionConfig) == false)
        {
            GuideQuestionDefined._instance.initialize();
        }
        return GuideQuestionDefined._instance;
    }
    private initialize()
    {
        this.dataList = DefinedManager.GetData(GuideQuestionDefined.guideQuestionConfig) as Array<GuideQuestionDefinition>;
    }
}
/**
* 引导问题定义
*/
class GuideQuestionDefinition implements IBaseDefintion
{
    /**
     * ID
    */
    public Id: number;
    /**
     * 问题描述
    */
    public title: string;
    /**
     * 答案选项
     * 数组里的数字代表牌型
    */
    public answer: Array<any>;
}
