module game {
	export class MapPositionCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

		public constructor() {
			super();
		}
		public static NAME: string = "MapPositionCommand";

		public execute(notification: puremvc.INotification): void {
			var mapProxy: MapProxy = <MapProxy><any>this.facade().retrieveProxy(MapProxy.NAME);
			var data: any = notification.getBody();
			mapProxy.againPos();
		}
	}
}