
module game {
    /**
     * 游戏UI中介器
     */
    export class UIMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "UIMediator";

        public constructor(viewComponent: any) {
            super(UIMediator.NAME, viewComponent);
        }

        public uiView: GameMapUIView;
        public uiMediatorName: string = "";
        public listNotificationInterests(): Array<any> {
            return [
                CommandName.SCENE_SWITCH_LOGIN,
                CommandName.SCENE_SWITCH_MAP
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case CommandName.SCENE_SWITCH_LOGIN:
                    {
                        this.removeSceneView();
                        break;
                    }
                case CommandName.SCENE_SWITCH_MAP:
                    {
                        this.removeSceneView();
                        if (!this.uiView) {
                            this.uiView = new GameMapUIView();
                        }
                        //var userProxy:UserProxy = <UserProxy><any>this.facade().retrieveProxy(UserProxy.NAME);
                        (this.uiView as GameMapUIView).clear();
                        this.uiView.initView(game.DataManager.playerModel.getUserInfo());
                        // this.sceneGroup.addChild(this.uiView);
                        // ApplicationFacade.getInstance().registerMediator(new MapUIMediator(this.uiView));
                        ApplicationFacade.getInstance().registerMdt<MapUIMediator>(MapUIMediator.NAME, MapUIMediator, this.uiView);

                        this.uiMediatorName = MapUIMediator.NAME;
                        break;
                    }
            }

        }
        private removeSceneView(): void {
            if(this.uiView)
            {
                this.uiView.clear();
            }
            if (this.uiMediatorName != "") {
                ApplicationFacade.getInstance().removeMediator(this.uiMediatorName);
            }
        }
    }
}