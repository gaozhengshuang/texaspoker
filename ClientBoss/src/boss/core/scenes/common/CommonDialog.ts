module game {
    export class CommonDialog extends PanelComponent {
        dialog_type_1 : eui.Group;
        btn_goPay: LabelButton;
        btn_close: IconButton;
        imageBg    : eui.Image;
        txt_content: eui.Label;
        _func   : Function;
        _func2  : Function;
        open_tip: egret.tween.TweenGroup;
        btn_width : number;

    
        dialog_type_2 : eui.Group;
        imageBg_type_2    : eui.Image;
        btn_goPay_type_2: LabelButton;
        btn_close_type_2: IconButton;
        txt_content_type_2 : eui.Label;
        

        protected getSkinName() {
            return CommonDialogSkin;
        }
        protected init() {
            this.btn_goPay.bg = "lucky_json.luckyBtn";
            this.btn_close.icon = "lucky_json.luckycloseBtn";
            this.btn_width  = this.btn_goPay.width;
            this._touchEvent = [
                {target: this.btn_close, callBackFunc: this.OnClosePanel},
                {target: this.btn_goPay, callBackFunc: this.OnClickGo},
                {target: this.btn_close_type_2, callBackFunc: this.OnClosePanel},
                {target: this.btn_goPay_type_2, callBackFunc: this.OnClickGo},
            ];
        }

        public updateView(bgPath:string,goBtnPath:string,backBtnPath:string)
        {
            this.dialog_type_1.visible = false;
            this.dialog_type_2.visible =  true;

            let txtr:egret.Texture = RES.getRes(bgPath);
            if(txtr){
                this.imageBg_type_2.source = txtr;
                this.imageBg_type_2.width  = txtr.textureWidth;
                this.imageBg_type_2.height = txtr.textureHeight; 
            }
 
            this.btn_goPay_type_2.bg = goBtnPath;
         
            txtr = RES.getRes(backBtnPath);
            if(txtr){
                this.btn_close_type_2.icon = backBtnPath;
                this.btn_close_type_2.width  = txtr.textureWidth;
                this.btn_close_type_2.height = txtr.textureHeight; 
            }

/*             this.btn_goPay.y = this.imageBg.y + this.imageBg.height*0.5 + this.btn_goPay.height;
            this.btn_close.x = this.imageBg.x + this.imageBg.width - this.btn_close.width;
            this.btn_close.y =  this.imageBg.y; */
        }


        public OnShowPanel(contentTxt: string, btnTxt: string, func: Function = null, textFlow: Array<egret.ITextElement> = null,func2: Function = null) {
            
            let _txt_content = this.dialog_type_1.visible ? this.txt_content : this.txt_content_type_2;
            let _btn_goPlay = this.dialog_type_1.visible ? this.btn_goPay : this.btn_goPay_type_2;

            if (textFlow) {
                _txt_content.textFlow = textFlow;
            } else {
                _txt_content.text = contentTxt;
            }
           
            _btn_goPlay.label = btnTxt;
            _btn_goPlay.width =  this.btn_width +  btnTxt.length  * _btn_goPlay.labelSize;
            this._func = func;
            this._func2 = func2;
            this.show();
            this.open_tip.play(0);
        }

        private OnClickGo() {
            if (this._func) {
                this._func();
            }
            this.remove();
        }

        private OnClosePanel() {
            if (this._func2) {
                this._func2();
            }
            this.remove();
        }

        private static _instance: CommonDialog;

        public static getInstance(): CommonDialog {
            if (!CommonDialog._instance) {
                CommonDialog._instance = new CommonDialog();
            }
            return CommonDialog._instance;
        }
    }
}