module game {
	export class MapUIMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "MapUIMediator";
		public constructor(viewComponent:any){
			super(MapUIMediator.NAME, viewComponent);
			this.init();
		}
		public listNotificationInterests():Array<any>
        {
            return [
					//CommandName.UPDATE_USER_INFO,
					//CommandName.SHOW_TOP_ROOM_INFO,
					CommandName.SHOW_USER_INFO,
					CommandName.UPDATE_USER_INFO,
					CommandName.SHOW_TOP_ROOM_NUM,
					CommandName.SHOW_TOP_ROOM_BG,
					CommandName.UPDATE_TILI_TIME

            ];
        }
		
		public handleNotification(notification:puremvc.INotification):void
        {
            var data:any = notification.getBody();
			switch(notification.getName())
            {
				case CommandName.UPDATE_USER_INFO:
					{
						if (data) {
							this.sceneGroup.updateUserInfoFun(data);
						}
						break;
					}
					case CommandName.UPDATE_TILI_TIME:
					{
						if (data) {
							this.sceneGroup.updateUserInfoFun(data);
						}
						break;
					}
					/*case CommandName.SHOW_TOP_ROOM_INFO:
					{
						if (data) {
							if(data.isShow){
								this.sceneGroup.showRoomWeizhi(data.isShow,data.room);
							}else{
								this.sceneGroup.showRoomWeizhi(data.isShow);
							}
							
						}
						break;
					}*/
					case CommandName.SHOW_TOP_ROOM_NUM:
					{
						if (data) {
							if(data.isShow){
								this.sceneGroup.showRoomNum(data.isShow,data.rId);
							}else{
								this.sceneGroup.showRoomNum(data.isShow);
							}
							
						}
						break;
					}
					case CommandName.SHOW_TOP_ROOM_BG:
					{
						if (data) {
							if(data.isShow){
								this.sceneGroup.showRoomBg(data.isShow);
							}else{
								this.sceneGroup.showRoomBg(data.isShow);
							}
							
						}
						break;
					}
					case CommandName.SHOW_USER_INFO:
					{
						if (data) {
							this.sceneGroup.showUserInfo(data.isShow);
						}
						break;
					}
			}
		}
		private init():void
		{
			this.sceneGroup.addEventListener(GameMapUIView.OPEN_MAIN_ASSETS,this.openMainAssetsRequset,this);
			this.sceneGroup.addEventListener(GameMapUIView.FUJIN_SWITCH,this.fujinSwitchRequset,this);
			this.sceneGroup.addEventListener(GameMapUIView.MAP_POSITION,this.mapPositionRequset,this);
			this.sceneGroup.addEventListener(GameMapUIView.GOIN_MESSAGE,this.goinMessageRequset,this);
			this.sceneGroup.addEventListener(GameMapUIView.EXPLORE_RETURN,this.exploreReturnRequset,this);
			this.sceneGroup.addEventListener(GameMapUIView.OPEN_TRANSACTION,this.openTransactionRequset,this);
			this.sceneGroup.addEventListener(GameMapUIView.GOTO_HOME,this.goHomeRequset,this);
			this.sceneGroup.addEventListener(GameMapUIView.OPEN_DISCOVERY,this.openDiscoveryRequset,this);
			this.sceneGroup.addEventListener(GameMapUIView.OPEN_MINE,this.openMineRequset,this);
			this.sceneGroup.addEventListener(GameMapUIView.CLOSE_SMALL_GAME,this.closeGameRequset,this);
			this.sceneGroup.addEventListener(GameMapUIView.GOTO_SHOUYI_ROOM,this.gotoShouyiRoomRequset,this);
			this.sceneGroup.addEventListener(GameMapUIView.BUY_HOUSE,this.buyHouseRequset,this);
			this.sceneGroup.addEventListener(GameMapUIView.BUY_CAR,this.buyCarRoomRequset,this);
		}
		private openMainAssetsRequset(eve:BasicEvent):void
		{
			//let userProxy:UserProxy = <UserProxy><any>this.facade().retrieveProxy(UserProxy.NAME);
			 ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_ASSETS_LIST);
			 //ApplicationFacade.getInstance().sendNotification(CommandName.SCENE_MAIN_ASSETS);
			// {gameId:userProxy.getUserInfo().gameId,backType:1});
		}
		private goinMessageRequset(eve:BasicEvent):void
		{
			//ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_MESSAGE_LIST);
		}
		private goHomeRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.GOTO_HOME_PAGE);
		}
		private openDiscoveryRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.SCENE_SWITCH_DISCOVERY);
		}
		private openMineRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.SCENE_SWITCH_MINE);
		}
		private closeGameRequset(eve:BasicEvent):void
		{
			//ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_SMALL_GAME_PAGE);
		}
		private openTransactionRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.SCENE_SWITCH_TRADING);
		}
		private buyHouseRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.PAGE_SWITCH_NEW_HOUSE);
		}
		private buyCarRoomRequset(eve:BasicEvent):void
		{
			openPanel(PanelType.CarShop);
			//激活按钮事件
			GameConfig.setEventsReply(true);
			//关闭主页个人信息界面
			ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: false});
			ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_TOP_ROOM_BG, { isShow: false });
			//隐藏下方菜单栏
			GameConfig.showDownBtnFun(false);
			//请求商店并刷新界面
			CarManager.getInstance().ReqCarShopInfo(1,function(carProducts:msg.ICarProductData[]){
				CarShop.getInstance().UpdateData(carProducts);
			})
		}
		private fujinSwitchRequset(eve:BasicEvent):void
		{
			if(eve.EventObj){
				//ApplicationFacade.getInstance().sendNotification(CommandName.MAP_FUJIN_SWITCH,eve.EventObj);
			}
			
		}
		private exploreReturnRequset(eve:BasicEvent):void
		{
			// if(GameConfig.exploring && GameConfig.explorRId>0){
			// 	ApplicationFacade.getInstance().sendNotification
			// 	(CommandName.SOCKET_REQ_GOIN_ROOM,{rId:GameConfig.explorRId});
			// }
			
		}
		private mapPositionRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.MAP_POSITION);
		}
		private gotoShouyiRoomRequset(eve:BasicEvent):void
		{
			let assetsProxy: AssetsProxy = <AssetsProxy><any>this.facade().retrieveProxy(AssetsProxy.NAME);
			if (assetsProxy.houseAssetsList && assetsProxy.houseAssetsList.length > 0) {
				let getHaveGoldRoom: HouseVO = GetHaveGoldHouse(assetsProxy.houseAssetsList, 1);
				if (getHaveGoldRoom) {
					ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_GOIN_ROOM,
						{ houseid: getHaveGoldRoom.rId });
				} else {
					getHaveGoldRoom = assetsProxy.houseAssetsList[0];
					ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_GOIN_ROOM,
						{ houseid: getHaveGoldRoom.rId });
				}
			}
		}
		public get sceneGroup():GameMapUIView
        {
			return <GameMapUIView><any> (this.viewComponent);
		}
	}
}