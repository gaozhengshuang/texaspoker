module game {
	export class SceneAssetsMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "SceneAssetsMediator";
		public constructor(viewComponent:any){
			super(SceneAssetsMediator.NAME, viewComponent);
			this.init();
		}
		public listNotificationInterests():Array<any>
        {
            return [
					CommandName.MAIN_ASSETS_UPDATE
            ];
        }
		
		public handleNotification(notification:puremvc.INotification):void
        {
            var data:any = notification.getBody();
			switch(notification.getName())
            {
				case CommandName.MAIN_ASSETS_UPDATE:
				{
					if(data){
						
						this.sceneGroup.updateAssetsList(data.roomlist);

					}
				}
					
				break;
			}
		}
		private init():void
		{
			
			this.sceneGroup.addEventListener(GameSceneAssetsView.CLOSE,this.closeRequset,this);
			this.sceneGroup.addEventListener(GameSceneAssetsView.GOIN_ROOM,this.goinRoomRequset,this);
			this.sceneGroup.addEventListener(GameSceneAssetsView.PAGE_SWITCH,this.pageSwitchRequset,this);
		}
		private closeRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_POPUP);
		}
		private goinRoomRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_GOIN_ROOM,eve.EventObj);
			ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_POPUP);
		}
		private pageSwitchRequset(eve:BasicEvent):void
		{
			let assetsProxy: AssetsProxy = <AssetsProxy><any>this.facade().retrieveProxy(AssetsProxy.NAME);
			switch(eve.EventObj.pageIndex){
				case 1:
					this.sceneGroup.updateAssetsList(assetsProxy.houseAssetsList);
				break;
			}
		}
		public get sceneGroup():GameSceneAssetsView
        {
			return <GameSceneAssetsView><any> (this.viewComponent);
		}
	}
}