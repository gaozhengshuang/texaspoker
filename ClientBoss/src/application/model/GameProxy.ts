/**
 * 游戏代理
 * @author sunboy
 */
module app {

	export class GameProxy extends puremvc.Proxy implements puremvc.IProxy{
		public static NAME:string = "GameProxy";
		public constructor(){
			super(GameProxy.NAME);
		}
	}
}