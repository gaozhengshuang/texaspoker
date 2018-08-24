
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

		public sceneView: PanelComponent;
		public sceneMediatorName: string = "";

		public listNotificationInterests(): Array<any> {
			return [
				CommandName.POPUP_WELCOME,
				CommandName.REMOVE_POPUP
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
							openPanel(PanelType.WelcomeNewPlayersPanel);
							this.sceneView = WelcomeNewPlayersPanel.getInstance();
							let goalScale: number = this.sceneView.scaleX;
							this.sceneView.alpha = 0;
							this.sceneView.scaleX = this.sceneView.scaleY = goalScale * 0.5;
							egret.Tween.get(this.sceneView).to({ scaleX: goalScale, scaleY: goalScale, alpha: 1 }, 500, egret.Ease.elasticInOut);
							WelcomeNewPlayersPanel.getInstance().initInfo(data.room);
							// this.sceneView.x = gameConfig.curWidth() / 2;
							// this.sceneView.y = gameConfig.curHeight() / 2 - (this.sceneView.height * goalScale * 0.5) / 2;
							// ApplicationFacade.getInstance().registerMediator(new PopupWelcomeMediator(this.sceneView));
							ApplicationFacade.getInstance().registerMdt<PopupWelcomeMediator>(PopupWelcomeMediator.NAME, PopupWelcomeMediator, this.sceneView);

							this.sceneMediatorName = PopupWelcomeMediator.NAME;
						}
						break;
					}
				case CommandName.REMOVE_POPUP:
					{
						if (GameConfig.sceneType == 2 || GameConfig.pageType == 2) {
							GameConfig.updataMaskBgFun('#000000', 0);
							GameConfig.setEventsReply(false);
						}
						this.removeSceneView();
						break;
					}
				case CommandName.REMOVE_ALERT_ERROR:
					{
						if (this.sceneMediatorName == "") {
							if (GameConfig.sceneType == 2 || GameConfig.pageType == 2) {
								GameConfig.updataMaskBgFun('#000000', 0);
								GameConfig.setEventsReply(false);
							}
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
			if (this.sceneView) {
				this.sceneView.remove();
			}
			if (this.sceneMediatorName != "") {
				ApplicationFacade.getInstance().removeMediator(this.sceneMediatorName);
			}
		}
	}
}