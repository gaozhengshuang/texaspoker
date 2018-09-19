

module game {

	export class ControllerPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		public execute(notification:puremvc.INotification):void{
			this.facade().registerCommand(CommandName.HTTP_REQ_LOGIN,HttpLoginRequestCommand);
			this.facade().registerCommand(CommandName.SOCKET_REQ_UPDATED_POINT,NetUpdatedSelfPointCommand);
			this.facade().registerCommand(CommandName.GET_SELF_COORDINSTE,GetSelfCoordinateCommand);
			this.facade().registerCommand(CommandName.MAP_POSITION,MapPositionCommand);
			this.facade().registerCommand(CommandName.SOCKET_REQ_ASSETS_LIST,NetAssetsListRequestCommand);
			this.facade().registerCommand(CommandName.SOCKET_REQ_GOIN_ROOM,NetGoinRoomRequestCommand);
			this.facade().registerCommand(CommandName.SOCKET_REQ_NEIGHBOR_LIST,NetNeighborListRequestCommand);
			this.facade().registerCommand(CommandName.SOCKET_REQ_RECEIVE,NetReceiveRequestCommand);
			this.facade().registerCommand(CommandName.SOCKET_REQ_PLUNDER,NetPlunderRequestCommand);
			this.facade().registerCommand(CommandName.SOCKET_REQ_LEVEL,NetRoomLevelRequestCommand);
			this.facade().registerCommand(CommandName.MAP_ACTION,MapActionCommand);
			this.facade().registerCommand(CommandName.MAP_BUILDING_INFO,MapBuildingInfoRequestCommand);
			this.facade().registerCommand(CommandName.MAP_FUJIN_SWITCH,MapFujinSwitchCommand);
			this.facade().registerCommand(CommandName.MAP_AREA_TOTAL,MapAreaTotalCommand);
			
        }
	}
}