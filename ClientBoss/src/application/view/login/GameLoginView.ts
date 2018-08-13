module game {
	export class GameLoginView extends eui.Component {
		public static LOGIN_REQUEST:string = "login_request";
		public static REGISTER_REQUEST:string = "register_request";

		public registerGroup:eui.Group;
		public loginGroup:eui.Group;

		public regNameput:eui.EditableText;
		public regPassput1:eui.EditableText;
		public regPassput2:eui.EditableText;
		public RegisterBtn:eui.Button;
		public loginUrl_Btn:eui.Button;

		public loginNameput:eui.EditableText;
		public loginPassput:eui.EditableText;
		public LoginBtn:eui.Button;
		public registerUrl_Btn:eui.Button;
		public forgetUrl_btn:eui.Button;

		public constructor() {
			super();
			this.skinName = "resource/eui_skins/LoginSence.exml";
			this.adaptive();
			this.registerGroup.visible=false;
			this.loginGroup.visible=true;
			this.LoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_login,this);
			this.RegisterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_register,this);
			this.loginUrl_Btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_goLogin,this);
			//this.registerUrl_Btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_goRegister,this);
			this.init();
		}
		private account:string="";
		private password:string="";
		private init(){
			this.account=CookieSimple.instance.readCookie(GameConfig.cookieAccStr);
			this.password=CookieSimple.instance.readCookie(GameConfig.cookiePassStr);
			if(this.account!=null && this.account!="" && this.password!=null && this.password!="")
			{
				console.log("cookieAcc:"+this.account,"cookiePass:"+this.password);
				this.loginNameput.text=this.account;
				this.loginPassput.text=this.password
			}
		}
		private adaptive(){
			this.scaleX=this.scaleY=GameConfig.innerScale;
			this.anchorOffsetX = this.width / 2;
			this.anchorOffsetY = this.height / 2;

			console.log(this.x,this.y);
		}
		private onclick_login(){
			if(this.loginNameput.text!="" && this.loginPassput.text!="" )
			{
				var data={name:this.loginNameput.text,pass:this.loginPassput.text}
				this.dispatchEvent(new BasicEvent(GameLoginView.LOGIN_REQUEST,data));
			}
		}
		private onclick_register(){
			if(this.regNameput.text!="" && this.regPassput1.text!="" && 
			this.regPassput2.text!="" && this.regPassput1.text==this.regPassput2.text)
			{
				var data={name:this.regNameput.text,pass:this.regPassput1.text}
				this.dispatchEvent(new BasicEvent(GameLoginView.REGISTER_REQUEST,data));
			}
			this.dispatchEvent(new BasicEvent(GameLoginView.REGISTER_REQUEST));
		}
		private onclick_goLogin(){
			this.registerGroup.visible=false;
			this.loginGroup.visible=true;
			this.regNameput.text="";
			this.regPassput1.text="";
			this.regPassput2.text="";
		}
		private onclick_goRegister(){
			this.registerGroup.visible=true;
			this.loginGroup.visible=false;
			this.loginNameput.text="";
			this.loginPassput.text="";
		}
		public delEvent():void
		{

			this.LoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_login,this);
			this.RegisterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_register,this);

			this.loginUrl_Btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_goLogin,this);
			this.registerUrl_Btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_goRegister,this);
		}
	}
}