module game {
	/**
	 * 地图事件进入小游戏
	 */
	export class MapEventsEnterGameRunHandler extends BaseMapEventsRunHandler {
		protected runOnce(msgData: msg.MapEvent, params: any[]) {
			switch (msgData.tid) {
				case msg.MapEventId.GameTanTanLe: //弹弹乐比较特殊需要发协议
					NotificationCenter.addObserver(this, this.BT_GameRoomDestroy, "msg.BT_GameRoomDestroy");
					sendMessage("msg.C2GW_ReqStartGame", msg.C2GW_ReqStartGame.encode({
						gamekind: 0,
					}));
					break;
				case msg.MapEventId.GameSuperMarket:
					NotificationCenter.addObserver(this, this.onGameSuperMarketClose, ""); //todo
					this.runParam(params);
					break;
				case msg.MapEventId.GameFanFanLe:
					NotificationCenter.addObserver(this, this.onFanFanleClose, ""); //todo
					this.runParam(params);
					break;
			}
		}
		/**
		 * 执行切地图
		 */
		private runParam(params: any[]) {
			if (params && params.length > 0) {
				SceneManager.changeScene(params[0]);
			}
			else {
				Console.log("事件执行切地图error：", params);
			}
		}
		private BT_GameRoomDestroy(msgData: msg.BT_GameRoomDestroy) {
			NotificationCenter.removeObserver(this, "msg.BT_GameRoomDestroy");
			this.finish();
		}
		private onGameSuperMarketClose() {
			NotificationCenter.removeObserver(this, "");
			this.finish();
		}
		private onFanFanleClose() {
			NotificationCenter.removeObserver(this, "");
			this.finish();
		}
	}
}