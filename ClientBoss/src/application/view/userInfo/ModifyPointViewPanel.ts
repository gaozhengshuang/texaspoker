module game {
    export class ModifyPointViewPanel extends eui.Component {


        private nowPoint_txt: eui.Label;
        private cancel_btn: eui.Button;
        private save_btn: eui.Button;

        private listScroller: eui.Scroller;
        private listGroup: eui.Group;
        private cityListGroup: eui.Group;
        private dingweiGroup: eui.Group;
        private selectIcon: eui.Group;

        private pageView: PageUserInfoView;
        public userInfo: IUserInfo = null;

        private baseprovince: number = 0;
        private basecity: number = 0;


        private provList: table.ITCitysDefine[] = [];
        private provItemList: PointProvinceItemPanel[] = [];

        private cityList: table.ITCitysDefine[] = [];
        private cityItemList: PointCityItemPanel[] = [];

        public constructor(view: PageUserInfoView) {
            super();

            this.pageView = view;
            this.skinName = ModifyPointViewSkin;
            this.cityListGroup.visible = false;
            this.selectIcon.visible = false;
            this.init();

            /*this.filterPanel.jiage_txt.visible=false;
            this.filterPanel.priceGroup.visible=false;
            this.filterPanel.init(1, table.TCitys);
            this.filterPanel.addEventListener(CommonFilterPanel.SELECT, this.select_begin, this);*/
            this.cancel_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_cancel, this);
            this.dingweiGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_dingwei, this);
            this.save_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_save, this);

        }
        private tolList: table.ITCitysDefine[] = [];
        public init() {
            this.tolList = table.TCitys;
            this.provList = [];
            for (let rec of this.tolList) {
                if (rec.Type == 1) {
                    this.provList.push(rec);
                }
            }
            this.initProvList();
        }

        private onclick_cancel() {
            this.pageView.delPanelView();

        }
        private onclick_save() {
            if (this.baseprovince != 0 && this.basecity != 0) {
                sendMessage("msg.C2GW_ReqSetBaseArea", msg.C2GW_ReqSetBaseArea.encode({ province: this.baseprovince, city: this.basecity }));
                this.pageView.delPanelView();
            }
        }
        private dengweiInfo: any;
        private onclick_dingwei() {
            this.selectIcon.visible = true;
            this.closeCityList();
            this.delProvList();
            this.baseprovince=GameConfig.provinceId;
            this.basecity=GameConfig.cityId;
        }
        public update(info: IUserInfo) {
            this.userInfo = info;
            this.nowPoint_txt.text = GameConfig.provinceStr + "." + GameConfig.cityStr;
            if (this.userInfo.baseprovince == GameConfig.provinceId &&
                this.userInfo.basecity == GameConfig.cityId) {
                this.selectIcon.visible = true;
            } else {
                this.selectIcon.visible = false;
                this.selectItem(this.userInfo.baseprovince, this.userInfo.basecity);
            }
        }


        private initProvList() {
            this.delProvList();
            if (this.provList && this.provList.length > 0) {
                this.provItemList = [];
                for (let i: number = 0; i < this.provList.length; i++) {
                    let item: PointProvinceItemPanel = new PointProvinceItemPanel(this, this.provList[i], i);
                    item.x = 0;
                    item.y = 0 + i * item.height;
                    this.listGroup.addChild(item);
                    this.provItemList.push(item);
                }
            }
        }
        private selectItem(province: number, city: number) {
            this.selectIcon.visible=false;
            this.baseprovince = province;
            this.basecity = city;
            if (this.provItemList && this.provItemList.length > 0) {
                for (let ret of this.provItemList) {
                    if (ret.itemData.Id == province) {
                        let cityStr: string = table.TCitysById[city].Name;
                        ret.updataSelect(true, cityStr);
                    } else {
                        ret.updataSelect(false);
                    }
                }
            }
        }

        public openCityList(index: number) {
            this.closeCityList()
            if (this.provItemList && this.provItemList.length > 0
                && index >= 0 && index < this.provItemList.length) {
                this.baseprovince = this.provItemList[index].itemData.Id;
                this.provItemList[index].restore(1);
                this.initCityList(this.baseprovince);
                if (this.cityItemList && this.cityItemList.length > 0) {
                    this.cityListGroup.visible = true;
                    this.listGroup.addChild(this.cityListGroup);
                    this.cityListGroup.x = 0;
                    this.cityListGroup.y = 0 + this.provItemList[index].y + this.provItemList[index].height;
                    if (index + 1 < this.provItemList.length) {
                        for (let i: number = index + 1; i < this.provItemList.length; i++) {
                            this.provItemList[i].y = this.cityListGroup.y +
                                this.cityListGroup.height + (i - (index + 1)) * this.provItemList[i].height;
                        }
                    }
                }
            }
        }
        private initCityList(provId: number) {
            this.cityList = [];
            this.cityItemList = [];
            for (let rec of this.tolList) {
                if (rec.Type == 2 && rec.Superior == provId) {
                    this.cityList.push(rec);
                }
            }
            if (this.cityList && this.cityList.length > 0) {
                let itemY: number = 0;
                let h: number;
                for (let i: number = 0; i < this.cityList.length; i++) {
                    let item: PointCityItemPanel = new PointCityItemPanel(this, this.cityList[i], i);
                    if (this.basecity == item.itemData.Id) {
                        item.updataSelect(true);
                    } else {
                        item.updataSelect(false);
                    }
                    item.x = 30 + i % 4 * (item.width + 20);
                    item.y = 26 + Math.floor(i / 4) * (item.height + 20);
                    itemY = item.y;
                    h = item.height;
                    this.cityListGroup.addChild(item);
                    this.cityItemList.push(item);
                }
                if (this.cityItemList && this.cityItemList.length > 0) {
                    this.cityListGroup.height = itemY + h + 40;
                }
            }
        }
        public closeCityList() {
            this.delCityList();
            if (this.cityListGroup.parent != null) {
                this.cityListGroup.visible = false;
                this.cityListGroup.parent.removeChild(this.cityListGroup);
            }
            for (let i: number = 0; i < this.provItemList.length; i++) {
                this.provItemList[i].restore(2);
                this.provItemList[i].x = 0;
                this.provItemList[i].y = 0 + i * this.provItemList[i].height;
            }
        }
        public selectCity(index: number) {
            if (this.cityListGroup.parent != null && this.cityListGroup.visible &&
                this.cityItemList && this.cityItemList.length > 0 &&
                index >= 0 && index < this.cityItemList.length) {
                this.basecity = this.cityItemList[index].itemData.Id;
                this.selectItem(this.baseprovince, this.basecity);
                this.closeCityList()
            }
        }
        private delProvList() {
            
            for (let i: number = 0; i < this.provItemList.length; i++) {
                this.provItemList[i].updataSelect(false);
            }
        }
        private delCityList() {
            if (this.cityItemList && this.cityItemList.length > 0) {
                for (let ret of this.cityItemList) {
                    ret.delPanel();
                    ret = null;
                }
            }
            this.cityItemList = [];
            this.cityList = [];
        }

        /*private select_begin(eve: BasicEvent) {
            if (this.filterPanel.viewType == 1 && this.filterPanel.selectCondition) {
                if (this.filterPanel.selectCondition.second) {
                    this.baseprovince=this.filterPanel.selectCondition.first.data.Id;
                    this.basecity=this.filterPanel.selectCondition.second.data.Id;
                }
            }
        }*/

        public delPanel() {
            //this.filterPanel.removeEventListener(CommonFilterPanel.SELECT, this.select_begin, this);
            this.cancel_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_cancel, this);
            this.save_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_save, this);
        }
    }
}