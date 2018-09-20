/**
 * 无座玩家信息
 */
class HundredWarNoSeatInfo extends BaseServerValueInfo implements IBaseHead
{
    /**
   * id
   */
    public roleId: number;
    /**
     * 昵称
     */
    public name: string;
    /**
    * 金币数值
    */
    public score: number;
	/**
	 * 头像
	 */
    private _head: string;

    public set head(value: string)
    {
        if (game.StringUtil.isNullOrEmpty(value) == false)
        {
            value = value.split(GameSetting.HeadUploadVerifySign)[0];
        }
        this._head = value;
    }
    public get head(): string
    {
        if (game.StringUtil.isNullOrEmpty(this._head))
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
}