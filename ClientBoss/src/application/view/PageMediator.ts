
module game {
    /**
     * 游戏中介器
     */
    export class PageMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "PageMediator";

        public constructor(viewComponent: any) {
            super(PageMediator.NAME, viewComponent);
        }

        public pageView: PanelComponent | egret.EventDispatcher;
        private _smallView:GameSmallGameView;
        public pageMediatorName: string = "";
        public listNotificationInterests(): Array<any> {
            return [
                CommandName.PAGE_SWITCH_SMALL_GAME,
                CommandName.REMOVE_SMALL_GAME_PAGE,
                CommandName.PAGE_SWITCH_ROOM,
                CommandName.PAGE_SWITCH_NEW_HOUSE,
                CommandName.PAGE_SWITCH_USER_INFO,
                CommandName.REMOVE_ROOM_PAGE,
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case CommandName.PAGE_SWITCH_ROOM:
                    {
                        //GameConfig.updataMaskBgFun('#404A58', 1);
                        this.removeSceneView();
                        GameConfig.showDownBtnFun(false);
                        if (data) {
                            let userProxy: UserProxy = <UserProxy><any>this.facade().retrieveProxy(UserProxy.NAME);
                            let mapProxy: MapProxy = <MapProxy><any>this.facade().retrieveProxy(MapProxy.NAME);
                            let houseProxy: HouseProxy = <HouseProxy><any>this.facade().retrieveProxy(HouseProxy.NAME);
                            GameConfig.pageType = 1;
                            GameConfig.setEventsReply(true);
                            openPanel(PanelType.GameRoomView);

                            this.pageView = GameRoomView.getInstance();

                            ApplicationFacade.getInstance().registerMdt<RoomMediator>(RoomMediator.NAME, RoomMediator, this.pageView);

                            if (data.room.ownerid == userProxy.getUserInfo().userid) {
                                MaidManager.getInstance()._startHouse = data.room.rId;
                            }

                            this.pageMediatorName = RoomMediator.NAME;
                            GameRoomView.getInstance().initInfo(data.room, userProxy.getUserInfo().userid, houseProxy.returnType);
                            GameRoomView.getInstance().updateUserInfo(userProxy.getUserInfo());


                            /*if (GameConfig.exploring && data.room.rUserId == userProxy.getUserInfo().userid) {
                                GameConfig.exploreUIFun(false);
                                GameConfig.exploring = false;
                                GameConfig.explorRId = 0;
                                GameConfig.explorLimit = null;
                                mapProxy.removeMapCircle();
                            }*/
                        }
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: false });
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_TOP_ROOM_BG, { isShow: false });

                        break;
                    }
                case CommandName.PAGE_SWITCH_NEW_HOUSE:
                    {
                        //GameConfig.updataMaskBgFun('#404A58', 1);
                        let userProxy: UserProxy = <UserProxy><any>this.facade().retrieveProxy(UserProxy.NAME);
                        this.removeSceneView();
                        GameConfig.showDownBtnFun(false);
                        GameConfig.pageType = 3;
                        GameConfig.setEventsReply(true);
                        openPanel(PanelType.PageNewHouseView);
                        this.pageView = PageNewHouseView.getInstance();
                        ApplicationFacade.getInstance().registerMdt<PageNewHouseMediator>(PageNewHouseMediator.NAME, PageNewHouseMediator, this.pageView);
                        PageNewHouseView.getInstance().updateUserInfo(userProxy.getUserInfo());

                        this.pageMediatorName = PageNewHouseMediator.NAME;
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: false });
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_TOP_ROOM_BG, { isShow: false });

                        break;
                    }
                    
                case CommandName.PAGE_SWITCH_SMALL_GAME:
                    {
                        //GameConfig.updataMaskBgFun('#404A58', 1);
                        this.removeSceneView();
                        GameConfig.showDownBtnFun(false);
                        if (data) {
                            GameConfig.pageType = 4;
                            GameConfig.setEventsReply(true);
                            //GameConfig.closeGameFun(true);
                            if(!this._smallView)
                            {
                                this._smallView = new GameSmallGameView();
                            }
                            this._smallView.clear();
                            this.pageView = this._smallView;
                            // this.sceneGroup.addChild(this.pageView);
                            // ApplicationFacade.getInstance().registerMediator(new SmallGameMediator(this.pageView));
                            ApplicationFacade.getInstance().registerMdt<SmallGameMediator>(SmallGameMediator.NAME, SmallGameMediator, this.pageView);

                            this.pageMediatorName = SmallGameMediator.NAME;
                            (this.pageView as GameSmallGameView).initGame(data.game);
                        }
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: false });

                        break;
                    }
                    case CommandName.PAGE_SWITCH_USER_INFO:
                    {
                        //GameConfig.updataMaskBgFun('#404A58', 1);
                        let userProxy: UserProxy = <UserProxy><any>this.facade().retrieveProxy(UserProxy.NAME);
                        this.removeSceneView();
                        GameConfig.showDownBtnFun(false);
                        GameConfig.pageType = 5;
                        GameConfig.setEventsReply(true);
                        openPanel(PanelType.PageUserInfoView);
                        this.pageView = PageUserInfoView.getInstance();
                        ApplicationFacade.getInstance().registerMdt<PageUserInfoMediator>(PageUserInfoMediator.NAME, PageUserInfoMediator, this.pageView);
                        PageUserInfoView.getInstance().updateView(userProxy.getUserInfo());

                        this.pageMediatorName = PageUserInfoMediator.NAME;
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: false });
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_TOP_ROOM_BG, { isShow: false });

                        break;
                    }
                case CommandName.REMOVE_SMALL_GAME_PAGE:
                    {
                        this.removeSceneView();
                        //GameConfig.closeGameFun(false);
                        //ApplicationFacade.getInstance().sendNotification(CommandName.SCENE_SWITCH_DISCOVERY);
                        break;
                    }
                case CommandName.REMOVE_ROOM_PAGE:
                    {
                        GameConfig.showDownBtnFun(true);
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_TOP_ROOM_NUM, { isShow: false });
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_TOP_ROOM_BG, { isShow: false });
                        if(GameConfig.pageType==3){
                            GameConfig.setEventsReply(false);
                            ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: true });
                        }else{
                            ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: false });
                        }
                        this.removeSceneView();
                        break;
                    }


            }

        }

        private removeSceneView(): void {
            GameConfig.pageType = 0;
            // this.sceneGroup.removeChildren();
            if (this.pageView instanceof PanelComponent) {
                this.pageView.remove();
            }
            else {
                if (this.pageView) {
                    (this.pageView as GameSmallGameView).clear();
                }
            }
            if (this.pageMediatorName != "") {
                ApplicationFacade.getInstance().removeMediator(this.pageMediatorName);
            }
        }

        public get sceneGroup(): egret.Sprite {
            return <egret.Sprite><any>(this.viewComponent);
        }
    }
}