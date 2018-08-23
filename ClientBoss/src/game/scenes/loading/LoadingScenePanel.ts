module game {
	/**
	 * 加载场景loading面板
	 */
	export class LoadingScenePanel extends PanelComponent {
		public loadingBar: eui.ProgressBar;
		public loadText: eui.Label;

		constructor() {
			super();
			this._isShowDark = this._isShowEffect = false;
		}
		protected beforeShow() {
			this.loadingBar.value = 0;
			this.loadText.text = '0%';
		}
		protected getSkinName() {
			return LoadingSceneSkin;
		}
		public updateProgress(per: number) {
			let prog = Math.round(per * 100);
			this.loadingBar.value = prog;
			this.loadText.text = prog + "%";
		}

		private static _instance: LoadingScenePanel = null;
		public static getInstance(): LoadingScenePanel {
			if (!LoadingScenePanel._instance) {
				LoadingScenePanel._instance = new LoadingScenePanel();
			}
			return LoadingScenePanel._instance;
		}
	}
}