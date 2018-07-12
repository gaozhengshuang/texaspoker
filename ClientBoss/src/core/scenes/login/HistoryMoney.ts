module game {
    export class HistoryMoney extends PanelComponent {
        closeButton: IconButton;
        bagButton: IconButton;
        historyScr: eui.Scroller;
        historyList: eui.List;
        moneyTxt: eui.Label;

        private _listProvider: eui.ArrayCollection;

        protected getSkinName() {
            return HistoryMoneySkin;
        }

        protected init() {
            this.closeButton.icon = "lucky/luckycloseBtn";
            this.bagButton.icon = "ui/backBagBtn";

            this._listProvider = new eui.ArrayCollection();
            this.historyList.dataProvider = this._listProvider;
            this.historyList.itemRenderer = BattleBagItem;
        }

        protected beforeShow() {
            this._touchEvent = [
                {target: this.closeButton, callBackFunc: this.closeHandle},
                {target: this.bagButton, callBackFunc: this.bagHandle},
            ];
            this.registerEvent();

            this.updateList();
        }

        protected beforeRemove() {
            this.removeEvent();
        }

        private registerEvent() {
            
        }

        private removeEvent() {
            
        }

        public updateList() {
            this._listProvider.removeAll();
            for (let v of DataManager.playerModel.getHistoryMoney()) {
                this._listProvider.addItem(v);
            }
            this.historyScr.viewport.scrollV = 0;
        }

        private closeHandle() {
            this.remove();
        }

        private bagHandle() {
            this.closeHandle();
            openPanel(PanelType.bag);
        }

        private static _instance: HistoryMoney;

        public static getInstance(): HistoryMoney {
            if (!HistoryMoney._instance) {
                HistoryMoney._instance = new HistoryMoney();
            }
            return HistoryMoney._instance;
        }
    }
}