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

        }

        public set selected(b: boolean) {
            this.img_checked.visible = b;
            this.img_checkedbg.visible = b;
        }

        protected getSkinName() {
            return ItemPriceSkin;
        }

        public static  isComingSoon(item: table.IEquipDefine) {
            if (!item.LoadPoint || item.LoadPoint.length <= 0) {
                return true;
            }
            return false;
        }
        public static isObtain(item:table.IEquipDefine) {
            if (item.Price <= 0) return true;
            return false;
        }

        public set obtain(b: boolean) {
                 this.grp_price.visible = !b;
                this.txt_obtained.visible = b;
        }

        protected dataChanged() {
            if (ItemPrice.isComingSoon(this.data)) {
                this.data['Path'] = "dress_01_json.dress_01_17";
                this.data['Price'] = "敬请期待";
            }

            let info = {
                icon: this.data['Path'],
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
                this.obtain = true;
            } else {
                this.txt_price.text = `${info.price}`;
                this.obtain = false;
            }

            this.setPriceUnit(info.priceUnit);

        }

        public setPriceUnit(n: number) {
            if (n == 1) { // 1 金币
                this.img_price.source = "ui_json.gold";
            } else {
                this.img_price.source = "dress_01_json.dress_01_19";
            }
        }

    }
    window["game.ItemPrice"] = game.ItemPrice;
}