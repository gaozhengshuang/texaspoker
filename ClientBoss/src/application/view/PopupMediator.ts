
module game {
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
				CommandName.POPUP_WELCOME	
			];
		}

		public handleNotification(notification: puremvc.INotification): void {
			var data: any = notification.getBody();
			switch (notification.getName()) {
				case CommandName.POPUP_WELCOME:
					{
						GameConfig.setEventsReply(true);
						this.removeSceneView();
						if (data) {
							GameConfig.updataMaskBgFun('#000000', 0);
							this.sceneView = new WelcomeNewPlayersPanel();
							let goalScale:number=this.sceneView.scaleX;
							this.sceneView.alpha = 0;
							this.sceneView.scaleX = this.sceneView.scaleY = goalScale*0.5;
							egret.Tween.get(this.sceneView).to({ scaleX: goalScale, scaleY: goalScale, alpha: 1 }, 500, egret.Ease.elasticInOut);
							this.sceneView.initInfo(data.room);
							this.sceneGroup.addChild(this.sceneView);
							this.sceneView.x = GameConfig.innerWidth / 2;
							this.sceneView.y = GameConfig.innerHeight / 2;
							ApplicationFacade.getInstance().registerMediator(new PopupWelcomeMediator(this.sceneView));
							this.sceneMediatorName = PopupWelcomeMediator.NAME;
						}
						break;
					}
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