module game {
	export class NetGoinRoomRequestCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		public static NAME:string = "NetGoinRoomRequestCommand";

		public execute(notification:puremvc.INotification):void{
			var data:any = notification.getBody();
			switch(notification.getName()){
				case CommandName.SOCKET_REQ_GOIN_ROOM:
				{
					if(data!=null){
                        sendMessage("msg.C2GW_ReqHouseDataByHouseId", msg.C2GW_ReqHouseDataByHouseId.encode({houseid:data.houseid}));
                    }
					break;
				}
			}
		}
	}
}