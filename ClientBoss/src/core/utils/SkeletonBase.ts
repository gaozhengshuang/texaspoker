module game {
    export class SkeletonBase extends eui.Group {
        public isUsed: boolean = false;
        public bonesName: string;
        private armatureDisplay: dragonBones.EgretArmatureDisplay;
        private _currentAction: string;
        private _currentPlayTime: number;
        private _isPlay: boolean = false;
        private _timeScale: number = 1;
        private _dragonbonesFactory: dragonBones.EgretFactory;
        private _textureAtlasData: dragonBones.TextureAtlasData;

        constructor() {
            super();
            this.touchEnabled = false;
            this.touchChildren = false;
        }

        public async createBones(bonesName: string) {
            this.bonesName = bonesName;
            await this.loadBones();
        }

        private loadBones() {
            let d = defer();
            if (!this._dragonbonesFactory) {
                this._dragonbonesFactory = dragonBones.EgretFactory.factory;
            }
            if (this._dragonbonesFactory.getDragonBonesData(this.bonesName)) {
                this.armatureDisplay = this._dragonbonesFactory.buildArmatureDisplay(this.bonesName);
                this.initArmature();
                d.resolve(null);
            } else {
                let t = [loadRes(`${this.bonesName}/${this.bonesName}_ske_json`), loadRes(`${this.bonesName}/${this.bonesName}_tex_json`), loadRes(`${this.bonesName}/${this.bonesName}_tex_image`)];
                when(t).always((value) => {
                    if (value) {
                        let dragonbonesData = value[0];
                        let textureData = value[1];
                        let texture = value[2];
                        if (dragonbonesData.armature && dragonbonesData.armature[0]) {
                            dragonbonesData.armature[0].name = this.bonesName;
                        }
                        dragonbonesData.name = textureData.name = this.bonesName;
                        this._dragonbonesFactory.parseDragonBonesData(dragonbonesData);
                        this._textureAtlasData = this._dragonbonesFactory.parseTextureAtlasData(textureData, texture);
                        this.armatureDisplay = this._dragonbonesFactory.buildArmatureDisplay(this.bonesName);
                        this.initArmature();
                    }
                    d.resolve(null);
                });
            }
            return d.promise();
        }

        private initArmature() {
            this.armatureDisplay.animation.timeScale = this._timeScale;
            this.addChild(this.armatureDisplay);
            if (this._isPlay) {
                this.play(this._currentAction, this._currentPlayTime);
            }
        }

        setScale(value: number) {
            if (this.armatureDisplay) {
                this.armatureDisplay.scaleX = this.armatureDisplay.scaleY = value;
            }
        }

        setScaleX(value: number) {
            if (this.armatureDisplay) {
                this.armatureDisplay.scaleX = value;
            }
        }

        public play(action: string, time: number) {
            let d = defer();
            this._currentAction = action;
            this._currentPlayTime = time;
            this._isPlay = true;
            if (this.armatureDisplay) {
                this.armatureDisplay.animation.reset();
                this.armatureDisplay.animation.play(action, time);
                this.armatureDisplay.once(egret.Event.LOOP_COMPLETE, () => {
                    d.resolve(null);
                }, this);
            }
            return d.promise();
        }

        public stop() {
            if (!this._isPlay) return;
            this._isPlay = false;
            if (this.armatureDisplay) {
                this.armatureDisplay.animation.stop();
            }
        }

        public removeFromParent() {
            this.stop();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

        public setTimeScale(timeScale: number) {
            timeScale = 1 / timeScale;
            this._timeScale = timeScale;
            if (this.armatureDisplay) {
                this.armatureDisplay.animation.timeScale = timeScale;
            }
        }

        hide() {
            let d = defer();
            egret.Tween.get(this).to({alpha: 0}, 500).call(() => {
                d.resolve(null);
            });
            return d.promise();
        }

        public setSlot(slotName: string, visible: boolean = true, texture: egret.Texture = null) {
            if (this.armatureDisplay) {
                let slot = this.armatureDisplay.armature.getSlot(slotName);
                if (!slot || !slot.displayList[0]) return;
                if (texture) {
                    slot.displayList[0].texture = texture;
                }
                slot.displayList[0].visible = visible;
            }
        }

        public replaceTexture(name: string, texture) {
            if (!texture) return;
            this.removeChild(this.armatureDisplay);
            let t: any = this._textureAtlasData.getTexture(name);
            t.renderTexture = texture;
            this.armatureDisplay = this._dragonbonesFactory.buildArmatureDisplay(this.bonesName);
            this.initArmature();
        }
    }
}