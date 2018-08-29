module game {
    export enum SexType
    {
        Boy  = 1,
        Girl = 0,
    }

    export enum actionType
    {
        Idle = 0,
        Game,
    }

    export class RoleBone extends PanelComponent {
        grp_role            : eui.Group;
        
        private _girlBone   : SkeletonBase;
        private _boyBone    : SkeletonBase;

        protected getSkinName()
        {
            return RoleBoneSkin;
        }

        protected init() {
        }

        protected beforeShow() {
        }
        
        public resetParts() {
            let bone = this.getBone();
            if (!bone) return;
            let slots = bone.armature.getSlots();
            slots.forEach((slot) => {
                bone.resetSlot(slot.name);
            })
        }

        public changePart(e: table.IEquipDefine) {
            let pos = e.Pos;
            let sex = e.Sex;
            let slotNames = e.LoadPoint;
            let suit = e['Suit'];
            if (slotNames.length <= 0) return;
            if (sex == 0) {
                suit = suit || "girl_suit2";
                if (!this._girlBone) return;
            } else {
                suit = suit || "boy_suit2";
                if (!this._boyBone) return;
            }
            this.changeSlotsInSuit(slotNames, suit);

            //强制重置替换左右手贴图
            let suitName = DataManager.playerModel.sex == SexType.Girl ? "girl_suit2" :"boy_suit2";
            this.changeSlotsInSuit(["body1_1_02","body1_1_04"], suitName);
        }

        public changeSlotsInSuit(slotNames: string[], suitName: string) {
            let bone = this.getBone();
            slotNames.forEach((name) => {
                let assetName = `${suitName}_json.${name}`;
                bone.setNewSlot(name, assetName);
            })
        }

        public resetSlots(slotNames: string[]) {
            let bone = this.getBone();
            slotNames.forEach((name) => bone.resetSlot(name));
        }
    
        //TODO: 切换模型骨骼
        public async useGirlSpine(sex: SexType, action: actionType) {
            hideAllChildren(this.grp_role);
            if (sex == SexType.Girl) {
                if (!this._girlBone) {
                    this._girlBone = await game.getBone("girl");
                    this.grp_role.addChild(this._girlBone);
                    adjustBone(<egret.DisplayObject>(this._girlBone), this.grp_role);
                }
                this._boyBone && (this._boyBone.visible = false);
                this._girlBone && (this._girlBone.visible = true);
            } else {
                if (!this._boyBone) {
                    this._boyBone = await game.getBone("boy");
                    this.grp_role.addChild(this._boyBone);
                    adjustBone(<egret.DisplayObject>(this._boyBone), this.grp_role);
                }
                this._boyBone && (this._boyBone.visible = true);
                this._girlBone && (this._girlBone.visible = false);
            }

            this.updateBones();  

            //重置左右手贴图
            let r = 1;
            switch(action) {
                case actionType.Game:
                    if(DataManager.playerModel.sex == SexType.Girl)
                    {
                        if(!this._girlBone) return;
                    }
                    else if(DataManager.playerModel.sex == SexType.Boy)
                    {
                        if(!this._boyBone) return;                      
                    }
                    r = 4;
                    this.resetSlots(["body1_1_02","body1_1_04"]);
                    break;

                case actionType.Idle:
                    r = randRange(1, this._girlBone.animNum);
                    let suitName = DataManager.playerModel.sex == SexType.Girl ? "girl_suit2" :"boy_suit2";
                    this.changeSlotsInSuit(["body1_1_02","body1_1_04"], suitName);
                    break;
            }

            //播放人物动画
            this._girlBone.play(`idle${r}`, -1);
        }

        // 更新骨骼动画
        public updateBones() {
            let clothes = DataManager.playerModel.clothes;
            if (!clothes) {
                return;
            }
            for (let l of clothes) {
                if (l.sex == DataManager.playerModel.sex) 
                {
                    if (l.clothes.length == 0) 
                    {
                        this.resetParts();
                        return;
                    }
                    else
                    {
                        for (let m of l.clothes) {
                            let item = table.EquipById[m.id];
                            this.changePart(item);
                        }
                    }
                }
            }
        }

        private getBone() {
            let bone = this._girlBone;
            if (DataManager.playerModel.sex == SexType.Boy) {
                bone = this._boyBone;
            }
            return bone;
        }
    }
}