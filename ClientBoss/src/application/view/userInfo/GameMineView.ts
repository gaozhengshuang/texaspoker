module game {
	export class GameMineView extends eui.Component {

		private view_bg: eui.Rect;

		private userInfoGroup: eui.Group;
		private huobiGroup: eui.Group;
		private assetsGroup: eui.Group;
		private otherGroup: eui.Group;

		private bottomScroller:eui.Scroller



		private name_txt:eui.Label; 
		private level_txt:eui.Label; 
		private qiang_txt:eui.Label; 
		private vip_txt:eui.Label; 
		private gold1_txt:eui.Label; 
		private gold2_txt:eui.Label; 
		private gold3_txt:eui.Label; 
		private estate_txt:eui.Label; 
		private carlib_txt:eui.Label; 
		private stock_txt:eui.Label; 
		private jyLog_txt:eui.Label; 

		private userInfo:IUserInfo;

		private innerScaleW:number;

		public constructor() {
			super();
			this.skinName = "resource/skins/MineViewUI.exml";
			this.adaptive();
		}
		private adaptive() {
			this.innerScaleW = GameConfig.innerWidth / 720;
			this.view_bg.width=GameConfig.innerWidth;
            this.view_bg.height=GameConfig.innerHeight;

			this.userInfoGroup.scaleX=this.innerScaleW;
            this.userInfoGroup.scaleY=this.innerScaleW;

			this.huobiGroup.scaleX=this.innerScaleW;
            this.huobiGroup.scaleY=this.innerScaleW;
			this.huobiGroup.y=this.userInfoGroup.height*this.innerScaleW;
			console.log(this.huobiGroup.y+"//"+this.userInfoGroup.height)

			this.assetsGroup.scaleX=this.innerScaleW;
            this.assetsGroup.scaleY=this.innerScaleW;
			this.assetsGroup.y=this.huobiGroup.y+this.huobiGroup.height*this.innerScaleW+20;

			this.bottomScroller.y=this.assetsGroup.y+this.assetsGroup.height*this.innerScaleW+20;;
			this.bottomScroller.width=GameConfig.innerWidth;
			this.bottomScroller.height = GameConfig.innerPageHeight-this.bottomScroller.y;

			this.otherGroup.scaleX=this.innerScaleW;
            this.otherGroup.scaleY=this.innerScaleW;
			
		}

		public updateView(user:IUserInfo){
			this.userInfo=user;
            this.name_txt.text = this.userInfo.name;
            this.level_txt.text = "Lv. "+(this.userInfo.level);
			this.qiang_txt.text = ""+this.userInfo.robcount;
			this.vip_txt.text = "0";

            this.gold1_txt.text = String(this.userInfo.gold);
            this.gold2_txt.text = String(this.userInfo.diamond);
			this.gold3_txt.text = "0";

			this.estate_txt.text = `${DataManager.playerModel.getHouse().length}`;
			this.carlib_txt.text = `${DataManager.playerModel.getUserInfo().cardatas.length}`;
        }
		
	}
}