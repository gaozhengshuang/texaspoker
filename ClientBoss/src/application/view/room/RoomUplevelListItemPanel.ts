module game {
    export class RoomUplevelListItemPanel extends eui.ItemRenderer {
        private level_txt: eui.Label;
        private chanliang_txt: eui.Label;
        private quyuImg: eui.Image;
        private btn_bg: eui.Image;
        private goldImg: eui.Image;
        private btnGruop: eui.Group;
        private spend_txt: eui.Label;
        private manji_txt: eui.Label;
        private btnName_txt: eui.Label;
        //private lock_txt: eui.Label;

        public constructor(data: any = null) {
            super();
            this.skinName = RoomUplevelListUI;
            this.adaptive();
            this.btnGruop.touchChildren = false;
            this.btnGruop.touchEnabled = true;
            this.btnGruop.name = "levelBtnGruop";
        }
        private adaptive() {
            //this.scaleX=this.scaleY=GameConfig.innerScaleW;
        }
        private itemDate: any;
        private type: any;
        private typeNext: any;
        private itemInfoList: any[];
        private itemList: ItemUplevelPanel[];
        public isCanLevel:boolean=false;
        protected dataChanged(): void {
            this.removeLevelItem();
            this.isCanLevel=false;
            this.itemDate = this.data;
            if (this.itemDate) {
                this.itemDate.isCan=this.isCanLevel;
                this.quyuImg.source = "roomLevelIcon" + (this.itemDate.index + 1) + "_png";
                if (this.itemDate.index == 0) {
                    this.chanliang_txt.visible = false;
                    this.goldImg.visible = true;
                    //this.lock_txt.visible=false;
                    this.type = table.THouseById[this.itemDate.data.tId];
                    this.itemInfoList = this.getLevelItemVoList(this.type);
                    if (this.itemDate.data.level < this.itemDate.MaxLv) {
                        this.spend_txt.visible = true;
                        this.btnGruop.visible = true;
                        this.manji_txt.visible = false;
                        this.level_txt.text = this.itemDate.name + "等级" + this.itemDate.data.level + "级——"
                            + this.itemDate.name + "等级" + (this.itemDate.data.level + 1) + "级";
                        this.spend_txt.text = "" + this.type.LevelUpCost + "金币";
                        if (!this.updateLevelItem(this.itemInfoList)) {
                            GrayScaleFilter.getInstance().setfilterFun(this.btn_bg);
                            this.btnName_txt.text = "材料不足";
                        } else {
                            if (this.type.LevelUpCost > DataManager.playerModel.getUserInfo().gold) {
                                GrayScaleFilter.getInstance().setfilterFun(this.btn_bg);
                                this.btnName_txt.text = "金币不足";
                            }
                            else {
                                this.isCanLevel=true;
                                this.itemDate.isCan=this.isCanLevel;
                                this.btn_bg.filters = [];
                                this.btnName_txt.text = "升 级";
                            }
                        }
                    } else {
                        this.btnGruop.visible = false;
                        this.manji_txt.visible = true;
                        this.level_txt.text = this.itemDate.name + "等级" + this.itemDate.data.level;
                    }
                } else {
                    this.type = table.THouseCellById[this.itemDate.data.tid];
                    this.itemInfoList = this.getLevelItemVoList(this.type);
                    this.typeNext = table.THouseCellById[this.itemDate.data.tid + 1];
                    this.chanliang_txt.visible = true;
                    if (this.itemDate.data.level < this.itemDate.MaxLv) {
                        this.btnGruop.visible = true;
                        this.manji_txt.visible = false;
                        this.level_txt.text = this.itemDate.name + "等级" + this.itemDate.data.level + "级——"
                            + this.itemDate.name + "等级" + (this.itemDate.data.level + 1) + "级";
                        this.chanliang_txt.text = "金币产量" + this.type.ProduceGold + ">" + "金币产量" + this.typeNext.ProduceGold;
                        this.spend_txt.text = "" + this.type.LevelUpCost + "金币";
                        let isItem: boolean = this.updateLevelItem(this.itemInfoList);
                        if (this.itemDate.hLevel < this.itemDate.lockLevel) {
                            //this.spend_txt.visible = false;
                            //this.goldImg.visible = false;
                            //this.lock_txt.visible=true;
                            //this.btnName_txt.visible=false;
                            this.btnName_txt.text = "房屋" + this.itemDate.lockLevel + "级解锁";
                            GrayScaleFilter.getInstance().setfilterFun(this.btn_bg);
                        } else {
                            this.goldImg.visible = true;
                            //this.lock_txt.visible=false;
                            this.btnName_txt.visible = true;
                            if (this.itemDate.hLevel <= this.itemDate.data.level) {
                                //this.spend_txt.visible = false;
                                this.btnName_txt.text = "请先提升\n房屋等级";
                                GrayScaleFilter.getInstance().setfilterFun(this.btn_bg);
                                //this.btnGruop.alpha = 0.6;
                            } else {
                                if (!isItem) {
                                    GrayScaleFilter.getInstance().setfilterFun(this.btn_bg);
                                    this.btnName_txt.text = "材料不足";
                                } else {
                                    this.spend_txt.visible = true;
                                    if (this.type.LevelUpCost > DataManager.playerModel.getUserInfo().gold) {
                                        GrayScaleFilter.getInstance().setfilterFun(this.btn_bg);
                                        //this.btnGruop.alpha = 0.6;
                                        this.btnName_txt.text = "金币不足";
                                    }
                                    else {
                                        this.isCanLevel=true;
                                        this.itemDate.isCan=this.isCanLevel;
                                        this.btn_bg.filters = [];
                                        this.btnGruop.alpha = 1;
                                        this.btnName_txt.text = "升 级";
                                    }
                                }
                            }
                        }
                    } else {
                        this.goldImg.visible = true;
                        this.btnGruop.visible = false;
                        this.manji_txt.visible = true;
                        //this.lock_txt.visible=false;
                        this.level_txt.text = this.itemDate.name + "等级" + this.itemDate.data.level;
                        this.chanliang_txt.text = "金币产量" + this.type.ProduceGold
                    }
                }
            }
        }

        private getLevelItemVoList(type: any): any[] {
            let list: any[] = [];
            if (type && type.LevelUpNeedItem && type.LevelUpNeedItem != "") {
                let strArr: string[] = type.LevelUpNeedItem.split("|");
                if (strArr && strArr.length > 0) {
                    for (let i: number = 0; i < strArr.length; i++) {
                        let strItem: string[] = strArr[i].split("-");
                        if (strItem && strItem.length >= 2) {
                            list.push({
                                id: Number(strItem[0]),
                                num: Number(strItem[1])
                            })
                        }
                    }
                }
            }
            return list;
        }
        private updateLevelItem(info:any[]): boolean {
            let bool: boolean = true;
            if(info && info.length>0){
                this.itemList=[];
                for (let i: number = 0; i < info.length; i++) {
                    let item:ItemUplevelPanel=new ItemUplevelPanel();
                    let itemBool:boolean=item.update(info[i].id,info[i].num);
                    bool=bool?itemBool:bool;
                    this.addChild(item);
                    item.x=160+i*item.width;
                    item.y=96;
                    this.itemList.push(item);
                }
            }
            return bool;
        }
        private removeLevelItem(){
            if(this.itemList && this.itemList.length>0){
                for (let i: number = 0; i < this.itemList.length; i++) {
                    this.itemList[i].removePanel();
                    this.itemList[i]=null;
                }
            }
            this.itemList=[];
        }
    }
}