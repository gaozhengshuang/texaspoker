/**
 * 德州转转转定义
 * */
class LaBaDefined extends BaseActivitySubDefined<any>
{
    private static readonly config: string = "activity_laBa";
    private static _instance: LaBaDefined;

    public static GetInstance(): LaBaDefined
    {
        if (!LaBaDefined._instance)
        {
            LaBaDefined._instance = new LaBaDefined();
        }
        if (DefinedManager.IsParsed(LaBaDefined.config) == false)
        {
            LaBaDefined._instance.initialize();
        }
        return LaBaDefined._instance;
    }
    public initialize()
    {
        // this.dataList = DefinedManager.GetData(LaBaDefined.config) as Array<LaBaDefinition>;
    }
    /**
     * 根据底注额度获取活动信息
    */
    public getDefByBottom(id: number, bottom: number): LaBaDefinition
    {
        // for (let def of this.dataList) //move todo
        // {
        //     if (def.Id == id && def.bottom == bottom)
        //     {
        //         return def;
        //     }
        // }
        return;
    }
    /**
     * 获得底注信息数组
    */
    public getBottomList(id: number): Array<number>
    {
        // let arr: Array<number> = new Array<number>(); //move todo
        // for (let def of this.dataList)
        // {
        //     if (def.Id == id)
        //     {
        //         if (arr.length > 0)
        //         {
        //             let flag: boolean = true;
        //             for (let i: number = 0; i < arr.length; i++)
        //             {
        //                 if (arr[i] == def.bottom)
        //                 {
        //                     flag = false;
        //                 }
        //             }
        //             if (flag)
        //             {
        //                 arr.push(def.bottom);
        //             }
        //         } else
        //         {
        //             arr.push(def.bottom);
        //         }
        //     }
        // }
        // return arr;
        return;
    }
    /**
     * 根据底注获得倍率数组
    */
    public getCoefficientListByBottom(id: number, bottom: number): Array<number>
    {
        let arr: Array<number> = new Array<number>();
        // for (let def of this.dataList) //move todo
        // {
        //     if (def.Id == id && def.bottom == bottom)
        //     {
        //         arr.push(def.coefficient);
        //     }
        // }
        return arr;
    }
}
/**
 * 德州转转转定义
 * */
class LaBaDefinition 
{
	/**
	 * 底注金额
	 */
    public bottom: number;
	/**
	 * 中奖类型
	 */
    public type: number;
	/**
	 * 权重
	 */
    public weight: number;
    /**
     * 比例
    */
    public coefficient: number
}