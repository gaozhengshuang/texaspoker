module game {
    export class RoomUplevelListItemPanel extends eui.ItemRenderer {
        private level_txt: eui.Label;
        private chanliang_txt: eui.Label;
        private quyuImg: eui.Image;
        private btn_bg: eui.Image;
        private btnGruop: eui.Group;
        private spend_txt: eui.Label;
        private manji_txt: eui.Label;
        private btnName_txt: eui.Label;

        public constructor(data: any = null) {
            super();
            this.skinName = "resource/skins/RoomUplevelListUI.exml";
            this.adaptive();
            this.btnGruop.touchChildren = false;
            this.btnGruop.touchEnabled = true;
            this.btnGruop.name = "levelBtnGruop";
        }
        private adaptive() {
            //this.scaleX=this.scaleY=GameConfig.innerScaleW;
        }
        private itemDate: any;
        protected dataChanged(): void {

            this.itemDate = this.data;
            if (this.itemDate) {
                this.quyuImg.source = "resource/assets2/roomLevelIcon" + (this.itemDate.index + 1) + ".png";
                let type: any;
                let typeNext: any;
                if (this.itemDate.index == 0) {
                    this.chanliang_txt.visible = false;
                    type = table.THouseById[this.itemDate.data.tId];
                    if (this.itemDate.data.level < 5) {
                        this.spend_txt.visible=true;
                        this.btnGruop.visible = true;
                        this.manji_txt.visible = false;
                        this.level_txt.text = this.itemDate.name + "等级" + this.itemDate.data.level + "级——"
                            + this.itemDate.name + "等级" + (this.itemDate.data.level + 1) + "级";
                        this.spend_txt.text = "" + type.LevelUpCost+"金币";
                        if (type.LevelUpCost > DataManager.playerModel.getUserInfo().gold) {
                            GrayScaleFilter.getInstance().setfilterFun(this.btn_bg);
                            this.btnName_txt.text = "金币不足";
                        }
                        else {
                            this.btn_bg.filters = [];
                            this.btnName_txt.text = "升 级";
                        }
                    } else {
                        this.btnGruop.visible = false;
                        this.manji_txt.visible = true;
                        this.level_txt.text = this.itemDate.name + "等级" + this.itemDate.data.level;
                    }
                } else {
                    type = table.THouseCellById[this.itemDate.data.tid];
                    typeNext = table.THouseCellById[this.itemDate.data.tid + 1];
                    this.chanliang_txt.visible = true;
                    if (this.itemDate.data.level < 5) {
                        this.btnGruop.visible = true;
                        this.manji_txt.visible = false;

                        this.level_txt.text = this.itemDate.name + "等级" + this.itemDate.data.level + "级——"
                            + this.itemDate.name + "等级" + (this.itemDate.data.level + 1) + "级";

                        this.chanliang_txt.text = "金币产量" + type.ProduceGold + ">" + "金币产量" + typeNext.ProduceGold;
                        this.spend_txt.text = "" + type.LevelUpCost+"金币";
                        if (this.itemDate.hLevel <= this.itemDate.data.level) {
                            this.spend_txt.visible=false;
                            this.btnName_txt.text="请先提升\n房屋等级";
                            GrayScaleFilter.getInstance().setfilterFun(this.btn_bg);
                            //this.btnGruop.alpha = 0.6;
                        } else {
                            this.spend_txt.visible=true;
                            if (type.LevelUpCost > DataManager.playerModel.getUserInfo().gold) {
                                GrayScaleFilter.getInstance().setfilterFun(this.btn_bg);
                                //this.btnGruop.alpha = 0.6;
                                this.btnName_txt.text = "金币不足";
                            }
                            else {
                                this.btn_bg.filters = [];
                                this.btnGruop.alpha = 1;
                                this.btnName_txt.text = "升 级";
                            }
                        }


                    } else {
                        this.btnGruop.visible = false;
                        this.manji_txt.visible = true;
                        this.level_txt.text = this.itemDate.name + "等级" + this.itemDate.data.level;
                        this.chanliang_txt.text = "金币产量" + type.ProduceGold
                    }
                }
            }
        }
    }
}