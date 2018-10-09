/**
 * 锦标赛盲注定义
*/
class ChampionshipBlindDefined
{
    private static _instance: ChampionshipBlindDefined;
    public static GetInstance(): ChampionshipBlindDefined
    {
        if (!ChampionshipBlindDefined._instance)
        {
            ChampionshipBlindDefined._instance = new ChampionshipBlindDefined();
        }
        return ChampionshipBlindDefined._instance;
    }
   
    /**
     * 根据blindId获取盲注信息数组
    */
    private getBlindListByBlindId(blindId: number): Array<any>
    {
        // if (this.dataList != null)
        // {
        //     let blindList: Array<ChampionshipBlindDefinition> = new Array<ChampionshipBlindDefinition>();
        //     for (let i: number = 0; i < this.dataList.length; i++)
        //     {
        //         if (this.dataList[i].blindId == blindId)
        //         {
        //             blindList.push(this.dataList[i]);
        //         }
        //     }
        //     return blindList;
        // }
        return null;
    }
    /**
     * 获得盲注信息通过level和blindId
    */
    public getBlindInfoByLevel(level: number, blindId: number): any
    {
        // let blindList: Array<ChampionshipBlindDefinition> = this.getBlindListByBlindId(blindId);
        // if (blindList != null)
        // {
        //     for (let i: number = 0; i < blindList.length; i++)
        //     {
        //         if (this.dataList[i].level == level)
        //         {
        //             return blindList[i];
        //         }
        //     }
        // }
        return null;
    }

    public getDefByBlind(typeId: number, sBlind: number, bBlind: number): any
    {
        // if (this.dataList != null)
        // {
        //     for (let i: number = 0; i < this.dataList.length; i++)
        //     {
        //         if (this.dataList[i].blindId == typeId && this.dataList[i].sBlind == sBlind && this.dataList[i].bBlind == bBlind)
        //         {
        //             return this.dataList[i];
        //         }
        //     }
        // }
        return null;
    }
}
/**
 * 锦标赛盲注定义
 * */
class ChampionshipBlindDefinition implements IBaseDefintion
{
    /**
     * id
     */
    public id: number;
	/**
	 * 类型
	 */
    public blindId: number;
    /**
     * 盲注级别
    */
    public level: number;
    /**
     * 小盲注
    */
    public sBlind: number;
    /**
     * 大盲注
    */
    public bBlind: number;
    /**
     * 前注
    */
    public preBet: number;
    /**
     * 重购
    */
    public rebuy: number;
    /**
     * 增购
    */
    public addon: number;
    /**
     * 涨盲时间
    */
    public upTime: number;
}