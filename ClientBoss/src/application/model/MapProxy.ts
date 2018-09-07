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
declare function emptyCarExpeditionIcon();
declare function getDistance(start: any, end: any)
declare function addPolyline(data:any); //添加折线(data:{start:{lat,lng},end:{lat,lng}})
declare function removePolylineByCar(id:number|Long);
declare function removePolyline();
declare function addExpeditionCarMarker(data:any);//添加车辆标注(data:{imageUrl:string,start:{lat,lng},end:{lat,lng}})
declare function removeExpeditionCarMarkerById(id:number|Long);
declare function removeExpeditionCarMarker();
declare function showExpeditionStateBtn(bool:boolean,datas:msg.ICarData[]);
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
			getPoSition(this.getPos, this.showErr);

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
		/*public addMapBuilding(dataList: any[], players: UserVO) {
			if (dataList && dataList.length > 0) {
				for (let i: number = 0; i < dataList.length; i++) {
					let data: BuildingVO = dataList[i];
					let bId = data.bId;
					let bName = data.bName;
					let imageUrl = 'resource/assets/' + data.bImage1 + '.png';
					let position = [data.lat, data.lng];
					let isHas: boolean = false;
					if (players.bId.indexOf(data.bId) != -1) {
						isHas = true;
					}

					addBuilding({ bId: bId, bName: bName, imageUrl: imageUrl, position: position, isHas: isHas });
				}
			}
		}*/
		public addMapBuilding(dataList: any[]) {
			if (dataList && dataList.length > 0) {
				for (let i: number = 0; i < dataList.length; i++) {
					let data: any = dataList[i];
					let bId = data.Id;
					let bName = data.Community;
					let imageUrl = 'resource/others/images/build_'+data.CommunityId + '_m.png';
					let position = [data.PosX, data.PosY];
					let isHas: boolean = false;
					addBuilding({ bId: bId, bName: bName, imageUrl: imageUrl, position: position, isHas: isHas });
				}
			}
		}

		/**
		 * 地图上添加玩家图标
		 */
		public addMapPlayers(dataList: UserVO[]) {
			if (dataList && dataList.length > 0) {

				for (let i: number = 0; i < dataList.length; i++) {
					let data: UserVO = dataList[i];
					let gameId = data.gameId;
					let nickname = data.nickname;
					let imageUrl = 'resource/assets/mapHeadIcon.png';
					let position = [data.lat, data.lng];
					addPlayerIcon({ gameId: gameId, nickname: nickname, imageUrl: imageUrl, position: position });
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
			
			ApplicationFacade.getInstance().sendNotification(CommandName.GET_SELF_COORDINSTE, { lat: realobj.lat, lng: realobj.lng });
			//ApplicationFacade.getInstance().sendNotification(CommandName.HTTP_REQ_GOODS_TYPE_LIST);
			//ApplicationFacade.getInstance().sendNotification(CommandName.HTTP_REQ_ROOM_TYPE_LIST);
		}

		//pointStr = top + "@" + down + "@" + left + "@" + right;
		public addBuilding(){
			let RangePoint:string= getRectRangePoint([this.currentPoint.lat,this.currentPoint.lng],2000);
			if(RangePoint){
				let Range:string[]=RangePoint.split("@");
				let build:any[]=table.TBuildings;
				let getBuild:any[]=[];
				for(let i:number=0;i<build.length;i++){
					let item:any=build[i];
/* 					if(item.PosX<Number(Range[0]) && item.PosX>Number(Range[1]) 
					&& item.PosY>Number(Range[2]) && item.PosY<Number(Range[3])) */
					{
						getBuild.push(build[i]);
					}
				}
				if(getBuild && getBuild.length>0){
					this.addMapBuilding(getBuild);
				}
			}
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
			moveMap(realobj.lat, realobj.lng);
		}
		public moveMapFun(lat, lng) {
			moveMap(lat, lng);
		}
		public showErr() {
			console.log('初始化地图定位错误！！');
			init(31.2303695678711, 121.473701477051, 15);
			ApplicationFacade.getInstance().sendNotification(CommandName.GET_SELF_COORDINSTE, { lat: 31.2303695678711, lng: 121.473701477051 });
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
			ApplicationFacade.getInstance().sendNotification(CommandName.POPUP_NEW_MAP_BUILDING, { buildingId: data.bId });

		}
		/**
		 * 地图上玩家事件回调
		 */
		public playersCallBackFun(type: string, data: any) {
			//console.log(type);
			//console.log(data);
			setEgretEventsReply(true);

			//ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_LOOK_NEARBY_INFO, { pId: data.gameId });

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
	}
}