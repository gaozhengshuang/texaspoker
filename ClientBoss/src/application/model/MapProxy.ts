declare var map;
declare function init(lat: any, lng: any, zoom: number);
declare function moveMap(lat: any, lng: any);
declare function getPoSition(fun: Function, error: Function)
declare function getIpPoSition()
declare function addBuilding(data: any)
declare function addCircle(data: any)
declare function removeCircle();
declare function addPlayerIcon(data: any)
declare function addAreaIcon(data: any)
declare function setBuildCallBackFun(fun: any, body: any)
declare function setPlayerCallBackFun(fun: any, body: any)
declare function setActionCallBackFun(fun: any, body: any)
declare function setEgretEventsReply(bool: boolean);
declare function getRectRangePoint(center, radius);
declare function emptyBuilding();
declare function emptyPlayerIcon();
declare function emptyAreaIcon();
declare function getDistance(start: any, end: any);
declare function removeBuilding(data);
declare function emptyCarExpeditionIcon();
declare function getDistance(start: any, end: any)
declare function addPolyline(data:any); //添加折线(data:{start:{lat,lng},end:{lat,lng}})
declare function removePolylineByCar(id:number|Long);
declare function removePolyline();
declare function addExpeditionCarMarker(data:any);//添加车辆标注(data:{imageUrl:string,start:{lat,lng},end:{lat,lng}})
declare function removeExpeditionCarMarkerById(id:number|Long);
declare function removeExpeditionCarMarker();
declare function showExpeditionState(bool:boolean,datas:msg.ICarData[],content:string[]);
declare function showExpeditionInfoTxt(bool:boolean,content:string);
declare function updateOneExpeditionInfo(datas:msg.ICarData,content:string);
/**
 * 地图代理
 * @author sunboy
 */
module game {

	export class MapProxy extends puremvc.Proxy implements puremvc.IProxy {
		public static NAME: string = "MapProxy";
		public constructor() {
			super(MapProxy.NAME);
		}
		public selfPoint: PointVO = null;
		public currentPoint: PointVO = null;
		public mapStatus: number = 1;
		public mapZoom: number = 16;
		public showRadius: number = 1000;
		public isShowRange:boolean = false;

		/**
	 	* 点击登陆按钮
	 	* 此处只负责接收数据将数据传送至控制器进行逻辑操作
	 	* zw
		*/
		public LoginBtnClick() {
			setBuildCallBackFun(this.buildCallBackFun, null);
			setPlayerCallBackFun(this.playersCallBackFun, null);
			setActionCallBackFun(this.actionCallBackFun, null);
			getPoSition(this.getPos.bind(this), this.showErr.bind(this));

		}
		/**
		 * 地图上添加范围圆
		 */
		public addMapCircle(data: any) {
			addCircle(data);
		}

		/**
		 * 地图上移除范围圆
		 */
		public removeMapCircle() {
			removeCircle();
		}
		/**
		 * 地图上添加建筑
		 */
		public addMapBuilding(dataList: any[]) {
			if (dataList && dataList.length > 0) {
				for (let i: number = 0; i < dataList.length; i++) {
					let data: any = dataList[i];
					let bId = data.Id;
					let bName = data.Community;
					let imageUrl = 'resource/others/images/' + data.Icon;
					let position = [data.PosX, data.PosY];
					let isHas: boolean = false;
					addBuilding({ bId: bId, bName: bName, imageUrl: imageUrl, position: position, isHas: isHas });
				}
			}
		}

		//pointStr = top + "@" + down + "@" + left + "@" + right;
		public addBuilding(range: number = 1000) {
			let RangePoint: string = getRectRangePoint([this.currentPoint.lat, this.currentPoint.lng], range);
			if (RangePoint) {
				let Range: string[] = RangePoint.split("@");
				let build: any[] = table.TBuildings;
				let getBuild: any[] = [];
				for (let i: number = 0; i < build.length; i++) {
					let item: any = build[i];
					if (item.PosX < Number(Range[0]) && item.PosX > Number(Range[1])
						&& item.PosY > Number(Range[2]) && item.PosY < Number(Range[3])) {
						getBuild.push(build[i]);
					}
				}
				if (getBuild && getBuild.length > 0) {
					this.addMapBuilding(getBuild);
				}
			}
		}
		public addPlayers(range: number = 1000) {
			sendMessage("msg.C2GW_ReqNearUsers", msg.C2GW_ReqNearUsers.encode
				({ lat: this.currentPoint.lat, lng: this.currentPoint.lng }));
			NotificationCenter.once(this, this.OnGW2C_AckNearUsers, "msg.GW2C_AckNearUsers");

		}
		public OnGW2C_AckNearUsers(data: msg.GW2C_AckNearUsers) {
			emptyBuilding();
			emptyPlayerIcon();
			if (data && data.data) {
				this.addMapPlayers(data.data);
			}
		}
		/**
		 * 地图上添加玩家图标
		 */
		public addMapPlayers(dataList: msg.IPersonSocialInfo[]) {
			if (dataList && dataList.length > 0) {

				for (let i: number = 0; i < dataList.length; i++) {
					let data: msg.IPersonSocialInfo = dataList[i];
					let gameId = data.id;
					let nickname = data.name;
					let imageUrl = 'resource/assets/mapHeadIcon.png';
					let position = [data.lat, data.lng];
					addPlayerIcon({ info: data, imageUrl: imageUrl, position: position });
				}
			}
		}

		/**
		 * 地图上添加区域图标
		 */
		public addMapAreaIcon(dataList: any[]) {
			if (dataList && dataList.length > 0) {
				for (let i: number = 0; i < dataList.length; i++) {
					let data: any = dataList[i];
					let count: number = data.count;
					let position = [data.lat, data.lng];
					addAreaIcon({ count: count, position: position });
				}
			}
		}

		/**
		 * 玩家本身定位坐标
		 */
		private getPos(position: JSON) {
			let position_str = JSON.stringify(position, null, 4);
			let realobj = eval('(' + position_str + ')');
			//console.log(position_str);
			if (map) {
				moveMap(realobj.lat, realobj.lng);
			}
			else {
				init(realobj.lat, realobj.lng, 16);
			}
			this.postCoordinsteComplete(realobj.lat, realobj.lng);
			//ApplicationFacade.getInstance().sendNotification(CommandName.HTTP_REQ_GOODS_TYPE_LIST);
			//ApplicationFacade.getInstance().sendNotification(CommandName.HTTP_REQ_ROOM_TYPE_LIST);
		}
		private postCoordinsteComplete(lat: number, lng: number) {
			ApplicationFacade.getInstance().sendNotification(CommandName.GET_SELF_COORDINSTE, { lat: lat, lng: lng });
			NotificationCenter.postNotification(CommandName.GET_SELF_COORDINSTE, { lat: lat, lng: lng });
		}

		/**
		 * 玩家重新定位坐标
		 */

		public againPos() {
			getPoSition(this.againGetPos, this.againShowErr);
		}
		public againGetPos(position: JSON) {
			let position_str = JSON.stringify(position, null, 4);
			let realobj = eval('(' + position_str + ')');
			//console.log(position_str);
			sendMessage("msg.C2GW_ReqSetPos", msg.C2GW_ReqSetPos.encode({ lat: realobj.lat, lng: realobj.lng }));
			moveMap(realobj.lat, realobj.lng);
		}
		public moveMapFun(lat, lng) {
			moveMap(lat, lng);
		}
		public showErr() {
			console.log('初始化地图定位错误！！');
			init(31.2303695678711, 121.473701477051, 15);
			this.postCoordinsteComplete(31.2303695678711, 121.473701477051);
			//ApplicationFacade.getInstance().sendNotification(CommandName.GET_SELF_COORDINSTE, { lat: 31.2303695678711, lng: 121.473701477051 });
			//ApplicationFacade.getInstance().sendNotification(CommandName.HTTP_REQ_GOODS_TYPE_LIST);
			//ApplicationFacade.getInstance().sendNotification(CommandName.HTTP_REQ_ROOM_TYPE_LIST);
		}
		public againShowErr() {
			console.log('重新定位地图定位错误！！');
			moveMap(31.2303695678711, 121.473701477051);

		}
		/**
		 * 地图上建筑事件回调
		 */
		public buildCallBackFun(type: string, data: any) {
			//console.log(type);
			//console.log(data);
			setEgretEventsReply(true);
			ApplicationFacade.getInstance().sendNotification(CommandName.MAP_BUILDING_INFO, { bId: data.bId });

		}
		/**
		 * 地图上玩家事件回调
		 */
		public playersCallBackFun(type: string, data: any) {
			//console.log(type);
			//console.log(data);
			setEgretEventsReply(true);

			ApplicationFacade.getInstance().sendNotification(CommandName.POPUP_NEARBY_INFO, { players: data });

		}
		/**
		 * 地图上得到中心点半径范围
		 */
		public getRangePoint(center: number[], radius: number) {
			return getRectRangePoint(center, radius)
		}
		/**
		 * 地图上清除Marker覆盖物
		 */
		public emptyMapMarker(index: number) {
			if (index == 1) {
				emptyBuilding();
			} else if (index == 2) {
				emptyPlayerIcon();
			}
		}

		/**
		 * 地图上清除Marker覆盖物
		 */
		public emptyAreaIconFun() {
			emptyAreaIcon();
		}

		/**
		 * 地图上事件回调
		 */
		public actionCallBackFun(type: string, data: any) {

			ApplicationFacade.getInstance().sendNotification(CommandName.MAP_ACTION, { type: type, content: data });
		}

		/*public getProvinceId(data:any){
			GameConfig.getCityNameFun(data.lat, data.lng, function (data: any[]) {
                        //replace.sendPos(data);
                    })

		}

		public getCityId(data:any){
			GameConfig.getCityNameFun(data.lat, data.lng, function (data: any[]) {
                        //replace.sendPos(data);
                    })
		}*/
	}
}
