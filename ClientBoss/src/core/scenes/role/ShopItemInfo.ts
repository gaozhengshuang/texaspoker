module game {
    export class ShopItemInfo extends eui.Component  {
        

        img_shopItemIcon   : eui.Image;
        img_shopItemSelect : eui.Image;

        //星级image
        img_star_0: eui.Image;
        img_star_1: eui.Image;
        img_star_2: eui.Image;
        img_star_3: eui.Image;
        img_star_4: eui.Image;

        shopItemName    : eui.Label;
        shopItemAddtion : eui.Label;
        txt_price       : eui.Label;

        btn_select      : IconButton;
        btn_select0     : IconButton;
        
        private itemData : table.IEquipDefine;
        private _select = false;


        public constructor() {
            super();
            //this.touchChildren = true;
            this._select = false;
            this.skinName = ShopItemSkin;
            this.btn_select0.icon = "shopItemButtonBg_png";
            this.btn_select0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnSelect,this);
        }

    
        public setData(ShopItemData: table.IEquipDefine) {
            if(!ShopItemData) return;
            this.itemData = ShopItemData;
            if(this.itemData.Pos==7)
            {
                this.img_shopItemIcon.x += 20;
                this.img_shopItemIcon.y -= 20;
            }
            //Icon
            let txtr:egret.Texture = RES.getRes(ShopItemData.Path);
            if(txtr)
            {
                this.img_shopItemIcon.source    = txtr;
                this.img_shopItemIcon.width     = txtr.textureWidth;
                this.img_shopItemIcon.height    = txtr.textureHeight;
            }
            
            //名字
            this.shopItemName.textFlow = [
                { text: ShopItemData.Name, style: { bold: true } },
                //{ text: `:${gold}`, style: { fontFamily: "DynoBold" } },
            ]
         
/*             //星级
            for (let i = 0; i < 5; ++i) {
                this[`img_star_${i}`].visible = ShopItemData.lv >i;
            } */
         
     
            //描述
            let skillDes = "";
            for(let id_str of ShopItemData.Skill)
            {
                let skillData : table.ITSkillDefine = table.TSkillById[parseInt(id_str)];
                if(skillData)
                {
                    skillDes += (skillDes=="" ? skillData.Des : ";"+skillData.Des);
                }
            }

            this.shopItemAddtion.textFlow = [
                {text:ShopItemData.Desc, style:{"textColor":0xff9f3b,"bold": true}},
                {text:skillDes, style:{"textColor":0x808080, "size":20}},
            ]
            //价格
            this.txt_price.text = this.itemData.Price.toString();
        }

        protected partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        private OnSelect()
        {
            this._select = !this._select;
            this.img_shopItemSelect.visible  = this._select;
            RoleDressShopCart.getInstance().OnChooseItem(this._select,this.itemData);
        }

        protected dataChanged():void{
            //数据改变时，会自动调用 dataChanged 这个方法
            //this.shopItemName.text = this.itemData.name;
        }
    }
}