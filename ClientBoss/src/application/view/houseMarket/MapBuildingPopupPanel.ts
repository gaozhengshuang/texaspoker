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

            this.listScroller.addEventListener(egret.Event.CHANGE, this.onclick_list, this);
            this.listScroller.addEventListener(eui.UIEvent.CHANGE_START, this.onclick_listStart, this);
            this.listScroller.addEventListener(eui.UIEvent.CHANGE_END, this.onclick_listend, this);
        }
        protected beforeRemove() {
            this.buyFang_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
            this.lookZhuhu_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_lookZhuhu, this);
			this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);

            this.listScroller.removeEventListener(egret.Event.CHANGE, this.onclick_list, this);
            this.listScroller.removeEventListener(eui.UIEvent.CHANGE_START, this.onclick_listStart, this);
            this.listScroller.removeEventListener(eui.UIEvent.CHANGE_END, this.onclick_listend, this);
        }
        protected init() {
            this.horizontalCenter = this.verticalCenter = 0;
            this.close_btn.icon="lucky_json.leftBack";
            this.listScroller.bounces=false;
            //eui.Scroller.scrollThreshold=100;
           //this.listScroller.throwSpeed=0;
            
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
                
                this.bPoint_txt.text = table.TCitysById[this.buildInfo.Province].Name +
                    "." + table.TCitysById[this.buildInfo.City].Name;
            
                let salesNum:number=this.isCanBuy(this.salesInfo);
                if(salesNum>0){
                    this.lookZhuhu_btn.x=118;
                    this.buyFang_btn.visible=true;

                }else{
                    this.lookZhuhu_btn.y=246;
                    this.buyFang_btn.visible=false;
                }
                this.huxingList=[];
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
                            item.total=this.buildInfo.MaxFloor;
                            this.huxingList.push(item);
                        }
                    }
                }
                this.updataHuxingList();
            }
        }
        private huxingImgList:BuildingHuxingItemPanel[];
        private itemW:number=0;
        private currentHuxing:any;
        private updataHuxingList()
		{
            this.removeHuxingImgList();
            this.huxingContainer.scrollH=0;
            console.log(this.huxingList.length);
            if(this.huxingList && this.huxingList.length>0){
                this.huxingImgList=[];
                
                let itemX:number=0;
                for(let i:number=0;i<this.huxingList.length+1;i++){
                    let itemPanel:BuildingHuxingItemPanel=new BuildingHuxingItemPanel();
                    this.itemW=itemPanel.width;
                    itemPanel.anchorOffsetX=itemPanel.width/2;
                    itemPanel.anchorOffsetY=itemPanel.height/2;
                    this.huxingContainer.addChild(itemPanel);
                    itemPanel.y=this.listScroller.height/2;
                    itemPanel.x=this.listScroller.width/2+i*itemPanel.width;
                    this.huxingImgList.push(itemPanel);
                    if(i<this.huxingList.length){
                        itemPanel.dataChanged(this.huxingList[i]);
                    }
                }
                this.onclick_list();
                //this.updateHuxingInfo(0);
            }		
		}
        private removeHuxingImgList(){
            if(this.huxingImgList && this.huxingImgList.length>0){
                for(let i:number=0;i<this.huxingImgList.length;i++){
                    this.huxingImgList[i].parent.removeChild(this.huxingImgList[i]);
                    this.huxingImgList[i]=null;
                }
                this.huxingImgList=[];
            }
        }
        private startScrollH:number=0;
        private onclick_listStart(){
            this.startScrollH=this.huxingContainer.scrollH;
        }
        private onclick_listend(){
            //this.startScrollH=this.huxingContainer.scrollH;
            let scrollH:number=this.huxingContainer.scrollH;
            let fangxiang:number=1;
            //if(Math.abs(scrollH-this.startScrollH)>this.itemW){
                fangxiang=scrollH-this.startScrollH>0?1:-1;
                this.huxingContainer.scrollH=this.startScrollH+fangxiang*this.itemW;
            
            if(this.huxingImgList && this.huxingImgList.length>0){
                for(let i:number=0;i<this.huxingImgList.length;i++){
                    let nowX:number=(this.huxingImgList[i].x)-this.huxingContainer.scrollH;
                    let num:number=Math.abs(nowX-this.listScroller.width/2);
                    let beishu:number=1;
                    if(num<this.huxingImgList[i].width){
                        beishu=1.5*(1-(num/(this.huxingImgList[i].width)));
                        if(beishu<1){beishu=1};
                    }
                    this.huxingImgList[i].suofang(beishu);
                    if(beishu>1){
                        this.updateHuxingInfo(i);
                    }
                }
            }

            
        }
        private onclick_list(eve:egret.Event=null) {
            let scrollH:number=this.huxingContainer.scrollH;
            let fangxiang:number=scrollH-this.startScrollH>0?1:-1
            if(Math.abs(scrollH-this.startScrollH)>this.itemW){
                this.listScroller.stopAnimation();
                //this.huxingContainer.scrollH=this.startScrollH+fangxiang*this.itemW;
            }
            if(this.huxingImgList && this.huxingImgList.length>0){
                for(let i:number=0;i<this.huxingImgList.length;i++){
                    let nowX:number=(this.huxingImgList[i].x)-this.huxingContainer.scrollH;
                    let num:number=Math.abs(nowX-this.listScroller.width/2);
                    let beishu:number=1;
                    if(num<this.huxingImgList[i].width){
                        beishu=1.5*(1-(num/(this.huxingImgList[i].width)));
                        if(beishu<1){beishu=1};
                    }
                    this.huxingImgList[i].suofang(beishu);
                    if(beishu>1){
                        this.updateHuxingInfo(i);
                    }
                }
            }
            
        }
        private updateHuxingInfo(index:number=0){
            if(this.huxingImgList && this.huxingImgList.length>0 && index<this.huxingImgList.length){
                let currentItem:BuildingHuxingItemPanel=this.huxingImgList[index];
                if(currentItem){
                    this.currentHuxing=currentItem.itemDate;
                    this.info_txt.text=this.currentHuxing.data.Des+"( "+this.currentHuxing.area+"平米 )\n"
                    +currentItem.itemDate.count+"/"+currentItem.itemDate.total;
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
	}
}