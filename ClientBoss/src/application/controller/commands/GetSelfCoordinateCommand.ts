module game {
	export class GetSelfCoordinateCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		public static NAME:string = "GetSelfCoordinateCommand";

		public mapProxy:MapProxy;
		public data:any=null;

		public execute(notification:puremvc.INotification):void{
			if(this.mapProxy==null)
            {
				this.mapProxy = <MapProxy><any>this.facade().retrieveProxy(MapProxy.NAME);
            }
			this.data= notification.getBody();
            if(this.mapProxy.selfPoint==null){
                this.mapProxy.selfPoint=new PointVO();
            }
			if(this.mapProxy.currentPoint==null){
                this.mapProxy.currentPoint=new PointVO();
            }
            this.mapProxy.selfPoint.setObject(this.data);
			this.mapProxy.currentPoint.setObject(this.data);
            this.mapProxy.selfPoint.setObject(data);
			this.mapProxy.currentPoint.setObject(data);
			DataManager.playerModel.setSelfPoint(data);
			this.mapProxy.addBuilding();

			let replace:any=this;
			GameConfig.getCityNameFun(this.data.lat, this.data.lng, function (data: any[]) {
                        replace.sendPos(data);
                    })

			sendMessage("msg.C2GW_ReqSetPos", msg.C2GW_ReqSetPos.encode({lat:this.data.lat,lng:this.data.lng}));
			
            ApplicationFacade.getInstance().sendNotification(CommandName.SCENE_SWITCH_MAP);
			if(GameConfig.newPlayerStep==0){
				ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_ASSETS_LIST);
			}
		}

		private sendPos(data:any[]){
			//console.log(data);
			let cityList:table.ITCitysDefine[]=table.TCitys;
			let province:number=0;
			let city:number=0;
			for(let i:number=0;i<cityList.length;i++){
				if(cityList[i].Name==data[0]){
					province=cityList[i].Id;
				}
				if(cityList[i].Name==data[1]){
					city=cityList[i].Id;
				}
			}

			//console.log(province,city);

			sendMessage("msg.C2GW_ReqSetPos", msg.C2GW_ReqSetPos.encode
			({lat:this.data.lat,lng:this.data.lng,province:province,city:city}));
		}
	}
}
