
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
                CommandName.REMOVE_SMALL_GAME_PAGE
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
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