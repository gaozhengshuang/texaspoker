/**
 * 上局回顾玩家信息
*/
class PlayerReviewInfo extends BaseServerValueInfo implements IBaseHead
{
    /**
     * 角色id
    */
    public roleId: number;
    /**
    * 名字
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
     * 位置类型
    */
    public posType: PlayerPosType;
    /**
     * 位置
    */
    public pos: number;
    /**
     * 输赢
    */
    public isWin: boolean;
    /**
     * 输赢了多少
    */
    public betNum: number;
    /**
     * 是否亮牌
    */
    public isShowCard: boolean;
    /**
     * 自己的操作记录
    */
    public selfActionRecord: Array<PlayerActionRecordInfo>;
    /**
	 * 手牌列表
	 */
    public cardList: Array<CardInfo>;
    /**
     * 牌型描述
    */
    public cardTypeDes: string;
}