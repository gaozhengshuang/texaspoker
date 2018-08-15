module game {
	export class NetReceiveRequestCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

		public constructor() {
			super();
		}
		public static NAME: string = "NetReceiveRequestCommand";

		public execute(notification: puremvc.INotification): void {
			var data: any = notification.getBody();
			switch (notification.getName()) {
				case CommandName.SOCKET_REQ_RECEIVE:
					{
						if (data != null) {
							console.log(data);
							sendMessage("msg.C2GW_ReqTakeSelfHouseGold",
							 msg.C2GW_ReqTakeSelfHouseGold.encode({houseid:data.houseid,index:data.index}));
						}
						break;
					}
			}
		}
	}
}