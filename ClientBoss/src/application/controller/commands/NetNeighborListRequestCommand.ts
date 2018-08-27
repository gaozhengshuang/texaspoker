module game {
	export class NetNeighborListRequestCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		public static NAME:string = "NetNeighborListRequestCommand";

		public execute(notification:puremvc.INotification):void{
			var data:any = notification.getBody();
			switch(notification.getName()){
				case CommandName.SOCKET_REQ_NEIGHBOR_LIST:
				{
					sendMessage("msg.C2GW_ReqRandHouseList", msg.C2GW_ReqRandHouseList.encode
					({carflag:(data && data.carflag)&& 1 || 0,
					  buildingid:(data && data.buildingid)&& data.buildingid || 0}));
					break;
				}
			}
		}
	}
}