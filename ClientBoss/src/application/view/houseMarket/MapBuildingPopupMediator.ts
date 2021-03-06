module game {
	export class MapBuildingPopupMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "MapBuildingPopupMediator";
		public constructor(viewComponent:any){
			super(MapBuildingPopupMediator.NAME, viewComponent);
			this.init();
		}
		public listNotificationInterests():Array<any>
        {
            return [
					
            ];
        }
		
		public handleNotification(notification:puremvc.INotification):void
        {
            var data:any = notification.getBody();
			switch(notification.getName())
            {
				

			}
		}
		private init():void
		{
			this.sceneGroup.addEventListener(MapBuildingPopupPanel.CLOSE,this.closeRequset,this);
			this.sceneGroup.addEventListener(MapBuildingPopupPanel.BUY_FANG,this.buyRequset,this);
			this.sceneGroup.addEventListener(MapBuildingPopupPanel.OPEN_ZHUHU_LIST,this.zhuhuListRequset,this);
		}
		private closeRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_POPUP);
		}
		private buyRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_POPUP);
            if(eve.EventObj){
				ApplicationFacade.getInstance().sendNotification(CommandName.POPUP_NEW_HOUSE_HUXING,
				{bId:eve.EventObj.bId, sales:eve.EventObj.sales});
				//let buildingProxy: BuildingProxy = <BuildingProxy><any>this.facade().retrieveProxy(BuildingProxy.NAME);
				//buildingProxy.getSalesInfo(eve.EventObj.build,2);
			}
		}
		private zhuhuListRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_POPUP);
			if(eve.EventObj){
				ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_NEIGHBOR_LIST,eve.EventObj);
				//let buildingProxy: BuildingProxy = <BuildingProxy><any>this.facade().retrieveProxy(BuildingProxy.NAME);
				//buildingProxy.getSalesInfo(eve.EventObj.build,2);
			}

		}
		
		public get sceneGroup():MapBuildingPopupPanel
        {
			return <MapBuildingPopupPanel><any> (this.viewComponent);
		}
	}
}