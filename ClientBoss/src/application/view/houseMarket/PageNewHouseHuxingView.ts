module game {
    export class PageNewHouseHuxingView extends PanelComponent {
        public static CLOSE: string = "close";
        public static BUY: string = "buy";
        
        private dec_txt: eui.Label;

        private topBarImg: eui.Image;

        private filterPanel: CommonFilterPanel;
        private huxingGroup: eui.Group;


        private userInfo: IUserInfo;
        private isTime: boolean = false;
        private mask_bg: eui.Rect;

        private titlePanel:PageTitlePanel;

        constructor() {
            super();
            this._isShowDark = false;
            this._isShowEffect = false;
            this.adaptive();
        }
        private static _instance: PageNewHouseHuxingView = null;
        public static getInstance(): PageNewHouseHuxingView {
            if (!PageNewHouseHuxingView._instance) {
                PageNewHouseHuxingView._instance = new PageNewHouseHuxingView();
            }
            return PageNewHouseHuxingView._instance;
        }
        protected getSkinName() {
            return NewHouseHuxingViewUI;
        }
        protected beforeShow() {
            //this.return_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.return_begin, this);
            this.filterPanel.addEventListener(CommonFilterPanel.PRICE_SORT, this.price_sort_begin, this);
            this.filterPanel.addEventListener(CommonFilterPanel.SELECT, this.select_begin, this);
        }
        protected beforeRemove() {
            this.delBuyPanel();
            this.titlePanel.removePanel();
            //this.return_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.return_begin, this);
            this.filterPanel.removeEventListener(CommonFilterPanel.PRICE_SORT, this.price_sort_begin, this);
            this.filterPanel.removeEventListener(CommonFilterPanel.SELECT, this.select_begin, this);
        }
        protected init() {
            //this.horizontalCenter = this.verticalCenter = 0;
            this.filterPanel.init(2, this.getFilterList());
            this.huxingGroup.height = gameConfig.curHeight() - (this.filterPanel.y + 60);
            this.mask_bg.visible=false;
            this.titlePanel.init(this.return_begin,this);
        }
        private getFilterList(): any[] {
            let list: any[] = [];
            let tableList: any[] = table.THouse;
            for (let i: number = 0; i < tableList.length; i++) {
                let item: any = tableList[i];
                if (list && list.length > 0) {
                    let isIn: boolean = false;
                    for (let k: number = 0; k < list.length; k++) {
                        if (list[k].Type == item.Type) {
                            isIn = true;
                            break;
                        }
                    }
                    if (!isIn) {
                        list.push(item);
                    }
                } else {
                    list.push(item);
                }
            }
            return list;
        }
        private adaptive() {
            //this.scaleX = this.scaleY = GameConfig.innerScale;
            // this.anchorOffsetX = this.width / 2;
            // this.anchorOffsetY = this.height / 2;
        }
        private basisList: any[] = [];
        public buildInfo: any;
        public updateBuildingInfo(bId: number, sales: msg.CanBuyInfo[]) {
            this.buildInfo = table.TBuildingsById[bId];
            this.dec_txt.text=this.buildInfo.Des;
            this.basisList = [];
            if (this.buildInfo) {
                
                this.titlePanel.updateTitleStr(this.buildInfo.Community);
                for (let i: number = 1; i <= 4; i++) {
                    let item: any = {};
                    let houseStr:string[]=this.buildInfo["Houses" + i].split("|")
                    let strList: string[] = houseStr[0].split("-");
                    if (strList && strList.length >= 3) {
                        let type: any = table.THouseById[Number(strList[0])];
                        let count: number = this.getSalesInfo(sales, i);
                        if (type) {
                            item.data = type;
                            item.price = Number(strList[1]);
                            item.area = Number(strList[2])
                            item.count = count;
                            item.index=i;
                            this.basisList.push(item);
                        }
                    }
                }
            }
        }
        private getSalesInfo(sales: msg.CanBuyInfo[], index: number): number {
            if (sales && sales.length > 0) {
                for (let i: number = 0; i < sales.length; i++) {
                    if (sales[i].index == index) {
                        return sales[i].count;
                    }

                }
            }
            return 0;
        }

        private price_sort_begin(eve: BasicEvent) {
            this.showHuxingList();
        }
        private select_begin(eve: BasicEvent) {
            this.showHuxingList();
        }
        private return_begin(body:any) {
            body.dispatchEvent(new BasicEvent(PageNewHouseView.CLOSE));
        }

        private huxingItemList: utils.ScrollerPanel;
        private huxingList: any[] = [];
        private showHuxingList() {
            if (this.huxingItemList == null) {
                this.huxingItemList = new utils.VScrollerPanel();
                this.huxingGroup.addChild(this.huxingItemList);
                this.huxingItemList.y = 0;
                this.huxingItemList.height = this.huxingGroup.height;
                this.huxingItemList.initItemRenderer(NewHouseHuxingItemPanel);
                this.huxingItemList.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this);
            }
            this.huxingList = [];
            if (this.filterPanel.viewType == 2 && this.filterPanel.selectCondition) {
                this.huxingList = this.filterList(this.filterPanel.selectCondition.first);
                if (this.huxingList) {
                    if (this.filterPanel.sortCondition == 1) {
                        this.huxingList.sort(this.sortRise);
                    }
                    else if (this.filterPanel.sortCondition == 2) {
                        this.huxingList.sort(this.sortOn);
                    }
                }
            }
            this.huxingItemList.bindData(this.huxingList);
        }
        
        private onItemTouch(eve: eui.ItemTapEvent) {
            let item: any = this.huxingList[eve.itemIndex];
            if (item) {
                this.showBuyPanel(item);
            }
        }

        private buyPanel:BuyNewHousePanel;
        private showBuyPanel(info:any){
            this.delBuyPanel();
            this.mask_bg.visible=true;
            this.buyPanel=new BuyNewHousePanel(this);
            this.addChild(this.buyPanel);
            this.buyPanel.x=gameConfig.curWidth()/2-this.buyPanel.width/2;
            this.buyPanel.y=gameConfig.curHeight()/2-this.buyPanel.height/2;
            this.buyPanel.dataChanged(info);
        }
        public delBuyPanel(){
            if(this.buyPanel){
                this.mask_bg.visible=false;
                this.buyPanel.delPanel();
                this.buyPanel=null;
            }
            
        } 
        
		
        private filterList(first: any): any[] {
            let list: any[] = null;
            if (this.basisList) {
                list = [];
                if (first == null) {
                    list = this.basisList;
                } else {
                    for (let i: number = 0; i < this.basisList.length; i++) {
                        if (this.basisList[i].data.Type == first.data.Type) {
                            list.push(this.basisList[i]);
                        }
                    }
                }
                return list;
            }
            return list;
        }
        /**
		 * 降序排序
		 */
        public sortOn(a: any, b: any): number {

            if (a.price*a.area > b.price*b.area) {
                return -1;
            } else if (a.price*a.area < b.price*b.area) {
                return 1;
            } else {

                return 0;
            }
        }
		/**
		 * 升序排序
		 */
        public sortRise(a: any, b: any): number {

            if (a.price*a.area > b.price*b.area) {
                return 1;
            } else if (a.price*a.area < b.price*b.area) {
                return -1;
            } else {

                return 0;
            }
        }
        public updateUserInfo(uInfo: IUserInfo) {
            this.titlePanel.updateUserInfo(uInfo);
            this.showHuxingList();
        }
    }
}