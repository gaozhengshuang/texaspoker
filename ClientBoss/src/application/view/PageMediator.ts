
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
                
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                
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