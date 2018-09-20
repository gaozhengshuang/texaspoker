/**
 * 房间信息
 */
class RoomInfo extends BaseServerValueInfo implements IHaveDefintionInfo
{
	/**
	 * 房间号
	 */
    public id: number;
	/**
	 * 庄家位置
	 */
    public buttonPos: number;
	/**
	 * 底池筹码
	 */
    public potChips: Array<number>;

    private _roomId: number;
	/**
	 * 房间的配置ID
	 */
    public get roomId(): number 
    {
        return this._roomId;
    }
    public set roomId(value: number) 
    {
        this._roomId = value;
        this._definition = RoomDefined.GetInstance().getDefinition(value);
    }
	/**
 	* 房间定义
 	*/
    private _definition: RoomDefinition;
	/**
	 * 前注
	 */
    public ante: number;
	/**
	 * 小盲
	 */
    private _sBlind: number;
    public get sBlind(): number
    {
        if (this._sBlind == undefined || this._sBlind == 0 && this._definition) 
        {
            this._sBlind = this._definition.sBlind;
        }
        return this._sBlind;
    }
    public set sBlind(value: number)
    {
        this._sBlind = value;
    }

    private _bBlind: number;
	/**
	 * 大盲
	 */
    public get bBlind(): number 
    {
        if (this._bBlind == undefined || this._bBlind == 0 && this._definition) 
        {
            this._bBlind = this._definition.bBlind;
        }
        return this._bBlind;
    }
    public set bBlind(value: number) 
    {
        this._bBlind = value;
    }

	/**
	 * 1.常规 2.比赛 3.私人
	 */
    public get gamblingType(): number 
    {
        if (this._definition) 
        {
            return GamblingType.getType(this._definition.type);
        }
        return GamblingType.Common;
    }
	/**
	 * 操作(说话)位置
	 */
    public pos: number;
	/**
	 * 操作(说话)开始时间戳
	 */
    public posTime: number;
	/**
	 * 一局开始时间戳
	 */
    public startTime: number;
    /**
     * 一局结算时间戳
     */
    public endTime: number;
	/**
	 * 公共牌列表
	 */
    public publicCard: Array<CardInfo>;
	/**
	 * 玩家列表
	 */
    public playerList: Array<PlayerInfo>;
	/**
	 * 边池
	 */
    public sidePot: Array<number>;
	/**
	 * 结束时亮牌标记
	 */
    public isShowCard: boolean;
	/**
	 * 手牌列表
	 */
    public handCard: Array<CardInfo>;
	/**
	 * 是否自动买入
	 */
    public isAutoBuy: boolean;
    private _maxAnte: number;
	/**
	 * 当前圈注最大下注额度
	 */
    public get maxAnte(): number 
    {
        if (this._maxAnte == undefined) 
        {
            this._maxAnte = 0;
        }
        return this._maxAnte;
    }
    public set maxAnte(value: number) 
    {
        this._maxAnte = value;
    }
    private _minRaiseNum: number;
	/**
	 * 最小加注额度
	 */
    public get minRaiseNum(): number 
    {
        if (this._minRaiseNum == undefined || this._minRaiseNum <= 0) 
        {
            if (GamblingManager.isOneLoopStart) 
            {
                this._minRaiseNum = this.bBlind;
            }
            else 
            {
                this._minRaiseNum = this.bBlind * 2;
            }
        }
        if (this._minRaiseNum < this.bBlind) 
        {
            this._minRaiseNum = this.bBlind + this._minRaiseNum;
        }
        if (GamblingManager.self) 
        {
            return Math.min(GamblingManager.self.bankRoll + GamblingManager.self.num, this._minRaiseNum);
        }
        return this._minRaiseNum;
    }
	/**
	 * 当前最小加注额度
	 */
    public set minRaiseNum(value: number) 
    {
        this._minRaiseNum = value;
    }

    public get definition(): RoomDefinition 
    {
        return this._definition;
    }
	/**
	 * 房主roleId，私人房模式使用
	 */
    public masterId: number;
    /**
     * 是否在托管中
     */
    public isTrusteeship: boolean

    //--------锦标赛--------
    /**
     * 已经重购的次数
     */
    public rebuyTimes: number;
    /**
     * 已经增购的次数
     */
    public addonTimes: number;
    /**
     * 当前时间盲注等级
     */
    public blindLevel: number;
    /**
     * 当前局盲注等级(应小于或等于)blindLevel
     */
    public nowBlindLevel: number;
    /**
     * 下一次涨盲时间
     */
    public blindTime: number;
    /**
     * 重购/增购的筹码(暂时未加到自己的筹码里,下局在增加)
     */
    public addbuy: number;
    /**
     * 已经被淘汰(锦标赛用,锦标赛结算后房间会自动解散,这时请求退出房间会有错误请求,添加该标记退出房间时不需发送请求)
     */
    public isMatchOut: boolean;
    /**
     * 是否在旁观
     */
    public isOnWatch:boolean;
    /**
     * 发牌是否完毕
     */
    public isFlopCardOver: boolean;
    //--------锦标赛--------

    public reset()
    {
        this.id = 0;
        this.buttonPos = 0;
        this.potChips = undefined;
        this.roomId = 0;
        this.ante = 0;
        this.sBlind = 0;
        this.bBlind = 0;
        this.pos = 0;
        this.posTime = 0;
        this.startTime;
        this.publicCard = undefined;
        this.playerList = undefined;
        this.sidePot = undefined;
        this.isShowCard = undefined;
        this.handCard = undefined;
        this.isAutoBuy = undefined;
        this._definition = undefined;
        this.maxAnte = 0;
        this.minRaiseNum = 0;
        this.masterId = 0;
        this.rebuyTimes = 0;
        this.blindLevel = 0;
        this.nowBlindLevel = 0;
        this.blindTime = 0;
        this.addbuy = 0;
        this.isTrusteeship = undefined;
        this.isMatchOut = undefined;
        this.isFlopCardOver = undefined;
        this.isOnWatch = undefined;
    }
    public copyValueFrom(data: any) 
    {
        super.copyValueFrom(data);
        qin.CopyUtil.supCopyList<PlayerInfo>(this, data, "playerList", PlayerInfo);
        if (data["playerList"]) 
        {
            let playerInfo: PlayerInfo;
            for (let i: number = 0; i < data["playerList"].length; i++) 
            {
                playerInfo = data["playerList"][i];
                playerInfo.cardList = new Array<CardInfo>();
                GamblingUtil.cardArr2CardInfoList(playerInfo["card"], playerInfo.cardList);
                if (playerInfo.cardList.length == 0) 
                {
                    playerInfo.cardList = undefined;
                }
            }
        }
        // qin.CopyUtil.supCopyList<CardInfo>(this, data, "handCardList", CardInfo);
        // qin.CopyUtil.supCopyList<CardInfo>(this, data, "cardList", CardInfo);
    }
}

/**
 * 卡牌信息
 */
class CardInfo extends BaseServerValueInfo 
{
    public card: Array<number>;
    public constructor(array: Array<number>) 
    {
        super();
        this.card = array;
    }

	/**
	 * 克隆
	 */
    public clone(): CardInfo 
    {
        let cardInfo: CardInfo = new CardInfo(undefined);
        if (this.card) 
        {
            cardInfo.card = this.card.concat();
        }
        return cardInfo;
    }
    public reset() 
    {
        this.card = undefined;
    }
}