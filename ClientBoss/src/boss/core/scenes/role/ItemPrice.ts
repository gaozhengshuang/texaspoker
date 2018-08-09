module game {
    export class ItemPrice extends eui.ItemRenderer {
        
        grp_price           : eui.Group;
      
        img_equip           : eui.Image;
        img_price           : eui.Image;
        img_checked         : eui.Image;
        img_checkedbg       : eui.Image;

        txt_obtained        : eui.Label;
        txt_price           : eui.Label;

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
            let  itemData =  <table.IEquipDefine> this.data;
            if(!itemData) return;

            //Icon
            let txtr:egret.Texture = RES.getRes(itemData.Path);
            let factor = itemData.Pos==7 ? 0.7 : 0.8;
            if(txtr)
            {
                this.img_equip.source    = txtr;
                this.img_equip.width     = txtr.textureWidth * factor;
                this.img_equip.height    = txtr.textureHeight * factor;
            }

            //价格
            this.img_price.source =  itemData.CoinType == msg.MoneyType._Gold ? "dress_01_json.dress_gold" : "dress_01_json.dress_01_19";
            this.txt_price.text = itemData.Price.toString();
 
            //已获得
            this.grp_price.visible = !DataManager.playerModel.IsHaveItem(itemData.Id);
            this.txt_obtained.visible = DataManager.playerModel.IsHaveItem(itemData.Id);
        }

        public set selected(b: boolean) {
            this.img_checked.visible = this.img_checkedbg.visible =  b;
        }

        public isComingSoon() {
            return !this.data.LoadPoint || this.data.LoadPoint.length <= 0;
        }
    }
}