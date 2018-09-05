module game {
    export class SuperMartPanel extends PanelComponent {
        backButton: IconButton;
        shoppingCarGroup: eui.Group;
        touchGroup: eui.Group;
        gouzi: GameMissile;

        private _shopCarList: ShopCar[];
        private _maxShopCar: number = 15;
        private _curStage;

        private initGouziX: number;
        private initGouziY: number;

        protected getSkinName() {
            return SuperMartPanelSkin;
        }

        protected init() {
            if (gameConfig.isIphoneX()) {
                this.backButton.y = 80;
            }
            this.backButton.icon = "ui_json.gameBack";
            this.initGouziX = this.gouzi.x;
            this.initGouziY = this.gouzi.y;
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
            this.touchGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);
        }

        private removeEvent() {
            this.touchGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);
        }

        private backHandle() {
            this.remove();
            SceneManager.changeScene(SceneType.hall);
        }

        private touchHandle(event: egret.TouchEvent) {
            this.touchGroup.touchEnabled = false;
            this._curStage = {x: event.stageX, y: event.stageY};
            this.updateGouzi();
        }

        private updateGouzi() {
            let angle = Math.atan2(this._curStage.x - this.gouzi.x, this.gouzi.y - this._curStage.y);
            let rotation = angle * 180 / Math.PI;
            this.gouzi.setImageRotation(rotation);

            egret.Tween.get(this.gouzi).to({x: this._curStage.x, y: this.initGouziY - 650}, 2000).call(() => {
                egret.Tween.get(this.gouzi).to({x: this.initGouziX, y: this.initGouziY}, 2000).call(() => {
                    this.touchGroup.touchEnabled = true;
                });
            })
        }

        private initShopCar() {
            this._shopCarList = [];
            let addShopCar = async function() {
                let shopCar: ShopCar;
                for (let i = 0; i < 3; i++) {
                    shopCar = new ShopCar();
                    this.shoppingCarGroup.addChild(shopCar);
                    shopCar.touchEnabled = false;
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