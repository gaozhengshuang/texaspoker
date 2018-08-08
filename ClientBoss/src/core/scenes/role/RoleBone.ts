module game {
    export enum SexType
    {
        Boy  = 1,
        Girl = 0,
    }
    export class RoleBone extends PanelComponent {

        grp_role            : eui.Group;
        
        private _girlBone   : SkeletonBase;
        private _boyBone    : SkeletonBase;
        private gender;



        protected getSkinName()
        {
            return RoleBoneSkin;
        }

        public awake()
        {
            this.gender = DataManager.playerModel.sex;
            this.updateBones();
            //切换模型骨骼
            this.useGirlSpine(this.gender == SexType.Girl);
        }
        
        private resetParts(bone: SkeletonBase) {
            if (!bone) return;
            let slots = bone.armature.getSlots();
            slots.forEach((slot) => {
                bone.resetSlot(slot.name);
            })
        }

        private changePart(e: table.IEquipDefine) {
            let pos = e.Pos;
            let sex = e.Sex;
            let slotNames = e.LoadPoint;
            let suit = e['Suit'];
            if (slotNames.length <= 0) return;
            if (sex == 0) {
                suit = suit || "girl_suit2";
                if (!this._girlBone) return;
                this.changeSlotsInSuit(this._girlBone, slotNames, suit);
            } else {
                suit = suit || "boy_suit2";
                if (!this._boyBone) return;
                this.changeSlotsInSuit(this._boyBone, slotNames, suit);
            }

        }

        private changeSlotsInSuit(bone: SkeletonBase, slotNames: string[], suitName: string) {
            slotNames.forEach((name) => {
                let assetName = `${suitName}_json.${name}`;
                // console.log("骨骼图集：", assetName);
                bone.setNewSlot(name, assetName);
            })
        }

        private resetSlots(bone: SkeletonBase, slotNames: string[]) {
            slotNames.forEach((name) => bone.resetSlot(name));
        }
    
        //TODO: 切换模型骨骼
        public async useGirlSpine(b: boolean) {
            hideAllChildren(this.grp_role);
            if (b) {
                if (!this._girlBone) {
                    this._girlBone = await game.getBone("girl");
                    this.grp_role.addChild(this._girlBone);
                    adjustBone(<egret.DisplayObject>(this._girlBone), this.grp_role);
                    let r = randRange(1, this._girlBone.animNum);
                    r = 4;
                    this._girlBone.play(`idle${r}`, -1);
                }
                this._boyBone && (this._boyBone.visible = false);
                this._girlBone && (this._girlBone.visible = true);
            } else {
                if (!this._boyBone) {
                    this._boyBone = await game.getBone("boy");
                    this.grp_role.addChild(this._boyBone);
                    adjustBone(<egret.DisplayObject>(this._boyBone), this.grp_role);
                    let r = randRange(1, this._boyBone.animNum);
                    r = 4;                    
                    this._boyBone.play(`idle${r}`, -1);
                }
                this._boyBone && (this._boyBone.visible = true);
                this._girlBone && (this._girlBone.visible = false);
            }
            this.updateBones();  

            if(this.gender == SexType.Girl)
            {
                if(!this._girlBone) return;
                this.resetSlots(this._girlBone, ["body1_1_02","body1_1_04"]);
            }
            else if(this.gender == SexType.Boy)
            {
                if(!this._boyBone) return;
                this.resetSlots(this._boyBone, ["body1_1_02","body1_1_04"]);                          
            }
        }

        // 更新骨骼动画
        private updateBones() {
            let clothes = DataManager.playerModel.clothes;
            if (!clothes) {
                return;
            }
            for (let l of clothes) {
                if (l.sex == this.gender) 
                {
                    if (l.clothes.length == 0) 
                    {
                        if (this.gender == 0)
                            this.resetParts(this._girlBone);
                        else
                            this.resetParts(this._boyBone);
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
    }
}