
module game {
    /**
     * 游戏中介器
     */
    export class SceneMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "SceneMediator";

        public constructor(viewComponent: any) {
            super(SceneMediator.NAME, viewComponent);
        }

        public sceneMediatorName: string = "";
        private _lastPanelView: PanelComponent | GameMapContentView;
        private _gameMapView: GameMapContentView;
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
            if (notification.getName() != CommandName.SCENE_MAIN_ASSETS) {
                CarDetailView.getInstance().OnCloseHandle();
            }
            switch (notification.getName()) {
                case CommandName.SCENE_SWITCH_LOGIN:
                    {
                        // this.removeSceneView();
                        // GameConfig.showDownBtnFun(false);
                        // GameConfig.sceneType = 1;
                        // GameConfig.updataMaskBgFun('#f5f5f5', 1);
                        // this.sceneView = new GameLoginView();
                        // this.sceneGroup.addChild(this.sceneView);
                        //this.sceneView.x = GameConfig.innerWidth / 2; //pre
                        //this.sceneView.y = GameConfig.innerHeight / 2; //pre
                        // ApplicationFacade.getInstance().registerMediator(new LoginMediator(this.sceneView));
                        // this.sceneMediatorName = LoginMediator.NAME;
                        // ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: false });
                        break;
                    }
                case CommandName.SCENE_SWITCH_MAP:
                    {
                        this.removeSceneView();
                        GameConfig.showDownBtnFun(true);
                        GameConfig.sceneType = 2;
                        GameConfig.updataMaskBgFun('#f5f5f5', 0);
                        GameConfig.setEventsReply(false);
                        if (!this._gameMapView) {
                            this._gameMapView = new GameMapContentView();
                        }
                        // this.sceneGroup.addChild(view);
                        this._gameMapView.clear();
                        this._gameMapView.initView();
                        this._lastPanelView = this._gameMapView;
                        // ApplicationFacade.getInstance().registerMediator(new MapContentMediator(this._lastPanelView));
                        ApplicationFacade.getInstance().registerMdt<MapContentMediator>(MapContentMediator.NAME, MapContentMediator, this._lastPanelView);

                        this.sceneMediatorName = MapContentMediator.NAME;
                        ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_UPDATED_POINT, { require: 1 });
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: true });
                        break;
                    }
                case CommandName.SCENE_MAIN_ASSETS:
                    {
                        GameConfig.updataMaskBgFun('#E5E6E6', 1);
                        this.removeSceneView();
                        GameConfig.showDownBtnFun(true);

                        GameConfig.sceneType = 3;
                        GameConfig.setEventsReply(true);

                        openPanel(PanelType.GameSceneAssetsView);
                        this._lastPanelView = GameSceneAssetsView.getInstance();
                        // ApplicationFacade.getInstance().registerMediator(new SceneAssetsMediator(this._lastPanelView));
                        ApplicationFacade.getInstance().registerMdt<SceneAssetsMediator>(SceneAssetsMediator.NAME, SceneAssetsMediator, this._lastPanelView);

                        this.sceneMediatorName = SceneAssetsMediator.NAME;

                        if (data) { GameSceneAssetsView.getInstance().updateAssetsList(data.roomlist); }

                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: false });
                        break;
                    }
                case CommandName.SCENE_SWITCH_TRADING:
                        GameConfig.updataMaskBgFun('#FFFFFF', 1);
                        this.removeSceneView();
                        GameConfig.showDownBtnFun(true);
                        GameConfig.sceneType = 4;
                        GameConfig.setEventsReply(true);
                        openPanel(PanelType.GameDiscoveryView);
                        this._lastPanelView = GameDiscoveryView.getInstance();
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: false });
                        break;
                case CommandName.SCENE_SWITCH_DISCOVERY:
                    {
                        GameConfig.updataMaskBgFun('#FFFFFF', 1);
                        this.removeSceneView();
                        GameConfig.showDownBtnFun(true);
                        //if (data) {
                        let smallGameProxy: SmallGameProxy = <SmallGameProxy><any>this.facade().retrieveProxy(SmallGameProxy.NAME);
                        GameConfig.sceneType = 5;
                        GameConfig.setEventsReply(true);
                        openPanel(PanelType.GameDiscoveryView);
                        this._lastPanelView = GameDiscoveryView.getInstance();

                        // ApplicationFacade.getInstance().registerMediator(new DiscoveryMediator(this._lastPanelView));
                        ApplicationFacade.getInstance().registerMdt<DiscoveryMediator>(DiscoveryMediator.NAME, DiscoveryMediator, this._lastPanelView);

                        this.sceneMediatorName = DiscoveryMediator.NAME;
                        GameDiscoveryView.getInstance().initGameList(smallGameProxy.getSmallGame());
                        //}
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: false });
                        break;
                    }
                case CommandName.SCENE_SWITCH_MINE:
                    {
                        GameConfig.updataMaskBgFun('#E5E6E6', 1);
                        this.removeSceneView();
                        GameConfig.showDownBtnFun(true);
                        //if (data) {
                        let userProxy: UserProxy = <UserProxy><any>this.facade().retrieveProxy(UserProxy.NAME);
                        GameConfig.sceneType = 6;
                        GameConfig.setEventsReply(true);

                        openPanel(PanelType.GameMineView);
                        this._lastPanelView = GameMineView.getInstance();
                        // ApplicationFacade.getInstance().registerMediator(new MineMediator(this._lastPanelView));
                        ApplicationFacade.getInstance().registerMdt<MineMediator>(MineMediator.NAME, MineMediator, this._lastPanelView);

                        this.sceneMediatorName = MineMediator.NAME;
                        GameMineView.getInstance().updateView(userProxy.getUserInfo());
                        //}
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: false });
                        break;
                    }
                case CommandName.GOTO_HOME_PAGE:
                    {
                        if (GameConfig.sceneType != 2) {
                            this.removeSceneView();
                            GameConfig.showDownBtnFun(true);
                            GameConfig.sceneType = 2;
                            GameConfig.updataMaskBgFun('#f5f5f5', 0);
                            GameConfig.setEventsReply(false);
                            ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: true });
                        }
                        break;
                    }
            }

        }

        private removeSceneView(): void {
            if (this._lastPanelView instanceof PanelComponent) {
                this._lastPanelView.remove();
            }
            else {
                if (this._lastPanelView instanceof GameMapContentView) {
                    this._lastPanelView.clear();
                }
            }
            if (this.sceneMediatorName != "") {
                ApplicationFacade.getInstance().removeMediator(this.sceneMediatorName);
            }
            ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_POPUP);
            ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_TOP_ROOM_INFO, { isShow: false });
        }
    }
}