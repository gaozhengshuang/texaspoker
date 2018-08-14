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
		}
		private openMainAssetsRequset(eve:BasicEvent):void
		{
			//let userProxy:UserProxy = <UserProxy><any>this.facade().retrieveProxy(UserProxy.NAME);
			 ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_ASSETS_LIST);
			 ApplicationFacade.getInstance().sendNotification(CommandName.SCENE_MAIN_ASSETS);
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
			//ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_SALE_ROOM_LIST,{action:1});
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
		public get sceneGroup():GameMapUIView
        {
			return <GameMapUIView><any> (this.viewComponent);
		}
	}
}