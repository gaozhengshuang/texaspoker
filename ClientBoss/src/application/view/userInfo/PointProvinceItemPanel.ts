module game {
    export class PointProvinceItemPanel extends eui.Component {

        private jiantouIcon1: eui.Image;
        private jiantouIcon2: eui.Image;
        private jiantouGroup: eui.Group;
        private selectIcon: eui.Image;
        private point_txt: eui.Label;

        public itemData: table.ITCitysDefine;
        private isOpen: boolean = false;
        private isSelect: boolean = false;
        public indexNum: number = 0;

        public parentView: ModifyPointViewPanel;

        public constructor(view: ModifyPointViewPanel, data: table.ITCitysDefine, index: number) {
            super();
            this.skinName = PointProvinceItemSkin;
            this.point_txt.touchEnabled = false;
            this.touchChildren = false;
            this.parentView = view;
            this.indexNum = index;
            this.itemData = data;
            this.init(this.itemData);
        }
        public init(data: table.ITCitysDefine) {
            this.isOpen = false;
            if (data) {
                this.selectIcon.visible = false;
                this.jiantouIcon1.visible = true;
                this.jiantouIcon2.visible = false;
                this.point_txt.text = data.Name;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_tap, this);
        }
        public updataSelect(bool: boolean, cityStr: string = "") {
            this.isSelect = bool;
            if (this.isSelect) {
                this.point_txt.text = this.itemData.Name + " " + cityStr;
                this.selectIcon.visible = true;

            } else {
                this.point_txt.text = this.itemData.Name;
                this.selectIcon.visible = false;
            }
        }
        private onclick_tap(eve: egret.TouchEvent) {
            this.isOpen = this.isOpen ? false : true;
            if (this.isOpen) {
                //this.jiantouIcon1.visible=false;
                //this.jiantouIcon2.visible=true;
                this.parentView.openCityList(this.indexNum);
            } else {
                //this.jiantouIcon1.visible=true;
                //this.jiantouIcon2.visible=false;
                this.parentView.closeCityList();
            }
        }
        public restore(num:number) {
            if (num==1) {
                this.jiantouIcon1.visible = false;
                this.jiantouIcon2.visible = true;

            } else {
                this.jiantouIcon1.visible = true;
                this.jiantouIcon2.visible = false;

            }
        }
    }
}