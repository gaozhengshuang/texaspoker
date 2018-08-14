module game {
	export class GameSceneAssetsView extends eui.Component {
        public static CLOSE:string = "close";
		public static GOIN_ROOM:string = "goin_room";
		public static IN_SALE:string = "in_sale";

		private view_bg: eui.Rect;
		private topBar: eui.Image;

		private titleRadioGroup: eui.Group;
		private titleRadio1:eui.RadioButton;
		private titleRadio2:eui.RadioButton;
		private titleRadio3:eui.RadioButton;
		private radioGroup:eui.RadioButtonGroup;
		//private radioLine: eui.Rect;

		private contentStarck: eui.ViewStack;
		private stackGroup1: eui.Group;
		private stackGroup2: eui.Group;
		private stackGroup3: eui.Group;

		private undoneTips2:eui.Label; 
		private undoneTips3:eui.Label; 
		
		private currentGroupId:number=1;

		public constructor() {
			super();
			this.skinName = "resource/skins/SceneAssetsViewUI.exml";
            this.adaptive();
			this.radioGroup=this.titleRadio1.group;
			this.radioGroup.addEventListener(egret.Event.CHANGE, this.onChangeSex, this);
			this.radioGroup.selectedValue=this.titleRadio1.value;
			this.currentGroupId=this.radioGroup.selectedValue;
			this.contentStarck.selectedChild=this["stackGroup"+this.currentGroupId];
			
            
		}
        private adaptive(){
			this.view_bg.width=GameConfig.innerWidth;
            this.view_bg.height=GameConfig.innerHeight;

			this.topBar.scaleX=GameConfig.innerScaleW;
            this.topBar.scaleY=GameConfig.innerScaleW;

            this.titleRadioGroup.scaleX=GameConfig.innerScaleW;
            this.titleRadioGroup.scaleY=GameConfig.innerScaleW;
			this.titleRadioGroup.y=this.topBar.height*GameConfig.innerScaleW;

			this.contentStarck.width=GameConfig.innerWidth;
			this.contentStarck.y = this.titleRadioGroup.y + 
			this.titleRadioGroup.height*GameConfig.innerScaleW;
			this.contentStarck.height=GameConfig.innerPageHeight-this.contentStarck.y;

			this.undoneTips2.scaleX=this.undoneTips2.scaleY
			=this.undoneTips3.scaleX=this.undoneTips3.scaleY
			=GameConfig.innerScale;


		}
        private onChangeSex(e: egret.Event) {
			var rbGroup: eui.RadioButtonGroup = e.target;
			console.log(rbGroup.selectedValue);  //点击的RadioButton对象的value值
			this.currentGroupId=rbGroup.selectedValue;
			this.contentStarck.selectedChild=this["stackGroup"+this.currentGroupId];

			if(this.currentGroupId==2){
				CarManager.getInstance().ReqMyCarInfo();
				let cardata  = {id:1,tid:1001,ownerid:DataManager.playerModel.userInfo.userid,createtime:0,parkingid:0};
				this.updateAssetsList([(<msg.ICarData>cardata)]);
			}
		}
		private assetsItemList:utils.ScrollerPanel;
		private assetsList:any[]=[];
		private buildingId:number=0;
		public updateAssetsList(list:any[])
		{
			console.log("updateAssetsList");
			if(this.currentGroupId ==2 )
			{
				let assetsList=<msg.ICarData[]>list;
				if(this.assetsItemList==null)
				{
					this.assetsItemList=new utils.VScrollerPanel();
					this.stackGroup2.addChild(this.assetsItemList);
					this.assetsItemList.y = 0;
					this.assetsItemList.height = this.contentStarck.height;
					this.assetsItemList.initItemRenderer(CarItem);
					//this.assetsItemList.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this); 
				}
				this.assetsItemList.bindData(assetsList);		
				return;
			}
			this.assetsList=<RoomVO[]>list;
			this.assetsList=list;
			if(this.assetsItemList==null)
			{
				this.assetsItemList=new utils.VScrollerPanel();
				this.stackGroup1.addChild(this.assetsItemList);
				this.assetsItemList.y = 0;
                this.assetsItemList.height = this.contentStarck.height;
				this.assetsItemList.initItemRenderer(SceneAssetsItemPanel);
				this.assetsItemList.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this); 
			}
			this.assetsItemList.bindData(this.assetsList);			
		}
		private onItemTouch(eve:eui.ItemTapEvent){
			let item:RoomVO=this.assetsList[eve.itemIndex];
			if(item){
				if(item.status==2){
					this.dispatchEvent(new BasicEvent(GameSceneAssetsView.IN_SALE));
				}else{
					this.dispatchEvent(new BasicEvent(GameSceneAssetsView.GOIN_ROOM,{rId:item.rId}));
				}
				
			}
        }
	}
}