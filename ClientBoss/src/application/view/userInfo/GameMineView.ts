module game {
	export class GameMineView extends eui.Component {

		private view_bg: eui.Rect;

		private userInfoGroup: eui.Group;
		private huobiGroup: eui.Group;
		private assetsGroup: eui.Group;
		private otherGroup: eui.Group;

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

		private userInfo:any;

		public constructor() {
			super();
			this.skinName = "resource/skins/MineViewUI.exml";
			this.adaptive();
		}
		private adaptive() {
			this.view_bg.width=GameConfig.innerWidth;
            this.view_bg.height=GameConfig.innerHeight;

			this.userInfoGroup.scaleX=GameConfig.innerScaleW;
            this.userInfoGroup.scaleY=GameConfig.innerScaleW;

			this.huobiGroup.scaleX=GameConfig.innerScaleW;
            this.huobiGroup.scaleY=GameConfig.innerScaleW;
			this.huobiGroup.y=this.userInfoGroup.height*GameConfig.innerScaleW;
			console.log(this.huobiGroup.y+"//"+this.userInfoGroup.height)

			this.assetsGroup.scaleX=GameConfig.innerScaleW;
            this.assetsGroup.scaleY=GameConfig.innerScaleW;
			this.assetsGroup.y=this.huobiGroup.y+this.huobiGroup.height*GameConfig.innerScaleW+20;

			this.otherGroup.scaleX=GameConfig.innerScaleW;
            this.otherGroup.scaleY=GameConfig.innerScaleW;
			this.otherGroup.y=this.assetsGroup.y+this.assetsGroup.height*GameConfig.innerScaleW+20;

		}

		public updateView(user:any){
			this.userInfo=user;
            this.name_txt.text = this.userInfo.name;
            this.level_txt.text = "Lv. "+(this.userInfo.level);
			this.qiang_txt.text = "0";
			this.vip_txt.text = "0";

            this.gold1_txt.text = String(this.userInfo.gold);
            this.gold2_txt.text = String(this.userInfo.diamond);
			this.gold3_txt.text = "0";

			this.estate_txt.text="0";
        }
	}
}