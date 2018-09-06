module game {
    export class GameMissile extends eui.Component {
        line: eui.Image;
        aim: eui.Image;
        itemImg1: eui.Image;
        itemImg2: eui.Image;
        itemImg3: eui.Image;

        shakeItemAnim: egret.tween.TweenGroup;

        missileGroup: eui.Group;

        private _curGetNum: number = 0;
        private _maxGetNum: number = 3;

        private initX: number = 0;
        private initY: number = 0;

        private _curState: gameConfig.GouziType;

        private findItemIds: number[];

        public constructor() {
			super();
			this.skinName = GameMissileSkin;
		}

        public init(x: number, y: number) {
            this.initX = x;
            this.initY = y;

            this._curGetNum = 0;
            this.findItemIds = [];
            this.missileGroup.rotation = 0;
            this._curState = gameConfig.GouziType.over;
        }

        public setImageRotation(r: number) {
            this.missileGroup.rotation = r;
        }

        public runAction(_curStage: any) {
            this._curState = gameConfig.GouziType.start;

            egret.Tween.get(this).to({x: _curStage.x, y: this.initY - 650}, 2000).call(() => {
                this._curState = gameConfig.GouziType.back;

                egret.Tween.get(this).to({x: this.initX, y: this.initY - 150}, 2000).call(() => {
                    if (this._curGetNum > 0) {
                        this._curState = gameConfig.GouziType.shakeItem;
                        egret.Tween.get(this).to({x: this.initX, y: this.initY - 100}, 1000).call(() => {
                            this._curState = gameConfig.GouziType.getItem;
                        });
                    } else {
                        egret.Tween.get(this).to({x: this.initX, y: this.initY}, 2000).call(() => {
                            this._curState = gameConfig.GouziType.over;
                        });
                    }
                });
            })
        }

        public findItemOver(data: msg.GW2C_HitTarget) {
            for (let b = 0; b < this.findItemIds.length; b++) {
                let isAdd = false;
                for (let i = 0; i < data.itemid.length; i++) {
                    let superMarkInfo = table.TSupermarketById[data.itemid[i]];
                    if (superMarkInfo) {
                        if (this.findItemIds[b] == superMarkInfo.ItemId) {
                            isAdd = true;
                            break;
                        }
                    }
                }

                if (isAdd) {
                    this.showSuccess(b+1);
                } else {
                    this.showFail(b+1);
                }
            }
            this.shakeItemAnim.stop();
            egret.Tween.get(this).to({x: this.initX, y: this.initY}, 400).call(() => {
                this._curState = gameConfig.GouziType.over;
            });
        }

        public showSuccess(idx: number) {
            // this["itemImg" + idx]
            egret.log("showSuccessidx--->", idx);
        }

        public showFail(idx: number) {
            // this["itemImg" + idx]
            egret.log("showFailidx--->", idx);
        }

        public addItem(itemInfo: table.IItemBaseDataDefine) {
            if (this._curGetNum < this._maxGetNum) {
                this._curGetNum += 1;
                this["itemImg" + this._curGetNum].source = getItemIconSource(itemInfo.ImageId);
                this["itemImg" + this._curGetNum].visible = true;

                this.findItemIds.push(itemInfo.Id);
            }
        }

        public removeAllItem() {
            for (let i = 1; i <= this._curGetNum; i++) {
                this["itemImg" + i].visible = false;
            }
            this._curGetNum = 0;
            this.findItemIds = [];
        }

        public playItemShake() {
            effectUtils.playAnimation(this.shakeItemAnim, true);
        }

        public getGouzi() {
            return this.aim;
        }

        public getCurState() {
            return this._curState;
        }
    }
}