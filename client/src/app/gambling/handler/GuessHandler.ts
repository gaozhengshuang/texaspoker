/**
 * 手牌竞猜管理器
*/
class GuessHandler
{
    /**
     * 投注手牌信息数组
    */
    public guessOddsList: Array<GuessOddsInfo>;
    /**
     * 下注的总注数
    */
    public totalAnte: number;
    /**
     * 本周榜单信息数组
    */
    public weekGuessRankList: Array<WeekGuessRankInfo>
    /**
     * 开奖信息列表
    */
    public resultList: Array<GuessResultInfo>;
    /**
     * 购买记录列表
    */
    public recordList: Array<GuessRecordInfo>;
    /**
     * 购买一局按钮状态
    */
    public buyOnceRBSel: boolean;
    /**
     * 购买的竞猜信息
    */
    public buyGuessAnteInfo: Array<BuyGuessAnteInfoBase>;
    /**
     * 购买的局数信息
    */
    public buyInning: number;
    /**
     * 是否购买了竞猜
    */
    public isBuyGuess: boolean;

    /**
     * 重置数据
    */
    public reset()
    {
        this.totalAnte = 0;
        game.ArrayUtil.Clear(this.guessOddsList);
    }
    /**
     * 离开房间重置数据
    */
    public leaveRoomReset()
    {
        this.totalAnte = 0;
        GamblingManager.guessHandler.buyInning = undefined;
        game.ArrayUtil.Clear(this.resultList);
        game.ArrayUtil.Clear(this.buyGuessAnteInfo);
        this.onDisable();
    }
    public onEnable()
    {
        UserManager.propertyChangeEvent.addListener(this.goldChange, this);
    }
    public onDisable()
    {
        UserManager.propertyChangeEvent.removeListener(this.goldChange, this);
    }
    /**
    * 下一局开始重置购买一次按钮状态
   */
    public resetBuyRB()
    {
        this.buyOnceRBSel = false;
        if (this.buyInning == 1)
        {
            GamblingManager.guessHandler.buyInning = undefined;
        }
        this.onResetBuyOnceStateEvent.dispatch();
    }
    /**
     * 设置购买的竞猜信息
    */
    public setBuyGuessAnteInfo(id: number, ante: number)
    {
        if (!this.buyGuessAnteInfo)
        {
            this.buyGuessAnteInfo = new Array<BuyGuessAnteInfoBase>();
        }
        if (this.buyGuessAnteInfo.length > 0)
        {
            let flag: boolean = true;
            for (let i: number = 0; i < this.buyGuessAnteInfo.length; i++)
            {
                let info: BuyGuessAnteInfoBase = this.buyGuessAnteInfo[i];
                if (info.id == id)
                {
                    if (ante == 0)
                    {
                        this.buyGuessAnteInfo.splice(i, 1);
                        return;
                    } else
                    {
                        info.num = ante;
                    }
                    flag = false;
                }
            }
            if (flag)
            {
                this.setNewGuessAnteInfo(id, ante);
            }
        } else
        {
            this.setNewGuessAnteInfo(id, ante);
        }
    }
    /**
     * 写入新的竞猜注数信息
    */
    private setNewGuessAnteInfo(id: number, ante: number)
    {
        let def: HoleCardsDefinition = HoleCardsDefined.GetInstance().getDefinition(id);
        if (def)
        {
            let buyAnteInfo: BuyGuessAnteInfoBase = new BuyGuessAnteInfoBase();
            buyAnteInfo.id = id;
            buyAnteInfo.handType = def.type;
            buyAnteInfo.num = ante;
            this.buyGuessAnteInfo.push(buyAnteInfo);
        }
    }
    /**
     * 写入开奖信息数据
    */
    public setResultListInfo()
    {
        if (!GamblingUtil.isMatch && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.handCard)
        {
            let guessResultInfo: GuessResultInfo = new GuessResultInfo();
            guessResultInfo.time = TimeManager.GetServerUtcSecondstamp();
            guessResultInfo.card1 = GamblingManager.roomInfo.handCard[0];
            guessResultInfo.card2 = GamblingManager.roomInfo.handCard[1];
            //中奖注数        
            if (this.isBuyGuess)
            {
                //判断是否中奖了
                let num: number = this.guessCorrectlyAnte(guessResultInfo.card1, guessResultInfo.card2);
                if (num)
                {
                    guessResultInfo.ante = num;
                    this.onGuessCorrectlyEvent.dispatch();
                } else
                {
                    guessResultInfo.ante = 0;
                }
                if (this.buyInning == undefined)
                {
                    this.isBuyGuess = false;
                }
            } else
            {
                guessResultInfo.ante = 0;
            }
            if (!this.resultList)
            {
                this.resultList = new Array<GuessResultInfo>();
            }
            if (this.resultList.length >= 10)
            {
                this.resultList.shift();
            }
            this.resultList.push(guessResultInfo);
        }
    }
    /**
     * 中奖注数
    */
    public guessCorrectlyAnte(card1: CardInfo, card2: CardInfo): number
    {
        if (this.buyGuessAnteInfo)
        {
            let ante: number = 0;
            for (let guessInfo of this.buyGuessAnteInfo)
            {
                switch (guessInfo.handType)
                {
                    case GuessType.NoAOrK:    //无A和K
                        if (card1.card[1] != 1 && card1.card[1] != 13 && card2.card[1] != 1 && card2.card[1] != 13)
                        {
                            ante += guessInfo.num;
                        }
                        break;
                    case GuessType.Flush:  //为同花
                        if (card1.card[0] == card2.card[0])
                        {
                            ante += guessInfo.num;
                        }
                        break;
                    case GuessType.HasAOrK:  //含A或K
                        if (card1.card[1] == 1 || card1.card[1] == 13 || card2.card[1] == 1 || card2.card[1] == 13)
                        {
                            ante += guessInfo.num;
                        }
                        break;
                    case GuessType.HasA:  //含A
                        if (card1.card[1] == 1 || card2.card[1] == 1)
                        {
                            ante += guessInfo.num;
                        }
                        break;
                    case GuessType.OnePair:  //为对子
                        if (card1.card[1] == card2.card[1])
                        {
                            ante += guessInfo.num;
                        }
                        break;
                    case GuessType.HasAA:  //为AA
                        if (card1.card[1] == 1 && card2.card[1] == 1)
                        {
                            ante += guessInfo.num;
                        }
                        break;
                }
            }
            return ante;
        }
        return null;
    }
    /**
     * 获得投注的手牌类型以及赔率的数据
    */
    public getGuessOddsInfo()
    {
        this.reset();
        if (!this.guessOddsList)
        {
            this.guessOddsList = new Array<GuessOddsInfo>();
        }
        if (HoleCardsDefined.GetInstance().dataList)
        {
            for (let def of HoleCardsDefined.GetInstance().dataList)
            {
                let guessOddsInfo: GuessOddsInfo = new GuessOddsInfo();
                guessOddsInfo.id = def.Id;
                this.guessOddsList.push(guessOddsInfo);
            }
        }
    }
    /**
     * 发送购买竞猜注数请求
    */
    public reqBuyGuessAnte(type: number = 0, anteList?: Array<BuyGuessAnteInfo>)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {

        };
        if (type == 0)
        {
            SocketManager.call(Command.GuessBuy_Req_3622, null, callback, null, this);
        } else
        {
            SocketManager.call(Command.GuessBuy_Req_3622, { type: type, anteList: anteList }, callback, null, this);
        }
    }
    /**
     * 发送获取本周榜单请求
    */
    public reqGetWeekInfo()
    {
        SocketManager.call(Command.GuessCrunchies_Req_3623, null, this.getWeekInfoResponse, null, this);
    }
    public getWeekInfoResponse(result: game.SpRpcResult)
    {
        if (result.data && result.data.Array)
        {
            this.weekGuessRankList = result.data.Array;
            this.onWeekInfoEvent.dispatch();
        }
    }
    /**
     * 发送获取购买记录请求
    */
    public reqGetBuyRecordInfo()
    {
        SocketManager.call(Command.GuessRecord_Req_3624, null, this.getBuyRecordInfoResponse, null, this);
    }
    public getBuyRecordInfoResponse(result: game.SpRpcResult)
    {
        if (result.data && result.data.Array)
        {
            if (!this.recordList)
            {
                this.recordList = new Array<GuessRecordInfo>();
            }
            game.ArrayUtil.Clear(this.recordList);
            for (let dataInfo of result.data.Array)
            {
                let recordInfo: GuessRecordInfo = new GuessRecordInfo();
                let cardList: Array<CardInfo> = new Array<CardInfo>();
                let numList: Array<number> = new Array<number>();
                numList = JSON.parse(dataInfo.cards);
                recordInfo.type = dataInfo.type;
                recordInfo.ante = dataInfo.ante;
                recordInfo.gold = dataInfo.gold;
                recordInfo.time = dataInfo.time;
                GamblingUtil.cardArr2CardInfoList(numList, cardList);
                recordInfo.card1 = cardList[0];
                recordInfo.card2 = cardList[1];
                this.recordList.push(recordInfo);
            }
            for (let recordInfo of this.recordList)
            {
                let def: HoleCardsDefinition = new HoleCardsDefinition();
                def = HoleCardsDefined.GetInstance().getHoleCardsInfoByType(recordInfo.type);
                recordInfo.record = def.des;
            }
            this.onGetBuyRecordInfoEvent.dispatch();
        }
    }
    /**
     * 外部金币小于买入竞猜筹码
    */
    public goldChange()
    {
        if (GamblingManager.roomInfo)
        {
            let guessGold: number = GamblingManager.guessHandler.totalAnte * GamblingManager.roomInfo.bBlind;
            if (guessGold && UserManager.userInfo.gold < guessGold)
            {
                GamblingManager.guessHandler.buyInning = undefined;
                GamblingManager.guessHandler.isBuyGuess = false;
            }
        }
    }

    /**
     * 获取投注的手牌类型以及赔率的数据成功的广播
    */
    public onGetGuessOddsInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 投注注数更改广播
    */
    public onChangeTotalAnteEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 获取本周榜单信息成功广播
    */
    public onWeekInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 获取购买记录信息成功广播
    */
    public onGetBuyRecordInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 竞猜中奖广播
    */
    public onGuessCorrectlyEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 下一局开始重置购买一次按钮状态广播
    */
    public onResetBuyOnceStateEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}
/**
 * 投注手牌信息
*/
class GuessOddsInfo implements IHaveDefintionInfo
{
    private _id: number;
    public get id(): number
    {
        return this._id;
    }
    public set id(value: number)
    {
        this._id = value;
        this._definition = HoleCardsDefined.GetInstance().getDefinition(value);
    }
    private _definition: HoleCardsDefinition
    public get definition(): HoleCardsDefinition
    {
        return this._definition;
    }
}
class BuyGuessAnteInfo
{
    /**
     * 手牌类型
    */
    public handType: number;
    /**
     * 购买的注数
    */
    public num: number;
}
/**
 * 竞猜购买的注数信息
*/
class BuyGuessAnteInfoBase extends BuyGuessAnteInfo
{
    /**
     * id
    */
    public id: number;
}
/**
 * 本周榜单信息
*/
class WeekGuessRankInfo
{
    /**
     * 排名
    */
    public rank: number;
    /**
     * 玩家名字
    */
    public name: string;
    /**
     * 中奖注数
    */
    public ante: number;
    /**
     * 中奖金币
    */
    public gold: number;
}
/**
 * 开奖信息
*/
class GuessResultInfo
{
    /**
     * 时间
    */
    public time: number;
    /**
     * 手牌1
    */
    public card1: CardInfo;
    /**
     * 手牌2
    */
    public card2: CardInfo;
    /**
     * 注数
    */
    public ante: number;
}
class GuessRecordInfo extends GuessResultInfo
{
    /**
     * 购买的类型
    */
    public type: number;
    /**
     * 购买的记录
    */
    public record: string;
    /**
     * 中奖金额
    */
    public gold: number;
}
/**
 * 竞猜类型
*/
enum GuessType
{
    /**
     * 无A无K
    */
    NoAOrK = 2,
    /**
	 * 同花
	 */
    Flush = 3,
    /**
     * 含A或K
    */
    HasAOrK = 4,
    /**
     * 含A
    */
    HasA = 5,
    /**
	 * 一对
	 */
    OnePair = 6,
    /**
     * 为AA
    */
    HasAA = 7,
}