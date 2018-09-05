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
		}
		private closeRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_POPUP);
		}
		
		
		public get sceneGroup():NearbyPlayersPopupPanel
        {
			return <NearbyPlayersPopupPanel><any> (this.viewComponent);
		}
	}
}