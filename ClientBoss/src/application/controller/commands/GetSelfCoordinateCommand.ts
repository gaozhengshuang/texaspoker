module game {
	export class GetSelfCoordinateCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		public static NAME:string = "GetSelfCoordinateCommand";

		public mapProxy:MapProxy;

		public execute(notification:puremvc.INotification):void{
			if(this.mapProxy==null)
            {
				this.mapProxy = <MapProxy><any>this.facade().retrieveProxy(MapProxy.NAME);
            }
			var data:any = notification.getBody();
            if(this.mapProxy.selfPoint==null){
                this.mapProxy.selfPoint=new PointVO();
            }
			if(this.mapProxy.currentPoint==null){
                this.mapProxy.currentPoint=new PointVO();
            }
            this.mapProxy.selfPoint.setObject(data);
			this.mapProxy.currentPoint.setObject(data);
			
            ApplicationFacade.getInstance().sendNotification(CommandName.SCENE_SWITCH_MAP);
		}
	}
}