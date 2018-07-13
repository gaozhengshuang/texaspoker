module game {
    export class DeliveryPanel extends PanelComponent {
        closeButton: IconButton;
        bagButton: IconButton;

        deliveryTitle: eui.Image;
        selOkTxt: eui.Label;
        selNoTxt: eui.Label;

        selOkImg: eui.Image;
        selNoImg: eui.Image;

        deliveryScr: eui.Scroller;
        deliveryList: eui.List;

        _selectType: number = 1;

        _playerGoodsInfo: Array<GoodsInfo>;

        _listProvider: eui.ArrayCollection;

        protected getSkinName() {
            return DeliveryPanelSkin;
        }

        protected init() {            this.closeButton.icon = "lucky_json.luckycloseBtn";
           this.bagButton.icon = "ui_json.bag_backBagBtn";
          this._listProvider = new eui.ArrayCollection();
            this.deliveryList.dataProvider = this._listProvider;
            this.deliveryList.itemRenderer = DeliveryItem;
        }

        protected beforeShow() {
            this._touchEvent = [
                {target: this.closeButton, callBackFunc: this.closeHandle},
                {target: this.bagButton, callBackFunc: this.bagHandle},
                {target: this.selOkImg, callBackFunc: this.selOKHandle},
                {target: this.selNoImg, callBackFunc: this.selNoHandle},
            ];
            this.registerEvent();

            this.updateView();
        }

        protected beforeRemove() {
            this.removeEvent();
        }

        private registerEvent() {
        }

        private removeEvent() {
        }

        private selOKHandle() {
            this._selectType = 1;
            this.updateView();
        }

        private selNoHandle() {
            this._selectType = 2;
            this.updateView();
        }

        private updateView() {
            this.selOkImg.alpha = this._selectType == 1 ? 1 : 0;
            this.selNoImg.alpha = this._selectType == 2 ? 1 : 0;

            this.selOkTxt.textColor = this._selectType == 1 ? 0xffffff : 0x378ac2;
            this.selNoTxt.textColor = this._selectType == 2 ? 0xffffff : 0x378ac2;

            this.deliveryTitle.source = this._selectType == 1 ? "ui/bag/deliveryOkTxt" : "ui/bag/deliveryNoTxt";

            this.updateList();
        }

        public async updateList() {
            this._listProvider.removeAll();
            this._playerGoodsInfo = await DataManager.playerModel.getPlayerGoods();
            for (let v of this._playerGoodsInfo) {
                if (this._selectType == 1 && (v.recordstate == "2" || v.recordstate == "3")) {
                    this._listProvider.addItem(v);
                } else if (this._selectType == 2 && v.recordstate == "0") {
                    this._listProvider.addItem(v);
                }
            }
            this.deliveryScr.viewport.scrollV = 0;
        }

        private closeHandle() {
            this.remove();
        }

        private bagHandle() {
            this.closeHandle();
            openPanel(PanelType.bag);
        }

        private static _instance: DeliveryPanel;

        public static getInstance(): DeliveryPanel {
            if (!DeliveryPanel._instance) {
                DeliveryPanel._instance = new DeliveryPanel();
            }
            return DeliveryPanel._instance;
        }
    }

    export interface GoodsInfo {
        id: string;
        itemid: string;
        itemname: string;
        recordstate: string;
        remark: string;
        time: string;
        count:string;
    }
}