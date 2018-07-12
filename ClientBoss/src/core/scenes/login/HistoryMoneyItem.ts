module game {
    export class HistoryMoneyItem extends eui.ItemRenderer {
        descLabel: egret.TextField;

        data;

        constructor() {
            super();
            this.skinName = HistoryMoneyItemSkin;

            this.initView();
        }

        private initView() {
            this.descLabel = new egret.TextField();
            this.descLabel.width = 580;
            this.descLabel.height = 30;
            this.descLabel.x = 5;
            this.descLabel.textAlign = egret.HorizontalAlign.LEFT;
            this.addChild(this.descLabel);
        }

        protected dataChanged() {
            let _itemdata = table.ItemBaseDataById[this.data.item];
            if (!_itemdata) {
                egret.log(`${this.data.id}找不到道具!`);
                this.visible = false;
                return;
            }

            this.descLabel.textFlow = <Array<egret.ITextElement>>[
                {text:formatTime(new Date(this.data.time*1000)), style:{"textColor":0x808080, "size":18}},
                {text:"抽中", style:{"textColor":0x808080, "size":24}},
                {text:_itemdata.Name, style:{"textColor":0xff9f3b, "size":24, "bold": true}},
                {text:"价值", style:{"textColor":0x808080, "size":24}},
                {text:`${this.data.worth}`, style:{"textColor":0xff9f3b, "size":24, "bold": true}},
                {text:"RMB", style:{"textColor":0x808080, "size":24}},
            ];
        }
    }
}