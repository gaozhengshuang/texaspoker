module game {
	export class PageUserInfoMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "PageUserInfoMediator";
		public constructor(viewComponent:any){
			super(PageUserInfoMediator.NAME, viewComponent);
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
        public get sceneGroup(): PageUserInfoView {
			return <PageUserInfoView><any>(this.viewComponent);
		}
		
	}
}