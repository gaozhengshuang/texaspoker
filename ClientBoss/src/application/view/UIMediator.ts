
module app {
    /**
     * 游戏UI中介器
     */
	export class UIMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "UIMediator";
		
		public constructor(viewComponent:any){
			super(UIMediator.NAME, viewComponent);
		}
		
		public uiView:any;
        public uiMediatorName:string="";
		public listNotificationInterests():Array<any>{
			return [
				CommandName.SCENE_SWITCH_LOGIN,
                CommandName.SCENE_SWITCH_MAP
			];
		}
		
		public handleNotification(notification:puremvc.INotification):void{
			var data:any = notification.getBody();
			switch(notification.getName()){
                case CommandName.SCENE_SWITCH_LOGIN:
                {
                    this.removeSceneView();
                    break;
                }
				case CommandName.SCENE_SWITCH_MAP:
                {
                    this.removeSceneView();
                    this.uiView =new GameMapUIView();
                    //var userProxy:UserProxy = <UserProxy><any>this.facade().retrieveProxy(UserProxy.NAME);
                    this.uiView.initView(game.DataManager.playerModel.getUserInfo());
                    this.sceneGroup.addChild(this.uiView);
                    ApplicationFacade.getInstance().registerMediator(new MapUIMediator(this.uiView));
                    this.uiMediatorName=MapUIMediator.NAME;
                    break;
                }
            }
			
		}
		private removeSceneView():void
        {
            this.sceneGroup.removeChildren();
            if(this.uiMediatorName!="")
            {
                ApplicationFacade.getInstance().removeMediator(this.uiMediatorName);
            }
        }
		public get sceneGroup(): egret.Sprite {
			return <egret.Sprite><any>(this.viewComponent);
		}
	}
}