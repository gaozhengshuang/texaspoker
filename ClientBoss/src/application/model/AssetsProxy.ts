/**
 * 房产代理
 * @author sunboy
 */
declare function showAssetsRedIcon(bool: boolean);
declare function showShouyiIcon(bool: boolean);
module game {

	export class AssetsProxy extends puremvc.Proxy implements puremvc.IProxy{
		public static NAME:string = "AssetsProxy";
		public constructor(){
			super(AssetsProxy.NAME);
			this.RegisterEvent();
		}
		public RegisterEvent() {
            NotificationCenter.addObserver(this, this.OnGW2C_AckHouseData, "msg.GW2C_AckHouseData");
			NotificationCenter.addObserver(this, this.OnGW2C_AckNewPlayerStep, "msg.GW2C_AckNewPlayerStep");
        }
		private OnGW2C_AckHouseData(data: msg.GW2C_AckHouseData) {
			//console.log("有推送");
			DataManager.playerModel.setHouse(data.datas);
			this.setHouseAssets(data.datas);
			if (GameConfig.reqAssets) {
				GameConfig.reqAssets=false;
				if (GameConfig.newPlayerStep == 0) {
					if (this.houseAssetsList.length > 0) {
						ApplicationFacade.getInstance().sendNotification(CommandName.POPUP_WELCOME, { room: this.houseAssetsList[0] });
						GameConfig.newPlayerStep=1;
						sendMessage("msg.C2GW_ReqSetNewPlayerStep", msg.C2GW_ReqSetNewPlayerStep.encode({step:GameConfig.newPlayerStep}));
					}
				} else {
					ApplicationFacade.getInstance().sendNotification(CommandName.SCENE_MAIN_ASSETS, { roomlist: this.houseAssetsList });
				}
			}else{
				
				showAssetsRedIcon(AnalyzeUserGold(this.houseAssetsList,1));
				showShouyiIcon(AnalyzeUserGold(this.houseAssetsList,1));
				ApplicationFacade.getInstance().sendNotification(CommandName.MAIN_ASSETS_UPDATE, { roomlist: this.houseAssetsList });
			}
		}
		private OnGW2C_AckNewPlayerStep(data: msg.GW2C_AckNewPlayerStep) {
			GameConfig.newPlayerStep=data.step;
		}
		public houseAssetsList:HouseVO[]=[];
		public setHouseAssets(list:any[]){
			if(list && list.length>0){
				this.houseAssetsList=[];
				for(let i:number=0;i<list.length;i++){
					let house:HouseVO=new HouseVO();
					house.setObject(list[i]);
					house.isHave=AnalyzeHouseGold(house,1);
					this.houseAssetsList.push(house);
				}
			}
		}
	}
}