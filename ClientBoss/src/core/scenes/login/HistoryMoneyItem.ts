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
            
        }
    }
}