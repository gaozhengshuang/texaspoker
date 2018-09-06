module game {
    export class SuperMartPanel extends PanelComponent {
        backButton: IconButton;
        bagButton: IconButton;
        beltImg: eui.Image;
        shoppingCarGroup: eui.Group;
        bottomGroup: eui.Group;
        touchGroup: eui.Group;
        curGoldLabel: eui.Label;
        gouzi: GameMissile;

        private _shopCarList: ShopCar[];
        private _itemIdList: number[];
        private _maxShopCar: number = 15;
        private _curStage;

        private _initGouziX: number;
        private _initGouziY: number;

        private _playShake: number;

        protected getSkinName() {
            return SuperMartPanelSkin;
        }

        protected init() {
            if (gameConfig.isIphoneX()) {
                this.backButton.y = 80;
            }
            this.backButton.icon = "ui_json.gameBack";
            this.bagButton.icon = "game2_json.basket";
            
            this._initGouziX = this.gouzi.x;
            this._initGouziY = this.gouzi.y;
        }

        protected beforeShow() {
            this._touchEvent = [
                { target: this.backButton, callBackFunc: this.backHandle },
                { target: this.bagButton, callBackFunc: this.bagHandle },
            ];
            this.registerEvent();
            this.initShopCar();
            this.updateGold();
 
            this.gouzi.init(this._initGouziX, this._initGouziY);
            egret.startTick(this.update, this);
        }

        protected beforeRemove() {
            this.removeEvent();
            egret.stopTick(this.update, this);
            this.shoppingCarGroup.removeChildren();
        }

        private registerEvent() {
            this.touchGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);

            NotificationCenter.addObserver(this, this.updateGold, PlayerModel.PLAYERMODEL_UPDATE);
            NotificationCenter.addObserver(this, this.OnGW2C_RetStartThrow, "msg.GW2C_RetStartThrow");
            NotificationCenter.addObserver(this, this.OnGW2C_HitTarget, "msg.GW2C_HitTarget");
        }

        private removeEvent() {
            this.touchGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);

            NotificationCenter.removeObserver(this, PlayerModel.PLAYERMODEL_UPDATE);
            NotificationCenter.removeObserver(this, "msg.GW2C_RetStartThrow");
            NotificationCenter.removeObserver(this, "msg.GW2C_HitTarget");
        }

        private backHandle() {
            this.remove();
            SceneManager.changeScene(SceneType.hall);
        }

        private bagHandle() {

        }

        private touchHandle(event: egret.TouchEvent) {
            this._curStage = {x: event.stageX, y: event.stageY};
            sendMessage("msg.C2GW_StartThrow", msg.C2GW_StartThrow.encode({}));
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

        private update(timeStamp: number) {
            switch(this.gouzi.getCurState()) {
                case gameConfig.GouziType.start:
                    break;
                case gameConfig.GouziType.back:
                    this.findItems();
                    break;
                case gameConfig.GouziType.shakeItem:
                    if (this._playShake == null) {
                        let _currentIndex = 1;
                        this._playShake = egret.setInterval(() => {
                            if (_currentIndex > 8) {
                                _currentIndex = 1;
                            }
                            this.beltImg.source = `game2_json.belt_${_currentIndex}`;
                            _currentIndex++;
                        }, this, 10);

                        this.sendItemList();
                    }
                    break;
                case gameConfig.GouziType.over:
                    if (this._playShake) {
                        egret.clearInterval(this._playShake);
                        this._playShake = null;
                        this.beltImg.source = `game2_json.belt_1`;
                    }
                    this.touchGroup.touchEnabled = true;
                    break;
            }
            return true;
        }

        private findItems() {

        }

        private sendItemList() {
            this.gouzi.playItemShake();

            sendMessage("msg.C2GW_TargetItem", msg.C2GW_TargetItem.encode({
                itemid:this._itemIdList
            }));
        }

        private updateGold() {
            this.curGoldLabel.text = `金币：${getCouponStr(DataManager.playerModel.getGold())}`;
        }

        private OnGW2C_RetStartThrow(data: msg.GW2C_RetStartThrow) {
            this.touchGroup.touchEnabled = false;
            let angle = Math.atan2(this._curStage.x - this.gouzi.x, this.gouzi.y - this._curStage.y);
            let rotation = angle * 180 / Math.PI;
            this.gouzi.setImageRotation(rotation);
            this.gouzi.runAction(this._curStage);
        }

        private OnGW2C_HitTarget(data: msg.GW2C_HitTarget) {
            this.gouzi.findItemOver(data);
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