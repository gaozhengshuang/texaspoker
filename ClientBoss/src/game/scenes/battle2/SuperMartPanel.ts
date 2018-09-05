module game {
    export class SuperMartPanel extends PanelComponent {
        backButton: IconButton;
        shoppingCarGroup: eui.Group;
        _shopCarList: ShopCar[];

        private _maxShopCar: number = 15;

        protected getSkinName() {
            return SuperMartPanelSkin;
        }

        protected init() {
            if (gameConfig.isIphoneX()) {
                this.backButton.y = 80;
            }
            this.backButton.icon = "ui_json.gameBack";
        }

        protected beforeShow() {
            this._touchEvent = [
                { target: this.backButton, callBackFunc: this.backHandle },
            ];
            this.registerEvent();
            this.initShopCar();
        }

        protected beforeRemove() {
            this.removeEvent();
            this.shoppingCarGroup.removeChildren();
        }

        private registerEvent() {
            // NotificationCenter.addObserver(this, this.updateList, PlayerModel.BAG_UPDATE);
        }

        private removeEvent() {
            // NotificationCenter.removeObserver(this, PlayerModel.BAG_UPDATE);
        }

        private backHandle() {
            this.remove();
            SceneManager.changeScene(SceneType.hall);
        }

        private initShopCar() {
            this._shopCarList = [];
            let addShopCar = async function() {
                let shopCar: ShopCar;
                for (let i = 0; i < 3; i++) {
                    shopCar = new ShopCar();
                    this.shoppingCarGroup.addChild(shopCar);
                    shopCar.show(i);
                    this._shopCarList.push(shopCar);
                }

                await delay(1000);
                if (this._shopCarList.length < this._maxShopCar) {
                    addShopCar();
                }
            }.bind(this);

            addShopCar();
        }

        private static _instance: SuperMartPanel;

        public static getInstance(): SuperMartPanel {
            if (!SuperMartPanel._instance) {
                SuperMartPanel._instance = new SuperMartPanel();
            }
            return SuperMartPanel._instance;
        }
    }
}