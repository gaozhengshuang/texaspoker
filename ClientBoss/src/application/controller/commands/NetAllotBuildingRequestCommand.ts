module game {
	export class NetAllotBuildingRequestCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		public static NAME:string = "NetAllotBuildingRequestCommand";

		public execute(notification:puremvc.INotification):void{
			var data:any = notification.getBody();
			switch(notification.getName()){
				case CommandName.SOCKET_REQ_ALLOT_ROOM:
				{
					sendMessage("msg.C2GW_ReqHouseData", msg.C2GW_ReqHouseData.encode({}));
					break;
				}
			}
		}
	}
}