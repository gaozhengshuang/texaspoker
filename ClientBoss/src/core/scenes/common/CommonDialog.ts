module game {
    export class CommonDialog extends PanelComponent {
        btn_goPay: LabelButton;
        btn_close: IconButton;
        txt_content: eui.Label;
        _func   : Function;
        _func2  : Function;
        open_tip: egret.tween.TweenGroup;
        btn_width : number;
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
            ];
        }

        public OnShowPanel(contentTxt: string, btnTxt: string, func: Function = null, textFlow: Array<egret.ITextElement> = null,func2: Function = null) {
            if (textFlow) {
                this.txt_content.textFlow = textFlow;
            } else {
                this.txt_content.text = contentTxt;
            }
            this.btn_goPay.label = btnTxt;
            this.btn_goPay.width =  this.btn_width +  btnTxt.length  * this.btn_goPay.labelSize;
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