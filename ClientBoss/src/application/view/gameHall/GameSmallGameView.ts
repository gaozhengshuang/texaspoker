module game {
	export class GameSmallGameView extends eui.Component {
		public static CLOSE: string = "close";

		//private close_btn:eui.Button;
		private gameGroup: eui.Group;
		private view_bg: eui.Rect;

		private smallGameInfo:SmallGameVO;
		private webNode:one.WebView=null;

		public constructor() {
			super();
            this.skinName = "resource/skins/SmallGameViewUI.exml";
            this.adaptive();
		}
		private adaptive() {
			this.view_bg.width=GameConfig.innerWidth;
			this.view_bg.height=GameConfig.innerHeight;
			this.gameGroup.width=GameConfig.innerWidth;
			this.gameGroup.height=GameConfig.innerHeight;

		}
		public initGame(info:SmallGameVO){
			this.smallGameInfo=info;
			
		}
		private onclick_begin() {
            this.dispatchEvent(new BasicEvent(GameSmallGameView.CLOSE));
        }
	}
}