/**
 * 百人大战注数信息
*/
class HWBetInfo extends BaseServerValueInfo 
{
    /**
     * 注数
    */
    public bet: number;
    /**
     * id
    */
    public id: number;
    /**
     * 是否可下注
    */
    public isBet: boolean;

    public reset()
    {
        super.reset();
        this.bet = 0;
        this.id = 0;
        this.isBet = undefined;
    }
}