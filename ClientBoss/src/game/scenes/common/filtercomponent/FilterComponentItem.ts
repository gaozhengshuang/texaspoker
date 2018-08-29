module game {
	export class FilterComponentItem extends eui.ItemRenderer {
		selectionTxt: eui.Label;
		selectedBg: eui.Rect;
		public constructor(data: any = null) {
			super();
			this.skinName = FilterItemSkin;
		}
		private itemData: FilterComponentItemVo;
		protected dataChanged(): void {
			this.itemData = this.data;
			this.selectionTxt.text = this.itemData.des;
			if (this.itemData) {
				switch (this.itemData.type) {
					case FilterComponentType.First:
						this.selectedBg.scaleX = 300;
						this.selectedBg.fillColor = 0xEDEDED;
						break;
					case FilterComponentType.Second:
						this.selectedBg.scaleX = 500;
						this.selectedBg.fillColor = 0xC9C7C7;
						break;
				}
			}
		}
		public set selected(b: boolean) {
			this.selectedBg.visible = b;
		}
	}
}