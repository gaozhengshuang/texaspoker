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
            let horeGame: SmallGameVO;

            horeGame = new SmallGameVO();
            horeGame.sgId=SceneType.battle;
            horeGame.sgIcon="gameTantanle";
            horeGame.sgName="超级弹弹乐";
            horeGame.sgType=1;
            this.smallGameList.push(horeGame);

            horeGame = new SmallGameVO();
            horeGame.sgId=SceneType.battle2;
            horeGame.sgIcon="chaoshiIcon";
            horeGame.sgName="超市勾物";
            horeGame.sgType=1;
            this.smallGameList.push(horeGame);
        }
        public getSmallGame():SmallGameVO[]{
            
            return this.smallGameList;

        }
	}
}