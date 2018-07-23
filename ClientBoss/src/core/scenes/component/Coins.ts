module game {
	export class Coins extends eui.Component {
		img_bg: eui.Image;
		txt_num: eui.Label;

		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void {
			super.childrenCreated();
		}


		public set coins(n: number) {
			this.txt_num.text = `${n}`;
		}

		public set visible(b: boolean) {
			this.img_bg.visible = b;
			this.txt_num.visible = b;
		}

	}
	window["game.Coins"] = game.Coins;
}
