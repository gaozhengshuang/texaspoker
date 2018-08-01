module game {
    export class HistoryMoneyPanel extends PanelComponent {
        closeButton: IconButton;
        bagButton: IconButton;
        historyScr: eui.Scroller;
        historyList: eui.List;
        moneyTxt: eui.Label;

        private _listProvider: eui.ArrayCollection;

        protected getSkinName() {
            return HistoryMoneySkin;
        }

        protected init() {            this.closeButton.icon = "lucky_json.luckycloseBtn";
           this.bagButton.icon = "ui_json.backBagBtn";
          this._listProvider = new eui.ArrayCollection();
            this.historyList.dataProvider = this._listProvider;
            this.historyList.itemRenderer = HistoryMoneyItem;
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
            this.moneyTxt.text = `￥${DataManager.playerModel.getTotalMoney()}`;
        }

        private closeHandle() {
            this.remove();
        }

        private bagHandle() {
            this.closeHandle();
            openPanel(PanelType.bag);
        }

        private static _instance: HistoryMoneyPanel;

        public static getInstance(): HistoryMoneyPanel {
            if (!HistoryMoneyPanel._instance) {
                HistoryMoneyPanel._instance = new HistoryMoneyPanel();
            }
            return HistoryMoneyPanel._instance;
        }
    }
}