module game {
    export class ShopItemInfo extends eui.Component  {
        

        img_shopItemIcon   : eui.Image;
        img_shopItemSelect : eui.Image;
        img_gold           : eui.Image;
        img_diamond        : eui.Image;
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
                this.img_shopItemIcon.width     = txtr.textureWidth*0.9;
                this.img_shopItemIcon.height    = txtr.textureHeight*0.9;
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
            ShopItemData.Skill.forEach(
                (item,index,array)=>
                {
                    let skillData : table.ITSkillDefine = table.TSkillById[parseInt(item)];
                    if(skillData)
                    {
                        skillDes += (skillDes=="" ? skillData.Des : ";"+"\n"+skillData.Des);                        
                        //skillDes += (skillDes=="" ? skillData.Des : (index%2== 1 ? ";"+skillData.Des : ";"+"\n"+skillData.Des));
                    }
                }
            );
            this.shopItemAddtion.lineSpacing = 5;
            this.shopItemAddtion.textFlow = (new egret.HtmlTextParser).parser(
                skillDes
            );

            //价格
            this.img_gold.visible  =  this.itemData.CoinType==1;
            this.img_diamond.visible = this.itemData.CoinType==2;
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