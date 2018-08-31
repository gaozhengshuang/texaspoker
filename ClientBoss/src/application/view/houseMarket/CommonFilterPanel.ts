module game {
	export class CommonFilterPanel extends eui.Component {

		public static SELECT: string = "select";
		public static PRICE_SORT: string = "price_sort";

		private listGroup: eui.Group;

		private filterGroup: eui.Group;
		private selectGroup: eui.Group;
		private select_txt: eui.Label;

		private selectStatus1: eui.Image;
		private selectStatus2: eui.Image;
		private triangle_Img: eui.Image;

		private list_bg: eui.Rect;
		private down_bg: eui.Rect;
		private child_bg: eui.Rect;

		private priceGroup: eui.Group;
		private priceRadio1: eui.RadioButton;
		private priceRadio2: eui.RadioButton;
		private radioGroup: eui.RadioButtonGroup;

		private childGroup: eui.Group;
		private listGroup1: eui.Group;
		private listGroup2: eui.Group;
		private listScroller1: eui.Scroller;
		private listScroller2: eui.Scroller;
		public sortCondition: number = 0;

		public constructor() {
			super();
			this.skinName = CommonFilterPanelUI;
			this.listGroup.visible = false;
			this.selectGroup.touchChildren = false;
			this.selectGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.select_begin, this);

			this.radioGroup = this.priceRadio1.group;
			this.radioGroup.addEventListener(egret.Event.CHANGE, this.onChangeSex, this);
			//this.radioGroup.selectedValue = this.priceRadio1.value;
			this.sortCondition = 0;
			//console.log(this.down_bg.y);

		}

		private onChangeSex(e: egret.Event) {
			var rbGroup: eui.RadioButtonGroup = e.target;
			//console.log(rbGroup.selectedValue);  //点击的RadioButton对象的value值
			this.sortCondition = rbGroup.selectedValue;
			this.dispatchEvent(new BasicEvent(CommonFilterPanel.PRICE_SORT, { value: rbGroup.selectedValue }))

		}

		public viewType: number = 1;
		private selectStatus: number = 1;
		private firstSelectResult: any = null;
		private secondSelectResult: any = null;
		public selectlist: any[] = [];
		private firstLevelList: any[] = [];
		private secondLevelList: any[] = [];
		private firstItemList: CommonFilterItemPanel[] = [];
		private secondItemList: CommonFilterItemPanel[] = [];
		public selectCondition: any = null;

		public init(type: number, list: any[]) {
			this.viewType = type;
			this.selectlist = list;
			switch (this.viewType) {
				case 1:
					this.select_txt.text = "全国";
					if (this.selectlist && this.selectlist.length > 0) {
						this.firstLevelList = [];
						let item: any = { data: { Type: 0, Name: "全国" }, index: 0, type: 1 }
						this.firstLevelList.push(item);
						for (let i: number = 0; i < this.selectlist.length; i++) {
							if (this.selectlist[i].Type == 1) {
								let selectItem: any = {
									data: this.selectlist[i],
									index: (i + 1),
									type: 2
								}
								this.firstLevelList.push(selectItem);
							}
						}
					}
					this.selectCondition = { first: this.firstLevelList[0] };
					break;
				case 2:
					this.select_txt.text = "全部";
					if (this.selectlist && this.selectlist.length > 0) {
						this.firstLevelList = [];
						let item: any = { data: { Type: 0, Name: "全部" }, index: 0, type: 5 }
						this.firstLevelList.push(item);
						for (let i: number = 0; i < this.selectlist.length; i++) {
							let selectItem: any = {
								data: this.selectlist[i],
								index: (i+1),
								type: 4
							}
							this.firstLevelList.push(selectItem);
						}
					}
					this.selectCondition = { first: null };
					break;
			}

		}
		private select_begin() {
			if (this.selectStatus == 1) {
				this.selectStatus = 2;
			} else {
				this.selectStatus = 1;
			}
			this.updateSelectStatus(this.selectStatus);
		}

		private updateSelectStatus(status: number) {
			this.selectStatus = status;
			if (this.selectStatus == 1) {
				this.selectStatus1.visible = true;
				this.selectStatus2.visible = false;
				this.hideSelectList();
			} else {
				this.selectStatus1.visible = false;
				this.selectStatus2.visible = true;
				this.showSelectList();
			}

		}
		private showSelectList() {
			this.listGroup.visible = true;
			this.delFirstItemList();
			if (this.firstLevelList && this.firstLevelList.length > 0) {
				this.firstItemList = []
				for (let i: number = 0; i < this.firstLevelList.length; i++) {
					let item: CommonFilterItemPanel = new CommonFilterItemPanel();
					let level: any = this.firstLevelList[i];
					item.update(level.data, level.index, level.type);
					item.addEventListener(CommonFilterItemPanel.ITEM_TAP, this.first_item_tap, this);
					item.x = 0;
					item.y = 0 + i * item.height;
					this.listGroup1.addChild(item);
					this.firstItemList.push(item);
				}
			}
			if (this.firstSelectResult) {
				//this.firstResult(this.firstSelectResult.index);
			}
		}
		private first_item_tap(eve: BasicEvent) {
			this.firstResult(eve.EventObj.index);
		}
		private firstResult(index: number) {
			this.firstListRestore();
			this.childGroup.visible = false;
			this.firstSelectResult = this.firstLevelList[index];
			switch (this.viewType) {
				case 1:
					if (index == 0) {
						this.select_txt.text = this.firstSelectResult.data.Name;
						this.childGroup.visible = false;
						//this.listGroup.visible=false;
						this.selectStatus = 1;
						this.selectStatus1.visible = true;
						this.selectStatus2.visible = false;
						this.hideSelectList();
						this.selectCondition = { first: this.firstSelectResult };
						this.dispatchEvent(new BasicEvent(CommonFilterPanel.SELECT, { first: this.firstSelectResult, viewType: this.viewType }));
					} else {
						this.firstItemList[index].showBg(true);
						this.showSecondList(this.firstSelectResult);
					}
					break;
				case 2:
					if (index == 0) {
						this.select_txt.text = this.firstSelectResult.data.Name;
						this.selectCondition = { first: null};
					} else {
						this.select_txt.text = this.firstSelectResult.data.Des;
						this.selectCondition = { first: this.firstSelectResult };
					}

					this.childGroup.visible = false;
					//this.listGroup.visible=false;
					this.selectStatus = 1;
					this.selectStatus1.visible = true;
					this.selectStatus2.visible = false;
					this.hideSelectList();
					
					this.dispatchEvent(new BasicEvent(CommonFilterPanel.SELECT, { first: this.firstSelectResult, viewType: this.viewType }));
					break;
			}
		}
		private firstListRestore() {
			if (this.firstItemList && this.firstItemList.length > 0) {
				for (let i: number = 0; i < this.firstItemList.length; i++) {
					this.firstItemList[i].showBg(false);
				}
			}
		}

		private hideSelectList() {
			this.listGroup.visible = false;
		}
		private delFirstItemList() {
			if (this.firstItemList && this.firstItemList.length > 0) {
				for (let i: number = 0; i < this.firstItemList.length; i++) {
					this.firstItemList[i].removeEventListener(CommonFilterItemPanel.ITEM_TAP, this.first_item_tap, this);
					this.firstItemList[i].delPanel();
					this.firstItemList[i] = null;
				}
				this.firstItemList = [];
			}

		}
		private showSecondList(fResult: any) {
			this.delSecondItemList();
			if (fResult) {
				this.childGroup.visible = true;
				if (this.selectlist && this.selectlist.length > 0) {
					this.secondLevelList = [];
					this.secondItemList = [];
					let index: number = 0;
					for (let i: number = 0; i < this.selectlist.length; i++) {
						if (this.selectlist[i].Type == 2 &&
							this.selectlist[i].Superior == fResult.data.Id) {
							let selectItem: any = {
								data: this.selectlist[i],
								index: index,
								type: 3
							}
							this.secondLevelList.push(selectItem);
							let item: CommonFilterItemPanel = new CommonFilterItemPanel();

							item.update(selectItem.data, selectItem.index, selectItem.type);
							item.addEventListener(CommonFilterItemPanel.ITEM_TAP, this.second_item_tap, this);
							item.x = 0;
							item.y = 0 + index * item.height;
							//console.log(i);
							this.listGroup2.addChild(item);
							this.secondItemList.push(item);
							index += 1;
						}
					}
				}
			}

		}
		private delSecondItemList() {
			if (this.secondItemList && this.secondItemList.length > 0) {
				for (let i: number = 0; i < this.secondItemList.length; i++) {
					this.secondItemList[i].removeEventListener(CommonFilterItemPanel.ITEM_TAP, this.second_item_tap, this);
					this.secondItemList[i].delPanel();
					this.secondItemList[i] = null;
				}
				this.secondItemList = [];
			}
		}
		private second_item_tap(eve: BasicEvent) {
			this.secondSelectResult = this.secondLevelList[eve.EventObj.index];
			if (this.firstSelectResult && this.secondSelectResult) {
				this.childGroup.visible = false;
				//this.listGroup.visible=false;
				this.selectStatus = 1;
				this.selectStatus1.visible = true;
				this.selectStatus2.visible = false;
				this.hideSelectList();
				this.select_txt.text = this.firstSelectResult.data.Name + this.secondSelectResult.data.Name;
				this.selectCondition = { first: this.firstSelectResult, second: this.secondSelectResult };
				this.dispatchEvent(new BasicEvent(CommonFilterPanel.SELECT,
					{ first: this.firstSelectResult, second: this.secondSelectResult, viewType: this.viewType }));
			}
		}
	}
}