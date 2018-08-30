module game {
    export class PageNewHouseView extends PanelComponent {
        public static CLOSE: string = "close";
        public static LOOK_HUXING: string = "look_huxing";

        private filterPanel: CommonFilterPanel;
        private buildingGroup: eui.Group;

        private userInfo: IUserInfo;
        private isTime: boolean = false;

        private titlePanel:PageTitlePanel;

        constructor() {
            super();
            this._isShowDark = false;
            this._isShowEffect = false;
            this.adaptive();
        }
        private static _instance: PageNewHouseView = null;
        public static getInstance(): PageNewHouseView {
            if (!PageNewHouseView._instance) {
                PageNewHouseView._instance = new PageNewHouseView();
            }
            return PageNewHouseView._instance;
        }
        protected getSkinName() {
            return PageNewHouseViewUI;
        }
        protected beforeShow() {
            
            this.filterPanel.addEventListener(CommonFilterPanel.PRICE_SORT, this.price_sort_begin, this);
            this.filterPanel.addEventListener(CommonFilterPanel.SELECT, this.select_begin, this);
        }
        protected beforeRemove() {
            this.titlePanel.removePanel();
            this.filterPanel.removeEventListener(CommonFilterPanel.PRICE_SORT, this.price_sort_begin, this);
            this.filterPanel.removeEventListener(CommonFilterPanel.SELECT, this.select_begin, this);
        }
        protected init() {
            //this.horizontalCenter = this.verticalCenter = 0;
            this.titlePanel.init(this.return_begin,this);
            this.filterPanel.init(1, table.TCitys);
            this.buildingGroup.height = gameConfig.curHeight() - (this.filterPanel.y + 60);
            

        }
        private adaptive() {
            //this.scaleX = this.scaleY = GameConfig.innerScale;
            // this.anchorOffsetX = this.width / 2;
            // this.anchorOffsetY = this.height / 2;
        }


        private price_sort_begin(eve: BasicEvent) {
            this.showBuildingList();
        }
        private select_begin(eve: BasicEvent) {
            this.showBuildingList();
        }
        private return_begin() {
            this.dispatchEvent(new BasicEvent(PageNewHouseView.CLOSE));
        }


        private buildingItemList: utils.ScrollerPanel;
        private buildingList: any[] = [];
        private showBuildingList() {
            if (this.buildingItemList == null) {
                this.buildingItemList = new utils.VScrollerPanel();
                this.buildingGroup.addChild(this.buildingItemList);
                this.buildingItemList.y = 0;
                this.buildingItemList.height = this.buildingGroup.height;
                this.buildingItemList.initItemRenderer(NewHouseItemPanel);
                this.buildingItemList.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this);
            }
            this.buildingList = [];
            if (this.filterPanel.viewType == 1 && this.filterPanel.selectCondition) {
                if (this.filterPanel.selectCondition.second) {
                    this.buildingList = this.filterList(this.filterPanel.selectCondition.first,
                        this.filterPanel.selectCondition.second)
                } else {
                    this.buildingList = this.filterList(this.filterPanel.selectCondition.first);
                }
                if (this.buildingList) {
                    if (this.filterPanel.sortCondition == 1) {
                        this.buildingList.sort(this.sortRise);
                    }
                    else if (this.filterPanel.sortCondition == 2) {
                        this.buildingList.sort(this.sortOn);
                    }
                }
            }
            this.buildingItemList.bindData(this.buildingList);
        }
        private onItemTouch(eve: eui.ItemTapEvent) {
            let item: any = this.buildingList[eve.itemIndex]
            if (item) {
                this.dispatchEvent(new BasicEvent(PageNewHouseView.LOOK_HUXING, { building: item }));
            }
        }



        private filterList(first: any, second: any = null): any[] {
            let list: any[] = null;
            let basisList: any[] = table.TBuildings;
            if (first && basisList) {
                if (first.data.Type == 0) {
                    list = basisList;
                    return list;
                } else {
                    list = [];
                    for (let i: number = 0; i < basisList.length; i++) {
                        if (second) {
                            if (basisList[i].Province == first.data.Id &&
                                basisList[i].City == second.data.Id) {
                                list.push(basisList[i]);
                            }
                        } else {
                            if (basisList[i].Province == first.data.Id) {
                                list.push(basisList[i]);
                            }
                        }
                    }
                    return list;
                }
            }
            return list;
        }
        /**
		 * 降序排序
		 */
        public sortOn(a: any, b: any): number {

            if (a.BuildingPrice > b.BuildingPrice) {
                return -1;
            } else if (a.BuildingPrice < b.BuildingPrice) {
                return 1;
            } else {

                return 0;
            }
        }
		/**
		 * 升序排序
		 */
        public sortRise(a: any, b: any): number {

            if (a.BuildingPrice > b.BuildingPrice) {
                return 1;
            } else if (a.BuildingPrice < b.BuildingPrice) {
                return -1;
            } else {

                return 0;
            }
        }

        public updateUserInfo(uInfo: IUserInfo) {
            this.titlePanel.updateUserInfo(uInfo);
            this.showBuildingList()
        }
        
    }
}