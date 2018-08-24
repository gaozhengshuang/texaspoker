/**
 * 用户代理
 * @author sunboy
 */
module game {

	export class BuildingProxy extends puremvc.Proxy implements puremvc.IProxy{
		public static NAME:string = "BuildingProxy";
		public constructor(){
			super(BuildingProxy.NAME);
			this.RegisterEvent();
		}

		public RegisterEvent() {
			NotificationCenter.addObserver(this, this.OnGW2C_AckBuildingCanBuyInfo, "msg.GW2C_AckBuildingCanBuyInfo");
			NotificationCenter.addObserver(this, this.OnGW2C_AckBuyHouseFromBuilding, "msg.GW2C_AckBuyHouseFromBuilding");
        }
        private OnGW2C_AckBuildingCanBuyInfo(data: msg.GW2C_AckBuildingCanBuyInfo) {
            if(data.buildingid==this.currentBuidling.Id){
                 let canBuyInfoList:any[]=data.data;
                 ApplicationFacade.getInstance().sendNotification(CommandName.POPUP_NEW_HOUSE_HUXING,
                  { bId:data.buildingid,sales: canBuyInfoList });
            }
		}

        private OnGW2C_AckBuyHouseFromBuilding(data: msg.GW2C_AckBuyHouseFromBuilding) {
			console.log(data);
            if(data.ret==1){
                sendMessage("msg.C2GW_ReqHouseDataByHouseId", msg.C2GW_ReqHouseDataByHouseId.encode({houseid:data.houseid}));
                //sendMessage("msg.C2GW_ReqHouseDataByHouseId", msg.C2GW_ReqHouseDataByHouseId.encode({houseid:data.houseid}));
            }
		}
        public buyHouse(build:any,huxing:number){
            this.setCurrentBuidling(build);
            sendMessage("msg.C2GW_ReqBuyHouseFromBuilding", msg.C2GW_ReqBuyHouseFromBuilding.encode({buildingid:build,index:huxing}));
        }
        public getSalesInfo(build:any){
            this.setCurrentBuidling(build);
            sendMessage("msg.C2GW_ReqBuildingCanBuyInfo", msg.C2GW_ReqBuildingCanBuyInfo.encode({buildingid:build.Id}));
        }

        public currentBuidling:any;
        public setCurrentBuidling(info:any[]){
            this.currentBuidling=info; 
		}
	}
}