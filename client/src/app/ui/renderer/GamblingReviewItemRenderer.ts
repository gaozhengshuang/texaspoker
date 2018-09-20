/**
 * 牌局上局回顾项面板
*/
class GamblingReviewItemRenderer extends BaseItemRenderer<PlayerReviewInfo>
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
            switch (GamblingManager.gamblingReviewHandler.pubCardList.length)
            {
                case 0:
                    this.pubGroup0.visible = this.pubGroup1.visible = this.pubGroup2.visible = false;
                    break;
                case 3:
                    this.pubGroup0.visible = true;
                    this.pubGroup1.visible = this.pubGroup2.visible = false;
                    break;
                case 4:
                    this.pubGroup0.visible = this.pubGroup1.visible = true;
                    this.pubGroup2.visible = false;
                    break;
                case 5:
                    this.pubGroup0.visible = this.pubGroup1.visible = this.pubGroup2.visible = true;
                    break;
            }

            for (let i: number = 0; i < 4; i++)
            {
                this["operation" + i].text = "";
                this["num" + i].text = "";
            }

            this.headCom.init(this.bindData, 76);
            this.nameLabel.text = this.bindData.name;

            if (!this.bindData.posType)
            {
                this.posDesGroup.visible = false;
            } else
            {
                this.posDesGroup.visible = true;
                if (this.bindData.posType == PlayerPosType.Banker)
                {
                    this.posDesLabel.text = "";
                    this.posImg.source = SheetSubName.Review_Banker;
                } else
                {
                    this.posImg.source = SheetSubName.Review_Blind;
                    if (this.bindData.posType == PlayerPosType.Bblind)
                    {
                        this.posDesLabel.text = "大盲";
                    } else if (this.bindData.posType == PlayerPosType.Sblind)
                    {
                        this.posDesLabel.text = "小盲";
                    }
                }
            }

            this.card0.init(this.bindData.cardList[0]);
            this.card1.init(this.bindData.cardList[1]);

            let flodStep: number;
            for (let info of this.bindData.selfActionRecord)
            {
                if (info.action == PlayerState.Fold || info.action == PlayerState.StandUp)
                {
                    flodStep = info.step;
                    break;
                }
            }

            if ((GamblingManager.gamblingReviewHandler.isCompare() && !flodStep) || this.bindData.isShowCard || this.bindData.roleId == UserManager.userInfo.roleId)
            {
                this.card0.initElementsShow2();
                this.card1.initElementsShow2();
            } else
            {
                this.card0.initElementsShow();
                this.card1.initElementsShow();
            }

            let len: number = GamblingManager.gamblingReviewHandler.dealActionRecord.length;
            if (flodStep)  //是否弃牌或离开
            {
                this.cardTypeLabel.text = "";
                //设置3张公共牌显示隐藏
                if (len >= 1)
                {
                    let pubCardsActionInfo: PlayerActionRecordInfo = GamblingManager.gamblingReviewHandler.dealActionRecord[0];
                    let actionInfo: PlayerActionRecordInfo = this.getLTAndNearestStepAction(pubCardsActionInfo.step);
                    this.setLastActionDesBeforeDeal(0, actionInfo);
                    if (flodStep > pubCardsActionInfo.step)
                    {
                        this.pubGroup0.visible = true;
                        for (let i: number = 0; i < 3; i++)
                        {
                            let j: number = i + 2;
                            this["card" + j].init(GamblingManager.gamblingReviewHandler.pubCardList[i]);
                            this["card" + j].initElementsShow2();
                        }
                        if (len == 1)
                        {
                            this.setLastActionDesAfterDeal(len, actionInfo);
                        }
                    } else
                    {
                        this.pubGroup0.visible = this.pubGroup1.visible = this.pubGroup2.visible = false;
                    }
                } else
                {
                    this.setLastActionDesAfterDeal(0);
                    this.pubGroup0.visible = this.pubGroup1.visible = this.pubGroup2.visible = false;
                }
                if (len >= 2)
                {
                    let pubCardsActionInfo: PlayerActionRecordInfo = GamblingManager.gamblingReviewHandler.dealActionRecord[1];
                    let actionInfo: PlayerActionRecordInfo = this.getLTAndNearestStepAction(pubCardsActionInfo.step);
                    this.setLastActionDesBeforeDeal(1, actionInfo);
                    if (flodStep > pubCardsActionInfo.step)
                    {
                        this.pubGroup1.visible = true;
                        this.card5.init(GamblingManager.gamblingReviewHandler.pubCardList[3]);
                        this.card5.initElementsShow2();
                        if (len == 2)
                        {
                            this.setLastActionDesAfterDeal(len, actionInfo);
                        }
                    } else
                    {
                        this.pubGroup1.visible = this.pubGroup2.visible = false;
                    }
                }
            } else
            {
                for (let i: number = 0; i < GamblingManager.gamblingReviewHandler.pubCardList.length; i++)
                {
                    let j: number = i + 2;
                    this["card" + j].init(GamblingManager.gamblingReviewHandler.pubCardList[i]);
                    this["card" + j].initElementsShow2();
                }
                this.cardTypeLabel.text = this.bindData.cardTypeDes;

                if (len >= 1)
                {
                    this.setActionDes(len, 1);
                } else
                {
                    this.setLastActionDesAfterDeal(0);
                }
                if (len >= 2)
                {
                    this.setActionDes(len, 2);
                }
            }
            if (len >= 3)
            {
                if (flodStep)
                {
                    let pubCardsActionInfo: PlayerActionRecordInfo = GamblingManager.gamblingReviewHandler.dealActionRecord[2];
                    if (flodStep > pubCardsActionInfo.step)
                    {
                        this.pubGroup2.visible = true;
                        this.card6.init(GamblingManager.gamblingReviewHandler.pubCardList[4]);
                        this.card6.initElementsShow2();
                    } else
                    {
                        this.pubGroup2.visible = false;
                    }
                }
                this.setActionDes(len, 3);
            }

            if (this.bindData.isWin)
            {
                this.resultNumLabel.textColor = ColorEnum.Review_Win_Orange;
                this.resultNumLabel.text = "+" + qin.MathUtil.formatNum(this.bindData.betNum);
            } else
            {
                this.resultNumLabel.textColor = ColorEnum.Review_Lost_Green;
                if (this.bindData.betNum == 0)
                {
                    this.resultNumLabel.text = this.bindData.betNum.toString();
                } else
                {
                    this.resultNumLabel.text = "-" + qin.MathUtil.formatNum(this.bindData.betNum);
                }
            }

        }
    }

    /**
     * 设置操作描述信息
    */
    private setActionDes(len: number, index: number)
    {
        let i: number = index - 1;
        let actionInfo: PlayerActionRecordInfo;
        let pubCardsActionInfo: PlayerActionRecordInfo = GamblingManager.gamblingReviewHandler.dealActionRecord[i];
        if (!this._isSetAllIn)
        {
            actionInfo = this.getLTAndNearestStepAction(pubCardsActionInfo.step);
            this.setLastActionDesBeforeDeal(i, actionInfo);
            if (len == index)
            {
                this.setLastActionDesAfterDeal(index, actionInfo);
            }
        }
    }
    /**
     * 设置该次发牌前最后一次操作描述
    */
    private setLastActionDesBeforeDeal(index: number, actionInfo: PlayerActionRecordInfo)
    {
        if (actionInfo && actionInfo.action)
        {
            this.setActionDesInfo(index, actionInfo);

        }
    }
    /**
     * 设置该次发牌后最后一次操作描述
    */
    private setLastActionDesAfterDeal(index: number, actionInfo?: PlayerActionRecordInfo)
    {
        let lastActionInfo: PlayerActionRecordInfo = this.getLTAndNearestStepAction(GamblingManager.gamblingReviewHandler.overActionStep);
        let flag: boolean = false;
        if (index == 0)
        {
            if (lastActionInfo)
            {
                flag = true;
            }
        } else
        {
            if (lastActionInfo && lastActionInfo.action)
            {
                flag = true;
            }
        }
        if (flag)
        {
            if (actionInfo)
            {
                if (actionInfo != lastActionInfo)
                {
                    this.setActionDesInfo(index, lastActionInfo);
                }
            } else
            {
                this.setActionDesInfo(index, lastActionInfo);
            }
        }
    }
    /**
     * 设置最后一次操作描述
    */
    private setActionDesInfo(index: number, lastActionInfo: PlayerActionRecordInfo)
    {
        this["operation" + index].text = this.getActionNameByState(lastActionInfo.action);
        let blindNum: number = GamblingManager.gamblingReviewHandler.getBlind(this.bindData.roleId);
        let num: number = 0;
        if (lastActionInfo.num1)
        {
            num = lastActionInfo.num1;
        } else
        {
            if (index == 0 && blindNum)
            {
                num = blindNum;
            }
        }
        if (num > 0)
        {
            this["num" + index].text = qin.MathUtil.formatNum(num);
        }
    }
    /**
     * 获得小于但最接近传入步骤的步骤
    */
    private getLTAndNearestStepAction(step: number): PlayerActionRecordInfo
    {
        let nearestStep = 0;
        let nearestStepAction: PlayerActionRecordInfo;
        let isFold: boolean = this.isFold();
        for (let actionInfo of this.bindData.selfActionRecord)
        {
            if (actionInfo.action != PlayerState.Trusteeship && actionInfo.action != PlayerState.ShowCard && actionInfo.step < step && actionInfo.step > nearestStep)
            {
                if (isFold)
                {
                    if (actionInfo.action != PlayerState.StandUp)
                    {
                        nearestStep = actionInfo.step;
                        nearestStepAction = actionInfo;
                    }
                } else
                {
                    nearestStep = actionInfo.step;
                    nearestStepAction = actionInfo;
                }
            }
        }
        return nearestStepAction;
    }
    /**
     * 判断是否弃牌
    */
    private isFold(): boolean
    {
        for (let info of this.bindData.selfActionRecord)
        {
            if (info.action == PlayerState.Fold)
            {
                return true
            }
        }
        return false;
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