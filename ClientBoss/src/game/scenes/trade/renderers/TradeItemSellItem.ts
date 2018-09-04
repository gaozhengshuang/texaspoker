module game {
	/**
	 * 道具出售渲染项
	 */
	export class TradeItemSellItem extends eui.ItemRenderer {
		itemImg: eui.Image;
		num_txt: eui.Label;
		select_mc: eui.Rect;
		borderImg: eui.Image;

		public constructor() {
			super();
			this.skinName = TradeItemSellItemSkin;
		}
		protected dataChanged(): void {
			this.select_mc.visible = false;

			let data: any = this.data;
			let id = data["id"] != undefined ? data.id : data.itemid;
			let num = data["num"] != undefined ? data.num : data.itemnum;
			let itemDef = table.ItemBaseDataById[id];
			if (itemDef) {
				this.itemImg.source = itemDef.ImageId.toString();//RES.getRes( + "_png");
			}
			this.borderImg.source = '';
			this.num_txt.text = num.toString();
		}
		public set selected(value: boolean) {
			this.select_mc.visible = value;
		}
	}
}