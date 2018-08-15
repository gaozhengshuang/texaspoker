module game {
	export class NetPlunderRequestCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

		public constructor() {
			super();
		}
		public static NAME: string = "NetPlunderRequestCommand";

		public execute(notification: puremvc.INotification): void {
			var data: any = notification.getBody();
			switch (notification.getName()) {
				case CommandName.SOCKET_REQ_PLUNDER:
					{
						if (data != null) {
							sendMessage("msg.C2GW_ReqTakeOtherHouseGold",
							 msg.C2GW_ReqTakeOtherHouseGold.encode({houseid:data.houseid,index:data.index}));
						}
						break;
					}
			}
		}
	}
}