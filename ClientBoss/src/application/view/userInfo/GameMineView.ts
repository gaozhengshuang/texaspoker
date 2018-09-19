module game {
	export class GameMineView extends PanelComponent {

		public static SETTING: string = "setting";

		private view_bg: eui.Rect;

		private userInfoGroup: eui.Group;
		private huobiGroup: eui.Group;
		private assetsGroup: eui.Group;
		private otherGroup: eui.Group;

		private settingGroup: eui.Group;
		

		private bottomScroller: eui.Scroller;

		private name_txt: eui.Label;
		private level_txt: eui.Label;
		private qiang_txt: eui.Label;
		private vip_txt: eui.Label;
		private gold1_txt: eui.Label;
		private gold2_txt: eui.Label;
		private gold3_txt: eui.Label;
		private estate_txt: eui.Label;
		private carlib_txt: eui.Label;
		private stock_txt: eui.Label;
		private jyLog_txt: eui.Label;

		private userInfo: IUserInfo;

		private innerScaleW: number;

		public constructor() {
			super();
			this._isShowEffect = false;
			this._isShowDark = false;
			this.settingGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setting_begin, this);

		}
		protected getSkinName() {
			return MineViewUI;
		}
		public updateView(user: IUserInfo) {
			this.userInfo = user;
			this.name_txt.text = this.userInfo.name;
			this.level_txt.text = "Lv. " + (this.userInfo.level);
			this.qiang_txt.text = "" + this.userInfo.robcount;
			this.vip_txt.text = "0";

			this.gold1_txt.text = String(this.userInfo.gold);
			this.gold2_txt.text = String(this.userInfo.diamond);
			this.gold3_txt.text = "0";

			this.estate_txt.text = `${DataManager.playerModel.getHouse().length}`;
			this.carlib_txt.text = `${DataManager.playerModel.getUserInfo().cardatas.length}`;
		}
		private setting_begin(){
			this.dispatchEvent(new BasicEvent(GameMineView.SETTING));
		}

		private static _instance: GameMineView;
		public static getInstance(): GameMineView {
			if (!this._instance) {
				this._instance = new GameMineView();
			}
			return this._instance;
		}

	}
}