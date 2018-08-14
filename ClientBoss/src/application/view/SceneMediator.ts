
module game {
    /**
     * 游戏中介器
     */
    export class SceneMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "SceneMediator";

        public constructor(viewComponent: any) {
            super(SceneMediator.NAME, viewComponent);
        }

        public sceneView: any;
        public sceneMediatorName: string = "";
        public listNotificationInterests(): Array<any> {
            return [
                CommandName.SCENE_SWITCH_LOGIN,
                CommandName.SCENE_SWITCH_MAP,
                CommandName.SCENE_SWITCH_DISCOVERY,
                CommandName.SCENE_SWITCH_MINE,
                CommandName.SCENE_MAIN_ASSETS,
                CommandName.GOTO_HOME_PAGE,

            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case CommandName.SCENE_SWITCH_LOGIN:
                    {
                        this.removeSceneView();
                        GameConfig.showDownBtnFun(false);
                        GameConfig.sceneType = 1;
                        GameConfig.updataMaskBgFun('#f5f5f5', 1);
                        this.sceneView = new GameLoginView();
                        this.sceneGroup.addChild(this.sceneView);
                        this.sceneView.x = GameConfig.innerWidth / 2;
                        this.sceneView.y = GameConfig.innerHeight / 2;
                        ApplicationFacade.getInstance().registerMediator(new LoginMediator(this.sceneView));
                        this.sceneMediatorName = LoginMediator.NAME;
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO,{isShow:false});
                        break;
                    }
                case CommandName.SCENE_SWITCH_MAP:
                    {
                        this.removeSceneView();
                        GameConfig.showDownBtnFun(true);
                        GameConfig.sceneType = 2;
                        GameConfig.updataMaskBgFun('#f5f5f5', 0);
                        GameConfig.setEventsReply(false);
                        this.sceneView = new GameMapContentView();
                        this.sceneGroup.addChild(this.sceneView);
                        this.sceneView.initView();
                        ApplicationFacade.getInstance().registerMediator(new MapContentMediator(this.sceneView));
                        this.sceneMediatorName = MapContentMediator.NAME;
                        ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_UPDATED_POINT, { require: 1 });
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO,{isShow:true});
                        break;
                    }
                    case CommandName.SCENE_MAIN_ASSETS:
                    {
                        GameConfig.updataMaskBgFun('#404A58', 1);
                        this.removeSceneView();
                        GameConfig.showDownBtnFun(true);
                        if (data) {
                            GameConfig.sceneType = 3;
                            GameConfig.setEventsReply(true);
                            this.sceneView = new GameSceneAssetsView();
                            this.sceneGroup.addChild(this.sceneView);
                            ApplicationFacade.getInstance().registerMediator(new SceneAssetsMediator(this.sceneView));
							this.sceneMediatorName = SceneAssetsMediator.NAME;
                            this.sceneView.updateAssetsList(data.roomlist);
                        }
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO,{isShow:false});
                        break;
                    }
                    case CommandName.SCENE_SWITCH_DISCOVERY:
                    {
                        GameConfig.updataMaskBgFun('#404A58', 1);
                        this.removeSceneView();
                        GameConfig.showDownBtnFun(true);
                        //if (data) {
                            let smallGameProxy: SmallGameProxy = <SmallGameProxy><any>this.facade().retrieveProxy(SmallGameProxy.NAME);
                            GameConfig.sceneType = 5;
                            GameConfig.setEventsReply(true);
                            this.sceneView = new GameDiscoveryView();
                            this.sceneGroup.addChild(this.sceneView);
                            ApplicationFacade.getInstance().registerMediator(new DiscoveryMediator(this.sceneView));
							this.sceneMediatorName = DiscoveryMediator.NAME;
                            this.sceneView.initGameList(smallGameProxy.getSmallGame());
                        //}
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO,{isShow:false});
                        break;
                    }
                    case CommandName.SCENE_SWITCH_MINE:
                    {
                        GameConfig.updataMaskBgFun('#404A58', 1);
                        this.removeSceneView();
                        GameConfig.showDownBtnFun(true);
                        //if (data) {
                            //let userProxy: UserProxy = <UserProxy><any>this.facade().retrieveProxy(UserProxy.NAME);
                            GameConfig.sceneType = 6;
                            GameConfig.setEventsReply(true);
                            this.sceneView = new GameMineView();
                            this.sceneGroup.addChild(this.sceneView);
                            ApplicationFacade.getInstance().registerMediator(new MineMediator(this.sceneView));
							this.sceneMediatorName = MineMediator.NAME;
                            this.sceneView.updateView(game.DataManager.playerModel.getUserInfo());
                        //}
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO,{isShow:false});
                        break;
                    }
                    case CommandName.GOTO_HOME_PAGE:
                    {
                        if(GameConfig.sceneType!=2){
                            this.removeSceneView();
                            GameConfig.showDownBtnFun(true);
                            GameConfig.sceneType = 2;
                            GameConfig.updataMaskBgFun('#f5f5f5', 0);
                            GameConfig.setEventsReply(false);
                            ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO,{isShow:true});
                        }
                        break;
                    }
            }

        }

        private removeSceneView(): void {
            this.sceneGroup.removeChildren();
            if (this.sceneMediatorName != "") {
                ApplicationFacade.getInstance().removeMediator(this.sceneMediatorName);
            }
        }

        public get sceneGroup(): egret.Sprite {
            return <egret.Sprite><any>(this.viewComponent);
        }
    }
}