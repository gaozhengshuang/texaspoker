module game {
	export class PageUserInfoView extends PanelComponent {
		public static CLOSE: string = "close";

		private view_bg: eui.Rect;

		private returnBtn: eui.Image;
		private nextBtn1: eui.Image;
		private nextBtn2: eui.Image;
		private nextBtn3: eui.Image;
		private nextBtn4: eui.Image;
		private nextBtn5: eui.Image;
		private nextBtn6: eui.Image;
		private nextBtn7: eui.Image;

		private headImg: UserHeadImgPanel;
		private levelGroup: eui.Group;

		private name_txt: eui.Label;
		private sex_txt: eui.Label;
		private age_txt: eui.Label;
		private point_txt: eui.Label;
		private sign_txt: eui.Label;

		private maskMC: eui.Rect;

		private userInfo: IUserInfo;

		public constructor() {
			super();
			this._isShowEffect = false;
			this._isShowDark = false;
		}
		protected getSkinName() {
			return UserInfoViewSkin;
		}
		protected beforeShow() {
			//this.return_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.return_begin, this);
			this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.return_begin, this);
			this.nextBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.next_begin, this);
			this.nextBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.next_begin, this);
			this.nextBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.next_begin, this);
			this.nextBtn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.next_begin, this);
			this.nextBtn5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.next_begin, this);
			this.nextBtn6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.next_begin, this);
			this.nextBtn7.addEventListener(egret.TouchEvent.TOUCH_TAP, this.next_begin, this);

		}
		protected beforeRemove() {
			//this.return_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.return_begin, this);
			this.returnBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.return_begin, this);
			this.nextBtn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.next_begin, this);
			this.nextBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.next_begin, this);
			this.nextBtn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.next_begin, this);
			this.nextBtn4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.next_begin, this);
			this.nextBtn5.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.next_begin, this);
			this.nextBtn6.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.next_begin, this);
			this.nextBtn7.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.next_begin, this);
		}
		protected init() {
			this.maskMC.visible=false;
			for (let i: number = 1; i <= 7; i++) {
				this["nextBtn" + i].name = "nextBtn" + i;
			}
		}
		private return_begin(eve: egret.TouchEvent) {
			this.dispatchEvent(new BasicEvent(PageUserInfoView.CLOSE));

		}
		private next_begin(eve: egret.TouchEvent) {
			switch (eve.target.name) {
				case "nextBtn1":
						this.modifyHeadImg();
					break;

				case "nextBtn2":
						this.modifyNickname();
					break;

				case "nextBtn3":
						this.modifySex();
					break;

				case "nextBtn4":

					break;

				case "nextBtn5":
					this.lookLevel();

					break;

				case "nextBtn6":
					this.modifyPoint();
					break;

				case "nextBtn7":
						this.modifySign();
					break;

			}

		}
		/**
		 * 修改头像
		 */
		private modifyHeadImg(){
			this.delPanelView();
			this.panelView=new ModifyHeadImgPanel(this);
			this.addChild(this.panelView);
			this.panelView.update(Number(this.userInfo.face));
			this.panelView.x=gameConfig.curWidth()/2-this.panelView.width/2;
			this.panelView.y=gameConfig.curHeight()/2-this.panelView.height/2;
			this.maskMC.visible=true;
		}
		/**
		 * 修改性别
		 */
		private modifySex(){
			this.delPanelView();
			this.panelView=new ModifySexPanel(this);
			this.addChild(this.panelView);
			this.panelView.update(this.userInfo.sex);
			this.panelView.x=gameConfig.curWidth()/2-this.panelView.width/2;
			this.panelView.y=gameConfig.curHeight()/2-this.panelView.height/2;
			this.maskMC.visible=true;
		}
		/**
		 * 修改昵称
		 */
		private modifyNickname(){
			this.delPanelView();
			this.panelView=new ModifyNicknamePanel(this);
			this.addChild(this.panelView);
			this.panelView.update(this.userInfo.name);
			this.panelView.x=gameConfig.curWidth()/2-this.panelView.width/2;
			this.panelView.y=gameConfig.curHeight()/2-this.panelView.height/2;
			this.maskMC.visible=true;
		}
		/**
		 * 修改个性签名
		 */
		private modifySign(){
			this.delPanelView();
			this.panelView=new ModifySignPanel(this);
			this.addChild(this.panelView);
			this.panelView.update(this.userInfo.sign);
			this.panelView.x=0;
			this.panelView.y=0;
			this.maskMC.visible=true;
		}

		/**
		 * 查看等级
		 */
		private lookLevel(){
			this.delPanelView();
			this.panelView=new LookUserLevelPanel(this);
			this.addChild(this.panelView);
			this.panelView.update(this.userInfo);
			this.panelView.x=0;
			this.panelView.y=0;
			this.maskMC.visible=true;
		}

		/**
		 * 修改区域
		 */
		private modifyPoint(){
			this.delPanelView();
			this.panelView=new ModifyPointViewPanel(this);
			this.addChild(this.panelView);
			this.panelView.update(this.userInfo);
			this.panelView.x=0;
			this.panelView.y=0;
			this.maskMC.visible=true;
		}


		private panelView: any;
		public delPanelView() {
			this.maskMC.visible=false;
			if (this.panelView != null) {
				this.panelView.delPanel();
				if (this.panelView.parent) {
					this.panelView.parent.removeChild(this.panelView);
				}
				this.panelView=null;
			}

		}
		public updateView(user: IUserInfo) {
			this.userInfo = user;
			this.name_txt.text = this.userInfo.name;
			this.sex_txt.text = this.userInfo.sex == 1 ? "男" : "女";
			this.age_txt.text = "" + this.userInfo.age;
			this.headImg.update(Number(this.userInfo.face));
			if (this.userInfo.baseprovince != 0 && this.userInfo.basecity != 0) {
				let baseprovince: table.ITCitysDefine = table.TCitysById[this.userInfo.baseprovince];
				let basecity: table.ITCitysDefine = table.TCitysById[this.userInfo.basecity];
				this.point_txt.text = baseprovince.Name + basecity.Name;
			} else {
				this.point_txt.text = "";
			}
			if (this.userInfo.sign != "") {
				this.sign_txt.text = this.userInfo.sign;
			}

		}

		private static _instance: PageUserInfoView;
		public static getInstance(): PageUserInfoView {
			if (!this._instance) {
				this._instance = new PageUserInfoView();
			}
			return this._instance;
		}

	}
}