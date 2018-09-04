module game {
	export class MapzhuhuListPopupPanel extends PanelComponent {

		public static CLOSE: string = "close";
		public static OPEN_ZHUHU_LIST:string = "open_zhuhu_list";
        public static BUY_FANG:string = "buy_fang";

		private barImg: eui.Image;
        private name_txt: eui.Label;
        private danjia_txt: eui.Label;
        private dec_txt: eui.Label;

        private lookGuest_btn:eui.Button;
		private buyFang_btn:eui.Button;

        private bName_txt:eui.Label;
        private bPoint_txt:eui.Label;
        private info_txt:eui.Label;
		private close_btn: IconButton;
        
		public constructor() {
			super();
		}
        protected getSkinName() {
            return MapzhuhuListPopupPanel;
        }
        private static _instance: MapzhuhuListPopupPanel = null;
        public static getInstance(): MapzhuhuListPopupPanel {
            if (!MapzhuhuListPopupPanel._instance) {
                MapzhuhuListPopupPanel._instance = new MapzhuhuListPopupPanel();
            }
            return MapzhuhuListPopupPanel._instance;
        }
        protected beforeShow() {
            //this.buyFang_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_buy, this);
			this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
        }
        protected beforeRemove() {
            //this.buyFang_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
			this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_buy, this);
        }
        protected init() {
            this.horizontalCenter = this.verticalCenter = 0;
            this.close_btn.icon="lucky_json.leftBack";
        }
		private onclick_close(){
           this.dispatchEvent(new BasicEvent(MapBuildingPopupPanel.CLOSE));
		}
		private buildInfo: any;
        private salesInfo: msg.CanBuyInfo[];
        public dataChanged(bId:number,sales: msg.CanBuyInfo[]): void {
            this.buildInfo=table.TBuildingsById[bId];
            this.salesInfo=sales;
            if(this.buildInfo){
                this.bName_txt.text=this.buildInfo.Community;
                this.dec_txt.text=this.buildInfo.Des;
                this.danjia_txt.text="均价："+this.buildInfo.BuildingPrice+"金/平";
                let salesNum:number=this.isCanBuy(this.salesInfo);
                if(salesNum>0){
                    this.lookGuest_btn.x=118;
                    this.buyFang_btn.visible=true;

                }else{
                    this.lookGuest_btn.y=246;
                    this.buyFang_btn.visible=false;
                }
            }
        }
        private isCanBuy(sales: msg.CanBuyInfo[]):number
        {
            let count:number=0;
            if (sales && sales.length > 0) {
                for (let i: number = 0; i < sales.length; i++) {
                    count+=sales[i].count;
                }
            }
            return count;
        }
	}
}