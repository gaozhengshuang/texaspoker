module game {
	export class MapBuildingPopupPanel extends PanelComponent {

		public static CLOSE: string = "close";
		public static OPEN_ZHUHU_LIST:string = "open_zhuhu_list";
        public static BUY_FANG:string = "buy_fang";

		private barImg: eui.Image;
        private name_txt: eui.Label;
        private danjia_txt: eui.Label;
        private dec_txt: eui.Label;

        private lookZhuhu_btn:eui.Button;
		private buyFang_btn:eui.Button;

        private bName_txt:eui.Label;
        private bPoint_txt:eui.Label;
        private info_txt:eui.Label;
		private close_btn: IconButton;

        private listScroller:eui.Scroller;
        private huxingContainer:eui.Group;
        private huxingList:any[]=[];
        
		public constructor() {
			super();
		}
        protected getSkinName() {
            return MapBuildingPopupUI;
        }
        private static _instance: MapBuildingPopupPanel = null;
        public static getInstance(): MapBuildingPopupPanel {
            if (!MapBuildingPopupPanel._instance) {
                MapBuildingPopupPanel._instance = new MapBuildingPopupPanel();
            }
            return MapBuildingPopupPanel._instance;
        }
        protected beforeShow() {
            this.buyFang_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_buy, this);
            this.lookZhuhu_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_lookZhuhu, this);
			this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
        }
        protected beforeRemove() {
            this.buyFang_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
            this.lookZhuhu_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_lookZhuhu, this);
			this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
        }
        protected init() {
            this.horizontalCenter = this.verticalCenter = 0;
            this.close_btn.icon="lucky_json.leftBack";
        }
		private onclick_close(){
           this.dispatchEvent(new BasicEvent(MapBuildingPopupPanel.CLOSE));
		}
		private onclick_buy(){
            
			this.dispatchEvent(new BasicEvent(MapBuildingPopupPanel.BUY_FANG,{bId:this.buildInfo.Id,sales:this.salesInfo}));
		}
        private onclick_lookZhuhu(){
            
			this.dispatchEvent(new BasicEvent(MapBuildingPopupPanel.OPEN_ZHUHU_LIST,{ buildingid: this.buildInfo.bId,type:2,bgetall:1 }));
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
                    this.lookZhuhu_btn.x=118;
                    this.buyFang_btn.visible=true;

                }else{
                    this.lookZhuhu_btn.y=246;
                    this.buyFang_btn.visible=false;
                }
            }
        }

        /*private huxingImgList:BuildingHuxingItemPanel[];
        private updataHuxingList()
		{
            console.log(this.huxingList.length);
            if(this.huxingList && this.huxingList.length>0){
                this.huxingContainer.width=730*(this.huxingList.length)+670;
                this.huxingImgList=[];
                for(let i:number=0;i<this.huxingList.length;i++){
                    let itemPanel:BuildingHuxingItemPanel=new BuildingHuxingItemPanel();
                    itemPanel.dataChanged(this.huxingList[i]);
                    this.huxingContainer.addChild(itemPanel);
                    itemPanel.x=335+730/2+730*i;
                    this.huxingImgList.push(itemPanel);
                }
                this.updateHuxingInfo(0);
                this.scrollView.scrollLeft=0;
                this.scrollView.scrollBeginThreshold=0;
                this.scrollView.scrollSpeed=1;
                this.addEventListener(egret.Event.ENTER_FRAME, this.enter_frame, this);
            }		
		}*/
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