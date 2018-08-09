
module app {

	export class AppContainer extends egret.Sprite
    {
        public sceneContainer:AppSceneContainer = new AppSceneContainer();
        public uiContainer:AppUiContainer = new AppUiContainer();


		public constructor()
        {
			super();
            this.addChild(this.sceneContainer);
            this.addChild(this.uiContainer);
		}

    }
}