module game {
	export class PageUserInfoView extends PanelComponent {

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
			for(let i:number=1;i<7;i++){
				this["nextBtn"+i].name="nextBtn"+i;
			}
        }
		private return_begin(eve:egret.TouchEvent){
            
			
		}
		private next_begin(eve:egret.TouchEvent){
            
		}
		public updateView(user: IUserInfo) {
			this.userInfo = user;
			this.name_txt.text = this.userInfo.name;
			this.sex_txt.text=this.userInfo.sex==1?"男":"女";
			this.age_txt.text=""+this.userInfo.age;
			if(this.userInfo.baseprovince!=0 && this.userInfo.basecity!=0){
				let baseprovince:table.ITCitysDefine=table.TCitysById[this.userInfo.baseprovince];
				let basecity:table.ITCitysDefine=table.TCitysById[this.userInfo.basecity];
				this.point_txt.text=baseprovince.Name+basecity.Name;
			}else{
				this.point_txt.text="";
			}
			if(this.userInfo.sign!=""){
				this.sign_txt.text=this.userInfo.sign;
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