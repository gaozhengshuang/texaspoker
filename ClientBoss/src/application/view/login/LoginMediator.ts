module game {
	export class LoginMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "LoginMediator";
		public constructor(viewComponent:any){
			super(LoginMediator.NAME, viewComponent);
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
		private mapProxy:MapProxy;
		private init():void
		{
			
			this.sceneGroup.addEventListener(GameLoginView.LOGIN_REQUEST,this.loginRequset,this);
			this.sceneGroup.addEventListener(GameLoginView.REGISTER_REQUEST,this.loginRegister,this);

		}
		private loginRequset(eve:BasicEvent):void
		{
			if(eve.EventObj!=null)
			{
				GameConfig.logining=true;
				GameConfig.userAccount=eve.EventObj.name;
				GameConfig.userPassword=eve.EventObj.pass;
				ApplicationFacade.getInstance().sendNotification(CommandName.HTTP_REQ_LOGIN,eve.EventObj);
			}
		}
		private loginRegister(eve:BasicEvent):void
		{
			if(eve.EventObj!=null)
			{
				//ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_REGISTER,eve.EventObj);
			}
		}
		public get sceneGroup():GameLoginView
        {
			return <GameLoginView><any> (this.viewComponent);
		}
	}
}