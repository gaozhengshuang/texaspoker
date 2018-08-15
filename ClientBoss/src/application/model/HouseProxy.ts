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
			NotificationCenter.addObserver(this, this.OnGW2C_AckTakeSelfHouseGoldRet, "msg.GW2C_AckTakeSelfHouseGoldRet");
			NotificationCenter.addObserver(this, this.OnGW2C_AckTakeOtherHouseGoldRet, "msg.GW2C_AckTakeOtherHouseGoldRet");
			NotificationCenter.addObserver(this, this.OnGW2C_AckHouseLevelUp, "msg.GW2C_AckHouseLevelUp");
			NotificationCenter.addObserver(this, this.OnGW2C_AckHouseCellLevelUp, "msg.GW2C_AckHouseCellLevelUp");
			
        }
		private OnGW2C_AckHouseData(data: msg.GW2C_AckHouseData) {
			if(GameConfig.pageType==1){
				//this.updateRoomInfo(data.datas);
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
		private OnGW2C_AckTakeSelfHouseGoldRet(data: msg.GW2C_AckTakeSelfHouseGoldRet) {
			ApplicationFacade.getInstance().sendNotification(CommandName.RECEIVE_SUCCESS, 
			{houseid:data.houseid, index:data.index,gold:data.gold});
			this.updateRoomInfo(data.data);
		}
		private OnGW2C_AckTakeOtherHouseGoldRet(data: msg.GW2C_AckTakeOtherHouseGoldRet) {
			ApplicationFacade.getInstance().sendNotification(CommandName.PLUNDER_SUCCESS, 
			{houseid:data.houseid, index:data.index,gold:data.gold});
			this.updateRoomInfo(data.data);
		}
		private OnGW2C_AckHouseLevelUp(data: msg.GW2C_AckHouseLevelUp) {
			ApplicationFacade.getInstance().sendNotification(CommandName.HOUSE_LEVEL_SUCCESS, 
			{houseid:data.houseid,ret:data.ret,index:0});
			this.updateRoomInfo(data.data);
		}
		private OnGW2C_AckHouseCellLevelUp(data: msg.GW2C_AckHouseCellLevelUp) {
			ApplicationFacade.getInstance().sendNotification(CommandName.ROOM_LEVEL_SUCCESS, 
			{houseid:data.houseid, index:data.index,ret:data.ret});
			this.updateRoomInfo(data.data);
		}
		private updateRoomInfo(datas: any) {
			this.currentHouse.setObject(datas);
			console.log(datas);
			console.log(this.currentHouse);
			ApplicationFacade.getInstance().sendNotification(CommandName.UPDATE_ROOM_INFO, { room: this.currentHouse });
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