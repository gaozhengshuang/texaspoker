module game {
	export class GameMapContentView extends egret.DisplayObjectContainer {

		public constructor() {
			super();

		}
		public initView(): void {
			game.GameConfig.innerWidth = window.innerWidth;
			game.GameConfig.innerHeight = window.innerHeight;
			game.GameConfig.innerScaleH = game.GameConfig.innerHeight / game.GameConfig.stageHeight;
			game.GameConfig.innerScaleW = game.GameConfig.innerWidth / game.GameConfig.stageWidth;

			let expHeight: number = game.GameConfig.innerWidth * game.GameConfig.stageHeight / game.GameConfig.stageWidth;
			game.GameConfig.innerScale = expHeight > game.GameConfig.innerHeight ? game.GameConfig.innerScaleH : game.GameConfig.innerScaleW;

			GameConfig.adaptiveUI(GameConfig.innerScale / 2);
		}
		public initExploreView(isShow: boolean): void {
			GameConfig.exploreUIFun(isShow);
		}
	}
}