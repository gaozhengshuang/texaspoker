module game {
	/**
	 * 地图事件切场景
	 */
	export class MapEventsSwitchSceneRunHandler extends BaseMapEventsRunHandler {
		protected runOnce(msg: msg.MapEvent, params: any[]) {
			if (params && params.length > 0) {
				SceneManager.changeScene(params[0]);
			}
			else {
				Console.log("事件执行切地图error：", params);
			}
		}
	}
}