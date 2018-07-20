module game {
	export class ChooseIcon extends eui.Component implements eui.UIComponent {
		bg: eui.Image;
		chose: eui.Image;
		icon: eui.Image;

		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void {
			super.childrenCreated();
		}

		public set checked(b: boolean) {
			this.chose.visible = b;
		}

	}
	window['game.ChooseIcon'] = game.ChooseIcon;
}