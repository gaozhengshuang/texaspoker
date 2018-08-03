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
        
            //Icon
            let txtr:egret.Texture = RES.getRes(ShopItemData.Path);
            let factor = this.itemData.Pos==7 ? 0.7 : 0.8;
            if(txtr)
            {
                this.img_shopItemIcon.source    = txtr;
                this.img_shopItemIcon.width     = txtr.textureWidth * factor;
                this.img_shopItemIcon.height    = txtr.textureHeight * factor;
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
            let skillDes : egret.ITextElement[] = [];
            ShopItemData.Skill.forEach(
                (item,index,array)=>
                {
                    let skillData : table.ITSkillDefine = table.TSkillById[parseInt(item)];
                    if(skillData)
                    {
                        let nextStr =  index%2==1 ? "\n" : "  ";
                        let txt_element_des: egret.ITextElement =  {text: skillData.Des.split(";"[0])[0]+"  ", style: {"textColor": 0xffffff,"size": 18,"strokeColor": 0x7e97d9, "stroke": 2}};
                        let txt_element_num: egret.ITextElement =  {text: skillData.Des.split(";"[0])[1]+nextStr, style: {"textColor": 0xfcf505,"size": 18,"strokeColor": 0x7e97d9, "stroke": 2}};
                        skillDes.push(txt_element_des);
                        skillDes.push(txt_element_num);
                    }
                }
            ); 
            this.shopItemAddtion.lineSpacing = 5;
            this.shopItemAddtion.textFlow = <Array<egret.ITextElement>>skillDes;
            //价格
            this.img_gold.visible  =  this.itemData.CoinType==1;
            this.img_diamond.visible = this.itemData.CoinType==2;
            this.txt_price.text = this.itemData.Price.toString();
        }

        public chooseAll(select:Boolean)
        {
            this._select = !select;
            this.OnSelect();    
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