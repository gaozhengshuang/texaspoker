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
        if (table.ChampionshipBlind)
        {
            let blindList: Array<table.IChampionshipBlindDefine> = new Array<table.IChampionshipBlindDefine>();
            for (let i: number = 0; i < table.ChampionshipBlind.length; i++)
            {
                if (table.ChampionshipBlind[i].BlindId == blindId)
                {
                    blindList.push(table.ChampionshipBlind[i]);
                }
            }
            return blindList;
        }
        return null;
    }
    /**
     * 获得盲注信息通过level和blindId
    */
    public getBlindInfoByLevel(level: number, blindId: number): any
    {
        let blindList: Array<table.IChampionshipBlindDefine> = this.getBlindListByBlindId(blindId);
        if (blindList != null)
        {
            for (let i: number = 0; i < blindList.length; i++)
            {
                if (blindList[i].Level == level)
                {
                    return blindList[i];
                }
            }
        }
        return null;
    }

    public getDefByBlind(typeId: number, sBlind: number, bBlind: number): any
    {
        if (table.ChampionshipBlind)
        {
            for (let i: number = 0; i < table.ChampionshipBlind.length; i++)
            {
                if (table.ChampionshipBlind[i].BlindId == typeId && table.ChampionshipBlind[i].SBlind == sBlind && table.ChampionshipBlind[i].BBlind == bBlind)
                {
                    return table.ChampionshipBlind[i];
                }
            }
        }
        return null;
    }
}