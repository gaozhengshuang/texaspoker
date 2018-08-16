module game {
    export class RoomUplevelListItemPanel extends eui.ItemRenderer {
        private level_txt: eui.Label;
        private chanliang_txt: eui.Label;
        private quyuImg: eui.Image;
        private btn_bg: eui.Image;
        private btnGruop: eui.Group;
        private spend_txt: eui.Label;

        public constructor(data: any = null) {
            super();
            this.skinName = "resource/skins/RoomUplevelListUI.exml";
            this.adaptive();
        }
        private adaptive() {
            //this.scaleX=this.scaleY=GameConfig.innerScaleW;
        }
        private itemDate: any;
        protected dataChanged(): void {
            this.itemDate = this.data;
            if (this.itemDate) {
                this.quyuImg.source = "resource/assets2/roomLevelIcon" + (this.itemDate.index + 1) + ".png";
                if (this.itemDate.data.level < 5) {
                    this.btnGruop.visible=true;
                    this.level_txt.text = this.itemDate.name + "等级" + this.itemDate.data.level + "级——"
                        + this.itemDate.name + "等级" + (this.itemDate.data.level + 1) + "级";
                    let type: any;
                    let typeNext: any;
                    console.log(this.itemDate.data);
                    if (this.itemDate.index == 0) {
                        type=table.THouseById[this.itemDate.data.tId];
                        this.chanliang_txt.visible=false;
                        this.spend_txt.text=""+type.LevelUpCost;
                        if(type.LevelUpCost>DataManager.playerModel.getUserInfo().gold){
                            GrayScaleFilter.getInstance().setfilterFun(this.btn_bg);
                        }
                        else{
                            this.btn_bg.filters=[];
                        }

                    } else {
                        this.chanliang_txt.visible=true;
                        type = table.THouseCellById[this.itemDate.data.tid];
                        typeNext = table.THouseCellById[this.itemDate.data.tid+1];
                        this.chanliang_txt.text = "金币产量" + type.ProduceGold+">"+"金币产量" + typeNext.ProduceGold;
                        this.spend_txt.text=""+type.LevelUpCost;
                        if(type.LevelUpCost>DataManager.playerModel.getUserInfo().gold){
                            GrayScaleFilter.getInstance().setfilterFun(this.btn_bg);
                        }
                        else{
                            this.btn_bg.filters=[];
                        }
                    }
                    
                }
                else {
                    this.btnGruop.visible=false;
                    this.level_txt.text="已达到"+this.itemDate.name+ "最高等级";
                    if (this.itemDate.index == 0) {
                        this.chanliang_txt.visible=true;
                    } else {
                        this.chanliang_txt.visible=false;
                        this.chanliang_txt.text = "金币产量已达最大";
                    }
                }
            }
        }
    }
}