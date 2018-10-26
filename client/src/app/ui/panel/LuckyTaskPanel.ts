/**
 * 幸运任务
 */
class LuckyTaskPanel extends BasePanel
{
	doBtn: eui.Button;
	desLabel: eui.Label;
	itemIcon: GetItemComponent;

	private _def: table.IAchieveDefine;
	private _itemGetInfo: ItemGetInfo;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.LuckyTaskPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this._itemGetInfo = new ItemGetInfo();
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this._def = table.AchieveById[appendData];
		if (this._def)
		{
			this._itemGetInfo = ItemGetInfo.CreateFromTaskDefine(this._def);
			this._itemGetInfo.size = 100;
			this.itemIcon.initInfo(this._itemGetInfo);
			this.desLabel.text = this._def.Name;
		}
		else
		{
			this.desLabel.text = game.StringConstants.Empty;
			game.Console.log("未找到任务配置：" + appendData);
		}
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.doBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDoBtnClick, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.doBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDoBtnClick, this);
	}
	private onDoBtnClick(event: egret.TouchEvent)
	{
		//跳转到任务面板
		if (this._def)
		{
			JumpUtil.JumpByPlayField(this._def.Tran, UIModuleName.AssignmentPanel);
		}
		this.onCloseBtnClickHandler(null);
	}
}