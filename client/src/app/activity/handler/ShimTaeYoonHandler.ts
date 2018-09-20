/**
 * 德州转转转管理器
*/
class ShimTaeYoonHandler extends BaseActivitySubHandler<ShimTaeYoonInfo>
{

    public initialize(info: ActivityInfo)
    {
        super.initialize(info);
        let def: LaBaDefinition;
        for (let i: number = 0; i < LaBaDefined.GetInstance().dataList.length; i++) //填充子列表信息
        {
            def = LaBaDefined.GetInstance().dataList[i];
            this.addSubInfo(info, ShimTaeYoonInfo, def);
        };
    }
}