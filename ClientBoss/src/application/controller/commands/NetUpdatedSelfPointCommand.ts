module app {
	export class NetUpdatedSelfPointCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		public static NAME:string = "NetUpdatedSelfPointCommand";

		public execute(notification:puremvc.INotification):void{
			var data:any = notification.getBody();
			switch(notification.getName()){
				case CommandName.SOCKET_REQ_UPDATED_POINT:
				{
                    if(data!=null){
                        var userProxy:UserProxy = <UserProxy><any>this.facade().retrieveProxy(UserProxy.NAME);
                        var mapProxy:MapProxy = <MapProxy><any>this.facade().retrieveProxy(MapProxy.NAME);
                        var serverProxy: ServerProxy = <ServerProxy><any>this.facade().retrieveProxy(ServerProxy.NAME);
                        var sendObj:any={
                            gameId:userProxy.getUserInfo().gameId,
                            status:1,
                            require:data.require,
                            lat:mapProxy.selfPoint.lat,
                            lng:mapProxy.selfPoint.lng,
                            range:mapProxy.getRangePoint([mapProxy.selfPoint.lat,mapProxy.selfPoint.lng],mapProxy.showRadius)
                        }
					    
                    }
					
					break;
				}
			}
		}
	}
}