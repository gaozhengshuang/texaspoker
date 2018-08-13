/**
 * 房产代理
 * @author sunboy
 */
module game {

	export class AssetsProxy extends puremvc.Proxy implements puremvc.IProxy{
		public static NAME:string = "AssetsProxy";
		public constructor(){
			super(AssetsProxy.NAME);
			this.RegisterEvent();
		}
		public RegisterEvent() {
            NotificationCenter.addObserver(this, this.OnGW2C_AckHouseData, "msg.GW2C_AckHouseData");
        }
		private OnGW2C_AckHouseData(data: msg.GW2C_AckHouseData) {
			console.log(data);

		}

	}
}