module game {
    export class ItemPrice extends eui.ItemRenderer {
        grp_price           : eui.Group;
        grp_item           : eui.Group;
      
        img_equip           : eui.Image;
        img_price           : eui.Image;
        img_checked         : eui.Image;
        img_checkedbg       : eui.Image;

        txt_obtained        : eui.Label;
        txt_price           : eui.Label;
        txt_item            : eui.Label;

        chk_item            : eui.CheckBox;

        constructor() {
            super();
            this.skinName = ItemPriceSkin;
            this.selected = false;

            this.txt_obtained.visible = false;
        }

        protected dataChanged() {
            if (this.isComingSoon()) {
                this.data['Path'] = "dress_01_json.dress_01_17";
                this.data['Price'] = "";
            }

            this.updateData();
        }
    
        private updateData() {
            let equipData = <table.IEquipDefine> this.data;
            let itemData = DataManager.playerModel.getBagItem(equipData.DebrisId);
            if(!equipData) return;

            //Icon
            let txtr:egret.Texture = RES.getRes(equipData.Path);
            let factor = equipData.Pos==7 ? 0.7 : 0.8;
            if(txtr)
            {
                this.img_equip.source    = txtr;
                this.img_equip.width     = txtr.textureWidth * factor;
                this.img_equip.height    = txtr.textureHeight * factor;
            }
            
            if (DataManager.playerModel.IsHaveItem(equipData.Id)) {
                this.txt_obtained.visible = true;
                this.grp_price.visible = false;
                this.grp_item.visible = false;
            } else {
                //获得类型
                this.txt_obtained.visible = false;
                if (equipData.CoinType == (msg.MoneyType._Gold || msg.MoneyType._Diamond)) {
                    this.grp_price.visible = true;
                    this.img_price.source =  equipData.CoinType == msg.MoneyType._Gold ? "dress_01_json.dress_gold" : "dress_01_json.dress_01_19";
                    this.txt_price.text = equipData.Price.toString();
                } else {
                    this.grp_item.visible = true;
                    let itemNum = 0;
                    if(itemData) {
                        itemNum = itemData.num;
                    }
                    this.txt_item.text = itemNum+"/"+equipData.DebrisNum;
                }
            }
        }

        public set selected(b: boolean) {
            this.img_checked.visible = this.img_checkedbg.visible =  b;
        }

        public isComingSoon() {
            return !this.data.LoadPoint || this.data.LoadPoint.length <= 0;
        }
    }
}