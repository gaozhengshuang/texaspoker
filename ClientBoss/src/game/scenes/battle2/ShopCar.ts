module game {
    export class ShopCar extends BaseUIComponent<any> {
        itemImg: eui.Image;
        itemNameLabel: eui.Label;

        private carPaddingY: number = 160;
        private itemInfo: table.IItemBaseDataDefine;

        protected getSkinName() {
            return ShopCarSkin;
        }

        protected init() {
        }

        protected beforeShow() {
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

        private updateView() {
            let superMarkInfo = table.TSupermarket[Math.floor(Math.random() * table.TSupermarket.length)];
            if (superMarkInfo) {
                this.itemInfo = table.ItemBaseDataById[superMarkInfo.ItemId];
                if (this.itemInfo) {
                    this.itemImg.source = getItemIconSource(this.itemInfo.ImageId);
                    this.itemNameLabel.text = this.itemInfo.Name;
                }
            }

            this.itemImg.visible = true;
            this.runAction();
        }

        private runAction() {
            let targetX = 0;
            if ((this.data%2)==1) {
                targetX = 0 - this.width;
                this.x = gameConfig.curWidth();
            } else {
                targetX = gameConfig.curWidth();
                this.x = 0 - this.width;
            }
            this.y = this.carPaddingY * this.data;

            egret.Tween.get(this).to({ x: targetX }, 5000).call(() => {
                this.updateView();
            })
        }

        private removeItem() {
            this.itemImg.visible = false;
        }

        public getShopCarItem() {
            return this.itemInfo;
        }
    }
}