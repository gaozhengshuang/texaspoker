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

            this.img_equip.addEventListener('touchEnd',this.onTouch,this);
            this.chk_item.addEventListener('touchEnd',this.onTouch,this);
        }

        private onTouch() {
            this.img_checked.visible = !this.img_checked.visible;
            this.chk_item.selected = !this.chk_item.selected;
        }

        protected getSkinName() {
            return ItemPriceSkin;
        }

        protected dataChanged() {
            let prefix = "dress_02_json.";
            let info = {
                icon: prefix + this.data['img'],
                price: this.data['price'],
                priceUnit: this.data['priceUnit'],
            }
            this.setup(info);
        }


        public setup(info: { icon, price, priceUnit }) {
            this.img_equip.source = info.icon;
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