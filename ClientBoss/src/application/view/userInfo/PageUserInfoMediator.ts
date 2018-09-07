module game {
	export class PageUserInfoMediator extends puremvc.Mediator implements puremvc.IMediator {
		public static NAME: string = "PageUserInfoMediator";
		public constructor(viewComponent: any) {
			super(PageUserInfoMediator.NAME, viewComponent);
			this.init();
		}
		public listNotificationInterests(): Array<any> {
			return [
				CommandName.UPDATE_USER_INFO
			];
		}

		public handleNotification(notification: puremvc.INotification): void {
			var data: any = notification.getBody();
			switch (notification.getName()) {
				case CommandName.UPDATE_USER_INFO:
					{
						if (data) {
							this.sceneGroup.updateView(data);
						}
						break;
					}
			}
		}

		private init(): void {
			this.sceneGroup.addEventListener(PageUserInfoView.CLOSE, this.closeRequset, this);

		}
		private closeRequset(eve: BasicEvent): void {
			ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_ROOM_PAGE);
		}
		public get sceneGroup(): PageUserInfoView {
			return <PageUserInfoView><any>(this.viewComponent);
		}

	}
}