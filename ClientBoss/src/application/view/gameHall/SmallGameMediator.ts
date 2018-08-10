module game {
	export class SmallGameMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "SmallGameMediator";
		public constructor(viewComponent:any){
			super(SmallGameMediator.NAME, viewComponent);
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
			this.sceneGroup.addEventListener(GameSmallGameView.CLOSE,this.closeRequset,this);	
			
		}
		private closeRequset(eve:BasicEvent):void
		{
			ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_SMALL_GAME_PAGE);
		}
		
		public get sceneGroup():GameSmallGameView
        {
			return <GameSmallGameView><any> (this.viewComponent);
		}
	}
}