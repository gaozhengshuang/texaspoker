module game {
	export class MapBuildingPopupPanel extends PanelComponent {

		public static CLOSE: string = "close";
		public static BUY: string = "buy";

		private barImg: eui.Image;

        private name_txt: eui.Label;
        private danjia_txt: eui.Label;
        private dec_txt: eui.Label;

        private buy_btn: eui.Button;
		private close_btn: IconButton;
        
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
            this.buy_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_buy, this);
			this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
        }
        protected beforeRemove() {
            this.buy_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
			this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_buy, this);
        }
        protected init() {
            this.horizontalCenter = this.verticalCenter = 0;
            this.close_btn.icon="lucky_json.leftBack";
        }
		private onclick_close(){
           this.dispatchEvent(new BasicEvent(MapBuildingPopupPanel.CLOSE));
		}
		private onclick_buy(){
            
			this.dispatchEvent(new BasicEvent(MapBuildingPopupPanel.BUY,{build:this.buildInfo}));
		}
		private buildInfo: any;
        public dataChanged(bId:number): void {
            this.buildInfo=table.TBuildingsById[bId];
            if(this.buildInfo){
                this.dec_txt.text=this.buildInfo.Des;
                this.danjia_txt.text="当前单价"+this.buildInfo.BuildingPrice+"金/平米";
            }
        }
	}
}