/**
 * 为牌局创建spt
 */
class GamblingSupportCreater
{
	private _context: GamblingPanel;
	public constructor(context: GamblingPanel)
	{
		this._context = context;
	}
	//==========================常规==============================
	//坑位数据
	private _pitDataSupport: GamblingPanelPitDataSupport;
	public get pitDataSupport(): GamblingPanelPitDataSupport
	{
		return this._pitDataSupport;
	}
	//牌局移动
	private _moveSpt: GamblingPanelMoveSupport;
	public get moveSpt(): GamblingPanelMoveSupport
	{
		return this._moveSpt;
	}
	//按钮位置
	private _buttonPosSpt: GamblingPanelButtonPosSupport;
	public get buttonPosSpt(): GamblingPanelButtonPosSupport
	{
		return this._buttonPosSpt;
	}
	//各种行为操作
	private _actionSpt: GamblingPanelActionSupport;
	public get actionSpt(): GamblingPanelActionSupport
	{
		return this._actionSpt;
	}
	//发牌
	private _flopCardSpt: GamblingPanelFlopCardSupport;
	public get flopCardSpt(): GamblingPanelFlopCardSupport
	{
		return this._flopCardSpt;
	}
	//牌局信息刷新
	private _infoRefreshSpt: GamblingPanelInfoRefreshSupport;
	public get infoRefreshSpt(): GamblingPanelInfoRefreshSupport
	{
		return this._infoRefreshSpt;
	}
	//一轮圈注结束
	private _oneLoopOverSpt: GamblingPanelOneLoopOverSupport;
	public get oneLoopOverSpt(): GamblingPanelOneLoopOverSupport
	{
		return this._oneLoopOverSpt;
	}
	//坑位转动
	private _pitTurnSpt: GamblingPanelPitTurnSupport;
	public get pitTurnSpt(): GamblingPanelPitTurnSupport
	{
		return this._pitTurnSpt;
	}
	//坐下站起
	private _sitDownAndAddCoin: GamblingPanelSitDownAndAddCoinSupport;
	public get sitDownAndAddCoin(): GamblingPanelSitDownAndAddCoinSupport
	{
		return this._sitDownAndAddCoin;
	}
	//功能按钮点击
	private _funcSupport: GamblingPanelFuncSupport;
	public get funcSupport(): GamblingPanelFuncSupport
	{
		return this._funcSupport
	}
	//一局结束结算
	private _roundOverSpt: GamblingPanelRoundOverSupport;
	public get roundOverSpt(): GamblingPanelRoundOverSupport
	{
		return this._roundOverSpt;
	}

	//==========================锦标赛等待==============================
	private _championshipWaitSpt: ChampionshipWaitSupport;
	public get championshipWaitSpt(): ChampionshipWaitSupport
	{
		return this._championshipWaitSpt;
	}

	//==========================锦标赛==============================
	private _championshipSupport: GamblingPanelMatchSupport;
	public get championshipSupport(): GamblingPanelMatchSupport
	{
		return this._championshipSupport;
	}

	//==========================引导玩法==============================
	private _guidePlayWaySupport: GamblingPanelGuidePlayWaySupport;
	public get guidePlayWaySupport(): GamblingPanelGuidePlayWaySupport
	{
		return this._guidePlayWaySupport;
	}
	//==========================引导训练营==============================
	private _guideSpt: GamblingPanelGuideSupport;
	public get guideSpt(): GamblingPanelGuideSupport
	{
		return this._guideSpt;
	}

	//==========================spt集合=========================
	private _supportNomalList: Array<BaseGamblingPanelSupport>;
	public get supportNormalList(): Array<BaseGamblingPanelSupport>
	{
		return this._supportNomalList;
	}
	private _supportGuideList: Array<BaseGamblingPanelSupport>;
	public get supportGuideList(): Array<BaseGamblingPanelSupport>
	{
		return this._supportGuideList;
	}
	private _supportGuidePlayWayList: Array<BaseGamblingPanelSupport>;
	public get supportGuidePlayWayList(): Array<BaseGamblingPanelSupport>
	{
		return this._supportGuidePlayWayList;
	}
	private _supportMatchWaitList: Array<BaseGamblingPanelSupport>;
	public get supportMatchWaitList(): Array<BaseGamblingPanelSupport>
	{
		return this._supportMatchWaitList;
	}
	private _supportMatchList: Array<BaseGamblingPanelSupport>;
	public get supportMatchList(): Array<BaseGamblingPanelSupport>
	{
		return this._supportMatchList;
	}

	private _supportSngWaitList: Array<BaseGamblingPanelSupport>;
	public get supportSngWaitList(): Array<BaseGamblingPanelSupport>
	{
		return this._supportSngWaitList;
	}
	private _supportSngList: Array<BaseGamblingPanelSupport>;
	public get supportSngList(): Array<BaseGamblingPanelSupport>
	{
		return this._supportSngList;
	}
	private _supportOmahaList: Array<BaseGamblingPanelSupport>;
	public get supportOmahaList(): Array<BaseGamblingPanelSupport>
	{
		return this._supportOmahaList;
	}

	public createNormal()
	{
		if (!this._supportNomalList)
		{
			this.createMoveFunc();
			this._pitDataSupport = new GamblingPanelPitDataSupport(this._context);
			this._buttonPosSpt = new GamblingPanelButtonPosSupport(this._context);
			this._actionSpt = new GamblingPanelActionSupport(this._context);
			this._flopCardSpt = new GamblingPanelFlopCardSupport(this._context);
			this._infoRefreshSpt = new GamblingPanelInfoRefreshSupport(this._context);
			this._oneLoopOverSpt = new GamblingPanelOneLoopOverSupport(this._context);
			this._pitTurnSpt = new GamblingPanelPitTurnSupport(this._context);
			this._sitDownAndAddCoin = new GamblingPanelSitDownAndAddCoinSupport(this._context);
			this._roundOverSpt = new GamblingPanelRoundOverSupport(this._context);

			this._oneLoopOverSpt.onLoopOverCallback = qin.Delegate.getOut(this._roundOverSpt.startRunRoundOverOper, this._roundOverSpt);
			this._oneLoopOverSpt.onBoardCardApearComplete = qin.Delegate.getOut(this._actionSpt.setBoardCardOverFlag, this._actionSpt);

			this._supportNomalList = new Array<BaseGamblingPanelSupport>();

			this._supportNomalList.push(this._actionSpt, this._flopCardSpt, this._infoRefreshSpt,
				this._moveSpt, this._oneLoopOverSpt, this._pitTurnSpt, this._pitDataSupport, this._sitDownAndAddCoin,
				this._funcSupport, this._buttonPosSpt, this._roundOverSpt);
		}
	}

	public createMttWait()
	{
		if (!this._supportMatchWaitList)
		{
			this._supportMatchWaitList = new Array<BaseGamblingPanelSupport>();
			this.createMoveFunc();

			this._championshipWaitSpt = new ChampionshipWaitSupport(this._context);
			this._supportMatchWaitList.push(this._moveSpt, this._funcSupport, this._championshipWaitSpt);
		}
	}
	private createMoveFunc()
	{
		if (!this._moveSpt)
		{
			this._moveSpt = new GamblingPanelMoveSupport(this._context);
			this._funcSupport = new GamblingPanelFuncSupport(this._context);
		}
	}
	public createMtt()
	{
		if (!this._supportMatchList)
		{
			this.createNormal();
			this._supportMatchList = this._supportNomalList.concat();


			this._championshipSupport = new GamblingPanelMatchSupport(this._context);
			this._supportMatchList.push(this._championshipSupport);
		}
	}
	/**
	 * 奥马哈
	 */
	public createOmaha()
	{
		if (!this._supportOmahaList)
		{
			this.createNormal();
			this._supportOmahaList = this._supportNomalList.concat();
		}
	}
	public createGuide()
	{
		if (!this._supportGuideList)
		{
			this._supportGuideList = new Array<BaseGamblingPanelSupport>();

			this.createNormal();

			this._guideSpt = new GamblingPanelGuideSupport(this._context);
			this._supportGuideList.push(this._actionSpt, this._flopCardSpt, this._infoRefreshSpt,
				this._oneLoopOverSpt, this._pitTurnSpt, this._pitDataSupport, this._buttonPosSpt, this._roundOverSpt, this._guideSpt);
		}
	}
	public createGuidePlayWay()
	{
		if (!this._supportGuidePlayWayList)
		{
			this._supportGuidePlayWayList = new Array<BaseGamblingPanelSupport>();

			this.createNormal();
			this._guidePlayWaySupport = new GamblingPanelGuidePlayWaySupport(this._context);
			this._supportGuidePlayWayList.push(this._actionSpt, this._flopCardSpt, this._infoRefreshSpt,
				this._oneLoopOverSpt, this._pitTurnSpt, this._pitDataSupport, this._buttonPosSpt, this._guidePlayWaySupport);
		}
	}
}