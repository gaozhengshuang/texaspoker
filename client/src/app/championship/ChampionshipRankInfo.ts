/**
 * 比赛前10或前5玩家信息
*/
class ChampionshipRankInfo extends BaseServerValueInfo implements IBaseHead
{
    /**
     * 玩家id
    */
    public roleId: number
    /**
     * 名次
    */
    public rank: number;
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
     * 昵称
    */
    public name: string;
    /**
     * 性别
    */
    public sex: number;
    /**
     * 奖励的描述
    */
    public award: string;
    /**
     * 筹码
    */
    public chips: number;

    public reset()
    {
        super.reset();
    }
}