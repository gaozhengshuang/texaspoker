module game {

    export class RoleDress extends PanelComponent {
        img_girlbg: eui.Image;
        img_boybg: eui.Image;
        grp_coins: eui.Group;
        coin_money: game.Coins;
        coin_gold: game.Coins;
        grp_dressinfo: eui.Group;
        grp_role: eui.Group;
        grp_misc: eui.Group;
        icon_boy: eui.Image;
        icon_girl: eui.Image;

        img_iconmask: eui.Image;

        btn_cart: game.IconButton;
        btn_close: game.IconButton;
        part_back: game.ChooseIcon;
        part_head: game.ChooseIcon;
        part_body: game.ChooseIcon;
        part_leg: game.ChooseIcon;
        part_foot: game.ChooseIcon;
        part_waist: game.ChooseIcon;
        part_hand: game.ChooseIcon;
        sr_item: eui.Scroller;
        ls_items: eui.List;
        test_itemprice: game.ItemPrice;
        dress_info: game.EquipInfo;
        btn_test: eui.Button;
        btn_test2: eui.Button;

        topGroup: eui.Group;
        roleGroup: eui.Group;

        private _dataProv: eui.ArrayCollection;

        public gender: number;
        private _girlBone: SkeletonBase;
        private _boyBone: SkeletonBase;
        private _typeIdx: msg.ItemPos;

        private _typeChecked;

        protected getSkinName() {
            return RoleDressSkin;
        }

        private static _instance: RoleDress;

        public static getInstance(): RoleDress {
            if (!RoleDress._instance) {
                RoleDress._instance = new RoleDress();
            }
            return RoleDress._instance;
        }


        public init() {
            if (gameConfig.isIphoneX()) {
                this.topGroup.y = this.topGroup.y + 50;
                // this.roleGroup.y = this.roleGroup.y + 150;
            }
            this.height = gameConfig.curHeight();

            this.btn_cart.icon = "dress_01_json.dress_01_29";
            this.btn_close.icon = "dress_01_json.dress_01_16"
            this.gender = 0;
            this._typeChecked={};

            this.initNetEvent();
            this.initTouchEvent();
            this.initCoins();
            this.initItemList();
            this.switchToGirl();
            this.hideDressInfo();

            this.partHandle_body();
        }

        private initNetEvent() {
            NotificationCenter.addObserver(this, this.OnGW2C_AddPackageItem, "msg.GW2C_AddPackageItem");
            NotificationCenter.addObserver(this, this.OnGW2C_UpdateItemPos, "msg.GW2C_UpdateItemPos");
        }

        // TODO: 添加包裹项
        private OnGW2C_AddPackageItem(data: msg.GW2C_AddPackageItem) {
            console.log("添加包裹项：", data);
        }
        // TODO: 更新项位置
        private OnGW2C_UpdateItemPos(data: msg.GW2C_UpdateItemPos) {
            console.log("更新项位置", data);
        }
        // TODO: 穿上装备
        private sendDressCloth(data) {
            sendMessage("msg.C2GW_DressClothes", msg.C2GW_DressClothes.encode({
                pos: data.pos,
                itemid: data.itemid
            }));
        }
        // TODO: 脱下装备
        private sendUnDressCloth(data) {
            sendMessage("msg.C2GW_UnDressClothes", msg.C2GW_UnDressClothes.encode({
                pos: data.pos,
            }));
        }

        private initItemList() {
            this._dataProv = new eui.ArrayCollection();
            this.ls_items.dataProvider = this._dataProv;
            this.ls_items.itemRenderer = game.ItemPrice;
            this.ls_items.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this);
        }
 

        private saveSelected(typeIdx, itemIndex) {
            if (this._typeChecked[typeIdx] != null && this._typeChecked[typeIdx] == itemIndex) {
                console.log('选择了同样的项', itemIndex);
                return false;
            }

            this._typeChecked[typeIdx] = itemIndex;
            return true;
        }

        private rmSelected(typeIdx) {
            this._typeChecked[this._typeIdx] = null;
            this.ls_items.selectedIndex = -1;
            this.ls_items.selectedItem = null;
        }

        // 选择项改变
        private onChange(e: eui.ItemTapEvent) {


            let item = this.ls_items.selectedItem;
            let idx = e.itemIndex;
            let itemRender = <game.ItemPrice>e.itemRenderer;
            if (!this.saveSelected(this._typeIdx, idx)) {
                itemRender.selected = false;
                this.rmSelected(this._typeIdx);
                this.unwear(item);
            } else {
                this.setDressInfo(item);
                this.changePart(item);
            }


        }

        private initTypeIcons() {
            this.useGirlTypeIcons(true);

        }
        private useGirlTypeIcons(b: boolean) {
            let girlIcons = [
                "dress_01_08", "dress_01_09", "dress_01_10", "dress_01_11", "dress_01_12", "dress_01_13", "dress_01_14"
            ]
            let boyIcons = [
                "dress_01_01", "dress_01_02", "dress_01_03", "dress_01_04", "dress_01_05", "dress_01_06", "dress_01_07"
            ]
            let prefix = "dress_01_json.";
            if (b) {
                this.part_back.setIcon(prefix + girlIcons[0])
                this.part_head.setIcon(prefix + girlIcons[1])
                this.part_body.setIcon(prefix + girlIcons[2])
                this.part_leg.setIcon(prefix + girlIcons[3])
                this.part_foot.setIcon(prefix + girlIcons[4])
                this.part_waist.setIcon(prefix + girlIcons[5])
                this.part_hand.setIcon(prefix + girlIcons[6])

            } else {
                this.part_back.setIcon(prefix + boyIcons[0])
                this.part_head.setIcon(prefix + boyIcons[1])
                this.part_body.setIcon(prefix + boyIcons[2])
                this.part_leg.setIcon(prefix + boyIcons[3])
                this.part_foot.setIcon(prefix + boyIcons[4])
                this.part_waist.setIcon(prefix + boyIcons[5])
                this.part_hand.setIcon(prefix + boyIcons[6])
            }
        }

        private initCoins() {
            this.coin_gold.coins = DataManager.playerModel.getScore();
            this.coin_money.coins = <number>DataManager.playerModel.getTotalMoney();
        }


        private initTouchEvent() {

            this.img_iconmask.addEventListener("touchBegin", this.switchGender, this);

            this.part_back.addEventListener("touchBegin", this.partHandle_back, this);
            this.part_head.addEventListener("touchBegin", this.partHandle_head, this);
            this.part_body.addEventListener("touchBegin", this.partHandle_body, this);
            this.part_leg.addEventListener("touchBegin", this.partHandle_leg, this);
            this.part_foot.addEventListener("touchBegin", this.partHandle_foot, this);
            this.part_waist.addEventListener("touchBegin", this.partHandle_waist, this);
            this.part_hand.addEventListener("touchBegin", this.partHandle_hand, this);

            this.btn_cart.addEventListener("touchEnd", this.cartHandle, this);
            this.btn_close.addEventListener("touchEnd", this.closeHandle, this);

            this.btn_test.addEventListener("touchEnd", this.setSuitHandle, this);
            this.btn_test2.addEventListener("touchEnd", this.resetSuitHandle, this);
        }

        private closeHandle() {
            this.resetParts(this._boyBone);
            this.resetParts(this._girlBone);
            this.remove();
        }
        private cartHandle() {
            openPanel(PanelType.dressShopCarts);
        }

        private switchToGirl() {
            this.gender = 0;
            this.useGirlSpine(true);
            this.useGirlBg(true);
            this.useGirlIcon(true);
            this.useGirlShelf(true);
            this.useGirlTypeIcons(true);
        }

        private switchGender() {
            if (this.gender == 0) {
                this.switchToBoy();
            } else {
                this.switchToGirl();
            }
        }

        private switchToBoy() {
            this.gender = 1;
            this.useGirlSpine(false);
            this.useGirlBg(false);
            this.useGirlIcon(false);
            this.useGirlShelf(false);
            this.useGirlTypeIcons(false);
        }

        private partHandle_back() { this.unchoseAllIcons(); this.part_back.checked = true; this.showShelf_back(); }
        private partHandle_head() { this.unchoseAllIcons(); this.part_head.checked = true; this.showShelf_head(); }
        private partHandle_body() { this.unchoseAllIcons(); this.part_body.checked = true; this.showShelf_body(); }
        private partHandle_leg() { this.unchoseAllIcons(); this.part_leg.checked = true; this.showShelf_leg(); }
        private partHandle_foot() { this.unchoseAllIcons(); this.part_foot.checked = true; this.showShelf_foot(); }
        private partHandle_waist() { this.unchoseAllIcons(); this.part_waist.checked = true; this.showShelf_waist(); }
        private partHandle_hand() { this.unchoseAllIcons(); this.part_hand.checked = true; this.showShelf_hand(); }
        //===============================================================//
        private unchoseAllIcons() {
            this.part_back.checked = false;
            this.part_head.checked = false;
            this.part_body.checked = false;
            this.part_leg.checked = false;
            this.part_foot.checked = false;
            this.part_waist.checked = false;
            this.part_hand.checked = false;
        }

        //======================================================
        // 性别切换
        //======================================================
        public useGirlBg(b: boolean) {
            this.img_boybg.visible = !b;
            this.img_girlbg.visible = b;
        }

        public useGirlIcon(b: boolean) {
            this.icon_boy.visible = !b;
            this.icon_girl.visible = b;
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
                    this._girlBone.play(`Idle${r}`, 0);
                }
                this._boyBone && (this._boyBone.visible = false);
                this._girlBone && (this._girlBone.visible = true);
            } else {

                if (!this._boyBone) {
                    this._boyBone = await game.getBone("boy");
                    this.grp_role.addChild(this._boyBone);
                    adjustBone(<egret.DisplayObject>(this._boyBone), this.grp_role);
                    let r = randRange(1, this._boyBone.animNum);
                    this._boyBone.play(`Idle${r}`, 0);
                }
                this._boyBone && (this._boyBone.visible = true);
                this._girlBone && (this._girlBone.visible = false);
            }

        }

        public useGirlShelf(b: boolean) {
            this.updateShelf();
        }



        //=======================================
        //TODO: 设置装备信息
        public setDressInfo(dressInfo: table.IEquipDefine) {
            this.showDressInfo();
            this.dress_info.equip_name = dressInfo.Name;
            //技能加成
            let skillDes = "";
            dressInfo.Skill.forEach(
                (item, index, array) => {
                    let skillData: table.ITSkillDefine = table.TSkillById[parseInt(item)];
                    if (skillData) {
                        skillDes += (skillDes == "" ? skillData.Des : "\n" + skillData.Des);
                    }
                }
            );
            this.dress_info.skillAddition = skillDes;
        }

        public hideDressInfo() {
            this.dress_info.visible = false;
        }
        public showDressInfo() {
            this.dress_info.visible = true;
        }

        // 设置装备列表
        private setShelf(s: number) {
            this._dataProv.removeAll();

            let dressItem: table.IEquipDefine = null;
            while (!!(dressItem = table.EquipById[s++])) {
                if (dressItem.Sex == this.gender || dressItem.Sex == 2) {
                    this._dataProv.addItem(dressItem);
                }
            }

            this.reselectIndex(this._typeIdx);
        }

        public updateShelf() {
            switch (this._typeIdx) {
                case msg.ItemPos.Helmet: this.showShelf_head(); break;
                case msg.ItemPos.Clothes: this.showShelf_body(); break;
                case msg.ItemPos.Pants: this.showShelf_leg(); break;
                case msg.ItemPos.Shoe: this.showShelf_foot(); break;
                case msg.ItemPos.Hand: this.showShelf_hand(); break;
                case msg.ItemPos.Wing: this.showShelf_waist(); break;
                case msg.ItemPos.Suit: this.showShelf_back(); break;
            }
        }
        private getSelectIndex(typeIndex) {
            console.log("类型：", typeIndex,this._typeChecked )

            if (!this._typeChecked || this._typeChecked[typeIndex] == null) return null;
            console.log(this._typeChecked[typeIndex]);
            return this._typeChecked[typeIndex];
        }

        private reselectIndex(typeIndex) {
            console.log(this._typeChecked);
            let selIndex = this.getSelectIndex(this._typeIdx);
            console.log("选择项：", selIndex);
            if (selIndex != null) {
                this.ls_items.selectedIndex = selIndex;
            }
        }
        // 显示装备列表
        public showShelf_back() {
            this._typeIdx = msg.ItemPos.Suit;

            this.setShelf(701);

        }
        public showShelf_head() {
            this._typeIdx = msg.ItemPos.Helmet;
            this.setShelf(101);
        }
        public showShelf_body() {
            this._typeIdx = msg.ItemPos.Clothes;
            this.setShelf(201);

        }
        public showShelf_leg() {
            this._typeIdx = msg.ItemPos.Pants;
            this.setShelf(301);
        }
        public showShelf_foot() {
            this._typeIdx = msg.ItemPos.Shoe;
            this.setShelf(401);
        }
        public showShelf_waist() {
            this._typeIdx = msg.ItemPos.Wing;
            this.setShelf(501);
        }
        public showShelf_hand() {
            this._typeIdx = msg.ItemPos.Hand;
            this.setShelf(601);
        }


        public setSuitHandle() {
            if (this.gender == 0) {
                this.replaceParts(this._girlBone, "girl_suit2");
            } else {
                this.replaceParts(this._boyBone, "boy_suit2");
            }
        }

        private replaceParts(bone: SkeletonBase, suitName: string) {
            let slots = bone.armature.getSlots();

            let prefix = `${suitName}_json.`;

            slots.forEach((slot) => {
                let assetName = prefix + slot.name;
                bone.setNewSlot(slot.name, prefix + slot.name);
            })
        }
        public resetSuitHandle() {
            if (this.gender == 0) {
                this.resetParts(this._girlBone);
            } else {
                this.resetParts(this._boyBone);
            }
        }
        public resetParts(bone: SkeletonBase) {
            if (!bone) return;
            let slots = bone.armature.getSlots();
            slots.forEach((slot) => {
                bone.resetSlot(slot.name);
            })
        }

        private changeSlotsInSuit(bone: SkeletonBase, slotNames: string[], suitName: string) {
            slotNames.forEach((name) => {
                let assetName = `${suitName}_json.${name}`;
                bone.setNewSlot(name, assetName);
            })
        }

        private changePart(e: table.IEquipDefine) {
            let pos = e.Pos;
            let sex = e.Sex;
            let slotNames = e.LoadPoint;
            if (slotNames.length <= 0) return;
            if (sex == 0) {
                this.changeSlotsInSuit(this._girlBone, slotNames, "girl_suit2");
            } else {
                this.changeSlotsInSuit(this._boyBone, slotNames, "boy_suit2");
            }
        }

        private resetSlots(bone:SkeletonBase, slotNames:string[]) {
            slotNames.forEach((name) => bone.resetSlot(name));
        }

        private unwear(e: table.IEquipDefine) {
            let sex = e.Sex;
            let slotNames = e.LoadPoint;
            if (slotNames.length <= 0) return;
            if (sex == 0) {
                this.resetSlots(this._girlBone, slotNames);
            } else {
                this.resetSlots(this._boyBone, slotNames);
            }
        }



    }
}