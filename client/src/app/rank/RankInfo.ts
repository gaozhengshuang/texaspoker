class RankInfo extends BaseServerValueInfo implements IBaseHead
{
    public copyValueFrom(data: any)
    {
        super.copyValueFrom(data);
        if (!data["head"])
        {
            this.head = SheetSubName.getdefaultHead(this.sex);
        }
    }
    public reset()
    {
        this.roleId = 0;
        this.name = qin.StringConstants.Empty;
        this.score = 0;
        this.rank = 0;
        this.sex = 0;
        this.head = SheetSubName.Default_Head_Male;
        this.change = RankChange.NoChange;
    }
    /**
     * 排行榜类型
     */
    public type: RankType;
    /**
     * id
     */
    public roleId: number;
    /**
     * 昵称
     */
    public name: string;
    /**
    * 排行榜数值
    */
    public score: number;
    /**
     * 排行
     */
    public rank: number;
	/**
	 * 头像
	 */
    private _head: string;
    public set head(value: string)
    {
        if (qin.StringUtil.isNullOrEmpty(value) == false)
        {
            value = value.split(GameSetting.HeadUploadVerifySign)[0];
        }
        this._head = value;
    }
    public get head(): string
    {
        if (qin.StringUtil.isNullOrEmpty(this._head))
        {
            return SheetSubName.getdefaultHead(this.sex);
        }
        else
        {
            return this._head;
        }
    }
    /**
     * 性别
     */
    public sex: Sex;
    /**
     * 排名变化
     */
    public change: RankChange;
}