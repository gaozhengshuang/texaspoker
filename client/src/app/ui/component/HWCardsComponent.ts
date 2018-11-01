/**
 * 百人大战牌局结果组件
 */
class HWCardsComponent extends BaseComponent<HWResultCardsInfo>
{
    public cardFaceGroup: eui.Group;
    public winMarkImg: eui.Image;

    /**
     * 牌型
    */
    public typeImg: eui.Image;
    /**
     * 输赢多少描述
    */
    public resultDesLabel: eui.Label;
    /**
     * 牌型背景
    */
    public cardTypeBg: eui.Image;

    private _pointList: Array<egret.Point>;

    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this._pointList = new Array<egret.Point>();
        for (let i: number = 0; i < 5; i++)
        {
            this._pointList.push(new egret.Point(45 + i * 15, 50));
        }
        this.touchChildren = this.touchEnabled = false;
    }
    /**
	 * 默认初始化
	 */
    public init(data?: HWResultCardsInfo)
    {
        super.init(data);
        if (data)
        {
            this.showFront(data);
        } else
        {
            this.showReverse();
        }
    }

    private waitNext()
    {

    }
    public dealCards(thisObj: any, cardList: Array<CardInfo>, pos: number, wait: number, flag: boolean)
    {
        thisObj.cardsAnim.createCardGroup(cardList, thisObj.potGroup, pos, wait, flag);
    }

    /**
     * 隐藏
    */
    public showReverse()
    {
        this.reset();
    }
    /**
	 * 显示牌型和赔率
	 */
    public showFront(data: HWResultCardsInfo, pos?: number)
    {
        if (data)
        {
            this.bindData = data;
            if (data.cardTypeDes)
            {
                this.cardTypeBg.visible = true;
                this.typeImg.source = data.cardTypeDes;
            }
            if (HundredWarManager.getBetPotResultByPos(pos))
            {
                this.resultDesLabel.textColor = ColorEnum.Yellow;;
            } else
            {
                if (data.cardType == CardType.RoyalFlush || data.cardType == CardType.StraightFlush || data.cardType == CardType.FourOfAKind)
                {
                    this.resultDesLabel.textColor = ColorEnum.Yellow;;
                } else
                {
                    this.resultDesLabel.textColor = ColorEnum.White;
                }
            }
            this.resultDesLabel.text = data.resultDes;


        }
    }
    public showWinMarkImg()
    {
        if (this.bindData && this.bindData.state == 1) //赢的状态，1赢，0平局，2输
        {
            this.winMarkImg.visible = true;
        }
        else
        {
            this.winMarkImg.visible = false;
        }
    }
    /**
     * 重置
    */
    public reset()
    {
        this.resultDesLabel.text = "";
        this.typeImg.source = "";
        this.cardTypeBg.visible = false;
        this.winMarkImg.visible = false;
    }
}
