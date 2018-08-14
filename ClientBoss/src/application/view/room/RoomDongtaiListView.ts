module game {
	export class RoomDongtaiListView extends egret.Sprite {
		public static CLOSE: string = "close";
		public static POPUP_ASSETS_LIST: string = "popup_assets_list";

		public messageList:MessageVO[];
		private titleIcon:egret.Bitmap;
		private bgLine:egret.Bitmap;
		private quit_btn:egret.Bitmap;
		private beishu:number;
		private limitedH:number;
		public constructor(list:MessageVO[],num:number,limiH:number) {
			super();
			this.beishu=num;
			this.limitedH=limiH*(1/this.beishu);
			this.width=GameConfig.stageWidth;
			this.height=this.limitedH;
			this.init(list);
			this.adaptive();
			
		}
		private init(list:MessageVO[]){
			this.messageList=list;
			if(this.messageList && this.messageList.length>0){
				
				this.titleIcon = new egret.Bitmap();
        		this.titleIcon.texture = RES.getRes("room_dongtai_icon1_png");
				this.addChild(this.titleIcon);
				this.titleIcon.x=26;this.titleIcon.y=20;

				this.bgLine = new egret.Bitmap();
        		this.bgLine.texture = RES.getRes("room_line1_png");
				this.bgLine.width=GameConfig.stageWidth;
				this.addChild(this.bgLine);
				this.bgLine.x=0;this.bgLine.y=this.titleIcon.y+this.titleIcon.height+20;

				this.quit_btn = new egret.Bitmap();
        		this.quit_btn.texture = RES.getRes("room_quit_btn2_png");
				this.addChild(this.quit_btn);
				this.quit_btn.touchEnabled = true;

				this.updateAssetsList(this.messageList);

				
				this.quit_btn.x=530;this.quit_btn.y=this.assetsItemList.y+this.assetsItemList.height+10;
				this.quit_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_begin, this);
								
			}
		}
		private adaptive() {
			this.scaleX=this.scaleY=this.beishu;
			this.anchorOffsetX = this.width / 2;
		}

		private onclick_begin() {
			this.dispatchEvent(new BasicEvent(RoomLinjuListView.CLOSE));

		}

		private assetsItemList:utils.ScrollerPanel;
		private assetsList:MessageVO[]=[];
		private buildingId:number=0;
		private updateAssetsList(list:MessageVO[])
		{
			this.assetsList=list;
			if(this.assetsItemList==null)
			{
				this.assetsItemList=new utils.VScrollerPanel();
				this.addChild(this.assetsItemList);
				this.assetsItemList.height=this.height-(this.bgLine.y+5)-230;
				this.assetsItemList.x=0;
				this.assetsItemList.y=this.bgLine.y+5;
				this.assetsItemList.initItemRenderer(RoomMessageListItemPanel2);
				this.assetsItemList.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this); 
			}
			this.assetsItemList.bindData(this.assetsList);			
		}
		private onItemTouch(eve:eui.ItemTapEvent){
			let item:MessageVO=this.assetsList[eve.itemIndex];
			if(item){
				this.dispatchEvent(new BasicEvent(RoomDongtaiListView.POPUP_ASSETS_LIST,{pId:item.initiateId}));
			}
        }
		public delEvent(): void {


        }
	}
}