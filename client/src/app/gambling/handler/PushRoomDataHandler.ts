/**
 * 推送房间数据管理 处理推送消息过来，3600房间数据还没有回来的问题 
 */
class PushRoomDataHandler
{
	/**
	 * 是否已经获取房间数据
	 */
	private _isGetRoomData: boolean = false;
	/**
	 * 是否已经获取房间数据
 	*/
	public get isGetRoomData(): boolean
	{
		return this._isGetRoomData;
	}
	public set isGetRoomData(value: boolean)
	{
		this._isGetRoomData = value;
	}
	/**
	 * 推送的结果缓存
	 */
	public resultMap: qin.Dictionary<string, qin.SpRpcResult> = new qin.Dictionary<string, qin.SpRpcResult>();
	/**
	 * 回调函数处理
	 */
	public funcMap: qin.Dictionary<string, Function> = new qin.Dictionary<string, Function>();

	public initialize()
	{
		if (this.funcMap.count == 0)
		{
			this.funcMap.add(Command.NextRoundStart_Push_2107, GamblingManager.pushNextRoundStart);
			this.funcMap.add(Command.BlindChange_Push_2100, GamblingManager.pushBlindChange);
			this.funcMap.add(Command.OneLoopOver_Push_2102, GamblingManager.pushOneLoopOver);
			this.funcMap.add(Command.SitOrStand_Push_2103, GamblingManager.pushSitOrStand);
			this.funcMap.add(Command.PlayerStateChange_Push_2104, GamblingManager.pushStateChange);
			this.funcMap.add(Command.ActionPosChange_Push_2105, GamblingManager.pushActionPosChange);
			this.funcMap.add(Command.OneRoundOver_Push_2106, GamblingManager.pushOneRoundOver);
			this.funcMap.add(Command.HandCard_Push_2108, GamblingManager.pushHandCard);
			this.funcMap.add(Command.BrightCard_Push_2109, GamblingManager.pushImmediatelyBirhgtCard);
			this.funcMap.add(Command.ChipsChange_Push_2110, GamblingManager.pushChipsChange);
			this.funcMap.add(Command.InTrusteeship_Push_2119, GamblingManager.pushInTrusteeship);
		}
	}
	/**
	 * 写入缓存数据
	 */
	public writeResult(cmdId: string, result: qin.SpRpcResult)
	{
		if (this.isGetRoomData == false)
		{
			this.resultMap.add(cmdId, result);
		}
	}
	/**
	 * 房间数据回来从新设置房间的缓存数据
	 */
	public setRoomData()
	{
		this.resultMap.foreach((cmdId: string, result: qin.SpRpcResult) =>
		{
			let func: Function = this.funcMap.getValue(cmdId);
			func.call(GamblingManager, result);
			qin.Console.log("出现了，推送先于房间数据过来：" + cmdId);
			AlertManager.showAlert("出现了，推送先于房间数据过来：" + cmdId + result.data);
		}, this);
		if (this.resultMap.containsKey(Command.PlayerStateChange_Push_2104))
		{
			GamblingManager.ActionPosChangeEvent.dispatch();
			qin.Console.log("重新抛送位置改变事件，触发操作按钮显示，重新算跟注数量");
		}
		this.reset();
	}
	public reset()
	{
		this._isGetRoomData = false;
		this.resultMap.clear();
	}
}