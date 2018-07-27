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
        public grp_mask: eui.Group;
        public img_infomask: eui.Image;
        public txt_desc1: eui.Label;
        public txt_desc2: eui.Label;



        private _imgOriSize;
        public fnSelected = null;

        public constructor() {
            super();
            this.skinName = ItemPriceSkin;

            this.selected = false;
            this.txt_obtained.visible = false;


            this._imgOriSize = {
                w: this.img_equip.width,
                h: this.img_equip.height,
            }
        }

        public setSuitWidth() {
            this.img_equip.width = 60;
        }
        public setNormalWidth() {
            this.img_equip.width = 100;
        }

        public set selected(b: boolean) {
            this.img_checked.visible = b;
            this.img_checkedbg.visible = b;
            this.grp_mask.visible = b;
        }

        protected getSkinName() {
            return ItemPriceSkin;
        }

        public static isComingSoon(item: table.IEquipDefine) {
            if (!item.LoadPoint || item.LoadPoint.length <= 0) {
                return true;
            }
            return false;
        }
        public static isObtain(item: table.IEquipDefine) {
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
                this.data['Price'] = "?";
            }

            let info = {
                icon: this.data['Path'],
                price: this.data['Price'],
                priceUnit: this.data['CoinType'],
            }
            this.setup(info);

            if (ItemPrice.isSuit(this.data)) {
                this.setSuitWidth()
            } else {
                this.setNormalWidth();
            }
        }
        
        public setDesc(desc1: string, desc2: string) {
            this.txt_desc1.text = desc1;
            this.txt_desc2.text = desc2;
        }

        public static isSuit(item:table.IEquipDefine) {
            let n = item.Id;
            return (n >= 700 && n <= 799);
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

            this.setCoinType(info.priceUnit);

        }

        private setCoinType(n: number) {
            if (n == msg.MoneyType._Gold) { // 1 金币
                this.img_price.source = "dress_01_json.dress_gold";
            } else {
                this.img_price.source = "dress_01_json.dress_01_19";
            }
        }



    }
    window["game.ItemPrice"] = game.ItemPrice;
}