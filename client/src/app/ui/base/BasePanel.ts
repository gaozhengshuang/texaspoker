/**
 * 面板基类
 **/
abstract class BasePanel extends eui.Component
{
	/*所在层级*/
	public layer: UILayerType = UILayerType.Module;
	/*关闭按钮*/
	public closeButton: eui.Button;
	/*面板附加参数*/
	public panelData: any;
	/*面板对齐方式*/
	public panelAlignType: PanelAlignType = PanelAlignType.Center_Center;
	/*横向偏移*/
	public offsetH: number = 0;
	/*纵向偏移*/
	public offsetV: number = 0;
	/*灰色遮罩*/
	protected grayMask: eui.Image;
	/*
	 * 是否缓动打开
	 */
	protected isTween: boolean = true;
	/*
	 * 是否关闭按钮缓动打开
	 */
	protected isCloseButtonTween: boolean = false;
	/*缓动*/
	protected tweenObj: egret.Tween;
	/**
	 * 缓动容器 参与面板打开缓动的内容都需要显示在此容器中
	 */
	public tweenGroup: eui.Group;
	/*是否是第一次执行缓动*/
	protected isFirstTween: boolean = false;
	/*exml是否加载完成*/
	protected isLoadComplete: boolean = false;
	/**
	 * 面板缓动效果结束
	 */
	protected isTweenOver: boolean = false;
	/**
	 * 是否正在播放关闭的缓动动画
	 */
	protected isTweenCloseing: boolean = false;
	/**
	 * 遮罩点击是否关闭
	 */
	private _isMaskClickClose: boolean = false;
	/**
	 * 遮罩alpha值
	 */
	protected _maskAlpha: number = 0.5;
	/**
	 * 是否忽略自适应 
	 */
	public isIgnoreAdaptation: boolean = false;
	/**
	 * 点击遮罩层是否关闭 不支持立即生效，需重新打开面板生效
	 */
	protected set isMaskClickClose(value: boolean)
	{
		this._isMaskClickClose = value;
		if (value)
		{
			this.setGrayMask(true);
		}
	}
	/**
	 * 遮罩alpha值
	 */
	protected set maskAlpha(value: number)
	{
		this._maskAlpha = value;
		this.setGrayMask(true);
		this.grayMask.alpha = value;
	}
	public setSkinName(name:string):void
	{
		this.skinName = PathName.SkinsPanelDirectory + name + '.exml';
	}
	/**
	 * 上个面板名
	 */
	public prevPanelName: string;
	public constructor()
	{
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.onAwake, this);
		this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onEnable, this);
		this.setTouchEnable(true);
		this.setTouchChildren(true);

		this.width = GameSetting.StageWidth;
		// this.height = GameSetting.StageHeight;
		// this.skinName = xxxxxx; tips 注：子面板 给面板添加皮肤的这句代码要放在构造函数最下面 因为赋值了的话就触发了加载---->执行onawake
	}
	/**
	 * 直接把skinName设置为exml文件的路径。这种方式要注意的是:
	 * 在 createChildren 的时候，是获取不到内部组件的，因为此时 exml 文件还没有加载完成，
	 * 要通过监听 eui.UIEvent.COMPLETE 这个事件获取组件创建完成的消息。
	 * 会先执行 createChildren 再执行 onAwake
	 * 另外需要注意的是:如果已经在主题中加载了 EXML 文件，会先执行 onAwake 再执行 createChildren
 	 */
	protected createChildren()
	{
		super.createChildren();
	}
	/**
	 * 皮肤文件加载完成时调用，仅面板初始化调用一次
	 * */
	protected onAwake(event: eui.UIEvent)
	{
		this.isLoadComplete = true;
		if (this.isTween)
		{
			this.isTweenOver = false;
			this.isFirstTween = true;
			this.onTween();
		}
		if (this.tweenGroup)
		{
			this.tweenGroup.maxWidth = GameSetting.StageWidth;
			// this.tweenGroup.maxHeight = GameSetting.StageHeight;
		}
		else
		{
			this.maxWidth = GameSetting.StageWidth;
			// this.maxHeight = GameSetting.StageHeight;
		}
		this.removeEventListener(eui.UIEvent.COMPLETE, this.onAwake, this);
	}
	/**
	 * 面板内容初始化，每次执行showpanel都会执行
	 * tips:不要在init函数里面做面板打开关闭的处理，这个时候面板都还没有显示，有可能导致打开关闭的操作无效
	 */
	public init(appendData: any)
	{
		if (this.isTween && this.isLoadComplete && !this.isFirstTween)
		{
			this.isTweenOver = false;
			this.onTween();
		}
		this.isFirstTween = false; //初始化了就相当于缓动过了
		if (appendData && appendData.prevPanelName)
		{
			this.prevPanelName = appendData.prevPanelName;
		}
		this.panelData = appendData;
		this.isTweenCloseing = false;
	}
	/**
	 * 面板添加到舞台时调用,每次打开都会调用 注意：事件不一定每次都会执行，
	 * 因为面板正在显示的时候，有可能一直触发显示(showpanel)，则此时触发不了onEnable事件 
	 * 如果需要每次触发的功能需求 需写在init函数里面
	 * 如果没有必要，面板的所有事件需写在此方法内
     */
	protected onEnable(event: eui.UIEvent): void
	{
		if (this.closeButton && this.isCloseButtonTween)
		{
			egret.Tween.removeTweens(this.closeButton);
			let enter = egret.Tween.get(this.closeButton);
			let sx = this.closeButton.scaleX;
			let sy = this.closeButton.scaleY;
			this.closeButton.scaleX = 0;
			this.closeButton.scaleY = 0;
			enter.wait(300).to({ scaleX: sx, scaleY: sy }, 200);
		}
		if (this.closeButton)
		{
			this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClickHandler, this);
		}
		if (this._isMaskClickClose)
		{
			this.grayMask.touchEnabled = true;
			this.grayMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClickHandler, this);
		}
		this.addEventListener(egret.Event.RENDER, this.onRender, this);
		this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
	}

	/**
	 * 如果没有必要，面板的所有事件移除需写在此方法内
	 */
	protected onDisable(event: eui.UIEvent): void
	{
		this.prevPanelName = null;
		this.removeEventListener(eui.UIEvent.COMPLETE, this.onAwake, this); 
		this.removeEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
		if (this.closeButton)
		{
			this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClickHandler, this);
		}
		if (this.tweenGroup)
		{
			egret.Tween.removeTweens(this.tweenGroup);
		}
		if (this.grayMask && this.grayMask.hasEventListener(egret.TouchEvent.TOUCH_TAP))
		{
			this.grayMask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClickHandler, this);
		}
		this.removeEventListener(egret.Event.RENDER, this.onRender, this);
	}
	/**
	 * 渲染，在本帧末即将开始渲染的前一刻触发调用。
	 * 可以对可视列表里面的任意元素进行操作 可在此方法内做刷新UI的操作
	 */
	protected onRender(event: egret.Event)
	{
		this.removeEventListener(egret.Event.RENDER, this.onRender, this);
	}
	protected onTween()
	{
		if (this.tweenGroup)
		{
			if (this.grayMask && this.grayMask.parent)
			{
				this.grayMask.alpha = this._maskAlpha;
			}
			egret.Tween.removeTweens(this.tweenGroup);
			this.tweenGroup.scaleX = 0.5;
			this.tweenGroup.scaleY = 0.5;
			this.tweenGroup.alpha = 1;
			this.tweenObj = new egret.Tween(this.tweenGroup, null, null);
			this.tweenObj.to({ scaleX: 1.03, scaleY: 1.03 }, 200).to({ scaleX: 1, scaleY: 1 }, 120, egret.Ease.backIn).wait(120).call(this.onTweenOver, this);
			this.tweenObj.play();
		}
	}
	protected onTweenOver()
	{
		this.tweenObj = null;
		this.isTweenOver = true;
	}
	protected onCloseBtnClickHandler(event: egret.TouchEvent): void
	{
		if (event)
		{
			if (event.target instanceof eui.Button)
			{
				SoundManager.playEffect(MusicAction.close);
			}
		}
		if (this.isTween && this.tweenGroup)
		{
			if (!this.isTweenCloseing) //是否正在播放关闭的动画
			{
				this.onTweenOver(); //打开面板动画，还未播放完毕，就触发了关闭 则清除打开状态
				this.isTweenCloseing = true;
				egret.Tween.removeTweens(this.tweenGroup);
				this.tweenObj = new egret.Tween(this.tweenGroup, { onChange: this.onCloseTweenChange.bind(this) }, null);
				this.tweenObj.to({ scaleX: 0.5, scaleY: 0.5, alpha: 0.1 }, 200, egret.Ease.quadInOut).call(this.tweenClose, this);
				this.tweenObj.play();
			}
		}
		else
		{
			this.tweenClose();
		}
	}
	protected onCloseTweenChange()
	{
		if (this.grayMask && this.grayMask.parent && this.tweenGroup.alpha < this._maskAlpha)
		{
			this.grayMask.alpha = this.tweenGroup.alpha;
		}
	}
	protected tweenClose()
	{
		if (this.tweenGroup)
		{
			egret.Tween.removeTweens(this.tweenGroup);
			this.isTweenCloseing = false;
		}
		UIManager.closePanel(this);
	}
	/**
	 * 设置对齐方式 如果不设置则默认居中显示
	 */
	protected setAlignInfo(type: PanelAlignType = PanelAlignType.Center_Center, h: number = 0, v: number = 0)
	{
		this.panelAlignType = type;
		this.offsetH = h;
		this.offsetV = v;
	}
	protected setTouchEnable(enable: boolean)
	{
		this.touchEnabled = enable;
	}
	protected setTouchChildren(enable: boolean)
	{
		this.touchChildren = enable;
	}
	/**
	 * 设置灰色底层遮罩 默认显示 需要在onawake时调用
	 */
	protected setGrayMask(enable: boolean = true)
	{
		if (this.grayMask)
		{
			if (enable)
			{
				this.addChildAt(this.grayMask, 0);
			}
			else
			{
				if (this.grayMask.parent)
				{
					this.grayMask.parent.removeChild(this.grayMask);
				}
			}
		}
		else
		{
			if (enable)
			{
				this.createGrayMask();
				this.addChildAt(this.grayMask, 0);
			}
		}
	}
	private createGrayMask()
	{
		if (!this.grayMask)
		{
			this.grayMask = new eui.Image();
			this.grayMask.source = SheetSubName.GrayBg;
			this.grayMask.scale9Grid = new egret.Rectangle(1, 1, 10, 10);
			this.grayMask.top = 0;
			this.grayMask.bottom = 0;
			this.grayMask.left = 0;
			this.grayMask.right = 0;
		}
	}

	protected showPrePanelName()
	{
		if (this.prevPanelName && this.prevPanelName != UIModuleName.None)
		{
			UIManager.showPanel(this.prevPanelName);
		}
	}
	public destroy()
	{
		this.onDisable(null);
		this.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onEnable, this);
		this.removeEventListener(eui.UIEvent.COMPLETE, this.onAwake, this);
	}
}
