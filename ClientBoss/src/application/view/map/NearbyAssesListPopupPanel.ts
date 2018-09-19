module game {
	export class NearbyAssesListPopupPanel extends PanelComponent {

		public static CLOSE: string = "close";
		public static GOIN_ROOM:string = "goin_room";

        private headImg : eui.Image;
        private sexImg : eui.Image;
        private name_txt : eui.Label;

		private listGroup: eui.Group;
		private close_btn: IconButton;
        
		public constructor() {
			super();
		}
        protected getSkinName() {
            return NearbyPlayersAssesViewSkin;
        }
        private static _instance: NearbyAssesListPopupPanel = null;
        public static getInstance(): NearbyAssesListPopupPanel {
            if (!NearbyAssesListPopupPanel._instance) {
                NearbyAssesListPopupPanel._instance = new NearbyAssesListPopupPanel();
            }
            return NearbyAssesListPopupPanel._instance;
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
           this.dispatchEvent(new BasicEvent(NearbyAssesListPopupPanel.CLOSE));
		}

        private houseItemList:utils.ScrollerPanel;
		private houseList:HouseVO[]=[];
		private buildingId:number=0;
		private playersInfo:msg.IPersonSocialInfo;
		public updateInfo(players:msg.IPersonSocialInfo,list:HouseVO[])
		{
			this.playersInfo=players;
			this.name_txt.text=this.playersInfo.name;
			this.houseList=list;
			if(this.houseList){
				this.updateList();
			}				
		}
		private updateList(){
			if(this.houseItemList==null)
			{
				this.houseItemList=new utils.VScrollerPanel();
				this.listGroup.addChild(this.houseItemList);
				this.houseItemList.height=this.listGroup.height;
				this.houseItemList.x=0;
				this.houseItemList.y=0;
				this.houseItemList.initItemRenderer(NearbyAssesListItemPanel);
				this.houseItemList.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this); 
			}
			this.houseItemList.bindData(this.houseList);	
		}
		private onItemTouch(eve:eui.ItemTapEvent){
			let item:HouseVO=this.houseList[eve.itemIndex];
			if(item){
				if(!item.issell){
					this.dispatchEvent(new BasicEvent(NearbyAssesListPopupPanel.GOIN_ROOM,{houseid:item.rId}));
				}
			}
        }
		
	}
}