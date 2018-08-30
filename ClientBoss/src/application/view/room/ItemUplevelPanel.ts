module game {
    export class ItemUplevelPanel extends eui.Component {
        private iconImg: eui.Image;
        private full_border: eui.Image;
        private no_border: eui.Image;

        private name_txt: eui.Label;
        private num_txt: eui.Label;

        private itemInfo: any;
        private needNum: number = 0;
        private haveNum: number = 0;
        public isFull: boolean = false;

        public constructor() {
            super();
            this.skinName = ItemUpLevelBoxSkin;
        }
        public update(id: number, need: number): boolean {
            this.needNum = need;
            this.itemInfo = table.ItemBaseDataById[id];
            this.no_border.visible = false;
            this.full_border.visible = false;
            if (this.itemInfo) {
                this.name_txt.text = this.itemInfo.Name;
                let bagItem: any = DataManager.playerModel.getBagItem(id);
                console.log("bagItem-->",bagItem);
                if (bagItem == null) {
                    this.haveNum = 0
                } else {
                    this.haveNum = bagItem.num;
                }
                this.num_txt.text = this.haveNum + "/" + this.needNum;
                if (this.haveNum >= this.needNum) {
                    this.isFull = true;
                    this.no_border.visible = false;
                    this.full_border.visible = true;
                } else {
                    this.isFull = false;
                    this.no_border.visible = true;
                    this.full_border.visible = false;
                }
            }
            return this.isFull;
        }
        public removePanel() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}