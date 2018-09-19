module game {
    export class ModifyNicknamePanel extends eui.Component {

        private name_txt: eui.Label;
		private empty_btn: eui.Button;
        private cancel_btn: eui.Button;
        private ok_btn: eui.Button;


        private pageView:PageUserInfoView;
        public nameStr: string = "";

        public constructor(view:PageUserInfoView) {
            super();
            this.pageView=view;
            this.skinName = ModifyNicknameSkin;

            this.empty_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_empty,this);
            this.cancel_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_cancel,this);
            this.ok_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_ok,this);
            NotificationCenter.addObserver(this, this.OnGW2C_AckSetUserName, "msg.GW2C_AckSetUserName");
            
        }
        private onclick_empty(){
            this.name_txt.text="";

        }
        private onclick_cancel(){
            this.pageView.delPanelView();

        }
        private onclick_ok(){
            if(this.name_txt.text!="" && this.name_txt.text!=this.nameStr){
                sendMessage("msg.C2GW_ReqSetUserName",msg.C2GW_ReqSetUserName.encode({name:this.name_txt.text}));
            }
            
        }
        public update(str:string) {
            this.nameStr = str;
            this.name_txt.text=this.nameStr;
        }
        private OnGW2C_AckSetUserName(data: msg.GW2C_AckSetUserName) {
            console.log(data.ret);
			if (data.ret == 0) {
                this.nameStr=this.name_txt.text;
				this.pageView.delPanelView();
			}else{
                showTips("改名失败！");
            }
		}
        public delPanel(){
            this.empty_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_empty,this);
            this.cancel_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_cancel,this);
            this.ok_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_ok,this);
        }
    }
}