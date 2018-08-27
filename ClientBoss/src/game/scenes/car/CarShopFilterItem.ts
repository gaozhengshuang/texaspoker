module game {
	export class CarShopFilterItem extends eui.ItemRenderer  {
        center          : eui.Group;
        selectionTxt    : eui.Label;
        selectedBg      : eui.Rect;

		public constructor(data:any=null) {
            super();
            this.skinName = "resource/skins/car/CarShopFilterItemSkin.exml";
		}

        private itemData: CarFilterData;
        protected dataChanged():void{
            this.itemData=this.data;
            if(this.itemData){
                switch(this.itemData.type){
                    case CarShop.sortType.BRAND:
                        this.selectionTxt.text = this.itemData.brand;
                        this.selectedBg.scaleX = 300;
                        this.selectedBg.fillColor = 0xEDEDED;                        
                    break;
                    case CarShop.sortType.MODEL:
                        this.selectionTxt.text = this.itemData.model;
                        this.selectedBg.scaleX = 500;
                        this.selectedBg.fillColor = 0xC9C7C7;
                    break;
                    case CarShop.sortType.BRANDALL:
                    this.selectionTxt.text = "全部";
                    this.selectedBg.scaleX = 300;
                    this.selectedBg.fillColor = 0xEDEDED;                        
                    break;
                }
                   
            }
        }
        public set selected(b: boolean) {
            this.selectedBg.visible = b;
        }
	}
}