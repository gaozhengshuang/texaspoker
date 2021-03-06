module game {
	export class NearbyAssesListPopupMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "NearbyAssesListPopupMediator";
		public constructor(viewComponent:any){
			super(NearbyAssesListPopupMediator.NAME, viewComponent);
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
			this.sceneGroup.addEventListener(NearbyAssesListPopupPanel.CLOSE,this.closeRequset,this);
			this.sceneGroup.addEventListener(NearbyAssesListPopupPanel.GOIN_ROOM,this.goinRoomRequset,this);
		}
		private closeRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_POPUP);
		}
		private goinRoomRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_POPUP);
            if(eve.EventObj){
				ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_GOIN_ROOM,
					{ houseid: eve.EventObj.houseid });
			}
		}
		
		public get sceneGroup():NearbyAssesListPopupPanel
        {
			return <NearbyAssesListPopupPanel><any> (this.viewComponent);
		}
	}
}