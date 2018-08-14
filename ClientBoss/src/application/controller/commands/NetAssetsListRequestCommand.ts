module game {
	export class NetAssetsListRequestCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		public static NAME:string = "NetAssetsListRequestCommand";

		public execute(notification:puremvc.INotification):void{
			var data:any = notification.getBody();
			switch(notification.getName()){
				case CommandName.SOCKET_REQ_ASSETS_LIST:
				{
                    sendMessage("msg.C2GW_ReqHouseData", msg.C2GW_ReqHouseData.encode({}));
					break;
				}
			}
		}
	}
}