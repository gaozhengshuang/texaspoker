module game {
    export class ItemPrice extends eui.Component {
        chk_item: eui.CheckBox;
        img_equip: eui.Image;
        img_checked: eui.Image;
        coin_price: game.Coins;
        txt_obtained: eui.Label;

        public constructor() {
            super();
        }

        protected partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }


        protected childrenCreated(): void {
            super.childrenCreated();
        }

        public set icon(src: string) {
            this.img_equip && (this.img_equip.source = src);

        }

        public set checked(b: boolean) {
            this.img_checked && (this.img_checked.visible = b);
        }
        public get checked() {
            return this.img_checked && (this.img_checked.visible);
        }

        public set price(n: number) {
            if (n == 0) {
                this.txt_obtained.visible = true;
                this.coin_price.visible = false;
            }else {
                this.txt_obtained.visible = false;
                this.coin_price.visible = true;
                this.coin_price.coins = n;
            }
        }




    }
    window["game.ItemPrice"] = game.ItemPrice;
}