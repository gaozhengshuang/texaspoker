/**
 * 小游戏代理
 * @author sunboy
 */
module game {

	export class SmallGameProxy extends puremvc.Proxy implements puremvc.IProxy{
		public static NAME:string = "SmallGameProxy";
		public constructor(){
			super(SmallGameProxy.NAME);
            this.setSmallGame();
		}

        private smallGameList:SmallGameVO[]=null;
		public setSmallGame(data:any=null){
            this.smallGameList=[];
            let horeGame:SmallGameVO=new SmallGameVO();
            horeGame.sgId=1;
            horeGame.sgIcon="game90001";
            horeGame.sgName="running car";
            horeGame.sgType=1;
            horeGame.sgUrl="https://city.giantfun.cn/hero/";
            this.smallGameList.push(horeGame);
        }
        public getSmallGame():SmallGameVO[]{
            
            return this.smallGameList;

        }
	}
}