/**
 * 随机昵称
*/
class NameDefined extends BaseDefined<NameDefinition>
{
    private static readonly nameConfig: string = "name";
    private static _instance: NameDefined;
    
    public static GetInstance(): NameDefined
    {
        if (!NameDefined._instance)
        {
            NameDefined._instance = new NameDefined();
        }
        if (DefinedManager.IsParsed(NameDefined.nameConfig) == false)
        {
            NameDefined._instance.initialize();
        }
        return NameDefined._instance;
    }

    /**
     * 男名范围
    */
    private _boyFirstNameRange: number;
    /**
     * 姓氏范围
    */
    private _lastNameRange: number;

    private initialize()
    {
        this.dataList = DefinedManager.GetData(NameDefined.nameConfig) as Array<NameDefinition>;
        if (this.dataList && this.dataList.length > 0)
        {
            for (let def of this.dataList)
            {
                if (!this._lastNameRange)
                {
                    if (!def.name)
                    {
                        this._lastNameRange = def.id-1;
                    }
                }
                if (!this._boyFirstNameRange)
                {
                    if (!def.boy)
                    {
                        this._boyFirstNameRange = def.id-1;
                    }
                }
            }
            if(!(this._lastNameRange || this._boyFirstNameRange)){
                game.Console.log("获取姓名或男孩名范围失败");
            }
        }
    }
    /**
     * 获取随机昵称
    */
    public getRandomNickName(sex: number): string
    {
        sex = sex < Sex.Female ? Sex.Male : Sex.Female;
        //姓
        let firstNameIndex: number = game.MathUtil.getRandom(0, this._lastNameRange - 1);
        let firstName: string = this.dataList[firstNameIndex].name;
        //名
        let lastName: string;
        if (sex == Sex.Male)
        {
            let index: number = game.MathUtil.getRandom(0, this._boyFirstNameRange - 1);
            let def: NameDefinition = this.dataList[index];
            lastName = def.boy;
        }
        else
        {
            let index: number = game.MathUtil.getRandom(0, this.dataList.length - 1);
            let def: NameDefinition = this.dataList[index];
            lastName = def.girl;
        }
        return firstName.trim() + lastName.trim();
    }
}
/**
* 随机昵称的定义
*/
class NameDefinition implements IBaseDefintion
{
    public id: number;
    public name: string;
    public boy: string;
    public girl: string;
}