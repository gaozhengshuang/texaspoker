module game {
	/**
	 * 战斗场景2
	 */
	export class SuperMartScene extends SceneComponent {

		public beforeShow() {
			openPanel(PanelType.battle2);
			GameConfig.showDownBtnFun(false);
		}

		public beforeRemove() {
			GameConfig.showDownBtnFun(true);
			SuperMartPanel.getInstance().remove();
		}
		private static _instance: SuperMartScene;

		public static getInstance(): SuperMartScene {
			if (!SuperMartScene._instance) {
				SuperMartScene._instance = new SuperMartScene();
			}
			return SuperMartScene._instance;
		}
	}
}