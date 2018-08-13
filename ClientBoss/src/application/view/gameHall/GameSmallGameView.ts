module game {
	export class GameSmallGameView extends eui.UILayer {
		public static CLOSE: string = "close";

		//private close_btn:eui.Button;
		private smallGameInfo:SmallGameVO;
		

		public constructor() {
			super();
            
		}
		
		public initGame(info:SmallGameVO){
			this.smallGameInfo=info;
			if (BattleManager.getInstance().isRetStartGame) {
                BattleManager.getInstance().isRetStartGame = false;
                sendMessage("msg.C2GW_ReqStartGame", msg.C2GW_ReqStartGame.encode({
                    gamekind: 0,
                }));
            }

            egret.setTimeout(() => {
                BattleManager.getInstance().isRetStartGame = true;
				this.dispatchEvent(new BasicEvent(GameSmallGameView.CLOSE));
            }, this, 1000);
		}
		private onclick_begin() {
            this.dispatchEvent(new BasicEvent(GameSmallGameView.CLOSE));
        }
	}
}