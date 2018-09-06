module game {
	export class MapFujinSwitchCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

		public constructor() {
			super();
		}
		public static NAME: string = "MapFujinSwitchCommand";

		public execute(notification: puremvc.INotification): void {
			var mapProxy: MapProxy = <MapProxy><any>this.facade().retrieveProxy(MapProxy.NAME);
			var data: any = notification.getBody();
			if (data) {
				mapProxy.mapStatus = data.index;
				let index: number = mapProxy.mapStatus == 1 ? 2 : 1;
				mapProxy.emptyMapMarker(index);
				mapProxy.emptyAreaIconFun();
				
				if (mapProxy.mapZoom > 14) {
					if (mapProxy.mapStatus == 1) {
						mapProxy.addBuilding(1000);
					} else {
						mapProxy.addPlayers(1000);
					}
					//ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_MAP_POINT, sendObj);
				} else {
					//mapProxy.emptyMapMarker(mapProxy.mapStatus);

					GameConfig.getCityNameFun(mapProxy.currentPoint.lat, mapProxy.currentPoint.lng, function (data: any[]) {

						let cityList: table.ITCitysDefine[] = table.TCitys;
						let province: number = 0;
						let city: number = 0;
						for (let i: number = 0; i < cityList.length; i++) {
							if (cityList[i].Name == data[0]) {
								province = cityList[i].Id;
							}
						}

						if (mapProxy.mapZoom >= 10) {
							ApplicationFacade.getInstance().sendNotification(CommandName.MAP_AREA_TOTAL, { province: province });
						} else if (mapProxy.mapZoom < 10) {
							ApplicationFacade.getInstance().sendNotification(CommandName.MAP_AREA_TOTAL, { province: 0 });
						}


					})
				}
			}
			//ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_MAP_POINT, sendObj);
		}
	}
}