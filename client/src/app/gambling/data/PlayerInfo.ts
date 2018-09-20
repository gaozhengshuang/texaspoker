/**
 * 房间玩家信息
 */
class PlayerInfo extends BaseServerValueInfo implements IBaseHead
{
	/**
	 * 头像宽高
	 */
	public width: number = 100;
	public height: number = 100;
	/**
	 * 角色ID
	 */
	public roleId: number;
	private _bankRoll: number;
	/**
	 * 游戏时身上的筹码数
	 */
	public get bankRoll(): number
	{
		return this._bankRoll;
	}
	/**
	 * 游戏时身上的筹码数
	 */
	public set bankRoll(value: number)
	{
		this.lastBankRoll = this._bankRoll;
		this._bankRoll = value;
	}
	/**
	 * 上一次的筹码
	 */
	public lastBankRoll: number;
	/**
	 * 开局初始筹码数,开局时赋值,结算时请零,其他时候请勿赋值
	 */
	public initbankRoll: number;
	/**
	 * 位置
	 */
	public pos: number;
	private _state: PlayerState;
	/**
	 * 0.等待下一局 1.弃牌 2.过牌 3.加注 4.allin 5.跟注 6.盲注
	 */
	public get state(): PlayerState
	{
		return this._state;
	}
	public set state(value: PlayerState)
	{
		if (this._state != value)
		{
			this._state = value;
		}
	}
	/**
	 * 状态参数
	 */
	public num: number;
	/**
	 * 投入筹码的总数
	 */
	public totalnum:number;
	/**
	 * 玩家信息
	 */
	public userInfo: UserInfo;
	/**
	 * 是否是刚刚坐下
	 */
	public isSitDown: boolean;
	/**
	 * 手牌列表
	 */
	public cardList: Array<CardInfo>;

	public get sex(): Sex
	{
		if (this.userInfo)
		{
			return this.userInfo.sex;
		}
		return Sex.Unknown;
	}

	/**
	 * 获取头像
	 */
	public get head(): string
	{
		if (this.userInfo)
		{
			return this.userInfo.head;
		}
		return game.StringConstants.Empty;
	}

	public reset()
	{
		this.roleId = undefined;
		this.lastBankRoll = undefined;
		this.bankRoll = undefined;
		this.pos = undefined;
		this.state = PlayerState.WaitNext;
		this.isSitDown = false;
		this.initbankRoll = undefined;
	}
	/**
	 * 获取状态描述
	 */
	public static getStateDes(state: PlayerState): string
	{
		switch (state)
		{
			case PlayerState.AllIn:
				return "全下";
			case PlayerState.Fold:
				return "弃牌";
			case PlayerState.Check:
				return "过牌";
			case PlayerState.Raise:
				return "加注";
			case PlayerState.Call:
				return "跟注";
			case PlayerState.Action:
				return "思考中";
			case PlayerState.ShowCard:
				return "亮牌";
			case PlayerState.WaitNext:
				return "等待";
			default:
				return game.StringConstants.Empty;
		}
	}
	/**
	 * 获取状态背景资源
	 */
	public static getStateImgRes(state: PlayerState): string
	{
		switch (state)
		{
			case PlayerState.AllIn:
				return SheetSubName.AllInState;
			case PlayerState.Fold:
				return SheetSubName.FoldState;
			case PlayerState.Check:
				return SheetSubName.CheckState;
			case PlayerState.Raise:
				return SheetSubName.RaiseState;
			case PlayerState.Call:
				return SheetSubName.CallState;
			case PlayerState.Action:
			case PlayerState.ShowCard:
				return game.StringConstants.Empty;
		}
		return game.StringConstants.Empty;
	}
}