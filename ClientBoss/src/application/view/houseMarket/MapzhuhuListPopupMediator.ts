module game {
	export class MapzhuhuListPopupMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "MapzhuhuListPopupMediator";
		public constructor(viewComponent:any){
			super(MapzhuhuListPopupMediator.NAME, viewComponent);
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
			this.sceneGroup.addEventListener(MapzhuhuListPopupPanel.CLOSE,this.closeRequset,this);
			this.sceneGroup.addEventListener(MapzhuhuListPopupPanel.GOIN_ZHUHU_ROOM,this.goinRoomRequset,this);
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
		
		public get sceneGroup():MapzhuhuListPopupPanel
        {
			return <MapzhuhuListPopupPanel><any> (this.viewComponent);
		}
	}
}