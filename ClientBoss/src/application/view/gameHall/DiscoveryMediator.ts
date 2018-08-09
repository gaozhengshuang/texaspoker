module app {
	export class DiscoveryMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "DiscoveryMediator";
		public constructor(viewComponent:any){
			super(DiscoveryMediator.NAME, viewComponent);
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
			this.sceneGroup.addEventListener(GameDiscoveryView.GOIN_GAME,this.goinGameRequset,this);
			
		}
		private goinGameRequset(eve:BasicEvent):void
		{
			
			//ApplicationFacade.getInstance().sendNotification(CommandName.PAGE_SWITCH_SMALL_GAME,eve.EventObj);
		}
		
		public get sceneGroup():GameDiscoveryView
        {
			return <GameDiscoveryView><any> (this.viewComponent);
		}
	}
}