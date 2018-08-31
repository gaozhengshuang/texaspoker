module game {
    export class DepotListItemPanel extends eui.Component {
        public static SELECT: string = "select";

        private itemImg: eui.Image;
        private num_txt: eui.Label;
        private select_mc:eui.Rect;

        public constructor(data: any = null) {
            super();
            this.skinName = DepotListItemSkin;
            //this.adaptive();
            this.touchChildren=false;
            this.touchEnabled=true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.select_begin, this);
        }
        private select_begin() {
			this.dispatchEvent(new BasicEvent(DepotListItemPanel.SELECT,{index:this.itemIndex}));
		}
        private adaptive(){
            //this.scaleX=GameConfig.innerScaleW;
            //this.scaleY=GameConfig.innerScaleW;
        }

        public itemDate:any;
        private itemIndex:number;
        public dataChanged(data:any,index:number): void {
            this.itemDate = data;
            this.itemIndex=index;
            if (this.itemDate) {
                let itemInfo = table.ItemBaseDataById[this.itemDate.id];
                this.itemImg.source=RES.getRes(itemInfo.ImageId+"_png");
                this.num_txt.text=""+this.itemDate.num;
            }
        }
        public showFrame(){
            this.select_mc.visible=true;
        }
        public hideFrame(){
            this.select_mc.visible=false;
        }
        public removePanel(){
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.select_begin, this);
            if(this.parent!=null){
                this.parent.removeChild(this);
            }
        }
    }
}