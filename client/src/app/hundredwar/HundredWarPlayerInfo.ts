/**
 * 百人大战玩家信息
 */
class HundredWarPlayerInfo extends BaseServerValueInfo implements IBaseHead
{
    /**
    * ID
    */
    public roleId: number;
    /**
    * 昵称
    */
    public name: string;
    /**
    * 性别
    */
    public sex: number;
    /**
    * 头像
    */
    private _head: string;
    /**
    * 数值
    */
    public gold: number;

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
}