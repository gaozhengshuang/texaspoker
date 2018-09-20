/**
 * 界面显示管理 
 */
class UIManager
{
	//游戏内容层
	private static _gameLayer: eui.Group;
	//主界面UI层
	private static _mainUiLayer: eui.Group;
	//模块层
	private static _moduleLayer: eui.Group;
	//tips层
	private static _tipsLayer: eui.Group;
	//引导层
	private static _guideLayer: eui.Group;
	//警告层
	private static _warnLayer: eui.Group;
	//面板对象存储
	private static _panelDict: game.Map<string, BasePanel>;
	public static get panelDict(): game.Map<string, BasePanel>
	{
		return UIManager._panelDict;
	}
	//游戏层级存储
	private static _layerDict: game.Map<UILayerType, eui.Group>;
	private static _layers: Array<eui.Group>;
	/**
	 * 自适应的显示对象集合
	 */
	private static _resizeMap: Array<egret.DisplayObject>;
	/**
	 * 自适应的scroller集合
	*/
	private static _resizeScrollerMap: Array<Object>;
	/**
	 * 自适应的dom对象集合
	 */
	private static _resizeDomMap: Array<Object>;

	public static initialize(stage: egret.Stage)
	{
		UIManager._gameLayer = new eui.Group();
		UIManager._mainUiLayer = new eui.Group();
		UIManager._moduleLayer = new eui.Group();
		UIManager._tipsLayer = new eui.Group();
		UIManager._guideLayer = new eui.Group();
		UIManager._warnLayer = new eui.Group();
		stage.addChild(UIManager._gameLayer);
		stage.addChild(UIManager._mainUiLayer);
		stage.addChild(UIManager._moduleLayer);
		stage.addChild(UIManager._tipsLayer);
		stage.addChild(UIManager._guideLayer);
		stage.addChild(UIManager._warnLayer);

		UIManager._panelDict = new game.Map<string, BasePanel>();
		UIManager._layerDict = new game.Map<UILayerType, eui.Group>();
		UIManager._layerDict.add(UILayerType.GameContent, UIManager._gameLayer);
		UIManager._layerDict.add(UILayerType.MainUI, UIManager._mainUiLayer);
		UIManager._layerDict.add(UILayerType.Module, UIManager._moduleLayer);
		UIManager._layerDict.add(UILayerType.Tips, UIManager._tipsLayer);
		UIManager._layerDict.add(UILayerType.Guide, UIManager._guideLayer);
		UIManager._layerDict.add(UILayerType.Warn, UIManager._warnLayer);

		this._layers = UIManager._layerDict.getValues();

		let layer: eui.Group;
		for (let i: number = 0; i < this._layers.length; i++)
		{
			layer = this._layers[i];
			layer.touchEnabled = false;
			layer.width = GameSetting.StageWidth;
		}
		if (DEBUG && egret.Capabilities.isMobile == false)
		{
			stage.addChild(new TestPanel());
		}
		UIManager._resizeMap = new Array<egret.DisplayObject>();
		UIManager._resizeScrollerMap = new Array<Object>();
		UIManager._resizeDomMap = new Array<Object>();
		stage.addEventListener(egret.Event.RESIZE, UIManager.resizeHandler, this);
		UIManager.resizeHandler(null);
	}
	public static showPanel(panelName: any, data?: any)
	{
		let targetPanel: BasePanel;
		targetPanel = UIManager._panelDict.getValue(panelName);
		if (!targetPanel) //缓存中没有则创建
		{
			let PanelClass: any = egret.getDefinitionByName(panelName);
			if (PanelClass)
			{
				targetPanel = new PanelClass();
				UIManager._panelDict.add(panelName, targetPanel);
			}
		}
		if (targetPanel)
		{
			let con = UIManager.getLayerContainer(targetPanel.layer);
			UIManager.setAlignInfo(targetPanel);
			if (con)
			{
				if (!targetPanel.isIgnoreAdaptation)
				{
					targetPanel.height = GameManager.stage.stageHeight;
				}
				con.addChild(targetPanel);
			}
			targetPanel.init(data);
			UIManager.onPanelOpenEvent.dispatch(panelName);
		}
	}
	public static closePanel(panelName: string);
	public static closePanel(panelObj: BasePanel);
	public static closePanel(panel)
	{
		let targetPanel: BasePanel;
		let panelName: string;
		if (typeof panel == "string")
		{
			targetPanel = UIManager.getPanel(panel);
			panelName = panel;
		}
		else if (panel instanceof BasePanel)
		{
			targetPanel = panel as BasePanel;
			panelName = egret.getQualifiedClassName(panel);
		}
		if (targetPanel && targetPanel.parent)
		{
			targetPanel.parent.removeChild(targetPanel);
			UIManager.onPanelCloseEvent.dispatch(panelName);
		}
	}
	public static getPanel(panelName: string)
	{
		if (panelName)
		{
			let panel = UIManager._panelDict.getValue(panelName);
			return panel;
		}
		game.Console.logError("面板名为空！");
	}
	public static getLayerContainer(layer: UILayerType): eui.Group
	{
		if (layer != UILayerType.None)
		{
			return UIManager._layerDict.getValue(layer) as eui.Group;
		}
		return null;
	}
	public static showFloatTips(tips: string)
	{
		UIManager.showPanel(UIModuleName.TextTipsPanel, tips);
	}
	/**
	 * 对面板的visible属性设置，不触发面板的初始化流程
	 */
	public static showPanelByVisible(name: string, flag: boolean)
	{
		let panel: BasePanel = UIManager.getPanel(name);
		if (panel)
		{
			panel.visible = flag
		}
	}
	public static takeToTopLayer(panelName: string);
	public static takeToTopLayer(panelObj: BasePanel);
	public static takeToTopLayer(panel: any)
	{
		let targetPanel: BasePanel;
		let con: eui.Group;
		if (typeof panel == "string")
		{
			targetPanel = UIManager.getPanel(panel);
			con = UIManager.getLayerContainer(targetPanel.layer);
		}
		else if (panel instanceof BasePanel)
		{
			targetPanel = panel as BasePanel;
			con = UIManager.getLayerContainer(panel.layer);
		}
		if (con && targetPanel)
		{
			targetPanel.parent.addChild(targetPanel);
		}
	}
	/**
	 * 面板是否显示 根据面板名
	 */
	public static isShowPanel(panelName: string): boolean
	{
		let panel: BasePanel = UIManager.getPanel(panelName);
		return UIManager.isShowPanelObj(panel);
	}
	/**
	 * 面板是否显示
	 */
	public static isShowPanelObj(panel: BasePanel): boolean
	{
		if (panel)
		{
			if (panel.parent && panel.visible)
			{
				return true;
			}
		}
		return false;
	}
	/*设置对齐方式*/
	private static setAlignInfo(target: BasePanel)
	{
		UIUtil.clearLayout(target);
		if (target.tweenGroup)
		{
			if (isNaN(target.tweenGroup.horizontalCenter))
			{
				target.tweenGroup.horizontalCenter = 0;
			}
			if (isNaN(target.tweenGroup.verticalCenter))
			{
				target.tweenGroup.verticalCenter = 0;
			}
		}
		switch (target.panelAlignType)
		{
			case PanelAlignType.Center_Top:
				target.horizontalCenter = target.offsetH;
				target.top = target.offsetV;
				break;
			case PanelAlignType.Center_Center:
				target.horizontalCenter = target.offsetH;
				target.verticalCenter = target.offsetV;
				break;
			case PanelAlignType.Center_Bottom:
				target.horizontalCenter = target.offsetH;
				target.bottom = target.offsetV;
				break;
			case PanelAlignType.Left_Top:
				target.left = target.offsetH;
				target.top = target.offsetV;
				break;
			case PanelAlignType.Left_Bottom:
				target.left = target.offsetH;
				target.bottom = target.offsetV;
				break;
			case PanelAlignType.Left_Center:
				target.left = target.offsetH;
				target.verticalCenter = target.offsetV;
				break;
			case PanelAlignType.Right_Top:
				target.right = target.offsetH;
				target.top = target.offsetV;
				break;
			case PanelAlignType.Right_Center:
				target.right = target.offsetH;
				target.verticalCenter = target.offsetV;
				break;
			case PanelAlignType.Right_Bottom:
				target.right = target.offsetH;
				target.bottom = target.offsetV;
				break;
		}
	}
	/**
	 * 舞台宽高改变
	 */
	public static resizeHandler(event: egret.Event)
	{
		//面板容器
		let layer: eui.Group;
		for (let i: number = 0; i < this._layers.length; i++)
		{
			layer = this._layers[i];
			layer.height = GameManager.stage.stageHeight;
		}
		//所有面板 后续如果有需要可以加个忽略自适应属性
		UIManager._panelDict.foreach(UIManager.resizePanel, this);
		//特殊group
		for (let gruop of UIManager._resizeMap)
		{
			gruop.height = GameManager.stage.stageHeight;
		}
		//滚动视图
		if (GameManager.stage.stageHeight < GameSetting.StageHeight)
		{
			for (let scroller of UIManager._resizeScrollerMap)
			{
				scroller["target"].height = GameManager.stage.stageHeight - (GameSetting.StageHeight - scroller["height"]);;
			}
		} else
		{
			for (let scroller of UIManager._resizeScrollerMap)
			{
				scroller["target"].height = scroller["height"];
			}
		}
		for (let obj of UIManager._resizeDomMap)
		{
			UIManager.reSizeDom(obj["target"], obj["offsetX"], obj["offsetY"], obj["canvasWidth"], obj["leftByStage"]);
		}
	}
	private static resizePanel(name: string, panel: BasePanel)
	{
		if (!panel.isIgnoreAdaptation)
		{
			panel.height = GameManager.stage.stageHeight;
		}
	}
	/**
	 * 加入一个要动态改变尺寸的显示对象(传入的显示对象touchEnabled默认为false)
	 */
	public static pushResizeGroup(target: egret.DisplayObject, isImmediatelyChange: boolean = true)
	{
		if (target)
		{
			if (isImmediatelyChange)
			{
				target.height = GameManager.stage.stageHeight;
			}
			if (UIManager._resizeMap.indexOf(target) == -1)
			{
				UIManager._resizeMap.push(target);
			}
			target.touchEnabled = false;
		}
	}
	/**
	 * 加入一个要动态改变尺寸的dom对象
	 */
	public static pushResizeDom(target: egret.DisplayObject, offsetX: number, offsetY: number, isImmediatelyChange: boolean = true)
	{
		if (target)
		{
			let canvas: any = document.getElementsByTagName('canvas')[0].getBoundingClientRect();
			let cvWidth: number = canvas.width;
			let scale: number = canvas.width / GameManager.stage.width;
			let cvTop: number;
			if (canvas.top > 0)
			{
				cvTop = 0;
			} else
			{
				cvTop = canvas.top * scale;
			}
			if (isImmediatelyChange)
			{
				UIManager.reSizeDom(target, (offsetX + canvas.left) * scale, offsetY * scale + cvTop, cvWidth, offsetX * scale);
			}
			let flag: boolean = true;
			for (let info of UIManager._resizeDomMap)
			{
				if (info["target"] == target)
				{
					flag = false;
					break;
				}
			}
			if (flag)
			{
				let obj: Object = new Object();
				obj["target"] = target;
				obj["offsetX"] = (offsetX + canvas.left) * scale;
				obj["offsetY"] = offsetY * scale + cvTop;
				obj["canvasWidth"] = cvWidth;
				obj["leftByStage"] = offsetX * scale;
				UIManager._resizeDomMap.push(obj);
			}
		}
	}
	private static reSizeDom(target: egret.DisplayObject, offsetX: number, offsetY: number, canvasWidth: number, leftByStage: number)
	{
		let canvas = document.getElementsByTagName('canvas')[0].getBoundingClientRect();
		let cvWidth: number = canvas.width;
		let cvLeft: number = canvas.left;
		let scaleX: number;
		let scaleY: number;
		if (cvWidth == canvasWidth)
		{
			if (cvLeft > 0)
			{
				scaleX = (cvLeft + leftByStage) / offsetX;
			} else
			{
				scaleX = (leftByStage / offsetX) * (cvWidth / canvasWidth);
			}
			scaleY = offsetY / offsetY;
		} else
		{
			scaleX = (cvLeft + leftByStage * (cvWidth / canvasWidth)) / offsetX;
			scaleY = cvWidth / canvasWidth;
		}
		target.x = offsetX * scaleX;
		target.y = offsetY * scaleY + canvas.top;
	}
	/**
	 * 加入一个要动态改变尺寸的scroller显示对象
	*/
	public static pushResizeScroller(target: egret.DisplayObject, height: number, isImmediatelyChange: boolean = true)
	{
		if (target)
		{
			if (isImmediatelyChange)
			{
				if (GameManager.stage.stageHeight < GameSetting.StageHeight)
				{
					target.height = GameManager.stage.stageHeight - (GameSetting.StageHeight - height);
				} else
				{
					target.height = height;
				}
			}
			let flag: boolean = true;
			for (let info of UIManager._resizeScrollerMap)
			{
				if (info["target"] == target)
				{
					flag = false;
					break;
				}
			}
			if (flag)
			{
				let obj: Object = new Object();
				obj["target"] = target;
				obj["height"] = height;
				UIManager._resizeScrollerMap.push(obj);
			}
			target.touchEnabled = false;
		}
	}

	private static _eventDispatcher: game.CallDispatcher<any> = new game.CallDispatcher<any>();
	/**
	 * 添加事件
	 */
	public static addEventListener(moduleName: string, eventName: string, listener: Function, thisObject: any): void
	{
		UIManager._eventDispatcher.addListener(moduleName + eventName, listener, thisObject);
	}
	/**
	 * 移除事件
	 */
	public static removeEventListener(moduleName: string, eventName: string, listener: Function, thisObject: any): void
	{
		UIManager._eventDispatcher.removeListener(moduleName + eventName, listener, thisObject);
	}
	/**
	 * 广播事件
	 */
	public static dispatchEvent(moduleName: string, eventName: string, data?: any): void
	{
		UIManager._eventDispatcher.dispatch(moduleName + eventName, data);
	}
	/**
	 * 面板打开事件
	 */
	public static onPanelOpenEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 面板关闭事件
	 */
	public static onPanelCloseEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 清除所有事件
	 */
	public static removeAllEvent(): void
	{
		UIManager._eventDispatcher.clear();
	}
}

