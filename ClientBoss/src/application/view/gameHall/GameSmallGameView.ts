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
			
		}
		private onclick_begin() {
            this.dispatchEvent(new BasicEvent(GameSmallGameView.CLOSE));
        }
	}
}