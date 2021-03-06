module game {
	export class DiscoveryGameItemPanel extends eui.ItemRenderer {
		private gameIcon: eui.Image;
		private name_txt: eui.Label;

		public constructor(data: any = null) {
			super();
			this.skinName = DiscoveryGameItemUI;
			this.adaptive();

		}
		private adaptive() {
			//this.scaleX=this.scaleY=GameConfig.innerScale;
		}
		private itemDate: SmallGameVO;
		protected dataChanged(): void {
			this.itemDate = this.data;
			if (this.itemDate) {
				this.gameIcon.source = this.itemDate.sgIcon + '_png';
				this.name_txt.text = this.itemDate.sgName;
			}
		}
	}
}