/**
 * 普通场次选择面板
 */
class CommonPatternPanel extends BasePanel
{
	public list: eui.List;
	public scroller: eui.Scroller;

	private _selectPattern: PlayingFieldType;

	private _dataList: Array<RoomSelectInfo>;

	private _lastSelectBtn: eui.Button;
	private _isSameBtn: boolean;
	private _childInfo: RoomSelectInfo;

	private _isFirst: boolean;


	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.CommonPatternPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0.5;
		this.isMaskClickClose = true;
		this._dataList = [];
		let info: RoomSelectInfo;
		for (let i: number = 0; i < 3; i++)
		{
			info = new RoomSelectInfo();
			info.pattern = i + 1;
			this._dataList.push(info);
		}
		this._childInfo = new RoomSelectInfo();
		this._childInfo.pattern = -1;
		this._dataList.push(this._childInfo);

		this.list.itemRenderer = RoomSelectPatternItemRenderer;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this._isFirst = true;
		//重置
		this.removeDataChild();
		if (this.panelData && this.panelData.enterIndex)
		{
			this._selectPattern = this.panelData.enterIndex + 1;
			PlayingFieldManager.reqRoomListInfo(this._selectPattern);
		}
		else
		{
			this._selectPattern = 1;
			PlayingFieldManager.reqRoomListInfo(this._selectPattern);
		}
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);

		PlayingFieldManager.onGetRoomListEvent.addListener(this.setRoomListInfo, this);
		PlayingFieldManager.PatternSelectEvent.addListener(this.changePattern, this);

		GamblingManager.OnGetRoomInfoEvent.addListener(this.onGetRoomInfoHandler, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		PlayingFieldManager.onGetRoomListEvent.removeListener(this.setRoomListInfo, this);
		PlayingFieldManager.PatternSelectEvent.removeListener(this.changePattern, this);

		GamblingManager.OnGetRoomInfoEvent.removeListener(this.onGetRoomInfoHandler, this);
		this._isSameBtn = false;
	}

	/**
	* 写入列表默认数据
   */
	private setRoomListInfo()
	{
		if (!this._isFirst)
		{
			if (this._isSameBtn)
			{
				if (this._dataList.indexOf(this._childInfo) != -1)
				{
					this.removeDataChild();
				}
				else
				{
					this._dataList.push(this._childInfo);
				}
			}
			else
			{
				if (this._dataList.indexOf(this._childInfo) == -1)
				{
					this._dataList.push(this._childInfo);
				}
			}
		}
		this._isFirst = false;
		this._dataList.sort((a: RoomSelectInfo, b: RoomSelectInfo) =>
		{
			return a.pattern - b.pattern;
		});

		if (this._dataList.length == 4)
		{
			let list = this.getTwoBlindPattern();

			let childInfo = this._dataList[0];
			childInfo.blindInfoList = list;

			for (let i: number = 0; i < this._selectPattern; i++)
			{
				this.exch(i, i + 1);
			}
		}
		this.list.dataProvider = new eui.ArrayCollection(this._dataList);
	}
	/**
	 * 交换
	 */
	private exch(a: number, b: number)
	{
		let tmp = this._dataList[a];
		this._dataList[a] = this._dataList[b];
		this._dataList[b] = tmp;
	}
	/**
	 * 改变模式
	 */
	private changePattern(data: any)
	{
		if (this._lastSelectBtn)
		{
			this._isSameBtn = this._lastSelectBtn.label == data.btn.label;
		}
		this._lastSelectBtn = data.btn;
		this._selectPattern = data.data.pattern;
		PlayingFieldManager.reqRoomListInfo(data.data.pattern);
	}

	private onGetRoomInfoHandler()
	{
		SceneManager.switcScene(SceneType.Game);
		// UIManager.closePanel(UIModuleName.PlayingFieldPanel);
	}

	private getTwoBlindPattern()
	{
		let list: RoomSelectBlindInfo[] = [];
		for (let def of table.TexasRoom)
		{

			let isExistDef = list[0];
			if (def.Type == this._selectPattern && (isExistDef == null || isExistDef.sblind != def.SBlind))
			{
				let info: RoomSelectBlindInfo = new RoomSelectBlindInfo();
				info.sblind = game.longToNumber(def.SBlind);
				info.bblind = game.longToNumber(def.BBlind);
				list.push(info);
			}
			if (list.length == 2)
			{
				break;
			}
		}
		return list;
	}
	private removeDataChild()
	{
		for (let info of this._dataList)
		{
			if (info.pattern == -1)
			{
				this._dataList.splice(this._dataList.indexOf(info), 1);
				break;
			}
		}
	}
}