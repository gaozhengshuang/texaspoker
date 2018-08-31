module game {
    export class DepotListItemPanel extends eui.ItemRenderer {
        
        private itemImg: eui.Image;
        private num_txt: eui.Label;
        private select_mc:eui.Rect;

        public constructor(data: any = null) {
            super();
            this.skinName = DepotListItemSkin;
            //this.adaptive();
            

        }
        private adaptive(){
            //this.scaleX=GameConfig.innerScaleW;
            //this.scaleY=GameConfig.innerScaleW;
        }

        private itemDate:any;
        protected dataChanged(): void {
            this.itemDate = this.data;
            if (this.itemDate) {
                let itemInfo = table.ItemBaseDataById[this.itemDate.id];
                this.itemImg.source=RES.getRes("item_"+itemInfo.ImageId+"_png");
                this.num_txt.text=""+this.itemDate.num;
            }
        }

        public showFrame(){
            this.select_mc.visible=true;
        }
        public hideFrame(){
            this.select_mc.visible=false;
        }

        
    }
}