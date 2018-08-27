module game {
	/**
	 * 大厅场景
	 */
	export class HallScene extends SceneComponent {
		public pageGroup: eui.Group;
		public sceneMediatorName: string;
		protected getSkinName() {
			return HallSceneSkin;
		}

		private static _instance: HallScene;

		public static getInstance(): HallScene {
			if (!HallScene._instance) {
				HallScene._instance = new HallScene();
			}
			return HallScene._instance;
		}
	}
}