module game {
	export class Coins extends eui.Component {
		img_bg: eui.Image;
		txt_num: eui.Label;
		img_gold: eui.Image;

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

		public setCoinType(n: number) {
			console.log("类型",n);
			if (n == msg.MoneyType._Gold) {
				this.img_gold.visible = true;
			} else {
				this.img_gold.visible = false;
			}
		}

	}
	window["game.Coins"] = game.Coins;
}
