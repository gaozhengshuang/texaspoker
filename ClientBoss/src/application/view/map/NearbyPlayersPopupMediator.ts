module game {
	export class NearbyPlayersPopupMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "NearbyPlayersPopupMediator";
		public constructor(viewComponent:any){
			super(NearbyPlayersPopupMediator.NAME, viewComponent);
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
			this.sceneGroup.addEventListener(NearbyPlayersPopupPanel.CLOSE,this.closeRequset,this);
			this.sceneGroup.addEventListener(NearbyPlayersPopupPanel.LOOK_ASSES,this.lookAssesRequset,this);
		}
		private closeRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_POPUP);
		}
		private lookAssesRequset(eve:BasicEvent):void
		{
			if(eve.EventObj){
				let houseProxy: HouseProxy = <HouseProxy><any>this.facade().retrieveProxy(HouseProxy.NAME);
				houseProxy.getNearbyPlayersAsses(eve.EventObj.players);
			}
			//ApplicationFacade.getInstance().sendNotification(CommandName.POPUP_NEARBY_ASSES,eve.EventObj);
		}
		public get sceneGroup():NearbyPlayersPopupPanel
        {
			return <NearbyPlayersPopupPanel><any> (this.viewComponent);
		}
	}
}