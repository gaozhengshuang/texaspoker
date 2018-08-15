module game {
	export class NetRoomLevelRequestCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

		public constructor() {
			super();
		}
		public static NAME: string = "NetRoomLevelRequestCommand";

		public execute(notification: puremvc.INotification): void {
			var data: any = notification.getBody();
			switch (notification.getName()) {
				case CommandName.SOCKET_REQ_LEVEL:
					{
						if (data != null) {
                            if(data.index==0){
                                sendMessage("msg.C2GW_ReqHouseLevelUp",
							 msg.C2GW_ReqHouseLevelUp.encode({houseid:data.houseid}));
                            }else{
                                sendMessage("msg.C2GW_ReqHouseCellLevelUp",
							 msg.C2GW_ReqHouseCellLevelUp.encode({houseid:data.houseid,index:data.index}));
                            }
						}
						break;
					}
			}
		}
	}
}