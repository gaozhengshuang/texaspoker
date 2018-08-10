module game {
	export class MineMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "MineMediator";
		public constructor(viewComponent:any){
			super(MineMediator.NAME, viewComponent);
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
			
			
		}
		
		public get sceneGroup():GameMineView
        {
			return <GameMineView><any> (this.viewComponent);
		}
	}
}