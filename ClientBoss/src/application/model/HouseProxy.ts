/**
 * 房产代理
 * @author sunboy
 */
module game {

	export class HouseProxy extends puremvc.Proxy implements puremvc.IProxy {
		public static NAME: string = "HouseProxy";
		public constructor() {
			super(HouseProxy.NAME);
			this.RegisterEvent();
		}
		/**
		 * 回到哪里去，from: 0:回到地图，1:我的房间，2:附近人信息，3:客房列表
		 */
		public sourceObject: any = { form: 0, param: null };

		public returnRoomInfo: HouseVO = null;
		public returnPlayersId: number = 0;
		public returnType: number = 0;

		public RegisterEvent() {
			NotificationCenter.addObserver(this, this.OnGW2C_AckOtherUserHouseData, "msg.GW2C_AckOtherUserHouseData");
			NotificationCenter.addObserver(this, this.OnGW2C_AckRandHouseList, "msg.GW2C_AckRandHouseList");
			NotificationCenter.addObserver(this, this.OnGW2C_AckHouseData, "msg.GW2C_AckHouseData");
			NotificationCenter.addObserver(this, this.OnGW2C_AckTakeSelfHouseGoldRet, "msg.GW2C_AckTakeSelfHouseGoldRet");
			NotificationCenter.addObserver(this, this.OnGW2C_AckTakeOtherHouseGoldRet, "msg.GW2C_AckTakeOtherHouseGoldRet");
			NotificationCenter.addObserver(this, this.OnGW2C_AckHouseLevelUp, "msg.GW2C_AckHouseLevelUp");
			NotificationCenter.addObserver(this, this.OnGW2C_AckHouseCellLevelUp, "msg.GW2C_AckHouseCellLevelUp");
			NotificationCenter.addObserver(this, this.OnGW2C_AckHouseDataByHouseId, "msg.GW2C_AckHouseDataByHouseId");

		}
		private OnGW2C_AckHouseDataByHouseId(data: msg.GW2C_AckHouseDataByHouseId) {
			if (GameConfig.sceneType != 7) {
				this.setCurrentHouse(data.data);
				ApplicationFacade.getInstance().sendNotification(CommandName.PAGE_SWITCH_ROOM, { room: this.currentHouse });
			}
		}
		private OnGW2C_AckHouseData(data: msg.GW2C_AckHouseData) {
			if (GameConfig.pageType == 1) {
				this.updateRoomInfo(data.datas[0]);
			}
		}
		private OnGW2C_AckOtherUserHouseData(data: msg.GW2C_AckOtherUserHouseData) {
			//this.setCurrentHouse(data.datas);
			if (data && data.datas && data.datas.length > 0) {
				let otherHouse: HouseVO[] = []
				for (let i: number = 0; i < data.datas.length; i++) {
					let item: HouseVO = new HouseVO();
					item.setObject(data.datas[i]);
					otherHouse.push(item);
				}
				if (otherHouse && otherHouse.length > 0) {
					let house: HouseVO = GetHaveGoldHouse(otherHouse, 1);
					if (house != null) {
						//this.setCurrentHouse(house);
						this.currentHouse = house;
					} else {
						//this.setCurrentHouse(otherHouse[0]);
						this.currentHouse = house;
					}
					ApplicationFacade.getInstance().sendNotification(CommandName.PAGE_SWITCH_ROOM, { room: this.currentHouse });
				}
			}
		}
		public linjuList: any[] = [];
		private OnGW2C_AckRandHouseList(data: msg.GW2C_AckRandHouseList) {
			if (data.datas && data.datas.length > 0) {
				//房屋邻居列表
				let houseList: HouseVO[] = [];
				for (let i: number = 0; i < data.datas.length; i++) {
					let house: HouseVO = new HouseVO();
					house.setObject(data.datas[i]);
					houseList.push(house);
				}
				//console.log("收到随机邻居列表------>",data.datas2.length,"  ",JSON.stringify(data.datas2));
				//自己车停放的车位邻居列表
				let carHouseList = data.datas2.map(data => {
					let house: HouseVO = new HouseVO();
					house.setObject(data);
					return house;
				});
				//去掉重复
				carHouseList = carHouseList.concat(houseList.filter(data => { return !carHouseList.some(idata => { return data.rId == idata.rId; }) }));

				this.linjuList = houseList;
				ApplicationFacade.getInstance().sendNotification(CommandName.POPUP_ROOM_NEIGHBOR, { list: houseList });
				CarDetailView.getInstance().showLinjuList(carHouseList);
			}
		}
		private OnGW2C_AckTakeSelfHouseGoldRet(data: msg.GW2C_AckTakeSelfHouseGoldRet) {
			if (data && data.gold && data.gold > 0) {
				ApplicationFacade.getInstance().sendNotification(CommandName.RECEIVE_SUCCESS,
					{ houseid: data.houseid, index: data.index, gold: data.gold, items: data.items });
				this.updateRoomInfo(data.data);
			} else {
				showTips("领取失败！");
			}

		}
		private OnGW2C_AckTakeOtherHouseGoldRet(data: msg.GW2C_AckTakeOtherHouseGoldRet) {
			if (data && data.gold && data.gold > 0) {
				ApplicationFacade.getInstance().sendNotification(CommandName.PLUNDER_SUCCESS,
					{ houseid: data.houseid, index: data.index, gold: data.gold, items: data.items });
				this.updateRoomInfo(data.data);
			} else {
				showTips("掠夺失败！");
			}
		}
		private OnGW2C_AckHouseLevelUp(data: msg.GW2C_AckHouseLevelUp) {
			if (data && data.ret && data.ret > 0) {
				ApplicationFacade.getInstance().sendNotification(CommandName.HOUSE_LEVEL_SUCCESS,
					{ houseid: data.houseid, ret: data.ret, index: 0 });
				this.updateRoomInfo(data.data);
			} else {
				showTips("升级失败！");
			}
		}
		private OnGW2C_AckHouseCellLevelUp(data: msg.GW2C_AckHouseCellLevelUp) {
			if (data && data.ret && data.ret > 0) {
				ApplicationFacade.getInstance().sendNotification(CommandName.ROOM_LEVEL_SUCCESS,
					{ houseid: data.houseid, index: data.index, ret: data.ret });
				this.updateRoomInfo(data.data);
			} else {
				showTips("升级失败！");
			}
		}
		private updateRoomInfo(datas: any) {
			if (datas.id == this.currentHouse.rId) {
				this.currentHouse.setObject(datas);
				console.log(datas);
				console.log(this.currentHouse);
				ApplicationFacade.getInstance().sendNotification(CommandName.UPDATE_ROOM_INFO, { room: this.currentHouse });
			}
		}

		public currentHouse: HouseVO;
		public selfHouse: HouseVO;
		public setCurrentHouse(info: any) {
			this.currentHouse = new HouseVO();
			this.currentHouse.setObject(info);
			if (info.ownerid == DataManager.playerModel.getUserInfo().userid) {
				this.setSelfHouse(info);
			}
		}
		public setSelfHouse(house: any) {
			if (house) {
				this.selfHouse = new HouseVO();
				this.selfHouse.setObject(house);
				//this.updateSelfDongtaiList(this.selfHouse.visitinfo);
			}
		}

		public selfDongtaiList: any[]
		public updateSelfDongtaiList(list: any[]) {
			if (this.selfDongtaiList && list.length > this.selfDongtaiList.length) {
				ApplicationFacade.getInstance().sendNotification(CommandName.HAVE_NEW_DONGTAI);
			}
			this.selfDongtaiList = list;
		}
	}
}