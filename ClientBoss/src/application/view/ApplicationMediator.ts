

module game {

    export class ApplicationMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "ApplicationMediator";
        public constructor(viewComponent: any) {
            super(ApplicationMediator.NAME, viewComponent);
            this.drawAssets();
        }

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
            // ApplicationFacade.getInstance().registerMediator(new PageMediator(GameLayer.sceneUiLayer));
            ApplicationFacade.getInstance().registerMdt(PageMediator.NAME, PageMediator, GameLayer.sceneUiLayer);
            // ApplicationFacade.getInstance().registerMediator(new UIMediator(GameLayer.panelLayer)); //todo
            ApplicationFacade.getInstance().registerMdt(UIMediator.NAME, UIMediator, GameLayer.panelLayer);
            // ApplicationFacade.getInstance().registerMediator(new PopupMediator(GameLayer.effectLayer));
            ApplicationFacade.getInstance().registerMdt(PopupMediator.NAME, PopupMediator, GameLayer.effectLayer);
            //ApplicationFacade.getInstance().registerMediator(new SceneSwitchMediator(this.loadingView));
            // ApplicationFacade.getInstance().registerMediator(new AlertMediator(GameLayer.alertLayer));

            ApplicationFacade.getInstance().registerMdt(AlertMediator.NAME, AlertMediator, GameLayer.alertLayer);
        }

        public get main(): GameLayer {
            return <GameLayer><any>(this.viewComponent);
        }
    }
}