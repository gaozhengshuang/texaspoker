
module game {
    /**
     * 游戏中介器
     */
    export class PageMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "PageMediator";

        public constructor(viewComponent: any) {
            super(PageMediator.NAME, viewComponent);
        }

        public pageView: any;
        public pageMediatorName: string = "";
        public listNotificationInterests(): Array<any> {
            return [
                CommandName.PAGE_SWITCH_SMALL_GAME,
                CommandName.REMOVE_SMALL_GAME_PAGE,
                CommandName.PAGE_SWITCH_ROOM
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
                            GameConfig.pageType = 1;
                            GameConfig.setEventsReply(true);
                            this.pageView = new GameRoomView();
                            this.sceneGroup.addChild(this.pageView);
                            ApplicationFacade.getInstance().registerMediator(new RoomMediator(this.pageView));
                            this.pageMediatorName = RoomMediator.NAME;
                            this.pageView.updateInfo(data.room,userProxy.getUserInfo().userid);
                            
                            /*if (GameConfig.exploring && data.room.rUserId == userProxy.getUserInfo().userid) {
                                GameConfig.exploreUIFun(false);
                                GameConfig.exploring = false;
                                GameConfig.explorRId = 0;
                                GameConfig.explorLimit = null;
                                mapProxy.removeMapCircle();
                            }*/
                        }
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: true });

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
                            this.pageView = new GameSmallGameView();
                            this.sceneGroup.addChild(this.pageView);
                            ApplicationFacade.getInstance().registerMediator(new SmallGameMediator(this.pageView));
                            this.pageMediatorName = SmallGameMediator.NAME;
                            this.pageView.initGame(data.game);
                        }
                        ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: false });

                        break;
                    }
                    case CommandName.REMOVE_SMALL_GAME_PAGE:
                    {
                        this.removeSceneView();
                        //GameConfig.closeGameFun(false);
                        //ApplicationFacade.getInstance().sendNotification(CommandName.SCENE_SWITCH_DISCOVERY);
                    }
                
            }

        }

        private removeSceneView(): void {
            GameConfig.pageType = 0;
            this.sceneGroup.removeChildren();
            if (this.pageMediatorName != "") {
                ApplicationFacade.getInstance().removeMediator(this.pageMediatorName);
            }
        }

        public get sceneGroup(): egret.Sprite {
            return <egret.Sprite><any>(this.viewComponent);
        }
    }
}