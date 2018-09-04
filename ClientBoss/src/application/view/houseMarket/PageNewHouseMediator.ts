module game {
	export class PageNewHouseMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "PageNewHouseMediator";
		public constructor(viewComponent:any){
			super(PageNewHouseMediator.NAME, viewComponent);
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
					
				}
					
				break;
			}
		}
		private init():void
		{
			this.sceneGroup.addEventListener(PageNewHouseView.CLOSE,this.closeRequset,this);
			this.sceneGroup.addEventListener(PageNewHouseView.LOOK_HUXING,this.lookHuxingRequset,this);
		}
		private closeRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_ROOM_PAGE);
		}
		private lookHuxingRequset(eve:BasicEvent):void
		{
			if(eve.EventObj){
				let buildingProxy: BuildingProxy = <BuildingProxy><any>this.facade().retrieveProxy(BuildingProxy.NAME);
				buildingProxy.getSalesInfo(eve.EventObj.building,1);
			}
			
			//ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_ROOM_PAGE);

		}
		
		public get sceneGroup():PageNewHouseView
        {
			return <PageNewHouseView><any> (this.viewComponent);
		}
	}
}