module game {
    export class ItemPrice extends eui.ItemRenderer {
        chk_item: eui.CheckBox;
        img_equip: eui.Image;
        img_checked: eui.Image;
        txt_obtained: eui.Label;
        grp_price: eui.Group;
        img_price: eui.Image;
        txt_price: eui.Label;


        public constructor() {
            super();

            // this.skinName = ItemPriceSkin;

        }

        public setIcon(src: string) {
            this.img_equip && (this.img_equip.source = src);
        }

        public setChecked(b: boolean) {
            this.img_checked && (this.img_checked.visible = b);
        }
        public getChecked() {
            return this.img_checked && (this.img_checked.visible);
        }

        private vis_obtained(b) {
            this.txt_obtained && (this.txt_obtained.visible = b);
        }
        private vis_price(b) {
            this.grp_price && (this.grp_price.visible = b);
        }
        private set_price_text(n: number) {
            this.txt_price && (this.txt_price.text = `${n}`);
        }

        public setPrice(n: number) {
            this.set_price_text(n);
            if (n == 0) {
                this.vis_obtained(true);
                this.vis_price(false);

            } else {
                this.vis_obtained(false);
                this.vis_price(true);
            }
        }



    }
    window["game.ItemPrice"] = game.ItemPrice;
}