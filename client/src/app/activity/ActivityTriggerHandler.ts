/**
 * 活动触发处理器
 */
class ActivityTriggerHandler
{
	private _registerList: Array<ActivityInfo> = new Array<ActivityInfo>();
	private _propMap: qin.Dictionary<any, ActivityInfo> = new qin.Dictionary<any, ActivityInfo>();

	public initialize()
	{
		this.onEnable();
	}
	/**
 	* 注册触发事件
 	*/
	public register(info: ActivityInfo)
	{
		if (InfoUtil.checkAvailable(info) && info.definition.triggerType != ActivityTriggerType.None)
		{
			for (let childInfo of this._registerList)
			{
				if (childInfo.id == info.id) //已存在相同的活动触发对象
				{
					return;
				}
			}
			this._registerList.push(info);
		}
	}
	/**
	 * 取消注册
	 */
	public unRegister(info: ActivityInfo)
	{
		qin.ArrayUtil.RemoveItem(info, this._registerList);
	}
	private onEnable()
	{
		UIManager.onPanelOpenEvent.addListener(this.onPanelOpenHandler, this);
		UIManager.onPanelCloseEvent.addListener(this.onPanelCloseHandler, this);
	}
	public onDisable()
	{
		UIManager.onPanelOpenEvent.removeListener(this.onPanelOpenHandler, this);
		UIManager.onPanelCloseEvent.removeListener(this.onPanelCloseHandler, this);
	}
	private onPanelOpenHandler(panelName: string)
	{
		for (let info of this._registerList)
		{
			if (info.definition && info.definition.triggerType == ActivityTriggerType.Click && info.definition.triggerParams)
			{
				if (info.definition.triggerParams.length > 0)
				{
					let triggerPanelName: string = info.definition.triggerParams[0];
					if (triggerPanelName == panelName)
					{
						let panel: BasePanel = UIManager.getPanel(triggerPanelName);
						if (panel)
						{
							let params: Array<string> = info.definition.triggerParams.concat();
							params.shift();

							let prop: egret.DisplayObject = qin.ObjectUtil.getTreeProperty(panel, params);
							if (prop)
							{
								prop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.triggerActivity, this);
								this._propMap.add(prop, info);
							}
							else
							{
								qin.Console.log("开启触发组件未找到 面板名：" + panel + "---参数：" + params);
							}
						}
						else
						{
							qin.Console.log("活动触发配置clik类型参数异常！面板未找到" + info.definition.trigger);
						}
					}
				}
			}
		}
	}
	private onPanelCloseHandler(panelName: string)
	{
		for (let info of this._registerList)
		{
			if (info.definition && info.definition.triggerType == ActivityTriggerType.Click && info.definition.triggerParams)
			{
				if (info.definition.triggerParams.length > 0)
				{
					let triggerPanelName: string = info.definition.triggerParams[0];
					if (triggerPanelName == panelName)
					{
						let panel: BasePanel = UIManager.getPanel(triggerPanelName);
						if (panel)
						{
							let params: Array<string> = info.definition.triggerParams.concat();
							params.shift();

							let prop: egret.DisplayObject = qin.ObjectUtil.getTreeProperty(panel, params);
							if (prop)
							{
								prop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.triggerActivity, this);
								this._propMap.remove(prop);
							}
							else
							{
								qin.Console.log("关闭触发组件未找到 面板名：" + panel + "---参数：" + params);
							}
						}
						else
						{
							qin.Console.log("活动触发配置clik类型参数异常！面板未找到" + info.definition.trigger);
						}
					}
				}
			}
		}
	}
	private triggerActivity(event: egret.TouchEvent)
	{
		let info: ActivityInfo = this._propMap.getValue(event.currentTarget);
		if (InfoUtil.checkAvailable(info))
		{
			if (info.definition.panelName)
			{
				ActivityPanelJumpManager.JumpToPanel(info);
				//UIManager.showPanel(info.definition.panelName, { info: info });
			}
			else
			{
				qin.Console.log("活动面板绑定异常！" + info.definition.panelName);
			}
		}
	}
	public clear()
	{
		qin.ArrayUtil.Clear(this._registerList);
		this._propMap.clear();
	}
}