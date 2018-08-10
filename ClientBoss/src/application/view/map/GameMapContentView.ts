module game {
	export class GameMapContentView extends egret.DisplayObjectContainer {

		public constructor() {
			super();
            
		}
        public initView():void{
			console.log(GameConfig.innerScale);
           GameConfig.adaptiveUI(GameConfig.innerScale);
        }
		public initExploreView(isShow:boolean):void{
           GameConfig.exploreUIFun(isShow);
        }
	}
}