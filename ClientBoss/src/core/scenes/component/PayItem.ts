module game {
    export class PayItem extends eui.Component {
        public itembg: eui.Button;
        itemGold: eui.Label;
        itemRmb: eui.Label;
        itemImg: eui.Image;

        private _checked:boolean  =true;

        // public addClickEvent(fnClick,) {
        //     this.itembg.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
        //         this._checked = !this._checked;
        //         this.setChecked(this._checked);
        //     },this);
        // }

       public setItem(rmb: number, gold: number) {
            this.itemGold && (this.itemGold.text = `${gold}钻石`);
            this.itemRmb && (this.itemRmb.text = `${rmb}元`);
        }

        public isChecked() {
            return this._checked;
        }

       public setChecked(b: boolean) {
            if (b) {
                this.itemImg && (this.itemImg.visible = true);
            } else {
                this.itemImg && (this.itemImg.visible = false);
            }
        }

    }

    window["game.PayItem"] = game.PayItem;
}