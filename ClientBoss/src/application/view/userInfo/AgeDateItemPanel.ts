module game {
    export class AgeDateItemPanel extends eui.ItemRenderer {
        private txt: eui.Label;

        public content: number = 0;
        public dateType: number = 0;//1:年，2:月，3:日
        public colorType: number = 1;
        public constructor() {
            super();
            this.skinName = ModifyAgeItemSkin;
            //this.anchorOffsetY = this.height / 2;
        }
        public itemDate: any;
        protected dataChanged(): void {
            this.itemDate = this.data;
            this.content = this.itemDate.num;
            this.dateType = this.itemDate.type;
            this.colorType = this.itemDate.color;
            if (this.colorType == 1) {
                this.txt.textColor = 0xbbbbd0;
            } else {
                this.txt.textColor = 0x5f5f6c;
            }
            switch (this.dateType) {
                case 1:
                    this.txt.text = this.content + "年";
                    break;
                case 2:
                    this.txt.text = this.content < 10 ? "0"+this.content + "月" : "" + this.content + "月";
                    break;
                case 3:
                    this.txt.text = this.content < 10 ? "0"+ this.content + "日": "" + this.content + "日";
                    break;
            }
        }
    }
}