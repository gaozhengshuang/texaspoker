module game {
    export class DepotListItemPanel extends eui.ItemRenderer {
        
        private itemImg: eui.Image;
        private num_txt: eui.Label;

        public constructor(data: any = null) {
            super();
            this.skinName = DepotListItemSkin;
            //this.adaptive();
            

        }
        private onclick_begin(eve:egret.TouchEvent){
           

        }
        private adaptive(){
            //this.scaleX=GameConfig.innerScaleW;
            //this.scaleY=GameConfig.innerScaleW;
        }

        private itemDate:any;
        protected dataChanged(): void {
            this.itemDate = this.data;
            if (this.itemDate) {
                
            }
        }
    }
}