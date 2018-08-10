

module game {

    export class ApplicationMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "ApplicationMediator";
        public constructor(viewComponent: any) {
            super(ApplicationMediator.NAME, viewComponent);
            this.drawAssets();
        }

        public loadingView: eui.Group = new eui.Group();
        public screenView: egret.Sprite = new egret.Sprite;
        public pageView: egret.Sprite = new egret.Sprite;
        public popupView: eui.Group = new eui.Group();
        public alertView: eui.Group = new eui.Group();
        public UIView: eui.Group = new eui.Group();

        public listNotificationInterests(): Array<any> {
            return [

            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {

            }
        }
        /**
         * 初始化可视对象
         *
         */
        private drawAssets(): void {
            this.main.sceneContainer.addChild(this.screenView);
            this.main.uiContainer.addChild(this.pageView);
            this.main.uiContainer.addChild(this.UIView);
            this.main.uiContainer.addChild(this.popupView);
            this.main.uiContainer.addChild(this.loadingView);
            this.main.uiContainer.addChild(this.alertView);


            ApplicationFacade.getInstance().registerMediator(new SceneMediator(this.screenView));
            ApplicationFacade.getInstance().registerMediator(new PageMediator(this.pageView));
            ApplicationFacade.getInstance().registerMediator(new UIMediator(this.UIView));
            ApplicationFacade.getInstance().registerMediator(new PopupMediator(this.popupView));
            //ApplicationFacade.getInstance().registerMediator(new SceneSwitchMediator(this.loadingView));
            ApplicationFacade.getInstance().registerMediator(new AlertMediator(this.alertView));

            game.DataManager.init();
            game.SoundManager.init();

            //通讯初始化
            ClientNet.getInstance().init();

            ApplicationFacade.getInstance().sendNotification(CommandName.SCENE_SWITCH_LOGIN);

        }

        public get main(): AppContainer {
            return <AppContainer><any>(this.viewComponent);
        }
    }
}