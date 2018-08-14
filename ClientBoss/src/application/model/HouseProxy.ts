/**
 * 房产代理
 * @author sunboy
 */
module game {

	export class HouseProxy extends puremvc.Proxy implements puremvc.IProxy{
		public static NAME:string = "HouseProxy";
		public constructor(){
			super(HouseProxy.NAME);
			this.RegisterEvent();
		}
		public RegisterEvent() {
            NotificationCenter.addObserver(this, this.OnGW2C_AckOtherUserHouseData, "msg.GW2C_AckOtherUserHouseData");
			NotificationCenter.addObserver(this, this.OnGW2C_AckRandHouseList, "msg.GW2C_AckRandHouseList");
			NotificationCenter.addObserver(this, this.OnGW2C_AckHouseData, "msg.GW2C_AckHouseData");
			NotificationCenter.addObserver(this, this.OnGW2C_AckHouseData, "msg.GW2C_AckHouseData");
			NotificationCenter.addObserver(this, this.OnGW2C_AckHouseData, "msg.GW2C_AckHouseData");
        }
		private OnGW2C_AckHouseData(data: msg.GW2C_AckHouseData) {
			if(GameConfig.pageType==1){
				if(data.datas && data.datas.length>0){
					for(let i:number;i<data.datas.length;i++){
						if(data.datas[i].id==this.currentHouse.rId){
							this.currentHouse.setObject(data.datas[i]);
								ApplicationFacade.getInstance().sendNotification(CommandName.UPDATE_ROOM_INFO,{ room: this.currentHouse});
							break;
						}
					}
				}
			}
		}
		private OnGW2C_AckOtherUserHouseData(data: msg.GW2C_AckOtherUserHouseData) {
			this.setCurrentHouse(data.datas);
            ApplicationFacade.getInstance().sendNotification(CommandName.PAGE_SWITCH_ROOM,{ room: this.currentHouse});
		}
		private OnGW2C_AckRandHouseList(data: msg.GW2C_AckOtherUserHouseData) {
			if(data.datas && data.datas.length>0){
				let houseList=[];
				for(let i:number=0;i<data.datas.length;i++){
					let house:HouseVO=new HouseVO();
					house.setObject(data.datas[i]);
					houseList.push(house);
				}
				ApplicationFacade.getInstance().sendNotification(CommandName.POPUP_ROOM_NEIGHBOR,{ list: houseList});
			}
		}
		
        public currentHouse:HouseVO;
        public setCurrentHouse(info:any[]){
			if(info && info.length>0){
                this.currentHouse=new HouseVO();
                this.currentHouse.setObject(info[0]);
            }
		}
	}
}