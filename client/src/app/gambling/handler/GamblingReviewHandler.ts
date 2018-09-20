/**
 *上局回顾管理器
*/
class GamblingReviewHandler
{
    /**
     * 上局回顾信息列表
    */
    public reviewInfoList: Array<PlayerReviewInfo>;
    /**
     * 发牌记录
    */
    public dealActionRecord: Array<PlayerActionRecordInfo>;
    /**
     * 公共牌列表
    */
    public pubCardList: Array<CardInfo>;
    /**
     * 结束步骤
    */
    public overActionStep: number;

    public isNewRound: boolean;
    private _index: number;

    /**
     * 发送获取上局回顾信息的请求
    */
    public reqReviewInfo(id: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            this.reset();
            if (result.data)
            {
                if (result.data.Array)
                {
                    for (let info of result.data.Array)
                    {
                        if (info.action)
                        {
                            this.setInfoByActionType(info);
                        } else
                        {
                            this.setSelfCardsInfo(info);  //设置自己的手牌
                        }
                        this.setSelfActionRecord(info);  //设置自己的操作信息
                    }
                    if (this.reviewInfoList.length > 0)
                    {
                        for (let i: number = 0; i < this.reviewInfoList.length; i++)
                        {
                            let playerReviewInfo: PlayerReviewInfo = this.reviewInfoList[i];
                            //设置输赢以及输赢的数目
                            this.setResultInfo(playerReviewInfo);
                            //获得牌型类型以及牌型描述
                            this.setCardsTypeDes(playerReviewInfo);
                        }
                    }
                }
                this.startReqRank();
                UserManager.OnGetSimpleUserInfoEvent.addListener(this.onReqComplete, this);
                this.onReqReviewInfoEvent.dispatch();
            }
        };
        if (this.isNewRound)
        {
            SocketManager.call(Command.ReviewInfo_Req_3707, null, callback, null, this);
        }
    }
    /**
     * 重置数据
    */
    public reset()
    {
        this.isNewRound = false;
        this.overActionStep = 0;
        if (!this.reviewInfoList)
        {
            this.reviewInfoList = new Array<PlayerReviewInfo>();
        }
        if (!this.dealActionRecord)
        {
            this.dealActionRecord = new Array<PlayerActionRecordInfo>();
        }
        if (!this.pubCardList)
        {
            this.pubCardList = new Array<CardInfo>();
        }
        game.ArrayUtil.Clear(this.reviewInfoList);
        game.ArrayUtil.Clear(this.dealActionRecord);
        game.ArrayUtil.Clear(this.pubCardList);
    }
    /**
     * 根据操作种类设置信息
    */
    public setInfoByActionType(info: any)
    {
        switch (info.action)       
        {
            case PlayerState.PoolWon:  //设置结束操作的步数
                this.setOverRecordStep(info);
                break;
            case PlayerState.ThePos:  //写入玩家roleId和座位位置
                this.setPlayerRoleIdAndPos(info);
                break;
            case PlayerState.ButtonPos:  //写入庄家位信息
                this.setButtonPos(info);
                break;
            case PlayerState.Blind:  //写入盲注位信息
                this.setBlindPos(info);
                break;
            case PlayerState.PubCard:  //设置公共牌信息
                this.setPubCardsInfo(info);
                break;
            case PlayerState.ShowCard:  //设置是否亮牌
                this.setIsShowCard(info);
                break;
        }
    }
    /**
     * 写入玩家roleId和座位位置
    */
    public setPlayerRoleIdAndPos(info: any)
    {
        let playerReviewInfo: PlayerReviewInfo = new PlayerReviewInfo();
        playerReviewInfo.roleId = info.roleId;
        playerReviewInfo.pos = info.num1;
        this.reviewInfoList.push(playerReviewInfo);
    }
    /**
     * 写入庄家位
    */
    public setButtonPos(info: any)
    {
        for (let playerInfo of this.reviewInfoList)
        {
            if (playerInfo.pos == info.num1)
            {
                playerInfo.posType = PlayerPosType.Banker;
                break;
            }
        }
    }
    /**
     * 写入大小盲位
    */
    public setBlindPos(info: any)
    {
        let blind: number;
        if (GamblingManager.roomInfo.ante)
        {
            blind = info.num1 - GamblingManager.roomInfo.ante;
        } else
        {
            blind = info.num1;
        }
        for (let playerInfo of this.reviewInfoList)
        {
            if (playerInfo.roleId == info.roleId && playerInfo.posType != PlayerPosType.Banker)
            {
                if (blind == GamblingManager.roomInfo.sBlind)
                {
                    playerInfo.posType = PlayerPosType.Sblind;
                }
                if (blind == GamblingManager.roomInfo.bBlind)
                {
                    playerInfo.posType = PlayerPosType.Bblind;
                }
                break;
            }
        }
    }
    /**
     * 设置结束操作的步数
    */
    public setOverRecordStep(info: any)
    {
        if (this.overActionStep)
        {
            if (this.overActionStep > info.step)
            {
                this.overActionStep = info.step;
            }
        } else
        {
            this.overActionStep = info.step;
        }
    }
    /**
    * 设置5张公共牌信息
   */
    public setPubCardsInfo(info: any)
    {
        this.dealActionRecord.push(info);
        let cardInfos: Array<CardInfo> = new Array<CardInfo>();
        let cards: Array<number> = new Array<number>();
        try
        {
            cards = JSON.parse(info.cards);
        }
        catch (e)
        {
            game.Console.log(e);
        }
        if (cards)
        {
            GamblingUtil.cardArr2CardInfoList(cards, cardInfos);
        }
        this.pubCardList = this.pubCardList.concat(cardInfos);
    }
    /**
     * 设置自己的操作信息
    */
    public setSelfActionRecord(info: any)
    {
        if (this.reviewInfoList.length > 0)
        {
            for (let playerReviewInfo of this.reviewInfoList)
            {
                if (info.roleId == playerReviewInfo.roleId)
                {
                    if (info.action != PlayerState.WaitAction)
                    {
                        if (!playerReviewInfo.selfActionRecord)
                        {
                            playerReviewInfo.selfActionRecord = new Array<PlayerActionRecordInfo>();
                        }
                        playerReviewInfo.selfActionRecord.push(info);  //将用户自己的操作保存起来                        
                    }
                    break;
                }
            }
        }
    }
    /**
     * 设置手牌和自己的操作信息
    */
    public setSelfCardsInfo(info: any)
    {
        if (this.reviewInfoList.length > 0)
        {
            for (let playerReviewInfo of this.reviewInfoList)
            {
                if (info.roleId == playerReviewInfo.roleId)
                {
                    if (info.cards)  //将自己的手牌信息处理保存
                    {
                        let cards: Array<number> = new Array<number>();
                        try
                        {
                            cards = JSON.parse(info.cards);
                        }
                        catch (e)
                        {
                            game.Console.log(e);
                        }
                        if (cards)
                        {
                            playerReviewInfo.cardList = new Array<CardInfo>();
                            GamblingUtil.cardArr2CardInfoList(cards, playerReviewInfo.cardList);
                        }
                    }
                    break;
                }
            }
        }
    }
    /**
     * 设置是否亮牌
    */
    public setIsShowCard(info: any)
    {
        if (this.reviewInfoList.length > 0)
        {
            for (let playerReviewInfo of this.reviewInfoList)
            {
                if (info.roleId == playerReviewInfo.roleId)
                {
                    if (info.num1)
                    {
                        playerReviewInfo.isShowCard = true;
                    } else
                    {
                        playerReviewInfo.isShowCard = false;
                    }
                    break;
                }
            }
        }
    }
    /**
     * 设置输赢信息
    */
    public setResultInfo(playerReviewInfo: PlayerReviewInfo)
    {
        let isWinFlag: boolean = false;
        for (let info of playerReviewInfo.selfActionRecord)
        {
            if (info.action == PlayerState.PoolWon)
            {
                isWinFlag = true;
                if (playerReviewInfo.betNum)
                {
                    playerReviewInfo.betNum += info.num2;
                } else
                {
                    playerReviewInfo.betNum = info.num2;
                }
            }
        }
        let num: number = 0;
        for (let info of playerReviewInfo.selfActionRecord)
        {
            if (info.action == PlayerState.Blind || info.action == PlayerState.Raise || info.action == PlayerState.AllIn || info.action == PlayerState.Call)
            {
                num += info.num1;
            }
        }
        if (!isWinFlag)
        {
            playerReviewInfo.isWin = false;
            playerReviewInfo.betNum = num;
        } else
        {
            playerReviewInfo.betNum = playerReviewInfo.betNum - num;
            if (playerReviewInfo.betNum > 0)
            {
                playerReviewInfo.isWin = true;
            } else
            {
                playerReviewInfo.betNum = Math.abs(playerReviewInfo.betNum);
                playerReviewInfo.isWin = false;
            }
        }
    }
    /**
     * 设置牌型描述信息
    */
    public setCardsTypeDes(playerReviewInfo: PlayerReviewInfo)
    {
        let allCards: Array<CardInfo> = playerReviewInfo.cardList.concat(this.pubCardList);
        CardTypeMatchUtil.matchCardType(allCards);
        playerReviewInfo.cardTypeDes = CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
    }
    /**
     * 牌局是否进行到最后一步的比牌
    */
    public isCompare(): boolean
    {
        if (this.pubCardList && this.pubCardList.length == 5)
        {
            let index: number = this.reviewInfoList.length;
            for (let reviewInfo of this.reviewInfoList)
            {
                for (let actionInfo of reviewInfo.selfActionRecord)
                {
                    if (actionInfo.action == PlayerState.Fold || actionInfo.action == PlayerState.StandUp)
                    {
                        index--;
                        break;
                    }
                }
            }
            if (index > 1)
            {
                return true;
            } else
            {
                return false;
            }
        } else
        {
            return false;
        }
    }
    /**
     * 获取盲注
    */
    public getBlind(roleId: number): number
    {
        for (let reviewInfo of this.reviewInfoList)
        {
            if (reviewInfo.roleId == roleId)
            {
                for (let actionInfo of reviewInfo.selfActionRecord)
                {
                    if (actionInfo.action == PlayerState.Blind)
                    {
                        return actionInfo.num1;
                    }
                }
            }
        }
        return 0;
    }
    /**
     * 开始请求
     */
    private startReqRank()
    {
        this._index = 0;
        this.nextReq();
    }
    /**
     * 请求下一个
     */
    private nextReq()
    {
        if (this._index < this.reviewInfoList.length)
        {
            let info: any = this.reviewInfoList[this._index];
            UserManager.reqSimpleUserInfo(info.roleId);
        } else
        {
            this.onGetAllPlayerInfoEvent.dispatch();
            UserManager.OnGetSimpleUserInfoEvent.removeListener(this.onReqComplete, this);
        }
    }
    /**
     * 请求完成
     */
    private onReqComplete(data: any)
    {
        if (data)
        {
            for (let info of this.reviewInfoList)
            {
                if (info.roleId == data.roleId)
                {
                    info.copyValueFrom(data);
                    break;
                }
            }
        }
        this._index++;
        this.nextReq();
    }

    /**
     * 请求牌局上局回顾信息成功广播
    */
    public onReqReviewInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 所有用户信息请求完成广播
    */
    public onGetAllPlayerInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}
