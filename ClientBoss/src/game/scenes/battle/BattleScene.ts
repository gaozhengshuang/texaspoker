module game {
	/**
	 * 战斗场景
	 */
	export class BattleScene extends SceneComponent {
		public beforeShow() {
			openPanel(PanelType.battle);
		}
		public beforeRemove() {
			BattlePanel.getInstance().remove();
		}
		private static _instance: BattleScene;
		public static getInstance(): BattleScene {
			if (!BattleScene._instance) {
				BattleScene._instance = new BattleScene();
			}
			return BattleScene._instance;
		}
	}
}