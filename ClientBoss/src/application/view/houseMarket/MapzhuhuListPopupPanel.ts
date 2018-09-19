module game {
	export class MapzhuhuListPopupPanel extends PanelComponent {

		public static CLOSE: string = "close";
		public static GOIN_ZHUHU_ROOM:string = "goin_zhuhu_room";

		private listGroup: eui.Group;
		private close_btn: IconButton;
        
		public constructor() {
			super();
		}
        protected getSkinName() {
            return BuildingZhuhuLisSkin;
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
			this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
        }
        protected init() {
            this.horizontalCenter = this.verticalCenter = 0;
            this.close_btn.icon="lucky_json.leftBack";
        }
		private onclick_close(){
           this.dispatchEvent(new BasicEvent(MapzhuhuListPopupPanel.CLOSE));
		}

        private houseItemList:utils.ScrollerPanel;
		private houseList:HouseVO[]=[];
		private buildingId:number=0;
		public updateHouseList(list:HouseVO[])
		{
			this.houseList=list;
			if(this.houseItemList==null)
			{
				this.houseItemList=new utils.VScrollerPanel();
				this.listGroup.addChild(this.houseItemList);
				this.houseItemList.height=this.listGroup.height;
				this.houseItemList.x=0;
				this.houseItemList.y=0;
				this.houseItemList.initItemRenderer(ZhuhuListItemPanel);
				this.houseItemList.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this); 
			}
			this.houseItemList.bindData(this.houseList);			
		}
		private onItemTouch(eve:eui.ItemTapEvent){
			let item:HouseVO=this.houseList[eve.itemIndex];
			if(item){
				this.dispatchEvent(new BasicEvent(MapzhuhuListPopupPanel.GOIN_ZHUHU_ROOM,{houseid:item.rId}));
			}
        }
		
	}
}