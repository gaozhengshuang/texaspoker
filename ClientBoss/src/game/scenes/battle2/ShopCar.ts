module game {
    export class ShopCar extends BaseUIComponent<any> {
        itemGroup: eui.Group;
        itemImg: eui.Image;
        itemFrame: eui.Image;
        itemNameLabel: eui.Label;

        private carPaddingY: number = 160;
        private itemInfo: table.IItemBaseDataDefine;
        private superMarkInfo: table.ITSupermarketDefine;

        protected getSkinName() {
            return ShopCarSkin;
        }

        protected init() {
        }

        protected beforeShow() {
            this.initView();
        }

        protected beforeRemove() {
        }

        private initData() {
            this.superMarkInfo = table.TSupermarket[Math.floor(Math.random() * table.TSupermarket.length)];
            if (this.superMarkInfo) {
                this.itemInfo = table.ItemBaseDataById[this.superMarkInfo.ItemId];
                if (this.itemInfo) {
                    this.itemImg.source = getItemIconSource(this.itemInfo.ImageId);
                    this.itemFrame.source = getItemColorSource(this.itemInfo.Color);
                    this.itemNameLabel.text = this.itemInfo.Name;
                }
            }

            this.itemGroup.visible = true;
        }

        private initView() {
            this.initData();
            this.initAction();
        }

        private initAction() {
            let targetX = 0;
            if ((this.data.pos%2)==1) {
                targetX = 0 - this.width;
                this.x = gameConfig.curWidth() + (this.data.columnIdx * 180);
            } else {
                targetX = gameConfig.curWidth();
                this.x = 0 - this.width - (this.data.columnIdx * 180);
            }
            this.y = this.carPaddingY * this.data.pos;

            egret.Tween.get(this).to({ x: targetX }, 5000 + (this.data.columnIdx * 1000)).call(() => {
                this.updateView();
            })
        }

        private updateView() {
            this.initData();
            this.runAction();
        }

        private runAction() {
            let targetX = 0;
            if ((this.data.pos%2)==1) {
                targetX = 0 - this.width;
                this.x = gameConfig.curWidth();
            } else {
                targetX = gameConfig.curWidth();
                this.x = 0 - this.width;
            }
            this.y = this.carPaddingY * this.data.pos;

            egret.Tween.get(this).to({ x: targetX }, 5000).call(() => {
                this.updateView();
            })
        }

        public removeItem() {
            this.itemGroup.visible = false;
        }

        public getShopCarItem() {
            return this.itemInfo;
        }

        public getShopCarId() {
            return this.superMarkInfo.Id;
        }

        public getId() {
            return this.data.thisId;
        }
    }
}