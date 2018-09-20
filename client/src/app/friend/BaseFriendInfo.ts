class BaseFriendInfo extends BaseServerValueInfo implements IBaseHead
{
    public copyValueFrom(data: any)
    {
        this.reset();
        super.copyValueFrom(data);
        if (!data["head"])
        {
            this.head = SheetSubName.getdefaultHead(this.sex);
        }
    }
    /**
    * 头像宽高
    */
    public width: number = 100;
    public height: number = 100;
    /**
     * ID
    */
    public roleId: number;
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
     * 名字
    */
    public name: string;
    /**
     * 用户等级
    */
    public level: number;
    /**
     * 性别
    */
    public sex: number;
    /**
     * vip等级
    */
    public vipLevel: number;
    public reset()
    {
        super.reset();
    }
}