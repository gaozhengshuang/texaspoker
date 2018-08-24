module game {
    export class PageNewHouseView extends PanelComponent {
        public static CLOSE: string = "close";
        public static LOOK_HUXING: string = "look_huxing";

        private return_btn: eui.Button;
        private top_bg: eui.Rect;
        
        private diamond_txt: eui.Label;
        private gold_txt: eui.Label;
        private energy_txt: eui.Label;
        private addEnergy_txt: eui.Label;
        private addNum_txt: eui.Label;
        
        private addEnergyGroup: eui.Group;
        
        private filterPanel: CommonFilterPanel;
        private buildingGroup: eui.Group;
        
        
        

        private userInfo: IUserInfo;
        private isTime: boolean = false;
        
        
        constructor()
        {
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
            this.return_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.return_begin, this);
            this.filterPanel.addEventListener(CommonFilterPanel.PRICE_SORT, this.price_sort_begin, this);
            this.filterPanel.addEventListener(CommonFilterPanel.SELECT, this.select_begin, this);
        }
        protected beforeRemove() {
            this.return_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.return_begin, this);
            this.filterPanel.removeEventListener(CommonFilterPanel.PRICE_SORT, this.price_sort_begin, this);
            this.filterPanel.removeEventListener(CommonFilterPanel.SELECT, this.select_begin, this);
        }
        protected init() {
            //this.horizontalCenter = this.verticalCenter = 0;
            this.addEnergyGroup.visible = false;
            this.filterPanel.init(1,table.TCitys);
            this.buildingGroup.height=gameConfig.curHeight()-(this.filterPanel.y+60);
            
        }
        private adaptive() {
            //this.scaleX = this.scaleY = GameConfig.innerScale;
            // this.anchorOffsetX = this.width / 2;
            // this.anchorOffsetY = this.height / 2;
        }


        private price_sort_begin(eve:BasicEvent){
            this.showBuildingList();
        }
        private select_begin(eve:BasicEvent){
            this.showBuildingList();
        }
        private return_begin(){
            this.dispatchEvent(new BasicEvent(PageNewHouseView.CLOSE));
        }

        private buildingItemList: utils.ScrollerPanel;
		private buildingList: any[] = [];
        private showBuildingList(){
			if (this.buildingItemList == null) {
				this.buildingItemList = new utils.VScrollerPanel();
				this.buildingGroup.addChild(this.buildingItemList);
				this.buildingItemList.y = 0;
				this.buildingItemList.height = this.buildingGroup.height;
				this.buildingItemList.initItemRenderer(NewHouseItemPanel);
				this.buildingItemList.dataList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouchTap, this);
			}
			this.buildingList=[];
            if(this.filterPanel.viewType==1 && this.filterPanel.selectCondition){
                if(this.filterPanel.selectCondition.second){
                    this.buildingList=this.filterList(this.filterPanel.selectCondition.first,
                    this.filterPanel.selectCondition.second)
                }else{
                    this.buildingList=this.filterList(this.filterPanel.selectCondition.first);
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
        private onItemTouchTap(eve: TouchEvent) {
            console.log(eve.target["name"]);
            if (eve.target["name"] == "huxingBtn") {
                let item: any = eve.target["parent"].itemDate;
                if(item){
                    this.dispatchEvent(new BasicEvent(PageNewHouseView.LOOK_HUXING,{building:item}));
                }
            }
        }
        

        private filterList(first:any,second:any=null):any[]{
            let list:any[]=null;
            let basisList:any[]=table.TBuildings;
            if(first && basisList){
                if(first.data.Type==0){
                    list=basisList;
                    return list;
                }else{
                    list=[];
                    for(let i:number=0;i<basisList.length;i++){
                        if(second){
                            if(basisList[i].Province==first.data.Id &&
                            basisList[i].City==second.data.Id ){
                                list.push(basisList[i]);
                            }
                        }else{
                            if(basisList[i].Province==first.data.Id){
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
        

        public updateUserInfo(uInfo:IUserInfo){
            this.userInfo=uInfo;
            this.gold_txt.text = String(this.userInfo.gold);
            this.diamond_txt.text = String(this.userInfo.diamond);
            this.energy_txt.text = this.userInfo.robcount + "/" + 20;
            if (this.userInfo.robcount < 20) {
                this.addEnergyGroup.visible = true;
                this.isTime = true;
                this.showTime();
            }
            else {
                this.addEnergyGroup.visible = false;
                this.removeTimer();
                this.isTime = false;
            }
            this.showBuildingList()
        }
        private endTime: number;
        private showTime() {
            this.addEnergyGroup.visible = true;
            this.endTime = this.userInfo.tmaddrobcount;
            if (this.isTime) {
                SysTimeEventManager.getInstance().addFunction(this.runningTimer, this);
            }
            this.runningTimer(SysTimeEventManager.getInstance().systimeNum, this);

        }

        private runningTimer(time: number, body: any): void {
            if (time < body.endTime) {
                body.addEnergy_txt.text = SysTimeEventManager.getInstance().
                    getHourMinutesTime(body.endTime - time, true, true);
            } else {
                if (body.userInfo.robcount >= 20) {
                    body.removeTimer();
                    body.addEnergyGroup.visible = false;
                    body.isTime = false;
                }
            }
        }
        public removeTimer(): void {
            SysTimeEventManager.getInstance().delFunction(this.runningTimer, this);
        }
        
    }
}