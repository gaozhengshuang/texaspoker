

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
			
        }
	}
}