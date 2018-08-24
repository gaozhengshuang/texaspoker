module game {
	export class PopupWelcomeMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "PopupWelcomeMediator";
		public constructor(viewComponent:any){
			super(PopupWelcomeMediator.NAME, viewComponent);
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
			this.sceneGroup.addEventListener(WelcomeNewPlayersPanel.GOIN_NEW_ROOM,this.newRoomRequset,this);
			this.sceneGroup.addEventListener(WelcomeNewPlayersPanel.CLOSE,this.closeRequset,this);
		}
		private newRoomRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_GOIN_ROOM,eve.EventObj);
		}
		private closeRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_POPUP);
		}
		private get sceneGroup():WelcomeNewPlayersPanel
        {
			return <WelcomeNewPlayersPanel><any> (this.viewComponent);
		}
	}
}