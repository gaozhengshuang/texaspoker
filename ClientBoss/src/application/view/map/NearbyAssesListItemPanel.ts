module game {
    export class NearbyAssesListItemPanel extends eui.ItemRenderer {
        private bName_txt: eui.Label;
        private roomNum_txt: eui.Label;
        private youIcon: eui.Image;
        private timeGroup: eui.Group;
        private time_txt: eui.Label;
        private bPoint_txt: eui.Label;
        private huxing_txt: eui.Label;
        private sexIcon: eui.Image;
        private bg_mc:eui.Rect;
        private pointGroup: eui.Group;
        private sellIcon: eui.Image;

        public constructor(data: any = null) {
            super();
            this.skinName = FujinRenAssesItemPanelSkin;
            this.adaptive();
            this.youIcon.visible = false;
            this.timeGroup.visible = false;
            this.sellIcon.visible = false;
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
                let buildInfo:table.ITBuildingsDefine=table.TBuildingsById[this.itemDate.bId];
                
                //this.roomNum_txt.text = '房间 : ' + this.itemDate.rId + "室";

                if(this.itemDate.bId<=0){
                    this.pointGroup.visible=false;
                    this.roomNum_txt.text = this.itemDate.rId+"号房间";
                    this.bName_txt.text = "酒店公寓";
                }else{
                    if(buildInfo){
                        this.pointGroup.visible=true;
                        this.bPoint_txt.text=table.TCitysById[buildInfo.Province].Name+"."+table.TCitysById[buildInfo.City].Name
                        this.bName_txt.text = buildInfo.Community;
                        this.roomNum_txt.text = /*buildInfo.Community+*/this.itemDate.roommember+"号房间";//+this.itemDate.rId+"号房间";
                    }
                }
                if(this.itemDate.issell){
                    this.sellIcon.visible=true;
                    this.youIcon.visible = false;
                    this.timeGroup.visible = false;
                }else{
                    this.sellIcon.visible=false;
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
                                this.time_txt.text = obj.time + '"';
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
}