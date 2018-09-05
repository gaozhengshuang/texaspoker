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
				if(mapProxy.mapStatus==1){
					mapProxy.addBuilding(1000);
				}else{
					mapProxy.addPlayers(1000);
				}

				

				/*if (mapProxy.mapZoom > 12) {
					let sendObj: any = {
						require: mapProxy.mapStatus,
						lat: mapProxy.currentPoint.lat,
						lng: mapProxy.currentPoint.lng,
					}
					ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_MAP_POINT, sendObj);
				} else {
					//mapProxy.emptyMapMarker(mapProxy.mapStatus);
					let pRadius = 30 * 1000;
					let cRadius = 20 * 1000;
					let level = 2;
					if (mapProxy.mapZoom >= 10) {
						level = 2;
						pRadius = 20 * 1000;
						cRadius = 10 * 1000;
					} else if (mapProxy.mapZoom < 10) {
						level = 1;
						pRadius = 40 * 1000;
						cRadius = 40 * 1000;
					}
					let sendObj: any = {
						type: index,
						lat: mapProxy.currentPoint.lat,
						lng: mapProxy.currentPoint.lng,
						level: level,
						pRadius: pRadius,
						cRadius: cRadius
					}
					ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_CITY_AREA, sendObj);
				}*/
			}
			//ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_MAP_POINT, sendObj);
		}
	}
}