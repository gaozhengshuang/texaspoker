module game {
    export class CarExpeditionItem extends eui.ItemRenderer  {
        
        allGroup            : eui.Group;
        itemImg             : eui.Image;
        BG                  : eui.Rect; 
        select_mc           : eui.Rect;

        num_txt             : eui.Label;

        private carData     : msg.ICarData;
        private itemData    : table.ITCarDefine;
      
        public constructor() {
            super();
            this.skinName = CarExpeditionItemSkin;
        }
        protected dataChanged():void{
            this.carData = this.data;
            this.setData(table.TCarById[this.data.tid]);
        }

        public setData(carItemData:table.ITCarDefine) {
            if(!carItemData) return;
            this.itemData = carItemData;
        
            //Icon
            let txtr:egret.Texture = RES.getRes(carItemData.path);
            let factor = 1;
            if(txtr)
            {
                this.itemImg.source    = txtr;
                //this.itemImg.width     = txtr.textureWidth * factor;
                this.itemImg.height    = txtr.textureHeight/ txtr.textureWidth * this.itemImg.width;
            }
            //数量
            this.num_txt.text = DataManager.playerModel.getUserInfo().cardatas.filter(data=>{return data.id==this.carData.id}).length.toString();
            this.BG.fillColor = CarExpeditionPanel.getInstance().isInRange(this.carData.attr.range) ? 0x9EA7AE: 0x595A5B;
        }

        public set selected(b: boolean) {
            this.select_mc.visible = b;
        }
    }
}