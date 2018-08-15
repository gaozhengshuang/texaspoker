module game {
	export class RoomMediator extends puremvc.Mediator implements puremvc.IMediator {
		public static NAME: string = "RoomMediator";
		public constructor(viewComponent: any) {
			super(RoomMediator.NAME, viewComponent);
			this.init();
		}
		public listNotificationInterests(): Array<any> {
			return [
				CommandName.POPUP_ROOM_NEIGHBOR,
				CommandName.PLUNDER_SUCCESS,
				CommandName.RECEIVE_SUCCESS
			];
		}

		public handleNotification(notification: puremvc.INotification): void {
			var data: any = notification.getBody();
			switch (notification.getName()) {
				case CommandName.UPDATE_ROOM_INFO:
					{
						if (data) {
							this.sceneGroup.showLinjuList(data.list);
						}
						break;
					}
				case CommandName.POPUP_ROOM_NEIGHBOR:
					{
						if (data) {
							this.sceneGroup.showLinjuList(data.list);
						}
						break;
					}
				case CommandName.PLUNDER_SUCCESS:
					{
						if (data) {
							this.sceneGroup.plunderSuccess(data.houseid, data.index, data.gold);
						}
						break;
					}
				case CommandName.RECEIVE_SUCCESS:
					{
						if (data) {
							this.sceneGroup.receiveSuccess(data.houseid, data.index, data.gold);
						}
						break;
					}
				case CommandName.HOUSE_LEVEL_SUCCESS:
					{
						if (data) {

							this.sceneGroup.levelSuccess(1);
						}
						break;
					}
				case CommandName.ROOM_LEVEL_SUCCESS:
					{
						if (data) {
							this.sceneGroup.levelSuccess(data.index);
						}
						break;
					}
			}
		}
		private init(): void {
			this.sceneGroup.addEventListener(GameRoomView.CLOSE, this.closeRequset, this);
			this.sceneGroup.addEventListener(GameRoomView.OPEN_NEIGHBOR_LIST, this.openNeighborRegister, this);
			this.sceneGroup.addEventListener(GameRoomView.GOIN_ROOM, this.gotoRoomRegister, this);
			this.sceneGroup.addEventListener(GameRoomView.SHOW_TOP_ROOM_INFO, this.showRoomInfoRegister, this);
			this.sceneGroup.addEventListener(GameRoomView.PLUNDER, this.plunderRegister, this);
			this.sceneGroup.addEventListener(GameRoomView.PLUNDER_ERROR, this.plunderErrorRegister, this);
			this.sceneGroup.addEventListener(GameRoomView.RECEIVE, this.receiveRegister, this);
			this.sceneGroup.addEventListener(GameRoomView.LEVEL, this.levelRegister, this);

		}
		private closeRequset(eve: BasicEvent): void {
			ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_ROOM_PAGE);
		}
		private plunderRegister(eve: BasicEvent): void {
			ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_PLUNDER, eve.EventObj);
		}
		private levelRegister(eve: BasicEvent): void {
			ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_LEVEL, eve.EventObj);
		}
		private plunderErrorRegister(eve: BasicEvent): void {
			ApplicationFacade.getInstance().sendNotification(CommandName.ERROR_ALERT, eve.EventObj);
		}
		private receiveRegister(eve: BasicEvent): void {
			ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_RECEIVE, eve.EventObj);
		}
		private openNeighborRegister(eve: BasicEvent): void {
			ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_NEIGHBOR_LIST, eve.EventObj);
		}
		private gotoRoomRegister(eve: BasicEvent): void {
			ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_GOIN_ROOM, eve.EventObj);
		}
		private showRoomInfoRegister(eve: BasicEvent): void {
			ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_TOP_ROOM_INFO, eve.EventObj);
		}
		public get sceneGroup(): GameRoomView {
			return <GameRoomView><any>(this.viewComponent);
		}
	}
}