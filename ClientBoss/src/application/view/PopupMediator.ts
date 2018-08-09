
module app {
    /**
     * 游戏中介器
     */
	export class PopupMediator extends puremvc.Mediator implements puremvc.IMediator {
		public static NAME: string = "PopupMediator";

		public constructor(viewComponent: any) {
			super(PopupMediator.NAME, viewComponent);
			this.init();
		}

		public sceneView: any;
		public sceneMediatorName: string = "";

		public listNotificationInterests(): Array<any> {
			return [
				
			];
		}

		public handleNotification(notification: puremvc.INotification): void {
			var data: any = notification.getBody();
			switch (notification.getName()) {
				
			}
		}


		private bgMC: egret.Shape = new egret.Shape();
		private init(): void {
			this.bgMC.graphics.beginFill(0x000000, 0.5);
			this.bgMC.graphics.drawRect(0, 0, GameConfig.innerWidth, GameConfig.innerHeight);
			this.bgMC.graphics.endFill();
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