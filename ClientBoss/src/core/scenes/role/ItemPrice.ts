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
            this.skinName = ItemPriceSkin;

            this.img_checked.visible = false;
        }

        protected getSkinName() {
            return ItemPriceSkin;
        }

        public setup(info:{icon,price,priceUnit}){
            this.img_equip.source = info.icon;
            if(info.price <= 0) {
                this.grp_price.visible = false;
                this.txt_obtained.visible = true;
            }else {
                this.txt_price.text = `${info.price}`;
                this.grp_price.visible = true;
                this.txt_obtained.visible = false;
            }

            this.setPriceUnit(info.priceUnit);

        }

        //TODO: 设置不同的价格单位底图
        public setPriceUnit(n: number) {

        }


        public set icon(src: string) {
            console.log("icon: ", src);
            this.img_equip.source = src;
        }

        public set checked(b: boolean) {
            console.log("checked: ", b);
            this.img_checked.visible = b;
        }
        public get checked() {
            return this.img_checked.visible;
        }

        private vis_obtained(b) {
           this.txt_obtained.visible = b;
        }
        private vis_price(b) {
            this.grp_price.visible = b;
        }
        private set_price_text(n: number) {
            console.log("price: ", n, this.txt_price.text);
            console.log(`${n}`)
            this.txt_price.$setText("${n}")
            this.txt_price.text = `${n}`;
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