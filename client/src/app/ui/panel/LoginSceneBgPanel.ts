/**
 * 登录场景背景界面
 */
class LoginSceneBgPanel extends BasePanel
{
	public logoImg: eui.Image;
	public versionLabel: eui.Label;

	public list: eui.List;
	public scroller: eui.Scroller;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.LoginSceneBgPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
		this.logoImg.source = BundleManager.getResNameByBundle(ResFixedFileName.Logo_png);

		if (DEBUG)
		{
			let dataList: Array<game.ServerInfo> = [];
			dataList.push(
				{ name: "毕强", $netIp: "ws://192.168.30.205:7002/ws_handler", $gameNetIp: "ws://192.168.30.205:{gamePort}/ws_handler" },
				{ name: "双双", $netIp: "ws://192.168.30.202:7101/ws_handler", $gameNetIp: "ws://192.168.30.202:{gamePort}/ws_handler" },
				{ name: "谢建", $netIp: "ws://192.168.30.203:27002/ws_handler", $gameNetIp: "ws://192.168.30.203:{gamePort}/ws_handler" },
				{ name: "刘凯", $netIp: "ws://192.168.30.206:17002/ws_handler", $gameNetIp: "ws://192.168.30.206:{gamePort}/ws_handler", isDefault: true },
			);
			UIUtil.listRenderer(this.list, this.scroller, ServerSelectItemRender, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, dataList);
			let idx = 0;
			dataList.forEach((data: game.ServerInfo, index: number) =>
			{
				if (data.isDefault)
				{
					game.serverInfo = data;
					idx = index
				}
			});
			this.list.selectedIndex = idx;
			this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemClick, this);
		}
		else
		{
			this.scroller.visible = this.list.visible = false;
		}
	}
	public showVersion()
	{
		if (this.versionLabel)
		{
			this.versionLabel.text = VersionManager.getVersionStr();
		}
	}
	protected onEnbale(event: egret.TouchEvent)
	{
		super.onEnable(event);

	}
	protected onDisable(event: egret.TouchEvent)
	{
		super.onDisable(event);
	}
	public onCloseBtnClickHandler(event: egret.TouchEvent)
	{
		super.onCloseBtnClickHandler(event);
		if (this.list.visible)
		{
			this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemClick, this);
		}
	}
	private onItemClick(event: eui.ItemTapEvent)
	{
		game.serverInfo = event.itemRenderer.data;
	}
}