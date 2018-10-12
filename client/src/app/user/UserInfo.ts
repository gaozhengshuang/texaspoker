/**
 * 用户信息
 */
class UserInfo extends BaseServerValueInfo implements IBaseHead
{
	public copyValueFrom(data: any)
	{
		if (data)
		{
			for (let key in data)
			{
				let property: any = this[key];
				if (!(property instanceof Function)) //函数属性不拷贝
				{
					if (data[key] == undefined)
					{
						if (typeof this[key] == "number")
						{
							this[key] = 0;
						}
						else if (typeof this[key] == "string")
						{
							this[key] = game.StringConstants.Empty;
						}
					}
					else
					{
						this[key] = data[key];
					}
				}
			}
		}
		if (data && data["maxHand"])
		{
			this.maxHandList = new Array<CardInfo>();
			GamblingUtil.cardArr2CardInfoList(data["maxHand"], this.maxHandList);
			CardTypeMatchUtil.matchCardType(this.maxHandList);
			this.maxHandName = CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
		}
	}
	/**
	 * 适配服务器序列化不能大写的问题
	 */
	public copyValueFromIgnoreCase(data: any)
	{
		if (data)
		{
			let self: any = this;
			for (let key in self)
			{
				let lowerKey = key.toLowerCase();
				let property: any = this[key];
				if (data.hasOwnProperty(lowerKey) && !(property instanceof Function)) //函数属性不拷贝
				{
					if (data[lowerKey] == undefined)
					{
						if (typeof self[key] === "number")
						{
							self[key] = 0;
						}
						else if (typeof self[key] === "string")
						{
							self[key] = game.StringConstants.Empty;
						}
					}
					else
					{
						self[key] = data[lowerKey];
					}
				}
			}
		}
		if (data && data.maxhand)
		{
			this.maxHandList = new Array<CardInfo>();
			GamblingUtil.cardArr2CardInfoList(data.maxhand, this.maxHandList);
			CardTypeMatchUtil.matchCardType(this.maxHandList);
			this.maxHandName = CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
		}
	}
	public reset()
	{
		this._diamond = 0;
		this._gold = 0;
		this._saveGold = 0;
		this.timestamp = 0;
		this.timezone = 0;
		this.roleId = 0;
		this.name = game.StringConstants.Empty;
		this.head = null;
		this.sex = 0;
		this.level = 0;
		this.exp = 0;
		this.ip = game.StringConstants.Empty;
		this.sign = game.StringConstants.Empty;
		this.age = 0;
		this.lastGoldTime = Math.round(TimeManager.Utc1970.getTime() / 1000);
		//概况
		this.createdTime = Math.round(TimeManager.Utc1970.getTime() / 1000);
		this.maxGold = 0;
		this.maxGoldOnetimes = 0;
		this._friendNum = 0;
		this.gameTimes = 0;
		this.winTimes = 0;
		this.entryTimes = 0;
		this.showdownTimes = 0;
		this.maxHandList = undefined;
		this.maxHandName = game.StringConstants.Empty;

		this.mttJoinTimes = 0;
		this.mttPrizeTimes = 0;
		this.gameTimes2 = 0;
		this.winTimes2 = 0;
		this.entryTimes2 = 0;
		this.showdownTimes2 = 0;
		this.championTimes = 0;
		//收货信息
		this.addressName = game.StringConstants.Empty;
		this.phoneNum = game.StringConstants.Empty;
		this.qqNum = game.StringConstants.Empty;
		this.eMail = game.StringConstants.Empty;
		this.address = game.StringConstants.Empty;
		//Vip信息
		this.vipType = 0;
		// this.vipLevel = 0;
		this.vipExp = 0;
		this.vipSpeed = 0;
		this.vipTime = 0;
		this.yearVipTime = 0;
		//成就和任务信息
		this.allAchieveList = null;
		//状态
		this.isOffline = undefined;
		this.stateId = 0;
		this.stateConfId = 0;
		this._isHeadVerify = false;
		//
		this.mno = undefined;
		//
		this.FuncList = undefined;
		//邀请
		this.bindRoleId = 0;
		this.shareId = undefined;
		this.yuanbao = 0;
		this.silvercardtime = 0;
		this.goldcardtime = 0;
	}
	/**
	 * 登录时间
	 */
	public tmlogin: number;
	/**
	 * 金豆
	 */
	public yuanbao: number;
	/**
	 * 钻石数量
	 */
	private _diamond: number;
	public set diamond(value: number)
	{
		this._diamond = value;
	}
	public get diamond(): number
	{
		return this._diamond;
	}
	/**
	 * 金币数量
	 */
	private _gold: number;
	public set gold(value: number)
	{
		this._gold = value;
	}
	public get gold(): number
	{
		return this._gold;
	}
	/**
	 * 保险箱金币数量
	 */
	private _saveGold: number;
	public set safeGold(value: number)
	{
		this._saveGold = value;
	}
	public get safeGold(): number
	{
		return this._saveGold;
	}
	/**
	 *保险箱是否设置过密码 
	*/
	public isSafePwd: boolean;
	/**
	 * 服务器时间戳
	 */
	public timestamp: number;
	/**
	 * 时区
	 */
	public timezone: number;
	/**
	 * 角色ID
	 */
	public roleId: number;
	/**
	 * 昵称
	 */
	public name: string;
	/**
	 * 头像
	 */
	private _head: string;
	/**
	 * 审核中的头像
	 */
	private _verifyHead: string;

	/**
	 * 账号
	 */
	public account: string;

	public get verifyHead(): string
	{
		return this._verifyHead;
	}
	public set head(value: string)
	{
		this._isHeadUnPass = false;
		this._isHeadVerify = false;
		if (game.StringUtil.isNullOrEmpty(value) == false)
		{
			this._isHeadVerify = value.indexOf(GameSetting.HeadUploadVerifySign) != -1;
			this._isHeadUnPass = value.indexOf(GameSetting.HeadUploadUnPassSign) != -1;
			if (this._isHeadVerify)
			{
				let heads: string[] = value.split(GameSetting.HeadUploadVerifySign);
				value = heads[0];
				this._verifyHead = heads[1];
			}
		}
		this._head = value;
	}
	public get head(): string
	{
		if (game.StringUtil.isNullOrEmpty(this._head))
		{
			return SheetSubName.getdefaultHead(this.sex);
		}
		else
		{
			return this._head;
		}
	}
	private _isHeadVerify: boolean;
	/**
	 * 获取头像审核状态
	 */
	public get isHeadVerify(): boolean
	{
		return this._isHeadVerify;
	}

	private _isHeadUnPass: boolean;
	/**
	 * 头像上传审核未通过
	 */
	public get isHeadUnPass(): boolean
	{
		return this._isHeadUnPass;
	}
	/**
	 * 性别
	 */
	public sex: Sex;
	/**
	 * 等级
	 */
	public level: number;
	/**
	 * 总经验值
	 */
	public exp: number;
	/**
	 * ip
	 */
	public ip: string;
	/**
	 * 个性签名
	 */
	public sign: string;
	/**
	 * 年龄
	 */
	public age: number;

	//用户概况

	/**
	 * 加入游戏时间
	 */
	public createdTime: number;
	/**
	 * 最高拥有金币
	 */
	public maxGold: number;
	/**
	 * 一把最高赢取金币
	 */
	public maxGoldOnetimes: number;
	/**
	 * 朋友数量
	 */
	private _friendNum: number;
	public get friendNum(): number
	{
		if (this.roleId == UserManager.userInfo.roleId && FriendManager.friendList)
		{
			return FriendManager.friendList.length;
		}
		else
		{
			return this._friendNum;
		}
	}
	public set friendNum(value: number)
	{
		this._friendNum = value;
	}
	/**
	 * 游戏局数
	 */
	public gameTimes: number;
	/**
	 * 胜利次数
	 */
	public winTimes: number;
	/**
	 * 入局次数
	 */
	public entryTimes: number;
	/**
	 * 摊牌次数
	 */
	public showdownTimes: number;
	/**
	 * 最大手牌
	 */
	public maxHandList: Array<CardInfo>;
	public maxHandName: string;
	/**
	 * 参赛次数
	 */
	public mttJoinTimes: number;
	/**
	 * 比赛进入奖励圈次数
	 */
	public mttPrizeTimes: number;
	/**
	 * 比赛总局数
	 */
	public gameTimes2: number;
	/**
	 * 比赛胜利总局数
	 */
	public winTimes2: number;
	/**
	 * 比赛入局次数
	 */
	public entryTimes2: number;
	/**
	 * 比赛摊牌次数
	 */
	public showdownTimes2: number;
	/**
	 * 夺冠次数
	 */
	public championTimes: number;

	//收货信息
	/**
	 * 收货姓名
	 */
	public addressName: string;
	/**
	 * 收货手机
	 */
	public phoneNum: string;
	/**
	 * 收货qq
	 */
	public qqNum: string;
	/**
	 * 收货邮箱
	 */
	public eMail: string;
	/**
	 * 收货地址
	 */
	public address: string;

	//Vip信息
	/**
	 * 会员类型
	 */
	public vipType: VipType;
	/**
	 * 会员等级
	 */
	public get vipLevel(): number
	{
		if (VipManager.isVip(this))
		{
			return VipDefined.GetInstance().getVipLevel(this.vipExp);
		}
		return 0;
	}
	/**
	 * 会员成长值
	 */
	public vipExp: number;
	/**
	 * 成长速度
	 */
	public vipSpeed: number;
	/**
	 * 普通vip到期时间戳
	 */
	public vipTime: number;
	/**
	 * 年度vip到期时间戳
	 */
	public yearVipTime: number;

	//成就和任务信息
	public allAchieveList: Array<AchievementInfo>;
	/**
	 * 开服时间
	 */
	public openServerTime: number;

	private _lastGoldTime: number;
	/**
	 * 上次领取金币时间戳
	 */
	public set lastGoldTime(value: number)
	{
		this._lastGoldTime = value;
	}
	public get lastGoldTime(): number
	{
		return this._lastGoldTime;
	}
	/**
 	* 头像宽高
 	*/
	public width: number = 100;
	public height: number = 100;
	/**
	 * 是否离线
	 */
	public isOffline: boolean;
	/**
	 * 房间号
	 */
	public stateId: number;
	/**
	 * 房间id
	 */
	public stateConfId: number;
	/**
	 * 用于保险箱找回密码绑定的手机号
	 */
	public mno: string;
	/**
	 * 用户状态
	 */
	public get userState(): UserState
	{
		return UserManager.getUserState(this);
	}
	/**
	 * 引导记录列表
	 */
	public FuncList: Array<GuideInfo>;
	/**
	 * 添加引导记录
	 */
	public addGuideRecord(id: number, type: GuideType)
	{
		if (!this.FuncList)
		{
			this.FuncList = new Array<GuideInfo>();
		}
		let guidInfo: GuideInfo = this.getGuideInfo(type);
		if (!guidInfo)
		{
			guidInfo = new GuideInfo();
		}
		guidInfo.Id = id;
		guidInfo.Type = type;
		this.FuncList.push(guidInfo);
	}
	/**
	 * 获取引导记录
	 */
	public getGuideInfo(type: GuideType): GuideInfo
	{
		let info: GuideInfo;
		if (this.FuncList)
		{
			for (let i: number = 0; i < this.FuncList.length; i++)
			{
				info = this.FuncList[i];
				if (info.Type == type)
				{
					return info;
				}
			}
		}
		return info;
	}
	/**
	 * 邀请码
	*/
	public shareId: string;
	/**
	 * 绑定的邀请码的角色id
	*/
	public bindRoleId: number;
	/**
	 * 白银月卡
	 */
	public silvercardtime: number;
	/**
	 * 黄金月卡
	 */
	public goldcardtime: number;
}
