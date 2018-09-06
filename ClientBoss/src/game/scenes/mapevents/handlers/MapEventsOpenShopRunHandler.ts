module game {
	/**
	 * 事件打开商店执行器
	 */
	export class MapEventsOpenShopRunHandler extends BaseMapEventsRunHandler {
		protected runOnce(msg: msg.MapEvent, params: any[]) {
			// if (params && params.length > 0) {
			// 	openPanel(PanelType.MapEventsShopPanel);
			// 	MapEventsShopPanel.getInstance().setData(msg);
			// 	// SceneManager.changeScene(params[0]);
			// }
			// else {
			// 	Console.log("事件执行打开商店error：", params);
			// }
		}
	}
}