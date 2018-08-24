module game {
	export class MapContentMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "MapContentMediator";
		public constructor(viewComponent:any){
			super(MapContentMediator.NAME, viewComponent);
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
			//this.sceneGroup.initView();
		}
	}
}