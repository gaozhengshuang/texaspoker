/**
 * 牌局上局回顾项面板
*/
class GamblingReviewItemRenderer extends BaseItemRenderer<msg.UserReviewInfo>
{
    /**
     * 位置描述
    */
    public posDesLabel: eui.Label;
    public posDesGroup: eui.Group;
    /**
     * 位置描述图片
    */
    public posImg: eui.Image;
    /**
     * 头像
    */
    public headCom: CircleHeadComponent;
    /**
     * 玩家昵称
    */
    public nameLabel: eui.Label;
    /**
     * 牌
    */
    public card0: CardFaceComponent;
    public card1: CardFaceComponent;
    public card2: CardFaceComponent;
    public card3: CardFaceComponent;
    public card4: CardFaceComponent;
    public card5: CardFaceComponent;
    public card6: CardFaceComponent;
    /**
     * 操作描述
    */
    public operation0: eui.Label;
    public operation1: eui.Label;
    public operation2: eui.Label;
    public operation3: eui.Label;
    public num0: eui.Label;
    public num1: eui.Label;
    public num2: eui.Label;
    public num3: eui.Label;
    /**
     * 结算金额
    */
    public resultNumLabel: eui.Label;
    /**
     * 牌型描述
    */
    public cardTypeLabel: eui.Label;

    public pubGroup0: eui.Group;
    public pubGroup1: eui.Group;
    public pubGroup2: eui.Group;
    private _isSetAllIn: boolean;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.GamblingReviewItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            this._isSetAllIn = false;
            //根据公共牌情况设置公共牌显示隐藏
            switch (this.bindData.round.length)
            {
                case 1:
                    this.pubGroup0.visible = this.pubGroup1.visible = this.pubGroup2.visible = false;
                    break;
                case 2:
                    this.pubGroup0.visible = true;
                    this.pubGroup1.visible = this.pubGroup2.visible = false;
                    break;
                case 3:
                    this.pubGroup0.visible = this.pubGroup1.visible = true;
                    this.pubGroup2.visible = false;
                    break;
                case 4:
                    this.pubGroup0.visible = this.pubGroup1.visible = this.pubGroup2.visible = true;
                    break;
            }

            for (let i: number = 0; i < 4; i++)
            {
                this["operation" + i].text = "";
                this["num" + i].text = "";
            }
            let baseHead: IBaseHead = { head: this.bindData.face, sex: this.bindData.sex };
            this.headCom.init(baseHead, 76);
            this.nameLabel.text = this.bindData.name;

            if (this.bindData.bankroll > 0)
            {
                this.resultNumLabel.textColor = ColorEnum.Review_Win_Orange;
                this.resultNumLabel.text = "+" + game.MathUtil.formatNum(game.longToNumber(this.bindData.bankroll));
            } else
            {
                this.resultNumLabel.textColor = ColorEnum.Review_Lost_Green;
                if (this.bindData.bankroll == 0)
                {
                    this.resultNumLabel.text = this.bindData.bankroll.toString();
                } else
                {
                    this.resultNumLabel.text = game.MathUtil.formatNum(game.longToNumber(this.bindData.bankroll));
                }
            }
            this.cardTypeLabel.text = CardTypeMatchUtil.getCardDes(this.bindData.cardtype);

            for (let i: number = 0; i <= 3; i++)
            {
                this["operation" + i.toString()].text = game.StringConstants.Empty;
                this["num" + i.toString()].text = game.StringConstants.Empty;
            }
            for (let i: number = 0; i <= 6; i++)
            {
                this["card" + i.toString()].visible = false;
            }
            let cardIdx = 0;
            for (let i: number = 0; i < this.bindData.round.length; i++)
            {
                let roundInfo = this.bindData.round[i];
                this["operation" + i.toString()].text = this.getActionNameByState(roundInfo.state);
                this["num" + i.toString()].text = roundInfo.bet.toString();

                let infoList = GamblingUtil.cardArr2CardInfoList(this.bindData.round[i].cards);
                for (let j: number = 0; j < infoList.length; j++)
                {
                    this["card" + cardIdx.toString()].visible = true;
                    this["card" + cardIdx.toString()].init(infoList[j]);
                    if (i > 0)
                    {
                        this["card" + cardIdx.toString()].initElementsShow2();
                    }
                    cardIdx++;
                }
            }

            if (!this.bindData.specialpos)
            {
                this.posDesGroup.visible = false;
            } else
            {
                this.posDesGroup.visible = true;
                if (this.bindData.specialpos == PlayerPosType.Banker)
                {
                    this.posDesLabel.text = "";
                    this.posImg.source = SheetSubName.Review_Banker;
                } else
                {
                    this.posImg.source = SheetSubName.Review_Blind;
                    if (this.bindData.specialpos == PlayerPosType.Bblind)
                    {
                        this.posDesLabel.text = "大盲";
                    } else if (this.bindData.specialpos == PlayerPosType.Sblind)
                    {
                        this.posDesLabel.text = "小盲";
                    }
                }
            }

            if (this.bindData.showcard || this.bindData.roleid == UserManager.userInfo.roleId)
            {
                this.card0.initElementsShow2();
                this.card1.initElementsShow2();
            } else
            {
                this.card0.initElementsShow();
                this.card1.initElementsShow();
            }

        }
    }

    /**
     * 根据操作状态获得操作名称
    */
    private getActionNameByState(type: PlayerState): string
    {
        let str: string;
        switch (type)
        {
            case PlayerState.AllIn:
                this._isSetAllIn = true;
                str = "全下";
                break;
            case PlayerState.Fold:
                str = "弃牌";
                break;
            case PlayerState.Check:
                str = "过牌";
                break;
            case PlayerState.Raise:
                str = "加注";
                break;
            case PlayerState.Call:
                str = "跟注";
                break;
            case PlayerState.StandUp:
                str = "离开";
                break;
        }
        return str;
    }
}