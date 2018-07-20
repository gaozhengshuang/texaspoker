module game {
	export class ItemList extends eui.Component {
		itemScroller: eui.Scroller;
		itemList: eui.List;



		public constructor() {
			super();
			this.itemList.dataProvider = new eui.ArrayCollection();
			this.itemList.itemRendererSkinName = game.ItemPrice;
			this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onChange,this);
			this.itemList.selectedIndex = 1;
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void {
			super.childrenCreated();
		}

		private onChange(e: eui.PropertyEvent){
			console.log("点击列表项：",this.itemList.selectedItem,this.itemList.selectedIndex);
		}

		public add_item(e:any) {
			(<eui.ArrayCollection>this.itemList.dataProvider).addItem(e);
		}

		public set_index(idx: number) {
			this.itemList.selectedIndex = idx;
		}

	}

	window["game.ItemList"] = game.ItemList;
}
