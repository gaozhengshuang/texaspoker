module game {
    export class NewHouseItemPanel extends eui.ItemRenderer {
        private buildingImg: eui.Image;

        private name_txt: eui.Label;
        private weizhi_txt: eui.Label;
        private junjia_txt: eui.Label;

        private seeHuxing_btn: eui.Button;
        private bg_mc:eui.Rect;

        public constructor(data: any = null) {
            super();
            this.skinName = "resource/skins/NewHouseItemSkin.exml";
            //this.adaptive();
            this.bg_mc.alpha=0;
            this.bg_mc.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onclick_begin, this);
            this.bg_mc.addEventListener(egret.TouchEvent.TOUCH_END, this.onclick_begin, this);
            this.bg_mc.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onclick_begin, this);
            this.seeHuxing_btn.name="huxingBtn";

        }
        private onclick_begin(eve:egret.TouchEvent){
            if(eve.type==egret.TouchEvent.TOUCH_BEGIN){
                this.bg_mc.alpha=1;
            }else{
                this.bg_mc.alpha=0;
            }

        }
        private adaptive(){
            //this.scaleX=GameConfig.innerScaleW;
            //this.scaleY=GameConfig.innerScaleW;
        }

        private itemDate:any;
        protected dataChanged(): void {
            this.itemDate = this.data;
            if (this.itemDate) {
                this.name_txt.text=this.itemDate.Community;
                let Province:any=table.TCitysById[this.itemDate.Province];
                let City:any=table.TCitysById[this.itemDate.City];
                this.weizhi_txt.text=Province.Name+City.Name;
                this.buildingImg.source=RES.getRes("xiaoqu_"+this.itemDate.CommunityId+"_png");
                this.junjia_txt.text="当前均价"+this.itemDate.BuildingPrice+"金/平米";
            }
        }
    }
}