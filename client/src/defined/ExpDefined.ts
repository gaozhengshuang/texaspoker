/**
 * 用户等级的定义
 * */
class ExpDefined extends BaseDefined<ExpDefinition>
{
    private static readonly expConfig: string = "exp";
    private static _instance: ExpDefined;
    public static GetInstance(): ExpDefined
    {
        if (!ExpDefined._instance)
        {
            ExpDefined._instance = new ExpDefined();
        }
        if (DefinedManager.IsParsed(ExpDefined.expConfig) == false)
        {
            ExpDefined._instance.initialize();
        }
        return ExpDefined._instance;
    }

    private initialize()
    {
        this.dataList = [ {
  "Id" : 1,
  "level" : 1,
  "exp" : 0,
  "title" : "打杂"
}, {
  "Id" : 2,
  "level" : 2,
  "exp" : 80,
  "title" : "打杂"
}, {
  "Id" : 3,
  "level" : 3,
  "exp" : 130,
  "title" : "打杂"
}, {
  "Id" : 4,
  "level" : 4,
  "exp" : 200,
  "title" : "打杂"
}, {
  "Id" : 5,
  "level" : 5,
  "exp" : 290,
  "title" : "打杂"
}, {
  "Id" : 6,
  "level" : 6,
  "exp" : 400,
  "title" : "实习生"
}, {
  "Id" : 7,
  "level" : 7,
  "exp" : 530,
  "title" : "实习生"
}, {
  "Id" : 8,
  "level" : 8,
  "exp" : 680,
  "title" : "实习生"
}, {
  "Id" : 9,
  "level" : 9,
  "exp" : 850,
  "title" : "实习生"
}, {
  "Id" : 10,
  "level" : 10,
  "exp" : 1040,
  "title" : "实习生"
}, {
  "Id" : 11,
  "level" : 11,
  "exp" : 1250,
  "title" : "初级业务员"
}, {
  "Id" : 12,
  "level" : 12,
  "exp" : 1480,
  "title" : "初级业务员"
}, {
  "Id" : 13,
  "level" : 13,
  "exp" : 1730,
  "title" : "初级业务员"
}, {
  "Id" : 14,
  "level" : 14,
  "exp" : 2000,
  "title" : "初级业务员"
}, {
  "Id" : 15,
  "level" : 15,
  "exp" : 2290,
  "title" : "初级业务员"
}, {
  "Id" : 16,
  "level" : 16,
  "exp" : 2600,
  "title" : "中级业务员"
}, {
  "Id" : 17,
  "level" : 17,
  "exp" : 2930,
  "title" : "中级业务员"
}, {
  "Id" : 18,
  "level" : 18,
  "exp" : 3280,
  "title" : "中级业务员"
}, {
  "Id" : 19,
  "level" : 19,
  "exp" : 3650,
  "title" : "中级业务员"
}, {
  "Id" : 20,
  "level" : 20,
  "exp" : 4040,
  "title" : "中级业务员"
}, {
  "Id" : 21,
  "level" : 21,
  "exp" : 4450,
  "title" : "高级业务员"
}, {
  "Id" : 22,
  "level" : 22,
  "exp" : 4880,
  "title" : "高级业务员"
}, {
  "Id" : 23,
  "level" : 23,
  "exp" : 5330,
  "title" : "高级业务员"
}, {
  "Id" : 24,
  "level" : 24,
  "exp" : 5800,
  "title" : "高级业务员"
}, {
  "Id" : 25,
  "level" : 25,
  "exp" : 6290,
  "title" : "高级业务员"
}, {
  "Id" : 26,
  "level" : 26,
  "exp" : 6800,
  "title" : "副经理"
}, {
  "Id" : 27,
  "level" : 27,
  "exp" : 7330,
  "title" : "副经理"
}, {
  "Id" : 28,
  "level" : 28,
  "exp" : 7880,
  "title" : "副经理"
}, {
  "Id" : 29,
  "level" : 29,
  "exp" : 8450,
  "title" : "副经理"
}, {
  "Id" : 30,
  "level" : 30,
  "exp" : 9040,
  "title" : "副经理"
}, {
  "Id" : 31,
  "level" : 31,
  "exp" : 9650,
  "title" : "经理"
}, {
  "Id" : 32,
  "level" : 32,
  "exp" : 10280,
  "title" : "经理"
}, {
  "Id" : 33,
  "level" : 33,
  "exp" : 10930,
  "title" : "经理"
}, {
  "Id" : 34,
  "level" : 34,
  "exp" : 11600,
  "title" : "经理"
}, {
  "Id" : 35,
  "level" : 35,
  "exp" : 12290,
  "title" : "经理"
}, {
  "Id" : 36,
  "level" : 36,
  "exp" : 13000,
  "title" : "高级经理"
}, {
  "Id" : 37,
  "level" : 37,
  "exp" : 13730,
  "title" : "高级经理"
}, {
  "Id" : 38,
  "level" : 38,
  "exp" : 14480,
  "title" : "高级经理"
}, {
  "Id" : 39,
  "level" : 39,
  "exp" : 15250,
  "title" : "高级经理"
}, {
  "Id" : 40,
  "level" : 40,
  "exp" : 16040,
  "title" : "高级经理"
}, {
  "Id" : 41,
  "level" : 41,
  "exp" : 16850,
  "title" : "副总监"
}, {
  "Id" : 42,
  "level" : 42,
  "exp" : 17680,
  "title" : "副总监"
}, {
  "Id" : 43,
  "level" : 43,
  "exp" : 18530,
  "title" : "副总监"
}, {
  "Id" : 44,
  "level" : 44,
  "exp" : 19400,
  "title" : "副总监"
}, {
  "Id" : 45,
  "level" : 45,
  "exp" : 20290,
  "title" : "副总监"
}, {
  "Id" : 46,
  "level" : 46,
  "exp" : 21200,
  "title" : "总监"
}, {
  "Id" : 47,
  "level" : 47,
  "exp" : 22130,
  "title" : "总监"
}, {
  "Id" : 48,
  "level" : 48,
  "exp" : 23080,
  "title" : "总监"
}, {
  "Id" : 49,
  "level" : 49,
  "exp" : 24050,
  "title" : "总监"
}, {
  "Id" : 50,
  "level" : 50,
  "exp" : 25040,
  "title" : "总监"
}, {
  "Id" : 51,
  "level" : 51,
  "exp" : 26050,
  "title" : "高级总监"
}, {
  "Id" : 52,
  "level" : 52,
  "exp" : 27080,
  "title" : "高级总监"
}, {
  "Id" : 53,
  "level" : 53,
  "exp" : 28130,
  "title" : "高级总监"
}, {
  "Id" : 54,
  "level" : 54,
  "exp" : 29200,
  "title" : "高级总监"
}, {
  "Id" : 55,
  "level" : 55,
  "exp" : 30290,
  "title" : "高级总监"
}, {
  "Id" : 56,
  "level" : 56,
  "exp" : 31400,
  "title" : "资深总监"
}, {
  "Id" : 57,
  "level" : 57,
  "exp" : 32530,
  "title" : "资深总监"
}, {
  "Id" : 58,
  "level" : 58,
  "exp" : 33680,
  "title" : "资深总监"
}, {
  "Id" : 59,
  "level" : 59,
  "exp" : 34850,
  "title" : "资深总监"
}, {
  "Id" : 60,
  "level" : 60,
  "exp" : 36040,
  "title" : "资深总监"
}, {
  "Id" : 61,
  "level" : 61,
  "exp" : 37250,
  "title" : "副总经理"
}, {
  "Id" : 62,
  "level" : 62,
  "exp" : 38480,
  "title" : "副总经理"
}, {
  "Id" : 63,
  "level" : 63,
  "exp" : 39730,
  "title" : "副总经理"
}, {
  "Id" : 64,
  "level" : 64,
  "exp" : 41000,
  "title" : "副总经理"
}, {
  "Id" : 65,
  "level" : 65,
  "exp" : 42290,
  "title" : "副总经理"
}, {
  "Id" : 66,
  "level" : 66,
  "exp" : 43600,
  "title" : "总经理"
}, {
  "Id" : 67,
  "level" : 67,
  "exp" : 44930,
  "title" : "总经理"
}, {
  "Id" : 68,
  "level" : 68,
  "exp" : 46280,
  "title" : "总经理"
}, {
  "Id" : 69,
  "level" : 69,
  "exp" : 47650,
  "title" : "总经理"
}, {
  "Id" : 70,
  "level" : 70,
  "exp" : 49040,
  "title" : "总经理"
}, {
  "Id" : 71,
  "level" : 71,
  "exp" : 50450,
  "title" : "副总裁"
}, {
  "Id" : 72,
  "level" : 72,
  "exp" : 51880,
  "title" : "副总裁"
}, {
  "Id" : 73,
  "level" : 73,
  "exp" : 53330,
  "title" : "副总裁"
}, {
  "Id" : 74,
  "level" : 74,
  "exp" : 54800,
  "title" : "副总裁"
}, {
  "Id" : 75,
  "level" : 75,
  "exp" : 56290,
  "title" : "副总裁"
}, {
  "Id" : 76,
  "level" : 76,
  "exp" : 57800,
  "title" : "高级副总裁"
}, {
  "Id" : 77,
  "level" : 77,
  "exp" : 59330,
  "title" : "高级副总裁"
}, {
  "Id" : 78,
  "level" : 78,
  "exp" : 60880,
  "title" : "高级副总裁"
}, {
  "Id" : 79,
  "level" : 79,
  "exp" : 62450,
  "title" : "高级副总裁"
}, {
  "Id" : 80,
  "level" : 80,
  "exp" : 64040,
  "title" : "高级副总裁"
}, {
  "Id" : 81,
  "level" : 81,
  "exp" : 65650,
  "title" : "总裁"
}, {
  "Id" : 82,
  "level" : 82,
  "exp" : 67280,
  "title" : "总裁"
}, {
  "Id" : 83,
  "level" : 83,
  "exp" : 68930,
  "title" : "总裁"
}, {
  "Id" : 84,
  "level" : 84,
  "exp" : 70600,
  "title" : "总裁"
}, {
  "Id" : 85,
  "level" : 85,
  "exp" : 72290,
  "title" : "总裁"
}, {
  "Id" : 86,
  "level" : 86,
  "exp" : 74000,
  "title" : "副董事长"
}, {
  "Id" : 87,
  "level" : 87,
  "exp" : 75730,
  "title" : "副董事长"
}, {
  "Id" : 88,
  "level" : 88,
  "exp" : 77480,
  "title" : "副董事长"
}, {
  "Id" : 89,
  "level" : 89,
  "exp" : 79250,
  "title" : "副董事长"
}, {
  "Id" : 90,
  "level" : 90,
  "exp" : 81040,
  "title" : "副董事长"
}, {
  "Id" : 91,
  "level" : 91,
  "exp" : 82850,
  "title" : "董事长"
}, {
  "Id" : 92,
  "level" : 92,
  "exp" : 84680,
  "title" : "董事长"
}, {
  "Id" : 93,
  "level" : 93,
  "exp" : 86530,
  "title" : "董事长"
}, {
  "Id" : 94,
  "level" : 94,
  "exp" : 88400,
  "title" : "董事长"
}, {
  "Id" : 95,
  "level" : 95,
  "exp" : 90290,
  "title" : "董事长"
}, {
  "Id" : 96,
  "level" : 96,
  "exp" : 92200,
  "title" : "董事会主席"
}, {
  "Id" : 97,
  "level" : 97,
  "exp" : 94130,
  "title" : "董事会主席"
}, {
  "Id" : 98,
  "level" : 98,
  "exp" : 96080,
  "title" : "董事会主席"
}, {
  "Id" : 99,
  "level" : 99,
  "exp" : 98050,
  "title" : "董事会主席"
}, {
  "Id" : 100,
  "level" : 100,
  "exp" : 100040,
  "title" : "董事会主席"
} ];
        // this.dataList = DefinedManager.GetData(ExpDefined.expConfig) as Array<ExpDefinition>;
    }
}

/**
* 用户等级的定义
* */
class ExpDefinition implements IBaseDefintion
{
    public Id: number;
    public level: number;
    public exp: number;
    public title: string;
}