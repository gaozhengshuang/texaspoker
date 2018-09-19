module game {
	export class GameSmallGameView extends egret.EventDispatcher {
		public static CLOSE: string = "close";

		private smallGameInfo:SmallGameVO;
		

		public constructor() {
			super();
		}
		
		public initGame(info:SmallGameVO){
			this.smallGameInfo=info;

			if (this.smallGameInfo.sgId == SceneType.battle) {
				
			}
			
			switch (this.smallGameInfo.sgId) {
				case SceneType.battle:
					if (BattleManager.getInstance().isRetStartGame) {
						BattleManager.getInstance().isRetStartGame = false;
						BattleManager.getInstance().reqStartGame();
					}

					egret.setTimeout(() => {
						BattleManager.getInstance().isRetStartGame = true;
						this.dispatchEvent(new BasicEvent(GameSmallGameView.CLOSE));
					}, this, 1000);
					break;
				case SceneType.battle2:
					SceneManager.changeScene(SceneType.battle2);
					break;
			}
		}
		private onclick_begin() {
            this.dispatchEvent(new BasicEvent(GameSmallGameView.CLOSE));
        }
		public clear()
		{
			
		}
	}
}