module game {
    export class ModifySignPanel extends eui.Component {

        private sign_txt: eui.EditableText;
		private cancel_btn: eui.Button;
        private save_btn: eui.Button;


        private pageView:PageUserInfoView;
        public signStr: string = "";

        public constructor(view:PageUserInfoView) {
            super();
            this.pageView=view;
            this.skinName = ModifySianViewSkin;

            this.cancel_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_cancel,this);
            this.save_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_save,this);
            NotificationCenter.addObserver(this, this.OnGW2C_AckSetUserSign, "msg.GW2C_AckSetUserSign");
            
        }
        private onclick_cancel(){
            this.pageView.delPanelView();

        }
        private onclick_save(){
            if(this.sign_txt.text!="" && this.sign_txt.text!=this.signStr){

                sendMessage("msg.C2GW_ReqSetUserSign",msg.C2GW_ReqSetUserSign.encode({sign:this.sign_txt.text}));
            }
            
        }
        private OnGW2C_AckSetUserSign(data: msg.GW2C_AckSetUserSign) {
			if (data.ret == 0) {
                this.signStr=this.sign_txt.text;
				this.pageView.delPanelView();
			}else{
                showTips("修改个性签名失败！");
            }
		}
        public update(str:string) {
            this.signStr = str;
            this.sign_txt.text=this.signStr;
        }
        
        public delPanel(){
            this.cancel_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_cancel,this);
            this.save_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_save,this);
        }
    }
}