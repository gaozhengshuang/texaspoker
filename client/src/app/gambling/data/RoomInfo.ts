/**
 * 房间信息
 */
class RoomInfo extends BaseServerValueInfo implements IHaveDefintionInfo
{
    private _data: msg.IRS2C_RetEnterRoom;
    public get data(): msg.IRS2C_RetEnterRoom
    {
        return this._data;
    }
    public set data(value: msg.IRS2C_RetEnterRoom)
    {
        this._data = value;
        if (value)
        {
            this._definition = table.TexasRoomById[value.roomid];
        }
    }
	/**
	 * 房间号
	 */
    public get id(): number
    {
        return game.longToNumber(this.data.id);
    }
	/**
	 * 庄家位置
	 */
    public get buttonPos(): number
    {
        return this.data.buttonpos;
    }
	/**
	 * 底池筹码
	 */
    public get potChips(): number[]
    {
        return this.data.potchips;
    }
    public set potChips(value: number[])
    {
        this.data.potchips = value;
    }
    private _roomId: number;
	/**
	 * 房间的配置ID
	 */
    public get roomId(): number 
    {
        return this.data.roomid;
    }
    public set roomId(value: number) 
    {
        this.data.roomid = value;
    }
	/**
 	* 房间定义
 	*/
    private _definition: table.ITexasRoomDefine;
	/**
	 * 前注
	 */
    public get ante(): number
    {
        return this.data.ante;
    }
    public set ante(value: number)
    {
        this.data.ante = value;
    }
	/**
	 * 小盲
	 */
    public get sBlind(): number
    {
        if (this.data.sblind == undefined || this.data.sblind == 0 && this._definition) 
        {
            this.data.sblind = this._definition.SBlind;
        }
        return this.data.sblind;
    }
    public set sBlind(value: number)
    {
        this.data.sblind = value;
    }

	/**
	 * 大盲
	 */
    public get bBlind(): number 
    {
        if (this.data.bblind == undefined || this.data.bblind == 0 && this._definition) 
        {
            this.data.bblind = this._definition.BBlind;
        }
        return this.data.bblind;
    }
    public set bBlind(value: number) 
    {
        this.data.bblind = value;
    }

	/**
	 * 1.常规 2.比赛 3.私人
	 */
    public get gamblingType(): number 
    {
        if (this._definition) 
        {
            return GamblingType.getType(this._definition.Type);
        }
        return GamblingType.Common;
    }
	/**
	 * 操作(说话)位置
	 */
    public get pos(): number
    {
        return this.data.pos;
    }
    public set pos(value: number)
    {
        this.data.pos = value;
    }
	/**
	 * 操作(说话)开始时间戳
	 */
    public get posTime(): number
    {
        return this.data.postime;
    }
    public set posTime(value: number)
    {
        this.data.postime = value;
    }
	/**
	 * 一局开始时间戳
	 */
    public get startTime(): number
    {
        return this.data.starttime;
    }
    public set startTime(value: number)
    {
        this.data.starttime = value;
    }
    /**
     * 一局结算时间戳
     */
    public endTime: number;

	/**
	 * 公共牌列表
	 */
    public get publicCard(): Array<CardInfo>
    {
        return GamblingUtil.cardArr2CardInfoList(this.data.publiccard);
    }
    public set publicCard(value: Array<CardInfo>)
    {
        this.data.publiccard = GamblingUtil.cardInfoList2Arr(value);
    }
    private _playerList: PlayerInfo[];
	/**
	 * 玩家列表
	 */
    public get playerList(): Array<PlayerInfo>
    {
        if (!this._playerList)
        {
            this._playerList = [];
            for (let info of this.data.playerlist)
            {
                let pInfo = new PlayerInfo();
                pInfo.data = info;
                this._playerList.push(pInfo);
            }
        }
        return this._playerList;
    }
    public set playerList(value: PlayerInfo[])
    {
        this._playerList = value;
    }
	/**
	 * 结束时亮牌标记
	 */
    public get isShowCard(): boolean
    {
        return this.data.isshowcard;

    }
    public set isShowCard(value: boolean)
    {
        this.data.isshowcard = value;
    }
	/**
	 * 手牌列表
	 */
    public get handCard(): Array<CardInfo>
    {
        return GamblingUtil.cardArr2CardInfoList(this.data.handcard);
    }
    public set handCard(value: Array<CardInfo>)
    {
        this.data.handcard = GamblingUtil.cardInfoList2Arr(value);
    }
	/**
	 * 是否自动买入
	 */
    public isAutoBuy: boolean;
	/**
	 * 当前圈注最大下注额度
	 */
    public get maxAnte(): number 
    {
        if (this.data.maxante == undefined) 
        {
            this.data.maxante = 0;
        }
        return this.data.maxante;
    }
    public set maxAnte(value: number) 
    {
        this.data.maxante = value;
    }
	/**
	 * 最小加注额度
	 */
    public get minRaiseNum(): number 
    {
        if (this.data.minraisenum == undefined || this.data.minraisenum <= 0) 
        {
            if (GamblingManager.isOneLoopStart) 
            {
                this.data.minraisenum = this.bBlind;
            }
            else 
            {
                this.data.minraisenum = this.bBlind * 2;
            }
        }
        if (this.data.minraisenum < this.bBlind) 
        {
            this.data.minraisenum = this.bBlind + this.data.minraisenum;
        }
        if (GamblingManager.self) 
        {
            return Math.min(GamblingManager.self.bankRoll + GamblingManager.self.num, this.data.minraisenum);
        }
        return this.data.minraisenum;
    }
	/**
	 * 当前最小加注额度
	 */
    public set minRaiseNum(value: number) 
    {
        this.data.minraisenum = value;
    }

    public get definition(): table.ITexasRoomDefine 
    {
        return this._definition;
    }
	/**
	 * 房主roleId，私人房模式使用
	 */
    public get masterId(): number
    {
        return this.data.masterid;
    }
    /**
     * 是否在托管中
     */
    public isTrusteeship: boolean

    //--------锦标赛--------
    /**
     * 已经重购的次数
     */
    public get rebuyTimes(): number
    {
        return this.data.rebuytimes;
    }
    public set rebuyTimes(value: number)
    {
        this.data.rebuytimes = value;
    }
    /**
     * 已经增购的次数
     */
    public get addonTimes(): number
    {
        return this.data.addontimes;
    }
    public set addonTimes(value: number)
    {
        this.data.addontimes = value;
    }
    /**
     * 当前时间盲注等级
     */
    public get blindLevel(): number
    {
        return this.data.blindlevel;
    }

    public set blindLevel(value: number)
    {
        this.data.blindlevel = value;
    }

    /**
     * 当前局盲注等级(应小于或等于)blindLevel
     */
    public nowBlindLevel: number;
    /**
     * 下一次涨盲时间
     */
    public get blindTime(): number
    {
        return this.data.blindtime;
    }
    public set blindTime(value: number)
    {
        this.data.blindtime = value;
    }
    /**
     * 重购/增购的筹码(暂时未加到自己的筹码里,下局在增加)
     */
    public get addbuy(): number
    {
        return this.data.addbuy;
    }
    public set addbuy(value: number)
    {
        this.data.addbuy = value;
    }
    /**
     * 已经被淘汰(锦标赛用,锦标赛结算后房间会自动解散,这时请求退出房间会有错误请求,添加该标记退出房间时不需发送请求)
     */
    public isMatchOut: boolean;
    /**
     * 是否在旁观
     */
    public isOnWatch: boolean;
    /**
     * 发牌是否完毕
     */
    public isFlopCardOver: boolean;
    //--------锦标赛--------

    public reset()
    {
        this.isAutoBuy = undefined;
        this.isTrusteeship = undefined;
        this.isMatchOut = undefined;
        this.isFlopCardOver = undefined;
        this.isOnWatch = undefined;

        this.data = undefined;
    }
    public copyValueFrom(data: any) 
    {
        super.copyValueFrom(data);
        game.CopyUtil.supCopyList<PlayerInfo>(this, data, "playerList", PlayerInfo);
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
        // game.CopyUtil.supCopyList<CardInfo>(this, data, "handCardList", CardInfo);
        // game.CopyUtil.supCopyList<CardInfo>(this, data, "cardList", CardInfo);
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