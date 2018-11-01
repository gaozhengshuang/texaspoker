/**
 * 百人大战结果组件信息
 */
class HWResultCardsInfo extends BaseServerValueInfo 
{
    public cardList: Array<CardInfo>;
    /**
     * 牌型描述
    */
    public cardTypeDes: string;
    /**
     * 牌型
    */
    public cardType: CardType;
    /**
     * 输赢描述
    */
    public resultDes: string;
    /**
     * 位置
    */
    public pos: number;
    /**
     * 结果状态
     */
    public state:number;

    public reset()
    {
        super.reset();
        this.cardList = undefined;
        this.cardTypeDes = undefined;
        this.cardType = undefined;
        this.resultDes = undefined;
        this.pos = 0;
        this.state = undefined;
    }
}
