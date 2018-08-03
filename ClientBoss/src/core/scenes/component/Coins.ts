module game {
	export class Coins extends eui.Component {
		img_cointype:eui.Image;

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


		public setCoinType(n: number) {
			if (n == msg.MoneyType._Gold) {
				this.img_cointype.source = "dress_01_json.dress_gold";
			} else {
				this.img_cointype.source = "dress_01_json.dress_01_19";
			}
		}

	}
	window["game.Coins"] = game.Coins;
}
