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
					let houseProxy: HouseProxy = <HouseProxy><any>this.facade().retrieveProxy(HouseProxy.NAME);
					let type:number=1;
					let bgetall:number=0;
					if(data.type!=null){
						type=data.type;
					}
					if(data.bgetall!=null){
						bgetall=data.bgetall;
					}
					houseProxy.getNeighborList(data,type,bgetall);
					/*sendMessage("msg.C2GW_ReqRandHouseList", msg.C2GW_ReqRandHouseList.encode
					({carflag:(data && data.carflag)&& 1 || 0,
					  buildingid:(data && data.buildingid)&& data.buildingid || 0}));*/
					break;
				}
			}
		}
	}
}