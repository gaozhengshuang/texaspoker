module game {
    export class ZhuhuListItemPanel extends eui.ItemRenderer {
        private name_txt: eui.Label;
        private roomNum_txt: eui.Label;
        private youIcon: eui.Image;
        private timeGroup: eui.Group;
        private time_txt: eui.Label;
        private level_txt: eui.Label;
        private huxing_txt: eui.Label;
        private sexIcon: eui.Image;
        private headImg: eui.Image;
        private bg_mc:eui.Rect;

        public constructor(data: any = null) {
            super();
            this.skinName = ZhuhuListItemPanelSkin;
            this.adaptive();
            this.youIcon.visible = false;
            this.timeGroup.visible = false;
            this.bg_mc.alpha=0;
            this.bg_mc.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onclick_begin, this);
            this.bg_mc.addEventListener(egret.TouchEvent.TOUCH_END, this.onclick_begin, this);
            this.bg_mc.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onclick_begin, this);
        }
        private onclick_begin(eve:egret.TouchEvent){
            if(eve.type==egret.TouchEvent.TOUCH_BEGIN){
                this.bg_mc.alpha=1;
            }else{
                this.bg_mc.alpha=0;
            }

        }
        private adaptive() {
            //this.scaleX=this.scaleY=GameConfig.innerScaleW;
        }
        private itemDate: HouseVO;
        protected dataChanged(): void {
            this.itemDate = this.data;
            if (this.itemDate) {
                this.name_txt.text = this.itemDate.ownername;
                //this.roomNum_txt.text = '房间 : ' + this.itemDate.rId + "室";

                if(this.itemDate.bId<=0){
                    this.roomNum_txt.text = this.itemDate.rId+"号房间";
                }else{
                    let buildInfo=table.TBuildingsById[this.itemDate.bId];
                    if(buildInfo){
                        this.roomNum_txt.text = /*buildInfo.Community+*/this.itemDate.roommember+"号房间";//+this.itemDate.rId+"号房间";
                    }
                }

                let obj: any = AnalyzeUserGoldTime(this.itemDate, Number(DataManager.playerModel.getUserInfo().userid));
                if (obj) {
                    switch (obj.state) {
                        case 1:
                            this.youIcon.visible = true;
                            this.timeGroup.visible = false;
                            break;
                        case 2:
                            this.youIcon.visible = false;
                            this.timeGroup.visible = true;
                            this.time_txt.text=obj.time+'"';
                            break;
                        case 3:
                            this.youIcon.visible = false;
                            this.timeGroup.visible = false;
                            break;


                    }
                }
            }
        }
    }
}