module game {
	export class MapBuildingInfoRequestCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		public static NAME:string = "MapBuildingInfoRequestCommand";

		public execute(notification:puremvc.INotification):void{
			var data:any = notification.getBody();
			switch(notification.getName()){
				case CommandName.MAP_BUILDING_INFO:
				{
                    let buildInfo:any=table.TBuildingsById[data.bId];
                    if(buildInfo){
                        let buildingProxy: BuildingProxy = <BuildingProxy><any>this.facade().retrieveProxy(BuildingProxy.NAME);
					    buildingProxy.getSalesInfo(buildInfo,2);
                    }
					break;
				}
			}
		}
	}
}