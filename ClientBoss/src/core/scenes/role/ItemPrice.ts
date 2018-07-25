module game {
    export class ItemPrice extends eui.ItemRenderer {
        chk_item: eui.CheckBox;
        img_equip: eui.Image;
        img_checked: eui.Image;
        txt_obtained: eui.Label;
        grp_price: eui.Group;
        img_price: eui.Image;
        txt_price: eui.Label;
        img_mask: eui.Image;
        img_checkedbg: eui.Image;

        public fnSelected = null;

        public constructor() {
            super();
            this.skinName = ItemPriceSkin;

            this.selected = false;

            // this.img_equip.addEventListener('touchBegin',this.onTouch,this);
            // this.chk_item.addEventListener('touchBegin',this.onTouch,this);
            this.img_mask.addEventListener('touchBegin', this.onTouch, this);
        }

        public set selected(b: boolean) {
            this.img_checked.visible = b;
            this.img_checkedbg.visible = b;
        }


        private onTouch() {
            this.selected = true;
            this.fnSelected && this.fnSelected(this);
        }

        protected getSkinName() {
            return ItemPriceSkin;
        }

        protected dataChanged() {
            console.log("数据改变：",this.data);
            // let prefix = "dress_02_json.";
            let info = {
                icon: /*prefix +*/ this.data['Path'],
                price: this.data['Price'],
                priceUnit: this.data['CoinType'],
            }
            this.setup(info);
        }


        public setup(info: { icon, price, priceUnit }) {
            if (info.icon) {
                this.img_equip.source = info.icon;
            }
            if (info.price <= 0) {
                this.grp_price.visible = false;
                this.txt_obtained.visible = true;
            } else {
                this.txt_price.text = `${info.price}`;
                this.grp_price.visible = true;
                this.txt_obtained.visible = false;
            }

            this.setPriceUnit(info.priceUnit);

        }

        //TODO: 设置不同的价格单位底图
        public setPriceUnit(n: number) {

        }

    }
    window["game.ItemPrice"] = game.ItemPrice;
}