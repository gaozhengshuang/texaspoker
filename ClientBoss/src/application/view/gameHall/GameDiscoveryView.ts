module game {
	export class GameDiscoveryView extends eui.Component  {
		public static GOIN_GAME:string = "goin_game";

		private view_bg: eui.Rect;
		private titleImg: eui.Image;
		private titleWordGroup: eui.Group;
		private innerScaleW: number

		public constructor() {
			super();
			this.skinName = "resource/skins/DiscoveryViewUI.exml";
            this.adaptive();
		}

		private adaptive(){
			this.innerScaleW = GameConfig.innerWidth / 720;
			this.view_bg.width=GameConfig.innerWidth;
            this.view_bg.height=GameConfig.innerHeight;
			this.titleImg.scaleX=this.innerScaleW;
            this.titleImg.scaleY=this.innerScaleW;

			this.titleWordGroup.scaleX=this.innerScaleW;
            this.titleWordGroup.scaleY=this.innerScaleW;
			this.titleWordGroup.y=this.titleImg.height*this.innerScaleW;

		}

		private gameItemList:utils.AllScrollerPanel;
		private gameList:SmallGameVO[]=[];
		public initGameList(list:SmallGameVO[])
		{
			this.gameList=list;
			if(this.gameItemList==null)
			{
				this.gameItemList=new utils.AllScrollerPanel();
				this.addChild(this.gameItemList);
				this.gameItemList.x=0;
				this.gameItemList.y=this.titleWordGroup.y+this.titleWordGroup.height*this.innerScaleW;
                this.gameItemList.width=GameConfig.innerWidth;
				this.gameItemList.height=GameConfig.innerHeight-this.gameItemList.y;
				this.gameItemList.initItemRenderer(DiscoveryGameItemPanel);
				this.gameItemList.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this); 
			}
			this.gameItemList.bindData(this.gameList);			
		}
		private onItemTouch(eve:eui.ItemTapEvent){
			let item:SmallGameVO=this.gameList[eve.itemIndex];
			if(item){
				this.dispatchEvent(new BasicEvent(GameDiscoveryView.GOIN_GAME,{game:item}));
			}
        }
	}
}