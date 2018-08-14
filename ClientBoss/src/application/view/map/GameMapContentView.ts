module game {
	export class GameMapContentView extends egret.DisplayObjectContainer {

		public constructor() {
			super();
            
		}
        public initView():void{
           GameConfig.adaptiveUI(GameConfig.innerScale/2);
        }
		public initExploreView(isShow:boolean):void{
           GameConfig.exploreUIFun(isShow);
        }
	}
}