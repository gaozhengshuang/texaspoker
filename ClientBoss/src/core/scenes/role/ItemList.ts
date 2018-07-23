module game {
	export class ItemList extends eui.Component {
		itemScroller: eui.Scroller;
		itemList: eui.List;



		public constructor() {
			console.log("itemList constructor")
			super();

		}

		private onChange(e: eui.PropertyEvent) {
			console.log("点击列表项：", this.itemList.selectedItem, this.itemList.selectedIndex);
			this.itemList.selectedItem.checked = true
		}

		public init_list() {
			this.itemList.dataProvider = new eui.ArrayCollection();
			this.itemList.itemRenderer = ItemPrice;
			this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this);
			this.itemList.selectedIndex = 1;
		}

		public add_item(e: any) {
			(<eui.ArrayCollection>this.itemList.dataProvider).addItem(e);
		}

		public set_index(idx: number) {
			this.itemList.selectedIndex = idx;
		}

		public rm_items() {
			(<eui.ArrayCollection>this.itemList.dataProvider).removeAll();
		}

	}

	window["game.ItemList"] = game.ItemList;
}
