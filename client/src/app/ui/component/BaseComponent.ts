/**
 * 游戏面板共用组件
 */
abstract class BaseComponent<T> extends eui.Component
{
	public bindData: T;
	public isLoadComplete: boolean;
	public constructor(skinName: string)
	{
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.onAwake, this);
		this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onEnable, this);
		this.skinName = skinName;
		if (!skinName)
		{
			game.Console.log("皮肤路径为空！" + egret.getQualifiedClassName(this));
		}
	}
	public init(data: T)
	{
		this.bindData = data;
		this.delayInit();
	}
	protected delayInit(...args)
	{

	}
	/**
	 * 皮肤文件加载完成时调用，仅面板初始化调用一次
 	 * */
	protected onAwake(event: eui.UIEvent)
	{
		this.isLoadComplete = true;
		this.removeEventListener(eui.UIEvent.COMPLETE, this.onAwake, this);
		this.awakeUp();
	}
	protected awakeUp()
	{

	}
	protected onEnable(event: eui.UIEvent): void
	{
		this.addEventListener(egret.Event.RENDER, this.rendererStart, this);
		this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
		this.addEvents();
	}
	protected addEvents()
	{

	}
	/**
	 * 如果没有必要，面板的所有事件移除需写在此方法内
	 */
	protected onDisable(event: eui.UIEvent): void
	{
		this.removeEventListener(egret.Event.RENDER, this.rendererStart, this);
		this.removeEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
		this.removeEvents();
	}
	protected removeEvents()
	{

	}
	/**
	 * 渲染开始 侦听到此事件时，可以对可视列表里面的任意元素进行操作 可在此方法内做刷新UI的操作
	 */
	protected rendererStart(event: egret.Event)
	{
		this.removeEventListener(egret.Event.RENDER, this.rendererStart, this);
	}
	public destroy()
	{
		this.onDisable(null);
		this.removeEventListener(eui.UIEvent.COMPLETE, this.onAwake, this);
		this.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onEnable, this);
	}
}