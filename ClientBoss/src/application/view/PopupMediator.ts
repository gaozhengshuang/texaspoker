
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
				CommandName.POPUP_NEW_HOUSE_HUXING,
				CommandName.POPUP_NEW_MAP_BUILDING,
				CommandName.POPUP_BUILDING_ZHUFU,
				CommandName.REMOVE_POPUP,
				CommandName.REMOVE_POPUP_NEW_HOUSE
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
				case CommandName.POPUP_NEW_HOUSE_HUXING:
					{
						let userProxy: UserProxy = <UserProxy><any>this.facade().retrieveProxy(UserProxy.NAME);
						GameConfig.setEventsReply(true);
						GameConfig.showDownBtnFun(false);
						this.removeSceneView();
						if (data) {
							GameConfig.updataMaskBgFun('#000000', 0);
							
							openPanel(PanelType.PageNewHouseHuxingView);
							this.sceneView = PageNewHouseHuxingView.getInstance();
							//PageNewHouseHuxingView.getInstance().initInfo(data.room);
							PageNewHouseHuxingView.getInstance().updateBuildingInfo(data.bId, data.sales);
							PageNewHouseHuxingView.getInstance().updateUserInfo(userProxy.getUserInfo());

							ApplicationFacade.getInstance().registerMdt<PageNewHouseHuxingMediator>(PageNewHouseHuxingMediator.NAME, PageNewHouseHuxingMediator, this.sceneView);

							this.sceneMediatorName = PageNewHouseHuxingMediator.NAME;
							ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: false });
                        	ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_TOP_ROOM_BG, { isShow: false });
						}
						break;
					}
					case CommandName.POPUP_NEW_MAP_BUILDING:
					{
						GameConfig.setEventsReply(true);
						this.removeSceneView();
						if (data) {
							GameConfig.updataMaskBgFun('#000000', 0);
							//GameConfig.showDownBtnFun(false);
							openPanel(PanelType.MapBuildingPopupPanel);
							this.sceneView = MapBuildingPopupPanel.getInstance();
							let goalScale: number = this.sceneView.scaleX;
							this.sceneView.alpha = 0;
							this.sceneView.scaleX = this.sceneView.scaleY = goalScale * 0.5;
							egret.Tween.get(this.sceneView).to({ scaleX: goalScale, scaleY: goalScale, alpha: 1 }, 500, egret.Ease.elasticInOut);
							MapBuildingPopupPanel.getInstance().dataChanged(data.bId, data.sales);
							 //this.sceneView.x = gameConfig.curWidth() / 2;
							 //this.sceneView.y = gameConfig.curHeight() / 2 ;
							// ApplicationFacade.getInstance().registerMediator(new PopupWelcomeMediator(this.sceneView));
							ApplicationFacade.getInstance().registerMdt<MapBuildingPopupMediator>(MapBuildingPopupMediator.NAME, MapBuildingPopupMediator, this.sceneView);

							this.sceneMediatorName = MapBuildingPopupMediator.NAME;

							
						}
						break;
					}
					case CommandName.POPUP_BUILDING_ZHUFU:
					{
						GameConfig.setEventsReply(true);
						this.removeSceneView();
						if (data) {
							GameConfig.updataMaskBgFun('#000000', 0);
							//GameConfig.showDownBtnFun(false);
							openPanel(PanelType.MapzhuhuListPopupPanel);
							this.sceneView = MapzhuhuListPopupPanel.getInstance();
							let goalScale: number = this.sceneView.scaleX;
							this.sceneView.alpha = 0;
							this.sceneView.scaleX = this.sceneView.scaleY = goalScale * 0.5;
							egret.Tween.get(this.sceneView).to({ scaleX: goalScale, scaleY: goalScale, alpha: 1 }, 500, egret.Ease.elasticInOut);
							MapzhuhuListPopupPanel.getInstance().updateHouseList(data.list);
							//MapBuildingPopupPanel.getInstance().dataChanged(data.bId, data.sales);
							 //this.sceneView.x = gameConfig.curWidth() / 2;
							 //this.sceneView.y = gameConfig.curHeight() / 2 ;
							// ApplicationFacade.getInstance().registerMediator(new PopupWelcomeMediator(this.sceneView));
							ApplicationFacade.getInstance().registerMdt<MapzhuhuListPopupMediator>(MapzhuhuListPopupMediator.NAME, MapzhuhuListPopupMediator, this.sceneView);

							this.sceneMediatorName = MapzhuhuListPopupMediator.NAME;

							
						}
						break;
					}
				case CommandName.REMOVE_POPUP:
					{
						if (GameConfig.sceneType == 2) {
							if (GameConfig.pageType != 3) {
								GameConfig.updataMaskBgFun('#000000', 0);
								GameConfig.setEventsReply(false);
							}
						}
						this.removeSceneView();
						break;
					}
					case CommandName.REMOVE_POPUP_NEW_HOUSE:
					{
						if (GameConfig.sceneType == 2) {
							if (GameConfig.pageType != 3) {
								GameConfig.updataMaskBgFun('#000000', 0);
								GameConfig.setEventsReply(false);
								GameConfig.showDownBtnFun(true);
								ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: true });
							}
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