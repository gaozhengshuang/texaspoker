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
        
        private itemData : ShopItem;
        private _select = false;


        public constructor() {
            super();
            //this.touchChildren = true;
            this._select = false;
            this.skinName = ShopItemSkin;
            this.btn_select0.icon = "shopItemButtonBg_png";
            this.btn_select0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnSelect,this);
        }

    
        public setData(ShopItemData: ShopItem) {
            if(!ShopItemData) return;
            this.itemData = ShopItemData;
            //名字
            this.shopItemName.textFlow = [
                { text: ShopItemData.name, style: { bold: true } },
                //{ text: `:${gold}`, style: { fontFamily: "DynoBold" } },
            ]
         
            //星级
            for (let i = 0; i < 5; ++i) {
                this[`img_star_${i}`].visible = ShopItemData.lv >i;
            }

            //描述
            this.shopItemAddtion.textFlow = [
                { text: ShopItemData.des, style: { bold: true } },
            ]
            //价格
            this.txt_price.text = this.itemData.price.toString();
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