module game {
    export class BattleBag extends PanelComponent {
        closeButton: IconButton;
        luckyButton: IconButton;
        deliveryButton: IconButton;
        historyMoneyButton: IconButton;
        bagScr: eui.Scroller;
        bagList: eui.List;
        nogiftTips: eui.Label;

        private _listProvider: eui.ArrayCollection;

        protected getSkinName() {
            return BattleBagSkin;
        }

        protected init() {
            this.closeButton.icon = "lucky_json.leftBack";
            this.luckyButton.icon = "lucky_json.luckyBtn";
            this.deliveryButton.icon = "ui_json.deliveryBtn";
            this.historyMoneyButton.icon = "ui_json.historyMoneyBtn";
            this._listProvider = new eui.ArrayCollection();
            this.bagList.dataProvider = this._listProvider;
            this.bagList.itemRenderer = BattleBagItem;
        }

        protected beforeShow() {
            this._touchEvent = [
                { target: this.closeButton, callBackFunc: this.closeHandle },
                { target: this.luckyButton, callBackFunc: this.luckyHandle },
                { target: this.deliveryButton, callBackFunc: this.deliveryHandle },
                { target: this.historyMoneyButton, callBackFunc: this.historyHandle },
            ];
            this.registerEvent();

            this.updateList();
        }

        protected beforeRemove() {
            this.removeEvent();
        }

        private registerEvent() {
            NotificationCenter.addObserver(this, this.updateList, PlayerModel.BAG_UPDATE);
        }

        private removeEvent() {
            NotificationCenter.removeObserver(this, PlayerModel.BAG_UPDATE);
        }

        public updateList() {
            let bagSize = 0;
            this._listProvider.removeAll();

            for (let v of DataManager.playerModel.getBag()) {
                if (table.ItemBaseDataById[v.id].Type != 11) {
                    this._listProvider.addItem(v);
                    bagSize++;
                }
            }
            this.bagScr.viewport.scrollV = 0;

            this.nogiftTips.visible = bagSize == 0;
        }

        private closeHandle() {
            this.remove();
        }

        private luckyHandle() {
            this.closeHandle();
            openPanel(PanelType.lucky);
        }

        private deliveryHandle() {
            this.closeHandle();
            openPanel(PanelType.delivery);
        }

        private historyHandle() {
            this.closeHandle();
            openPanel(PanelType.history);
        }

        private static _instance: BattleBag;

        public static getInstance(): BattleBag {
            if (!BattleBag._instance) {
                BattleBag._instance = new BattleBag();
            }
            return BattleBag._instance;
        }
    }
}