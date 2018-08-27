module game {
	export class PageNewHouseHuxingMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "PageNewHouseHuxingMediator";
		public constructor(viewComponent:any){
			super(PageNewHouseHuxingMediator.NAME, viewComponent);
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
			this.sceneGroup.addEventListener(PageNewHouseHuxingView.CLOSE,this.closeRequset,this);
			this.sceneGroup.addEventListener(PageNewHouseHuxingView.BUY,this.buyRequset,this);
		}
		private closeRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_POPUP_NEW_HOUSE);
		}
		private buyRequset(eve:BasicEvent):void
		{
			
			if(eve.EventObj){
				let buildingProxy: BuildingProxy = <BuildingProxy><any>this.facade().retrieveProxy(BuildingProxy.NAME);
				buildingProxy.buyHouse(eve.EventObj.build,eve.EventObj.index);
			}
		}
		
		public get sceneGroup():PageNewHouseHuxingView
        {
			return <PageNewHouseHuxingView><any> (this.viewComponent);
		}
	}
}