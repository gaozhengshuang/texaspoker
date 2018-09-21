/**
 * 坐下位置转动
 */
class GamblingPanelPitTurnSupport extends BaseGamblingPanelSupport
{
	private _nowRunIndex: number;
	/**
	 * 是否是顺时针
	 */
	private _isClockwise: boolean;

	private _offset: number;

	private _absolutePosList: Array<egret.Point>;

	public initialize()
	{
		super.initialize();
		if (!this._absolutePosList)
		{
			this._absolutePosList = new Array<egret.Point>();
			for (let i: number = 0; i < 10; i++)
			{
				this._absolutePosList.push(new egret.Point());
			}
		}
		let pos: number;
		let pInfo: PlayerInfo;
		let pitInfo: GamblingPitInfo;
		for (let i: number = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++)
		{
			pInfo = GamblingManager.getPlayerInfoByPos(i);
			pitInfo = this.target.getPitInfoByIndex(i);
			pitInfo.headComponent.init(pInfo);
			pitInfo.headComponent.visible = true;
		}
		pitInfo = null;
		if (GamblingManager.self)
		{
			let virtualPitIndex: number;
			pitInfo = this.target.getPitInfo(GamblingManager.self.pos);
			this._isClockwise = pitInfo.index > GamblingPanelSetting.centerNum;
			if (this._isClockwise)
			{
				this._offset = Math.abs(GamblingManager.maxSeats - pitInfo.index) + 1;
			}
			else
			{
				this._offset = Math.abs(GamblingPanelSetting.MinPitIndex - pitInfo.index);
			}

			let list: Array<egret.Point> = GamblingPanelSetting.getHeadPosList();

			for (let i: number = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++)
			{
				pitInfo = this.target.pitList[i - 1];
				if (this._isClockwise) //顺时针
				{
					virtualPitIndex = GamblingPanelSetting.getNextIndex(pitInfo.index, this._offset);
				}
				else
				{
					virtualPitIndex = GamblingPanelSetting.getPreIndex(pitInfo.index, this._offset);
				}
				pitInfo.index = virtualPitIndex;
				pitInfo.headComponent.refreshChipsShow(pitInfo.index, GamblingManager.maxSeats);
				pitInfo.headComponent.posIndex = virtualPitIndex;
				pitInfo.headComponent.showGroupAuto(true);
				this.setPos(pitInfo);
			}
		}
		else
		{
			let list: Array<egret.Point> = GamblingPanelSetting.getHeadPosList();
			if (list)
			{
				for (let i: number = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++)
				{
					pitInfo = this.target.getPitInfo(i);
					this.setPos(pitInfo);
					pitInfo.headComponent.refreshChipsShow(i, GamblingManager.maxSeats);
				}
			}
		}
	}
	/**
	 * 根据索引设置位置
	 */
	private setPos(pitInfo: GamblingPitInfo)
	{
		this.clearHeadCptReleative(pitInfo.headComponent);
		let list: Array<egret.Point> = GamblingPanelSetting.getHeadPosList();
		let p: egret.Point = list[pitInfo.index];
		if (pitInfo.index == 1) //自己的位置
		{
			pitInfo.headComponent.horizontalCenter = p.x;
			pitInfo.headComponent.bottom = p.y;
		}
		else
		{
			pitInfo.headComponent.horizontalCenter = p.x;
			switch (GamblingManager.maxSeats)
			{
				case SeatMode.Three:
					this.adaptivePit(pitInfo.headComponent, 1);
					break;
				case SeatMode.Five:
					if (pitInfo.index == 3 || pitInfo.index == 4)
					{
						// pitInfo.headComponent.verticalCenter = p.y;
						this.adaptivePit(pitInfo.headComponent, 0);
					}
					else
					{
						this.adaptivePit(pitInfo.headComponent, 2);
						// pitInfo.headComponent.bottom = p.y;
					}
					break;
				case SeatMode.Six:
					if (pitInfo.index == 4)
					{
						pitInfo.headComponent.top = p.y;
					}
					if (pitInfo.index == 3 || pitInfo.index == 5)
					{
						// pitInfo.headComponent.verticalCenter = p.y;
						this.adaptivePit(pitInfo.headComponent, 0);
					}
					else
					{
						this.adaptivePit(pitInfo.headComponent, 2);
						// pitInfo.headComponent.bottom = p.y;
					}
					break;
				case SeatMode.Nine:
					if (pitInfo.index == 5 || pitInfo.index == 6) 
					{
						pitInfo.headComponent.top = p.y;
					}
					else if (pitInfo.index == 4 || pitInfo.index == 7)
					{
						this.adaptivePit(pitInfo.headComponent, 0);
					}
					else if (pitInfo.index == 3 || pitInfo.index == 8)
					{
						this.adaptivePit(pitInfo.headComponent, 1);

					}
					else if (pitInfo.index == 2 || pitInfo.index == 9)
					{
						this.adaptivePit(pitInfo.headComponent, 2);
					}
					break;
			}
		}
	}
	private adaptivePit(target: egret.DisplayObject, count: number)
	{
		let top: number = GamblingPanelSetting.headTopBottomReleativePoint.x;
		let bottom: number = GamblingPanelSetting.headTopBottomReleativePoint.y;
		let h: number = GameManager.stage.stageHeight;
		let fitH: number = h - top - bottom;
		h = fitH * (1 - 0.1);

		let step: number = Math.floor(h / 3);
		if (count == 1)
		{
			target.y = top + fitH * 0.11 + step * 0.7;
		}
		else
		{
			target.y = top + fitH * 0.11 + step * count;
		}
	}
	public onEnable()
	{
		super.onEnable();
		GamblingManager.SitOrStandEvent.addListener(this.onSitOrStand, this);
		GameManager.stage.addEventListener(egret.Event.RESIZE, this.resizeHandler, this);
	}
	public onDisable()
	{
		super.onDisable();
		GamblingManager.SitOrStandEvent.removeListener(this.onSitOrStand, this);
		GameManager.stage.removeEventListener(egret.Event.RESIZE, this.resizeHandler, this);
	}
	public onSitOrStand(obj: any)
	{
		if (this.isDisabled) //处理动画异步访问数据的问题
		{
			game.Console.log("异步不显示自己的手牌");
			return;
		}
		let pitInfo: GamblingPitInfo = this.target.getPitInfo((obj.pInfo as PlayerInfo).pos);
		if (obj.state == BuyInGameState.Sit && (obj.pInfo as PlayerInfo).roleId == UserManager.userInfo.roleId)
		{
			this._isClockwise = pitInfo.index > GamblingPanelSetting.centerNum;
			if (this._isClockwise)
			{
				this._offset = Math.abs(GamblingManager.maxSeats - pitInfo.index) + 1;
			}
			else
			{
				this._offset = Math.abs(GamblingPanelSetting.MinPitIndex - pitInfo.index);
			}
			this._nowRunIndex = 0;
			if (this._offset > 0)
			{
				this.target.buttonPosFlagImg.visible = false;
				for (let childPit of this.target.pitList)
				{
					childPit.headComponent.showStateGroup(false); //坐下的时候隐藏状态组，因为状态组分左右显示，转动的时候显示有点怪
				}
				let p: egret.Point;
				for (let i: number = 1; i <= GamblingManager.maxSeats; i++)
				{
					p = this._absolutePosList[i];
					pitInfo = this.target.getPitInfoByIndex(i);

					p.x = pitInfo.headComponent.x;
					p.y = pitInfo.headComponent.y;
					// game.QinLog.log("点：" + p.x, p.y, pitInfo.headComponent.hashCode);
				}
				this.runNext();
			}
			else
			{
				let com: GamblingHeadComponent = this.target.getHeadComponentByRole(UserManager.userInfo.roleId);
				if (com)
				{
					this.target.showDownEffect(com.playerGroup);
				}
			}
		}
	}

	/**
	 * 重置舞台大小
	 */
	private resizeHandler(event: egret.Event)
	{
		let pitInfo: GamblingPitInfo;
		for (let i: number = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++)
		{
			pitInfo = this.target.pitList[i - 1];
			this.setPos(pitInfo);
		}
		this.target.refreshButtonPos();
	}
	public runNext()
	{
		if (this.isDisabled) //处理动画异步访问数据的问题
		{
			return;
		}
		let point: egret.Point;
		let virtualPitIndex: number;
		let pitInfo: GamblingPitInfo;

		this._nowRunIndex++;
		for (let i: number = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++)
		{
			pitInfo = this.target.pitList[i - 1];
			if (this._isClockwise) //顺时针
			{
				virtualPitIndex = GamblingPanelSetting.getNextIndex(pitInfo.index, this._nowRunIndex);
			}
			else
			{
				virtualPitIndex = GamblingPanelSetting.getPreIndex(pitInfo.index, this._nowRunIndex);
			}
			point = this._absolutePosList[virtualPitIndex];
			/**
			 * 将相对布局属性 清空 做动画旋转用
			 */
			this.clearHeadCptReleative(pitInfo.headComponent);
			if (i == GamblingManager.maxSeats)
			{
				pitInfo.headComponent.turnAnim.run(point.x, point.y, this.tryRunNext, this);
			}
			else
			{
				pitInfo.headComponent.turnAnim.run(point.x, point.y, null, null);
			}
			pitInfo.headComponent.posIndex = virtualPitIndex;
		}
	}
	private tryRunNext()
	{
		if (this.isDisabled) //处理动画异步访问数据的问题
		{
			return;
		}
		if (this._nowRunIndex >= this._offset) //旋转完毕
		{
			let pitInfo: GamblingPitInfo;
			for (let i: number = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++)
			{
				pitInfo = this.target.pitList[i - 1];
				//移动完毕改变坑位的索引 位置变了，最下面的坑位始终要在1号位
				if (this._isClockwise)
				{
					pitInfo.index = GamblingPanelSetting.getNextIndex(pitInfo.index, this._offset);
				}
				else
				{
					pitInfo.index = GamblingPanelSetting.getPreIndex(pitInfo.index, this._offset);
				}
				pitInfo.headComponent.refreshChipsShow(pitInfo.index, GamblingManager.maxSeats);
				pitInfo.headComponent.turnAnim.callBack = null;
			}
			this.target.setPit(); //重新设置坑位信息
			for (let i: number = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++)
			{
				pitInfo = this.target.pitList[i - 1];
				this.setPos(pitInfo); //旋转完毕重新设置位置属性
			}
			let com: GamblingHeadComponent = this.target.getHeadComponentByRole(UserManager.userInfo.roleId);
			if (com)
			{
				this.target.showDownEffect(com.playerGroup);
			}
			for (let pitInfo of this.target.pitList)
			{
				pitInfo.headComponent.showGroupAuto(false); //转动完毕显示 聊天or状态气泡
			}
			this.target.refreshButtonPos(); //刷新按钮位置显示
		}
		else
		{
			this.runNext();
		}
	}
	private clearHeadCptReleative(target: GamblingHeadComponent)
	{
		target.top = target.bottom = target.horizontalCenter = target.verticalCenter = undefined;
	}
}