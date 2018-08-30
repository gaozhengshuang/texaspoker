module game {
    export class SliderComponent extends eui.Component {
        sliderForBg : eui.Image;
        sliderBg    : eui.Image;
        percentTxt  : eui.Label;
        expBar      : eui.ProgressBar;

        private _bg         : string;
        private _textShow   : boolean;
        private _value      : number;

        protected getSkinName() {
            return SliderSkin;
        }

        set bg (value: string) {
            this._bg = value;
            if (this.sliderBg) {
                this.sliderBg.source = value;
            }
        }
        set txtShow(value: boolean) {
            this._textShow = value;
            if (this.percentTxt) {
                this.percentTxt.visible = this._textShow;
            }
        }
        set value(_value:number){
            this._value = _value;
            if(this.expBar){
                this.expBar.value = Math.min(Math.max(0,this._value),1);
                this.sliderForBg.scaleX = this._value;
                this.percentTxt.text = Math.round(this._value*100).toString()+"%";
            }   
        }
    }
}