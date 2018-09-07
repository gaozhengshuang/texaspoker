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

        private _initImgPointList: egret.Point[];
        private _successPointList: egret.Point[];
        private _failPointList: egret.Point[];
        private _besslCompleteHandler:CallBackHandler;

        public constructor() {
            super();
            this.skinName = GameMissileSkin;

            this._initImgPointList = [];
            this._successPointList = [];
            this._failPointList = [];
            this._besslCompleteHandler= new CallBackHandler(this, this.onBesslComplete);
            if (this._initImgPointList.length == 0) {
                for (let i: number = 1; i < 4; i++) {
                    let img = this["itemImg" + i.toString()];
                    this._initImgPointList.push(new egret.Point(img.x, img.y));
                }
                this._successPointList = [new egret.Point(568, 600), new egret.Point(650, 1050)]; //舞台坐标
                this._failPointList = [new egret.Point(152, 600), new egret.Point(-30, 700)];
            }
        }

        public init(x: number, y: number) {
            this.initX = x;
            this.initY = y;
            for (let i: number = 1; i < 4; i++) {
                let img:eui.Image = this["itemImg" + i.toString()];
                let p = this._initImgPointList[i - 1];
                img.x = p.x;
                img.y = p.y;
                img.rotation = 0;
                img.visible = false;
                this.addChild(img);
            }
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

            egret.Tween.get(this).to({ x: _curStage.x, y: this.initY - 650 }, 2000).call(() => {
                this._curState = gameConfig.GouziType.back;

                egret.Tween.get(this).to({ x: this.initX, y: this.initY - 150 }, 2000).call(() => {
                    if (this._curGetNum > 0) {
                        this._curState = gameConfig.GouziType.shakeItem;
                        egret.Tween.get(this).to({ x: this.initX, y: this.initY - 100 }, 1000).call(() => {
                            this._curState = gameConfig.GouziType.getItem;
                        });
                    } else {
                        egret.Tween.get(this).to({ x: this.initX, y: this.initY }, 2000).call(() => {
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
                    this.showSuccess(b + 1);
                } else {
                    this.showFail(b + 1);
                }
            }
            this.shakeItemAnim.stop();
            egret.Tween.get(this).to({ x: this.initX, y: this.initY }, 400).call(() => {
                this._curState = gameConfig.GouziType.over;
            });
        }

        public showSuccess(idx: number) {
            this.runResultAnimation(idx, this._successPointList);

        }

        public showFail(idx: number) {
            this.runResultAnimation(idx, this._failPointList, -20);
        }

        private runResultAnimation(idx: number, list: egret.Point[], rotation: number = 20) {
            let img:eui.Image = this["itemImg" + idx];
            let p0 = this._initImgPointList[idx - 1];
            img.x = p0.x;
            img.y = p0.y;

            let globalP = img.localToGlobal();
            gamelayer.stage.addChild(img); //钩子整体移动的带动物品动画也移动的问题 用舞台来显示 用舞台坐标系
            img.x =globalP.x;
            img.y = globalP.y;
            let p1 = list[0];
            let p2 = list[1];
            effectUtils.besselCurveAnimation(img, globalP, p1, p2, 800, this._besslCompleteHandler, rotation);
        }
        
        private onBesslComplete(target:egret.DisplayObject)
        {
            this.addChild(target);
            target.visible = false;
        }

        public addItem(itemInfo: table.IItemBaseDataDefine) {
            if (this._curGetNum < this._maxGetNum) {
                this._curGetNum += 1;
                let img: eui.Image = this["itemImg" + this._curGetNum];
                let p = this._initImgPointList[this._curGetNum - 1];
                img.x = p.x;
                img.y = p.y;
                img.rotation = 0;
                img.source = getItemIconSource(itemInfo.ImageId);
                img.visible = true;

                this.findItemIds.push(itemInfo.Id);
            }
        }

        public removeAllItem() {
            this._curGetNum = 0;
            this.findItemIds = [];
        }

        public clearItemShow()
        {
          for (let i = 1; i < 4; i++) { 
                let img = this["itemImg" + i];
                img.visible = false;
                egret.Tween.removeTweens(img);
                this.addChild(img);
            } 
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